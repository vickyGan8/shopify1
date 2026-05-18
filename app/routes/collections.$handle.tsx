import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections.$handle';
import {getPaginationVariables, Analytics} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductCard} from '~/components/ProductCard';
import {Container} from '~/components/Container';
import {ChevronRight} from 'lucide-react';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `${data?.collection.title ?? ''} — EasyTime`}];
};

export async function loader({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  if (!handle) {
    throw new Response(null, {status: 404});
  }

  const {collection} = await storefront.query(COLLECTION_QUERY, {
    variables: {handle, ...paginationVariables},
  });

  if (!collection) {
    throw new Response(`Collection ${handle} not found`, {status: 404});
  }

  return {collection};
}

export default function Collection() {
  const {collection} = useLoaderData<typeof loader>();

  return (
    <div>
      <Container>
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <Link to="/collections">Collections</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{collection.title}</span>
        </nav>

        <div style={{paddingTop: '2rem', paddingBottom: '3rem'}}>
          <h1 style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>
            {collection.title}
          </h1>
          {collection.description && (
            <p style={{color: '#757575', fontSize: '1rem', maxWidth: 600}}>
              {collection.description}
            </p>
          )}
        </div>

        <PaginatedResourceSection
          connection={collection.products}
          resourcesClassName="products-grid"
        >
          {({node: product}: {node: any; index: number}) => (
            <ProductCard key={product.id} product={product} />
          )}
        </PaginatedResourceSection>
      </Container>

      <Analytics.CollectionView
        data={{
          collection: {
            id: collection.id,
            handle: collection.handle,
          },
        }}
      />
    </div>
  );
}

const PRODUCT_ITEM_FRAGMENT = `#graphql
  fragment CollectionProduct on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    metafields(identifiers: [
      {namespace: "app", key: "moq"},
      {namespace: "app", key: "material"}
    ]) {
      key
      value
    }
  }
` as const;

const COLLECTION_QUERY = `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query Collection(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    collection(handle: $handle) {
      id
      handle
      title
      description
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor
      ) {
        nodes {
          ...CollectionProduct
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          endCursor
          startCursor
        }
      }
    }
  }
` as const;

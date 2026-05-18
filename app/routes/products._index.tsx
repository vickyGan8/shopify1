import type {Route} from './+types/products._index';
import {useLoaderData, Link} from 'react-router';
import {getPaginationVariables} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductCard} from '~/components/ProductCard';
import {Container} from '~/components/Container';
import {ChevronRight} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'All Products — EasyTime'}];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {pageBy: 12});

  const {products} = await storefront.query(CATALOG_QUERY, {
    variables: {...paginationVariables},
  });
  return {products};
}

export default function Products() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <Container>
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <ChevronRight size={14} className="breadcrumb-separator" />
        <span className="breadcrumb-current">Products</span>
      </nav>

      <div style={{paddingTop: '1rem', paddingBottom: '3rem'}}>
        <h1 style={{fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem'}}>
          All Products
        </h1>
        <p style={{color: '#757575', fontSize: '1rem', maxWidth: 600}}>
          Browse our full catalog of premium watch bands and cases. Each product
          can be customized to your specifications.
        </p>
      </div>

      <PaginatedResourceSection
        connection={products}
        resourcesClassName="products-grid"
      >
        {({node: product}: {node: any; index: number}) => (
          <ProductCard key={product.id} product={product} />
        )}
      </PaginatedResourceSection>
    </Container>
  );
}

const PRODUCT_FRAGMENT = `#graphql
  fragment ProductsIndexProduct on Product {
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

const CATALOG_QUERY = `#graphql
  ${PRODUCT_FRAGMENT}
  query ProductsIndex(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...ProductsIndexProduct
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
` as const;

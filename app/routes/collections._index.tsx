import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {getPaginationVariables} from '@shopify/hydrogen';
import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';
import {ChevronRight, ArrowRight} from 'lucide-react';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Collections — EasyTime'}];
};

export async function loader({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 10});
  const {collections} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: paginationVariables,
  });
  return {collections};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div>
      <Container>
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">Collections</span>
        </nav>
      </Container>

      <section className="section-padding" style={{backgroundColor: '#F4F7F6'}}>
        <Container>
          <SectionHeading
            title="Product Collections"
            subtitle="Explore our product lines by category — from premium watch bands to precision-engineered cases"
          />
          <div className="collections-grid">
            {collections.nodes.map((collection: {id: string; handle: string; title: string; image?: {url?: string; altText?: string | null} | null}) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.handle}`}
                className="collection-item"
                style={{textDecoration: 'none'}}
              >
                {collection.image ? (
                  <img
                    src={collection.image.url}
                    alt={collection.image.altText ?? collection.title}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: '#2C5F8A',
                    }}
                  />
                )}
                <div className="collection-item-overlay">
                  <div>
                    <h2>{collection.title}</h2>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        color: '#EAAA00',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        marginTop: '0.5rem',
                      }}
                    >
                      Browse Collection <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment CollectionItem on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;

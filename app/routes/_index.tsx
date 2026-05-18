import {Await, useLoaderData} from 'react-router';
import {Suspense} from 'react';
import type {Route} from './+types/_index';
import {HeroSection} from '~/components/HeroSection';
import {BrandStory} from '~/components/BrandStory';
import {CategoryShowcase} from '~/components/CategoryShowcase';
import {CoreAdvantages} from '~/components/CoreAdvantages';
import {PartnerLogos} from '~/components/PartnerLogos';
import {CTABanner} from '~/components/CTABanner';
import {ProductCard} from '~/components/ProductCard';
import {Container} from '~/components/Container';
import {SectionHeading} from '~/components/SectionHeading';

export const meta: Route.MetaFunction = () => {
  return [{title: 'EasyTime — Premium Watch Accessories Manufacturer | B2B'}];
};

export async function loader({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      console.error(error);
      return null;
    });

  return {recommendedProducts};
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();

  return (
    <div>
      <HeroSection />
      <BrandStory />
      <CategoryShowcase />
      <CoreAdvantages />
      <FeaturedProducts products={data.recommendedProducts} />
      <PartnerLogos />
      <CTABanner />
    </div>
  );
}

function FeaturedProducts({
  products,
}: {
  products: Promise<{products: {nodes: Array<{id: string; handle: string; title: string; featuredImage?: {url?: string; altText?: string | null} | null}>}} | null>;
}) {
  return (
    <section className="section-padding bg-white">
      <Container>
        <SectionHeading
          title="Featured Products"
          subtitle="Explore our most popular watch bands and cases trusted by global brands"
        />
        <Suspense
          fallback={
            <div className="products-grid">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  style={{aspectRatio: '1', background: '#F4F7F6', borderRadius: 8}}
                  className="animate-pulse"
                />
              ))}
            </div>
          }
        >
          <Await resolve={products}>
            {(response) =>
              response ? (
                <div className="products-grid">
                  {response.products.nodes.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-[#757575] py-12">
                  No products available yet. Check back soon.
                </p>
              )
            }
          </Await>
        </Suspense>
      </Container>
    </section>
  );
}

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment HomeProduct on Product {
    id
    title
    handle
    featuredImage {
      id
      url
      altText
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
  query RecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 8, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...HomeProduct
      }
    }
  }
` as const;

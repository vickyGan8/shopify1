import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/products.$handle';
import {Analytics} from '@shopify/hydrogen';
import {Container} from '~/components/Container';
import {CTABanner} from '~/components/CTABanner';
import {ChevronRight, Download, Mail} from 'lucide-react';

export const meta: Route.MetaFunction = ({data}) => {
  return [{title: `${data?.product.title ?? ''} — EasyTime`}];
};

export async function loader({context, params}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const {product} = await storefront.query(PRODUCT_QUERY, {
    variables: {handle},
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  return {product};
}

export default function ProductDetail() {
  const {product} = useLoaderData<typeof loader>();
  const {title, descriptionHtml, featuredImage, metafields} = product;

  const moq = metafields?.find((m: {key?: string; value?: string} | null) => m?.key === 'moq')?.value ?? '—';
  const leadTime = metafields?.find((m: {key?: string; value?: string} | null) => m?.key === 'lead_time_days')?.value;
  const sampleAvailable =
    metafields?.find((m: {key?: string; value?: string} | null) => m?.key === 'sample_available')?.value === 'true';
  const material = metafields?.find((m: {key?: string; value?: string} | null) => m?.key === 'material')?.value;

  return (
    <div>
      <Container>
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <Link to="/products">Products</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{title}</span>
        </nav>

        <div className="product">
          {/* Image */}
          <div className="product-image">
            {featuredImage?.url ? (
              <img
                src={featuredImage.url}
                alt={featuredImage.altText ?? title ?? ''}
              />
            ) : (
              <div
                style={{
                  aspectRatio: '1/1',
                  background: '#F4F7F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#757575',
                  borderRadius: 8,
                }}
              >
                Product Image
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="product-main">
            {material && (
              <span className="category-tag" style={{marginBottom: '0.75rem'}}>
                {material}
              </span>
            )}
            <h1 style={{fontSize: '2rem', fontWeight: 700}}>{title}</h1>

            {/* MOQ Info Card */}
            <div className="moq-card">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <dt>MOQ</dt>
                  <dd>{moq} units</dd>
                </div>
                {leadTime && (
                  <div>
                    <dt>Lead Time</dt>
                    <dd>{leadTime} days</dd>
                  </div>
                )}
                <div>
                  <dt>Sample</dt>
                  <dd>{sampleAvailable ? 'Available' : 'Contact Us'}</dd>
                </div>
              </div>
            </div>

            {/* Description */}
            {descriptionHtml && (
              <>
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    marginBottom: '0.75rem',
                    marginTop: '1.5rem',
                  }}
                >
                  Product Description
                </h3>
                <div
                  dangerouslySetInnerHTML={{__html: descriptionHtml}}
                  style={{color: '#555', lineHeight: 1.7}}
                />
              </>
            )}

            {/* CTA */}
            <div style={{marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
              <Link to="/contact" className="btn btn-accent btn-lg">
                <Mail size={18} />
                Request Quote
              </Link>
              <a href="#" className="btn btn-outline">
                <Download size={18} />
                Download Spec Sheet
              </a>
            </div>
          </div>
        </div>

        {/* Spec Table */}
        {metafields && metafields.length > 0 && (
          <section style={{marginTop: '4rem', marginBottom: '4rem'}}>
            <h2
              style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
              }}
            >
              Technical Specifications
            </h2>
            <table className="spec-table">
              <tbody>
                {material && (
                  <tr>
                    <th>Material</th>
                    <td>{material}</td>
                  </tr>
                )}
                <tr>
                  <th>MOQ</th>
                  <td>{moq} units</td>
                </tr>
                {leadTime && (
                  <tr>
                    <th>Lead Time</th>
                    <td>{leadTime} business days</td>
                  </tr>
                )}
                <tr>
                  <th>Sample Available</th>
                  <td>{sampleAvailable ? 'Yes' : 'Please contact us'}</td>
                </tr>
              </tbody>
            </table>
          </section>
        )}
      </Container>

      <CTABanner
        title="Interested in This Product?"
        subtitle="Tell us your requirements and our team will provide a tailored quotation within 24 hours."
        ctaText="Send Inquiry"
      />

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: '0',
              vendor: product.vendor,
              variantId: product.id,
              variantTitle: product.title,
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query ProductDetail(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      vendor
      descriptionHtml
      featuredImage {
        id
        url
        altText
        width
        height
      }
      metafields(identifiers: [
        {namespace: "app", key: "moq"},
        {namespace: "app", key: "lead_time_days"},
        {namespace: "app", key: "sample_available"},
        {namespace: "app", key: "material"}
      ]) {
        key
        value
      }
    }
  }
` as const;

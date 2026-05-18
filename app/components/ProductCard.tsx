import {Link} from 'react-router';

interface ProductCardProduct {
  id?: string | null;
  handle: string;
  title: string;
  featuredImage?: {
    id?: string | null;
    url?: string | null;
    altText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
  metafields?: Array<{key?: string | null; value?: string | null} | null> | null;
}

export function ProductCard({product}: {product: ProductCardProduct}) {
  const {handle, title, featuredImage, metafields} = product;

  const moq = metafields?.find((m) => m?.key === 'moq')?.value ?? '—';
  const category = metafields?.find((m) => m?.key === 'material')?.value;

  return (
    <Link to={`/products/${handle}`} className="product-card" style={{textDecoration: 'none'}}>
      {featuredImage?.url ? (
        <img
          src={featuredImage.url}
          alt={featuredImage.altText ?? title}
          loading="lazy"
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
            fontSize: '0.875rem',
          }}
        >
          No Image
        </div>
      )}
      <div className="product-card-body">
        {category && <span className="category-tag">{category}</span>}
        <h3>{title}</h3>
        <p className="moq">
          MOQ: <strong>{moq}</strong> units
        </p>
      </div>
    </Link>
  );
}

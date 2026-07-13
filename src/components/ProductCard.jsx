import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  return (
    <Link to={`/products/${product.id}`} className="product-card card">
      <div className="product-card__image-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="product-card__image"
          loading="lazy"
        />
        <span className="badge badge-primary product-card__category">
          {product.category}
        </span>
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__meta flex items-center justify-between">
          <span className="product-card__price">
            ${product.price.toFixed(2)}
            <small>/{product.unitLabel}</small>
          </span>
          <span className="product-card__moq text-sm text-muted">
            MOQ {product.minOrder}
          </span>
        </div>
      </div>

      <style>{`
        .product-card {
          display: block;
          text-decoration: none;
          color: inherit;
          cursor: pointer;
          padding: 0;
          overflow: hidden;
        }
        .product-card__image-wrap {
          position: relative;
          overflow: hidden;
          background: var(--color-gray-100);
        }
        .product-card__image {
          width: 100%;
          aspect-ratio: 4/5;
          object-fit: cover;
          display: block;
          transition: transform var(--transition-normal);
        }
        .product-card:hover .product-card__image {
          transform: scale(1.04);
        }
        .product-card__category {
          position: absolute;
          top: var(--spacing-sm);
          left: var(--spacing-sm);
        }
        .product-card__body {
          padding: var(--spacing-sm) var(--spacing-md) var(--spacing-md);
        }
        .product-card__name {
          font-size: 14px;
          font-weight: 700;
          margin-bottom: var(--spacing-xs);
          line-height: 1.3;
        }
        .product-card__price {
          font-family: var(--font-headings);
          font-weight: 800;
          font-size: 16px;
        }
        .product-card__price small {
          font-weight: 400;
          font-size: 12px;
          color: var(--text-secondary);
        }
      `}</style>
    </Link>
  );
}

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, ShoppingCart, ArrowLeft, Package } from 'lucide-react';
import { products } from '../lib/mockData';
import { useCart } from '../lib/CartContext';
import { useToast } from '../components/Toast';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const { addItem } = useCart();
  const toast = useToast();
  const [qty, setQty] = useState(product?.minOrder || 1);

  if (!product) {
    return (
      <main className="pdp container p-xl text-center">
        <h1>Product Not Found</h1>
        <p className="text-muted mt-md">This product doesn't exist or has been removed.</p>
        <Link to="/">
          <button className="btn-secondary mt-lg">
            <ArrowLeft size={16} /> Back to Shop
          </button>
        </Link>
      </main>
    );
  }

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    addItem(product, qty);
    toast(`${qty}× ${product.name} added to cart`, 'success');
  };

  return (
    <main className="pdp">
      {/* Breadcrumb */}
      <div className="pdp__breadcrumb container">
        <Link to="/" className="pdp__back">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>

      {/* Main product section */}
      <section className="pdp__main container">
        <div className="pdp__layout">
          {/* Image */}
          <div className="pdp__image-wrap">
            <img
              src={product.image}
              alt={product.name}
              className="pdp__image"
            />
            <span className="badge badge-primary pdp__category-badge">
              {product.category}
            </span>
          </div>

          {/* Info */}
          <div className="pdp__info">
            <h1 className="pdp__name">{product.name}</h1>

            <div className="pdp__price-row flex items-center gap-md">
              <span className="pdp__price">
                ${product.price.toFixed(2)}
              </span>
              <span className="pdp__unit text-muted">
                per {product.unitLabel}
              </span>
            </div>

            <div className="pdp__badges flex gap-sm mt-md">
              <span className={`badge ${inStock ? 'badge-primary' : ''}`}>
                {inStock ? 'In Stock' : 'Out of Stock'}
              </span>
              <span className="badge">
                <Package size={12} /> MOQ: {product.minOrder}
              </span>
            </div>

            {/* Quantity selector */}
            <div className="pdp__qty-section mt-lg">
              <label className="pdp__qty-label font-bold uppercase text-sm">
                Quantity ({product.unitLabel}s)
              </label>
              <div className="pdp__qty-stepper flex items-center gap-xs mt-sm">
                <button
                  className="btn-secondary pdp__qty-btn"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  <Minus size={18} />
                </button>
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) =>
                    setQty(Math.max(1, parseInt(e.target.value, 10) || 1))
                  }
                  className="pdp__qty-input"
                />
                <button
                  className="btn-secondary pdp__qty-btn"
                  onClick={() => setQty((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Line total */}
            <div className="pdp__line-total mt-md">
              <span className="text-sm text-muted">Line Total:</span>
              <span className="pdp__total font-bold">
                ${(product.price * qty).toFixed(2)}
              </span>
            </div>

            {/* Add to cart */}
            <button
              className="btn-accent pdp__add-btn w-full mt-lg"
              onClick={handleAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart size={20} />
              Add to Cart
            </button>

            {/* Description */}
            <div className="pdp__description mt-xl">
              <h3 className="pdp__desc-heading">Description</h3>
              <p className="text-muted">{product.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Related products */}
      {related.length > 0 && (
        <section className="pdp__related container mt-xl">
          <h2 className="pdp__related-heading">Related Products</h2>
          <div className="pdp__related-scroll scroll-x">
            {related.map((p) => (
              <div key={p.id} className="pdp__related-card">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

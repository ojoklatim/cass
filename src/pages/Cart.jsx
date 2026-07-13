import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, X, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCart } from '../lib/CartContext';
import './Cart.css';

export default function Cart() {
  const { items, removeItem, updateQty, subtotal } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <main className="cart-page container p-xl text-center">
        <h1 className="cart-page__heading">Your Cart</h1>
        <div className="cart-page__empty mt-lg">
          <p className="text-muted">Your cart is currently empty.</p>
          <Link to="/">
            <button className="btn-accent mt-lg">
              <ArrowLeft size={18} /> Continue Shopping
            </button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page container p-lg">
      <div className="cart-page__header flex items-center justify-between mb-xl">
        <h1 className="cart-page__heading m-0">Review Cart</h1>
        <Link to="/" className="text-sm font-bold uppercase hide-mobile">
          <span className="flex items-center gap-xs">
            <ArrowLeft size={16} /> Continue Shopping
          </span>
        </Link>
      </div>

      <div className="cart-page__layout grid gap-xl">
        {/* Items List */}
        <div className="cart-page__items flex-col gap-md">
          {items.map((item) => (
            <div key={item.id} className="cart-page__item flex items-center gap-md">
              <div className="cart-page__item-img-wrap">
                <img src={item.image} alt={item.name} className="cart-page__item-img" />
              </div>
              <div className="cart-page__item-info">
                <div className="flex items-center justify-between">
                  <h3 className="cart-page__item-name text-base m-0">{item.name}</h3>
                  <button
                    className="cart-page__remove btn-secondary"
                    onClick={() => removeItem(item.id)}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="cart-page__item-meta mt-xs text-sm text-muted">
                  ${item.price.toFixed(2)} / {item.unitLabel}
                </div>
                <div className="cart-page__item-actions flex items-center justify-between mt-sm">
                  <div className="cart-page__stepper flex items-center gap-xs">
                    <button
                      className="btn-secondary cart-page__stepper-btn"
                      onClick={() => updateQty(item.id, item.qty - 1)}
                    >
                      <Minus size={14} />
                    </button>
                    <span className="cart-page__stepper-val text-sm font-bold">{item.qty}</span>
                    <button
                      className="btn-secondary cart-page__stepper-btn"
                      onClick={() => updateQty(item.id, item.qty + 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <div className="cart-page__item-total font-bold">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary sidebar */}
        <aside className="cart-page__summary">
          <div className="card">
            <h2 className="cart-page__summary-title mb-md">Order Summary</h2>
            <div className="flex justify-between items-center mb-sm text-muted text-sm">
              <span>Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items)</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-md text-muted text-sm">
              <span>Delivery</span>
              <span>Calculated later</span>
            </div>
            <div className="divider" />
            <div className="flex justify-between items-center mb-lg font-bold text-lg">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <button
              className="btn-accent w-full"
              onClick={() => {
                // Mock quote submission
                clearCart();
                toast('Quote requested successfully!', 'success');
                navigate('/account/orders');
              }}
            >
              Request Quote <ArrowRight size={18} />
            </button>
            <p className="cart-page__note text-xs text-muted text-center mt-sm">
              Sign in or create an account to submit your quote request.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}

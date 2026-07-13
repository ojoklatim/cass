import { Link } from 'react-router-dom';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export default function CartDrawer() {
  const { items, drawerOpen, setDrawerOpen, removeItem, updateQty, subtotal } = useCart();

  if (!drawerOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="drawer-backdrop" onClick={() => setDrawerOpen(false)} />

      {/* Drawer */}
      <aside className="cart-drawer" role="dialog" aria-label="Shopping cart">
        <div className="cart-drawer__header flex items-center justify-between">
          <h2 className="cart-drawer__title">Your Cart</h2>
          <button
            className="btn-secondary cart-drawer__close"
            onClick={() => setDrawerOpen(false)}
            aria-label="Close cart"
          >
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-drawer__empty flex flex-col items-center justify-center">
            <ShoppingBag size={48} strokeWidth={1} />
            <p className="mt-md font-bold uppercase">Cart is empty</p>
            <p className="text-sm text-muted">Add some shoes to get started.</p>
          </div>
        ) : (
          <>
            <ul className="cart-drawer__items">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer__item flex gap-md">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="cart-drawer__thumb"
                  />
                  <div className="cart-drawer__details flex-1">
                    <p className="cart-drawer__item-name font-bold">{item.name}</p>
                    <p className="text-sm text-muted">
                      ${item.price.toFixed(2)}/{item.unitLabel}
                    </p>
                    <div className="cart-drawer__qty flex items-center gap-xs mt-sm">
                      <button
                        className="btn-secondary cart-drawer__qty-btn"
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="cart-drawer__qty-val">{item.qty}</span>
                      <button
                        className="btn-secondary cart-drawer__qty-btn"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="cart-drawer__item-right flex flex-col items-end justify-between">
                    <button
                      className="btn-secondary cart-drawer__remove-btn"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.name}`}
                    >
                      <X size={16} />
                    </button>
                    <span className="font-bold">${(item.price * item.qty).toFixed(2)}</span>
                  </div>
                </li>
              ))}
            </ul>

            <div className="cart-drawer__footer">
              <div className="flex items-center justify-between mb-md">
                <span className="font-bold uppercase">Subtotal</span>
                <span className="font-bold text-xl">${subtotal.toFixed(2)}</span>
              </div>
              <Link
                to="/cart"
                className="cart-drawer__checkout-link"
                onClick={() => setDrawerOpen(false)}
              >
                <button className="btn-accent w-full">View Full Cart</button>
              </Link>
            </div>
          </>
        )}
      </aside>

      <style>{`
        .drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
        }
        .cart-drawer {
          position: fixed;
          top: 0;
          right: 0;
          bottom: 0;
          width: 100%;
          max-width: 420px;
          background: var(--color-white);
          border-left: 2px solid var(--color-black);
          z-index: 201;
          display: flex;
          flex-direction: column;
          animation: slide-in-right 0.25s ease-out;
        }
        @keyframes slide-in-right {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .cart-drawer__header {
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 2px solid var(--color-black);
        }
        .cart-drawer__title {
          font-size: 18px;
          margin: 0;
        }
        .cart-drawer__close {
          width: 44px;
          height: 44px;
          padding: 0;
        }
        .cart-drawer__empty {
          flex: 1;
          padding: var(--spacing-xxl);
          text-align: center;
          color: var(--text-secondary);
        }
        .cart-drawer__items {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md) var(--spacing-lg);
        }
        .cart-drawer__item {
          padding: var(--spacing-md) 0;
          border-bottom: 1px solid var(--color-gray-200);
        }
        .cart-drawer__thumb {
          width: 64px;
          height: 80px;
          object-fit: cover;
          border: 1px solid var(--color-gray-200);
        }
        .cart-drawer__item-name {
          font-size: 14px;
          margin: 0;
          text-transform: uppercase;
        }
        .cart-drawer__qty-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          min-height: 32px;
        }
        .cart-drawer__qty-val {
          font-family: var(--font-headings);
          font-weight: 700;
          min-width: 28px;
          text-align: center;
        }
        .cart-drawer__remove-btn {
          width: 32px;
          height: 32px;
          padding: 0;
          min-height: 32px;
          border: none;
        }
        .cart-drawer__footer {
          padding: var(--spacing-lg);
          border-top: 2px solid var(--color-black);
        }
        .cart-drawer__checkout-link {
          display: block;
          text-decoration: none;
        }
        .flex-1 { flex: 1; }
      `}</style>
    </>
  );
}

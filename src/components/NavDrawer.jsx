import { Link } from 'react-router-dom';
import { X, Home, ShoppingBag, Package, User } from 'lucide-react';

export default function NavDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <>
      <div className="nav-backdrop" onClick={onClose} />
      <nav className="nav-drawer" role="dialog" aria-label="Main navigation">
        <div className="nav-drawer__header flex items-center justify-between">
          <span className="nav-drawer__logo">CASS</span>
          <button
            className="btn-secondary nav-drawer__close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <ul className="nav-drawer__list">
          <li>
            <Link to="/" className="nav-drawer__link" onClick={onClose}>
              <Home size={20} /> Home
            </Link>
          </li>
          <li>
            <Link to="/" className="nav-drawer__link" onClick={onClose}>
              <Package size={20} /> Shop All
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-drawer__link" onClick={onClose}>
              <ShoppingBag size={20} /> Cart
            </Link>
          </li>
          <li>
            <a href="#" className="nav-drawer__link" onClick={onClose}>
              <User size={20} /> Account
            </a>
          </li>
        </ul>
      </nav>

      <style>{`
        .nav-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 200;
        }
        .nav-drawer {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;
          width: 280px;
          max-width: 85vw;
          background: var(--color-white);
          border-right: 2px solid var(--color-black);
          z-index: 201;
          animation: slide-in-left 0.25s ease-out;
        }
        @keyframes slide-in-left {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        .nav-drawer__header {
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 2px solid var(--color-black);
        }
        .nav-drawer__logo {
          font-family: var(--font-headings);
          font-weight: 900;
          font-size: 24px;
          color: var(--color-primary);
          text-transform: uppercase;
        }
        .nav-drawer__close {
          width: 44px;
          height: 44px;
          padding: 0;
        }
        .nav-drawer__list {
          padding: var(--spacing-md) 0;
        }
        .nav-drawer__link {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md) var(--spacing-lg);
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 16px;
          text-transform: uppercase;
          color: var(--color-black);
          transition: all var(--transition-fast);
          min-height: 44px;
        }
        .nav-drawer__link:hover {
          background: var(--color-gray-100);
          color: var(--color-primary);
        }
      `}</style>
    </>
  );
}

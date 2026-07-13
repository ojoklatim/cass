import { Link } from 'react-router-dom';
import { Menu, ShoppingCart, User } from 'lucide-react';
import { useCart } from '../lib/CartContext';

export default function Header({ onMenuOpen }) {
  const { itemCount, setDrawerOpen } = useCart();

  return (
    <header className="header">
      <div className="header__inner container flex items-center justify-between">
        {/* Left: Menu toggle (mobile) */}
        <button
          className="header__menu-btn btn-secondary hide-desktop"
          onClick={onMenuOpen}
          aria-label="Open menu"
        >
          <Menu size={22} />
        </button>

        {/* Logo */}
        <Link to="/" className="header__logo">
          CASS
        </Link>

        {/* Desktop nav */}
        <nav className="header__nav hide-mobile flex items-center gap-lg">
          <Link to="/" className="header__link">Shop</Link>
          <Link to="/cart" className="header__link">Orders</Link>
        </nav>

        {/* Right actions */}
        <div className="header__actions flex items-center gap-sm">
          <button className="header__icon-btn btn-secondary" aria-label="Account">
            <User size={20} />
          </button>
          <button
            className="header__cart-btn btn-accent"
            onClick={() => setDrawerOpen(true)}
            aria-label="Open cart"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && <span className="header__cart-count">{itemCount}</span>}
          </button>
        </div>
      </div>

      <style>{`
        .header {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--color-white);
          border-bottom: 2px solid var(--color-black);
        }
        .header__inner {
          height: 60px;
        }
        .header__logo {
          font-family: var(--font-headings);
          font-weight: 900;
          font-size: 28px;
          letter-spacing: -0.04em;
          color: var(--color-primary);
          text-transform: uppercase;
        }
        .header__link {
          font-family: var(--font-headings);
          font-weight: 700;
          font-size: 14px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          transition: color var(--transition-fast);
        }
        .header__link:hover {
          color: var(--color-primary);
        }
        .header__icon-btn,
        .header__menu-btn {
          width: 44px;
          height: 44px;
          padding: 0;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .header__cart-btn {
          position: relative;
          min-width: 44px;
          height: 44px;
          padding: 0 var(--spacing-sm);
        }
        .header__cart-count {
          font-size: 12px;
          font-weight: 800;
          min-width: 20px;
          height: 20px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: var(--color-black);
          color: var(--color-white);
          border: 1px solid var(--color-white);
        }
      `}</style>
    </header>
  );
}

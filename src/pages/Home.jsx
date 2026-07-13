import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, ArrowRight, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../lib/mockData';
import ProductCard from '../components/ProductCard';
import './Home.css';

const PRODUCTS_PER_PAGE = 8;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(PRODUCTS_PER_PAGE);

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory !== 'All') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <main className="home">
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero__inner container">
          <span className="hero__badge badge">Wholesale Marketplace</span>
          <h1 className="hero__title">
            Wholesale Shoes<br />
            <span className="hero__accent">for Every Season</span>
          </h1>
          <p className="hero__subtitle">
            Premium footwear at bulk pricing. Curated collections for retailers worldwide.
          </p>
          <Link to="/#catalog">
            <button className="btn-accent hero__cta" onClick={() => {
              document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              Shop Now <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* ===== CATALOG ===== */}
      <section id="catalog" className="catalog container">
        {/* Search */}
        <div className="catalog__search-wrap">
          <Search size={20} className="catalog__search-icon" />
          <input
            type="search"
            placeholder="Search shoes..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setVisibleCount(PRODUCTS_PER_PAGE);
            }}
            className="catalog__search-input"
          />
          <button className="catalog__filter-btn btn-secondary hide-desktop">
            <SlidersHorizontal size={18} />
          </button>
        </div>

        <div className="catalog__layout">
          {/* Category sidebar (desktop) / scroll bar (mobile) */}
          <aside className="catalog__sidebar hide-mobile">
            <h3 className="catalog__sidebar-heading">Categories</h3>
            <ul className="catalog__sidebar-list">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    className={`catalog__sidebar-btn ${
                      activeCategory === cat ? 'catalog__sidebar-btn--active' : 'btn-secondary'
                    }`}
                    onClick={() => {
                      setActiveCategory(cat);
                      setVisibleCount(PRODUCTS_PER_PAGE);
                    }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          {/* Mobile category scroll */}
          <div className="catalog__cat-scroll scroll-x hide-desktop">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`catalog__chip ${
                  activeCategory === cat ? 'catalog__chip--active' : 'btn-secondary'
                }`}
                onClick={() => {
                  setActiveCategory(cat);
                  setVisibleCount(PRODUCTS_PER_PAGE);
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product grid */}
          <div className="catalog__main">
            {visible.length === 0 ? (
              <div className="catalog__empty text-center p-xl">
                <p className="font-bold uppercase text-lg">No products found</p>
                <p className="text-muted text-sm mt-sm">
                  Try adjusting your search or category filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-products">
                {visible.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {hasMore && (
              <div className="catalog__load-more text-center mt-xl">
                <button
                  className="btn-secondary"
                  onClick={() => setVisibleCount((c) => c + PRODUCTS_PER_PAGE)}
                >
                  Load More
                </button>
              </div>
            )}

            <div className="catalog__count text-center mt-md text-sm text-muted">
              Showing {visible.length} of {filtered.length} products
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

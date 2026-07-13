import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, CreditCard, Clock, FileText } from 'lucide-react';
import './BuyerDashboard.css';

export default function BuyerDashboard() {
  const [activeTab, setActiveTab] = useState('quotes');

  // Mock data for dashboard
  const mockQuotes = [
    { id: 'Q-1001', date: '2023-10-01', items: 3, total: 450.00, status: 'Quoted' },
    { id: 'Q-1002', date: '2023-10-05', items: 1, total: 0, status: 'Quote Requested' },
  ];

  const mockInvoices = [
    { id: 'INV-2001', date: '2023-09-15', total: 1250.00, status: 'Unpaid' }
  ];

  const mockOrders = [
    { id: 'ORD-3001', date: '2023-08-20', total: 850.00, status: 'Fulfilled' }
  ];

  return (
    <main className="dashboard container p-lg">
      <div className="dashboard__header mb-xl">
        <h1 className="m-0">My Dashboard</h1>
        <p className="text-muted mt-sm">Welcome back, Chantal Boutique</p>
      </div>

      <div className="dashboard__layout grid">
        <aside className="dashboard__sidebar">
          <nav className="dashboard__nav flex-col gap-xs">
            <button 
              className={`dashboard__nav-btn ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              <FileText size={18} /> Quotes
            </button>
            <button 
              className={`dashboard__nav-btn ${activeTab === 'invoices' ? 'active' : ''}`}
              onClick={() => setActiveTab('invoices')}
            >
              <CreditCard size={18} /> Invoices
            </button>
            <button 
              className={`dashboard__nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              onClick={() => setActiveTab('orders')}
            >
              <Package size={18} /> Order History
            </button>
            <Link to="/account/settings" className="dashboard__nav-btn" style={{ textDecoration: 'none' }}>
              <span className="flex items-center gap-sm" style={{ color: 'inherit' }}>
                <Clock size={18} /> Settings
              </span>
            </Link>
          </nav>
        </aside>

        <section className="dashboard__content">
          {activeTab === 'quotes' && (
            <div className="dashboard__panel">
              <h2 className="mb-md">My Quotes</h2>
              <div className="dashboard__list flex-col gap-md">
                {mockQuotes.map(q => (
                  <div key={q.id} className="dashboard__item card flex items-center justify-between flex-wrap gap-md">
                    <div>
                      <h3 className="m-0 text-base">{q.id}</h3>
                      <p className="text-sm text-muted m-0">{q.date} • {q.items} items</p>
                    </div>
                    <div className="text-right">
                      <span className="badge badge-secondary mb-xs">{q.status}</span>
                      <p className="m-0 font-bold">{q.total > 0 ? `$${q.total.toFixed(2)}` : 'Pending Pricing'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="dashboard__panel">
              <h2 className="mb-md">Unpaid Invoices</h2>
              <div className="dashboard__list flex-col gap-md">
                {mockInvoices.map(inv => (
                  <div key={inv.id} className="dashboard__item card flex items-center justify-between flex-wrap gap-md">
                    <div>
                      <h3 className="m-0 text-base">{inv.id}</h3>
                      <p className="text-sm text-muted m-0">Issued: {inv.date}</p>
                    </div>
                    <div className="flex items-center gap-md">
                      <div className="text-right">
                        <span className="badge mb-xs">{inv.status}</span>
                        <p className="m-0 font-bold">${inv.total.toFixed(2)}</p>
                      </div>
                      <Link to={`/account/orders/${inv.id}/payment-result?status=success`}>
                        <button className="btn-accent">Pay Now</button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="dashboard__panel">
              <h2 className="mb-md">Order History</h2>
              <div className="dashboard__list flex-col gap-md">
                {mockOrders.map(ord => (
                  <div key={ord.id} className="dashboard__item card flex items-center justify-between flex-wrap gap-md">
                    <div>
                      <h3 className="m-0 text-base">{ord.id}</h3>
                      <p className="text-sm text-muted m-0">{ord.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="badge badge-primary mb-xs">{ord.status}</span>
                      <p className="m-0 font-bold">${ord.total.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

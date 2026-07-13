import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Package, FileText, LayoutDashboard, Edit, Trash2, CheckCircle } from 'lucide-react';
import { products } from '../lib/mockData';
import { useToast } from '../components/Toast';
import './AdminDashboard.css';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const toast = useToast();

  const mockQuotes = [
    { id: 'Q-1001', buyer: 'Chantal Boutique', date: '2023-10-01', items: 3, total: 450.00, status: 'quote_requested' },
    { id: 'Q-1002', buyer: 'Nairobi Shoes Ltd', date: '2023-10-05', items: 1, total: 0, status: 'quoted' },
  ];

  const handleSendInvoice = (id) => {
    toast(`Invoice sent for ${id}`, 'success');
  };

  return (
    <main className="admin container p-lg">
      <div className="admin__header mb-xl">
        <h1 className="m-0">Admin Dashboard</h1>
      </div>

      <div className="admin__layout grid">
        <aside className="admin__sidebar">
          <nav className="admin__nav flex-col gap-xs">
            <button 
              className={`admin__nav-btn ${activeTab === 'products' ? 'active' : ''}`}
              onClick={() => setActiveTab('products')}
            >
              <Package size={18} /> Products
            </button>
            <button 
              className={`admin__nav-btn ${activeTab === 'quotes' ? 'active' : ''}`}
              onClick={() => setActiveTab('quotes')}
            >
              <FileText size={18} /> Quotes & Orders
            </button>
          </nav>
        </aside>

        <section className="admin__content">
          {activeTab === 'products' && (
            <div className="admin__panel">
              <div className="flex justify-between items-center mb-md">
                <h2 className="m-0">Manage Products</h2>
                <button className="btn-accent">Add Product</button>
              </div>
              <div className="admin__table-wrap">
                <table className="admin__table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name / SKU</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id}>
                        <td>
                          <img src={p.image} alt={p.name} className="admin__table-img" />
                        </td>
                        <td>
                          <div className="font-bold">{p.name}</div>
                          <div className="text-sm text-muted">SKU-{p.id}</div>
                        </td>
                        <td>${p.price.toFixed(2)} / {p.unitLabel}</td>
                        <td>
                          <span className={`badge ${p.stock > 0 ? 'badge-primary' : ''}`}>
                            {p.stock}
                          </span>
                        </td>
                        <td>
                          <div className="flex gap-sm">
                            <button className="btn-secondary admin__action-btn" aria-label="Edit"><Edit size={16} /></button>
                            <button className="btn-secondary admin__action-btn text-danger" aria-label="Delete"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'quotes' && (
            <div className="admin__panel">
              <h2 className="mb-md">Review Quotes</h2>
              <div className="admin__list flex-col gap-md">
                {mockQuotes.map(q => (
                  <div key={q.id} className="admin__item card flex items-center justify-between flex-wrap gap-md">
                    <div>
                      <h3 className="m-0 text-base">{q.id} — {q.buyer}</h3>
                      <p className="text-sm text-muted m-0">{q.date} • {q.items} items</p>
                    </div>
                    <div className="flex items-center gap-md">
                      <div className="text-right">
                        <span className="badge mb-xs">{q.status}</span>
                        {q.total > 0 && <p className="m-0 font-bold">${q.total.toFixed(2)}</p>}
                      </div>
                      {q.status === 'quote_requested' && (
                        <button className="btn-accent flex items-center gap-xs" onClick={() => handleSendInvoice(q.id)}>
                          <CheckCircle size={16} /> Send Invoice
                        </button>
                      )}
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

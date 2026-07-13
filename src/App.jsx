import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './lib/CartContext';
import { ToastProvider } from './components/Toast';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import NavDrawer from './components/NavDrawer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PaymentResult from './pages/PaymentResult';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <div className="app-container">
            <Header onMenuOpen={() => setNavOpen(true)} />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/account/login" element={<Login />} />
              <Route path="/account/signup" element={<SignUp />} />
              <Route path="/account/orders" element={<BuyerDashboard />} />
              <Route path="/account/orders/:id/payment-result" element={<PaymentResult />} />
              <Route path="/account/settings" element={<BuyerDashboard />} />
              
              {/* Admin Routes */}
              <Route path="/admin/products" element={<AdminDashboard />} />
              <Route path="/admin/quotes" element={<AdminDashboard />} />
              <Route path="/admin/orders" element={<AdminDashboard />} />
              <Route path="/admin/payments" element={<AdminDashboard />} />
            </Routes>
            
            <Footer />
            
            {/* Drawers */}
            <CartDrawer />
            <NavDrawer isOpen={navOpen} onClose={() => setNavOpen(false)} />
          </div>
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  );
}

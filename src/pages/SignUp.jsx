import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import './Auth.css';

export default function SignUp() {
  const navigate = useNavigate();
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    email: '',
    password: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const { business_name, contact_name, phone, email, password } = formData;
    if (!business_name || !contact_name || !phone || !email || !password) {
      toast('Please fill in all required fields', 'error');
      return;
    }
    // Mock signup logic
    toast('Account created successfully!', 'success');
    navigate('/account/orders');
  };

  return (
    <main className="auth-page container p-xl">
      <div className="auth-card card">
        <h1 className="auth-heading text-center mb-lg">Create Account</h1>
        <form onSubmit={handleSignUp} className="flex-col gap-md">
          <div className="grid grid-2 gap-md hide-mobile">
            <div className="form-group">
              <label htmlFor="business_name">Business Name *</label>
              <input type="text" id="business_name" value={formData.business_name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="contact_name">Contact Name *</label>
              <input type="text" id="contact_name" value={formData.contact_name} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group hide-desktop">
            <label htmlFor="business_name">Business Name *</label>
            <input type="text" id="business_name" value={formData.business_name} onChange={handleChange} />
          </div>
          <div className="form-group hide-desktop">
            <label htmlFor="contact_name">Contact Name *</label>
            <input type="text" id="contact_name" value={formData.contact_name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input type="email" id="email" value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input type="tel" id="phone" value={formData.phone} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password *</label>
            <input type="password" id="password" value={formData.password} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="address">Delivery Address (Optional)</label>
            <textarea id="address" rows="3" value={formData.address} onChange={handleChange}></textarea>
          </div>

          <button type="submit" className="btn-accent w-full mt-sm">
            Register Business
          </button>
        </form>
        <p className="text-center text-sm text-muted mt-lg">
          Already have an account? <Link to="/account/login" className="text-primary font-bold">Sign In</Link>
        </p>
      </div>
    </main>
  );
}

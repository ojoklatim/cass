import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import './Auth.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please fill in all fields', 'error');
      return;
    }
    // Mock login logic
    toast('Logged in successfully!', 'success');
    navigate('/account/orders');
  };

  return (
    <main className="auth-page container p-xl">
      <div className="auth-card card">
        <h1 className="auth-heading text-center mb-lg">Welcome Back</h1>
        <form onSubmit={handleLogin} className="flex-col gap-md">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn-accent w-full mt-sm">
            Sign In
          </button>
        </form>
        <p className="text-center text-sm text-muted mt-lg">
          Don't have an account? <Link to="/account/signup" className="text-primary font-bold">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}

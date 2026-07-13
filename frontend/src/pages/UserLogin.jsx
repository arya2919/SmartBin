import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function UserLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/login', form);
      loginUser(res.data.token, res.data.user);
      navigate('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <video autoPlay loop muted playsInline className="auth-bg-video">
        <source src="/video/page1.mp4" type="video/mp4" />
      </video>
      <div className="auth-overlay" />
      <div className="auth-card">
        <div className="auth-brand">SmartBin</div>
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">
          New to SmartBin? <Link to="/register">Create an account</Link>
        </p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <Link to="/" className="auth-back">← Back to Home</Link>
      </div>
    </div>
  );
}

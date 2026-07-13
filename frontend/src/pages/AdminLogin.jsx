import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '', passkey: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('/auth/admin/login', form);
      loginAdmin(res.data.token, res.data.admin);
      navigate('/admin/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-card">
        <div className="auth-brand">SmartBin <span className="admin-badge">Admin</span></div>
        <h1>Admin Login</h1>
        <p className="auth-subtitle">
          New admin? <Link to="/admin/register">Register</Link>
        </p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="email" name="email" placeholder="Admin Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="passkey" placeholder="Admin Passkey" value={form.passkey} onChange={handleChange} required />
          <button type="submit" disabled={loading} className="auth-btn admin">
            {loading ? 'Logging in...' : 'Login as Admin'}
          </button>
        </form>
        <Link to="/" className="auth-back">← Back to Home</Link>
      </div>
    </div>
  );
}

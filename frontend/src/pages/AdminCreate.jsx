import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';

export default function AdminCreate() {
  const [form, setForm] = useState({ username: '', email: '', password: '', passkey: '' });
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
      const res = await api.post('/auth/admin/register', form);
      loginAdmin(res.data.token, res.data.admin);
      navigate('/admin/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page admin-auth">
      <div className="auth-card">
        <div className="auth-brand">SmartBin <span className="admin-badge">Admin</span></div>
        <h1>Create Admin Account</h1>
        <p className="auth-subtitle">
          Already registered? <Link to="/admin/login">Login</Link>
        </p>
        {error && <div className="auth-error">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <input type="text" name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <input type="password" name="passkey" placeholder="Admin Passkey" value={form.passkey} onChange={handleChange} required />
          <button type="submit" disabled={loading} className="auth-btn admin">
            {loading ? 'Creating...' : 'Create Admin Account'}
          </button>
        </form>
        <Link to="/" className="auth-back">← Back to Home</Link>
      </div>
    </div>
  );
}

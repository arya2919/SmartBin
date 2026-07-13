import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function Payment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/payment/checkout');
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-card">
        <Link to="/" className="back-link">← Back to Home</Link>
        <div className="payment-icon">💚</div>
        <h1>Support SmartBin</h1>
        <p className="payment-desc">
          Your contribution helps us expand our waste management network, onboard more municipalities,
          and build a cleaner future for everyone.
        </p>
        <div className="payment-amount">
          <span className="currency">₹</span>
          <span className="amount">50</span>
          <span className="label">one-time support</span>
        </div>
        {error && <div className="auth-error">{error}</div>}
        <button className="payment-btn" onClick={handleCheckout} disabled={loading}>
          {loading ? 'Redirecting...' : '💳 Donate via Stripe'}
        </button>
        <p className="payment-note">Secure payment powered by Stripe. We never store your card details.</p>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';

export default function PaymentSuccess() {
  return (
    <div className="payment-page">
      <div className="payment-card success-card">
        <div className="success-icon">🎉</div>
        <h1>Thank You!</h1>
        <p className="payment-desc">
          Your contribution has been received successfully. Together, we are making our planet cleaner!
        </p>
        <div className="success-badges">
          <span>✓ Payment Confirmed</span>
          <span>🌱 Impact Recorded</span>
        </div>
        <Link to="/" className="payment-btn">← Back to Home</Link>
      </div>
    </div>
  );
}

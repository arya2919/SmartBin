const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const BASE_URL = process.env.BASE_URL || 'http://localhost:5173';

// POST /api/payment/checkout
router.post('/checkout', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'INR',
            product_data: { name: 'Fund Amount' },
            unit_amount: 50 * 100
          },
          quantity: 1
        }
      ],
      mode: 'payment',
      success_url: `${BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}/`
    });
    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Payment session creation failed' });
  }
});

// GET /api/payment/complete
router.get('/complete', async (req, res) => {
  try {
    const { session_id } = req.query;
    const [session, lineItems] = await Promise.all([
      stripe.checkout.sessions.retrieve(session_id, { expand: ['payment_intent.payment_method'] }),
      stripe.checkout.sessions.listLineItems(session_id)
    ]);
    res.json({ success: true, session, lineItems });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Failed to retrieve session' });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const getRawBody = require('raw-body');

// Helper functions for Stripe events
async function handleSubscriptionCreated(subscription) {
  console.log(`[Stripe] Handling subscription created for customer: ${subscription.customer}`);
  // TODO: Map subscription to Firestore user and update quota
}

async function handleSubscriptionUpdated(subscription) {
  console.log(`[Stripe] Handling subscription updated for customer: ${subscription.customer}`);
  // TODO: Update Firestore quota based on new plan
}

async function handleCheckoutSessionCompleted(session) {
  console.log(`[Stripe] Handling checkout session completed: ${session.id}`);
  // TODO: Process one-time top-ups
}

// Webhook endpoint
// Note: This route expects the raw body for signature verification
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify signature
    // In a real implementation, we need the raw body buffer here.
    // server.js middleware configuration is critical for this.
    const rawBody = req.rawBody; 
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } else {
        // For development without webhook secret verification (not recommended for prod)
        console.warn('[Stripe] No webhook secret configured, skipping signature verification.');
        event = req.body;
    }

  } catch (err) {
    console.error(`[Stripe] Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  try {
    switch (event.type) {
      case 'customer.subscription.created':
        await handleSubscriptionCreated(event.data.object);
        break;
      case 'customer.subscription.updated':
        await handleSubscriptionUpdated(event.data.object);
        break;
      case 'checkout.session.completed':
        await handleCheckoutSessionCompleted(event.data.object);
        break;
      default:
        console.log(`[Stripe] Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.json({received: true});
  } catch (error) {
    console.error('[Stripe] Error processing event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;


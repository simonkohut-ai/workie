const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { updateQuota, recordUsage, getUserByStripeId, linkStripeCustomer } = require('../utils/usage-tracker');

// 1. Define Quota Map
const PLAN_QUOTAS = {
  'micro': 50000,
  'flow': 250000,
  'pro': 1000000,
  'topup': 100000
};

// Helper to extract plan ID from Stripe object usually in metadata or nickname
function getQuotaFromPlan(plan) {
  // Simplified logic: Assume plan nickname or ID contains key words
  // In production, map specific Stripe Price IDs (price_xxx) to quotas
  const planName = (plan.nickname || plan.id).toLowerCase();
  if (planName.includes('micro')) return PLAN_QUOTAS['micro'];
  if (planName.includes('flow')) return PLAN_QUOTAS['flow'];
  if (planName.includes('pro')) return PLAN_QUOTAS['pro'];
  return PLAN_QUOTAS['micro']; // Default
}

// 2. Implement handleSubscriptionCreated
async function handleSubscriptionCreated(subscription) {
  const stripeCustomerId = subscription.customer;
  const plan = subscription.items.data[0].plan;
  
  console.log(`[Stripe] Subscription created for customer: ${stripeCustomerId}`);
  
  const userId = await getUserByStripeId(stripeCustomerId);
  if (!userId) {
    console.warn(`[Stripe] No user found for Stripe ID: ${stripeCustomerId}. Waiting for client-side linking or manual intervention.`);
    // In a real flow, the client might send the userId during checkout metadata to link it here immediately.
    // For this scaffold, we assume the link exists or will be created.
    return;
  }

  const newQuota = getQuotaFromPlan(plan);
  await updateQuota(userId, newQuota);
}

// 4. Implement handleSubscriptionUpdated
async function handleSubscriptionUpdated(subscription) {
  const stripeCustomerId = subscription.customer;
  const plan = subscription.items.data[0].plan;
  
  console.log(`[Stripe] Subscription updated for customer: ${stripeCustomerId}`);

  const userId = await getUserByStripeId(stripeCustomerId);
  if (!userId) return;

  // Check status - if canceled or unpaid, revoke quota
  if (subscription.status !== 'active' && subscription.status !== 'trialing') {
    console.log(`[Stripe] Subscription not active (${subscription.status}), setting quota to 0.`);
    await updateQuota(userId, 0);
    return;
  }

  const newQuota = getQuotaFromPlan(plan);
  await updateQuota(userId, newQuota);
}

// 3. Implement handleCheckoutSessionCompleted
async function handleCheckoutSessionCompleted(session) {
  console.log(`[Stripe] Checkout session completed: ${session.id}`);
  
  // Check if this is a top-up (one-time payment)
  // We look for metadata or specific line items. 
  // Assuming we pass metadata: { type: 'topup', userId: '...' } from the client.
  
  const userId = session.metadata ? session.metadata.userId : null;
  const type = session.metadata ? session.metadata.type : null;

  if (type === 'topup' && userId) {
    console.log(`[Stripe] Processing Top-Up for user: ${userId}`);
    // "Record" negative usage to add credits
    await recordUsage(userId, -100000); 
  } else if (session.mode === 'subscription') {
     // Handle initial linking if metadata provided
     if (session.metadata && session.metadata.userId) {
        await linkStripeCustomer(session.customer, session.metadata.userId);
     }
  }
}

// Webhook endpoint
router.post('/webhook', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    const rawBody = req.rawBody; 
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (endpointSecret) {
      event = stripe.webhooks.constructEvent(rawBody, sig, endpointSecret);
    } else {
        console.warn('[Stripe] No webhook secret configured, skipping signature verification.');
        event = req.body;
    }
  } catch (err) {
    console.error(`[Stripe] Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

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
      case 'customer.subscription.deleted':
         // Treat as update to inactive
         await handleSubscriptionUpdated(event.data.object);
         break;
      default:
        console.log(`[Stripe] Unhandled event type ${event.type}`);
    }

    res.json({received: true});
  } catch (error) {
    console.error('[Stripe] Error processing event:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

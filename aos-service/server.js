const express = require('express');
const dotenv = require('dotenv');

const cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());

// Stripe Webhook Route - Must be defined BEFORE express.json() to preserve raw body
const stripeRoutes = require('./routes/stripe');

// Use raw body parsing for Stripe webhooks
app.use('/api/stripe', express.raw({ type: 'application/json' }), (req, res, next) => {
  // Attach raw body to req object for signature verification
  if (req.headers['stripe-signature']) {
    req.rawBody = req.body;
  }
  next();
}, stripeRoutes);

const workerRoutes = require('./routes/worker');

app.use(express.json());

app.use('/api', workerRoutes);

app.get('/', (req, res) => {
  res.send('AOS Service is running');
});

app.listen(port, () => {
  console.log(`AOS Service running on port ${port}`);
}).on('error', (err) => {
  console.error('AOS Service failed to start:', err);
});


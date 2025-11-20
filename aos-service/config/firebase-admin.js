const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

try {
  if (process.env.FIREBASE_ADMIN_CREDENTIALS) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIALS);
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
    console.log('[Firebase] Initialization Successful');
  } else {
    console.warn('[Firebase] WARNING: No credentials found. Skipping initialization.');
  }
} catch (error) {
  console.error('[Firebase] Initialization Failed (Non-Fatal):', error.message);
  console.warn('[Firebase] Server will start without database access.');
}

module.exports = admin;


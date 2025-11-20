const admin = require('../config/firebase-admin');
// Removed synchronous top-level db initialization
// const db = admin.firestore();

// Placeholder App ID as per instructions
const APP_ID = 'workie-app-id';

/**
 * Fetches the current usage and quota from Firestore.
 * Initializes default data if document doesn't exist.
 * @param {string} userId 
 */
async function getUsage(userId) {
  if (!admin.apps.length) throw new Error("Database not initialized");
  
  const db = admin.firestore();
  const docPath = `artifacts/${APP_ID}/users/${userId}/billing/usageTracker`;
  const docRef = db.doc(docPath);
  const doc = await docRef.get();

  if (!doc.exists) {
    console.log(`[UsageTracker] Initializing tracking for user ${userId}`);
    const defaultPayload = {
      currentUsage: 0,
      monthlyQuota: 50000,
      lastReset: Date.now()
    };
    // Use set() with merge: true to be safe, although if it doesn't exist, merge is redundant but safe.
    // Critical: Initialize immediately.
    await docRef.set(defaultPayload);
    return defaultPayload;
  }

  return doc.data();
}

/**
 * Atomically updates the user's current token usage and logs the transaction.
 * @param {string} userId 
 * @param {number} tokensUsed 
 * @returns {Promise<{isOverQuota: boolean}>}
 */
async function recordUsage(userId, tokensUsed) {
  if (!admin.apps.length) throw new Error("Database not initialized");

  const db = admin.firestore();
  const docPath = `artifacts/${APP_ID}/users/${userId}/billing/usageTracker`;
  const docRef = db.doc(docPath);

  try {
    // Use a transaction for atomic updates
    return await db.runTransaction(async (transaction) => {
      const doc = await transaction.get(docRef);
      
      let data;
      if (!doc.exists) {
        data = {
          currentUsage: 0,
          monthlyQuota: 50000,
          lastReset: Date.now()
        };
      } else {
        data = doc.data();
      }

      const newUsage = (data.currentUsage || 0) + tokensUsed;
      const monthlyQuota = data.monthlyQuota || 50000;
      const isOverQuota = newUsage > monthlyQuota;

      transaction.set(docRef, {
        ...data,
        currentUsage: newUsage
      }, { merge: true });

      return { isOverQuota };
    });
  } catch (error) {
    console.error('[UsageTracker] Error recording usage:', error);
    throw error;
  }
}

module.exports = { getUsage, recordUsage };


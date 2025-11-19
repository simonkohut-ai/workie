const express = require('express');
const router = express.Router();
const admin = require('../config/firebase-admin');
const authMiddleware = require('../middleware/auth');
const workieAgent = require('../agents/WorkieAgent');

// Initialize Firestore
const db = admin.firestore();

// Helper function to trigger agent run
async function triggerInitialAgentRun(config) {
  console.log('[Config Route] Triggering initial agent run...');
  const mockTranscript = "Client: I need the new logo by Friday. Developer: I can do that, but I need the high-res assets. Client: I'll send them tonight. Developer: Okay, I'll start tomorrow.";
  
  try {
    // We are using the singleton workieAgent. 
    // In a real scenario, we might configure it per user/config.
    const result = await workieAgent.executeTask(mockTranscript);
    console.log('[Config Route] Initial agent run result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('[Config Route] Initial agent run failed:', error);
  }
}

// POST /api/config
router.post('/config', authMiddleware, async (req, res) => {
  try {
    const { appId, config } = req.body;
    const userId = req.user.userId;

    if (!appId || !config) {
      return res.status(400).json({ error: 'Missing appId or config in request body' });
    }

    console.log(`[Config Route] Received config for user: ${userId}, app: ${appId}`);

    // Path: /artifacts/{appId}/users/{userId}/agentConfigs/mainWorker
    const docPath = `artifacts/${appId}/users/${userId}/agentConfigs/mainWorker`;
    
    await db.doc(docPath).set(config, { merge: true });

    console.log(`[Config Route] Successfully saved config to ${docPath}`);

    // Trigger initial agent run
    // We don't await this so the response is fast, or we can await if we want to confirm it started.
    // The directive implies "immediately call", usually implies async or part of flow.
    // Given it's a "verify the setup" step, awaiting it might be better for debugging, 
    // but for production usually we'd enqueue it. I'll await it for now to ensure logging happens visibly.
    await triggerInitialAgentRun(config); 

    res.status(200).json({ message: 'Configuration saved successfully', path: docPath });

  } catch (error) {
    console.error('[Config Route] Error saving config:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;


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
    const { workerConfig } = req.body;
    const userId = req.user.userId;
    const appId = 'workie-app-id'; // Placeholder app ID

    if (!workerConfig) {
      return res.status(400).json({ error: 'Missing workerConfig in request body' });
    }

    console.log(`[Config Route] Received config for user: ${userId}, app: ${appId}`);

    // Path: /artifacts/{appId}/users/{userId}/agentConfigs/mainWorker
    const docPath = `artifacts/${appId}/users/${userId}/agentConfigs/mainWorker`;
    
    // Save workerConfig directly as the document data
    await db.doc(docPath).set(workerConfig, { merge: true });

    console.log(`[Config Route] Successfully saved config to ${docPath}`);

    // Trigger initial agent run (Placeholder, will be integrated in next steps)
    // await triggerInitialAgentRun(workerConfig); 

    res.status(200).json({ message: 'Configuration saved successfully', path: docPath });

  } catch (error) {
    console.error('[Config Route] Error saving config:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});
    console.error('[Config Route] Error saving config:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});

module.exports = router;


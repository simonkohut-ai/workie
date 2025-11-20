const express = require('express');
const router = express.Router();
const admin = require('../config/firebase-admin');
const authMiddleware = require('../middleware/auth');
const workieAgent = require('../agents/WorkieAgent');
const { scheduleAgent } = require('../services/scheduler');

// Removed top-level synchronous db initialization
// const db = admin.firestore();

// Helper function to trigger agent run
async function triggerInitialAgentRun(workerConfig, userId) {
  const mockTranscript = `Okay team, today's call summary. Sarah, you confirmed the client, Apex Corp, wants the new platform branding finalized by Friday, not Monday. Joe, your key action is to gather all Q3 reports and summarize the top five marketing failures by Wednesday noon. We decided the budget for Q4 is frozen at $15k, no exceptions. I will handle drafting the follow-up email to Apex Corp and confirming the scope change.`;
  
  console.log('[Config Route] Triggering initial agent run...');
  
  try {
    // We are using the singleton workieAgent. 
    // In a real scenario, we might configure it per user/config.
    const result = await workieAgent.executeTask(mockTranscript, userId);
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

    // Lazy initialization check
    if (!admin.apps.length) {
       throw new Error("Database not initialized. Check server credentials.");
    }
    const db = admin.firestore();

    // Path: /artifacts/{appId}/users/{userId}/agentConfigs/mainWorker
    const docPath = `artifacts/${appId}/users/${userId}/agentConfigs/mainWorker`;
    
    // Save workerConfig directly as the document data
    await db.doc(docPath).set(workerConfig, { merge: true });

    console.log(`[Config Route] Successfully saved config to ${docPath}`);

    // Schedule agent if schedule is provided
    if (workerConfig.schedule && workerConfig.schedule !== 'Manual') {
      await scheduleAgent(userId, workerConfig.schedule);
    }

    // Trigger initial agent run
    // We await here to ensure we catch any immediate errors from the agent startup
    // although typical agent execution might be backgrounded in a real queue system.
    // For this synchronous feedback loop:
    await triggerInitialAgentRun(workerConfig, userId); 

    res.status(200).json({ message: 'Configuration saved successfully', path: docPath });

  } catch (error) {
    console.error('[Config Route] CRITICAL ERROR:', error);
    res.status(500).json({ 
      message: 'Server Error: Check API Keys and Firestore Credentials.',
      details: error.message 
    });
  }
});

module.exports = router;


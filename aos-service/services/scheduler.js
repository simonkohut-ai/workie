const admin = require('../config/firebase-admin');

// Placeholder App ID as per instructions
const APP_ID = 'workie-app-id';

/**
 * Schedules an agent to run at the specified time/frequency.
 * Saves the scheduled task to Firestore for persistence.
 * 
 * @param {string} userId - The user ID
 * @param {string} scheduleConfig - The schedule configuration (e.g., "Every Monday at 9 AM")
 * @param {Object} agentConfig - The full agent configuration object
 */
async function scheduleAgent(userId, scheduleConfig, agentConfig = {}) {
  console.log(`[Scheduler] Scheduling agent for user ${userId}: ${scheduleConfig}`);
  
  try {
    if (!admin.apps.length) {
      console.warn('[Scheduler] Database not initialized. Skipping Firestore save.');
      return;
    }

    const db = admin.firestore();
    
    // Generate unique task ID
    const taskId = `task-${Date.now()}`;
    
    // Path: /artifacts/{appId}/users/{userId}/scheduledTasks/{taskId}
    const taskPath = `artifacts/${APP_ID}/users/${userId}/scheduledTasks/${taskId}`;
    
    const taskDocument = {
      scheduleConfig: scheduleConfig,
      agentConfig: agentConfig,
      createdAt: Date.now(),
      status: 'scheduled',
      nextRun: null // TODO: Calculate based on scheduleConfig
    };
    
    await db.doc(taskPath).set(taskDocument);
    
    console.log(`[Scheduler] Successfully created scheduled task at ${taskPath}`);
    
    // TODO: Implement actual cron job logic using a service like:
    // - node-cron (for in-process scheduling)
    // - Vercel Cron Jobs (for serverless)
    // - External service like AWS EventBridge or Google Cloud Scheduler
    
  } catch (error) {
    console.error('[Scheduler] Error scheduling agent:', error);
    throw error;
  }
}

module.exports = { scheduleAgent };

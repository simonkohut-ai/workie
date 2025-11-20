const workieAgent = require('../agents/WorkieAgent');
const { scheduleAgent } = require('../services/scheduler');

async function testAgent() {
  const mockTranscript = `Okay team, today's call summary. Sarah, you confirmed the client, Apex Corp, wants the new platform branding finalized by Friday, not Monday. Joe, your key action is to gather all Q3 reports and summarize the top five marketing failures by Wednesday noon. We decided the budget for Q4 is frozen at $15k, no exceptions. I will handle drafting the follow-up email to Apex Corp and confirming the scope change.`;

  console.log('Running WorkieAgent test...');

  try {
    if (!process.env.GOOGLE_API_KEY) {
      console.warn('WARNING: GOOGLE_API_KEY not set. Test may fail if not using a mock.');
    }

    // Use a mock user ID for testing usage tracking
    const mockUserId = 'test-user-123';
    const result = await workieAgent.executeTask(mockTranscript, mockUserId);
    
    console.log('Result:', JSON.stringify(result, null, 2));

    const hasSummary = result.hasOwnProperty('summary');
    const hasActionItems = Array.isArray(result.actionItems);
    const hasDraftEmail = result.hasOwnProperty('draftEmail');

    if (hasSummary && hasActionItems && hasDraftEmail) {
      console.log('TEST PASSED: All required keys are present.');
    } else {
      console.error('TEST FAILED: Missing required keys.');
      process.exit(1);
    }

  } catch (error) {
    console.error('TEST FAILED with error:', error);
    process.exit(1);
  }
}

async function testScheduler() {
  console.log('\nRunning Scheduler test...');
  
  const mockUserId = 'test-user-scheduler';
  const mockSchedule = 'Every Monday at 9:00 AM';
  const mockAgentConfig = {
    role: 'Project Manager',
    active: true
  };

  try {
    await scheduleAgent(mockUserId, mockSchedule, mockAgentConfig);
    console.log('SCHEDULER TEST PASSED: Task scheduled successfully.');
  } catch (error) {
    console.error('SCHEDULER TEST FAILED:', error);
    // Don't exit on scheduler test failure if DB not available
  }
}

async function runAllTests() {
  await testAgent();
  await testScheduler();
  console.log('\nAll tests completed.');
}

runAllTests();

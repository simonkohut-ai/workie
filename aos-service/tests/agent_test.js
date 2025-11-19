const workieAgent = require('../agents/WorkieAgent');

async function testAgent() {
  console.log('Starting Agent Test...');
  
  const mockTranscript = `
    Project Manager: "Okay team, let's sync on the Q4 deliverables."
    Designer: "I'm nearly done with the UI mocks, just need approval on the color palette."
    Project Manager: "Great. Let's lock that in by Wednesday. I'll review it tomorrow."
    Developer: "I'm blocked on the API integration until the docs are updated."
    Project Manager: "I'll ping the backend team about the docs right after this call."
  `;

  try {
    // Check if API key is present
    if (!process.env.GOOGLE_API_KEY) {
      console.warn('WARNING: GOOGLE_API_KEY not set. This test will likely fail or need mocking.');
    }

    const result = await workieAgent.executeTask(mockTranscript);
    
    console.log('Agent Result:', JSON.stringify(result, null, 2));

    // Validation
    if (result.summary && Array.isArray(result.actionItems) && result.draftEmail) {
      console.log('TEST PASSED: JSON structure is correct.');
    } else {
      console.error('TEST FAILED: JSON structure is incorrect.');
      console.error('Received keys:', Object.keys(result));
      process.exit(1);
    }

  } catch (error) {
    console.error('TEST FAILED with error:', error);
    process.exit(1);
  }
}

testAgent();


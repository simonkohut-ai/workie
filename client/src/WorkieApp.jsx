import React, { useState } from 'react';

// Placeholder for Billing Component
const BillingComponent = () => {
  const handleManageSubscription = async () => {
    alert("Redirecting to Stripe Customer Portal... (Integration Pending)");
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #eee', borderRadius: '8px' }}>
      <h3>Billing & Subscription</h3>
      <p>Manage your plan and view invoice history.</p>
      <button 
        onClick={handleManageSubscription}
        style={{
          padding: '10px 20px',
          backgroundColor: '#6772e5', // Stripe blurple
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Manage Subscription
      </button>
    </div>
  );
};

export default function WorkieApp() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [agentResult, setAgentResult] = useState(null);
  const [schedule, setSchedule] = useState('');

  // Demo Mode Configuration
  const DEMO_MODE = true; 

  const saveConfiguration = async () => {
    setLoading(true);
    setStatus('Updating Workie...');
    setAgentResult(null);

    // Configuration payload
    const workerConfig = {
      active: true,
      mode: 'auto',
      schedule: schedule || 'Manual',
      settings: {
        tone: 'friendly',
        responseTime: 'immediate'
      }
    };

    if (DEMO_MODE) {
      // Simulate API delay
      setTimeout(() => {
        setLoading(false);
        setStatus('Success: Agent Configured & Deployed (Demo Mode)');
        setAgentResult({
          summary: "The client, Apex Corp, needs the new platform branding finalized by Friday. Q4 budget is frozen at $15k.",
          actionItems: [
            "Finalize platform branding by Friday (Sarah)",
            "Gather Q3 reports and summarize failures by Wednesday (Joe)",
            "Draft follow-up email to Apex Corp (Manager)"
          ],
          draftEmail: "Hi Team,\n\nJust a quick recap: we're locking in the branding for Apex Corp by Friday. Joe, please have those Q3 reports ready by Wednesday. Also, note the Q4 budget freeze at $15k.\n\nLet's crush it!\n\nBest,\nWorkie"
        });
      }, 2000);
      return;
    }

    // Real API Call (Use relative path for Vercel deployment)
    const aosEndpoint = '/api/config';

    try {
      const response = await fetch(aosEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'test-user-frontend'
        },
        body: JSON.stringify({ workerConfig })
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`Success: ${data.message}`);
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.error || errorData.message}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus(`Network Error: ${error.message}`);
    } finally {
      if (!DEMO_MODE) setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Workie Admin</h1>
      <p>Manage your Freelancer Admin Agent</p>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2>Agent Configuration</h2>
        <p>Status: <strong>{loading ? 'Processing...' : (status || 'Idle')}</strong></p>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Schedule:
          </label>
          <select 
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            style={{
              width: '100%',
              padding: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              fontSize: '14px'
            }}
          >
            <option value="">Manual (No Schedule)</option>
            <option value="Every Monday at 9 AM">Every Monday at 9 AM</option>
            <option value="Every Friday at 5 PM">Every Friday at 5 PM</option>
            <option value="Daily at 8 AM">Daily at 8 AM</option>
            <option value="Weekly on Wednesday at 2 PM">Weekly on Wednesday at 2 PM</option>
          </select>
        </div>
        
        <button 
          onClick={saveConfiguration}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {loading ? 'Deploying...' : 'Save Configuration & Deploy Agent'}
        </button>

        {agentResult && (
          <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #eee' }}>
            <h3 style={{ marginTop: 0 }}>Agent Output (Demo)</h3>
            <div style={{ marginBottom: '10px' }}>
              <strong>Summary:</strong>
              <p>{agentResult.summary}</p>
            </div>
            <div style={{ marginBottom: '10px' }}>
              <strong>Action Items:</strong>
              <ul>
                {agentResult.actionItems.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <strong>Draft Email:</strong>
              <pre style={{ whiteSpace: 'pre-wrap', backgroundColor: '#fff', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
                {agentResult.draftEmail}
              </pre>
            </div>
          </div>
        )}
      </div>

      <BillingComponent />
    </div>
  );
}

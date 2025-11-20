import React, { useState } from 'react';

// Placeholder for Billing Component
const BillingComponent = () => {
  const handleManageSubscription = async () => {
    // In a real implementation, this would call a backend endpoint
    // to create a Stripe Customer Portal session and redirect the user.
    // Example: window.location.href = '/api/stripe/create-portal-session';
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
  const [demoMode, setDemoMode] = useState(true); // Default to Demo Mode

  const saveConfiguration = async () => {
    setLoading(true);
    setStatus('Processing...');

    if (demoMode) {
        // SIMULATED BACKEND RESPONSE
        setTimeout(() => {
            setLoading(false);
            setStatus('Success: Configuration saved. Agent output: Summary: 3 decisions made. Action Items: 2 tasks assigned. Email draft created.');
        }, 2000);
        return;
    }

    // Configuration payload
    const workerConfig = {
      active: true,
      mode: 'auto',
      settings: {
        tone: 'friendly',
        responseTime: 'immediate'
      }
    };

    // Use relative path for Vercel deployment
    const aosEndpoint = '/api/config';

    try {
      const response = await fetch(aosEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-id': 'test-user-frontend' // Simulating auth
        },
        body: JSON.stringify({ workerConfig })
      });

      if (response.ok) {
        const data = await response.json();
        setStatus(`Success: ${data.message}`);
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus(`Network Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Workie Admin</h1>
      <p>Manage your Freelancer Admin Agent</p>
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px', marginBottom: '20px' }}>
        <h2>Agent Configuration</h2>
        
        <div style={{ marginBottom: '15px' }}>
            <label>
                <input 
                    type="checkbox" 
                    checked={demoMode} 
                    onChange={(e) => setDemoMode(e.target.checked)} 
                />
                {' '}Enable Demo Mode (Bypass Backend)
            </label>
        </div>

        <p>Status: {loading ? 'Processing...' : 'Idle'}</p>
        
        <button 
          onClick={saveConfiguration}
          disabled={loading}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Saving...' : 'Save & Test Agent'}
        </button>

        {status && (
          <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
            <strong>Log:</strong> {status}
          </div>
        )}
      </div>

      <BillingComponent />
    </div>
  );
}

import React, { useState } from 'react';

export default function WorkieApp() {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const saveConfiguration = async () => {
    setLoading(true);
    setStatus('Saving...');

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
    // When running locally with separate ports, you might need a proxy or full URL
    // But for Vercel, relative path /api/... maps to the serverless function
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
      
      <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', maxWidth: '400px' }}>
        <h2>Agent Configuration</h2>
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
    </div>
  );
}


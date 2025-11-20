import React, { useState } from 'react';
import './WorkieApp.css';

export default function WorkieApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Act as a meticulous project manager. When I upload a transcript, extract all decisions and action items.");
  const [schedule, setSchedule] = useState("manual");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const demoOutput = {
    task: 'Weekly Client Sync - Apex Corp',
    summary: "Client approved the Q4 rebrand design layout. Q4 marketing budget is frozen at $15k, no exceptions. Deadline for platform branding moved from Monday to Friday (Sarah confirmed).",
    actionItems: [
      "Sarah: Finalize platform branding assets by Friday.",
      "Joe: Gather Q3 reports and summarize the top five failures by Wednesday noon.",
      "Workie (User): Handle drafting follow-up email to Apex Corp and confirming scope change."
    ],
    draftEmail: `Subject: Quick Recap: Apex Corp Design & Next Steps

Hi Apex Team,

Following our successful synchronization call, I wanted to quickly confirm the two main points and outline the next steps for Joe and Sarah.

Decisions Confirmed:
1. The Q4 rebrand design layout is approved.
2. The platform branding deadline is officially moved to Friday.
3. Q4 Budget is strictly frozen at $15,000.

Action Items:
* Sarah: Finalize the new platform branding assets by Friday.
* Joe: Submit the summary of Q3 marketing failures by Wednesday noon.

Let me know if you have any questions, and we'll ensure these action items are completed promptly.

Best regards,
[Your Name]`,
    tokensUsed: 5123
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(demoOutput.draftEmail.trim()).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1500);
    });
  };

  const summaryPoints = demoOutput.summary.split('. ').filter(s => s.trim());

  return (
    <div className="app-container">
      <div className="max-width-container">
        {/* Header */}
        <header className="header">
          <div className="header-content">
            <div className="logo">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)"/>
                <path d="M10.8286 21.1714L16 16L10.8286 10.8286L13.6571 8L21.1714 15.5143C21.9543 16.2971 21.9543 17.5543 21.1714 18.3371L13.6571 25.8514L10.8286 23.0229V21.1714Z" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="16" y1="0" x2="16" y2="32">
                    <stop stopColor="#34D399"/>
                    <stop offset="1" stopColor="#22D3EE"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1>Workie Dashboard</h1>
          </div>
          <p className="subtitle">Your dedicated Freelancer Admin Agent for effortless delegation.</p>
        </header>

        {/* Token Banner */}
        <div className="token-banner">
          <div className="token-info">
            <p className="label">Current Role</p>
            <h3>Freelancer Admin Agent</h3>
            <p className="schedule">Schedule: {schedule === 'manual' ? 'Manual (No Schedule)' : schedule}</p>
          </div>
          <div className="token-progress">
            <div className="progress-header">
              <p className="label">Monthly Token Quota</p>
              <span className="quota">45,123 / 250,000</span>
            </div>
            <div className="progress-bar-container">
              <div className="progress-bar" style={{ width: '82%' }}></div>
            </div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="main-grid">
          {/* Configuration */}
          <div className="config-panel">
            <h2>Configuration Center</h2>
            <form onSubmit={handleSubmit}>
              <label>Worker Role (Job Description)</label>
              <textarea
                rows="4"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              
              <label>Schedule Task</label>
              <select value={schedule} onChange={(e) => setSchedule(e.target.value)}>
                <option value="manual">Manual (No Schedule)</option>
                <option value="Every Monday at 9:00 AM">Every Monday at 9:00 AM</option>
                <option value="Daily at 8:00 AM">Daily at 8:00 AM</option>
              </select>

              <button type="submit" disabled={isLoading} className={`submit-btn ${isLoading ? 'loading' : ''}`}>
                {isLoading ? 'Agent Working...' : 'Save Configuration & Run Agent'}
              </button>
            </form>
          </div>

          {/* Output */}
          <div className="output-panel">
            <h2>Agent Output (Last Run)</h2>
            
            <div className="task-meta">
              <p className="task-name">{demoOutput.task}</p>
              <p className="task-info">Run ID: DEMO-{Date.now().toString().slice(-8)} | Tokens Used: {demoOutput.tokensUsed.toLocaleString()}</p>
            </div>

            <div className="section">
              <h3>Key Decisions</h3>
              <ul className="summary-list">
                {summaryPoints.map((point, idx) => (
                  <li key={idx}><span className="bullet">•</span> {point.trim()}.</li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3>Action Items</h3>
              <div className="action-items">
                {demoOutput.actionItems.map((item, idx) => (
                  <div key={idx} className="action-item">
                    <span className="checkmark">✓</span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="section">
              <h3>Draft Follow-up Email</h3>
              <pre className="email-draft">{demoOutput.draftEmail}</pre>
              <button onClick={copyEmail} className="copy-btn">
                Copy Email to Clipboard
              </button>
              {showCopyMessage && <span className="copy-message">Copied!</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Choose Your Workie Plan</h2>
              <button onClick={() => setShowModal(false)} className="close-btn">×</button>
            </div>
            
            <div className="pricing-grid">
              <div className="pricing-card">
                <h3>Micro</h3>
                <p className="plan-desc">Perfect for personal use</p>
                <p className="price">$4.99<span>/mo</span></p>
                <p className="tokens">50,000 Tokens</p>
                <button>Start Micro Plan</button>
              </div>

              <div className="pricing-card recommended">
                <span className="badge">RECOMMENDED</span>
                <h3>Flow</h3>
                <p className="plan-desc">Ideal for freelancers</p>
                <p className="price">$14.99<span>/mo</span></p>
                <p className="tokens">250,000 Tokens</p>
                <button>Upgrade to Flow</button>
              </div>

              <div className="pricing-card">
                <h3>Pro</h3>
                <p className="plan-desc">For agencies</p>
                <p className="price">$39.99<span>/mo</span></p>
                <p className="tokens">1,000,000 Tokens</p>
                <button>Go Pro</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';

export default function WorkieApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Act as a meticulous project manager. When I upload a transcript, extract all action items and draft a concise client email.");
  const [schedule, setSchedule] = useState("manual");
  const [showCopyMessage, setShowCopyMessage] = useState(false);

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
    tokensUsed: 5123,
    tokensRemaining: 44877,
    tokensTotal: 50000
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(demoOutput.draftEmail).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1500);
    });
  };

  const summaryPoints = demoOutput.summary.split('. ').filter(s => s.trim());

  return (
    <div className="min-h-screen text-gray-100" style={{ backgroundColor: '#0f172a', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #34D399; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #1e293b; }
        
        @keyframes shimmer {
          0% { opacity: 0.6; }
          50% { opacity: 1; }
          100% { opacity: 0.6; }
        }
        .pulse-animation { animation: shimmer 1.5s ease-in-out infinite; }
        
        .premium-shadow {
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 4px 10px -4px rgba(0, 0, 0, 0.3);
        }
        
        .inner-shadow {
          box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Token Bar - Enhanced */}
      <div className="w-full py-4 px-6 border-b border-gray-700" style={{ backgroundColor: '#1e293b' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-300 uppercase tracking-wide">Monthly Token Usage</span>
            <span className="text-sm font-mono text-gray-400">{demoOutput.tokensRemaining.toLocaleString()} / {demoOutput.tokensTotal.toLocaleString()}</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-3 inner-shadow">
            <div 
              className="h-3 rounded-full transition-all duration-500"
              style={{ 
                width: `${(demoOutput.tokensRemaining / demoOutput.tokensTotal) * 100}%`,
                background: 'linear-gradient(90deg, #34D399 0%, #10B981 100%)'
              }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 sm:p-12">
        {/* Header - Enhanced Spacing */}
        <header className="mb-16">
          <div className="flex items-center mb-3">
            <div className="w-12 h-12 flex items-center justify-center mr-4">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)"/>
                <path d="M10.8286 21.1714L16 16L10.8286 10.8286L13.6571 8L21.1714 15.5143C21.9543 16.2971 21.9543 17.5543 21.1714 18.3371L13.6571 25.8514L10.8286 23.0229V21.1714Z" fill="white" opacity="0.95"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="16" y1="0" x2="16" y2="32">
                    <stop stopColor="#34D399"/>
                    <stop offset="1" stopColor="#22D3EE"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif', color: '#f1f5f9' }}>
              Workie Dashboard
            </h1>
          </div>
          <p className="text-lg text-gray-400 font-medium">Your dedicated Freelancer Admin Agent for effortless delegation.</p>
        </header>

        {/* Main Grid - Increased Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-900 p-8 rounded-2xl premium-shadow border border-gray-700">
              <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#f1f5f9' }}>
                Define Workie's Role
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                  Workie Role (Job Description)
                </label>
                <textarea
                  rows="5"
                  className="w-full p-4 border-2 border-gray-700 rounded-xl mb-6 bg-gray-800 text-gray-100 text-base leading-relaxed focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                
                <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Schedule</label>
                <select 
                  className="w-full p-4 border-2 border-gray-700 rounded-xl mb-8 bg-gray-800 text-gray-100 text-base focus:ring-2 focus:ring-teal-400 focus:border-teal-400 transition-all"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <option value="manual">Manual (No Schedule)</option>
                  <option value="monday">Every Monday at 9:00 AM</option>
                  <option value="daily">Daily at 8:00 AM</option>
                </select>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-6 font-extrabold text-lg rounded-xl shadow-2xl transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-2xl disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center ${isLoading ? 'pulse-animation' : ''}`}
                  style={{ 
                    backgroundColor: '#34D399', 
                    color: '#0f172a', 
                    fontFamily: 'Outfit, sans-serif',
                    boxShadow: '0 10px 25px -5px rgba(52, 211, 153, 0.5)'
                  }}
                >
                  {isLoading && (
                    <svg className="animate-spin mr-3 h-6 w-6" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isLoading ? 'Agent Working...' : 'Save Configuration & Run Agent'}</span>
                </button>
              </form>
            </div>

            {/* Billing Section - Enhanced */}
            <div className="bg-gray-800 p-8 rounded-2xl premium-shadow border border-gray-700">
              <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Outfit, sans-serif', color: '#f1f5f9' }}>
                Billing & Subscription
              </h2>
              <p className="text-base text-gray-400 mb-6 leading-relaxed">Manage your plan, view usage, and top-up tokens instantly.</p>
              <button 
                className="px-6 py-3 text-base font-extrabold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
                style={{ 
                  backgroundColor: '#FBBF24', 
                  color: '#0f172a',
                  fontFamily: 'Outfit, sans-serif',
                  boxShadow: '0 8px 20px -4px rgba(251, 191, 36, 0.4)'
                }}
              >
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Right Column: Agent Output - Enhanced */}
          <div className="lg:col-span-3">
            <div className="p-10 rounded-2xl premium-shadow border border-gray-700 custom-scroll max-h-[85vh] overflow-y-auto" style={{ backgroundColor: '#1e293b' }}>
              <h2 className="text-3xl font-extrabold mb-8" style={{ fontFamily: 'Outfit, sans-serif', color: '#f1f5f9' }}>
                Agent Output
              </h2>

              {/* Task Metadata - Enhanced Card */}
              <div className="mb-10 p-5 rounded-xl border-2 border-gray-600 bg-gray-800/50 backdrop-blur">
                <p className="text-base font-bold text-gray-200 mb-1">{demoOutput.task}</p>
                <p className="text-sm font-mono text-gray-500">
                  Run ID: DEMO-{Date.now().toString().slice(-8)} | Tokens: {demoOutput.tokensUsed.toLocaleString()}
                </p>
              </div>

              {/* Summary - Distinct Card Treatment */}
              <div className="mb-12 p-6 rounded-xl" style={{ backgroundColor: '#0f172a', border: '2px solid #1e293b' }}>
                <h3 className="text-2xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#34D399' }}>
                  Key Decisions
                </h3>
                <ul className="space-y-4">
                  {summaryPoints.map((item, idx) => (
                    <li key={idx} className="flex items-start text-lg leading-relaxed">
                      <div className="w-3 h-3 rounded-full mr-4 mt-2 flex-shrink-0" style={{ backgroundColor: '#34D399' }} />
                      <span className="text-gray-200 font-medium">{item.trim()}.</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items - Unique Icon Treatment */}
              <div className="mb-12">
                <h3 className="text-2xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#FBBF24' }}>
                  Action Items
                </h3>
                <div className="space-y-4">
                  {demoOutput.actionItems.map((item, idx) => {
                    const assignee = item.split(':')[0].trim();
                    const task = item.split(':')[1]?.trim() || item;
                    return (
                      <div key={idx} className="flex items-start p-5 rounded-xl bg-gray-800/70 border border-gray-700 transition-all duration-200 hover:bg-gray-700/70 hover:border-teal-500/50">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full mr-4 flex-shrink-0" style={{ backgroundColor: '#FBBF24' }}>
                          <svg className="h-6 w-6" style={{ color: '#0f172a' }} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-teal-300 mb-1">{assignee}</p>
                          <p className="text-base text-gray-200 leading-relaxed">{task}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Draft Email - Premium Treatment */}
              <div>
                <h3 className="text-2xl font-extrabold mb-6" style={{ fontFamily: 'Outfit, sans-serif', color: '#f1f5f9' }}>
                  Draft Follow-up Email
                </h3>
                <div className="rounded-xl overflow-hidden border-2 border-gray-600 premium-shadow">
                  <pre className="p-6 bg-gray-900 text-sm text-gray-300 whitespace-pre-wrap leading-relaxed custom-scroll max-h-80 overflow-y-auto" style={{ fontFamily: 'Consolas, Monaco, monospace' }}>
                    {demoOutput.draftEmail}
                  </pre>
                </div>
                <div className="mt-4 flex items-center">
                  <button 
                    onClick={copyEmail}
                    className="px-6 py-3 text-base font-extrabold rounded-xl transition-all duration-200 hover:scale-[1.02] shadow-lg"
                    style={{ 
                      backgroundColor: '#34D399', 
                      color: '#0f172a',
                      fontFamily: 'Outfit, sans-serif',
                      boxShadow: '0 8px 20px -4px rgba(52, 211, 153, 0.4)'
                    }}
                  >
                    Copy Email to Clipboard
                  </button>
                  {showCopyMessage && (
                    <span className="ml-4 text-base font-semibold text-teal-400 animate-pulse">✓ Copied!</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

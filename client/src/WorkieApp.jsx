import React, { useState, useEffect } from 'react';

export default function WorkieApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Act as a meticulous project manager. When I upload a transcript, extract all action items and draft a concise client email.");
  const [schedule, setSchedule] = useState("manual");
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  // Demo Data
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

    // Simulate 2.5s delay
    setTimeout(() => {
      setIsLoading(false);
    }, 2500);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(demoOutput.draftEmail).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1500);
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-10 text-gray-100" style={{ backgroundColor: '#111827', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Inter:wght@400;500;700&display=swap');
        
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #34D399; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #2e2e2e; }
        
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.03); }
          100% { transform: scale(1); }
        }
        .pulse-animation { animation: pulse-once 0.5s ease-in-out infinite; }
      `}</style>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 border-b border-gray-700 pb-4">
          <div className="flex items-center">
            {/* Logo */}
            <div className="w-8 h-8 flex items-center justify-center mr-3">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Workie Dashboard</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">Your dedicated Freelancer Admin Agent for effortless delegation.</p>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Left Column: Configuration */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-6 rounded-xl shadow-2xl border border-gray-700 mb-8">
              <h2 className="text-xl font-semibold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Define Workie's Role
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Workie Role (Job Description)
                </label>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-gray-700 rounded-lg mb-4 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                />
                
                <label className="block text-sm font-medium text-gray-300 mb-1">Schedule</label>
                <select 
                  className="w-full p-3 border border-gray-700 rounded-lg mb-8 bg-gray-800 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                  className={`w-full py-3 px-4 font-bold rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center ${isLoading ? 'pulse-animation' : ''}`}
                  style={{ backgroundColor: '#34D399', color: '#1a1a1a', fontFamily: 'Outfit, sans-serif' }}
                >
                  {isLoading && (
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isLoading ? 'Agent Working...' : 'Save Configuration & Run Agent'}</span>
                </button>
              </form>
            </div>

            {/* Billing Section */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Billing & Subscription
              </h2>
              <p className="text-sm text-gray-400 mb-4">Manage your plan, view usage, and top-up tokens instantly.</p>
              <button className="px-4 py-2 text-sm font-bold rounded-lg transition duration-200" style={{ backgroundColor: '#FBBF24', color: '#1a1a1a' }}>
                Manage Subscription
              </button>
            </div>
          </div>

          {/* Right Column: Agent Output */}
          <div className="lg:col-span-3">
            <div className="p-6 rounded-xl shadow-2xl border border-gray-700 custom-scroll max-h-[85vh] overflow-y-auto" style={{ backgroundColor: '#1f2937' }}>
              <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Agent Output (Last Run)
              </h2>

              {/* Task Metadata */}
              <div className="mb-6 p-3 rounded-lg border border-gray-700 bg-gray-800">
                <p className="text-sm font-semibold text-gray-300">{demoOutput.task}</p>
                <p className="text-xs font-mono text-gray-500 mt-1">
                  Run ID: DEMO-{Date.now().toString().slice(-8)} | Tokens Used: {demoOutput.tokensUsed.toLocaleString()}
                </p>
              </div>

              {/* Summary */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-3">Key Decisions</h3>
                <ul className="list-none space-y-3 text-lg font-medium">
                  {demoOutput.summary.split('. ').filter(s => s.trim()).map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-teal-400 font-bold text-lg mr-2">•</span> {item.trim()}.
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Action Items (Ready to Delegate)</h3>
                <div className="space-y-3">
                  {demoOutput.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center p-2 rounded-lg bg-gray-800 transition duration-150 hover:bg-gray-700">
                      <svg className="h-5 w-5 text-yellow-400 mr-3 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Draft Email */}
              <div className="mb-4">
                <h3 className="text-xl font-bold text-white mb-3">Draft Follow-up Email</h3>
                <pre className="p-4 rounded-lg border border-gray-600 bg-gray-900 text-sm italic text-gray-300 whitespace-pre-wrap custom-scroll overflow-y-auto max-h-64">
                  {demoOutput.draftEmail}
                </pre>
                <button 
                  onClick={copyEmail}
                  className="mt-3 px-4 py-2 text-sm font-bold rounded-lg transition duration-150"
                  style={{ backgroundColor: '#34D399', color: '#1a1a1a' }}
                >
                  Copy Email to Clipboard
                </button>
                {showCopyMessage && (
                  <span className="ml-3 text-sm text-green-400">Copied!</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

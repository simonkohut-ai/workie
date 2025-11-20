import React, { useState } from 'react';

export default function WorkieApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Act as a meticulous project manager. When I upload a transcript, extract all action items and draft a concise client email.");
  const [schedule, setSchedule] = useState("manual");
  const [showCopyMessage, setShowCopyMessage] = useState(false);

  const demoOutput = {
    summary: "Client approved the Q4 rebrand design layout. Q4 marketing budget is frozen at $15k. Deadline for platform branding moved from Monday to Friday (Sarah confirmed).",
    actionItems: [
      "Sarah: Finalize platform branding assets by Friday.",
      "Joe: Gather Q3 reports and summarize the top five failures by Wednesday noon.",
      "Workie (User): Handle drafting follow-up email to Apex Corp and confirming scope change."
    ],
    draftEmail: `Subject: Quick Recap: Apex Corp Design & Next Steps

Hi Apex Team,

Following our successful synchronization call, I wanted to quickly confirm the two main points and outline the next steps for Joe and Sarah.

**Decisions Confirmed:**
1. The Q4 rebrand design layout is approved.
2. The platform branding deadline is officially moved to Friday.
3. Q4 Budget is strictly frozen at $15,000.

**Action Items:**
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
    navigator.clipboard.writeText(demoOutput.draftEmail).then(() => {
      setShowCopyMessage(true);
      setTimeout(() => setShowCopyMessage(false), 1500);
    });
  };

  const summaryPoints = demoOutput.summary.split('. ').filter(s => s.trim());

  return (
    <div className="min-h-screen p-4 sm:p-8 text-gray-100" style={{ backgroundColor: '#1a1a1a', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Inter:wght@400;500;700&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 8px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #34D399; border-radius: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: #2e2e2e; }
      `}</style>

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="mb-10 border-b border-gray-700 pb-4">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: '#34D399' }}>
              <svg className="h-5 w-5 text-gray-900" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold" style={{ fontFamily: 'Outfit, sans-serif' }}>Workie Dashboard</h1>
          </div>
          <p className="text-sm text-gray-400 mt-1">Your dedicated Freelancer Admin Agent is ready to work.</p>
        </header>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
            <p className="text-sm font-medium text-gray-400">Current Plan</p>
            <h3 className="text-xl font-semibold text-white mt-1">Flow Tier</h3>
            <p className="text-xs font-mono text-gray-500">250,000 Tokens/Mo</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700">
            <p className="text-sm font-medium text-gray-400">Last Task Status</p>
            <h3 className={`text-xl font-semibold mt-1 ${isLoading ? 'text-yellow-400 animate-pulse' : 'text-green-400'}`}>
              {isLoading ? 'Processing...' : 'Completed'}
            </h3>
            <p className="text-xs font-mono text-gray-500">Just Now (Demo Mode)</p>
          </div>
          <div className="bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-700 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-400">Tokens Remaining</p>
              <h3 className="text-xl font-semibold text-white mt-1">245,123</h3>
            </div>
            <button className="px-3 py-1 text-sm rounded-full font-medium transition duration-200" style={{ backgroundColor: '#FBBF24', color: '#1a1a1a' }}>
              Top-Up
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Configuration */}
          <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 h-fit">
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Define Workie's Role
            </h2>
            <form onSubmit={handleSubmit}>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Workie Role (Job Description)
              </label>
              <textarea
                rows="4"
                className="w-full p-3 border border-gray-600 rounded-lg mb-4 bg-gray-900 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
              
              <label className="block text-sm font-medium text-gray-300 mb-1">Schedule</label>
              <select 
                className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-gray-900 text-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
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
                className="w-full py-3 px-4 font-bold text-gray-900 rounded-lg shadow-md transition duration-200 ease-in-out transform hover:scale-[1.01] disabled:opacity-50 flex items-center justify-center"
                style={{ backgroundColor: '#34D399', fontFamily: 'Outfit, sans-serif' }}
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

          {/* Agent Output */}
          <div className="p-6 rounded-xl shadow-lg border border-gray-700 custom-scroll max-h-[80vh] overflow-y-auto" style={{ backgroundColor: '#2e2e2e' }}>
            <h2 className="text-2xl font-semibold mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Agent Output (Last Run)
            </h2>
            
            <div className="space-y-6">
              {/* Run Info */}
              <div className="border-b border-gray-700 pb-4">
                <p className="text-sm font-medium text-gray-400">Run ID: DEMO-{Date.now().toString().slice(-8)}</p>
                <h3 className="text-lg font-bold text-white mt-2">Summary of Key Decisions</h3>
                <ul className="list-none space-y-2 mt-2 text-gray-300">
                  {summaryPoints.map((point, idx) => (
                    <li key={idx}>
                      <span className="text-teal-400 font-bold mr-1">•</span> {point.trim()}.
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Items */}
              <div className="border-b border-gray-700 pb-4">
                <h3 className="text-lg font-bold text-white mb-3">Action Items (Assigned)</h3>
                <div className="space-y-3">
                  {demoOutput.actionItems.map((item, idx) => (
                    <div key={idx} className="flex items-center">
                      <svg className="h-5 w-5 text-yellow-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <p className="text-gray-300">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Draft Email */}
              <div>
                <h3 className="text-lg font-bold text-white mb-2">Draft Follow-up Email</h3>
                <div className="p-4 rounded-lg border border-gray-600 bg-gray-900 text-sm italic text-gray-300 whitespace-pre-wrap">
                  {demoOutput.draftEmail}
                </div>
                <button 
                  onClick={copyEmail}
                  className="mt-3 px-4 py-2 text-sm font-medium rounded-lg text-gray-900 transition duration-150"
                  style={{ backgroundColor: '#34D399' }}
                >
                  Copy Email to Clipboard
                </button>
                {showCopyMessage && (
                  <span className="ml-3 text-sm text-green-400">Copied!</span>
                )}
                <p className="text-xs text-gray-500 mt-2">Tokens Used: {demoOutput.tokensUsed.toLocaleString()} | Status logged to billing tracker.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

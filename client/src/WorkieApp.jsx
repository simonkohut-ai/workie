import React, { useState, useEffect } from 'react';

export default function WorkieApp() {
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState("Act as a meticulous project manager. When I upload a transcript, extract all all decisions and action items.");
  const [schedule, setSchedule] = useState("Manual (No Schedule)");
  const [showCopyMessage, setShowCopyMessage] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const summaryPoints = demoOutput.summary.split('. ').filter(s => s.trim());

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [showModal]);

  return (
    <div className="min-h-screen p-4 sm:p-12 text-gray-100" style={{ backgroundColor: '#0d1219', fontFamily: 'Inter, sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .custom-scroll::-webkit-scrollbar { width: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb { background-color: #34D399; border-radius: 5px; }
        .custom-scroll::-webkit-scrollbar-track { background: #1f2937; }
        
        @keyframes pulse-once {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        .pulse-animation { animation: pulse-once 0.5s ease-in-out infinite; }
      `}</style>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 border-b-2 border-gray-800 pb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 flex items-center justify-center mr-4">
              <svg width="40" height="40" viewBox="0 0 32 32" fill="none">
                <path d="M16 32C7.16344 32 0 24.8366 0 16C0 7.16344 7.16344 0 16 0C24.8366 0 32 7.16344 32 16C32 24.8366 24.8366 32 16 32Z" fill="url(#paint0_linear)"/>
                <path d="M10.8286 21.1714L16 16L10.8286 10.8286L13.6571 8L21.1714 15.5143C21.9543 16.2971 21.9543 17.5543 21.1714 18.3371L13.6571 25.8514L10.8286 23.0229V21.1714Z" fill="white"/>
                <defs>
                  <linearGradient id="paint0_linear" x1="16" y1="0" x2="16" y2="32">
                    <stop stopColor="#34D399"/>
                    <stop offset="1" stopColor="#22D3EE"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <h1 className="text-4xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Workie Dashboard</h1>
          </div>
          <p className="text-lg text-gray-400 mt-2">Your dedicated Freelancer Admin Agent for effortless delegation.</p>
        </header>

        {/* Token Banner */}
        <div className="bg-gray-800 p-6 rounded-xl shadow-2xl border border-gray-700 mb-10 grid grid-cols-1 md:grid-cols-4 items-center gap-6">
          <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-gray-700 md:pr-6 pb-4 md:pb-0">
            <p className="text-sm font-medium text-gray-400">Current Role</p>
            <h3 className="text-xl font-bold text-white mt-1">Freelancer Admin Agent</h3>
            <p className="text-sm font-mono text-gray-500">Schedule: {schedule}</p>
          </div>

          <div className="md:col-span-3 md:pl-6 pt-4 md:pt-0">
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-sm font-medium text-gray-400">Monthly Token Quota (Transparency)</p>
              <span className="text-xl font-bold text-teal-400">45,123 / 250,000</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-full bg-gray-700 rounded-full h-3">
                <div className="h-3 rounded-full shadow-inner transition-all duration-700" style={{ width: '82%', backgroundColor: '#34D399' }}></div>
              </div>
              <button onClick={() => setShowModal(true)} className="px-4 py-2 text-sm font-bold rounded-lg transition duration-200 shadow-lg text-gray-900 hover:bg-yellow-500" style={{ backgroundColor: '#FBBF24' }}>
                Top-Up
              </button>
            </div>
          </div>
        </div>

        {/* Main Grid - 5 Column (2:3 ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          
          {/* Left: Configuration (2/5) */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 p-8 rounded-xl shadow-2xl border border-gray-700 h-fit">
              <h2 className="text-2xl font-bold mb-8 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Configuration Center
              </h2>
              <form onSubmit={handleSubmit}>
                <label className="block text-base font-semibold text-gray-200 mb-2">
                  Worker Role (Job Description)
                </label>
                <textarea
                  rows="4"
                  className="w-full p-3 border border-gray-700 rounded-lg mb-6 bg-gray-800 text-gray-200 text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
                
                <label className="block text-base font-semibold text-gray-200 mb-2">Schedule Task</label>
                <select 
                  className="w-full p-3 border border-gray-700 rounded-lg mb-8 bg-gray-800 text-gray-200 text-base focus:ring-2 focus:ring-teal-500 focus:border-teal-500 shadow-inner"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                >
                  <option value="Manual (No Schedule)">Manual (No Schedule)</option>
                  <option value="Every Monday at 9:00 AM">Every Monday at 9:00 AM</option>
                  <option value="Daily at 8:00 AM">Daily at 8:00 AM</option>
                </select>

                <label className="block text-base font-semibold text-gray-200 mb-3">Input Data (Transcript or File)</label>
                <div 
                  className="flex flex-col items-center justify-center p-8 border-4 border-dashed border-gray-600 rounded-xl mb-8 cursor-pointer transition duration-200 hover:border-teal-500 hover:bg-gray-800/50"
                  onClick={() => document.getElementById('file-input').click()}
                >
                  <svg className="h-10 w-10 text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  <p className="text-base text-gray-300 mt-3">Drag & drop file here, or click to browse</p>
                  <input type="file" id="file-input" className="hidden" accept=".txt,.srt,.vtt" onChange={handleFileChange} />
                </div>
                <p className="text-sm text-gray-500 mb-8 italic text-center">
                  {selectedFile ? `File Selected: ${selectedFile.name} (${(selectedFile.size / 1024).toFixed(1)} KB)` : 'No file selected. Using hardcoded demo transcript.'}
                </p>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-4 px-4 text-xl font-extrabold rounded-lg shadow-xl transition duration-200 ease-in-out transform disabled:opacity-50 flex items-center justify-center hover:shadow-teal-500/50 ${isLoading ? 'pulse-animation' : ''}`}
                  style={{ backgroundColor: '#34D399', color: '#0d1219', fontFamily: 'Outfit, sans-serif' }}
                >
                  {isLoading && (
                    <svg className="animate-spin mr-3 h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  )}
                  <span>{isLoading ? 'Agent Working...' : 'Save Configuration & Run Agent'}</span>
                </button>
              </form>
            </div>
          </div>

          {/* Right: Output (3/5) */}
          <div className="lg:col-span-3">
            <div className="p-8 rounded-xl shadow-2xl border border-gray-700 custom-scroll max-h-[85vh] overflow-y-auto" style={{ backgroundColor: '#1a222e' }}>
              <h2 className="text-2xl font-bold mb-6 text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Agent Output (Last Run)
              </h2>
              
              <div className="space-y-6">
                <div className="mb-6 p-4 rounded-lg border border-gray-700 bg-gray-800">
                  <p className="text-sm font-semibold text-gray-300">{demoOutput.task}</p>
                  <p className="text-xs font-mono text-gray-500 mt-1">Run ID: DEMO-{Date.now().toString().slice(-8)} | Tokens Used: {demoOutput.tokensUsed.toLocaleString()}</p>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Key Decisions</h3>
                  <ul className="list-none space-y-4 text-lg font-medium">
                    {summaryPoints.map((point, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-yellow-400 font-bold text-xl mr-3 mt-0.5">•</span> {point.trim()}.
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Action Items (Ready to Delegate)</h3>
                  <div className="space-y-4">
                    {demoOutput.actionItems.map((item, idx) => (
                      <div key={idx} className="flex items-start p-3 rounded-lg bg-gray-800 transition duration-150 hover:bg-gray-700/70 cursor-pointer">
                        <svg className="h-6 w-6 text-teal-400 mr-4 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                        <p className="text-base text-gray-300 font-medium">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>Draft Follow-up Email</h3>
                  <pre className="p-5 rounded-lg border border-gray-600 bg-gray-900 text-base italic text-gray-300 whitespace-pre-wrap custom-scroll overflow-y-auto max-h-80 shadow-inner">
                    {demoOutput.draftEmail}
                  </pre>
                  <div className="mt-4 flex items-center">
                    <button 
                      onClick={copyEmail}
                      className="px-5 py-2.5 text-base font-bold rounded-lg text-gray-900 transition duration-150 hover:bg-teal-400"
                      style={{ backgroundColor: '#34D399' }}
                    >
                      Copy Email to Clipboard
                    </button>
                    {showCopyMessage && (
                      <span className="ml-4 text-base text-green-400">Copied!</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-90 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-gray-900 w-full max-w-5xl rounded-xl shadow-3xl p-10 border border-gray-700" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start border-b border-gray-700 pb-5 mb-8">
              <h2 className="text-3xl font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>Choose Your Workie Plan</h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white transition duration-150">
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Micro Plan */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-teal-500 transition duration-200">
                <h3 className="text-2xl font-bold mb-2 text-white">Micro</h3>
                <p className="text-sm text-gray-400 mb-4">Perfect for personal use and light tasks.</p>
                <p className="text-5xl font-extrabold mb-4 text-white">$4.99<span className="text-xl font-medium text-gray-400">/mo</span></p>
                <p className="text-lg font-semibold text-teal-400 mb-4">50,000 Tokens Included</p>
                <ul className="text-base space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> 1 Active Agent</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Basic Summaries</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Token Top-Ups Available</li>
                </ul>
                <button className="w-full py-3 font-bold rounded-lg transition duration-200 text-gray-900 hover:bg-teal-400" style={{ backgroundColor: '#34D399' }}>
                  Start Micro Plan
                </button>
              </div>

              {/* Flow Plan (Recommended) */}
              <div className="bg-gray-800 p-6 rounded-xl border-4 border-yellow-500 shadow-xl transition duration-200 relative">
                <span className="absolute top-0 right-0 bg-yellow-500 text-gray-900 text-xs font-bold px-4 py-1 rounded-bl-xl rounded-tr-xl">RECOMMENDED</span>
                <h3 className="text-2xl font-bold mb-2 text-yellow-400">Flow</h3>
                <p className="text-sm text-gray-400 mb-4">Ideal for active freelancers and small teams.</p>
                <p className="text-5xl font-extrabold mb-4 text-white">$14.99<span className="text-lg font-medium text-gray-400">/mo</span></p>
                <p className="text-lg font-semibold text-teal-400 mb-4">250,000 Tokens Included</p>
                <ul className="text-base space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> 3 Active Agents</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Advanced Reasoning</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Agent Scheduling</li>
                </ul>
                <button className="w-full py-3 font-bold rounded-lg transition duration-200 text-gray-900 hover:bg-teal-400" style={{ backgroundColor: '#34D399' }}>
                  Upgrade to Flow
                </button>
              </div>

              {/* Pro Plan */}
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-teal-500 transition duration-200">
                <h3 className="text-2xl font-bold mb-2 text-white">Pro</h3>
                <p className="text-sm text-gray-400 mb-4">For agencies and heavy automation needs.</p>
                <p className="text-5xl font-extrabold mb-4 text-white">$39.99<span className="text-lg font-medium text-gray-400">/mo</span></p>
                <p className="text-lg font-semibold text-teal-400 mb-4">1,000,000 Tokens Included</p>
                <ul className="text-base space-y-2 text-gray-300 mb-6">
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Unlimited Agents</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Priority Support</li>
                  <li className="flex items-start"><svg className="h-5 w-5 text-teal-400 mr-2 mt-1 shrink-0" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg> Custom Tool Access</li>
                </ul>
                <button className="w-full py-3 font-bold rounded-lg transition duration-200 text-gray-900 hover:bg-teal-400" style={{ backgroundColor: '#34D399' }}>
                  Go Pro
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500 mt-8 text-center">All plans include our commitment to Transparency: You only pay for the tokens you use.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

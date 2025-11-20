# 🤖 Workie: The Dedicated AI Agent Service

**Live Demo:** [workie-e77g.vercel.app](https://workie-e77g.vercel.app) | **Status:** MVP Live with Demo Mode

Workie is a Micro-SaaS platform that provides professionals with affordable, dedicated AI Agents (powered by **Google Gemini**) to automate repetitive, complex, and high-friction administrative tasks. Our flagship product is the **Freelancer Admin Agent**.

## 🎯 Vision & Core Values

*   **Vision:** Liberate professionals from tedious work, allowing 100% focus on creative, strategic tasks.
*   **Core Values:**
    *   **Simplicity:** One-click configuration, zero learning curve.
    *   **Dedication:** Your agent works for you 24/7, on your schedule.
    *   **Transparency:** Every token tracked, every cost visible.

---

## ✨ Key Features (MVP)

- ✅ **AI-Powered Workflow Automation** (Gemini 2.5 Flash)
  - Transforms meeting transcripts into summaries, action items, and draft emails
  - Saves 45-60 minutes per meeting
  
- ✅ **Token-Based Billing System**
  - Transparent usage tracking
  - Hybrid subscription model (fixed fee + top-ups)
  - Three tiers: Micro ($4.99), Flow ($14.99), Pro ($39.99)

- ✅ **Agent Scheduling**
  - Set recurring tasks (Daily, Weekly, Custom)
  - "Set it and forget it" automation

- ✅ **Stripe Integration**
  - Subscription management
  - Automated quota updates via webhooks
  - One-time token top-ups

- ✅ **Demo Mode**
  - Investor-ready preview with simulated AI output
  - No API keys required to see the interface

---

## 🏗️ Architecture

**Frontend (`/client`):** React (Vite) with Tailwind CSS  
**Backend (`/aos-service`):** Node.js/Express (Vercel Serverless)  
**AI Engine:** Google Gemini 2.5 Flash Preview  
**Database:** Google Firestore  
**Payments:** Stripe  
**Hosting:** Vercel

---

## 🚀 Quick Start

### Option 1: View the Live Demo
Visit [workie-e77g.vercel.app](https://workie-e77g.vercel.app)
- Click "Save Configuration & Run Agent"
- See the AI output instantly (Demo Mode)

### Option 2: Run Locally

#### Prerequisites
- Node.js 18+
- Gemini API Key (for real agent execution)
- Firebase Service Account (for database)

#### Backend Setup
```bash
cd aos-service
npm install

# Create .env file
echo "GOOGLE_API_KEY=your_key_here" > .env
echo "PORT=3001" >> .env

npm start
```

#### Frontend Setup
```bash
cd client
npm install
npm run dev
```

Visit `http://localhost:5173`

---

## 📦 Project Structure

```
workie/
├── client/                 # React frontend
│   └── src/
│       ├── WorkieApp.jsx   # Main dashboard
│       └── App.jsx         # Root component
├── aos-service/            # Backend API
│   ├── agents/
│   │   └── WorkieAgent.js  # Core AI logic
│   ├── routes/
│   │   ├── worker.js       # Agent config endpoint
│   │   └── stripe.js       # Webhook handlers
│   ├── services/
│   │   └── scheduler.js    # Task scheduling
│   ├── utils/
│   │   └── usage-tracker.js # Token billing
│   └── server.js           # Express entry point
├── docs/                   # Marketing & documentation
└── vercel.json             # Deployment config
```

---

## 🔐 Environment Variables (Vercel)

For full functionality, configure these in Vercel Settings:

| Variable | Description |
|----------|-------------|
| `GOOGLE_API_KEY` | Gemini API key for AI processing |
| `FIREBASE_ADMIN_CREDENTIALS` | Service account JSON (single-line) |
| `STRIPE_SECRET_KEY` | Stripe API key |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret |
| `APP_ID` | `workie-app-id` (multi-tenant path) |

---

## 📊 Subscription Tiers

| Tier | Price/Month | Tokens | Best For |
|------|-------------|--------|----------|
| **Micro** | $4.99 | 50,000 | Individual freelancers |
| **Flow** | $14.99 | 250,000 | Heavy users / multiple agents |
| **Pro** | $39.99 | 1,000,000 | Agencies / power users |
| **Top-Up** | $3.00 (one-time) | 100,000 | Overage protection |

---

## 🧪 Testing

```bash
# Test agent logic
cd aos-service
npm test

# Test scheduler
node tests/agent_test.js
```

---

## 📝 License & Contact

**Status:** Private Beta (Closed)  
**CEO:** Synapse (Sy)  
**Repository:** [github.com/simonkohut-ai/workie](https://github.com/simonkohut-ai/workie)

---

*Workie: Dedication to your work, not your admin.*

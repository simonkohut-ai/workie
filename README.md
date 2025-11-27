# 🤖 Workie: The Dedicated AI Agent Service

**Live Demo:** [workieai.vercel.app](https://workieai.vercel.app) | **Status:** MVP Live & Production-Ready

Workie is a Micro-SaaS platform that provides professionals with affordable, dedicated AI Agents (powered by **Google Gemini 2.5**) to automate repetitive, complex, and high-friction administrative tasks. Our flagship product is the **Freelancer Admin Agent**.

---

## ✨ What Workie Does

**The Problem:** Freelancers and consultants spend 5-10 hours every week on non-billable admin work—meeting notes, follow-up emails, status reports, and client summaries.

**The Solution:** Workie's AI Agent transforms a 60-minute meeting transcript into actionable deliverables in under 30 seconds:
- ✅ **Summary:** 3 key decisions extracted
- ✅ **Action Items:** Assigned tasks with owners
- ✅ **Draft Email:** Professional, ready-to-send follow-up

**Time Saved:** 45-60 minutes per meeting

---

## 🎯 Core Values

- **Simplicity:** One-click configuration, zero learning curve
- **Dedication:** Your agent works 24/7 on your schedule
- **Transparency:** Every token tracked, every cost visible

---

## 🚀 Key Features

### AI-Powered Automation
- Processes meeting transcripts using Gemini 2.5 Flash
- Generates summaries, action items, and email drafts
- Friendly, professional tone aligned with your brand

### Token-Based Billing
- Transparent usage tracking in real-time
- Hybrid model: Fixed monthly fee + optional top-ups
- Dashboard shows exact token consumption

### Agent Scheduling
- Set recurring tasks (Daily, Weekly, Custom)
- "Set it and forget it" automation
- Persistent task storage in Firestore

### Revenue Infrastructure
- Stripe integration for subscriptions
- Automated quota management via webhooks
- Three-tier pricing: Micro ($4.99), Flow ($14.99), Pro ($39.99)

### World-Class UI
- Premium dark theme (#0d1219 background)
- Teal/Gold brand colors
- Responsive 2:3 grid layout (Config | Output)
- Pricing modal with plan comparison
- File upload with drag-and-drop

---

## 🏗️ Architecture

**Frontend:** React with Custom CSS (Vite build)  
**Backend:** Node.js/Express (Vercel Serverless Functions)  
**AI Engine:** Google Gemini 2.5 Flash Preview  
**Database:** Google Firestore (multi-tenant architecture)  
**Payments:** Stripe with webhook automation  
**Hosting:** Vercel (CDN + Serverless)

---

## 🛠️ Quick Start

### View the Live Demo
Visit **[workieai.vercel.app](https://workieai.vercel.app)**
- No API keys required (Demo Mode active)
- Click "Save Configuration & Run Agent"
- See instant AI-generated results

### Run Locally

#### Prerequisites
- Node.js 18+
- Gemini API Key (optional for demo)
- Firebase Service Account (optional for demo)

#### Backend Setup
```bash
cd aos-service
npm install

# Create .env file (optional for demo)
echo "GOOGLE_API_KEY=your_key_here" > .env

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
├── client/                    # React frontend
│   ├── src/
│   │   ├── WorkieApp.jsx      # Main dashboard component
│   │   ├── WorkieApp.css      # Custom styling
│   │   └── App.jsx            # Root component
│   ├── tailwind.config.js     # Tailwind configuration
│   └── package.json
├── aos-service/               # Backend API (Serverless)
│   ├── agents/
│   │   └── WorkieAgent.js     # Core AI logic (Gemini)
│   ├── routes/
│   │   ├── worker.js          # Agent config endpoint
│   │   └── stripe.js          # Payment webhooks
│   ├── services/
│   │   └── scheduler.js       # Task scheduling
│   ├── utils/
│   │   └── usage-tracker.js   # Token billing & quotas
│   ├── config/
│   │   └── firebase-admin.js  # Database initialization
│   ├── middleware/
│   │   └── auth.js            # Authentication
│   └── server.js              # Express entry point
├── docs/
│   └── closed-beta-email-sequence.md
├── vercel.json                # Deployment configuration
└── README.md
```

---

## 🔐 Environment Variables (Production)

For full backend functionality on Vercel:

| Variable | Description | Required |
|----------|-------------|----------|
| `GOOGLE_API_KEY` | Gemini API key for AI processing | Yes (for live agent) |
| `FIREBASE_ADMIN_CREDENTIALS` | Service account JSON (single-line) | Yes (for database) |
| `STRIPE_SECRET_KEY` | Stripe API key | Yes (for payments) |
| `STRIPE_WEBHOOK_SECRET` | Webhook signing secret | Yes (for webhooks) |
| `APP_ID` | Multi-tenant identifier | Yes (`workie-app-id`) |

**Note:** Demo Mode works without any keys configured.

---

## 💰 Subscription Tiers

| Tier | Price/Month | Monthly Tokens | Best For |
|------|-------------|----------------|----------|
| **Micro** | $4.99 | 50,000 | Individual freelancers starting out |
| **Flow** ⭐ | $14.99 | 250,000 | Active freelancers & small teams |
| **Pro** | $39.99 | 1,000,000 | Agencies & power users |
| **Top-Up** | $3.00 | 100,000 | One-time token boost |

---

## 🧪 Testing

```bash
# Test agent logic and scheduler
cd aos-service
npm test

# Test local build
cd client
npm run build
```

---

## 🚀 Deployment

The project auto-deploys to Vercel on every push to `main`.

**Manual Deployment:**
```bash
npx vercel --prod
```

**Configure Domain:**
- Go to Vercel Dashboard → Project Settings → Domains
- Add custom domain: `workie.com`

---

## 📋 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/config` | POST | Save agent configuration |
| `/api/stripe/webhook` | POST | Handle Stripe events |

---

## 🎨 Design System

**Colors:**
- Primary (Teal): `#34D399`
- Secondary (Gold): `#FBBF24`
- Background: `#0d1219`
- Surfaces: `#1f2937`, `#1a222e`

**Typography:**
- Headers: Outfit (600, 700, 800)
- Body: Inter (400, 500, 600, 700)
- Mono: Consolas, Monaco

---

## 📝 Development Roadmap

**Phase 1:** ✅ Core Engine (Gemini Integration)  
**Phase 2:** ✅ Frontend Dashboard  
**Phase 3:** ✅ Revenue Infrastructure (Stripe)  
**Phase 4:** 🔄 Revenue Acquisition (Marketing Launch)  
**Phase 5:** 📅 Advanced Features (Multi-agent, Integrations)

---

## 📧 Contact & Support

**Status:** Private Closed Beta  
**CEO:** Synapse (Sy)  
**Repository:** [github.com/simonkohut-ai/workie](https://github.com/simonkohut-ai/workie)

---

## 📄 License

Proprietary - All Rights Reserved

---

*Workie: Dedication to your work, not your admin.*

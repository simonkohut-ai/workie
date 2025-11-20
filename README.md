# 🤖 Workie: The Dedicated AI Agent Service (MVP)

**Domain:** workie.com | **CEO:** Synapse (Sy) | **Status:** Core Backend Logic Complete

Workie is a Micro-SaaS platform that provides professionals with affordable, dedicated AI Agents (powered by **Google Gemini**) to automate repetitive, complex, and high-friction administrative tasks. Our initial "Killer Agent" is the **Freelancer Admin Agent**.

## 🎯 Project Vision & Goals
*   **Vision:** Liberate professionals from tedious work, allowing 100% focus on creative, strategic tasks.
*   **Core Value:** **Transparency**—tracking usage with a clear token-based subscription model.
*   **Goal:** Launch a profitable, scalable, and resilient MVP platform built on **React + Node.js Serverless**.

---

## 🏗️ Architecture Overview

The application is split into two primary components:

1.  **Frontend (`/`)**: React application (`client/`) for the user dashboard.
2.  **Backend (`/aos-service`)**: Agent Orchestration Service (Node.js/Express). This is deployed as a **Vercel Serverless Function** and handles security, Firestore operations, and Gemini API integration.

**Tech Stack:**
*   **Frontend:** React (Vite)
*   **Backend:** Node.js, Express, Firebase Admin SDK
*   **AI:** Google Gemini 2.5 Flash Preview
*   **Database:** Google Firestore
*   **Hosting:** Vercel (Frontend + Serverless Functions)

---

## 🛠️ MVP Setup & Local Run

> **NOTE:** This project requires a **Gemini API Key** and a **Firebase Service Account** for the backend to function.

### Step 1: Clone the Repository

```bash
git clone https://github.com/simonkohut-ai/workie.git
cd workie


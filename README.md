# FutureProof AI Platform 🚀

**Predictive Skill Intelligence Platform**  
A full-stack React & Express web application that helps users analyze, predict, and optimize their career paths using simulated AI, real-time job market data, and skill mapping.

## ✨ Features

- **Resume Analyzer**: Upload resumes (or paste text) to extract skills, identify critical gaps, and get personalized learning resources.
- **Skill Volatility Index (SVI)**: Discover which skills are rising, stable, declining, or becoming obsolete over the next 24 months.
- **Skill Synergy Graph**: Interactive drag-and-drop neural network visualizing how skills connect and identifying high-value "Bridge Skills".
- **ROI Learning Path**: Generate step-by-step career roadmaps showing estimated timelines, learning phases, and projected salary growth.
- **Predictive Stress Test**: Simulate your current skill profile against future (2028-2030) job market conditions to calculate a Future Readiness Score.

## 🛠 Tech Stack

**Frontend (Client)**
- React 19 + Vite
- Tailwind CSS v4 (Custom Glassmorphism Design System)
- Framer Motion (Page Transitions, Interactive Components, Animated Micro-interactions)
- Recharts (Data Visualization: Area Charts, Radar Charts, Bar Charts, Radial Gauges)
- Lucide React (Icons)
- React Router DOM v7

**Backend (Server)**
- Node.js
- Express
- RESTful HTTP Endpoints (Mock AI/NLP pipelines)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### 1. Start the Backend Server

```bash
cd server
npm install
npm install dotenv # (If not installed)
node index.js
```
*The server will run on `http://localhost:5000`*

### 2. Start the Frontend Application

```bash
cd client
npm install
npm run dev
```
*The application UI will run on `http://localhost:5173`*

## 🎨 Design System

FutureProof AI relies heavily on a premium dark-mode aesthetic with deep blues and purples (`#0f0f1a` background, `#6366f1` / `#8b5cf6` gradients). It utilizes CSS backdrop filters for pure glassmorphism, animated skeleton loaders, gradient text, glowing node maps, and smooth Framer Motion container transitions on every page.

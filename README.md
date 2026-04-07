<div align="center">
  <h1>🚀 FutureProof AI Platform</h1>
  <p><strong>Predictive Skill Intelligence Platform</strong></p>
  <p>A full-stack AI-native web application that helps users analyze, predict, and optimize their career paths using real-time NLP, predictive Machine Learning algorithms, and dynamic Skill-Graph mapping.</p>
</div>

---

## ✨ Features

- **Resume Analyzer**: Upload resumes (PDF/Text) to extract skills using natively parsed NLP via `spaCy`, identifying critical gaps and outputting personalized learning resources.
- **Skill Volatility Index (SVI)**: Time-series statistical forecasting (ARIMA via `statsmodels`) dynamically determining which skills are rising, stable, declining, or becoming obsolete.
- **Skill Synergy Graph**: Computes shortest-path learning loops and centrality via `NetworkX` graph theory over mapped tech topologies.
- **ROI Learning Path**: Generate step-by-step career roadmaps showing estimated timelines, learning phases, and projected salary growth natively evaluated from the Synergy network.
- **Predictive Stress Test**: An XGBoost-simulated readiness predictor scaling your modern tech skills over an automation-risk decay axis across targeted years (2026-2035).

## 🛠 Tech Stack

| Frontend ⚛️ | Backend ⚙️ | AI Microservice 🧠 | Database & Infrastructure 🗄️ |
|:---|:---|:---|:---|
| React 19 + Vite | Node.js & Express API | FastAPI Server | MongoDB & Mongoose |
| Tailwind CSS v4 (Glassmorphism) | JSON Web Tokens | NLP: `spaCy`, `PyMuPDF` | Redis (IORedis caching) |
| Framer Motion | Proxy Layer | ML: `statsmodels`, `xgboost`, `scikit-learn` |  |
| Recharts (Data Vis) | | Graph: `networkx` | |

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed to run both the Node and Python environments:
- Node.js (v18+)
- Python (v3.9+)
- MongoDB (Running locally on `127.0.0.1:27017` or configured via `MONGO_URI`)
- Redis (Optional, running locally for endpoint caching)

### 1. Start the React Frontend
```bash
cd client
npm install
npm run dev
```
> *The application UI will run on `http://localhost:5173`*

### 2. Start the Express API Gateway
```bash
cd server
npm install
npm run start
```
> *The server will run on `http://localhost:5000`*

### 3. Start the FastAPI Python Microservice
```bash
cd ai-service
python -m venv venv

# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
# source venv/bin/activate

pip install -r requirements.txt
python -m spacy download en_core_web_sm
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```
> *(The AI Service will run on `http://localhost:8000`)*

### (Optional) Data Ingestion
You can populate the MongoDB `futureproof` jobs collection by executing the data scraper script inside your activated python venv:
```bash
cd ai-service
python data_ingestion.py
```

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/dharanivavilla28/FutureProof-AI/issues).

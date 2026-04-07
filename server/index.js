const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const multer = require('multer')
const axios = require('axios')
const FormData = require('form-data')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Redis = require('ioredis')
const User = require('./models/User')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000
const FASTAPI_URL = process.env.FASTAPI_URL || 'http://localhost:8000'
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/futureproof'
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey'

// Connect to Database
mongoose.connect(MONGO_URI).then(() => {
  console.log('📦 Connected to MongoDB')
}).catch(err => {
  console.warn('⚠️ MongoDB not detected. Running without persistent storage.')
})

// Connect to Redis
let redis;
try {
  redis = new Redis({ host: '127.0.0.1', port: 6379, maxRetriesPerRequest: 1, showFriendlyErrorStack: true });
  redis.on('error', (err) => {
    console.warn('⚠️ Redis not detected. Caching will be skipped.')
    redis.disconnect()
    redis = null
  })
} catch (e) { redis = null; }

app.use(cors())
app.use(express.json())

// Setup multer for memory storage
const upload = multer({ storage: multer.memoryStorage() })

// ─── Middleware ───────────────────────────────────────────────────────────────

const cacheMiddleware = (keyPrefix) => async (req, res, next) => {
  if (!redis) return next()
  const key = `${keyPrefix}:${req.originalUrl}`
  try {
    const cachedData = await redis.get(key)
    if (cachedData) return res.json(JSON.parse(cachedData))
    res.sendResponse = res.json
    res.json = (body) => {
      redis.setex(key, 3600, JSON.stringify(body)) // cache for 1 hour
      res.sendResponse(body)
    }
    next()
  } catch (err) { next() }
}

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) { res.status(401).json({ error: 'Not authorized, token failed' }) }
  } else { res.status(401).json({ error: 'Not authorized, no token' }) }
}

// ─── Auth Routes ──────────────────────────────────────────────────────────────
app.post('/api/auth/register', async (req, res) => {
  const { email, password, name } = req.body
  try {
    const userExists = await User.findOne({ email })
    if (userExists) return res.status(400).json({ error: 'User already exists' })
    const user = await User.create({ email, password, name })
    res.status(201).json({ _id: user._id, name: user.name, email: user.email, token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' }) })
  } catch (err) { res.status(500).json({ error: err.message }) }
})

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (user && (await user.matchPassword(password))) {
      res.json({ _id: user._id, name: user.name, email: user.email, token: jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '30d' }) })
    } else { res.status(401).json({ error: 'Invalid email or password' }) }
  } catch (err) { res.status(500).json({ error: err.message }) }
})

// ─── Mock Data ────────────────────────────────────────────────────────────────

const skillDatabase = {
  python:      { svi: 85, demand: 96, growth: 0.12, category: 'language' },
  react:       { svi: 82, demand: 88, growth: 0.08, category: 'frontend' },
  typescript:  { svi: 80, demand: 84, growth: 0.18, category: 'language' },
  tensorflow:  { svi: 78, demand: 80, growth: 0.14, category: 'ai'       },
  kubernetes:  { svi: 90, demand: 88, growth: 0.22, category: 'devops'   },
  docker:      { svi: 84, demand: 85, growth: 0.10, category: 'devops'   },
  sql:         { svi: 76, demand: 82, growth: 0.03, category: 'data'     },
  aws:         { svi: 76, demand: 82, growth: 0.09, category: 'cloud'    },
  java:        { svi: 65, demand: 70, growth: -0.02,category: 'language' },
  php:         { svi: 38, demand: 42, growth: -0.22,category: 'language' },
  angular:     { svi: 55, demand: 56, growth: -0.14,category: 'frontend' },
  langchain:   { svi: 91, demand: 93, growth: 0.61, category: 'ai'       },
  mlops:       { svi: 88, demand: 90, growth: 0.44, category: 'ai'       },
}

const trendingSkills = ['LangChain', 'MLOps', 'Vector Databases', 'Kubernetes', 'TypeScript', 'Rust', 'LLM Fine-tuning']
const risingSkills   = ['LLM Fine-tuning', 'Vector Databases', 'Platform Engineering', 'Serverless', 'WebAssembly']

// ─── Utility: extract skills from text ────────────────────────────────────────
function extractSkills(text) {
  const lower = text.toLowerCase()
  return Object.keys(skillDatabase).filter(skill => lower.includes(skill))
}

function computeGaps(found) {
  const highValueSkills = Object.entries(skillDatabase)
    .filter(([k, v]) => v.svi >= 80 && !found.includes(k))
    .sort(([,a],[,b]) => b.svi - a.svi)
    .slice(0, 5)
    .map(([k]) => k)
  return highValueSkills
}

function computeMatchScore(found) {
  if (!found.length) return 0
  const avg = found.reduce((acc, s) => acc + (skillDatabase[s]?.svi || 50), 0) / found.length
  return Math.min(100, Math.round(avg))
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// Resume Analysis
app.post('/api/resume/analyze', upload.single('file'), async (req, res) => {
  try {
    let found = [];
    
    // Check if it's a file upload or text payload
    if (req.file) {
      const formData = new FormData()
      formData.append('file', req.file.buffer, { filename: req.file.originalname })
      
      const aiRes = await axios.post(`${FASTAPI_URL}/analyze-resume`, formData, {
        headers: formData.getHeaders()
      })
      found = aiRes.data.found || []
    } else if (req.body.text) {
      // Keep backward compatibility for raw text pasting if needed
      found = extractSkills(req.body.text)
    } else {
      return res.status(400).json({ error: 'Resume file or text is required' })
    }

    const gaps  = computeGaps(found)
    const score = computeMatchScore(found)

    const suggestions = gaps.map(g => ({
      skill:    g,
      platform: ['Coursera', 'Udemy', 'DeepLearning.AI', 'edX'][Math.floor(Math.random() * 4)],
      impact:   skillDatabase[g]?.svi >= 85 ? 'High' : 'Medium',
      duration: `${Math.floor(Math.random() * 8) + 2} weeks`,
    }))

    // Save to user history if authenticated
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        const user = await User.findById(decoded.id)
        if (user) {
          user.history.push({ skills_found: found, gaps: gaps, match_score: score })
          await user.save()
        }
      } catch (e) { console.warn("Could not save to history:", e.message) }
    }

    res.json({ found, gaps, trendingMissed: trendingSkills.filter(t => !found.includes(t.toLowerCase())), matchScore: score, suggestions })
  } catch (err) {
    console.error('Error analyzing resume:', err.message)
    res.status(500).json({ error: 'Failed to analyze resume' })
  }
})

// Skill Volatility Index
app.get('/api/svi', cacheMiddleware('svi'), async (req, res) => {
  try {
    const aiRes = await axios.get(`${FASTAPI_URL}/svi`)
    res.json({ 
      skills: aiRes.data.skills, 
      lastUpdated: new Date().toISOString(),
      model: aiRes.data.model
    })
  } catch (err) {
    console.error('Error fetching SVI:', err.message)
    res.status(500).json({ error: 'Failed to compute SVI via Python service' })
  }
})

// Skill Synergy
app.get('/api/synergy', cacheMiddleware('synergy'), async (req, res) => {
  try {
    const aiRes = await axios.get(`${FASTAPI_URL}/synergy`)
    res.json(aiRes.data)
  } catch (err) {
    console.error('Error fetching Synergy:', err.message)
    res.status(500).json({ error: 'Failed to compute Synergy Graph via Python service' })
  }
})

// ROI Path  
app.post('/api/roi', async (req, res) => {
  const { targetRole, currentSkills = [] } = req.body
  if (!targetRole) return res.status(400).json({ error: 'Target role is required' })

  try {
    const aiRes = await axios.post(`${FASTAPI_URL}/roi`, { targetRole, currentSkills })
    
    // Mix FastAPI graph data with Node business logic
    const roleData = { salary: { current: 80000, target: 130000 }, timeline: `${aiRes.data.estimated_months} months` }
    const roi = Math.round(((roleData.salary.target - roleData.salary.current) / roleData.salary.current) * 100)

    res.json({
      role: targetRole,
      salary: roleData.salary,
      timeline: roleData.timeline,
      roiPercent: roi,
      estimatedCost: 2500,
      estimatedROI: roleData.salary.target - roleData.salary.current - 2500,
      graphPath: aiRes.data.path
    })
  } catch (err) {
    console.error('Error fetching ROI:', err.message)
    res.status(500).json({ error: 'Failed to compute ROI Path' })
  }
})

// Stress Test
app.post('/api/stress-test', async (req, res) => {
  const { role, year = 2030 } = req.body
  if (!role) return res.status(400).json({ error: 'Role is required' })

  try {
    const aiRes = await axios.post(`${FASTAPI_URL}/stress-test`, { role, year })
    
    res.json({
      role, year,
      ...aiRes.data
    })
  } catch (err) {
    console.error('Error fetching Stress Test:', err.message)
    res.status(500).json({ error: 'Failed to run ML Stress Test' })
  }
})

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 FutureProof AI API running on http://localhost:${PORT}`)
  console.log(`📊 Endpoints: /api/health | /api/svi | /api/resume/analyze | /api/synergy | /api/roi | /api/stress-test\n`)
})

const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

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
app.post('/api/resume/analyze', (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Resume text is required' })

  const found = extractSkills(text)
  const gaps  = computeGaps(found)
  const score = computeMatchScore(found)

  const suggestions = gaps.map(g => ({
    skill:    g,
    platform: ['Coursera', 'Udemy', 'DeepLearning.AI', 'edX'][Math.floor(Math.random() * 4)],
    impact:   skillDatabase[g]?.svi >= 85 ? 'High' : 'Medium',
    duration: `${Math.floor(Math.random() * 8) + 2} weeks`,
  }))

  res.json({ found, gaps, trendingMissed: trendingSkills.filter(t => !found.includes(t.toLowerCase())), matchScore: score, suggestions })
})

// Skill Volatility Index
app.get('/api/svi', (req, res) => {
  const result = Object.entries(skillDatabase).map(([name, data]) => ({
    name: name.charAt(0).toUpperCase() + name.slice(1),
    ...data,
    status: data.svi >= 80 ? 'rising' : data.svi >= 65 ? 'stable' : data.svi >= 45 ? 'declining' : 'obsolete',
  }))
  res.json({ skills: result, lastUpdated: new Date().toISOString() })
})

// Skill Synergy
app.get('/api/synergy', (req, res) => {
  const nodes = Object.entries(skillDatabase).map(([id, d]) => ({ id, ...d }))
  const edges = [
    { source: 'python', target: 'tensorflow' },
    { source: 'python', target: 'mlops'      },
    { source: 'python', target: 'sql'        },
    { source: 'react',  target: 'typescript' },
    { source: 'docker', target: 'kubernetes' },
    { source: 'aws',    target: 'kubernetes' },
    { source: 'langchain', target: 'python'  },
    { source: 'tensorflow', target: 'mlops'  },
  ]
  res.json({ nodes, edges, bridgeSkills: ['mlops', 'langchain'] })
})

// ROI Path  
app.post('/api/roi', (req, res) => {
  const { targetRole, currentSkills = [] } = req.body
  if (!targetRole) return res.status(400).json({ error: 'Target role is required' })

  const roleMap = {
    'ML Engineer':       { salary: { current: 85000, target: 160000 }, timeline: '14 months' },
    'Data Scientist':    { salary: { current: 80000, target: 145000 }, timeline: '12 months' },
    'Full Stack Developer': { salary: { current: 75000, target: 135000 }, timeline: '10 months' },
    'DevOps Engineer':   { salary: { current: 80000, target: 140000 }, timeline: '11 months' },
  }

  const roleData = roleMap[targetRole] || { salary: { current: 80000, target: 130000 }, timeline: '12 months' }
  const roi = Math.round(((roleData.salary.target - roleData.salary.current) / roleData.salary.current) * 100)

  res.json({
    role: targetRole,
    salary: roleData.salary,
    timeline: roleData.timeline,
    roiPercent: roi,
    estimatedCost: 2500,
    estimatedROI: roleData.salary.target - roleData.salary.current - 2500,
  })
})

// Stress Test
app.post('/api/stress-test', (req, res) => {
  const { role, year = 2030 } = req.body
  if (!role) return res.status(400).json({ error: 'Role is required' })

  const automationRisk   = year >= 2030 ? 0.45 : year >= 2028 ? 0.3 : 0.15
  const readinessScore   = Math.round(Math.max(20, 90 - automationRisk * 80 + Math.random() * 10))
  const obsoleteCount    = Math.round(automationRisk * 6)

  res.json({
    role, year,
    readinessScore,
    automationRisk: `${Math.round(automationRisk * 100)}%`,
    obsoleteSkills:  ['jQuery', 'REST-only APIs', 'Monolithic Architecture', 'Manual Testing', 'VBA', 'COBOL'].slice(0, obsoleteCount),
    requiredSkills:  risingSkills.slice(0, 4),
    predictionLabel: readinessScore >= 75 ? 'Future-Ready' : readinessScore >= 55 ? 'At Risk' : 'High Risk',
  })
})

// ─── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 FutureProof AI API running on http://localhost:${PORT}`)
  console.log(`📊 Endpoints: /api/health | /api/svi | /api/resume/analyze | /api/synergy | /api/roi | /api/stress-test\n`)
})

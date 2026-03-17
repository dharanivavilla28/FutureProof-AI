import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, AlertTriangle, CheckCircle, XCircle, TrendingDown, TrendingUp, BarChart2, Play } from 'lucide-react'
import { RadialBarChart, RadialBar, ResponsiveContainer, Tooltip } from 'recharts'

const SCENARIO_DATA = {
  'Software Engineer': {
    readinessScore: 72,
    obsolete:  ['jQuery', 'REST-only', 'Monolithic Architecture', 'Manual Testing'],
    required:  ['AI Pair Programming', 'LLM Integration', 'Serverless/Edge', 'Platform Engineering'],
    trending:  ['Rust', 'WebAssembly', 'AI Agents', 'Green Software Engineering'],
    surviving: ['Python', 'TypeScript', 'Docker', 'System Design', 'SQL'],
    prediction: 'Your profile remains relevant but requires urgent upskilling in AI tooling and serverless architectures to stay competitive in the 2028–2030 market.',
  },
  'Data Analyst': {
    readinessScore: 56,
    obsolete:  ['Manual Excel Reporting', 'Static Dashboards', 'Basic SQL', 'SSRS'],
    required:  ['AI-Augmented Analytics', 'LLM Data Querying', 'Real-time Streaming', 'AutoML'],
    trending:  ['dbt + AI', 'Semantic Layers', 'Data Mesh', 'Generative BI'],
    surviving: ['Critical Thinking', 'Domain Expertise', 'Python', 'Storytelling'],
    prediction: 'Significant disruption expected. 40% of current Data Analyst tasks will be automated. Focus on AI-augmented skills and domain-specific insights.',
  },
  'Frontend Developer': {
    readinessScore: 78,
    obsolete:  ['Class Components', 'jQuery', 'Vanilla CSS grids', 'REST-only'],
    required:  ['AI UI Generation', 'Edge Computing', 'WebAssembly', 'Server Components'],
    trending:  ['Astro', 'SolidJS', 'AI Design Systems', 'Micro-frontends'],
    surviving: ['React/Next.js', 'TypeScript', 'Accessibility', 'Performance optimization'],
    prediction: 'Frontend remains high-demand. AI will automate boilerplate but elevate experienced engineers. Your UX intuition and component thinking are irreplaceable.',
  },
}

const ROLES = Object.keys(SCENARIO_DATA)

const scoreColor = (s) => s >= 80 ? '#10b981' : s >= 60 ? '#f59e0b' : '#ef4444'
const scoreLabel = (s) => s >= 80 ? 'Future-Ready' : s >= 60 ? 'At Risk' : 'High Risk'

export default function StressTest() {
  const [role, setRole] = useState('Software Engineer')
  const [year, setYear] = useState('2030')
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)
  const [progress, setProgress] = useState(0)

  const data = SCENARIO_DATA[role]

  function runTest() {
    setRunning(true); setDone(false); setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += Math.random() * 12 + 5
      if (p >= 100) { p = 100; clearInterval(iv); setTimeout(() => { setRunning(false); setDone(true) }, 300) }
      setProgress(Math.min(p, 100))
    }, 180)
  }

  const radialData = done ? [{ name: 'Score', value: data.readinessScore, fill: scoreColor(data.readinessScore) }] : []

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            Predictive Resume <span className="gradient-text">Stress Test</span>
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Simulate your career profile against 2028–2030 AI-driven market conditions</p>
        </div>

        {/* Config */}
        <div className="glass" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 180 }}>
              <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 8 }}>YOUR ROLE</label>
              <select id="stress-role-select" value={role} onChange={e => { setRole(e.target.value); setDone(false) }}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '10px 14px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}>
                {ROLES.map(r => <option key={r} value={r} style={{ background: '#0f0f1a' }}>{r}</option>)}
              </select>
            </div>
            <div style={{ minWidth: 140 }}>
              <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 8 }}>SIMULATION YEAR</label>
              <select id="stress-year-select" value={year} onChange={e => setYear(e.target.value)}
                style={{ width: '100%', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '10px 14px', color: '#e2e8f0', fontSize: 14, outline: 'none' }}>
                {['2027','2028','2029','2030'].map(y => <option key={y} value={y} style={{ background: '#0f0f1a' }}>{y}</option>)}
              </select>
            </div>
            <button id="run-stress-test-btn" className="btn-primary" onClick={runTest} disabled={running} style={{ padding: '10px 28px', opacity: running ? 0.7 : 1 }}>
              <Play size={14} /> {running ? 'Simulating...' : `Run ${year} Simulation`}
            </button>
          </div>

          {running && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>Simulating {year} market conditions...</div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, height: 8, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #ef4444, #f59e0b, #10b981)', borderRadius: 8, transition: 'width 0.2s ease' }} />
              </div>
              <div style={{ fontSize: 11, color: '#334155', marginTop: 6 }}>{Math.round(progress)}% — {progress < 33 ? 'Scanning job boards...' : progress < 66 ? 'Running ML model...' : 'Computing readiness score...'}</div>
            </div>
          )}
        </div>

        <AnimatePresence>
          {done && data && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {/* Score + prediction */}
              <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 20, marginBottom: 20 }}>
                <div className="glass" style={{ padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginBottom: 12 }}>FUTURE READINESS SCORE</div>
                  <ResponsiveContainer width={160} height={160}>
                    <RadialBarChart innerRadius="70%" outerRadius="100%" data={radialData} startAngle={90} endAngle={-270}>
                      <RadialBar dataKey="value" cornerRadius={8} background={{ fill: 'rgba(255,255,255,0.04)' }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                  <div style={{ marginTop: -100 }}>
                    <div style={{ fontSize: 40, fontWeight: 800, fontFamily: 'Space Grotesk', color: scoreColor(data.readinessScore), lineHeight: 1 }}>{data.readinessScore}</div>
                    <div style={{ fontSize: 12, color: scoreColor(data.readinessScore), fontWeight: 600, marginTop: 4 }}>{scoreLabel(data.readinessScore)}</div>
                  </div>
                  <div style={{ marginTop: 96, fontSize: 12, color: '#475569' }}>Simulated: {year}</div>
                </div>

                <div className="glass" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                    <BarChart2 size={16} color="#6366f1" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>AI Prediction</span>
                  </div>
                  <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7, marginBottom: 20 }}>{data.prediction}</p>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <div className={`badge badge-${data.readinessScore >= 80 ? 'success' : data.readinessScore >= 60 ? 'warning' : 'danger'}`}>
                      {scoreLabel(data.readinessScore)}
                    </div>
                    <div className="badge badge-info">Year {year}</div>
                    <div className="badge badge-info">{role}</div>
                  </div>
                </div>
              </div>

              {/* 4 quadrants */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                {[
                  { icon: XCircle, color: '#ef4444', bg: 'rgba(239,68,68,0.08)', border: 'rgba(239,68,68,0.2)', title: '☠️ Skills Becoming Obsolete', items: data.obsolete },
                  { icon: CheckCircle, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', title: '✅ Skills Still Valuable', items: data.surviving },
                  { icon: AlertTriangle, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)', title: '🚨 Urgent Skills Needed', items: data.required },
                  { icon: TrendingUp, color: '#06b6d4', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)', title: '🚀 Emerging Trends', items: data.trending },
                ].map(section => (
                  <div key={section.title} style={{ background: section.bg, border: `1px solid ${section.border}`, borderRadius: 14, padding: '20px' }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 14 }}>{section.title}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {section.items.map(item => (
                        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#94a3b8' }}>
                          <section.icon size={13} color={section.color} style={{ flexShrink: 0 }} />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

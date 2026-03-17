import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Target, DollarSign, Clock, ChevronRight, Star, TrendingUp, BookOpen, Award } from 'lucide-react'

const ROLES = [
  'ML Engineer', 'Data Scientist', 'Full Stack Developer', 'DevOps Engineer',
  'AI Research Scientist', 'Cloud Architect', 'Product Manager (Tech)', 'Cybersecurity Engineer'
]

const ROADMAPS = {
  'ML Engineer': {
    current: 85000,
    target: 160000,
    timeline: '14 months',
    steps: [
      { phase: 'Phase 1', title: 'Strengthen ML Foundations', duration: '2 months', skills: ['Statistics', 'Scikit-learn', 'Pandas'], salary: 95000, color: '#6366f1' },
      { phase: 'Phase 2', title: 'Deep Learning & Neural Nets', duration: '3 months', skills: ['PyTorch', 'TensorFlow', 'CNNs', 'Transformers'], salary: 110000, color: '#8b5cf6' },
      { phase: 'Phase 3', title: 'MLOps & Production Systems', duration: '3 months', skills: ['MLflow', 'Kubeflow', 'Docker', 'CI/CD for ML'], salary: 130000, color: '#06b6d4' },
      { phase: 'Phase 4', title: 'LLM & Generative AI', duration: '3 months', skills: ['Fine-tuning', 'LangChain', 'RAG', 'Vector DBs'], salary: 150000, color: '#10b981' },
      { phase: 'Phase 5', title: 'Senior Role & Leadership', duration: '3 months', skills: ['System Design', 'Technical Leadership', 'Interviewing'], salary: 160000, color: '#f59e0b' },
    ],
  },
  'Data Scientist': {
    current: 80000,
    target: 145000,
    timeline: '12 months',
    steps: [
      { phase: 'Phase 1', title: 'Statistical Analysis Mastery', duration: '2 months', skills: ['R/Python', 'Bayesian Stats', 'A/B Testing'], salary: 90000, color: '#6366f1' },
      { phase: 'Phase 2', title: 'Advanced ML Models', duration: '3 months', skills: ['XGBoost', 'SHAP', 'Time Series', 'NLP'], salary: 105000, color: '#8b5cf6' },
      { phase: 'Phase 3', title: 'Data Engineering', duration: '2 months', skills: ['Spark', 'dbt', 'Airflow', 'BigQuery'], salary: 120000, color: '#06b6d4' },
      { phase: 'Phase 4', title: 'Business Intelligence', duration: '3 months', skills: ['Tableau', 'Stakeholder Comm', 'BI Strategy'], salary: 135000, color: '#10b981' },
      { phase: 'Phase 5', title: 'Staff Scientist Prep', duration: '2 months', skills: ['Mentoring', 'Research Papers', 'Leadership'], salary: 145000, color: '#f59e0b' },
    ],
  },
  'Full Stack Developer': {
    current: 75000,
    target: 135000,
    timeline: '12 months',
    steps: [
      { phase: 'Phase 1', title: 'Modern Frontend Mastery', duration: '2 months', skills: ['React 19', 'TypeScript', 'Tailwind', 'Next.js'], salary: 88000, color: '#6366f1' },
      { phase: 'Phase 2', title: 'Backend Architecture', duration: '3 months', skills: ['Node.js', 'GraphQL', 'gRPC', 'Microservices'], salary: 103000, color: '#8b5cf6' },
      { phase: 'Phase 3', title: 'Cloud & DevOps', duration: '2 months', skills: ['AWS/GCP', 'Kubernetes', 'Terraform', 'CI/CD'], salary: 117000, color: '#06b6d4' },
      { phase: 'Phase 4', title: 'AI Integration', duration: '3 months', skills: ['AI SDKs', 'Vector DBs', 'LLM APIs', 'Edge AI'], salary: 128000, color: '#10b981' },
      { phase: 'Phase 5', title: 'Staff Engineer Level', duration: '2 months', skills: ['System Design', 'Code Reviews', 'Architecture'], salary: 135000, color: '#f59e0b' },
    ],
  },
}

const DEFAULT_ROADMAP = ROADMAPS['ML Engineer']

export default function ROIPath() {
  const [role, setRole] = useState('ML Engineer')
  const [generated, setGenerated] = useState(false)
  const [loading, setLoading] = useState(false)
  const roadmap = ROADMAPS[role] || DEFAULT_ROADMAP

  function generate() {
    setLoading(true)
    setTimeout(() => { setLoading(false); setGenerated(true) }, 1200)
  }

  const salaryGrowth = roadmap ? Math.round(((roadmap.target - roadmap.current) / roadmap.current) * 100) : 0

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            ROI <span className="gradient-text">Learning Path</span> Generator
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Generate a personalized skill roadmap with salary growth projections for your target role</p>
        </div>

        {/* Input */}
        <div className="glass" style={{ padding: '24px', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 200 }}>
              <label style={{ fontSize: 12, color: '#64748b', fontWeight: 600, display: 'block', marginBottom: 8 }}>TARGET ROLE</label>
              <select
                id="roi-role-select"
                value={role}
                onChange={e => { setRole(e.target.value); setGenerated(false) }}
                style={{
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(99,102,241,0.2)',
                  borderRadius: 10,
                  padding: '10px 14px',
                  color: '#e2e8f0',
                  fontSize: 14,
                  outline: 'none',
                }}
              >
                {ROLES.map(r => <option key={r} value={r} style={{ background: '#0f0f1a' }}>{r}</option>)}
              </select>
            </div>
            <button
              id="generate-roadmap-btn"
              className="btn-primary"
              onClick={generate}
              disabled={loading}
              style={{ padding: '10px 28px', opacity: loading ? 0.7 : 1 }}
            >
              {loading ? '⚙ Generating...' : <><Target size={14} /> Generate Roadmap</>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {generated && roadmap && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              {/* Summary */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
                {[
                  { icon: DollarSign, label: 'Current Est. Salary', value: `$${roadmap.current.toLocaleString()}`, color: '#6366f1' },
                  { icon: TrendingUp, label: 'Target Salary',       value: `$${roadmap.target.toLocaleString()}`, color: '#10b981' },
                  { icon: Clock,      label: 'Time to Achieve',     value: roadmap.timeline,                       color: '#06b6d4' },
                ].map(card => (
                  <div key={card.label} className="glass" style={{ padding: '20px' }}>
                    <card.icon size={16} color={card.color} style={{ marginBottom: 10 }} />
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Space Grotesk', color: card.color }}>{card.value}</div>
                    <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{card.label}</div>
                  </div>
                ))}
              </div>

              {/* ROI Banner */}
              <div style={{
                padding: '16px 24px',
                background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(99,102,241,0.1))',
                border: '1px solid rgba(16,185,129,0.2)',
                borderRadius: 12,
                marginBottom: 28,
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <Star size={18} color="#10b981" fill="#10b981" />
                <span style={{ fontSize: 14, color: '#e2e8f0', fontWeight: 500 }}>
                  Completing this roadmap delivers a <strong style={{ color: '#10b981' }}>{salaryGrowth}% salary increase</strong> — estimated ROI of <strong style={{ color: '#10b981' }}>$45,000</strong> over 2 years after course costs
                </span>
              </div>

              {/* Roadmap Timeline */}
              <div className="glass" style={{ padding: '24px', position: 'relative' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#e2e8f0', marginBottom: 24 }}>
                  Learning Roadmap — {role}
                </h3>
                <div style={{ position: 'relative' }}>
                  {/* Vertical line */}
                  <div style={{ position: 'absolute', left: 20, top: 0, bottom: 0, width: 2, background: 'rgba(99,102,241,0.15)' }} />
                  {roadmap.steps.map((step, i) => (
                    <motion.div
                      key={step.phase}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1, duration: 0.4 }}
                      style={{ display: 'flex', gap: 24, marginBottom: 24, position: 'relative' }}
                    >
                      {/* Dot */}
                      <div style={{
                        width: 40, height: 40, flexShrink: 0,
                        borderRadius: '50%',
                        background: `${step.color}20`,
                        border: `2px solid ${step.color}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        zIndex: 1,
                        fontSize: 12, fontWeight: 700, color: step.color,
                      }}>
                        {i + 1}
                      </div>
                      {/* Content */}
                      <div style={{
                        flex: 1, padding: '16px 20px',
                        background: 'rgba(255,255,255,0.02)',
                        border: `1px solid ${step.color}20`,
                        borderRadius: 12,
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8 }}>
                          <div>
                            <div style={{ fontSize: 11, color: step.color, fontWeight: 600, marginBottom: 4 }}>{step.phase} · {step.duration}</div>
                            <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 10 }}>{step.title}</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {step.skills.map(s => (
                                <span key={s} style={{ padding: '3px 10px', background: `${step.color}15`, border: `1px solid ${step.color}30`, borderRadius: 12, fontSize: 11, color: step.color }}>{s}</span>
                              ))}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 11, color: '#475569', marginBottom: 2 }}>Expected salary</div>
                            <div style={{ fontSize: 18, fontWeight: 700, color: '#10b981' }}>${step.salary.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

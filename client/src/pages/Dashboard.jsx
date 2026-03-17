import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, Zap, Target, Award } from 'lucide-react'

const trendData = [
  { month: 'Aug', AI: 70, Cloud: 65, Web: 80, Data: 60 },
  { month: 'Sep', AI: 73, Cloud: 67, Web: 78, Data: 63 },
  { month: 'Oct', AI: 78, Cloud: 70, Web: 77, Data: 68 },
  { month: 'Nov', AI: 82, Cloud: 74, Web: 76, Data: 72 },
  { month: 'Dec', AI: 85, Cloud: 76, Web: 74, Data: 75 },
  { month: 'Jan', AI: 89, Cloud: 79, Web: 75, Data: 78 },
  { month: 'Feb', AI: 93, Cloud: 82, Web: 73, Data: 82 },
  { month: 'Mar', AI: 95, Cloud: 85, Web: 72, Data: 85 },
]

const radarData = [
  { skill: 'AI/ML',      value: 88 },
  { skill: 'Cloud',      value: 75 },
  { skill: 'DevOps',     value: 62 },
  { skill: 'Frontend',   value: 80 },
  { skill: 'Data Sci',   value: 85 },
  { skill: 'Security',   value: 58 },
]

const topSkills = [
  { name: 'Python',          demand: 95, trend: 'up',   change: '+12%', color: '#6366f1' },
  { name: 'Machine Learning',demand: 93, trend: 'up',   change: '+22%', color: '#8b5cf6' },
  { name: 'React',           demand: 88, trend: 'up',   change: '+8%',  color: '#06b6d4' },
  { name: 'Kubernetes',      demand: 82, trend: 'up',   change: '+15%', color: '#10b981' },
  { name: 'SQL',             demand: 76, trend: 'stable',change: '+2%', color: '#f59e0b' },
  { name: 'PHP',             demand: 42, trend: 'down', change: '-18%', color: '#ef4444' },
]

const statCards = [
  { icon: Brain, label: 'Skills Tracked',   value: '24',  sub: '+3 this month',   color: '#6366f1', bg: 'rgba(99,102,241,0.1)'  },
  { icon: TrendingUp, label: 'Market Score',value: '87',  sub: 'Top 15% in field', color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
  { icon: AlertTriangle, label: 'Risk Score',value: '34', sub: 'Low volatility',   color: '#f59e0b', bg: 'rgba(245,158,11,0.1)'  },
  { icon: Award, label: 'Future-Ready',     value: '92%', sub: 'vs 2028 market',   color: '#06b6d4', bg: 'rgba(6,182,212,0.1)'   },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div style={{ background: 'rgba(13,13,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.color, fontSize: 12, fontWeight: 600 }}>{p.dataKey}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Dashboard() {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 400) }, [])

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Welcome */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 26, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            Welcome back, <span className="gradient-text">Alex</span> 👋
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Here's your career intelligence snapshot for March 2026</p>
        </div>
      </motion.div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
            className="glass glass-hover"
            style={{ padding: '20px 22px' }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: '10px',
              background: card.bg,
              border: `1px solid ${card.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}>
              <card.icon size={18} color={card.color} />
            </div>
            <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: card.color, lineHeight: 1 }}>{card.value}</div>
            <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 6, fontWeight: 500 }}>{card.label}</div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 4 }}>{card.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 20, marginBottom: 28 }}>
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="glass"
          style={{ padding: '24px' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <h3 style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0', marginBottom: 3 }}>Skill Demand Trends</h3>
              <p style={{ fontSize: 12, color: '#475569' }}>6-month market demand signals</p>
            </div>
            <span className="badge badge-info">LIVE</span>
          </div>
          {loaded ? (
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="aiGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="cloudGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="dataGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} domain={[50, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Area type="monotone" dataKey="AI"    stroke="#6366f1" strokeWidth={2} fill="url(#aiGrad)"    dot={false} />
                <Area type="monotone" dataKey="Cloud" stroke="#8b5cf6" strokeWidth={2} fill="url(#cloudGrad)" dot={false} />
                <Area type="monotone" dataKey="Data"  stroke="#06b6d4" strokeWidth={2} fill="url(#dataGrad)"  dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="skeleton" style={{ height: 220 }} />
          )}
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[{label:'AI',color:'#6366f1'},{label:'Cloud',color:'#8b5cf6'},{label:'Data',color:'#06b6d4'}].map(l => (
              <div key={l.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: l.color }} />
                {l.label}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="glass"
          style={{ padding: '24px' }}
        >
          <h3 style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0', marginBottom: 3 }}>Skill Radar</h3>
          <p style={{ fontSize: 12, color: '#475569', marginBottom: 16 }}>Your current skill profile</p>
          {loaded ? (
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(99,102,241,0.15)" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="value" stroke="#6366f1" fill="#6366f1" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="skeleton" style={{ height: 220 }} />
          )}
        </motion.div>
      </div>

      {/* Top Skills Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="glass"
        style={{ padding: '24px' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0' }}>Market Demand — Top Skills</h3>
          <span style={{ fontSize: 12, color: '#475569' }}>Updated live · Mar 2026</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topSkills.map((skill, i) => (
            <div key={skill.name} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 24, fontSize: 11, color: '#334155', fontWeight: 600 }}>{i + 1}</div>
              <div style={{ flex: 1, minWidth: 100, fontSize: 13, color: '#e2e8f0', fontWeight: 500 }}>{skill.name}</div>
              <div style={{ flex: 3, background: 'rgba(255,255,255,0.04)', borderRadius: 6, height: 6, overflow: 'hidden' }}>
                <div style={{
                  width: `${skill.demand}%`, height: '100%',
                  background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
                  borderRadius: 6,
                  transition: 'width 1s ease',
                }} />
              </div>
              <div style={{ width: 36, textAlign: 'right', fontSize: 13, fontWeight: 700, color: skill.color }}>{skill.demand}</div>
              <div style={{ width: 56, textAlign: 'right' }}>
                {skill.trend === 'up' && <span style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>↑ {skill.change}</span>}
                {skill.trend === 'down' && <span style={{ fontSize: 11, color: '#ef4444', fontWeight: 600 }}>↓ {skill.change}</span>}
                {skill.trend === 'stable' && <span style={{ fontSize: 11, color: '#f59e0b', fontWeight: 600 }}>→ {skill.change}</span>}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

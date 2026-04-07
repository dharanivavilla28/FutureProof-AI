import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LineChart, Line } from 'recharts'
import { TrendingUp, TrendingDown, Minus, Filter, Search, Info } from 'lucide-react'

const sviData = [
  { name: 'LLM Fine-tuning',  svi: 98, demand: 95, growth: '+48%', status: 'rising',    risk: 'low'    },
  { name: 'Kubernetes',        svi: 90, demand: 88, growth: '+22%', status: 'rising',    risk: 'low'    },
  { name: 'Vector Databases',  svi: 87, demand: 91, growth: '+61%', status: 'rising',    risk: 'low'    },
  { name: 'Python',            svi: 85, demand: 96, growth: '+12%', status: 'stable',    risk: 'low'    },
  { name: 'React',             svi: 82, demand: 88, growth: '+8%',  status: 'stable',    risk: 'low'    },
  { name: 'TypeScript',        svi: 80, demand: 84, growth: '+18%', status: 'rising',    risk: 'low'    },
  { name: 'AWS',               svi: 76, demand: 82, growth: '+9%',  status: 'stable',    risk: 'low'    },
  { name: 'Java',              svi: 65, demand: 70, growth: '-2%',  status: 'declining', risk: 'medium' },
  { name: 'Angular',           svi: 55, demand: 56, growth: '-14%', status: 'declining', risk: 'medium' },
  { name: 'PHP',               svi: 38, demand: 42, growth: '-22%', status: 'declining', risk: 'high'   },
  { name: 'VBA/Excel Macros',  svi: 22, demand: 28, growth: '-35%', status: 'obsolete',  risk: 'high'   },
  { name: 'COBOL',             svi: 14, demand: 18, growth: '-41%', status: 'obsolete',  risk: 'high'   },
]

const trendHistory = [
  { month: 'Oct', Python: 81, React: 79, PHP: 48, COBOL: 22 },
  { month: 'Nov', Python: 82, React: 80, PHP: 45, COBOL: 20 },
  { month: 'Dec', Python: 83, React: 81, PHP: 43, COBOL: 18 },
  { month: 'Jan', Python: 84, React: 82, PHP: 41, COBOL: 17 },
  { month: 'Feb', Python: 84, React: 82, PHP: 39, COBOL: 15 },
  { month: 'Mar', Python: 85, React: 82, PHP: 38, COBOL: 14 },
]

const statusColor = { rising: '#10b981', stable: '#6366f1', declining: '#f59e0b', obsolete: '#ef4444' }
const statusBadge = { rising: 'success', stable: 'info', declining: 'warning', obsolete: 'danger' }

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div style={{ background: 'rgba(13,13,26,0.95)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 10, padding: '10px 14px' }}>
      <p style={{ color: '#94a3b8', fontSize: 11, marginBottom: 6 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ color: p.fill || p.color, fontSize: 12, fontWeight: 600 }}>{p.name || p.dataKey}: {p.value}</p>
      ))}
    </div>
  )
}

export default function SkillVolatility() {
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setTimeout(() => setLoaded(true), 300) }, [])

  const filtered = sviData.filter(s => {
    const matchFilter = filter === 'all' || s.status === filter
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase())
    return matchFilter && matchSearch
  })

  const barColors = filtered.map(s => statusColor[s.status])

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            Skill <span className="gradient-text">Volatility</span> Index
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>SVI score (0–100) measures how stable and in-demand a skill will be over the next 24 months</p>
        </div>

        {/* Summary Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
          {[
            { label: 'Rising Skills',    count: sviData.filter(s => s.status === 'rising').length,    color: '#10b981', icon: TrendingUp },
            { label: 'Stable Skills',    count: sviData.filter(s => s.status === 'stable').length,    color: '#6366f1', icon: Minus },
            { label: 'Declining Skills', count: sviData.filter(s => s.status === 'declining').length, color: '#f59e0b', icon: TrendingDown },
            { label: 'Obsolete Skills',  count: sviData.filter(s => s.status === 'obsolete').length,  color: '#ef4444', icon: TrendingDown },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07, duration: 0.5 }}
              className="glass glass-hover" style={{ padding: '18px 20px', cursor: 'pointer' }}
              onClick={() => setFilter(item.label.split(' ')[0].toLowerCase())}
            >
              <item.icon size={16} color={item.color} style={{ marginBottom: 10 }} />
              <div style={{ fontSize: 28, fontWeight: 800, color: item.color, fontFamily: 'Space Grotesk', lineHeight: 1 }}>{item.count}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6 }}>{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Bar Chart */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass" style={{ padding: '24px', marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 20 }}>SVI Score Overview</h3>
          {loaded ? (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={sviData} margin={{ left: -20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="name" stroke="#334155" tick={{ fill: '#64748b', fontSize: 10 }} />
                <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 10 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="svi" radius={[4, 4, 0, 0]}>
                  {sviData.map((entry, i) => <Cell key={i} fill={statusColor[entry.status]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : <div className="skeleton" style={{ height: 220 }} />}
        </motion.div>

        {/* Trend Lines */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass" style={{ padding: '24px', marginBottom: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 20 }}>6-Month SVI Trend Comparison</h3>
          {loaded ? (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={trendHistory}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis dataKey="month" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} domain={[0, 100]} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="Python" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="React"  stroke="#10b981" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="PHP"    stroke="#f59e0b" strokeWidth={2} dot={false} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="COBOL"  stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          ) : <div className="skeleton" style={{ height: 180 }} />}
          <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
            {[{l:'Python',c:'#6366f1'},{l:'React',c:'#10b981'},{l:'PHP',c:'#f59e0b'},{l:'COBOL',c:'#ef4444'}].map(x => (
              <div key={x.l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#64748b' }}>
                <div style={{ width: 8, height: 2, background: x.c, borderRadius: 1 }} />{x.l}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="glass" style={{ padding: '22px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, gap: 16 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Detailed Skill Breakdown</h3>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 8, padding: '6px 12px' }}>
                <Search size={13} color="#475569" />
                <input id="svi-search" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search skill..." style={{ background: 'transparent', border: 'none', outline: 'none', color: '#94a3b8', fontSize: 12, width: 120 }} />
              </div>
              <select id="svi-filter" value={filter} onChange={e => setFilter(e.target.value)} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 8, padding: '6px 12px', color: '#94a3b8', fontSize: 12, outline: 'none' }}>
                <option value="all">All</option>
                <option value="rising">Rising</option>
                <option value="stable">Stable</option>
                <option value="declining">Declining</option>
                <option value="obsolete">Obsolete</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 8, padding: '8px 12px', color: '#334155', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            <span>SKILL</span><span>SVI</span><span>DEMAND</span><span>GROWTH</span><span>STATUS</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {filtered.map(s => (
              <div key={s.name} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 8, alignItems: 'center', padding: '10px 12px', background: 'rgba(255,255,255,0.02)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.06)' }}>
                <span style={{ fontSize: 13, fontWeight: 500, color: '#e2e8f0' }}>{s.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 40, background: 'rgba(255,255,255,0.05)', borderRadius: 4, height: 5, overflow:'hidden' }}>
                    <div style={{ width: `${s.svi}%`, height:'100%', background: statusColor[s.status], borderRadius: 4 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: statusColor[s.status] }}>{s.svi}</span>
                </div>
                <span style={{ fontSize: 12, color: '#94a3b8' }}>{s.demand}</span>
                <span style={{ fontSize: 12, fontWeight: 600, color: s.growth.startsWith('+') ? '#10b981' : '#ef4444' }}>{s.growth}</span>
                <span className={`badge badge-${statusBadge[s.status]}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

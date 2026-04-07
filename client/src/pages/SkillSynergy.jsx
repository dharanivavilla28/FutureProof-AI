import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Share2, Eye, EyeOff, Zap, Info } from 'lucide-react'

// Pure SVG/Canvas-based skill graph (no external graph lib needed)
const NODES = [
  { id: 'Python',     x: 400, y: 200, color: '#6366f1', size: 44, category: 'core'   },
  { id: 'ML',         x: 250, y: 120, color: '#8b5cf6', size: 40, category: 'ai'     },
  { id: 'Data Sci',   x: 180, y: 260, color: '#8b5cf6', size: 36, category: 'ai'     },
  { id: 'LLM',        x: 310, y: 330, color: '#06b6d4', size: 38, category: 'ai'     },
  { id: 'React',      x: 560, y: 130, color: '#10b981', size: 38, category: 'web'    },
  { id: 'TypeScript', x: 650, y: 230, color: '#10b981', size: 34, category: 'web'    },
  { id: 'Node.js',    x: 580, y: 340, color: '#10b981', size: 32, category: 'web'    },
  { id: 'SQL',        x: 430, y: 370, color: '#f59e0b', size: 34, category: 'data'   },
  { id: 'Cloud',      x: 140, y: 150, color: '#ef4444', size: 36, category: 'infra'  },
  { id: 'Docker',     x: 680, y: 130, color: '#ef4444', size: 30, category: 'infra'  },
  { id: 'MLOps',      x: 230, y: 380, color: '#06b6d4', size: 32, category: 'bridge' },
  { id: 'API Design', x: 510, y: 260, color: '#f59e0b', size: 32, category: 'bridge' },
]

const EDGES = [
  ['Python','ML'],['Python','Data Sci'],['Python','LLM'],['Python','SQL'],['Python','API Design'],
  ['ML','LLM'],['ML','Data Sci'],['ML','MLOps'],['Data Sci','SQL'],['Data Sci','MLOps'],
  ['React','TypeScript'],['React','Node.js'],['React','API Design'],['Node.js','API Design'],['Node.js','SQL'],
  ['TypeScript','Node.js'],['Cloud','MLOps'],['Cloud','Docker'],['Docker','Node.js'],['LLM','MLOps'],['SQL','Data Sci'],
]

const BRIDGE_SKILLS = ['MLOps', 'API Design']

const categoryDesc = {
  ai:     { label: 'AI/ML Skills',          color: '#8b5cf6' },
  core:   { label: 'Core Languages',         color: '#6366f1' },
  web:    { label: 'Web Development',        color: '#10b981' },
  data:   { label: 'Data Engineering',       color: '#f59e0b' },
  infra:  { label: 'Infrastructure/DevOps',  color: '#ef4444' },
  bridge: { label: '⚡ Bridge Skills',       color: '#06b6d4' },
}

function SkillGraph({ selected, setSelected }) {
  const svgRef = useRef()
  const [nodePositions, setNodePositions] = useState(NODES.reduce((acc, n) => ({ ...acc, [n.id]: { x: n.x, y: n.y } }), {}))
  const [dragging, setDragging] = useState(null)
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  function onMouseDown(e, id) {
    e.preventDefault()
    const svgRect = svgRef.current.getBoundingClientRect()
    const pos = nodePositions[id]
    setDragging(id)
    setOffset({ x: e.clientX - svgRect.left - pos.x, y: e.clientY - svgRect.top - pos.y })
  }

  function onMouseMove(e) {
    if (!dragging) return
    const svgRect = svgRef.current.getBoundingClientRect()
    const x = e.clientX - svgRect.left - offset.x
    const y = e.clientY - svgRect.top - offset.y
    setNodePositions(prev => ({ ...prev, [dragging]: { x, y } }))
  }

  function onMouseUp() { setDragging(null) }

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 480"
      width="100%" height="100%"
      style={{ cursor: dragging ? 'grabbing' : 'default', userSelect: 'none' }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      {/* Edges */}
      {EDGES.map(([a, b]) => {
        const pa = nodePositions[a], pb = nodePositions[b]
        const isBridge = BRIDGE_SKILLS.includes(a) || BRIDGE_SKILLS.includes(b)
        return (
          <line key={`${a}-${b}`}
            x1={pa.x} y1={pa.y} x2={pb.x} y2={pb.y}
            stroke={isBridge ? '#06b6d4' : 'rgba(99,102,241,0.2)'}
            strokeWidth={isBridge ? 2 : 1}
            strokeDasharray={isBridge ? '5,3' : 'none'}
          />
        )
      })}
      {/* Nodes */}
      {NODES.map(n => {
        const pos = nodePositions[n.id]
        const isSel = selected === n.id
        const isBridge = BRIDGE_SKILLS.includes(n.id)
        return (
          <g key={n.id} transform={`translate(${pos.x},${pos.y})`}
            onMouseDown={e => onMouseDown(e, n.id)}
            onClick={() => setSelected(isSel ? null : n.id)}
            style={{ cursor: 'grab' }}
          >
            {isBridge && (
              <circle r={n.size / 2 + 8} fill="none" stroke="#06b6d4" strokeWidth={1.5} strokeDasharray="4,3" opacity={0.6} />
            )}
            <circle
              r={n.size / 2}
              fill={`${n.color}20`}
              stroke={isSel ? '#fff' : n.color}
              strokeWidth={isSel ? 2.5 : 1.5}
            />
            <circle r={n.size / 2 - 6} fill={n.color} opacity={0.9} />
            <text y={n.size / 2 + 14} textAnchor="middle" fill="#94a3b8" fontSize={10} fontFamily="Inter, sans-serif">
              {n.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

export default function SkillSynergy() {
  const [selected, setSelected] = useState(null)
  const selectedNode = NODES.find(n => n.id === selected)
  const connectedSkills = selected
    ? EDGES.filter(([a, b]) => a === selected || b === selected).map(([a, b]) => a === selected ? b : a)
    : []

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            Skill <span className="gradient-text">Synergy</span> Graph
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Discover how skills connect. Drag nodes to explore. Cyan dashed lines show bridge skills.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 20 }}>
          {/* Graph */}
          <div className="glass" style={{ padding: '16px', minHeight: 480, position: 'relative' }}>
            <SkillGraph selected={selected} setSelected={setSelected} />
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {/* Legend */}
            <div className="glass" style={{ padding: '18px 20px' }}>
              <h4 style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 12 }}>Legend</h4>
              {Object.entries(categoryDesc).map(([key, val]) => (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: val.color }} />
                  <span style={{ fontSize: 12, color: '#94a3b8' }}>{val.label}</span>
                </div>
              ))}
            </div>

            {/* Bridge Skills */}
            <div className="glass" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Zap size={14} color="#06b6d4" />
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>Bridge Skills</h4>
              </div>
              <p style={{ fontSize: 12, color: '#64748b', marginBottom: 12 }}>Skills that unlock multiple career paths simultaneously</p>
              {BRIDGE_SKILLS.map(s => (
                <div key={s} style={{ padding: '8px 12px', background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.2)', borderRadius: 8, marginBottom: 8, fontSize: 13, fontWeight: 600, color: '#06b6d4', cursor: 'pointer' }}
                  onClick={() => setSelected(s)}>
                  ⚡ {s}
                </div>
              ))}
            </div>

            {/* Selected node detail */}
            {selected && selectedNode && (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="glass" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: selectedNode.color }} />
                  <h4 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{selected}</h4>
                </div>
                <p style={{ fontSize: 12, color: '#64748b', marginBottom: 10 }}>{categoryDesc[selectedNode.category]?.label}</p>
                <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 8 }}>Connected to {connectedSkills.length} skills:</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {connectedSkills.map(c => (
                    <span key={c} onClick={() => setSelected(c)} style={{ padding: '3px 10px', background: `${selectedNode.color}18`, border: `1px solid ${selectedNode.color}40`, borderRadius: 12, fontSize: 11, color: selectedNode.color, cursor: 'pointer' }}>{c}</span>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

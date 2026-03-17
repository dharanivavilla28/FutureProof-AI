import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, FileText, TrendingUp, Share2,
  Target, Zap, ChevronLeft, ChevronRight, Brain
} from 'lucide-react'

const navItems = [
  { to: '/dashboard',  icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/resume',     icon: FileText,         label: 'Resume Analyzer' },
  { to: '/volatility', icon: TrendingUp,       label: 'Skill Volatility' },
  { to: '/synergy',    icon: Share2,           label: 'Skill Synergy' },
  { to: '/roi',        icon: Target,           label: 'ROI Path' },
  { to: '/stress-test',icon: Zap,             label: 'Stress Test' },
]

export default function Sidebar({ open, setOpen }) {
  return (
    <aside style={{
      position: 'fixed',
      top: 0, left: 0,
      height: '100vh',
      width: open ? '240px' : '72px',
      background: 'rgba(13,13,26,0.95)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(99,102,241,0.15)',
      zIndex: 50,
      display: 'flex',
      flexDirection: 'column',
      transition: 'width 0.3s ease',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        padding: open ? '0 20px' : '0',
        justifyContent: open ? 'flex-start' : 'center',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
        gap: '12px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '36px', height: '36px',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          borderRadius: '10px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          boxShadow: '0 0 16px rgba(99,102,241,0.4)',
        }}>
          <Brain size={18} color="white" />
        </div>
        {open && (
          <div>
            <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '14px', color: '#e2e8f0', lineHeight: 1.2 }}>FutureProof</div>
            <div style={{ fontSize: '10px', color: '#6366f1', fontWeight: 600, letterSpacing: '0.08em' }}>AI PLATFORM</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: '4px', overflowY: 'auto' }}>
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: open ? '10px 14px' : '10px',
              borderRadius: '10px',
              justifyContent: open ? 'flex-start' : 'center',
              background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
              border: isActive ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
              color: isActive ? '#818cf8' : '#64748b',
              textDecoration: 'none',
              fontSize: '13px',
              fontWeight: isActive ? 600 : 500,
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
            })}
            onMouseEnter={e => {
              if (!e.currentTarget.style.background.includes('0.15')) {
                e.currentTarget.style.background = 'rgba(99,102,241,0.07)'
                e.currentTarget.style.color = '#94a3b8'
              }
            }}
            onMouseLeave={e => {
              if (!e.currentTarget.style.background.includes('0.15')) {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#64748b'
              }
            }}
          >
            <Icon size={18} style={{ flexShrink: 0 }} />
            {open && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Collapse button */}
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(99,102,241,0.1)' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: open ? 'flex-end' : 'center',
            padding: '8px',
            background: 'transparent',
            border: 'none',
            color: '#475569',
            cursor: 'pointer',
            borderRadius: '8px',
            transition: 'all 0.2s ease',
          }}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </div>
    </aside>
  )
}

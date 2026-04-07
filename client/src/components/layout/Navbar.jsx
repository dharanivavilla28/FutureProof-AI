import { useLocation } from 'react-router-dom'
import { Menu, Bell, Search, User } from 'lucide-react'

const pageNames = {
  '/dashboard':   'Dashboard',
  '/resume':      'Resume Analyzer',
  '/volatility':  'Skill Volatility Index',
  '/synergy':     'Skill Synergy Graph',
  '/roi':         'ROI Learning Path',
  '/stress-test': 'Predictive Stress Test',
}

export default function Navbar({ onMenuClick }) {
  const { pathname } = useLocation()
  const title = pageNames[pathname] || 'FutureProof AI'

  return (
    <header style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '64px',
      background: 'rgba(13,13,26,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(99,102,241,0.1)',
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px',
      gap: '16px',
    }}>
      <button
        onClick={onMenuClick}
        id="nav-menu-btn"
        style={{
          background: 'transparent',
          border: 'none',
          color: '#64748b',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          padding: '6px',
          borderRadius: '8px',
          transition: 'color 0.2s ease',
        }}
      >
        <Menu size={20} />
      </button>

      <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '16px', color: '#e2e8f0', flex: 1 }}>
        {title}
      </div>

      {/* Search bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(99,102,241,0.15)',
        borderRadius: '10px',
        padding: '7px 14px',
        width: '220px',
      }}>
        <Search size={14} color="#475569" />
        <input
          placeholder="Search skills..."
          id="navbar-search"
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: '#94a3b8',
            fontSize: '13px',
            width: '100%',
          }}
        />
      </div>

      {/* Notification */}
      <button
        id="notification-btn"
        style={{
          position: 'relative',
          background: 'rgba(99,102,241,0.1)',
          border: '1px solid rgba(99,102,241,0.2)',
          borderRadius: '10px',
          width: '38px', height: '38px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          color: '#818cf8',
          transition: 'all 0.2s ease',
        }}
      >
        <Bell size={16} />
        <span style={{
          position: 'absolute',
          top: '8px', right: '8px',
          width: '6px', height: '6px',
          borderRadius: '50%',
          background: '#6366f1',
        }} />
      </button>

      {/* Avatar */}
      <div
        id="user-avatar"
        style={{
          width: '36px', height: '36px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer',
          border: '2px solid rgba(99,102,241,0.3)',
        }}
      >
        <User size={16} color="white" />
      </div>
    </header>
  )
}

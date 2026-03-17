import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

export default function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1a' }}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        marginLeft: sidebarOpen ? '240px' : '72px',
        transition: 'margin-left 0.3s ease',
        minHeight: '100vh',
      }}>
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main style={{
          flex: 1,
          padding: '24px',
          paddingTop: '88px',
          background: 'radial-gradient(ellipse at 20% 50%, rgba(99,102,241,0.08) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(139,92,246,0.08) 0%, transparent 50%), #0f0f1a',
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

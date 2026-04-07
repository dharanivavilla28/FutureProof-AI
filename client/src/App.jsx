import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './components/layout/MainLayout'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import SkillVolatility from './pages/SkillVolatility'
import SkillSynergy from './pages/SkillSynergy'
import ROIPath from './pages/ROIPath'
import StressTest from './pages/StressTest'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/resume" element={<ResumeAnalyzer />} />
          <Route path="/volatility" element={<SkillVolatility />} />
          <Route path="/synergy" element={<SkillSynergy />} />
          <Route path="/roi" element={<ROIPath />} />
          <Route path="/stress-test" element={<StressTest />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

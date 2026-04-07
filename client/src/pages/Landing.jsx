import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Brain, TrendingUp, Share2, FileText, Target, Zap, ArrowRight, Star, ChevronRight } from 'lucide-react'

const features = [
  { icon: FileText,  color: '#6366f1', title: 'Resume Analyzer',       desc: 'Extract skills instantly and surface hidden gaps with AI-powered NLP.' },
  { icon: TrendingUp,color: '#8b5cf6', title: 'Skill Volatility Index', desc: 'See which skills are rising, stable, or becoming obsolete in real-time.' },
  { icon: Share2,    color: '#06b6d4', title: 'Skill Synergy Graph',    desc: 'Discover bridge skills that unlock multiple high-value career paths.' },
  { icon: Target,    color: '#10b981', title: 'ROI Learning Path',      desc: 'Generate personalized roadmaps with salary growth projections.' },
  { icon: Zap,       color: '#f59e0b', title: 'Stress Test 2030',       desc: 'Simulate your resume against 2028–2030 job market conditions.' },
  { icon: Brain,     color: '#ef4444', title: 'AI Career Coach',        desc: 'Get personalized recommendations powered by vector embeddings.' },
]

const stats = [
  { value: '94%', label: 'Prediction Accuracy' },
  { value: '50K+', label: 'Skills Tracked' },
  { value: '2.3M', label: 'Job Signals Analyzed' },
  { value: '12x', label: 'Faster Career Growth' },
]

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', overflowX: 'hidden' }}>
      {/* Orbs */}
      <div className="orb orb-primary" style={{ width: 600, height: 600, top: -200, left: -200 }} />
      <div className="orb orb-secondary" style={{ width: 400, height: 400, top: 100, right: -100 }} />
      <div className="orb orb-accent" style={{ width: 300, height: 300, bottom: 200, left: '40%' }} />

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(15,15,26,0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.1)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 16px rgba(99,102,241,0.4)',
          }}>
            <Brain size={18} color="white" />
          </div>
          <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: '16px', color: '#e2e8f0' }}>
            FutureProof <span style={{ color: '#6366f1' }}>AI</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button
            id="landing-login-btn"
            className="btn-ghost"
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Sign In
          </button>
          <button
            id="landing-cta-btn"
            className="btn-primary"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '8px 20px', fontSize: '13px' }}
          >
            Get Started <ArrowRight size={14} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 48px 80px', position: 'relative' }}>
        <div style={{ maxWidth: 800, textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(99,102,241,0.12)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: 20, padding: '6px 16px',
              marginBottom: 24,
            }}>
              <Star size={12} color="#6366f1" fill="#6366f1" />
              <span style={{ fontSize: 12, color: '#818cf8', fontWeight: 600, letterSpacing: '0.06em' }}>
                AI-POWERED CAREER INTELLIGENCE
              </span>
            </div>

            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 24,
              color: '#e2e8f0',
            }}>
              Predict Your Career's{' '}
              <span className="gradient-text">Future</span>{' '}
              with AI
            </h1>

            <p style={{ fontSize: 18, color: '#94a3b8', lineHeight: 1.7, marginBottom: 40, maxWidth: 580, margin: '0 auto 40px' }}>
              Map your skills, detect volatility, and navigate to high-growth roles before the market shifts. Powered by real-time job signals and machine learning.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button
                id="hero-primary-cta"
                className="btn-primary pulse-glow"
                onClick={() => navigate('/dashboard')}
                style={{ padding: '14px 32px', fontSize: '15px' }}
              >
                Analyze My Skills <ArrowRight size={16} />
              </button>
              <button
                id="hero-secondary-cta"
                className="btn-ghost"
                onClick={() => navigate('/resume')}
                style={{ padding: '14px 32px', fontSize: '15px' }}
              >
                Upload Resume
              </button>
            </div>
          </motion.div>

          {/* Floating cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ marginTop: 64, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
          >
            {[
              { skill: 'React', score: 92, trend: '+12%', color: '#6366f1' },
              { skill: 'Python', score: 87, trend: '+8%', color: '#8b5cf6' },
              { skill: 'AI/ML', score: 95, trend: '+31%', color: '#06b6d4' },
            ].map((item) => (
              <div key={item.skill} className="glass glass-hover" style={{ padding: '16px 20px', minWidth: 140 }}>
                <div style={{ fontSize: 12, color: '#64748b', marginBottom: 6 }}>{item.skill}</div>
                <div style={{ fontSize: 24, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.score}</div>
                <div style={{ fontSize: 11, color: '#10b981', fontWeight: 600 }}>↑ {item.trend}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ padding: '0 48px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="glass"
              style={{ padding: '24px', textAlign: 'center' }}
            >
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif' }} className="gradient-text">{s.value}</div>
              <div style={{ fontSize: 12, color: '#64748b', marginTop: 6, fontWeight: 500 }}>{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '0 48px 120px', position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 700, color: '#e2e8f0', marginBottom: 12 }}>
              Everything You Need to <span className="gradient-text">Stay Ahead</span>
            </h2>
            <p style={{ color: '#64748b', fontSize: 16 }}>Six powerful AI modules working in unison for your career growth</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.5 }}
                className="glass glass-hover"
                style={{ padding: '28px 24px', cursor: 'pointer' }}
                onClick={() => navigate('/dashboard')}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: `${f.color}20`,
                  border: `1px solid ${f.color}40`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: 16,
                }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: 15, color: '#e2e8f0', marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>{f.desc}</p>
                <div style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 4, color: f.color, fontSize: 12, fontWeight: 600 }}>
                  Explore <ChevronRight size={14} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: '0 48px 80px', position: 'relative', zIndex: 1 }}>
        <div style={{
          maxWidth: 800, margin: '0 auto',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
          border: '1px solid rgba(99,102,241,0.25)',
          borderRadius: '24px',
          padding: '56px 48px',
          textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 32, fontWeight: 700, color: '#e2e8f0', marginBottom: 16 }}>
            Ready to FutureProof Your Career?
          </h2>
          <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>
            Join thousands of professionals using AI to stay ahead of the curve.
          </p>
          <button
            id="footer-cta-btn"
            className="btn-primary pulse-glow"
            onClick={() => navigate('/dashboard')}
            style={{ padding: '14px 40px', fontSize: '15px' }}
          >
            Start Free Analysis <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </div>
  )
}

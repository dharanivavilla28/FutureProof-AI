import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, CheckCircle, AlertCircle, TrendingUp, TrendingDown, Minus, Sparkles, X } from 'lucide-react'

export default function ResumeAnalyzer() {
  const [step, setStep] = useState('upload') // upload | analyzing | results
  const [fileName, setFileName] = useState(null)
  const [progress, setProgress] = useState(0)
  const [resumeText, setResumeText] = useState('')
  const [results, setResults] = useState(null)
  const dropRef = useRef()

  function handleFile(file) {
    if (!file) return
    setFileName(file.name)
    setStep('analyzing')
    setProgress(0)
    setResults(null)
    
    const formData = new FormData();
    if (file.name === 'pasted-resume.txt') {
      // Send text as JSON
      fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: resumeText })
      }).then(res => res.json()).then(processData).catch(handleError)
    } else {
      formData.append('file', file)
      fetch('http://localhost:5000/api/resume/analyze', {
        method: 'POST',
        body: formData
      }).then(res => res.json()).then(processData).catch(handleError)
    }

    // Fake progress bar that stops at 90% waiting for API
    let p = 0
    window.analyzeInterval = setInterval(() => {
      p += Math.random() * 18 + 4
      if (p >= 90) p = 90
      setProgress(Math.min(p, 100))
    }, 200)
    
    function processData(data) {
        clearInterval(window.analyzeInterval)
        setProgress(100)
        setResults(data)
        setTimeout(() => setStep('results'), 400)
    }
    
    function handleError(err) {
        clearInterval(window.analyzeInterval)
        console.error(err)
        alert("Error analyzing resume. Make sure Python AI service is running.")
        setStep('upload')
    }
  }

  function handleDrop(e) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) handleFile(file)
  }

  function handleReset() { setStep('upload'); setFileName(null); setProgress(0); setResumeText(''); setResults(null); }

  const impactColor = { High: '#10b981', Critical: '#ef4444', Medium: '#f59e0b' }

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontFamily: 'Space Grotesk', fontSize: 24, fontWeight: 700, color: '#e2e8f0', marginBottom: 6 }}>
            <span className="gradient-text">AI</span> Resume Analyzer
          </h1>
          <p style={{ color: '#64748b', fontSize: 14 }}>Upload your resume to extract skills, identify gaps, and get personalized upskilling recommendations</p>
        </div>

        <AnimatePresence mode="wait">
          {/* UPLOAD */}
          {step === 'upload' && (
            <motion.div key="upload" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }}>
              <div
                ref={dropRef}
                id="resume-dropzone"
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onClick={() => document.getElementById('resume-file-input').click()}
                style={{
                  border: '2px dashed rgba(99,102,241,0.3)',
                  borderRadius: 16,
                  padding: '64px 32px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: 'rgba(99,102,241,0.04)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)'; e.currentTarget.style.background = 'rgba(99,102,241,0.04)' }}
              >
                <input id="resume-file-input" type="file" accept=".pdf,.doc,.docx,.txt" style={{ display: 'none' }} onChange={e => handleFile(e.target.files[0])} />
                <div className="float" style={{ marginBottom: 20 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '18px', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                    <Upload size={28} color="#6366f1" />
                  </div>
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: '#e2e8f0', marginBottom: 8 }}>Drop your resume here</div>
                <div style={{ fontSize: 13, color: '#475569' }}>or click to browse — PDF, DOC, DOCX, TXT supported</div>
              </div>

              <div style={{ marginTop: 20, display: 'flex', gap: 12, alignItems: 'center' }}>
                <div style={{ flex: 1, height: 1, background: 'rgba(99,102,241,0.1)' }} />
                <span style={{ fontSize: 12, color: '#334155' }}>OR PASTE TEXT</span>
                <div style={{ flex: 1, height: 1, background: 'rgba(99,102,241,0.1)' }} />
              </div>

              <textarea
                id="resume-text-input"
                value={resumeText}
                onChange={e => setResumeText(e.target.value)}
                placeholder="Paste your resume text here..."
                rows={6}
                style={{
                  marginTop: 16,
                  width: '100%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(99,102,241,0.15)',
                  borderRadius: 12,
                  padding: '14px 16px',
                  color: '#e2e8f0',
                  fontSize: 13,
                  resize: 'vertical',
                  outline: 'none',
                  fontFamily: 'Inter, sans-serif',
                }}
              />
              {resumeText.length > 20 && (
                <button id="analyze-text-btn" className="btn-primary" style={{ marginTop: 12 }} onClick={() => handleFile({ name: 'pasted-resume.txt' })}>
                  <Sparkles size={14} /> Analyze Text
                </button>
              )}
            </motion.div>
          )}

          {/* ANALYZING */}
          {step === 'analyzing' && (
            <motion.div key="analyzing" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="glass" style={{ padding: '56px 32px', textAlign: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(99,102,241,0.1)', border: '2px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', animation: 'pulse-glow 2s infinite' }}>
                <Sparkles size={32} color="#6366f1" />
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, color: '#e2e8f0', marginBottom: 8 }}>Analyzing {fileName}</div>
              <div style={{ fontSize: 13, color: '#64748b', marginBottom: 28 }}>Extracting skills, mapping gaps, computing scores...</div>
              <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: 8, height: 8, overflow: 'hidden', maxWidth: 400, margin: '0 auto' }}>
                <div style={{ width: `${progress}%`, height: '100%', background: 'linear-gradient(90deg, #6366f1, #8b5cf6)', borderRadius: 8, transition: 'width 0.3s ease' }} />
              </div>
              <div style={{ fontSize: 12, color: '#475569', marginTop: 10 }}>{Math.round(progress)}%</div>
            </motion.div>
          )}

          {/* RESULTS */}
          {step === 'results' && results && (
            <motion.div key="results" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Header */}
              <div className="glass" style={{ padding: '20px 24px', marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <FileText size={18} color="#6366f1" />
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{fileName}</div>
                    <div style={{ fontSize: 12, color: '#475569' }}>Analysis complete · {results.found?.length || 0} skills found</div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#10b981' }}>Match Score: {results.matchScore || 0}%</div>
                  <button id="reset-resume-btn" onClick={handleReset} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#475569' }}><X size={16} /></button>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                {/* Found Skills */}
                <div className="glass" style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <CheckCircle size={16} color="#10b981" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Detected Skills</span>
                    <span className="badge badge-success" style={{ marginLeft: 'auto' }}>{results.found?.length || 0} found</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {results.found && results.found.map(s => (
                      <span key={s} style={{ padding: '4px 12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 20, fontSize: 12, color: '#10b981', fontWeight: 500 }}>{s}</span>
                    ))}
                    {(!results.found || results.found.length === 0) && (
                      <span style={{ fontSize: 12, color: '#64748b' }}>No recognizable skills found.</span>
                    )}
                  </div>
                </div>

                {/* Gaps */}
                <div className="glass" style={{ padding: '20px 22px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                    <AlertCircle size={16} color="#ef4444" />
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>Skill Gaps</span>
                    <span className="badge badge-danger" style={{ marginLeft: 'auto' }}>{results.gaps?.length || 0} missing</span>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                    {results.gaps && results.gaps.map(s => (
                      <span key={s} style={{ padding: '4px 12px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: 20, fontSize: 12, color: '#ef4444', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                  <div style={{ height: 1, background: 'rgba(99,102,241,0.1)', marginBottom: 12 }} />
                  <div style={{ fontSize: 12, color: '#64748b', marginBottom: 8 }}>🚀 Trending in your target market</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {results.trendingMissed && results.trendingMissed.map(s => (
                      <span key={s} style={{ padding: '4px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: 20, fontSize: 12, color: '#818cf8', fontWeight: 500 }}>{s}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="glass" style={{ padding: '22px 24px' }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 16 }}>Recommended Learning Path</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {results.suggestions && results.suggestions.map((s, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.1)' }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0', marginBottom: 3 }}>Upskill: {s.skill}</div>
                        <div style={{ fontSize: 11, color: '#475569' }}>Platform: {s.platform} · Expected Time: {s.duration}</div>
                      </div>
                      <span className={`badge badge-${s.impact === 'Critical' ? 'danger' : s.impact === 'High' ? 'success' : 'warning'}`}>{s.impact} Impact</span>
                    </div>
                  ))}
                  {(!results.suggestions || results.suggestions.length === 0) && (
                    <div style={{ fontSize: 12, color: '#64748b' }}>No suggestions available based on your profile.</div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

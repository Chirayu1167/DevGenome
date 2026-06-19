import React, { useState } from 'react'
import Navbar from './Navbar'
import Helix from './Helix'

export default function Hero({ onAnalyze, onCompare, loading }) {
  const [username, setUsername] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = username.trim().replace(/^@/, '')
    if (trimmed) onAnalyze(trimmed)
  }

  return (
    <div className="landing-page">
      <Navbar onCompare={onCompare} />
      <div className="hero-content">
        <div className="hero-helix-bg" aria-hidden="true">
          <Helix />
        </div>

        <p className="hero-eyebrow">⬡ CYBER DEVELOPER DIAGNOSTICS ENGINE v2.4.1</p>

        <h1 className="hero-headline">
          Your GitHub,<br />
          <span className="accent">Brutally Analyzed.</span>
        </h1>

        <p className="hero-subhead">
          Feed us your GitHub username. We'll decode your developer DNA,
          quantify your chaos, and issue a formal damage report.
        </p>

        <form className="hero-form" onSubmit={handleSubmit}>
          <input
            className="hero-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Enter GitHub username..."
            disabled={loading}
            autoFocus
          />
          <button
            className="hero-cta"
            type="submit"
            disabled={loading || !username.trim()}
          >
            {loading ? 'Scanning genome...' : '⚡ Analyze My Developer DNA'}
          </button>
        </form>

        <p className="hero-disclaimer">
          <span className="ck">✓</span> Uses GitHub public API only
          <span style={{ color: 'var(--dim)' }}>·</span>
          <span className="ck">✓</span> No auth required
          <span style={{ color: 'var(--dim)' }}>·</span>
          <span className="ck">✓</span> 100% judgment-based
        </p>

        {onCompare && (
          <button className="hero-compare-link" onClick={onCompare}>
            ⚔ Or settle a debate — compare two profiles head-to-head →
          </button>
        )}
      </div>
    </div>
  )
}

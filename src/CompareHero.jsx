import React, { useState } from 'react'
import Navbar from './Navbar'
import Helix from './Helix'

export default function CompareHero({ onCompare, onBack, loading, prefillUserA = '' }) {
  const [userA, setUserA] = useState(prefillUserA)
  const [userB, setUserB] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const a = userA.trim().replace(/^@/, '')
    const b = userB.trim().replace(/^@/, '')
    if (a && b) onCompare(a, b)
  }

  const canSubmit = userA.trim() && userB.trim() &&
    userA.trim().toLowerCase() !== userB.trim().toLowerCase()

  return (
    <div className="landing-page">
      <Navbar onReset={onBack} activeView="compare" />
      <div className="hero-content">
        <div className="hero-helix-bg" aria-hidden="true">
          <Helix color1="#cf5cff" color2="#00dce5" />
        </div>

        <p className="hero-eyebrow">⬡ HEAD-TO-HEAD GENOME COMPARISON v2.4.1</p>

        <h1 className="hero-headline">
          Two Devs.<br />
          <span className="accent">One Verdict.</span>
        </h1>

        <p className="hero-subhead">
          Drop in two GitHub usernames. We'll sequence both genomes,
          stack them side by side, and crown a winner. No mercy.
        </p>

        <form className="hero-form vs-form" onSubmit={handleSubmit}>
          <div className="vs-input-row">
            <input
              className="hero-input"
              type="text"
              value={userA}
              onChange={e => setUserA(e.target.value)}
              placeholder="First GitHub username..."
              disabled={loading}
              autoFocus
            />
            <span className="vs-divider">VS</span>
            <input
              className="hero-input"
              type="text"
              value={userB}
              onChange={e => setUserB(e.target.value)}
              placeholder="Second GitHub username..."
              disabled={loading}
            />
          </div>
          <button
            className="hero-cta"
            type="submit"
            disabled={loading || !canSubmit}
          >
            {loading ? 'Sequencing both genomes...' : '⚔ Compare Developer DNA'}
          </button>
          {userA.trim() && userB.trim() &&
            userA.trim().toLowerCase() === userB.trim().toLowerCase() && (
            <p className="vs-same-warning">Pick two different usernames — even your ego has limits.</p>
          )}
        </form>

        <p className="hero-disclaimer">
          <span className="ck">✓</span> Uses GitHub public API only
          <span style={{ color: 'var(--dim)' }}>·</span>
          <span className="ck">✓</span> No auth required
          <span style={{ color: 'var(--dim)' }}>·</span>
          <span className="ck">✓</span> 100% judgment-based
        </p>

        <button className="hero-compare-link" onClick={onBack}>
          ← Back to single analysis
        </button>
      </div>
    </div>
  )
}

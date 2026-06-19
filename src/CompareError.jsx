import React from 'react'
import Navbar from './Navbar'

export default function CompareError({ message, onRetry, onBack }) {
  return (
    <div className="error-page">
      <Navbar onReset={onBack} />
      <div className="error-page" style={{ paddingTop: 0 }}>
        <div className="error-card">
          <div className="error-icon">⊘</div>
          <h2 className="error-title" style={{ color: 'var(--red)' }}>
            Dual Sequence Failed
          </h2>
          <p className="error-msg">
            {message || 'Could not resolve one or both genomes.'}
          </p>
          <p className="error-hint">
            The GitHub API may be rate-limited, or one of these usernames doesn't exist.
            Double-check the spelling, or wait a moment before retrying.
          </p>
          <button
            className="hero-cta"
            style={{ maxWidth: 280, margin: '0 auto' }}
            onClick={onRetry}
          >
            ↩ Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

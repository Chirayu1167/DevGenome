import React from 'react'
import Navbar from './Navbar'

export default function ErrorState({ message, username, onRetry }) {
  return (
    <div className="error-page">
      <Navbar onReset={onRetry} />
      <div className="error-page" style={{ paddingTop: 0 }}>
        <div className="error-card">
          <div className="error-icon">⊘</div>
          <h2 className="error-title" style={{ color: 'var(--red)' }}>
            DNA Sequence Failed
          </h2>
          <p className="error-msg">
            {message || `Could not resolve genome for "${username}"`}
          </p>
          <p className="error-hint">
            The GitHub API may be rate-limited, or this user doesn't exist.
            Try a different username or wait a moment before retrying.
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

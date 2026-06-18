import React from 'react'

export default function Navbar({ avatarUrl, onReset }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="nav-logo" onClick={onReset} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && onReset?.()}>
          <span className="nav-logo-text">DEV.WRAPPED</span>
          <span className="nav-badge">2024 EDITION</span>
        </div>
        <div className="nav-actions">
          {onReset && (
            <button className="nav-reset-btn" onClick={onReset}>↩ Reset</button>
          )}
          {avatarUrl && (
            <img src={avatarUrl} alt="Developer avatar" className="nav-avatar" />
          )}
        </div>
      </div>
    </nav>
  )
}

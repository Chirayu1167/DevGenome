import React from 'react'

export default function ProfileCard({ profile, archetypes, traits }) {
  const {
    name, login, bio, avatarUrl,
    accountAge, location, company
  } = profile

  const primaryTraitValue = traits?.[archetypes?.primary?.key] ?? 50
  const xpPct = Math.min(100, Math.round(
    (Math.log10(1 + primaryTraitValue) / Math.log10(101)) * 100
  ))

  const levels = {
    shipping: 'Delivery Champion',
    technicalDepth: 'Systems Engineer',
    openSourceImpact: 'Open Source Steward',
    collaboration: 'Team Catalyst',
    innovation: 'Product Innovator',
    aiMlFocus: 'AI/ML Engineer',
    cvFocus: 'Computer Vision Engineer',
    roboticsFocus: 'Robotics Engineer',
  }

  const years = accountAge?.years ?? 1
  const levelLabel = levels[archetypes?.primary?.key] || 'Developer'

  const primaryLabel = archetypes?.primary?.label ?? 'Unknown Archetype'
  const secondaryLabel = archetypes?.secondary?.label ?? ''

  return (
    <div className="classif-card">
      {secondaryLabel && (
        <div className="sticky-note">
          ✦ {secondaryLabel}
        </div>
      )}

      {/* Avatar */}
      <div className="avatar-wrap">
        <img src={avatarUrl} alt={name} className="avatar-img" />
        <span className="avatar-level-badge">{levelLabel} DEV</span>
      </div>

      {/* Name */}
      <div>
        <h2 className="classif-name">{name || login}</h2>
        <p className="classif-status">@{login} · VERIFIED DEVELOPER</p>
      </div>

      {/* Classification Box */}
      <div className="classif-box">
        <div className="classif-box-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
          RECRUITER RANK
        </div>
        <h3 className="classif-title">{levelLabel}</h3>
        <p className="classif-quote">
          "Primary archetype: {primaryLabel}."
        </p>

        <div className="xp-row">
          <span>XP LEVEL — {years}yr{years !== 1 ? 's' : ''} on GitHub</span>
          <span>{xpPct}%</span>
        </div>
        <div className="xp-track">
          <div className="xp-fill" style={{ width: `${xpPct}%` }} />
        </div>
      </div>

      <div className="energy-row">
        <span className="ping-dot anim-pulse" />
        {location ? `📍 ${location}` : '🌐 Remote chaos agent'}
      </div>

      <div className="trait-pill">
        ✦ Secondary: {secondaryLabel || 'Calculating...'}
      </div>
    </div>
  )
}

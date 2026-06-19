import React, { useState, useMemo } from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import LanguageDNA from './LanguageDNA'
import DNAEngine from './DNAEngine'
import { computeTraits, deriveArchetypes, TRAIT_ORDER } from './dnaScoring.js'

/* ─── Terminal content by severity ─────────────────────── */
function buildTerminalLines(dna, archetypes, traits, severity) {
  const { profile, stats, languages } = dna
  const years    = profile.accountAge?.years ?? 1
  const topLang  = languages?.[0]?.name ?? 'Unknown'
  const langCt   = languages?.length ?? 1
  const repoRate = years > 0 ? (stats.publicRepos / years).toFixed(1) : stats.publicRepos
  const starRatio= stats.publicRepos > 0 ? (stats.totalStars / stats.publicRepos).toFixed(1) : 0
  const primary  = archetypes.primary.label
  const secondary= archetypes.secondary.label
  const innovation = Math.round(traits.innovation ?? 50)
  const depth    = Math.round(traits.technicalDepth ?? 50)

  const sets = {
    gentle: [
      { cls:'t-cyan',  text:`> INITIATING GENOME ANALYSIS: @${profile.login}` },
      { cls:'t-muted', text:`> Archetype detected: ${primary} / ${secondary}` },
      { cls:'t-white', text:`> ${stats.publicRepos} public repos across ${years} year${years !== 1 ? 's' : ''} — ${repoRate} repos/yr` },
      { cls:'t-green', text:`> Primary language: ${topLang} (${langCt} total in stack)` },
      { cls:'t-white', text:`> ${stats.totalStars} stars · ${stats.totalForks} forks · ${stats.followers} followers` },
      { cls:'t-cyan',  text:`> Technical depth: ${depth}/100 · Innovation: ${innovation}/100` },
      { cls:'t-muted', text:`> Analysis: A focused developer with clear direction. ${starRatio} stars/repo.` },
    ],
    sarcastic: [
      { cls:'t-cyan',  text:`> GENOME ANALYSIS FOR @${profile.login} (sigh)` },
      { cls:'t-amber', text:`> ${primary}. How wonderfully predictable.` },
      { cls:'t-muted', text:`> ${stats.publicRepos} repos in ${years} yrs. ${repoRate}/year. "Prolific" is generous.` },
      { cls:'t-amber', text:`> ${topLang} as your main. Bold. Very "peaked and chose to stay".` },
      { cls:'t-white', text:`> ${stats.totalStars} stars. That's ${starRatio}/repo. Your fans are... selective.` },
      { cls:'t-muted', text:`> ${stats.followers} people watching this journey unfold. Brave of them.` },
      { cls:'t-amber', text:`> Innovation: ${innovation}/100. At least your damage is measurable.` },
    ],
    brutal: [
      { cls:'t-red',   text:`> ⚠ CRITICAL GENOME ANALYSIS: @${profile.login}` },
      { cls:'t-red',   text:`> THREAT LEVEL: ${innovation > 70 ? 'CRITICAL' : innovation > 40 ? 'ELEVATED' : 'MANAGED'}` },
      { cls:'t-white', text:`> ${stats.publicRepos} repos. ${stats.totalStars} stars. Ratio: ${starRatio}. Rough.` },
      { cls:'t-red',   text:`> ${years}yrs of ${topLang}. The growth chart is... horizontal.` },
      { cls:'t-muted', text:`> ${stats.followers} followers. They have not reviewed the repos.` },
      { cls:'t-red',   text:`> ${primary} with ${secondary} traits. The worst possible combo?` },
      { cls:'t-red',   text:`> Depth: ${depth}/100. Innovation: ${innovation}/100. We've flagged your account.` },
    ],
    unhinged: [
      { cls:'t-red',   text:`> ⚡⚡⚡ EMERGENCY DNA BREACH DETECTED ⚡⚡⚡` },
      { cls:'t-lilac', text:`> @${profile.login.toUpperCase()} HAS BEEN SCANNED AND WE ARE CONCERNED` },
      { cls:'t-red',   text:`> ${stats.publicRepos} REPOS OF PURE UNCUT CHAOS FOUND IN THE WILD` },
      { cls:'t-lilac', text:`> ${topLang.toUpperCase()} USAGE AT CRITICAL LEVELS. INTERVENTION REQUIRED.` },
      { cls:'t-red',   text:`> ${stats.totalStars} STARS. ${stats.followers} WITNESSES. THIS IS A CRIME SCENE.` },
      { cls:'t-lilac', text:`> ARCHETYPE ${primary.toUpperCase()} IS NOT A PERSONALITY — IT'S A DIAGNOSIS.` },
      { cls:'t-red',   text:`> INNOVATION INDEX ${innovation}/100. WE ARE CALLING YOUR RUBBER DUCK.` },
    ],
  }
  return sets[severity] ?? sets.brutal
}

/* ─── Stats Cards ──────────────────────────────────────── */
function StatsCards({ stats }) {
  const cards = [
    {
      id: 'METRIC_01', label: 'Public Repos',
      value: stats.publicRepos, badge: 'COUNTED', badgeCls: 'badge-red', glow: 'glow-cyan',
    },
    {
      id: 'METRIC_02', label: 'Total Stars',
      value: stats.totalStars, badge: 'EARNED', badgeCls: 'badge-purple', glow: 'glow-purple',
    },
    {
      id: 'METRIC_03', label: 'Followers',
      value: stats.followers, badge: 'WATCHING', badgeCls: 'badge-amber', glow: 'glow-amber',
    },
    {
      id: 'METRIC_04', label: 'Total Forks',
      value: stats.totalForks ?? 0, badge: 'FORKED', badgeCls: 'badge-blue', glow: 'glow-blue',
    },
  ]

  return (
    <div className="stats-section">
      <div className="stats-header">
        <h2 className="stats-title">
          📊 Damage Report
        </h2>
        <p className="stats-sub">METRICS_DUMP.JSON · Live figures, zero spin</p>
      </div>
      <div className="stats-grid">
        {cards.map(c => (
          <div key={c.id} className="stat-card">
            <div className={`stat-glow ${c.glow}`} />
            <div className="stat-top">
              <span className="stat-metric-id">{c.id}</span>
              <span className={`stat-badge ${c.badgeCls}`}>{c.badge}</span>
            </div>
            <div className="stat-number">
              {c.value >= 1000 ? `${(c.value / 1000).toFixed(1)}k` : c.value}
            </div>
            <div className="stat-label">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Terminal Section ─────────────────────────────────── */
function TerminalSection({ dna, archetypes, traits }) {
  const [severity, setSeverity] = useState('brutal')
  const lines = useMemo(
    () => buildTerminalLines(dna, archetypes, traits, severity),
    [dna, archetypes, traits, severity]
  )
  const severities = ['gentle', 'sarcastic', 'brutal', 'unhinged']

  return (
    <div className="terminal-wrap">
      <div className="terminal-topbar">
        <div className="t-dots">
          <div className="t-dot t-dot-r" />
          <div className="t-dot t-dot-a" />
          <div className="t-dot t-dot-g" />
        </div>
        <span className="terminal-fname">roast_engine.exe</span>
      </div>

      <div className="terminal-body">
        {lines.map((l, i) => (
          <div key={i} className={`t-line ${l.cls}`}>
            {l.text}
            {i === lines.length - 1 && <span className="anim-blink" style={{ color:'var(--cyan)' }}>▌</span>}
          </div>
        ))}

        <div className="t-alert">
          <div className="t-alert-label">⚠ Genome Assessment Complete</div>
          <div className="t-alert-text">
            Archetype: <strong style={{ color:'var(--lilac)' }}>{archetypes.primary.label}</strong>.
            {' '}Innovation at <strong style={{ color:'var(--lilac)' }}>{Math.round(traits.innovation ?? 50)}</strong>/100.
            {' '}Proceed with developer accordingly.
          </div>
        </div>

        <div className="t-tags">
          {[
            `#${archetypes.primary.label?.replace(/\s/g,'')}`,
            `#${dna.languages?.[0]?.name ?? 'Code'}Dev`,
            `#Innovation${Math.round(traits.innovation ?? 50)}`,
            `#GitHubDNA`,
          ].map(tag => <span key={tag} className="t-tag">{tag}</span>)}
        </div>
      </div>

      {/* Severity switcher */}
      <div className="severity-panel">
        <div className="severity-header">
          <span className="severity-lbl">ROAST SEVERITY</span>
          <span className="severity-cur">{severity.toUpperCase()}</span>
        </div>
        <div className="severity-btns">
          {severities.map(s => (
            <button
              key={s}
              className={`sev-btn ${severity === s ? `sv-${s}` : ''}`}
              onClick={() => setSeverity(s)}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Gradient Info Card ───────────────────────────────── */
function GradCard({ dna, archetypes }) {
  const { profile, languages, stats } = dna
  const topLang  = languages?.[0]?.name ?? 'Unknown'
  const years    = profile.accountAge?.years ?? 1
  const joinYear = new Date().getFullYear() - years

  const excuse = archetypes.primary.label.includes('Chaos')
    ? "It works on my machine."
    : archetypes.primary.label.includes('Perfectionist')
    ? "I'm still refactoring."
    : archetypes.primary.label.includes('Architect')
    ? "We need to design the system first."
    : "I'll fix it in the next PR."

  return (
    <div className="grad-card">
      <div>
        <div className="grad-card-title">{topLang}</div>
        <p className="grad-card-sub">PRIMARY LANGUAGE · DOMINANT STRAIN</p>
      </div>

      <div className="grad-inner">
        <div>
          <div className="grad-item-label lc">TOP GENRE</div>
          <div className="grad-item-text">{archetypes.primary.label}</div>
        </div>
        <div className="grad-divider">
          <div className="grad-item-label lp">GITHUB SINCE</div>
          <div className="grad-item-text">{joinYear}</div>
        </div>
        <div>
          <div className="grad-item-label lc">SIGNATURE EXCUSE</div>
          <div className="grad-item-text sm">"{excuse}"</div>
        </div>
      </div>

      <div className="grad-footer">
        <span className="grad-footer-icon">⬡</span>
        {stats.publicRepos} repos shipped · {stats.totalStars} stars earned
      </div>
    </div>
  )
}

/* ─── Footer ────────────────────────────────────────────── */
function Footer({ onReset }) {
  return (
    <footer className="site-footer">
      <span className="footer-copy">
        DEV.WRAPPED 2026 · Built with <span className="zero">0 tests</span> · Probably fine
      </span>
      <div className="footer-links">
        <button className="footer-link lc" onClick={onReset}>↩ Re-Analyze</button>
        <button className="footer-link lp crossed" disabled>Share (coming soon)</button>
        <button className="footer-link lr crossed" disabled>Export PDF (lol)</button>
      </div>
    </footer>
  )
}

/* ─── Report (main export) ─────────────────────────────── */
export default function Report({ username, dna, onReset, onCompare }) {
  const traits   = useMemo(() => computeTraits(dna), [dna])
  const archetypes = useMemo(() => deriveArchetypes(traits), [traits])
  const overall  = useMemo(
    () => Math.round(TRAIT_ORDER.reduce((s, k) => s + (traits[k] ?? 0), 0) / TRAIT_ORDER.length),
    [traits]
  )

  const [newUser, setNewUser] = useState('')

  const handleReanalyze = (e) => {
    e.preventDefault()
    const u = newUser.trim().replace(/^@/, '')
    if (u) onReset(u)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', minHeight:'100vh' }}>
      <Navbar avatarUrl={dna.profile.avatarUrl} onReset={() => onReset(null)} onCompare={onCompare} />

      {/* Sub-header */}
      <div className="hero-bar">
        <div className="hero-bar-inner">
          <div>
            <div className="hero-bar-title">
              ⚡ Analyzing: @{username}
            </div>
            <p className="hero-bar-sub">
              GENOME SEQUENCED · {dna.languages?.length ?? 0} LANGUAGES · {dna.stats.publicRepos} REPOS
            </p>
          </div>
          <form className="hero-bar-form" onSubmit={handleReanalyze}>
            <input
              className="hero-bar-input"
              type="text"
              value={newUser}
              onChange={e => setNewUser(e.target.value)}
              placeholder="Analyze another user..."
            />
            <button className="hero-bar-btn" type="submit" disabled={!newUser.trim()}>
              ⚡ Analyze
            </button>
          </form>
        </div>
      </div>

      {/* Main content */}
      <main className="report-main">

        {/* Row 1: Classification card + Stats */}
        <div className="two-col">
          <ProfileCard
            profile={dna.profile}
            archetypes={archetypes}
            traits={traits}
          />
          <StatsCards stats={dna.stats} />
        </div>

        {/* Row 2: Terminal + Gradient card */}
        <div className="two-col-b">
          <TerminalSection dna={dna} archetypes={archetypes} traits={traits} />
          <GradCard dna={dna} archetypes={archetypes} />
        </div>

        {/* Row 3: Language DNA */}
        <LanguageDNA languages={dna.languages} />

        {/* Row 4: DNA Engine */}
        <DNAEngine traits={traits} archetypes={archetypes} overall={overall} />

      </main>

      <Footer onReset={() => onReset(null)} />
    </div>
  )
}

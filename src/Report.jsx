import React, { useState, useMemo, useEffect } from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import LanguageDNA from './LanguageDNA'
import DNAEngine from './DNAEngine'
import { analyzeAsGame, getRoast, getTraitsByCategory, getAchievementStats } from './gameAnalyzer.js'
import { getMetricTier, getMetricColor, getMetricDescription } from './gameScoringMetrics.js'
import './gameUI.css'

/* ─── Game Metrics Cards ──────────────────────────────── */
function GameMetricsDisplay({ metrics }) {
  const metricOrder = [
    'shippingPower',
    'chaosEnergy',
    'innovationSpark',
    'documentationAura',
    'openSourceKarma',
    'technicalWizardry',
    'mainCharacterEnergy',
    'buildStability',
    'sideQuestCompletion',
    'debuggingResistance',
  ]

  const metricEmojis = {
    shippingPower: '📦',
    chaosEnergy: '⚡',
    innovationSpark: '✨',
    documentationAura: '📚',
    openSourceKarma: '🤝',
    technicalWizardry: '🧙',
    mainCharacterEnergy: '⭐',
    buildStability: '🏗️',
    sideQuestCompletion: '🎯',
    debuggingResistance: '🐛',
  }

  return (
    <div className="game-metrics-section">
      <div className="metrics-header">
        <h2 className="metrics-title">⚡ Game Metrics</h2>
        <p className="metrics-sub">10 DIMENSIONAL PROFILE</p>
      </div>
      <div className="metrics-grid">
        {metricOrder.map(metric => {
          const score = metrics[metric] ?? 0
          const tier = getMetricTier(score)
          const color = getMetricColor(score)
          const emoji = metricEmojis[metric] || '📊'
          const label = metric
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase())
            .trim()

          return (
            <div
              key={metric}
              className="metric-card"
              style={{
                borderColor: color,
                backgroundColor: `${color}10`,
              }}
            >
              <div className="metric-emoji">{emoji}</div>
              <div className="metric-label">{label}</div>
              <div className="metric-score" style={{ color }}>
                {Math.round(score)}
              </div>
              <div className="metric-tier">{tier}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Achievements Display ────────────────────────────– */
function AchievementsDisplay({ achievements, progress }) {
  return (
    <div className="achievements-section">
      <div className="achievements-header">
        <h2 className="achievements-title">🏆 Achievements</h2>
        <p className="achievements-sub">
          {achievements.totalUnlocked} UNLOCKED · {Object.values(progress).filter(p => p > 0 && p < 100).length} IN PROGRESS
        </p>
      </div>

      <div className="achievements-unlocked">
        <h3>Unlocked ({achievements.unlocked.length})</h3>
        <div className="achievements-grid">
          {achievements.unlocked.slice(0, 12).map(ach => (
            <div key={ach.id} className="achievement-badge">
              <div className="achievement-emoji">{ach.emoji}</div>
              <div className="achievement-name">{ach.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-progress">
        <h3>In Progress</h3>
        <div className="progress-list">
          {Object.entries(progress)
            .filter(([_, p]) => p > 0 && p < 100)
            .slice(0, 5)
            .map(([id, percent]) => (
              <div key={id} className="progress-item">
                <div className="progress-bar-bg">
                  <div className="progress-bar-fill" style={{ width: `${percent}%` }} />
                </div>
                <span className="progress-percent">{Math.round(percent)}%</span>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Enhanced DNA Traits ─────────────────────────────– */
function EnhancedDNATraits({ traits }) {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categories = {}
  for (const trait of traits) {
    if (!categories[trait.category]) categories[trait.category] = []
    categories[trait.category].push(trait)
  }

  const display = selectedCategory
    ? { [selectedCategory]: categories[selectedCategory] }
    : categories

  return (
    <div className="dna-traits-section">
      <div className="dna-traits-header">
        <h2 className="dna-traits-title">🧬 DNA Traits</h2>
        <p className="dna-traits-sub">{traits.length} PERSONALITY MARKERS</p>
      </div>

      {selectedCategory && (
        <button className="dna-filter-btn" onClick={() => setSelectedCategory(null)}>
          ✕ Clear Filter
        </button>
      )}

      {Object.entries(display).map(([category, traitList]) => (
        <div key={category} className="traits-category">
          <h3
            className="category-name"
            onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
            style={{ cursor: 'pointer' }}
          >
            {category.replace(/_/g, ' ').toUpperCase()} ({traitList.length})
          </h3>
          <div className="traits-list">
            {traitList.map(trait => (
              <div key={trait.id} className="trait-item">
                <span className="trait-emoji">{trait.emoji}</span>
                <div className="trait-content">
                  <div className="trait-name">{trait.name}</div>
                  <div className="trait-desc">{trait.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ─── Archetype Card ───────────────────────────────────– */
function ArchetypeDisplay({ archetype }) {
  return (
    <div className="archetype-display">
      <div className="archetype-header">
        <div className="archetype-emoji">{archetype.emoji}</div>
        <div>
          <h2 className="archetype-name">{archetype.name}</h2>
          <p className="archetype-rarity">{archetype.rarity.toUpperCase()} · {archetype.domain}</p>
        </div>
      </div>

      <p className="archetype-desc">{archetype.description}</p>

      <div className="archetype-traits">
        <div className="archetype-section">
          <h4>Strengths</h4>
          <ul>
            {archetype.strengths.map((s, i) => (
              <li key={i}>✓ {s}</li>
            ))}
          </ul>
        </div>
        <div className="archetype-section">
          <h4>Weaknesses</h4>
          <ul>
            {archetype.weaknesses.map((w, i) => (
              <li key={i}>✗ {w}</li>
            ))}
          </ul>
        </div>
      </div>

      <p className="archetype-phrase" style={{ fontStyle: 'italic', marginTop: '12px' }}>
        "{archetype.shareablePhrase}"
      </p>
    </div>
  )
}

/* ─── Game Roast Engine ───────────────────────────────– */
function GameRoastEngine({ analysis }) {
  const [severity, setSeverity] = useState('sarcastic')
  const roast = getRoast(analysis, severity)
  const severities = ['gentle', 'sarcastic', 'brutal']

  return (
    <div className="roast-engine-section">
      <div className="roast-header">
        <h2 className="roast-title">🔥 The Roast</h2>
        <p className="roast-sub">Context-Aware Verdict</p>
      </div>

      <div className="roast-display">
        <p className="roast-text">"{roast}"</p>
      </div>

      <div className="roast-severity-picker">
        <span className="picker-label">Severity:</span>
        <div className="severity-buttons">
          {severities.map(sev => (
            <button
              key={sev}
              className={`severity-btn ${severity === sev ? 'active' : ''}`}
              onClick={() => setSeverity(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Terminal content by severity ─────────────────────── */
function buildTerminalLines(dna, archetypes, traits, severity) {
  const { profile, stats, languages, scoring } = dna
  const years    = profile.accountAge?.years ?? 1
  const topLang  = languages?.[0]?.name ?? 'Unknown'
  const langCt   = languages?.length ?? 1
  const repoRate = years > 0 ? (stats.publicRepos / years).toFixed(1) : stats.publicRepos
  const openSourceRatio = Math.round((scoring.openSourceRatio ?? 0) * 100)
  const prCount = scoring.pullRequestScore ?? 0
  const docsPct = Math.round((scoring.documentationScore ?? 0) * 100)
  const deployPct = Math.round((scoring.deploymentCoverage ?? 0) * 100)
  const htmlRatio = Math.round((scoring.htmlOnlyRatio ?? 0) * 100)
  const aiMlPct = Math.round((scoring.aiMlCoverage ?? 0) * 100)
  const cvPct = Math.round((scoring.computerVisionCoverage ?? 0) * 100)
  const innovation = Math.round(traits.innovation ?? 50)
  const depth    = Math.round(traits.technicalDepth ?? 50)
  const mlFocus  = Math.round(traits.aiMlFocus ?? 0)
  const cvFocus  = Math.round(traits.cvFocus ?? 0)
  const robotics = Math.round(traits.roboticsFocus ?? 0)
  const primary = archetypes.primary.label
  const secondary = archetypes.secondary.label
  const starRatio= stats.publicRepos > 0 ? (stats.totalStars / stats.publicRepos).toFixed(1) : 0

  const sets = {
    gentle: [
      { cls:'t-cyan',  text:`> INITIATING GENOME ANALYSIS: @${profile.login}` },
      { cls:'t-muted', text:`> Archetype detected: ${primary} / ${secondary}` },
      { cls:'t-white', text:`> ${stats.publicRepos} public repos across ${years} year${years !== 1 ? 's' : ''} — ${repoRate} repos/yr` },
      { cls:'t-green', text:`> Open source ratio: ${openSourceRatio}% · PR activity: ${prCount}` },
      { cls:'t-white', text:`> Docs coverage: ${docsPct}% · Deployment signal: ${deployPct}%` },
      { cls:'t-cyan',  text:`> Technical depth: ${depth}/100 · Innovation: ${innovation}/100` },
      { cls:'t-muted', text:`> AI/ML focus: ${mlFocus}% · CV focus: ${cvFocus}% · Robotics: ${robotics}%` },
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
function StatsCards({ stats, scoring }) {
  const cards = [
    {
      id: 'METRIC_01', label: 'Public Repos',
      value: stats.publicRepos, badge: 'COUNTED', badgeCls: 'badge-red', glow: 'glow-cyan',
    },
    {
      id: 'METRIC_02', label: 'Open Source Ratio',
      value: `${Math.round((scoring.openSourceRatio ?? 0) * 100)}%`, badge: 'OSS', badgeCls: 'badge-purple', glow: 'glow-purple',
    },
    {
      id: 'METRIC_03', label: 'PR Activity',
      value: scoring.pullRequestScore ?? 0, badge: 'COLLAB', badgeCls: 'badge-amber', glow: 'glow-amber',
    },
    {
      id: 'METRIC_04', label: 'Docs Coverage',
      value: `${Math.round((scoring.documentationScore ?? 0) * 100)}%`, badge: 'DOCS', badgeCls: 'badge-blue', glow: 'glow-blue',
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
        DEV.WRAPPED 2024 · Built with <span className="zero">0 tests</span> · Probably fine
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
export default function Report({ username, dna, onReset }) {
  const [analysis, setAnalysis] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [newUser, setNewUser] = useState('')

  // Load game analysis on mount
  useEffect(() => {
    const loadAnalysis = async () => {
      try {
        setLoading(true)
        const result = await analyzeAsGame(username)
        setAnalysis(result)
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Analysis error:', err)
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      loadAnalysis()
    }
  }, [username])

  const handleReanalyze = (e) => {
    e.preventDefault()
    const u = newUser.trim().replace(/^@/, '')
    if (u) {
      setNewUser('')
      onReset(u)
    }
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar avatarUrl={dna?.profile.avatarUrl} onReset={() => onReset(null)} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p>Loading game analysis...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar avatarUrl={dna?.profile.avatarUrl} onReset={() => onReset(null)} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <p>Error: {error}</p>
            <button onClick={() => onReset(null)}>← Go Back</button>
          </div>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return <div>No analysis available</div>
  }

  const { gameAnalysis } = analysis
  const overall = gameAnalysis.overallScore

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar avatarUrl={analysis.profile.avatarUrl} onReset={() => onReset(null)} />

      {/* Sub-header */}
      <div className="hero-bar">
        <div className="hero-bar-inner">
          <div>
            <div className="hero-bar-title">
              ⚡ Analyzing: @{username}
            </div>
            <p className="hero-bar-sub">
              GAME ANALYSIS COMPLETE · OVERALL SCORE: {Math.round(overall)}/100
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
        {/* Archetype Display */}
        <ArchetypeDisplay archetype={gameAnalysis.archetype} />

        {/* Game Metrics */}
        <GameMetricsDisplay metrics={gameAnalysis.metrics} />

        {/* Roast Engine */}
        <GameRoastEngine analysis={analysis} />

        {/* DNA Traits */}
        <EnhancedDNATraits traits={gameAnalysis.dnaTraits} />

        {/* Achievements */}
        <AchievementsDisplay
          achievements={gameAnalysis.achievements}
          progress={gameAnalysis.achievements.progress}
        />

        {/* Original sections for compatibility */}
        <LanguageDNA languages={analysis.languages} />
      </main>

      <Footer onReset={() => onReset(null)} />
    </div>
  )
}

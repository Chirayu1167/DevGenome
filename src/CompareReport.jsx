import React, { useMemo, useState } from 'react'
import Navbar from './Navbar'
import ShareButton from './ShareButton.jsx'
import { computeTraits, deriveArchetypes, getTraitMeta, TRAIT_ORDER } from './dnaScoring.js'
import { renderDuelShareCard, buildDuelCaption } from './shareCard.js'

/* ─── Helpers ──────────────────────────────────────────── */
function overallOf(traits) {
  return Math.round(TRAIT_ORDER.reduce((s, k) => s + (traits[k] ?? 0), 0) / TRAIT_ORDER.length)
}

function pickWinner(a, b, key) {
  if (a === b) return 'tie'
  return a > b ? 'a' : 'b'
}

/* ─── Dueling Profile Header ──────────────────────────── */
function DuelHeader({ dnaA, dnaB, archA, archB, overallA, overallB }) {
  const winner = pickWinner(overallA, overallB)

  const Side = ({ dna, archetype, overall, side, isWinner }) => {
    const { profile } = dna
    return (
      <div className={`duel-side duel-${side} ${isWinner ? 'is-winner' : ''}`}>
        {isWinner && <div className="duel-crown">👑 LEADING</div>}
        <div className="duel-avatar-wrap">
          <img src={profile.avatarUrl} alt={profile.name || profile.login} className="duel-avatar" />
        </div>
        <h2 className="duel-name">{profile.name || profile.login}</h2>
        <p className="duel-handle">@{profile.login}</p>
        <div className="duel-archetype-tag">{archetype.primary.label}</div>
        <div className="duel-score">{overall}<span className="duel-score-unit">/100</span></div>
        <div className="duel-score-lbl">OVERALL GENOME SCORE</div>
      </div>
    )
  }

  return (
    <div className="duel-header">
      <Side dna={dnaA} archetype={archA} overall={overallA} side="a" isWinner={winner === 'a'} />
      <div className="duel-vs-badge">
        <span>VS</span>
      </div>
      <Side dna={dnaB} archetype={archB} overall={overallB} side="b" isWinner={winner === 'b'} />
    </div>
  )
}

/* ─── Trait Comparison Bars ────────────────────────────── */
function TraitBar({ label, color, valueA, valueB, nameA, nameB }) {
  const winner = pickWinner(valueA, valueB)
  return (
    <div className="duel-trait-row">
      <div className="duel-trait-top">
        <span className={`duel-trait-val ${winner === 'a' ? 'duel-val-win' : ''}`}>
          {Math.round(valueA)}
        </span>
        <span className="duel-trait-lbl" style={{ color }}>{label}</span>
        <span className={`duel-trait-val ${winner === 'b' ? 'duel-val-win' : ''}`}>
          {Math.round(valueB)}
        </span>
      </div>
      <div className="duel-trait-track">
        <div className="duel-trait-fill-a" style={{ width: `${valueA}%`, background: color }} />
        <div className="duel-trait-mid" />
        <div className="duel-trait-fill-b" style={{ width: `${valueB}%`, background: color }} />
      </div>
    </div>
  )
}

function TraitComparison({ traitsA, traitsB, nameA, nameB }) {
  return (
    <div className="dna-section">
      <div className="dna-header">
        <div>
          <div className="sec-title" style={{ fontSize: '1.4rem', fontWeight: 800 }}>
            ⚙️ Trait-by-Trait Breakdown
          </div>
          <p className="sec-sub">DUAL_TRAIT_MATRIX.EXE · {TRAIT_ORDER.length} sequences compared</p>
        </div>
        <div className="duel-legend">
          <span className="duel-legend-a">● {nameA}</span>
          <span className="duel-legend-b">● {nameB}</span>
        </div>
      </div>

      <div className="duel-traits-list">
        {TRAIT_ORDER.map(key => {
          const meta = getTraitMeta(key)
          return (
            <TraitBar
              key={key}
              label={meta.label}
              color={meta.color}
              valueA={traitsA[key] ?? 0}
              valueB={traitsB[key] ?? 0}
              nameA={nameA}
              nameB={nameB}
            />
          )
        })}
      </div>
    </div>
  )
}

/* ─── Stat Comparison Grid ─────────────────────────────── */
function StatDuelRow({ label, valueA, valueB, fmt = (v) => v }) {
  const winner = pickWinner(valueA, valueB)
  return (
    <div className="stat-duel-row">
      <span className={`stat-duel-val left ${winner === 'a' ? 'duel-val-win' : ''}`}>{fmt(valueA)}</span>
      <span className="stat-duel-lbl">{label}</span>
      <span className={`stat-duel-val right ${winner === 'b' ? 'duel-val-win' : ''}`}>{fmt(valueB)}</span>
    </div>
  )
}

function StatComparison({ dnaA, dnaB }) {
  const fmtK = (v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v
  return (
    <div className="stats-section">
      <div className="stats-header">
        <h2 className="stats-title">📊 Stat-for-Stat Showdown</h2>
        <p className="stats-sub">METRICS_DUEL.JSON · Live figures, zero spin</p>
      </div>
      <div className="stat-duel-card">
        <StatDuelRow label="Public Repos" valueA={dnaA.stats.publicRepos} valueB={dnaB.stats.publicRepos} fmt={fmtK} />
        <StatDuelRow label="Total Stars" valueA={dnaA.stats.totalStars} valueB={dnaB.stats.totalStars} fmt={fmtK} />
        <StatDuelRow label="Followers" valueA={dnaA.stats.followers} valueB={dnaB.stats.followers} fmt={fmtK} />
        <StatDuelRow label="Total Forks" valueA={dnaA.stats.totalForks ?? 0} valueB={dnaB.stats.totalForks ?? 0} fmt={fmtK} />
        <StatDuelRow
          label="Top Language"
          valueA={dnaA.languages?.[0]?.name ?? '—'}
          valueB={dnaB.languages?.[0]?.name ?? '—'}
        />
      </div>
    </div>
  )
}

/* ─── Verdict Terminal ─────────────────────────────────── */
function buildVerdictLines(dnaA, dnaB, archA, archB, overallA, overallB, severity) {
  const nameA = dnaA.profile.login
  const nameB = dnaB.profile.login
  const winner = pickWinner(overallA, overallB)
  const winnerName = winner === 'tie' ? null : winner === 'a' ? nameA : nameB
  const loserName  = winner === 'tie' ? null : winner === 'a' ? nameB : nameA
  const diff = Math.abs(overallA - overallB)

  const sets = {
    gentle: [
      { cls: 't-cyan',  text: `> INITIATING DUAL GENOME COMPARISON: @${nameA} vs @${nameB}` },
      { cls: 't-white', text: `> @${nameA}: ${archA.primary.label} (${overallA}/100)` },
      { cls: 't-white', text: `> @${nameB}: ${archB.primary.label} (${overallB}/100)` },
      winner === 'tie'
        ? { cls: 't-green', text: `> Result: dead even. Both developers bring something real to the table.` }
        : { cls: 't-green', text: `> Result: @${winnerName} edges ahead by ${diff} points. Both have clear strengths.` },
    ],
    sarcastic: [
      { cls: 't-cyan',  text: `> GENOME SHOWDOWN: @${nameA} vs @${nameB} (this should be fun)` },
      { cls: 't-amber', text: `> @${nameA} brings ${archA.primary.label} energy. Predictable.` },
      { cls: 't-amber', text: `> @${nameB} counters with ${archB.primary.label}. Bold strategy.` },
      winner === 'tie'
        ? { cls: 't-muted', text: `> It's a tie. Nobody wins. Everybody go home.` }
        : { cls: 't-amber', text: `> @${winnerName} wins by ${diff} points. @${loserName}, it's not a competition. (It was. You lost.)` },
    ],
    brutal: [
      { cls: 't-red',   text: `> ⚠ CRITICAL DUAL ANALYSIS: @${nameA} vs @${nameB}` },
      { cls: 't-white', text: `> @${nameA}: ${overallA}/100 — ${archA.primary.label}` },
      { cls: 't-white', text: `> @${nameB}: ${overallB}/100 — ${archB.primary.label}` },
      winner === 'tie'
        ? { cls: 't-red', text: `> Statistically deadlocked. Both portfolios equally exposed to scrutiny.` }
        : { cls: 't-red', text: `> @${winnerName} wins by ${diff}. @${loserName}, the gap is not flattering.` },
    ],
  }
  return sets[severity] ?? sets.brutal
}

function VerdictTerminal({ dnaA, dnaB, archA, archB, overallA, overallB }) {
  const [severity, setSeverity] = useState('brutal')
  const lines = useMemo(
    () => buildVerdictLines(dnaA, dnaB, archA, archB, overallA, overallB, severity),
    [dnaA, dnaB, archA, archB, overallA, overallB, severity]
  )
  const severities = ['gentle', 'sarcastic', 'brutal']
  const winner = pickWinner(overallA, overallB)
  const winnerLogin = winner === 'tie' ? null : winner === 'a' ? dnaA.profile.login : dnaB.profile.login

  return (
    <div className="terminal-wrap">
      <div className="terminal-topbar">
        <div className="t-dots">
          <div className="t-dot t-dot-r" />
          <div className="t-dot t-dot-a" />
          <div className="t-dot t-dot-g" />
        </div>
        <span className="terminal-fname">verdict_engine.exe</span>
      </div>

      <div className="terminal-body">
        {lines.map((l, i) => (
          <div key={i} className={`t-line ${l.cls}`}>
            {l.text}
            {i === lines.length - 1 && <span className="anim-blink" style={{ color: 'var(--cyan)' }}>▌</span>}
          </div>
        ))}

        <div className="t-alert">
          <div className="t-alert-label">⚠ Verdict Rendered</div>
          <div className="t-alert-text">
            {winner === 'tie' ? (
              <>Dead heat — both developers scored <strong style={{ color: 'var(--lilac)' }}>equally</strong>.</>
            ) : (
              <>Winner: <strong style={{ color: 'var(--lilac)' }}>@{winnerLogin}</strong>. Take it gracefully or badly. Your call.</>
            )}
          </div>
        </div>

        <div className="t-tags">
          {[
            `#${dnaA.profile.login}Vs${dnaB.profile.login}`,
            `#DevDuel`,
            winner !== 'tie' && `#${winnerLogin}Wins`,
            `#GitHubDNA`,
          ].filter(Boolean).map(tag => <span key={tag} className="t-tag">{tag}</span>)}
        </div>
      </div>

      <div className="severity-panel">
        <div className="severity-header">
          <span className="severity-lbl">VERDICT TONE</span>
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

/* ─── Footer ────────────────────────────────────────────── */
function Footer({ onReset, onNewCompare, shareRender, shareCaption, shareFilename }) {
  return (
    <footer className="site-footer">
      <span className="footer-copy">
        DEV.WRAPPED 2026 · Built with <span className="zero">0 tests</span> · Probably fine
      </span>
      <div className="footer-links">
        <button className="footer-link lc" onClick={onNewCompare}>⚔ New Comparison</button>
        <ShareButton render={shareRender} caption={shareCaption} filename={shareFilename} label="📸 Share Duel" />
        <button className="footer-link lp" onClick={onReset}>↩ Back to Single Analysis</button>
      </div>
    </footer>
  )
}

/* ─── CompareReport (main export) ──────────────────────── */
export default function CompareReport({ usernameA, usernameB, dnaA, dnaB, onReset, onNewCompare }) {
  const traitsA = useMemo(() => computeTraits(dnaA), [dnaA])
  const traitsB = useMemo(() => computeTraits(dnaB), [dnaB])
  const archA   = useMemo(() => deriveArchetypes(traitsA), [traitsA])
  const archB   = useMemo(() => deriveArchetypes(traitsB), [traitsB])
  const overallA = useMemo(() => overallOf(traitsA), [traitsA])
  const overallB = useMemo(() => overallOf(traitsB), [traitsB])
  const winner = pickWinner(overallA, overallB)

  const shareRender = () => renderDuelShareCard({
    a: {
      login: dnaA.profile.login,
      avatarUrl: dnaA.profile.avatarUrl,
      archetype: archA.primary.label,
      overall: overallA,
    },
    b: {
      login: dnaB.profile.login,
      avatarUrl: dnaB.profile.avatarUrl,
      archetype: archB.primary.label,
      overall: overallB,
    },
    winnerSide: winner === 'tie' ? null : winner,
  })

  const shareCaption = buildDuelCaption({
    loginA: usernameA,
    loginB: usernameB,
    archetypeA: archA.primary.label,
    archetypeB: archB.primary.label,
    overallA,
    overallB,
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar onReset={onReset} onCompare={onNewCompare} activeView="compare" />

      <div className="hero-bar">
        <div className="hero-bar-inner">
          <div>
            <div className="hero-bar-title">⚔ Comparing: @{usernameA} vs @{usernameB}</div>
            <p className="hero-bar-sub">DUAL GENOME SEQUENCED · HEAD-TO-HEAD ANALYSIS COMPLETE</p>
          </div>
          <button className="hero-bar-btn" onClick={onNewCompare}>⚔ New Comparison</button>
        </div>
      </div>

      <main className="report-main">
        <DuelHeader
          dnaA={dnaA} dnaB={dnaB}
          archA={archA} archB={archB}
          overallA={overallA} overallB={overallB}
        />

        <StatComparison dnaA={dnaA} dnaB={dnaB} />

        <TraitComparison
          traitsA={traitsA} traitsB={traitsB}
          nameA={dnaA.profile.login} nameB={dnaB.profile.login}
        />

        <VerdictTerminal
          dnaA={dnaA} dnaB={dnaB}
          archA={archA} archB={archB}
          overallA={overallA} overallB={overallB}
        />
      </main>

      <Footer
        onReset={onReset}
        onNewCompare={onNewCompare}
        shareRender={shareRender}
        shareCaption={shareCaption}
        shareFilename={`devwrapped-duel-${usernameA}-vs-${usernameB}.png`}
      />
    </div>
  )
}

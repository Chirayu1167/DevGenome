import React from 'react'
import { getTraitMeta, TRAIT_ORDER } from './dnaScoring.js'

function ArcMeter({ value, color, label }) {
  const R = 38, cx = 60, cy = 54
  const startAngle = -210, sweepDeg = 240
  const pct = Math.min(1, Math.max(0, (value ?? 0) / 100))

  const toXY = (cx, cy, r, deg) => {
    const rad = (deg - 90) * (Math.PI / 180)
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
  }

  const arc = (cx, cy, r, s, e) => {
    const sp = toXY(cx, cy, r, s), ep = toXY(cx, cy, r, e)
    const large = e - s > 180 ? 1 : 0
    return `M ${sp.x} ${sp.y} A ${r} ${r} 0 ${large} 1 ${ep.x} ${ep.y}`
  }

  const endAngle = startAngle + sweepDeg * pct

  return (
    <div className="trait-arc-wrap">
      <svg viewBox="0 0 120 80" className="trait-arc-svg">
        <path d={arc(cx,cy,R,startAngle,startAngle+sweepDeg)}
          fill="none" stroke="#353534" strokeWidth="10" strokeLinecap="round" />
        {pct > 0 && (
          <path d={arc(cx,cy,R,startAngle,endAngle)}
            fill="none" stroke={color} strokeWidth="10" strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 4px ${color})` }}
          />
        )}
        <text x={cx} y={cy+4} textAnchor="middle"
          style={{ fontFamily:'JetBrains Mono,monospace', fontSize:14, fontWeight:800, fill:'#fff' }}>
          {Math.round(value ?? 0)}
        </text>
        <text x={cx} y={cy+17} textAnchor="middle"
          style={{ fontFamily:'JetBrains Mono,monospace', fontSize:7, fill:'#6b7280' }}>
          /100
        </text>
      </svg>
      <div className="trait-arc-lbl" style={{ color }}>
        {label}
      </div>
    </div>
  )
}

export default function DNAEngine({ traits, archetypes, overall }) {
  if (!traits || !archetypes) return null

  const primary   = archetypes.primary
  const secondary = archetypes.secondary
  const priMeta   = getTraitMeta(primary.key)
  const secMeta   = getTraitMeta(secondary.key)

  return (
    <div className="dna-section">
      <div className="dna-header">
        <div>
          <div className="sec-title" style={{ fontSize:'1.4rem', fontWeight:800 }}>
            ⚙️ DNA Engine Analysis
          </div>
          <p className="sec-sub">TRAIT_MATRIX.EXE · {TRAIT_ORDER.length} sequences measured</p>
        </div>
        <div style={{ textAlign:'right' }}>
          <div className="dna-score-lbl">OVERALL SCORE</div>
          <div className="dna-score-val">{overall ?? '--'}</div>
        </div>
      </div>

      {/* Trait arc meters */}
      <div className="trait-grid">
        {TRAIT_ORDER.map(key => {
          const meta = getTraitMeta(key)
          return (
            <ArcMeter
              key={key}
              value={traits[key] ?? 0}
              color={meta.color}
              label={meta.label}
            />
          )
        })}
      </div>

      {/* Archetype badges */}
      <div className="archetype-row">
        <div className="arch-badge" style={{ borderColor: priMeta.color }}>
          <div className="arch-role">PRIMARY ARCHETYPE</div>
          <div className="arch-name" style={{ color: priMeta.color }}>
            {primary.label}
          </div>
          <p style={{ fontSize:11, color:'var(--muted)', marginTop:8, fontFamily:'var(--ff-mono)' }}>
            Dominant trait: {priMeta.label}
          </p>
        </div>
        <div className="arch-badge" style={{ borderColor: secMeta.color }}>
          <div className="arch-role">SECONDARY ARCHETYPE</div>
          <div className="arch-name" style={{ color: secMeta.color }}>
            {secondary.label}
          </div>
          <p style={{ fontSize:11, color:'var(--muted)', marginTop:8, fontFamily:'var(--ff-mono)' }}>
            Supporting trait: {secMeta.label}
          </p>
        </div>
      </div>
    </div>
  )
}

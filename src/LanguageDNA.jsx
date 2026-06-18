import React from 'react'

const LANG_COLORS = {
  JavaScript: 'linear-gradient(90deg,#f7df1e,#f0a500)',
  TypeScript: 'linear-gradient(90deg,#3178c6,#5ca5e0)',
  Python:     'linear-gradient(90deg,#3572a5,#ffd343)',
  Rust:       'linear-gradient(90deg,#dea584,#ce422b)',
  Go:         'linear-gradient(90deg,#00add8,#007d9c)',
  Java:       'linear-gradient(90deg,#b07219,#ed8b00)',
  'C++':      'linear-gradient(90deg,#f34b7d,#c0185e)',
  Ruby:       'linear-gradient(90deg,#701516,#cc342d)',
  PHP:        'linear-gradient(90deg,#4f5d95,#8892bf)',
  Swift:      'linear-gradient(90deg,#fa7343,#f05138)',
  Kotlin:     'linear-gradient(90deg,#a97bff,#7f52ff)',
  CSS:        'linear-gradient(90deg,#563d7c,#a175d3)',
  HTML:       'linear-gradient(90deg,#e34c26,#f16529)',
  Shell:      'linear-gradient(90deg,#89e051,#5fba41)',
  Dart:       'linear-gradient(90deg,#00b4ab,#40c4aa)',
}

const defaultGrad = 'linear-gradient(90deg,var(--cyan),var(--purple))'

const INSIGHTS = [
  'Your main squeeze.', 'A classic comfort zone.',
  'Getting dangerous with this one.', 'Someone had to do it.',
  "It's not a phase, it's a lifestyle.", 'Bold choice. We respect it.',
  'Chaos, lovingly packaged.', 'The dark horse of your stack.',
]

export default function LanguageDNA({ languages }) {
  if (!languages?.length) return null

  const topLangs = languages.slice(0, 6)
  const maxPct = topLangs[0]?.percentage ?? 1

  return (
    <div className="lang-section">
      <div className="sticky-note" style={{ right: -10, top: '30%', transform: 'translateY(-50%) rotate(12deg)' }}>
        ⚠ Instability<br />detected
      </div>

      <div className="sec-title">
        <span className="sec-ping" />
        Genetic Code Instability Index
      </div>
      <p className="sec-sub">
        LANGUAGE_GENOME.DNA · {topLangs.length} sequences decoded
      </p>

      <div className="lang-rows">
        {topLangs.map((lang, i) => {
          const pct = lang.percentage ?? Math.round((lang.bytes / (languages[0]?.bytes || 1)) * 100)
          const barW = Math.min(100, Math.round((pct / maxPct) * 100))
          return (
            <div className="lang-row" key={lang.name}>
              <div className="lang-row-top">
                <div className="lang-name-cell">
                  <span>{lang.name}</span>
                  <span className="lang-chip">#{i + 1}</span>
                </div>
                <span className="lang-pct-text">{Math.round(pct)}%</span>
              </div>
              <div className="lang-track">
                <div
                  className="lang-fill"
                  style={{
                    '--bar-w': `${barW}%`,
                    background: LANG_COLORS[lang.name] ?? defaultGrad,
                  }}
                />
              </div>
              <p className="lang-insight">{INSIGHTS[i % INSIGHTS.length]}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'

const STEPS = [
  { hex: '⬡', label: 'Fetching public profile data...' },
  { hex: '⬡', label: 'Mapping repository genome...' },
  { hex: '⬡', label: 'Scanning language instability index...' },
  { hex: '⬡', label: 'Computing developer archetypes...' },
  { hex: '⬡', label: 'Preparing damage report...' },
]

export default function Loading({ username }) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setStep(s => Math.min(s + 1, STEPS.length - 1))
    }, 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="loading-page">
      <Navbar />
      <div className="loading-page" style={{ paddingTop: 0 }}>
        {/* Spinning DNA icon */}
        <div className="loading-icon-wrap anim-spin">
          <svg className="loading-icon-svg" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22V12M12 12V2M12 12L4.5 7.5M12 12L19.5 7.5M12 12L4.5 16.5M12 12L19.5 16.5"/>
          </svg>
        </div>

        <h2 className="loading-heading">
          ANALYZING{username ? ` @${username}` : ''}
          <span className="anim-blink" style={{ color: 'var(--cyan)' }}>_</span>
        </h2>
        <p className="loading-sub">GENOME SEQUENCING IN PROGRESS — DO NOT CLOSE TAB</p>

        <div className="steps">
          {STEPS.map((s, i) => (
            <div
              key={i}
              className={`step ${i === step ? 'active' : i < step ? 'done' : ''}`}
            >
              <span className="hex">{i < step ? '✓' : s.hex}</span>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

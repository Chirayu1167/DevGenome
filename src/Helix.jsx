import React from 'react'

/* Pure-SVG double helix. Two sine curves cross each other vertically;
   rungs connect them at regular phase intervals. */
export default function Helix({ rungCount = 22, color1 = '#00F5FF', color2 = '#39FF14' }) {
  const width = 200
  const height = 600
  const cx = width / 2
  const amp = 70
  const period = height / 4 // one full wave over 1/4 of height

  const points = (phaseShift) => {
    const pts = []
    for (let i = 0; i <= 200; i++) {
      const t = i / 200
      const y = t * height
      const x = cx + amp * Math.sin((y / period) * Math.PI * 2 + phaseShift)
      pts.push(`${x.toFixed(2)},${y.toFixed(2)}`)
    }
    return pts.join(' ')
  }

  const rungs = []
  for (let i = 0; i < rungCount; i++) {
    const t = (i + 0.5) / rungCount
    const y = t * height
    const x1 = cx + amp * Math.sin((y / period) * Math.PI * 2)
    const x2 = cx + amp * Math.sin((y / period) * Math.PI * 2 + Math.PI)
    const opacity = 0.25 + 0.55 * Math.abs(Math.sin((y / period) * Math.PI * 2))
    rungs.push(
      <line
        key={i}
        x1={x1} y1={y} x2={x2} y2={y}
        stroke={i % 3 === 0 ? color2 : color1}
        strokeWidth="1.5"
        opacity={opacity.toFixed(2)}
      />
    )
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="strand1" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color1} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color1} stopOpacity="1" />
          <stop offset="100%" stopColor={color1} stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id="strand2" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color2} stopOpacity="0.2" />
          <stop offset="50%" stopColor={color2} stopOpacity="1" />
          <stop offset="100%" stopColor={color2} stopOpacity="0.2" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#glow)">
        <polyline
          points={points(0)}
          fill="none"
          stroke="url(#strand1)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <polyline
          points={points(Math.PI)}
          fill="none"
          stroke="url(#strand2)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {rungs}
      </g>
    </svg>
  )
}

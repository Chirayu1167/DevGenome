/* ─── Shareable Image Export ───────────────────────────────
   Pure Canvas API renderers — no extra dependencies.
   Produces branded PNG cards sized for LinkedIn/Twitter (1200x630)
   plus a matching caption string for one-click sharing. */

const W = 1200
const H = 630

/* ─── Shared drawing helpers ───────────────────────────── */
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawBackground(ctx) {
  // Base
  ctx.fillStyle = '#0A0A0A'
  ctx.fillRect(0, 0, W, H)

  // Radial purple glow, top
  const g1 = ctx.createRadialGradient(W * 0.5, -80, 0, W * 0.5, -80, 700)
  g1.addColorStop(0, 'rgba(207,92,255,0.16)')
  g1.addColorStop(1, 'rgba(207,92,255,0)')
  ctx.fillStyle = g1
  ctx.fillRect(0, 0, W, H)

  // Faint grid lines for texture
  ctx.strokeStyle = 'rgba(255,255,255,0.035)'
  ctx.lineWidth = 1
  for (let x = 0; x < W; x += 40) {
    ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke()
  }
  for (let y = 0; y < H; y += 40) {
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke()
  }
}

function drawHeaderBrand(ctx) {
  ctx.textBaseline = 'alphabetic'
  ctx.font = '700 22px "Space Grotesk", sans-serif'
  const grad = ctx.createLinearGradient(40, 0, 280, 0)
  grad.addColorStop(0, '#00dce5')
  grad.addColorStop(1, '#cf5cff')
  ctx.fillStyle = grad
  ctx.fillText('DEV.WRAPPED', 40, 50)

  ctx.font = '600 10px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(236,178,255,0.85)'
  const badgeText = '2026 EDITION'
  const badgeW = ctx.measureText(badgeText).width + 16
  roundRect(ctx, 230, 32, badgeW, 18, 4)
  ctx.fillStyle = 'rgba(207,92,255,0.14)'
  ctx.fill()
  ctx.fillStyle = '#f8d8ff'
  ctx.fillText(badgeText, 238, 45)
}

function drawFooterTag(ctx, text) {
  ctx.font = '500 13px "JetBrains Mono", monospace'
  ctx.fillStyle = 'rgba(255,255,255,0.32)'
  ctx.textAlign = 'left'
  ctx.fillText(text, 40, H - 28)
  ctx.textAlign = 'right'
  ctx.fillStyle = 'rgba(0,220,229,0.55)'
  ctx.fillText('Generate yours →', W - 40, H - 28)
  ctx.textAlign = 'left'
}

function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = url
  })
}

function drawAvatarCircle(ctx, img, cx, cy, r, ringColor) {
  ctx.save()
  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.closePath()
  ctx.clip()
  if (img) {
    ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2)
  } else {
    ctx.fillStyle = '#201f1f'
    ctx.fill()
  }
  ctx.restore()

  ctx.beginPath()
  ctx.arc(cx, cy, r, 0, Math.PI * 2)
  ctx.lineWidth = 4
  ctx.strokeStyle = ringColor
  ctx.stroke()
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ')
  const lines = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

/* ─── Solo report share card ───────────────────────────── */
export async function renderSoloShareCard({ profile, archetype, secondaryLabel, overall, traits, topLine, topLang }) {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  drawBackground(ctx)
  drawHeaderBrand(ctx)

  let avatarImg = null
  try { avatarImg = await loadImage(profile.avatarUrl) } catch { /* fallback to blank circle */ }

  // Left column: avatar + identity
  const avX = 150, avY = 230, avR = 92
  drawAvatarCircle(ctx, avatarImg, avX, avY, avR, '#cf5cff')

  ctx.textAlign = 'center'
  ctx.font = '800 30px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(profile.name || profile.login, avX, avY + 140)

  ctx.font = '600 15px "JetBrains Mono", monospace'
  ctx.fillStyle = '#00dce5'
  ctx.fillText(`@${profile.login}`, avX, avY + 168)
  ctx.textAlign = 'left'

  // Right panel: classification box
  const boxX = 380, boxY = 110, boxW = 780, boxH = 420
  ctx.fillStyle = 'rgba(28,27,27,0.9)'
  roundRect(ctx, boxX, boxY, boxW, boxH, 20)
  ctx.fill()
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  roundRect(ctx, boxX, boxY, boxW, boxH, 20)
  ctx.stroke()

  ctx.font = '700 12px "JetBrains Mono", monospace'
  ctx.fillStyle = '#ecb2ff'
  ctx.fillText('CLASSIFICATION', boxX + 40, boxY + 50)

  ctx.font = '800 46px "Space Grotesk", sans-serif'
  ctx.fillStyle = '#ffffff'
  ctx.fillText(archetype, boxX + 40, boxY + 105)

  if (secondaryLabel) {
    ctx.font = '600 16px "JetBrains Mono", monospace'
    ctx.fillStyle = '#9aa0a6'
    ctx.fillText(`✦ Secondary: ${secondaryLabel}`, boxX + 40, boxY + 138)
  }

  // Roast / quote line
  if (topLine) {
    ctx.font = 'italic 500 19px "Space Grotesk", sans-serif'
    ctx.fillStyle = '#d1d5db'
    const lines = wrapText(ctx, `"${topLine}"`, boxW - 80).slice(0, 2)
    lines.forEach((line, i) => ctx.fillText(line, boxX + 40, boxY + 180 + i * 28))
  }

  // Score + top language chips
  const chipY = boxY + 280
  ctx.font = '800 64px "Space Grotesk", sans-serif'
  const scoreGrad = ctx.createLinearGradient(boxX + 40, 0, boxX + 240, 0)
  scoreGrad.addColorStop(0, '#00dce5')
  scoreGrad.addColorStop(1, '#cf5cff')
  ctx.fillStyle = scoreGrad
  ctx.fillText(String(overall), boxX + 40, chipY + 56)
  ctx.font = '600 16px "JetBrains Mono", monospace'
  ctx.fillStyle = '#6b7280'
  ctx.fillText('/100 OVERALL SCORE', boxX + 165, chipY + 56)

  // Trait mini-bars (top 3 traits)
  const traitEntries = Object.entries(traits || {}).sort((a, b) => b[1] - a[1]).slice(0, 3)
  const barX = boxX + 40, barY = chipY + 90, barW = boxW - 80, barH = 10, gap = 34
  traitEntries.forEach(([key, val], i) => {
    const y = barY + i * gap
    ctx.font = '600 12px "JetBrains Mono", monospace'
    ctx.fillStyle = '#9aa0a6'
    ctx.fillText(key.replace(/([A-Z])/g, ' $1').trim(), barX, y - 6)
    ctx.fillStyle = 'rgba(255,255,255,0.08)'
    roundRect(ctx, barX, y, barW, barH, 5)
    ctx.fill()
    const fillGrad = ctx.createLinearGradient(barX, 0, barX + barW, 0)
    fillGrad.addColorStop(0, '#00dce5')
    fillGrad.addColorStop(1, '#cf5cff')
    ctx.fillStyle = fillGrad
    roundRect(ctx, barX, y, barW * Math.min(1, val / 100), barH, 5)
    ctx.fill()
  })

  drawFooterTag(ctx, `Top language: ${topLang || 'Unknown'} · devwrapped.app`)

  return canvas
}

/* ─── Compare (duel) share card ────────────────────────── */
export async function renderDuelShareCard({ a, b, winnerSide }) {
  const canvas = document.createElement('canvas')
  canvas.width = W
  canvas.height = H
  const ctx = canvas.getContext('2d')

  drawBackground(ctx)
  drawHeaderBrand(ctx)

  let imgA = null, imgB = null
  try { imgA = await loadImage(a.avatarUrl) } catch {}
  try { imgB = await loadImage(b.avatarUrl) } catch {}

  const sideW = W / 2
  const cy = 230, r = 84

  const drawSide = (data, img, cx, isWinner) => {
    if (isWinner) {
      ctx.font = '800 13px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillStyle = '#fbbf24'
      ctx.fillText('👑 LEADING', cx, cy - r - 26)
    }
    drawAvatarCircle(ctx, img, cx, cy, r, isWinner ? '#fbbf24' : '#cf5cff')

    ctx.textAlign = 'center'
    ctx.font = '800 26px "Space Grotesk", sans-serif'
    ctx.fillStyle = '#ffffff'
    ctx.fillText(data.login, cx, cy + r + 42)

    ctx.font = '600 13px "JetBrains Mono", monospace'
    ctx.fillStyle = '#00dce5'
    ctx.fillText(data.archetype, cx, cy + r + 66)

    ctx.font = '800 50px "Space Grotesk", sans-serif'
    const grad = ctx.createLinearGradient(cx - 60, 0, cx + 60, 0)
    grad.addColorStop(0, '#00dce5')
    grad.addColorStop(1, '#cf5cff')
    ctx.fillStyle = grad
    ctx.fillText(String(data.overall), cx, cy + r + 130)
    ctx.font = '600 11px "JetBrains Mono", monospace'
    ctx.fillStyle = '#6b7280'
    ctx.fillText('OVERALL SCORE', cx, cy + r + 150)
    ctx.textAlign = 'left'
  }

  drawSide(a, imgA, sideW * 0.5, winnerSide === 'a')
  drawSide(b, imgB, sideW * 1.5, winnerSide === 'b')

  // Center VS badge
  ctx.beginPath()
  ctx.arc(W / 2, cy, 36, 0, Math.PI * 2)
  ctx.fillStyle = '#1c1b1b'
  ctx.fill()
  ctx.lineWidth = 2
  ctx.strokeStyle = '#cf5cff'
  ctx.stroke()
  ctx.textAlign = 'center'
  ctx.font = '800 18px "JetBrains Mono", monospace'
  ctx.fillStyle = '#ecb2ff'
  ctx.fillText('VS', W / 2, cy + 6)
  ctx.textAlign = 'left'

  // Divider line
  ctx.strokeStyle = 'rgba(255,255,255,0.08)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(W / 2, 110)
  ctx.lineTo(W / 2, H - 90)
  ctx.stroke()

  drawFooterTag(ctx, `${a.login} vs ${b.login} · devwrapped.app`)

  return canvas
}

/* ─── Canvas → Blob/Download helpers ───────────────────── */
export function canvasToBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
}

export function downloadCanvas(canvas, filename) {
  const url = canvas.toDataURL('image/png')
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

/* ─── Caption generator ─────────────────────────────────── */
export function buildSoloCaption({ login, archetype, overall, topLang }) {
  const lines = [
    `My GitHub DNA just got decoded 🧬`,
    `Archetype: ${archetype} — ${overall}/100 overall score.`,
    topLang ? `Apparently I'm a ${topLang} lifer.` : null,
    ``,
    `What's your developer archetype? Try it on @${login}'s analyzer 👇`,
  ].filter(Boolean)
  return lines.join('\n')
}

export function buildDuelCaption({ loginA, loginB, archetypeA, archetypeB, overallA, overallB }) {
  const winner = overallA === overallB ? null : overallA > overallB ? loginA : loginB
  const lines = [
    `I challenged a friend to a GitHub DNA duel ⚔️`,
    `@${loginA}: ${archetypeA} (${overallA}/100)`,
    `@${loginB}: ${archetypeB} (${overallB}/100)`,
    winner ? `👑 @${winner} takes it.` : `It's a dead tie.`,
    ``,
    `Tag someone and settle it.`,
  ]
  return lines.join('\n')
}

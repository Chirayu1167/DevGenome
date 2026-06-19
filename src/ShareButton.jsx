import React, { useState, useRef, useCallback } from 'react'
import { downloadCanvas } from './shareCard.js'

/* ─── ShareButton ─────────────────────────────────────────
   Generic "Share" trigger + modal preview. Pass a `render`
   function that returns a Promise<HTMLCanvasElement>, a
   `caption` string, and a `filename` for the download.
   Reused by both the solo Report and CompareReport pages. */
export default function ShareButton({ render, caption, filename, label = '📸 Share Card' }) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dataUrl, setDataUrl] = useState(null)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState(null)
  const canvasRef = useRef(null)

  const generate = useCallback(async () => {
    setOpen(true)
    setLoading(true)
    setError(null)
    try {
      const canvas = await render()
      canvasRef.current = canvas
      setDataUrl(canvas.toDataURL('image/png'))
    } catch (e) {
      setError('Could not generate the image — try again in a moment.')
    } finally {
      setLoading(false)
    }
  }, [render])

  const handleDownload = () => {
    if (canvasRef.current) downloadCanvas(canvasRef.current, filename)
  }

  const handleCopyCaption = async () => {
    try {
      await navigator.clipboard.writeText(caption)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setError('Could not copy — select and copy the text manually.')
    }
  }

  const close = () => {
    setOpen(false)
    setDataUrl(null)
    setError(null)
    canvasRef.current = null
  }

  return (
    <>
      <button className="footer-link lp" onClick={generate}>{label}</button>

      {open && (
        <div className="share-modal-overlay" onClick={close}>
          <div className="share-modal" onClick={e => e.stopPropagation()}>
            <div className="share-modal-head">
              <span>⚡ Your Shareable Card</span>
              <button className="share-modal-close" onClick={close} aria-label="Close">✕</button>
            </div>

            <div className="share-modal-body">
              {loading && (
                <div className="share-modal-loading">
                  <span className="anim-pulse">🧬 Rendering your card...</span>
                </div>
              )}
              {!loading && error && (
                <div className="share-modal-loading" style={{ color: 'var(--red)' }}>{error}</div>
              )}
              {!loading && dataUrl && (
                <img src={dataUrl} alt="Shareable DNA card" className="share-preview-img" />
              )}
            </div>

            {!loading && dataUrl && (
              <>
                <div className="share-modal-actions">
                  <button className="hero-cta share-action-btn" onClick={handleDownload}>
                    ⬇ Download PNG
                  </button>
                  <button className="hero-cta share-action-btn share-action-secondary" onClick={handleCopyCaption}>
                    {copied ? '✓ Copied!' : '📋 Copy Caption'}
                  </button>
                </div>
                <div className="share-caption-preview">{caption}</div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}

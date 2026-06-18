import React, { useEffect, useRef, useState } from 'react'
import Hero from './Hero.jsx'
import Loading from './Loading.jsx'
import Report from './Report.jsx'
import ErrorState from './ErrorState.jsx'
import { fetchGitHubData, GitHubError } from './github.js'

export default function App() {
  const [view, setView]     = useState('landing')
  const [username, setUsername] = useState('')
  const [dna, setDna]       = useState(null)
  const [error, setError]   = useState(null)
  const timersRef = useRef([])

  useEffect(() => () => timersRef.current.forEach(clearTimeout), [])

  const analyze = async (user) => {
    const trimmed = user.trim()
    if (!trimmed) return

    setUsername(trimmed)
    setError(null)
    setDna(null)
    setView('loading')

    const minDisplay = 4 * 600 + 400
    const startedAt  = Date.now()

    try {
      const data    = await fetchGitHubData(trimmed)
      const elapsed = Date.now() - startedAt
      const wait    = Math.max(0, minDisplay - elapsed)
      timersRef.current.push(
        setTimeout(() => { setDna(data); setView('report') }, wait)
      )
    } catch (e) {
      const elapsed = Date.now() - startedAt
      const wait    = Math.max(0, minDisplay - elapsed)
      const code    = e instanceof GitHubError ? e.code : 'network'
      const message =
        code === 'not_found'    ? 'Profile not found — check the username.' :
        code === 'rate_limited' ? 'GitHub rate limit reached. Try again in a minute.' :
        code === 'network'      ? 'Network error — check your connection.' :
                                  (e?.message || 'Something went wrong.')
      timersRef.current.push(
        setTimeout(() => { setError({ code, message }); setView('error') }, wait)
      )
    }
  }

  // onReset: null/undefined → go home; string → analyze that user
  const reset = (newUser = null) => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setError(null)
    setDna(null)
    if (typeof newUser === 'string' && newUser.trim()) {
      analyze(newUser.trim())
    } else {
      setView('landing')
    }
  }

  if (view === 'loading') return <Loading username={username} />
  if (view === 'error')
    return <ErrorState message={error?.message} username={username} onRetry={() => reset()} />
  if (view === 'report')
    return <Report username={username} dna={dna} onReset={reset} />

  return <Hero onAnalyze={analyze} />
}

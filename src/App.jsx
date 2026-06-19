import React, { useEffect, useRef, useState } from 'react'
import Hero from './Hero.jsx'
import Loading from './Loading.jsx'
import Report from './Report.jsx'
import ErrorState from './ErrorState.jsx'
import CompareHero from './CompareHero.jsx'
import CompareLoading from './CompareLoading.jsx'
import CompareReport from './CompareReport.jsx'
import CompareError from './CompareError.jsx'
import { fetchGitHubData, GitHubError } from './github.js'

export default function App() {
  const [view, setView]     = useState('landing')
  const [username, setUsername] = useState('')
  const [dna, setDna]       = useState(null)
  const [error, setError]   = useState(null)
  const timersRef = useRef([])

  // Compare flow state
  const [compareUsers, setCompareUsers] = useState({ a: '', b: '' })
  const [compareDna, setCompareDna]     = useState({ a: null, b: null })
  const [compareError, setCompareErrorMsg] = useState(null)

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

  /* ─── Compare flow ──────────────────────────────────── */
  const goToCompareLanding = (prefillUser = null) => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setCompareErrorMsg(null)
    setCompareDna({ a: null, b: null })
    setCompareUsers({ a: prefillUser || '', b: '' })
    setView('compareLanding')
  }

  const runCompare = async (userA, userB) => {
    const a = userA.trim()
    const b = userB.trim()
    if (!a || !b) return

    setCompareUsers({ a, b })
    setCompareErrorMsg(null)
    setCompareDna({ a: null, b: null })
    setView('compareLoading')

    const minDisplay = 4 * 600 + 400
    const startedAt  = Date.now()

    try {
      const [dataA, dataB] = await Promise.all([
        fetchGitHubData(a),
        fetchGitHubData(b),
      ])
      const elapsed = Date.now() - startedAt
      const wait    = Math.max(0, minDisplay - elapsed)
      timersRef.current.push(
        setTimeout(() => {
          setCompareDna({ a: dataA, b: dataB })
          setView('compareReport')
        }, wait)
      )
    } catch (e) {
      const elapsed = Date.now() - startedAt
      const wait    = Math.max(0, minDisplay - elapsed)
      const code    = e instanceof GitHubError ? e.code : 'network'
      const message =
        code === 'not_found'    ? 'One of these profiles could not be found — check both usernames.' :
        code === 'rate_limited' ? 'GitHub rate limit reached. Try again in a minute.' :
        code === 'network'      ? 'Network error — check your connection.' :
                                  (e?.message || 'Something went wrong.')
      timersRef.current.push(
        setTimeout(() => { setCompareErrorMsg(message); setView('compareError') }, wait)
      )
    }
  }

  const retryCompare = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    setCompareErrorMsg(null)
    setView('compareLanding')
  }

  /* ─── View routing ──────────────────────────────────── */
  if (view === 'loading') return <Loading username={username} />
  if (view === 'error')
    return <ErrorState message={error?.message} username={username} onRetry={() => reset()} />
  if (view === 'report')
    return <Report username={username} dna={dna} onReset={reset} onCompare={() => goToCompareLanding(username)} />

  if (view === 'compareLanding')
    return <CompareHero onCompare={runCompare} onBack={() => setView('landing')} prefillUserA={compareUsers.a} />
  if (view === 'compareLoading')
    return <CompareLoading usernameA={compareUsers.a} usernameB={compareUsers.b} />
  if (view === 'compareError')
    return (
      <CompareError
        message={compareError}
        onRetry={retryCompare}
        onBack={() => setView('landing')}
      />
    )
  if (view === 'compareReport')
    return (
      <CompareReport
        usernameA={compareUsers.a}
        usernameB={compareUsers.b}
        dnaA={compareDna.a}
        dnaB={compareDna.b}
        onReset={() => { setView('landing') }}
        onNewCompare={goToCompareLanding}
      />
    )

  return <Hero onAnalyze={analyze} onCompare={goToCompareLanding} />
}

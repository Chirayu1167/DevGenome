module.exports = async function handler(req, res) {
  const { url } = req.query

  if (!url) {
    return res.status(400).json({ error: 'Missing url parameter' })
  }

  if (!url.startsWith('https://api.github.com/')) {
    return res.status(403).json({ error: 'Only GitHub API URLs are allowed' })
  }

  const headers = {
    Accept: 'application/vnd.github+json, application/vnd.github.mercy-preview+json',
  }

  if (process.env.GITHUB_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  try {
    const response = await fetch(url, { headers })

    if (!response.ok) {
      const text = await response.text()
      return res.status(response.status).json({ error: text })
    }

    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const data = await response.json()
      return res.status(200).json(data)
    } else {
      const text = await response.text()
      return res.status(200).send(text)
    }
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}

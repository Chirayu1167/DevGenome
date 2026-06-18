/**
 * Fetch public GitHub data for a username and compute aggregate stats.
 * All requests are proxied through /api/github to keep the token server-side.
 */

function proxyUrl(githubUrl) {
  return `/api/github?url=${encodeURIComponent(githubUrl)}`
}

const clamp = (n, lo = 0, hi = 1) => Math.max(lo, Math.min(hi, n))

const KEYWORD_GROUPS = {
  aiMl: [
    'machine learning', 'ml', 'tensorflow', 'pytorch', 'scikit-learn',
    'keras', 'deep learning', 'neural network', 'ai model', 'artificial intelligence',
  ],
  computerVision: [
    'computer vision', 'cv', 'image processing', 'object detection',
    'image classification', 'segmentation', 'opencv', 'vision',
  ],
  nlp: [
    'natural language', 'nlp', 'language model', 'text generation',
    'sentiment analysis', 'tokenization', 'transformer', 'chatbot',
  ],
  automation: [
    'automation', 'automated', 'bot', 'workflow', 'pipeline', 'cron',
    'scheduler', 'cli', 'integration', 'script', 'robot', 'automation',
  ],
  deployment: [
    'docker', 'kubernetes', 'dockerfile', 'helm', 'ecs', 'eks', 'gke',
    'azure', 'aws', 'gcp', 'serverless', 'terraform', 'ansible',
    'github actions', 'ci', 'cd', 'pipeline', 'deployment', 'docker compose',
  ],
  testing: [
    'test', 'jest', 'pytest', 'mocha', 'jasmine', 'cypress', 'coverage',
    'unit test', 'integration test', 'e2e', 'ci', 'github actions',
  ],
  collaboration: [
    'community', 'open source', 'contribute', 'collaborate', 'team',
    'maintainer', 'peer', 'sponsor', 'organization', 'working group',
  ],
  openSource: [
    'open source', 'oss', 'contributors', 'license', 'github actions',
    'issues', 'pull request', 'pullrequest', 'maintainer', 'community',
  ],
  framework: [
    'react', 'vue', 'angular', 'svelte', 'next.js', 'nextjs', 'nuxt',
    'gatsby', 'ember', 'rails', 'django', 'flask', 'spring', 'express',
    'nestjs', 'laravel', 'symfony', '.net', 'asp.net', 'fastapi', 'spring boot',
  ],
  backend: [
    'node', 'express', 'spring', 'django', 'flask', 'rails', 'asp.net',
    'fastapi', 'graphql', 'rest api', 'api server', 'backend', 'server',
  ],  robotics: [
    'robotics', 'robot', 'ros', 'arduino', 'raspberry pi', 'sensor',
    'lidar', 'mechatronics', 'autonomous', 'drone', 'motor', 'embedded',
    'controller', 'actuator', 'kinematics', 'vision',
  ],  realWorldImpact: [
    'app', 'service', 'platform', 'product', 'tool', 'automation', 'dashboard',
    'analytics', 'integration', 'pipeline', 'monitor', 'service', 'payment',
    'commerce', 'sdk', 'api', 'backend', 'mobile', 'serverless', 'saas',
  ],
}

const BACKEND_LANGUAGES = new Set([
  'Java', 'Python', 'Go', 'Ruby', 'PHP', 'C#', 'Kotlin', 'Rust', 'Scala',
  'C++', 'C', 'Elixir', 'Shell', 'Swift', 'Haskell', 'R',
])

function repoText(repo) {
  return [
    repo.name,
    repo.description,
    repo.homepage,
    repo.language,
    repo.topics?.join(' '),
  ]
    .filter(Boolean)
    .join(' ')
    .toLowerCase()
}

function repoHasKeyword(repo, keywords) {
  const text = repoText(repo)
  return keywords.some((keyword) => text.includes(keyword))
}

function ratioOfReposMatching(repos, keywords) {
  if (!repos.length) return 0
  const matched = repos.reduce(
    (sum, repo) => sum + (repoHasKeyword(repo, keywords) ? 1 : 0),
    0
  )
  return matched / repos.length
}

function languageComplexitySignal(languages, uniqueLanguageCount) {
  const complexityWeights = {
    Java: 1,
    C: 1,
    'C++': 1,
    Rust: 1,
    Go: 0.95,
    Python: 0.9,
    Scala: 0.95,
    Kotlin: 0.92,
    Swift: 0.9,
    'C#': 0.92,
    Ruby: 0.85,
    PHP: 0.75,
    JavaScript: 0.75,
    TypeScript: 0.82,
    Shell: 0.6,
    R: 0.8,
    Haskell: 1,
    Elixir: 0.95,
  }

  if (!languages.length) return clamp(uniqueLanguageCount / 6)

  const weighted = languages.reduce((sum, lang) => {
    const weight = complexityWeights[lang.name] ?? 0.78
    return sum + weight * lang.share
  }, 0)

  const diversity = Math.min(uniqueLanguageCount / 6, 1)
  return clamp(weighted * 0.7 + diversity * 0.3)
}

function average(values) {
  return values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : 0
}

function repoDocumentationScore(repo) {
  const descriptionScore = Math.min((repo.description?.length || 0) / 140, 1)
  const topicScore = Math.min((repo.topics?.length || 0) / 4, 1)
  const homepageScore = repo.homepage ? 0.25 : 0
  const pagesScore = repo.has_pages ? 0.15 : 0
  return clamp(
    0.45 * descriptionScore +
    0.35 * topicScore +
    0.2 * (homepageScore + pagesScore)
  )
}

function readmeQualityScore(readmeText) {
  const text = (readmeText || '').toLowerCase()
  const hasInstall = /#+\s*installation/.test(text) || /#+\s*getting started/.test(text)
  const hasUsage = /#+\s*usage/.test(text) || /#+\s*examples?/.test(text)
  const hasContributing = /#+\s*contributing/.test(text)
  const hasArchitecture = /#+\s*(architecture|design|system)/.test(text)
  const hasLicense = /#+\s*(license|licence)/.test(text)
  const hasBadges = /!\[.*\]\(.*\)/.test(readmeText)
  const hasCode = /```/.test(readmeText)

  const sectionScore = clamp(
    (Number(hasInstall) + Number(hasUsage) + Number(hasContributing) +
     Number(hasArchitecture) + Number(hasLicense)) / 5
  )
  const lengthScore = Math.min((readmeText?.length || 0) / 2500, 1)
  const codeScore = hasCode ? 0.15 : 0
  const badgeScore = hasBadges ? 0.1 : 0

  return clamp(
    0.4 * sectionScore +
    0.35 * lengthScore +
    0.15 * codeScore +
    0.1 * badgeScore
  )
}

async function ghFetchText(url) {
  const res = await fetch(proxyUrl(url))
  if (res.status === 404) throw new GitHubError('Resource not found', 'not_found')
  if (res.status === 403) throw new GitHubError('Rate limit exceeded', 'rate_limited')
  if (!res.ok) throw new GitHubError(`GitHub request failed (${res.status})`, 'unknown')
  return res.text()
}

async function fetchRepoReadme(owner, repo) {
  return ghFetchText(`https://api.github.com/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/readme`)
}

function repoComplexityScore(repo) {
  const sizeScore = clamp(repo.size / 400)
  const starScore = clamp(Math.log10(1 + (repo.stargazers_count || 0)) / 2.2)
  const forkScore = clamp(Math.log10(1 + (repo.forks_count || 0)) / 2.2)
  const backend = repoHasKeyword(repo, KEYWORD_GROUPS.backend) || BACKEND_LANGUAGES.has(repo.language)
  return clamp(0.15 * sizeScore + 0.35 * starScore + 0.25 * forkScore + 0.25 * (backend ? 1 : 0))
}

function repoIsRecent(repo) {
  return repo.pushed_at ? monthsSince(repo.pushed_at) <= 12 : false
}

function repoOriginalityScore(repos, uniqueLanguageCount) {
  const descriptionSignals = average(
    repos.map((repo) => Math.min((repo.description?.length || 0) / 120, 1))
  )
  const topicSignals = average(repos.map((repo) => Math.min((repo.topics?.length || 0) / 4, 1)))
  const languageDiversity = clamp(uniqueLanguageCount / 6)
  const impactSignals = average(
    repos.map((repo) => repoHasKeyword(repo, KEYWORD_GROUPS.realWorldImpact) ? 1 : 0)
  )
  return clamp(0.3 * descriptionSignals + 0.3 * topicSignals + 0.2 * languageDiversity + 0.2 * impactSignals)
}

function fetchRecentEvents(username) {
  return ghFetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=100`
  )
}

function eventContributionScore(events) {
  if (!events || !events.length) return 0
  const contributions = events.reduce((score, event) => {
    if (event.type === 'PullRequestEvent') return score + 1
    if (event.type === 'PullRequestReviewEvent') return score + 0.8
    if (event.type === 'IssuesEvent') return score + 0.4
    if (event.type === 'IssueCommentEvent') return score + 0.15
    return score
  }, 0)
  return clamp(Math.min(contributions / 20, 1))
}

function prEventCount(events) {
  return events.filter((event) => event.type === 'PullRequestEvent').length
}

function openSourceRepoRatio(repos) {
  if (!repos.length) return 0
  const openSourceRepos = repos.reduce((count, repo) => {
    const hasLicense = !!repo.license?.name
    const hasOpenSourceTopic = repoHasKeyword(repo, KEYWORD_GROUPS.openSource)
    return count + (hasLicense || hasOpenSourceTopic || repo.forks_count > 0 ? 1 : 0)
  }, 0)
  return openSourceRepos / repos.length
}

function htmlOnlyRatio(repos) {
  if (!repos.length) return 0
  const htmlOnly = repos.filter((repo) => repo.language === 'HTML' && !repoHasKeyword(repo, KEYWORD_GROUPS.backend)).length
  return htmlOnly.length / repos.length
}

function monthsSince(dateString) {
  const then = new Date(dateString)
  const now = new Date()
  let months = (now.getFullYear() - then.getFullYear()) * 12
  months += now.getMonth() - then.getMonth()
  if (now.getDate() < then.getDate()) months -= 1
  return Math.max(0, months)
}

class GitHubError extends Error {
  constructor(message, code) {
    super(message)
    this.code = code // 'not_found' | 'rate_limited' | 'network' | 'unknown'
  }
}

async function ghFetch(url) {
  const res = await fetch(proxyUrl(url))
  if (res.status === 404) throw new GitHubError('Profile not found', 'not_found')
  if (res.status === 403) throw new GitHubError('Rate limit exceeded', 'rate_limited')
  if (!res.ok) throw new GitHubError(`GitHub request failed (${res.status})`, 'unknown')
  return res.json()
}

function accountAge(createdAt) {
  const created = new Date(createdAt)
  const now = new Date()
  let years = now.getFullYear() - created.getFullYear()
  let months = now.getMonth() - created.getMonth()
  if (now.getDate() < created.getDate()) months -= 1
  if (months < 0) { years -= 1; months += 12 }
  return { years, months, totalMonths: years * 12 + months }
}

function topNByStars(repos, n) {
  return [...repos]
    .filter((r) => !r.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, n)
}

function pickTopLanguages(languageMap, n) {
  const total = Object.values(languageMap).reduce((s, v) => s + v, 0) || 1
  return Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([name, bytes]) => ({
      name,
      bytes,
      share: +(bytes / total).toFixed(4),
      pct: Math.round((bytes / total) * 100),
    }))
}

// ============ NEW SIGNAL EXTRACTION FOR GAME METRICS ============

function commitVarianceScore(events) {
  // Extract commit activity patterns from recent events
  if (!events || events.length < 10) return 0.5 // Default for low activity
  
  const pushEvents = events.filter(e => e.type === 'PushEvent')
  if (pushEvents.length === 0) return 0.5
  
  // Calculate commits across the 100 events
  const commitCounts = pushEvents.map(e => e.payload?.size || 0)
  const avgCommits = commitCounts.reduce((a, b) => a + b, 0) / commitCounts.length
  const variance = commitCounts.reduce((sum, count) => sum + Math.pow(count - avgCommits, 2), 0) / commitCounts.length
  const stdDev = Math.sqrt(variance)
  
  // Higher variance = more chaotic = higher chaos energy
  // Normalize to 0-1 range (typical stdDev is 0-5)
  return clamp(stdDev / 5)
}

function refactorCommitRatio(repos) {
  // Estimate refactor commits by analyzing repo default branches and commit history signals
  // Since we can't access commit messages directly, we estimate based on repo patterns:
  // - Higher commit frequency relative to repo size suggests more refactoring
  // - Well-documented projects often have refactoring commits
  
  if (repos.length === 0) return 0.3
  
  const recentRepos = repos.filter(r => !r.fork && repoIsRecent(r))
  if (recentRepos.length === 0) return 0.2
  
  // Estimate: repos with good docs + active commits likely have refactors
  const estimatedRefactorRatio = average(
    recentRepos.map(r => {
      const hasGoodDocs = repoDocumentationScore(r) > 0.6
      const isActive = monthsSince(r.pushed_at) < 6
      return (hasGoodDocs && isActive) ? 0.4 : 0.15
    })
  )
  
  return clamp(estimatedRefactorRatio)
}

function completedProjectRatio(repos) {
  // Estimate completion ratio by checking for:
  // - Projects with good documentation (indicates completion)
  // - Non-fork projects that have been maintained
  // - Projects with recent updates (active maintenance)
  
  if (repos.length === 0) return 0.5
  
  const ownRepos = repos.filter(r => !r.fork)
  const completed = ownRepos.filter(r => {
    const hasGoodDocs = repoDocumentationScore(r) > 0.5
    const isActive = monthsSince(r.pushed_at) < 12
    const hasStars = (r.stargazers_count || 0) > 0
    return hasGoodDocs || (isActive && hasStars)
  }).length
  
  return clamp(completed / Math.max(ownRepos.length, 1))
}

function projectDiversityScore(repos, languages) {
  // Measure diversity across:
  // - Multiple languages
  // - Different project domains (AI/ML, DevOps, etc.)
  // - Multiple frameworks
  
  if (repos.length === 0) return 0
  
  const ownRepos = repos.filter(r => !r.fork)
  const languageDiversity = clamp(languages.length / 6) // Max 6 languages
  
  // Domain diversity - check for keyword group coverage
  const domainCoverage = {
    hasAiMl: ownRepos.some(r => repoHasKeyword(r, KEYWORD_GROUPS.aiMl)),
    hasBackend: ownRepos.some(r => repoHasKeyword(r, KEYWORD_GROUPS.backend)),
    hasFrontend: ownRepos.some(r => repoHasKeyword(r, KEYWORD_GROUPS.framework)),
    hasDevOps: ownRepos.some(r => repoHasKeyword(r, KEYWORD_GROUPS.deployment)),
    hasRobotics: ownRepos.some(r => repoHasKeyword(r, KEYWORD_GROUPS.robotics)),
  }
  
  const domainsRepresented = Object.values(domainCoverage).filter(Boolean).length
  const domainDiversity = domainsRepresented / 5
  
  return clamp(0.6 * languageDiversity + 0.4 * domainDiversity)
}

function communityEngagementScore(events) {
  // Measure engagement with other people's code:
  // - Pull requests (high engagement)
  // - Issue comments (medium engagement)
  // - Review comments (high engagement)
  
  if (!events || events.length === 0) return 0
  
  let engagement = 0
  for (const event of events) {
    if (event.type === 'PullRequestEvent') engagement += 1
    if (event.type === 'PullRequestReviewEvent') engagement += 0.8
    if (event.type === 'IssueCommentEvent') engagement += 0.5
    if (event.type === 'IssuesEvent') engagement += 0.3
  }
  
  // Normalize to 0-1 (rough scale: 30+ engagements = max)
  return clamp(engagement / 30)
}

function totalCommitsEstimate(events) {
  // Estimate total commits from recent events
  if (!events || events.length === 0) return 0
  
  const pushEvents = events.filter(e => e.type === 'PushEvent')
  const totalInThisWindow = pushEvents.reduce((sum, e) => sum + (e.payload?.size || 0), 0)
  
  // 100 events is ~2 weeks of activity (rough GitHub public event window)
  // Extrapolate to 90 days (roughly 6 weeks)
  const weeks = 2
  const estimatedWeeks = 6
  const weeklyCadence = totalInThisWindow / Math.max(weeks, 1)
  
  return Math.round(weeklyCadence * estimatedWeeks)
}

function weekendCommitRatio(events) {
  // Analyze whether commits happen on weekends vs weekdays
  if (!events || events.length === 0) return 0.5
  
  const pushEvents = events.filter(e => e.type === 'PushEvent')
  if (pushEvents.length === 0) return 0.5
  
  let weekendCommits = 0
  let totalCommits = 0
  
  for (const event of pushEvents) {
    const date = new Date(event.created_at)
    const dayOfWeek = date.getDay()
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
    
    const commitCount = event.payload?.size || 0
    totalCommits += commitCount
    if (isWeekend) weekendCommits += commitCount
  }
  
  return totalCommits > 0 ? weekendCommits / totalCommits : 0.5
}

function nightCommitRatio(events) {
  // Analyze whether commits happen at night (10 PM - 6 AM)
  if (!events || events.length === 0) return 0.5
  
  const pushEvents = events.filter(e => e.type === 'PushEvent')
  if (pushEvents.length === 0) return 0.5
  
  let nightCommits = 0
  let totalCommits = 0
  
  for (const event of pushEvents) {
    const date = new Date(event.created_at)
    const hour = date.getHours()
    const isNight = hour >= 22 || hour < 6 // 10 PM to 6 AM
    
    const commitCount = event.payload?.size || 0
    totalCommits += commitCount
    if (isNight) nightCommits += commitCount
  }
  
  return totalCommits > 0 ? nightCommits / totalCommits : 0.3
}

function errorHandlingScore(repos) {
  // Estimate error handling quality based on:
  // - Testing coverage (projects with tests likely handle errors)
  // - Error handling keywords in repos
  // - Documentation completeness
  
  if (repos.length === 0) return 0.5
  
  const ownRepos = repos.filter(r => !r.fork)
  const withTests = ownRepos.filter(r => repoHasKeyword(r, KEYWORD_GROUPS.testing)).length
  const testCoverage = withTests / Math.max(ownRepos.length, 1)
  
  const withErrorHandling = ownRepos.filter(r => {
    const text = repoText(r).toLowerCase()
    return text.includes('error') || text.includes('exception') || text.includes('try catch')
  }).length
  const errorCoverage = withErrorHandling / Math.max(ownRepos.length, 1)
  
  return clamp(0.6 * testCoverage + 0.4 * errorCoverage)
}

export async function fetchGitHubData(username) {
  const u = username.trim()
  if (!u) throw new GitHubError('Username required', 'unknown')

  // 1. Profile
  const profile = await ghFetch(`https://api.github.com/users/${encodeURIComponent(u)}`)

  // 2. All public repos, most-recently-updated first
  const repos = await ghFetch(
    `https://api.github.com/users/${encodeURIComponent(u)}/repos?per_page=100&sort=updated`
  )

  // 3. Aggregate stats
  const totalStars    = repos.reduce((s, r) => s + (r.stargazers_count || 0), 0)
  const totalForks    = repos.reduce((s, r) => s + (r.forks_count || 0), 0)
  const totalWatchers = repos.reduce((s, r) => s + (r.watchers_count || 0), 0)

  // 4. Languages across the top-10 most-starred non-fork repos.
  //    Each repo's `languages_url` returns bytes per language.
  const top = topNByStars(repos, 10)
  const langResults = await Promise.allSettled(
    top.map((r) => ghFetch(r.languages_url))
  )

  const languageMap = {}
  for (const r of langResults) {
    if (r.status !== 'fulfilled') continue
    for (const [lang, bytes] of Object.entries(r.value)) {
      languageMap[lang] = (languageMap[lang] || 0) + (bytes || 0)
    }
  }

  const languages = pickTopLanguages(languageMap, 6)

  // Raw repo sizes for Technical Depth scoring (own repos only — forks inflate size unfairly).
  const ownRepos = repos.filter((r) => !r.fork)
  const repoSizesKb = ownRepos.map((r) => r.size || 0) // GitHub returns KB
  const avgRepoSizeKb = repoSizesKb.length
    ? repoSizesKb.reduce((s, v) => s + v, 0) / repoSizesKb.length
    : 0
  const uniqueLanguages = new Set()
  for (const r of ownRepos) if (r.language) uniqueLanguages.add(r.language)

  const frameworkCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.framework)
  const backendCoverage = clamp(
    Math.max(
      ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.backend),
      ownRepos.filter((r) => BACKEND_LANGUAGES.has(r.language)).length / Math.max(ownRepos.length, 1)
    )
  )
  const deploymentCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.deployment)
  const testingCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.testing)
  const aiMlCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.aiMl)
  const computerVisionCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.computerVision)
  const roboticsCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.robotics)
  const nlpCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.nlp)
  const automationCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.automation)
  const collaborationCoverage = ratioOfReposMatching(ownRepos, KEYWORD_GROUPS.collaboration)
  const openSourceRatio = openSourceRepoRatio(ownRepos)
  const htmlOnlyRatioValue = htmlOnlyRatio(ownRepos)
  const realWorldImpactScore = clamp(
    average(ownRepos.map((repo) => repoHasKeyword(repo, KEYWORD_GROUPS.realWorldImpact) ? 1 : 0))
  )
  const documentationScore = clamp(average(ownRepos.map(repoDocumentationScore)))
  const averageComplexity = clamp(average(ownRepos.map(repoComplexityScore)))
  const recentActivityCoverage = ownRepos.length
    ? ownRepos.filter(repoIsRecent).length / ownRepos.length
    : 0

  const readmeRepos = topNByStars(ownRepos, 6)
  const readmeResults = await Promise.allSettled(
    readmeRepos.map((repo) => fetchRepoReadme(repo.owner?.login || profile.login, repo.name))
  )
  const readmeScores = readmeResults
    .filter((r) => r.status === 'fulfilled')
    .map((r) => readmeQualityScore(r.value))
  const readmeQuality = readmeScores.length ? average(readmeScores) : 0

  const recentEvents = await fetchRecentEvents(u)
  const contributionScore = eventContributionScore(recentEvents)
  const pullRequestScore = prEventCount(recentEvents)
  const openSourceContributionScore = clamp(openSourceRatio * 0.6 + contributionScore * 0.4)
  const originalityScore = repoOriginalityScore(ownRepos, uniqueLanguages.size)

  // NEW: Game metrics signals
  const commitVariance = commitVarianceScore(recentEvents)
  const refactorRatio = refactorCommitRatio(ownRepos)
  const completedRatio = completedProjectRatio(ownRepos)
  const diversity = projectDiversityScore(ownRepos, languages)
  const communityEngagement = communityEngagementScore(recentEvents)
  const totalCommits = totalCommitsEstimate(recentEvents)
  const weekendRatio = weekendCommitRatio(recentEvents)
  const nightRatio = nightCommitRatio(recentEvents)
  const errorHandling = errorHandlingScore(ownRepos)

  return {
    profile: {
      login: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      location: profile.location,
      company: profile.company,
      blog: profile.blog,
      htmlUrl: profile.html_url,
      createdAt: profile.created_at,
      accountAge: accountAge(profile.created_at),
    },
    stats: {
      publicRepos: profile.public_repos,
      followers: profile.followers,
      following: profile.following,
      totalStars,
      totalForks,
      totalWatchers,
    },
    languages,
    reposAnalyzed: repos.length,
    reposSampledForLanguages: top.length,
    scoring: {
      totalRepos: ownRepos.length,
      avgRepoSizeKb,
      uniqueLanguageCount: uniqueLanguages.size,
      averageComplexity,
      languageComplexitySignal: languageComplexitySignal(languages, uniqueLanguages.size),
      frameworkCoverage,
      backendCoverage,
      deploymentCoverage,
      testingCoverage,
      aiMlCoverage,
      computerVisionCoverage,
      roboticsCoverage,
      nlpCoverage,
      automationCoverage,
      collaborationCoverage,
      openSourceRatio,
      openSourceContributionScore,
      pullRequestScore,
      htmlOnlyRatio: htmlOnlyRatioValue,
      realWorldImpactScore,
      documentationScore,
      readmeQuality,
      recentActivityCoverage,
      originalityScore,
      // NEW: Game metrics signals
      commitVariance,
      refactorCommitRatio: refactorRatio,
      completedProjectRatio: completedRatio,
      projectDiversityScore: diversity,
      communityEngagementScore: communityEngagement,
      totalCommits,
      weekendCommitRatio: weekendRatio,
      nightCommitRatio: nightRatio,
      errorHandlingScore: errorHandling,
    },
  }
}

export { GitHubError }

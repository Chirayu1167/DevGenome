/**
 * Game Scoring Metrics - Replace boring metrics with fun, entertaining stats
 * These metrics power the entire game feel of the analyzer
 *
 * v2: Quality-first scoring. Stars/forks/followers are weak signals.
 *     Technical depth, docs, deployment, recency, and domain complexity lead.
 */

/**
 * Detect "Signature Projects" — technically interesting repos that deserve
 * recognition independent of popularity. Additive bonus, not a gate.
 * Returns a 0-1 bonus score based on how many qualifying projects exist.
 */
function signatureProjectBonus(scoring) {
  // A signature project is one that hits ≥2 of these quality signals:
  //   - belongs to a technical domain (AI/ML, CV, NLP, robotics, automation, security, systems)
  //   - has documentation
  //   - has deployment signals
  //   - is recently active
  //   - has meaningful complexity (size)
  const domainScore =
    (scoring.aiMlCoverage || 0) +
    (scoring.computerVisionCoverage || 0) +
    (scoring.nlpCoverage || 0) +
    (scoring.roboticsCoverage || 0) +
    (scoring.automationCoverage || 0)

  const qualitySignals = [
    domainScore > 0.15,                            // has at least some domain work
    (scoring.documentationScore || 0) > 0.3,       // documented
    (scoring.deploymentCoverage || 0) > 0.15,      // deployed something
    (scoring.recentActivityCoverage || 0) > 0.3,   // recently active
    (scoring.averageComplexity || 0) > 0.2,        // non-trivial size
    (scoring.testingCoverage || 0) > 0.15,         // tested
    (scoring.originalityScore || 0) > 0.3,         // original work
  ]

  const hits = qualitySignals.filter(Boolean).length
  // 2+ hits = partial bonus, 4+ hits = full bonus
  return clamp(Math.max(0, hits - 1) / 4)
}

/**
 * Calculate Shipping Power (0-100)
 * Measures ability to get code into production
 * Quality of what's shipped matters more than raw count
 */
export function calculateShippingPower(scoring, profile) {
  const recentActivityScore = scoring.recentActivityCoverage || 0
  const deploymentScore = scoring.deploymentCoverage || 0
  const docsScore = scoring.documentationScore || 0
  const repoCount = Math.min((scoring.totalRepos || 0) / 20, 1)
  const originalityBonus = (scoring.originalityScore || 0)

  // Deployment + recency + docs weighted heavier than pure repo count
  return clamp(
    0.20 * repoCount * 100 +
    0.30 * recentActivityScore * 100 +
    0.25 * deploymentScore * 100 +
    0.15 * docsScore * 100 +
    0.10 * originalityBonus * 100
  )
}

/**
 * Calculate Chaos Energy (0-100)
 * Measures unpredictability and instability
 * High = inconsistent commits, jumps between languages
 */
export function calculateChaosEnergy(scoring, languages, commitPatterns) {
  const commitVariance = commitPatterns?.variance || 0
  const languageCount = Math.min((languages?.length || 0) / 6, 1)
  const abandonmentRate = (scoring.projectAbandonmentRate || 0) * 100

  return clamp(
    0.40 * commitVariance * 100 +
      0.30 * languageCount * 100 +
      0.20 * abandonmentRate +
      0.10 * (1 - (scoring.commitConsistency || 0)) * 100
  )
}

/**
 * Calculate Innovation Spark (0-100)
 * Measures cutting-edge, experimental, and domain-specific work.
 * All technical domains (AI/ML, CV, NLP, robotics, automation, security, systems) count equally.
 * Originality and recent activity boost the score; stars do not.
 */
export function calculateInnovationSpark(scoring) {
  const aiMlScore      = (scoring.aiMlCoverage || 0) * 100
  const cvScore        = (scoring.computerVisionCoverage || 0) * 100
  const nlpScore       = (scoring.nlpCoverage || 0) * 100
  const roboticsScore  = (scoring.roboticsCoverage || 0) * 100
  const autoScore      = (scoring.automationCoverage || 0) * 100
  const originalityScore = (scoring.originalityScore || 0) * 100
  const readmeScore    = (scoring.readmeQuality || 0) * 100
  const recencyBonus   = (scoring.recentActivityCoverage || 0) * 100

  // Domain breadth — spread across many technical areas is itself innovative
  const domainBreadth = Math.min(
    (aiMlScore > 10 ? 1 : 0) + (cvScore > 10 ? 1 : 0) + (nlpScore > 10 ? 1 : 0) +
    (roboticsScore > 10 ? 1 : 0) + (autoScore > 10 ? 1 : 0),
    5
  ) / 5 * 100

  // Peak domain contribution (best single domain)
  const peakDomain = Math.max(aiMlScore, cvScore, nlpScore, roboticsScore, autoScore)

  return clamp(
    0.30 * peakDomain +
    0.15 * domainBreadth +
    0.20 * originalityScore +
    0.15 * recencyBonus +
    0.10 * readmeScore +
    0.10 * (scoring.deploymentCoverage || 0) * 100
  )
}

/**
 * Calculate Documentation Aura (0-100)
 * Measures communication through docs
 * High = great READMEs, inline documentation
 */
export function calculateDocumentationAura(scoring) {
  const readmeScore   = (scoring.readmeQuality || 0) * 100
  const docsScore     = (scoring.documentationScore || 0) * 100
  const commentScore  = Math.min((scoring.codeCommentDensity || 0) * 100, 100)
  const guideScore    = (scoring.issueTemplateQuality || 0) * 100

  return clamp(
    0.40 * readmeScore +
      0.30 * docsScore +
      0.20 * commentScore +
      0.10 * guideScore
  )
}

/**
 * Calculate Open Source Karma (0-100)
 * Measures community contribution and collaboration.
 * PRs and contribution activity > raw forks (forks are not in your control).
 */
export function calculateOpenSourceKarma(scoring, stats) {
  const contributionScore = (scoring.openSourceContributionScore || 0) * 100
  const prScore           = Math.min((scoring.pullRequestScore || 0) * 10, 100)
  const openSourceRatio   = (scoring.openSourceRatio || 0) * 100
  // Forks are a weak signal — cap contribution at 10 pts and weight lightly
  const forksBonus        = Math.min(Math.log10(1 + (stats.totalForks || 0)) / 2 * 100, 100)

  return clamp(
    0.45 * contributionScore +
      0.35 * prScore +
      0.15 * openSourceRatio +
      0.05 * forksBonus
  )
}

/**
 * Calculate Technical Wizardry (0-100)
 * Measures low-level, infrastructure knowledge.
 * Language complexity, backend depth, testing, and CI/CD are primary signals.
 */
export function calculateTechnicalWizardry(scoring) {
  const backendScore     = (scoring.backendCoverage || 0) * 100
  const testingScore     = (scoring.testingCoverage || 0) * 100
  const deploymentScore  = (scoring.deploymentCoverage || 0) * 100
  const complexityScore  = (scoring.averageComplexity || 0) * 100
  const langComplexity   = (scoring.languageComplexitySignal || 0) * 100
  const signatureBonus   = signatureProjectBonus(scoring) * 100

  return clamp(
    0.25 * backendScore +
    0.20 * testingScore +
    0.20 * deploymentScore +
    0.15 * langComplexity +
    0.10 * complexityScore +
    0.10 * signatureBonus
  )
}

/**
 * Calculate Main Character Energy (0-100)
 * Measures presence, impact, visibility.
 * Consistency and output matter as much as follower counts.
 */
export function calculateMainCharacterEnergy(stats, scoring) {
  // Stars and followers — log scale to prevent outsized influence
  const followerScore = Math.min(Math.log10(1 + (stats.followers || 0)) / 3 * 100, 100)
  const starScore     = Math.min(Math.log10(1 + (stats.totalStars || 0)) / 3.5 * 100, 100)
  const repoCount     = Math.min((stats.publicRepos || 0) / 20, 1) * 100
  const consistency   = (scoring.commitConsistency || 0.5) * 100
  const accountBonus  = Math.min((scoring.accountAgeTotalMonths || 12) / 60, 1) * 100
  const docBonus      = (scoring.documentationScore || 0) * 100

  return clamp(
    0.20 * followerScore +
    0.15 * starScore +
    0.20 * repoCount +
    0.20 * consistency +
    0.15 * docBonus +
    0.10 * accountBonus
  )
}

/**
 * Calculate Build Stability (0-100)
 * Measures reliability and quality
 * High = good tests, error handling, CI/CD
 */
export function calculateBuildStability(scoring) {
  const testingScore           = (scoring.testingCoverage || 0) * 100
  const errorScore             = (scoring.errorHandlingScore || 0) * 100
  const cicdScore              = (scoring.cicdSignal || 0) * 100
  const issueResolutionScore   = Math.min(100 - (scoring.openIssueCount || 0) / 10, 100)

  return clamp(
    0.40 * testingScore +
      0.30 * errorScore +
      0.20 * cicdScore +
      0.10 * issueResolutionScore
  )
}

/**
 * Calculate Side Quest Completion (0-100)
 * Measures ability to finish projects.
 * Recent activity = still going; docs + deployment = actually shipped.
 */
export function calculateSideQuestCompletion(scoring, stats) {
  const completionRatio   = (scoring.completedProjectRatio || 0) * 100
  const maintenanceScore  = (scoring.maintenanceScore || 0) * 100
  const relevanceScore    = (scoring.projectRelevance || 0) * 100
  const deployBonus       = (scoring.deploymentCoverage || 0) * 100
  const recentBonus       = (scoring.recentActivityCoverage || 0) * 100
  const sideProjectSuccess = Math.min(
    ((stats.publicRepos - 5) / Math.max(stats.publicRepos, 1)) * 100,
    100
  )

  return clamp(
    0.25 * completionRatio +
    0.20 * maintenanceScore +
    0.15 * relevanceScore +
    0.20 * deployBonus +
    0.10 * recentBonus +
    0.10 * sideProjectSuccess
  )
}

/**
 * Calculate Debugging Resistance (0-100)
 * How much chaos is in codebase
 * High = few issues, quick fixes
 */
export function calculateDebuggingResistance(scoring) {
  const issueScore       = Math.max(0, 100 - (scoring.openIssueCount || 0) * 5)
  const errorScore       = Math.max(0, 100 - (scoring.errorFrequency || 0) * 10)
  const fixLatencyScore  = Math.max(0, 100 - (scoring.bugFixLatency || 0) * 2)

  return clamp((issueScore + errorScore + fixLatencyScore) / 3)
}

/**
 * Calculate all metrics at once
 */
export function calculateAllMetrics(dna) {
  const { profile, stats, scoring, languages } = dna

  const commitPatterns = extractCommitPatterns(dna)

  return {
    shippingPower:       calculateShippingPower(scoring, profile),
    chaosEnergy:         calculateChaosEnergy(scoring, languages, commitPatterns),
    innovationSpark:     calculateInnovationSpark(scoring),
    documentationAura:   calculateDocumentationAura(scoring),
    openSourceKarma:     calculateOpenSourceKarma(scoring, stats),
    technicalWizardry:   calculateTechnicalWizardry(scoring),
    mainCharacterEnergy: calculateMainCharacterEnergy(stats, scoring),
    buildStability:      calculateBuildStability(scoring),
    sideQuestCompletion: calculateSideQuestCompletion(scoring, stats),
    debuggingResistance: calculateDebuggingResistance(scoring),
  }
}

/**
 * Calculate overall score (average of all metrics)
 */
export function calculateOverallScore(metrics) {
  if (!metrics) return 0
  const values = Object.values(metrics).filter((v) => typeof v === 'number')
  return Math.round(values.reduce((a, b) => a + b, 0) / values.length)
}

/**
 * Helper: extract commit patterns from dna
 */
function extractCommitPatterns(dna) {
  return {
    variance:  0.5,
    frequency: 0.6,
  }
}

/**
 * Helper: clamp value between 0 and 100
 */
function clamp(value, min = 0, max = 100) {
  return Math.max(min, Math.min(max, value))
}

/**
 * Get descriptive text for a metric score
 */
export function getMetricDescription(metric, score) {
  const descriptions = {
    shippingPower: {
      high: '🚀 You ship code like it\'s going out of style.',
      mid:  '📦 You get things done, eventually.',
      low:  '🐌 Your code is still warming up in development.',
    },
    chaosEnergy: {
      high: '⚡ Your development workflow is beautiful chaos.',
      mid:  '⚙️ You\'re methodical, mostly.',
      low:  '☯️ Your code flows like water.',
    },
    innovationSpark: {
      high: '🔬 You\'re pushing the boundaries of what\'s possible.',
      mid:  '🔨 You build solid, practical solutions.',
      low:  '🎯 You prefer the proven path.',
    },
    documentationAura: {
      high: '📚 Your documentation could be published.',
      mid:  '📝 You document what matters.',
      low:  '🤐 Code speaks for itself, right?',
    },
    openSourceKarma: {
      high: '🌍 Open source community knows your name.',
      mid:  '🤝 You contribute when you can.',
      low:  '🏝️ You prefer solitude.',
    },
    technicalWizardry: {
      high: '🧙 You can optimize anything.',
      mid:  '⚙️ You know your way around infrastructure.',
      low:  '🎨 You prefer user-facing code.',
    },
    mainCharacterEnergy: {
      high: '⭐ You\'re basically GitHub famous.',
      mid:  '👤 You have your audience.',
      low:  '🤐 Hidden gem status.',
    },
    buildStability: {
      high: '✅ Your code doesn\'t crash.',
      mid:  '🟡 Most features work as intended.',
      low:  '🔥 Move fast and break things.',
    },
    sideQuestCompletion: {
      high: '🏆 You finish what you start.',
      mid:  '📋 Some projects reach completion.',
      low:  '🎮 You\'re a professional project collector.',
    },
    debuggingResistance: {
      high: '🛡️ Your code is bulletproof.',
      mid:  '🔧 Bugs happen, you fix them.',
      low:  '🐛 Bugs are a lifestyle.',
    },
  }

  const desc = descriptions[metric]
  if (!desc) return ''

  if (score >= 75) return desc.high
  if (score >= 40) return desc.mid
  return desc.low
}

/**
 * Calculate metric tiers for display
 */
export function getMetricTier(score) {
  if (score >= 90) return 'Legendary'
  if (score >= 75) return 'Epic'
  if (score >= 60) return 'Rare'
  if (score >= 45) return 'Uncommon'
  if (score >= 30) return 'Common'
  return 'Weak'
}

/**
 * Get color for metric tier
 */
export function getMetricColor(score) {
  if (score >= 90) return '#FF6B9D'
  if (score >= 75) return '#FF006E'
  if (score >= 60) return '#FB5607'
  if (score >= 45) return '#FFBE0B'
  if (score >= 30) return '#8338EC'
  return '#777777'
}

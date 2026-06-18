/**
 * Game Scoring Metrics - Replace boring metrics with fun, entertaining stats
 * These metrics power the entire game feel of the analyzer.
 *
 * v2 philosophy: don't reward raw repo count, raw followers, raw stars,
 * raw language count, or file size. Reward the *qualitative* signals
 * that actually feel like real work: signature projects, sophisticated
 * tooling, weighted originality, healthy release cadence, cross-domain
 * exploration, and steady coding rhythm. The names, descriptions, tiers,
 * and color bands are all unchanged — only the formulas are smarter.
 */

const clamp = (value, min = 0, max = 100) => Math.max(min, Math.min(max, value))

/* Saturation: smooth, asymptotic, hits ~0.95 at x=1, ~0.99 at x=2.
   We use this so "twice as good" doesn't double the score. */
const saturate = (x) => 1 - Math.exp(-Math.max(0, x))

/* log-saturate: softer curve for unbounded things (counts). */
const logSaturate = (x, denom) => clamp(Math.log10(1 + Math.max(0, x)) / Math.log10(1 + denom), 0, 1)

const safe = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback)

/* Pull a signal with a default. */
const sig = (dna, key, fallback = 0) => safe(dna?.scoring?.[key], fallback)

/**
 * Calculate Shipping Power (0-100)
 * Measures ability to get code into production.
 * v2: combines signature project count, signature ratio, release health,
 * recent activity, and real-world signal — not raw repo count.
 */
export function calculateShippingPower(dna) {
  const scoring = dna?.scoring || {}
  const sigCount  = safe(scoring.signatureProjectCount, 0)
  const sigRatio  = safe(scoring.signatureProjectRatio, 0)
  const relHealth = safe(scoring.releaseHealthSignal, 0)
  const recent    = safe(scoring.recentActivityCoverage, 0)
  const realWorld = safe(scoring.realWorldSignal, 0)
  const abandon   = safe(scoring.projectAbandonmentRate, 0)

  const raw =
    0.30 * logSaturate(sigCount, 8) +
    0.25 * sigRatio +
    0.20 * relHealth +
    0.15 * recent +
    0.10 * realWorld -
    0.20 * Math.max(0, abandon - 0.5)
  return clamp(saturate(raw) * 100)
}

/**
 * Calculate Chaos Energy (0-100)
 * Measures unpredictability and instability.
 * v2: emphasizes commit burstiness, abandonment, language-domain
 * hopping, and inverse commit consistency. Still chaotic, but with
 * real signal.
 */
export function calculateChaosEnergy(dna) {
  const scoring = dna?.scoring || {}
  const burst      = safe(scoring.commitBurstiness, 0)
  const abandon    = safe(scoring.projectAbandonmentRate, 0)
  const breadth    = safe(scoring.projectDomainBreadth, 0)
  const consistency= safe(scoring.commitConsistency, 0)
  const night      = safe(scoring.nightCommitRatio, 0.3)
  const weekend    = safe(scoring.weekendCommitRatio, 0.5)
  const variance   = safe(scoring.commitVariance, 0)

  const raw =
    0.30 * burst +              // commits concentrated in single days
    0.20 * (1 - consistency) +  // inconsistent rhythm
    0.15 * abandon +            // many stale projects
    0.15 * breadth +            // hopping across many domains
    0.10 * variance +           // commit-count variance
    0.05 * night +              // late-night coding energy
    0.05 * Math.abs(weekend - 0.5) * 2  // either pure weekend or anti-weekend is "chaotic"
  return clamp(saturate(raw * 1.2) * 100)
}

/**
 * Calculate Innovation Spark (0-100)
 * Measures cutting-edge, experimental work.
 * v2: weighted originality + creative project ratio + domain breadth +
 * AI/ML/CV/robotics/NLP/automation coverage, with framework coverage
 * as a small bonus for using modern stacks.
 */
export function calculateInnovationSpark(dna) {
  const scoring = dna?.scoring || {}
  const weightedOrig = safe(scoring.weightedOriginality, 0)
  const creative     = safe(scoring.creativeProjectRatio, 0)
  const breadth      = safe(scoring.projectDomainBreadth, 0)
  const aiMl         = safe(scoring.aiMlCoverage, 0)
  const cv           = safe(scoring.computerVisionCoverage, 0)
  const robotics     = safe(scoring.roboticsCoverage, 0)
  const nlp          = safe(scoring.nlpCoverage, 0)
  const automation   = safe(scoring.automationCoverage, 0)
  const orig         = safe(scoring.originalityScore, 0)
  const framework    = safe(scoring.frameworkCoverage, 0)

  const raw =
    0.30 * weightedOrig +
    0.20 * creative +
    0.15 * breadth +
    0.10 * orig +
    0.08 * aiMl +
    0.05 * robotics +
    0.05 * cv +
    0.04 * nlp +
    0.04 * automation +
    0.05 * framework
  return clamp(saturate(raw * 1.1) * 100)
}

/**
 * Calculate Documentation Aura (0-100)
 * Measures communication through docs.
 * v2: description depth (top repos), documentation score, substantive
 * repo ratio (real projects have descriptions + topics + license/recency),
 * and readme quality (legacy signal).
 */
export function calculateDocumentationAura(dna) {
  const scoring = dna?.scoring || {}
  const descDepth    = safe(scoring.descriptionDepthScore, 0)
  const docs         = safe(scoring.documentationScore, 0)
  const substantive  = safe(scoring.substantiveRepoRatio, 0)
  const sigRatio     = safe(scoring.signatureProjectRatio, 0)
  const readme       = safe(scoring.readmeQuality, 0)

  const raw =
    0.30 * descDepth +
    0.25 * docs +
    0.20 * substantive +
    0.15 * sigRatio +
    0.10 * readme
  return clamp(saturate(raw * 1.15) * 100)
}

/**
 * Calculate Open Source Karma (0-100)
 * Measures community contribution and collaboration.
 * v2: influence quality (log-stars across real repos) + OS contribution
 * events + PR count + community engagement + open-source ratio.
 */
export function calculateOpenSourceKarma(dna) {
  const scoring = dna?.scoring || {}
  const stats = dna?.stats || {}
  const influence   = safe(scoring.influenceQualityScore, 0)
  const osKarma     = safe(scoring.openSourceContributionScore, 0)
  const prCountNorm = safe(scoring.prCountNormalized, 0)
  const community   = safe(scoring.communityEngagementScore, 0)
  const osRatio     = safe(scoring.openSourceRatio, 0)
  // Forks still matter but log-saturated, so a viral fork farm doesn't
  // dominate a real maintainer's score.
  const forksNorm   = logSaturate(safe(stats.totalForks, 0), 50)

  const raw =
    0.25 * influence +
    0.20 * osKarma +
    0.20 * prCountNorm +
    0.15 * community +
    0.10 * osRatio +
    0.10 * forksNorm
  return clamp(saturate(raw * 1.2) * 100)
}

/**
 * Calculate Technical Wizardry (0-100)
 * Measures low-level, infrastructure knowledge.
 * v2: sophistication P75 + tooling sophistication + backend coverage +
 * code depth + testing coverage + domain breadth. The legacy
 * averageComplexity is preserved as a small bonus.
 */
export function calculateTechnicalWizardry(dna) {
  const scoring = dna?.scoring || {}
  const sophP75   = safe(scoring.sophisticationP75, 0)
  const tooling   = safe(scoring.toolingSophistication, 0)
  const backend   = safe(scoring.backendCoverage, 0)
  const codeDepth = safe(scoring.codeSignalDepth, 0)
  const testing   = safe(scoring.testingCoverage, 0)
  const breadth   = safe(scoring.projectDomainBreadth, 0)
  const avgCplx   = safe(scoring.averageComplexity, 0)
  const craft     = safe(scoring.craftConsistency, 0)

  const raw =
    0.25 * sophP75 +
    0.20 * tooling +
    0.15 * backend +
    0.10 * codeDepth +
    0.10 * testing +
    0.10 * breadth +
    0.05 * craft +
    0.05 * avgCplx
  return clamp(saturate(raw * 1.15) * 100)
}

/**
 * Calculate Main Character Energy (0-100)
 * Measures presence, impact, visibility.
 * v2: influence quality (log-stars across real repos) + community
 * engagement + engagement rhythm (steady presence) + signature project
 * count. The legacy "followers/500" and "totalStars/5000" are replaced
 * with quality-weighted variants.
 */
export function calculateMainCharacterEnergy(dna) {
  const scoring = dna?.scoring || {}
  const stats = dna?.stats || {}
  const influence = safe(scoring.influenceQualityScore, 0)
  const topDepth  = safe(scoring.topRepoDepth, 0)
  const sigCount  = safe(scoring.signatureProjectCount, 0)
  const community = safe(scoring.communityEngagementScore, 0)
  const rhythm    = safe(scoring.engagementRhythm, 0)
  const osKarma   = safe(scoring.openSourceContributionScore, 0)
  // Account age still gives a small bonus, but log-saturated and only
  // for accounts that have actually produced something.
  const accountMonths = safe(stats?.accountAge?.totalMonths, 0)
  const ageBoost = logSaturate(accountMonths, 60) * Math.min(0.4, influence + 0.1)

  const raw =
    0.30 * influence +
    0.20 * topDepth +
    0.15 * logSaturate(sigCount, 8) +
    0.15 * community +
    0.10 * rhythm +
    0.10 * osKarma +
    ageBoost
  return clamp(saturate(raw * 1.2) * 100)
}

/**
 * Calculate Build Stability (0-100)
 * Measures reliability and quality.
 * v2: testing coverage + tooling sophistication + maintenance score +
 * signature project ratio (real projects stay stable) + inverse
 * abandonment. The "openIssueCount" pseudo-signal is dropped — we never
 * actually compute it, so the old formula returned 100 always.
 */
export function calculateBuildStability(dna) {
  const scoring = dna?.scoring || {}
  const testing    = safe(scoring.testingCoverage, 0)
  const tooling    = safe(scoring.toolingSophistication, 0)
  const errorScore = safe(scoring.errorHandlingScore, 0)
  const maintain   = safe(scoring.maintenanceScore, 0)
  const sigRatio   = safe(scoring.signatureProjectRatio, 0)
  const abandon    = safe(scoring.projectAbandonmentRate, 0)
  const completed  = safe(scoring.completedProjectRatio, 0)

  const raw =
    0.20 * testing +
    0.20 * tooling +
    0.15 * errorScore +
    0.15 * maintain +
    0.15 * sigRatio +
    0.10 * completed +
    0.05 * (1 - abandon)
  return clamp(saturate(raw * 1.15) * 100)
}

/**
 * Calculate Side Quest Completion (0-100)
 * Measures ability to finish projects.
 * v2: completed project ratio + maintenance score + release health +
 * substantive repo ratio. The old "sideProjectSuccess" formula was
 * a meaningless (publicRepos-5)/publicRepos which topped out at 100
 * for any account with >=5 repos — replaced.
 */
export function calculateSideQuestCompletion(dna) {
  const scoring = dna?.scoring || {}
  const completed  = safe(scoring.completedProjectRatio, 0)
  const maintain   = safe(scoring.maintenanceScore, 0)
  const relHealth  = safe(scoring.releaseHealthSignal, 0)
  const substantive= safe(scoring.substantiveRepoRatio, 0)
  const sigRatio   = safe(scoring.signatureProjectRatio, 0)
  const abandon    = safe(scoring.projectAbandonmentRate, 0)

  const raw =
    0.30 * completed +
    0.20 * maintain +
    0.15 * relHealth +
    0.15 * substantive +
    0.10 * sigRatio +
    0.10 * (1 - abandon)
  return clamp(saturate(raw * 1.15) * 100)
}

/**
 * Calculate Debugging Resistance (0-100)
 * How much chaos is in codebase.
 * v2: inverse of chaos signals — high testing + low abandon + good
 * tooling + high maintenance = "bulletproof". The old formula was
 * mostly constants since openIssueCount/errorFrequency/bugFixLatency
 * were never computed.
 */
export function calculateDebuggingResistance(dna) {
  const scoring = dna?.scoring || {}
  const testing   = safe(scoring.testingCoverage, 0)
  const tooling   = safe(scoring.toolingSophistication, 0)
  const errorScore= safe(scoring.errorHandlingScore, 0)
  const maintain  = safe(scoring.maintenanceScore, 0)
  const abandon   = safe(scoring.projectAbandonmentRate, 0)
  const burst     = safe(scoring.commitBurstiness, 0)

  // "Resistance" = how hard it is for chaos to break you.
  const stability =
    0.25 * testing +
    0.20 * tooling +
    0.15 * errorScore +
    0.15 * maintain +
    0.15 * (1 - abandon) +
    0.10 * (1 - burst)
  return clamp(saturate(stability * 1.2) * 100)
}

/**
 * Calculate all metrics at once
 */
export function calculateAllMetrics(dna) {
  return {
    shippingPower:       calculateShippingPower(dna),
    chaosEnergy:         calculateChaosEnergy(dna),
    innovationSpark:     calculateInnovationSpark(dna),
    documentationAura:   calculateDocumentationAura(dna),
    openSourceKarma:     calculateOpenSourceKarma(dna),
    technicalWizardry:   calculateTechnicalWizardry(dna),
    mainCharacterEnergy: calculateMainCharacterEnergy(dna),
    buildStability:      calculateBuildStability(dna),
    sideQuestCompletion: calculateSideQuestCompletion(dna),
    debuggingResistance: calculateDebuggingResistance(dna),
  }
}

/**
 * Calculate overall score (weighted average of all metrics).
 * v2: each metric contributes its own weight, with shipping and
 * technical depth weighted slightly higher (they're the most "real"
 * signals). Diversity bonus: if all metrics are in a similar band,
 * the overall score gets a small lift (rewards well-rounded devs).
 */
const METRIC_WEIGHTS = {
  shippingPower:       1.10,
  technicalWizardry:   1.05,
  innovationSpark:     1.00,
  documentationAura:   0.95,
  openSourceKarma:     1.00,
  mainCharacterEnergy: 0.95,
  buildStability:      0.90,
  sideQuestCompletion: 0.95,
  chaosEnergy:         0.55,   // inverted signal; we keep it in the overall at half-weight
  debuggingResistance: 0.90,
}

export function calculateOverallScore(metrics) {
  if (!metrics) return 0
  let num = 0
  let denom = 0
  for (const [key, val] of Object.entries(metrics)) {
    const w = METRIC_WEIGHTS[key] ?? 1
    if (typeof val !== 'number') continue
    num += val * w
    denom += w
  }
  if (denom === 0) return 0

  const mean = num / denom
  // Diversity bonus: if metrics are tightly clustered, the developer
  // is well-rounded — reward slightly. (Penalize a single spike.)
  const values = Object.values(metrics).filter((v) => typeof v === 'number')
  if (values.length > 1) {
    const m = values.reduce((a, b) => a + b, 0) / values.length
    const variance = values.reduce((s, v) => s + (v - m) ** 2, 0) / values.length
    const stdDev = Math.sqrt(variance)
    // stdDev 0 → +3, stdDev 30 → 0, stdDev 60+ → -3
    const diversity = 3 - (stdDev / 10)
    return Math.round(clamp(mean + diversity, 0, 100))
  }
  return Math.round(clamp(mean, 0, 100))
}

/**
 * Get descriptive text for a metric score
 */
export function getMetricDescription(metric, score) {
  const descriptions = {
    shippingPower: {
      high: '🚀 You ship code like it\'s going out of style.',
      mid: '📦 You get things done, eventually.',
      low: '🐌 Your code is still warming up in development.',
    },
    chaosEnergy: {
      high: '⚡ Your development workflow is beautiful chaos.',
      mid: '⚙️ You\'re methodical, mostly.',
      low: '☯️ Your code flows like water.',
    },
    innovationSpark: {
      high: '🔬 You\'re pushing the boundaries of what\'s possible.',
      mid: '🔨 You build solid, practical solutions.',
      low: '🎯 You prefer the proven path.',
    },
    documentationAura: {
      high: '📚 Your documentation could be published.',
      mid: '📝 You document what matters.',
      low: '🤐 Code speaks for itself, right?',
    },
    openSourceKarma: {
      high: '🌍 Open source community knows your name.',
      mid: '🤝 You contribute when you can.',
      low: '🏝️ You prefer solitude.',
    },
    technicalWizardry: {
      high: '🧙 You can optimize anything.',
      mid: '⚙️ You know your way around infrastructure.',
      low: '🎨 You prefer user-facing code.',
    },
    mainCharacterEnergy: {
      high: '⭐ You\'re basically GitHub famous.',
      mid: '👤 You have your audience.',
      low: '🤐 Hidden gem status.',
    },
    buildStability: {
      high: '✅ Your code doesn\'t crash.',
      mid: '🟡 Most features work as intended.',
      low: '🔥 Move fast and break things.',
    },
    sideQuestCompletion: {
      high: '🏆 You finish what you start.',
      mid: '📋 Some projects reach completion.',
      low: '🎮 You\'re a professional project collector.',
    },
    debuggingResistance: {
      high: '🛡️ Your code is bulletproof.',
      mid: '🔧 Bugs happen, you fix them.',
      low: '🐛 Bugs are a lifestyle.',
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
  if (score >= 90) return '#FF6B9D'; // legendary purple
  if (score >= 75) return '#FF006E'; // epic red
  if (score >= 60) return '#FB5607'; // rare orange
  if (score >= 45) return '#FFBE0B'; // uncommon yellow
  if (score >= 30) return '#8338EC'; // common purple
  return '#777777'; // weak gray
}

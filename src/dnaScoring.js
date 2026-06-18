/* Pure functions: given a dna bundle, produce 5 trait scores + a derived
   primary/secondary archetype. No side effects, easy to test. */

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

function normalize(value, max = 1) {
  return clamp((value ?? 0) * 100 / max)
}

export function computeTraits(dna) {
  const { stats, scoring } = dna
  const repoCount = Math.max(stats.publicRepos, scoring.totalRepos)

  const technicalDepth = clamp(
    0.28 * scoring.documentationScore * 100 +
    0.22 * scoring.averageComplexity * 100 +
    0.18 * scoring.backendCoverage * 100 +
    0.15 * scoring.deploymentCoverage * 100 +
    0.12 * scoring.testingCoverage * 100 +
    0.05 * scoring.realWorldImpactScore * 100
  )

  const innovation = clamp(
    0.22 * scoring.originalityScore * 100 +
    0.2 * scoring.aiMlCoverage * 100 +
    0.17 * scoring.computerVisionCoverage * 100 +
    0.16 * scoring.nlpCoverage * 100 +
    0.15 * scoring.automationCoverage * 100 +
    0.1 * scoring.realWorldImpactScore * 100
  )

  const openSourceImpact = clamp(
    0.4 * scoring.openSourceContributionScore * 100 +
    0.2 * scoring.openSourceRatio * 100 +
    0.15 * normalize(stats.totalForks, Math.max(repoCount, 1) * 5) +
    0.1 * scoring.recentActivityCoverage * 100 +
    0.1 * scoring.documentationScore * 100 +
    0.05 * scoring.pullRequestScore * 5
  )

  const collaboration = clamp(
    0.35 * scoring.openSourceContributionScore * 100 +
    0.25 * scoring.pullRequestScore * 5 +
    0.15 * scoring.collaborationCoverage * 100 +
    0.15 * scoring.documentationScore * 100 +
    0.1 * scoring.recentActivityCoverage * 100
  )

  const shipping = clamp(
    0.22 * normalize(repoCount, 20) +
    0.18 * scoring.recentActivityCoverage * 100 +
    0.18 * scoring.realWorldImpactScore * 100 +
    0.17 * scoring.deploymentCoverage * 100 +
    0.15 * scoring.documentationScore * 100 +
    0.1 * scoring.frameworkCoverage * 100
  )

  const aiMlFocus = clamp(
    0.6 * scoring.aiMlCoverage * 100 +
    0.2 * scoring.readmeQuality * 100 +
    0.1 * scoring.realWorldImpactScore * 100 +
    0.1 * scoring.backendCoverage * 100
  )

  const cvFocus = clamp(
    0.6 * scoring.computerVisionCoverage * 100 +
    0.2 * scoring.aiMlCoverage * 100 +
    0.1 * scoring.readmeQuality * 100 +
    0.1 * scoring.realWorldImpactScore * 100
  )

  const roboticsFocus = clamp(
    0.6 * scoring.roboticsCoverage * 100 +
    0.2 * scoring.aiMlCoverage * 100 +
    0.1 * scoring.readmeQuality * 100 +
    0.1 * scoring.realWorldImpactScore * 100
  )

  return {
    shipping,
    technicalDepth,
    openSourceImpact,
    collaboration,
    innovation,
    aiMlFocus,
    cvFocus,
    roboticsFocus,
  }
}

/* Each trait has a list of archetypes ordered by score thresholds.
   The highest-scoring trait becomes the primary archetype; the runner-up
   becomes the secondary, but we cross-reference both — e.g. a high Innovation
   alone reads as "The Polyglot", but Innovation + Shipping reads as "The Architect". */
const ARCHETYPES = {
  shipping: [
    { min: 80, label: 'The Delivery Champion' },
    { min: 50, label: 'The Product Operator' },
    { min: 20, label: 'The Release Runner' },
    { min: 0,  label: 'The Portfolio Collector' },
  ],
  technicalDepth: [
    { min: 75, label: 'The Systems Engineer' },
    { min: 40, label: 'The Architecture Lead' },
    { min: 0,  label: 'The Code Craftsman' },
  ],
  openSourceImpact: [
    { min: 80, label: 'The Open Source Maintainer' },
    { min: 40, label: 'The Community Builder' },
    { min: 0,  label: 'The Contributor' },
  ],
  collaboration: [
    { min: 80, label: 'The Team Catalyst' },
    { min: 40, label: 'The Cross-Functional Partner' },
    { min: 0,  label: 'The Solo Operator' },
  ],
  innovation: [
    { min: 80, label: 'The Product Innovator' },
    { min: 40, label: 'The AI/ML Explorer' },
    { min: 0,  label: 'The Focused Specialist' },
  ],
  aiMlFocus: [
    { min: 80, label: 'The AI/ML Engineer' },
    { min: 40, label: 'The Machine Learning Specialist' },
    { min: 0,  label: 'The Data-Driven Developer' },
  ],
  cvFocus: [
    { min: 80, label: 'The Computer Vision Engineer' },
    { min: 40, label: 'The Vision Systems Specialist' },
    { min: 0,  label: 'The Perception Practitioner' },
  ],
  roboticsFocus: [
    { min: 80, label: 'The Robotics Engineer' },
    { min: 40, label: 'The Embedded Automation Specialist' },
    { min: 0,  label: 'The Mechatronics Developer' },
  ],
}

const TRAIT_COLORS = {
  shipping:           '#00F5FF',
  technicalDepth:     '#39FF14',
  openSourceImpact:   '#FFB454',
  collaboration:      '#FF6BD8',
  innovation:         '#A78BFA',
  aiMlFocus:          '#7C3AED',
  cvFocus:            '#F97316',
  roboticsFocus:      '#14B8A6',
}

const TRAIT_LABELS = {
  shipping:           'Shipping DNA',
  technicalDepth:     'Technical Depth',
  openSourceImpact:   'Open Source Impact',
  collaboration:      'Collaboration',
  innovation:         'Innovation',
  aiMlFocus:          'AI/ML Focus',
  cvFocus:            'Computer Vision Focus',
  roboticsFocus:      'Robotics Focus',
}

export function deriveArchetypes(traits) {
  const ranked = Object.entries(traits)
    .map(([key, value]) => ({ key, value }))
    .sort((a, b) => b.value - a.value)

  const pick = (key) =>
    ARCHETYPES[key].find((a) => traits[key] >= a.min).label

  return {
    primary:   { key: ranked[0].key, label: pick(ranked[0].key) },
    secondary: { key: ranked[1].key, label: pick(ranked[1].key) },
  }
}

export function getTraitMeta(key) {
  return { color: TRAIT_COLORS[key], label: TRAIT_LABELS[key] }
}

export const TRAIT_ORDER = [
  'shipping',
  'technicalDepth',
  'openSourceImpact',
  'collaboration',
  'innovation',
  'aiMlFocus',
  'cvFocus',
  'roboticsFocus',
]

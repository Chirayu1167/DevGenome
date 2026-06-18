/* Pure functions: given a dna bundle, produce 5 trait scores + a derived
   primary/secondary archetype. No side effects, easy to test.

   v2: Quality-first. Stars and forks are weak tie-breakers, not primary inputs.
   Domain expertise, docs, deployment, and recency lead. This ensures developers
   with rich but unpopular portfolios get meaningfully different archetypes from
   pure CRUD builders with higher star counts. */

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

export function computeTraits(dna) {
  const { stats, languages, scoring } = dna
  const repoCount = Math.max(stats.publicRepos, scoring.totalRepos)

  /* Shipping DNA — rewards activity, deployment, and completion over raw count */
  const shipping = clamp(
    repoCount * 1.5 +                                    // repo count (reduced weight)
    (scoring.recentActivityCoverage || 0) * 35 +         // recently active projects
    (scoring.deploymentCoverage || 0) * 25 +             // actually deployed
    (scoring.documentationScore || 0) * 15               // documented = probably shipped
  )

  /* Technical Depth — complexity, language sophistication, testing, systems work */
  const technicalDepth = clamp(
    (scoring.averageComplexity || 0) * 35 +
    (scoring.languageComplexitySignal || scoring.avgRepoSizeKb / 2000) * 30 +
    (scoring.testingCoverage || 0) * 20 +
    (scoring.backendCoverage || 0) * 15
  )

  /* Open Source Impact — contribution activity and PRs > raw star/fork counts */
  const openSourceImpact = clamp(
    (scoring.openSourceContributionScore || 0) * 45 +
    Math.min((scoring.pullRequestScore || 0) * 4, 30) +  // PRs capped at 30 pts
    (scoring.openSourceRatio || 0) * 15 +
    Math.min(Math.log10(1 + stats.totalForks) / 2, 1) * 10  // forks as weak signal
  )

  /* Collaboration — community engagement, PRs, followers as weak signal */
  const collaboration = clamp(
    (scoring.communityEngagementScore || 0) * 40 +
    Math.min((scoring.pullRequestScore || 0) * 3, 25) +
    Math.min(stats.followers / 20, 1) * 20 +            // log-ish follower signal
    (scoring.collaborationCoverage || 0) * 15
  )

  /* Innovation — domain expertise in technical areas + originality + language diversity */
  const domainSignal =
    (scoring.aiMlCoverage || 0) * 30 +
    (scoring.computerVisionCoverage || 0) * 25 +
    (scoring.nlpCoverage || 0) * 20 +
    (scoring.roboticsCoverage || 0) * 20 +
    (scoring.automationCoverage || 0) * 15

  const innovation = clamp(
    Math.min(domainSignal, 50) +                         // domain expertise cap at 50
    (scoring.originalityScore || 0) * 30 +               // original work
    Math.min((scoring.uniqueLanguageCount || 0) * 8, 20) // language diversity
  )

  return { shipping, technicalDepth, openSourceImpact, collaboration, innovation }
}

/* Each trait has a list of archetypes ordered by score thresholds.
   The highest-scoring trait becomes the primary archetype; the runner-up
   becomes the secondary, but we cross-reference both — e.g. a high Innovation
   alone reads as "The Polyglot", but Innovation + Shipping reads as "The Architect". */
const ARCHETYPES = {
  shipping: [
    { min: 80, label: 'The Shipyard' },
    { min: 50, label: 'The Prolific Builder' },
    { min: 20, label: 'The Steady Builder' },
    { min: 0,  label: 'The Curatorial Mind' },
  ],
  technicalDepth: [
    { min: 75, label: 'The Architect' },
    { min: 40, label: 'The Engineer' },
    { min: 0,  label: 'The Hacker' },
  ],
  openSourceImpact: [
    { min: 80, label: 'The Open Source Champion' },
    { min: 40, label: 'The Maintainer' },
    { min: 0,  label: 'The Contributor' },
  ],
  collaboration: [
    { min: 80, label: 'The Community Pillar' },
    { min: 40, label: 'The Collaborator' },
    { min: 0,  label: 'The Solo Operator' },
  ],
  innovation: [
    { min: 80, label: 'The Polyglot' },
    { min: 40, label: 'The Cross-Domain Explorer' },
    { min: 0,  label: 'The Specialist' },
  ],
}

const TRAIT_COLORS = {
  shipping:           '#00F5FF',
  technicalDepth:     '#39FF14',
  openSourceImpact:   '#FFB454',
  collaboration:      '#FF6BD8',
  innovation:         '#A78BFA',
}

const TRAIT_LABELS = {
  shipping:           'Shipping DNA',
  technicalDepth:     'Technical Depth',
  openSourceImpact:   'Open Source Impact',
  collaboration:      'Collaboration',
  innovation:         'Innovation',
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
]

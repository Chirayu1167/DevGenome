/* Pure functions: given a dna bundle, produce 5 trait scores + a derived
   primary/secondary archetype. No side effects, easy to test. */

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

export function computeTraits(dna) {
  const { stats, languages, scoring } = dna
  const repoCount = Math.max(stats.publicRepos, scoring.totalRepos)

  const shipping = clamp(repoCount * 2.5)
  const technicalDepth = clamp(scoring.avgRepoSizeKb / 50)
  const openSourceImpact = clamp(
    repoCount > 0 ? (stats.totalStars / repoCount) * 10 : 0
  )
  const collaboration = clamp((stats.followers / 10) + (stats.totalForks * 2))
  const innovation = clamp(scoring.uniqueLanguageCount * 12)

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

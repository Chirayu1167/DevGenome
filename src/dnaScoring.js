/* Pure functions: given a dna bundle, produce 5 trait scores + a derived
   primary/secondary archetype. No side effects, easy to test.

   Trait philosophy (v2):
   - Don't reward raw repo count, language count, file size, or raw
     stars/followers/forks. Those are easy to inflate and don't actually
     reflect project quality, originality, complexity, or activity.
   - Reward what *feels* like real work: polished signature projects,
     consistent craft across repos, original (non-tutorial) work that
     ships, domain breadth that goes beyond hello-world, healthy
     maintenance, sophisticated tooling, and steady coding rhythm.
   - All formulas saturate (use log/sqrt) so going from "good" to "great"
     is harder than going from "nothing" to "okay". This keeps the
     metric spread believable across the whole population. */

const clamp = (n, lo = 0, hi = 100) => Math.max(lo, Math.min(hi, n))

/* Saturation curve: smooth, asymptotic, hits ~0.95 at x=1, ~0.99 at x=2.
   x is the underlying 0-1 signal; result is also 0-1. We use this so
   "twice as good" doesn't double the score. */
const saturate = (x) => 1 - Math.exp(-Math.max(0, x))

/* log-saturate: a softer curve than saturate, good for things that
   scale unboundedly (commit counts, project counts). */
const logSaturate = (x, denom) => clamp(Math.log10(1 + Math.max(0, x)) / Math.log10(1 + denom), 0, 1)

const safe = (v, fallback = 0) => (Number.isFinite(v) ? v : fallback)

/* Pull a signal off the scoring bundle with a default. We accept a
   function so callers can transform the value (e.g. invert). */
const sig = (dna, key, fallback = 0) => safe(dna?.scoring?.[key], fallback)

/* ────────────── TRAIT COMPUTATION ────────────── */

export function computeTraits(dna) {
  if (!dna) return defaultTraits()
  const { stats = {}, scoring = {}, languages = [] } = dna

  /* SHIPPING — ability to push finished, real-looking work out the door.
     NOT just "lots of repos". Combines:
       - signature project count (log-saturated, so 10 polished > 50 empty)
       - signature project ratio (most of your work is real, not filler)
       - release health (active maintainer signal)
       - recent activity coverage (pushed in last 12mo)
       - real-world signal (homepage, gh-pages, realWorldImpact keywords)
     Tiny dampener on abandonment rate so a graveyard of stale repos
     doesn't sneak in via one famous project. */
  const sigCount  = safe(scoring.signatureProjectCount, 0)
  const sigRatio  = safe(scoring.signatureProjectRatio, 0)
  const relHealth = safe(scoring.releaseHealthSignal, 0)
  const recent    = safe(scoring.recentActivityCoverage, 0)
  const realWorld = safe(scoring.realWorldSignal, 0)
  const abandon   = safe(scoring.projectAbandonmentRate, 0)

  const shippingRaw =
    0.30 * logSaturate(sigCount, 8) +     // log curve: 8 sig projects ≈ 1.0
    0.25 * sigRatio +                     // share of own repos that are real
    0.20 * relHealth +                    // actively maintained
    0.15 * recent +                       // pushed in last 12mo
    0.10 * realWorld -                    // ships to real users
    0.20 * (abandon - 0.5) * (abandon > 0.5 ? 1 : 0) // penalize only if >50% abandoned
  const shipping = clamp(saturate(shippingRaw) * 100)

  /* TECHNICAL DEPTH — engineering substance behind the work.
     Replaces "avgRepoSizeKb / 50". New formula rewards:
       - repoSophisticationP75 (top quartile of per-repo sophistication)
       - codeSignalDepth (median size with count dampener — already
         count-aware)
       - toolingSophistication (deploy/test/deploy keywords across repos)
       - backendCoverage (real backend work, not just static pages)
       - domain breadth (covers multiple technical domains)
       - averageComplexity (legacy signal, used as a small boost) */
  const sophP75   = safe(scoring.sophisticationP75, 0)
  const codeDepth = safe(scoring.codeSignalDepth, 0)
  const tooling   = safe(scoring.toolingSophistication, 0)
  const backend   = safe(scoring.backendCoverage, 0)
  const breadth   = safe(scoring.projectDomainBreadth, 0)
  const avgCplx   = safe(scoring.averageComplexity, 0)
  const craftCons = safe(scoring.craftConsistency, 0)

  const depthRaw =
    0.30 * sophP75 +            // top-quartile repo sophistication
    0.15 * codeDepth +          // median size, count-dampened
    0.15 * tooling +            // real engineer tooling (deploy/tests)
    0.15 * backend +            // backend coverage
    0.10 * breadth +            // multiple technical domains
    0.10 * craftCons +          // consistent craft across repos
    0.05 * avgCplx              // legacy complexity signal
  const technicalDepth = clamp(saturate(depthRaw * 1.2) * 100)

  /* OPEN SOURCE IMPACT — real influence, not just star-bait.
     Was: (totalStars / repoCount) * 10. Problems: one viral repo skews
     it; empty star-bait with one star wins.
     New: influenceQualityScore (log-stars, but only across repos that
     have a topic and a description — so empty repos don't count), plus
     genuine community engagement signals. */
  const influence   = safe(scoring.influenceQualityScore, 0)
  const osKarma     = safe(scoring.openSourceContributionScore, 0)
  const osRatio     = safe(scoring.openSourceRatio, 0)
  const prCountNorm = safe(scoring.prCountNormalized, 0)
  const community   = safe(scoring.communityEngagementScore, 0)
  const topDepth    = safe(scoring.topRepoDepth, 0)

  const impactRaw =
    0.30 * influence +     // log-stars across "real" repos
    0.20 * osKarma +       // contribution events × recent activity
    0.15 * osRatio +       // share of own repos that look open source
    0.15 * prCountNorm +   // PRs (log-saturated)
    0.10 * community +     // issue/PR review activity
    0.10 * topDepth        // depth of top-starred repos
  const openSourceImpact = clamp(saturate(impactRaw * 1.15) * 100)

  /* COLLABORATION — actually working with others, not just having
     followers. Was: followers/10 + totalForks*2 (raw numbers).
     New: community engagement (PRs, reviews, issue comments), PR
     count, OS contribution score, but also "openSourceRatio" so solo
     devs aren't artificially deflated. */
  const collabRaw =
    0.30 * community +
    0.25 * prCountNorm +
    0.20 * osKarma +
    0.15 * osRatio +
    0.10 * logSaturate(safe(stats.totalForks, 0), 50)  // forks still matter, but log-saturated
  const collaboration = clamp(saturate(collabRaw * 1.2) * 100)

  /* INNOVATION — originality and cross-domain exploration.
     Was: uniqueLanguageCount * 12 (raw count).
     New: weighted originality (impact-weighted, so 5 polished originals
     beats 30 forks-of-tutorials), creative project ratio, project
     domain breadth, plus small contributions from AI/ML, robotics,
     computer vision, NLP, automation keywords. */
  const weightedOrig = safe(scoring.weightedOriginality, 0)
  const creative     = safe(scoring.creativeProjectRatio, 0)
  const breadthD     = safe(scoring.projectDomainBreadth, 0)
  const aiMl         = safe(scoring.aiMlCoverage, 0)
  const robotics     = safe(scoring.roboticsCoverage, 0)
  const cv           = safe(scoring.computerVisionCoverage, 0)
  const nlp          = safe(scoring.nlpCoverage, 0)
  const automation   = safe(scoring.automationCoverage, 0)
  const framework    = safe(scoring.frameworkCoverage, 0)
  const origScore    = safe(scoring.originalityScore, 0)

  const innovationRaw =
    0.30 * weightedOrig +   // impact-weighted originality
    0.20 * creative +       // share of repos that are creative originals
    0.15 * breadthD +       // multiple technical domains
    0.10 * origScore +      // legacy originality (desc/topic/impact)
    0.08 * aiMl +           // AI/ML work
    0.05 * robotics +
    0.05 * cv +
    0.04 * nlp +
    0.04 * automation +
    0.05 * framework        // uses a recognizable framework stack
  const innovation = clamp(saturate(innovationRaw * 1.1) * 100)

  return {
    shipping:           Math.round(shipping),
    technicalDepth:     Math.round(technicalDepth),
    openSourceImpact:   Math.round(openSourceImpact),
    collaboration:      Math.round(collaboration),
    innovation:         Math.round(innovation),
  }
}

/* Sensible default for missing/broken input. */
function defaultTraits() {
  return { shipping: 30, technicalDepth: 30, openSourceImpact: 25, collaboration: 25, innovation: 30 }
}

/* ────────────── ARCHETYPE DERIVATION ──────────────
   The same five traits are mapped to five "biomes" with a small twist:
   instead of pure threshold lookups, we use score bands to pick a tier
   *within* each biome. So "The Prolific Builder" (mid shipping) and
   "The Shipyard" (top shipping) feel meaningfully different, and a
   high-Innovation developer can be "The Polyglot" (max) vs "The
   Cross-Domain Explorer" (mid). Cross-trait combos that imply a
   recognizable niche get a small boost. */

const ARCHETYPES = {
  shipping: [
    { min: 80, label: 'The Shipyard' },
    { min: 55, label: 'The Prolific Builder' },
    { min: 30, label: 'The Steady Builder' },
    { min: 0,  label: 'The Curatorial Mind' },
  ],
  technicalDepth: [
    { min: 78, label: 'The Architect' },
    { min: 50, label: 'The Engineer' },
    { min: 0,  label: 'The Hacker' },
  ],
  openSourceImpact: [
    { min: 80, label: 'The Open Source Champion' },
    { min: 45, label: 'The Maintainer' },
    { min: 0,  label: 'The Contributor' },
  ],
  collaboration: [
    { min: 78, label: 'The Community Pillar' },
    { min: 45, label: 'The Collaborator' },
    { min: 0,  label: 'The Solo Operator' },
  ],
  innovation: [
    { min: 78, label: 'The Polyglot' },
    { min: 45, label: 'The Cross-Domain Explorer' },
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
  // Cross-trait combo nudges — if two traits are both high and they're a
  // recognizable "build pattern", surface that combo as a custom label.
  // (We never override; we just tweak the primary/secondary when a combo
  // is overwhelmingly strong. This keeps things feeling organic.)
  const t = traits || {}

  // Rank traits by score; the highest is primary, the second is secondary.
  const ranked = Object.entries(t)
    .map(([key, value]) => ({ key, value: safe(value, 0) }))
    .sort((a, b) => b.value - a.value)

  const pick = (key) =>
    (ARCHETYPES[key] || []).find((a) => safe(t[key], 0) >= a.min)?.label
      || (ARCHETYPES[key] || [])[ARCHETYPES[key].length - 1].label

  const primary   = { key: ranked[0].key, label: pick(ranked[0].key) }
  const secondary = { key: ranked[1].key, label: pick(ranked[1].key) }

  // Cross-trait combo overrides — these are the "signature" identities
  // that emerge when two traits are both strong together. We use a
  // dedicated dict so adding more is one line.
  const combos = [
    { a: 'innovation',       b: 'shipping',         min: 65, label: 'The Visionary Shipper' },
    { a: 'innovation',       b: 'technicalDepth',   min: 65, label: 'The Inventor' },
    { a: 'technicalDepth',   b: 'shipping',         min: 65, label: 'The Architect-Builder' },
    { a: 'openSourceImpact', b: 'collaboration',    min: 60, label: 'The Open Source Champion' },
    { a: 'openSourceImpact', b: 'shipping',         min: 60, label: 'The Maintainer' },
    { a: 'collaboration',    b: 'innovation',       min: 60, label: 'The Community Polyglot' },
  ]
  for (const c of combos) {
    if (safe(t[c.a], 0) >= c.min && safe(t[c.b], 0) >= c.min) {
      // Pick the strongest trait of the pair as the primary key, but
      // surface the combo as the label.
      const comboKey = safe(t[c.a], 0) >= safe(t[c.b], 0) ? c.a : c.b
      const comboSecondary = safe(t[c.a], 0) >= safe(t[c.b], 0) ? c.b : c.a
      return {
        primary:   { key: comboKey, label: c.label },
        secondary: { key: comboSecondary, label: pick(comboSecondary) },
      }
    }
  }

  return { primary, secondary }
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

/**
 * Game Analyzer - Orchestrates all game systems
 * Coordinates metrics, archetypes, traits, achievements, and roasts
 */

import { fetchGitHubData, GitHubError } from './github.js'
import { calculateAllMetrics, calculateOverallScore } from './gameScoringMetrics.js'
import { selectArchetype, getAllArchetypes } from './archetypes.js'
import { selectTraitsForDeveloper, getTrait } from './dnaTraits.js'
import { calculateUnlockedAchievements, calculateAchievementProgress, getAchievement } from './achievements.js'
import { generateAllRoasts } from './roastEngine.js'

/**
 * Analyze a GitHub profile as a complete game experience
 * Returns archetype, DNA traits, achievements, metrics, and roasts
 */
export async function analyzeAsGame(username) {
  try {
    // Step 1: Fetch raw GitHub data
    const dna = await fetchGitHubData(username)

    // Step 2: Calculate game metrics (0-100 scale)
    const gameMetrics = calculateAllMetrics(dna)
    const overall = calculateOverallScore(gameMetrics)

    // Step 3: Select archetype based on metrics
    const archetype = selectArchetype(gameMetrics)

    // Step 4: Extract DNA traits (8-12 traits)
    const dnaTraits = selectTraitsForDeveloper(gameMetrics, 10)

    // Step 5: Calculate achievements (unlocked + progress)
    const unlockedAchievements = calculateUnlockedAchievements(gameMetrics)
    const achievementProgress = calculateAchievementProgress(gameMetrics)

    // Step 6: Generate roasts (3 severity levels)
    const roasts = generateAllRoasts(dna.profile, dna, archetype)

    // Return complete game analysis
    return {
      // Original GitHub data
      profile: dna.profile,
      stats: dna.stats,
      languages: dna.languages,

      // Game Analysis
      gameAnalysis: {
        // 10 Game Metrics (0-100 each)
        metrics: gameMetrics,
        overallScore: overall,

        // Archetype (RPG Class)
        archetype: {
          id: archetype.id,
          name: archetype.name,
          emoji: archetype.emoji,
          rarity: archetype.rarity,
          description: archetype.description,
          domain: archetype.domain,
          strengths: archetype.strengths,
          weaknesses: archetype.weaknesses,
          shareablePhrase: archetype.shareablePhrase,
        },

        // DNA Traits (Personality markers)
        dnaTraits: dnaTraits.map(trait => ({
          id: trait.id,
          name: trait.name,
          emoji: trait.emoji,
          description: trait.description,
          category: trait.category,
          rarity: trait.rarity,
          score: trait.score || 0,
        })),

        // Achievements
        achievements: {
          unlocked: unlockedAchievements.map(ach => ({
            id: ach.id,
            name: ach.name,
            emoji: ach.emoji,
            description: ach.description,
            rarity: ach.rarity,
            unlockedPercentage: ach.unlockedPercentage,
          })),
          progress: achievementProgress, // { [id]: 0-100 }
          totalUnlocked: unlockedAchievements.length,
        },

        // Roasts (Context-aware humor)
        roasts: {
          gentle: roasts.gentle,
          sarcastic: roasts.sarcastic,
          brutal: roasts.brutal,
        },
      },

      // Raw metrics for advanced UI rendering
      rawScoring: dna.scoring,
    }
  } catch (error) {
    if (error instanceof GitHubError) {
      throw error
    }
    throw new Error(`Analysis failed: ${error.message}`)
  }
}

/**
 * Quick analysis - returns just the key stats (faster)
 */
export async function analyzeQuick(username) {
  const analysis = await analyzeAsGame(username)
  return {
    profile: analysis.profile,
    archetype: analysis.gameAnalysis.archetype,
    overallScore: analysis.gameAnalysis.overallScore,
    metrics: analysis.gameAnalysis.metrics,
    achievementsUnlocked: analysis.gameAnalysis.achievements.totalUnlocked,
  }
}

/**
 * Compare two developers
 */
export async function compareProfiles(username1, username2) {
  const [analysis1, analysis2] = await Promise.all([
    analyzeAsGame(username1),
    analyzeAsGame(username2),
  ])

  return {
    player1: {
      name: analysis1.profile.name || analysis1.profile.login,
      archetype: analysis1.gameAnalysis.archetype.name,
      overallScore: analysis1.gameAnalysis.overallScore,
      metrics: analysis1.gameAnalysis.metrics,
    },
    player2: {
      name: analysis2.profile.name || analysis2.profile.login,
      archetype: analysis2.gameAnalysis.archetype.name,
      overallScore: analysis2.gameAnalysis.overallScore,
      metrics: analysis2.gameAnalysis.metrics,
    },
  }
}

/**
 * Get metrics by tier (Legendary/Epic/Rare/etc.)
 */
export async function getMetricsReport(metrics) {
  const { getMetricTier, getMetricDescription, getMetricColor } = await import('./gameScoringMetrics.js')

  return Object.entries(metrics).map(([metric, score]) => ({
    metric,
    score,
    tier: getMetricTier(score),
    description: getMetricDescription(metric, score),
    color: getMetricColor(score),
  }))
}

/**
 * Export stats for sharing
 */
export function generateShareableStats(analysis) {
  const { archetype, metrics, dnaTraits, achievements } = analysis.gameAnalysis
  const profileName = analysis.profile.name || analysis.profile.login

  return {
    name: profileName,
    archetype: archetype.name,
    overallScore: analysis.gameAnalysis.overallScore,
    topMetrics: Object.entries(metrics)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3)
      .map(([name, score]) => `${name}: ${Math.round(score)}`),
    topTraits: dnaTraits.slice(0, 5).map(t => `${t.emoji} ${t.name}`),
    achievementsCount: achievements.totalUnlocked,
    shareText: `I'm a ${archetype.name}! ${archetype.shareablePhrase}`,
  }
}

/**
 * Get roast by severity
 */
export function getRoast(analysis, severity = 'sarcastic') {
  const roasts = analysis.gameAnalysis.roasts
  return roasts[severity] || roasts.sarcastic
}

/**
 * Get archetype summary
 */
export function getArchetypeSummary(analysis) {
  const { archetype } = analysis.gameAnalysis
  return {
    ...archetype,
    summary: `${archetype.emoji} ${archetype.name} - ${archetype.description}`,
  }
}

/**
 * Get trait categories breakdown
 */
export function getTraitsByCategory(analysis) {
  const { dnaTraits } = analysis.gameAnalysis
  const byCategory = {}

  for (const trait of dnaTraits) {
    if (!byCategory[trait.category]) {
      byCategory[trait.category] = []
    }
    byCategory[trait.category].push(trait)
  }

  return byCategory
}

/**
 * Get achievement statistics
 */
export function getAchievementStats(analysis) {
  const { achievements } = analysis.gameAnalysis
  const progress = achievements.progress

  // Count by completion
  const nearlyComplete = Object.entries(progress)
    .filter(([_, p]) => p > 70 && p < 100)
    .map(([id]) => id)

  const inProgress = Object.entries(progress)
    .filter(([_, p]) => p > 0 && p <= 70)
    .map(([id]) => id)

  return {
    totalUnlocked: achievements.totalUnlocked,
    nearlyComplete: nearlyComplete.length,
    inProgress: inProgress.length,
    mostPopular: achievements.unlocked
      .sort((a, b) => b.unlockedPercentage - a.unlockedPercentage)
      .slice(0, 3),
  }
}

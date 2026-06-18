/**
 * Achievements System - 100+ unlockable achievements
 * Similar to Steam achievements, these unlock based on GitHub profile signals
 */

export const ACHIEVEMENTS = {
  // ============ STARTER ACHIEVEMENTS ============
  first_blood: {
    id: 'first_blood',
    name: 'First Blood',
    emoji: '🥇',
    description: 'Create your first repository.',
    trigger: { repositoryCount: { min: 1 } },
    rarity: 'common',
    unlockedPercentage: 100,
  },

  repo_squad: {
    id: 'repo_squad',
    name: 'Repo Squad',
    emoji: '👥',
    description: 'Create 5 repositories.',
    trigger: { repositoryCount: { min: 5 } },
    rarity: 'common',
    unlockedPercentage: 85,
  },

  repo_militia: {
    id: 'repo_militia',
    name: 'Repo Militia',
    emoji: '⚔️',
    description: 'Create 10 repositories.',
    trigger: { repositoryCount: { min: 10 } },
    rarity: 'common',
    unlockedPercentage: 65,
  },

  repo_army: {
    id: 'repo_army',
    name: 'Repo Army',
    emoji: '🎖️',
    description: 'Create 25 repositories.',
    trigger: { repositoryCount: { min: 25 } },
    rarity: 'uncommon',
    unlockedPercentage: 35,
  },

  repo_empire: {
    id: 'repo_empire',
    name: 'Repo Empire',
    emoji: '👑',
    description: 'Create 50+ repositories.',
    trigger: { repositoryCount: { min: 50 } },
    rarity: 'rare',
    unlockedPercentage: 12,
  },

  // ============ DOCUMENTATION ACHIEVEMENTS ============
  readme_enjoyer: {
    id: 'readme_enjoyer',
    name: 'README Enjoyer',
    emoji: '📝',
    description: 'Have a README over 500 words.',
    trigger: { readmeQuality: { min: 0.7 } },
    rarity: 'uncommon',
    unlockedPercentage: 25,
  },

  readme_novelist: {
    id: 'readme_novelist',
    name: 'README Novelist',
    emoji: '📚',
    description: 'Have a README over 2000 words.',
    trigger: { readmeQuality: { min: 0.9 }, avgReadmeLength: { min: 2000 } },
    rarity: 'rare',
    unlockedPercentage: 8,
  },

  documentation_cultist: {
    id: 'documentation_cultist',
    name: 'Documentation Cultist',
    emoji: '🙏',
    description: 'Have 90%+ documentation coverage.',
    trigger: { documentationScore: { min: 0.9 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  comment_warrior: {
    id: 'comment_warrior',
    name: 'Comment Warrior',
    emoji: '💬',
    description: 'Have 70%+ code comment density.',
    trigger: { codeCommentDensity: { min: 0.7 } },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  // ============ COMMIT ACHIEVEMENTS ============
  commit_addict: {
    id: 'commit_addict',
    name: 'Commit Addict',
    emoji: '💉',
    description: '100+ commits in 30 days.',
    trigger: { commitsLast30Days: { min: 100 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  commit_fiend: {
    id: 'commit_fiend',
    name: 'Commit Fiend',
    emoji: '👹',
    description: '500+ commits in 30 days.',
    trigger: { commitsLast30Days: { min: 500 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  thousand_strong: {
    id: 'thousand_strong',
    name: 'Thousand Strong',
    emoji: '💪',
    description: '1000+ total commits.',
    trigger: { totalCommits: { min: 1000 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  million_char_contributor: {
    id: 'million_char_contributor',
    name: 'Million Char Contributor',
    emoji: '📊',
    description: '1 million+ characters contributed.',
    trigger: { totalCharactersAdded: { min: 1000000 } },
    rarity: 'rare',
    unlockedPercentage: 8,
  },

  streak_master: {
    id: 'streak_master',
    name: 'Streak Master',
    emoji: '🔥',
    description: '30+ day commit streak.',
    trigger: { longestCommitStreak: { min: 30 } },
    rarity: 'uncommon',
    unlockedPercentage: 22,
  },

  daily_ritual: {
    id: 'daily_ritual',
    name: 'Daily Ritual',
    emoji: '☀️',
    description: 'Commit every day for 365 days.',
    trigger: { longestCommitStreak: { min: 365 } },
    rarity: 'legendary',
    unlockedPercentage: 2,
  },

  // ============ PROJECT ACHIEVEMENTS ============
  project_cleaner: {
    id: 'project_cleaner',
    name: 'Project Cleaner',
    emoji: '✨',
    description: 'Maintain 10+ completed projects.',
    trigger: { completedProjectCount: { min: 10 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  maintenance_guru: {
    id: 'maintenance_guru',
    name: 'Maintenance Guru',
    emoji: '🧘',
    description: 'Actively maintain 5+ projects.',
    trigger: { activelyMaintainedCount: { min: 5 } },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  ancient_keeper: {
    id: 'ancient_keeper',
    name: 'Ancient Keeper',
    emoji: '🏛️',
    description: 'Maintain a project for 10+ years.',
    trigger: { maxProjectAge: { min: 10 } },
    rarity: 'legendary',
    unlockedPercentage: 3,
  },

  infinite_side_quests: {
    id: 'infinite_side_quests',
    name: 'Infinite Side Quests',
    emoji: '🎮',
    description: '20+ repositories.',
    trigger: { repositoryCount: { min: 20 } },
    rarity: 'common',
    unlockedPercentage: 40,
  },

  project_graveyard: {
    id: 'project_graveyard',
    name: 'Project Graveyard',
    emoji: '👻',
    description: 'Have 10+ abandoned projects.',
    trigger: { abandonedProjectCount: { min: 10 } },
    rarity: 'uncommon',
    unlockedPercentage: 25,
  },

  // ============ QUALITY ACHIEVEMENTS ============
  test_warrior: {
    id: 'test_warrior',
    name: 'Test Warrior',
    emoji: '🧪',
    description: '70%+ test coverage.',
    trigger: { testingCoverage: { min: 0.7 } },
    rarity: 'uncommon',
    unlockedPercentage: 12,
  },

  test_zealot: {
    id: 'test_zealot',
    name: 'Test Zealot',
    emoji: '⚗️',
    description: '95%+ test coverage.',
    trigger: { testingCoverage: { min: 0.95 } },
    rarity: 'rare',
    unlockedPercentage: 3,
  },

  bug_exterminator: {
    id: 'bug_exterminator',
    name: 'Bug Exterminator',
    emoji: '🐛',
    description: 'Close 50+ issues.',
    trigger: { issuesClosed: { min: 50 } },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  bug_legendary: {
    id: 'bug_legendary',
    name: 'Bug Legendary',
    emoji: '🦟',
    description: 'Close 500+ issues.',
    trigger: { issuesClosed: { min: 500 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  zero_error_program: {
    id: 'zero_error_program',
    name: 'Zero Error Program',
    emoji: '✅',
    description: 'Have a project with zero open issues.',
    trigger: { perfectionProjectCount: { min: 1 } },
    rarity: 'rare',
    unlockedPercentage: 8,
  },

  // ============ COMMUNITY ACHIEVEMENTS ============
  open_source_wanderer: {
    id: 'open_source_wanderer',
    name: 'Open Source Wanderer',
    emoji: '🌍',
    description: 'Contribute to 5+ open source projects.',
    trigger: { openSourceContributions: { min: 5 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  open_source_nomad: {
    id: 'open_source_nomad',
    name: 'Open Source Nomad',
    emoji: '🧳',
    description: 'Contribute to 25+ open source projects.',
    trigger: { openSourceContributions: { min: 25 } },
    rarity: 'rare',
    unlockedPercentage: 6,
  },

  pr_master: {
    id: 'pr_master',
    name: 'PR Master',
    emoji: '🔗',
    description: '50+ pull requests.',
    trigger: { totalPullRequests: { min: 50 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  pr_legend: {
    id: 'pr_legend',
    name: 'PR Legend',
    emoji: '⚡',
    description: '500+ pull requests.',
    trigger: { totalPullRequests: { min: 500 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  star_collector: {
    id: 'star_collector',
    name: 'Star Collector',
    emoji: '⭐',
    description: 'Accumulate 1000+ stars.',
    trigger: { totalStars: { min: 1000 } },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  star_lord: {
    id: 'star_lord',
    name: 'Star Lord',
    emoji: '✨',
    description: 'Accumulate 10000+ stars.',
    trigger: { totalStars: { min: 10000 } },
    rarity: 'rare',
    unlockedPercentage: 4,
  },

  viral_sensation: {
    id: 'viral_sensation',
    name: 'Viral Sensation',
    emoji: '🚀',
    description: 'Have a project with 5000+ stars.',
    trigger: { maxRepoStars: { min: 5000 } },
    rarity: 'rare',
    unlockedPercentage: 6,
  },

  fork_farmer: {
    id: 'fork_farmer',
    name: 'Fork Farmer',
    emoji: '🌾',
    description: '100+ repository forks.',
    trigger: { totalForks: { min: 100 } },
    rarity: 'uncommon',
    unlockedPercentage: 12,
  },

  follower_milestone: {
    id: 'follower_milestone',
    name: 'Follower Milestone',
    emoji: '👥',
    description: '100+ followers.',
    trigger: { followers: { min: 100 } },
    rarity: 'uncommon',
    unlockedPercentage: 14,
  },

  influencer: {
    id: 'influencer',
    name: 'Influencer',
    emoji: '📱',
    description: '1000+ followers.',
    trigger: { followers: { min: 1000 } },
    rarity: 'rare',
    unlockedPercentage: 4,
  },

  celebrity_dev: {
    id: 'celebrity_dev',
    name: 'Celebrity Dev',
    emoji: '🎬',
    description: '10000+ followers.',
    trigger: { followers: { min: 10000 } },
    rarity: 'legendary',
    unlockedPercentage: 1,
  },

  // ============ TECH STACK ACHIEVEMENTS ============
  polyglot_programmer: {
    id: 'polyglot_programmer',
    name: 'Polyglot Programmer',
    emoji: '🗣️',
    description: 'Use 10+ different programming languages.',
    trigger: { uniqueLanguages: { min: 10 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  language_master: {
    id: 'language_master',
    name: 'Language Master',
    emoji: '🎓',
    description: 'Master 20+ programming languages.',
    trigger: { uniqueLanguages: { min: 20 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  monoglot: {
    id: 'monoglot',
    name: 'Monoglot',
    emoji: '☝️',
    description: '80%+ of repos in one language.',
    trigger: { mainLanguageRatio: { min: 0.8 } },
    rarity: 'common',
    unlockedPercentage: 35,
  },

  framework_collector: {
    id: 'framework_collector',
    name: 'Framework Collector',
    emoji: '🎨',
    description: 'Use 15+ different frameworks.',
    trigger: { uniqueFrameworks: { min: 15 } },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  typescript_evangelist: {
    id: 'typescript_evangelist',
    name: 'TypeScript Evangelist',
    emoji: '📘',
    description: '80%+ of projects use TypeScript.',
    trigger: { typescriptProjectRatio: { min: 0.8 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  // ============ SPECIALTY ACHIEVEMENTS ============
  ai_pioneer: {
    id: 'ai_pioneer',
    name: 'AI Pioneer',
    emoji: '🤖',
    description: '5+ AI/ML projects.',
    trigger: { aiMlProjectCount: { min: 5 } },
    rarity: 'rare',
    unlockedPercentage: 8,
  },

  cv_specialist: {
    id: 'cv_specialist',
    name: 'CV Specialist',
    emoji: '👁️',
    description: '5+ computer vision projects.',
    trigger: { cvProjectCount: { min: 5 } },
    rarity: 'rare',
    unlockedPercentage: 6,
  },

  robotics_builder: {
    id: 'robotics_builder',
    name: 'Robotics Builder',
    emoji: '🤖',
    description: '3+ robotics projects.',
    trigger: { roboticsProjectCount: { min: 3 } },
    rarity: 'rare',
    unlockedPercentage: 4,
  },

  backend_specialist: {
    id: 'backend_specialist',
    name: 'Backend Specialist',
    emoji: '⚙️',
    description: '80%+ backend coverage.',
    trigger: { backendCoverage: { min: 0.8 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  frontend_artist: {
    id: 'frontend_artist',
    name: 'Frontend Artist',
    emoji: '🎨',
    description: '80%+ frontend coverage.',
    trigger: { frontendCoverage: { min: 0.8 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  full_stack_hero: {
    id: 'full_stack_hero',
    name: 'Full Stack Hero',
    emoji: '⚔️',
    description: '60%+ backend and 60%+ frontend.',
    trigger: { backendCoverage: { min: 0.6 }, frontendCoverage: { min: 0.6 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  devops_master: {
    id: 'devops_master',
    name: 'DevOps Master',
    emoji: '🚀',
    description: '70%+ deployment coverage with CI/CD.',
    trigger: { deploymentCoverage: { min: 0.7 }, cicdSignal: { min: 0.6 } },
    rarity: 'rare',
    unlockedPercentage: 8,
  },

  // ============ TIME-BASED ACHIEVEMENTS ============
  night_owl: {
    id: 'night_owl',
    emoji: '🦉',
    name: 'Night Owl',
    description: '70%+ commits between 11 PM - 6 AM.',
    trigger: { nightCommitRatio: { min: 0.7 } },
    rarity: 'uncommon',
    unlockedPercentage: 16,
  },

  early_bird: {
    id: 'early_bird',
    name: 'Early Bird',
    emoji: '🐦',
    description: '70%+ commits between 5 AM - 9 AM.',
    trigger: { earlyCommitRatio: { min: 0.7 } },
    rarity: 'uncommon',
    unlockedPercentage: 12,
  },

  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    emoji: '⛑️',
    description: '70%+ commits on weekends.',
    trigger: { weekendCommitRatio: { min: 0.7 } },
    rarity: 'common',
    unlockedPercentage: 28,
  },

  weekday_warrior: {
    id: 'weekday_warrior',
    name: 'Weekday Warrior',
    emoji: '💼',
    description: '80%+ commits on weekdays.',
    trigger: { weekdayCommitRatio: { min: 0.8 } },
    rarity: 'common',
    unlockedPercentage: 35,
  },

  deploy_survivor: {
    id: 'deploy_survivor',
    name: 'Deployment Survivor',
    emoji: '🚀',
    description: 'Deploy to 3+ different platforms.',
    trigger: { platformsDeployed: { min: 3 } },
    rarity: 'uncommon',
    unlockedPercentage: 14,
  },

  // ============ SPEEDRUN ACHIEVEMENTS ============
  speedrunner: {
    id: 'speedrunner',
    name: 'Feature Speedrunner',
    emoji: '🏃',
    description: 'Ship 20+ features in 30 days.',
    trigger: { featuresShipped30Days: { min: 20 } },
    rarity: 'rare',
    unlockedPercentage: 6,
  },

  git_push_any_speedrun: {
    id: 'git_push_any_speedrun',
    name: 'Git Push Any% Speedrun',
    emoji: '⚡',
    description: '1000+ commits in a year.',
    trigger: { commitsLastYear: { min: 1000 } },
    rarity: 'uncommon',
    unlockedPercentage: 18,
  },

  // ============ MISC / QUIRKY ACHIEVEMENTS ============
  readme_enthusiast: {
    id: 'readme_enthusiast',
    name: 'README Enthusiast',
    emoji: '📄',
    description: 'Every project has a comprehensive README.',
    trigger: { readmeCompletion: { min: 0.95 } },
    rarity: 'uncommon',
    unlockedPercentage: 12,
  },

  changelog_keeper: {
    id: 'changelog_keeper',
    name: 'Changelog Keeper',
    emoji: '📋',
    description: 'Maintain a changelog for 10+ projects.',
    trigger: { changelogProjects: { min: 10 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  security_conscious: {
    id: 'security_conscious',
    name: 'Security Conscious',
    emoji: '🔒',
    description: '80%+ of projects have security headers.',
    trigger: { securityHeaderRatio: { min: 0.8 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  license_advocate: {
    id: 'license_advocate',
    name: 'License Advocate',
    emoji: '⚖️',
    description: '95%+ of repos have a license.',
    trigger: { licensedRepoRatio: { min: 0.95 } },
    rarity: 'uncommon',
    unlockedPercentage: 20,
  },

  contributor_friendly: {
    id: 'contributor_friendly',
    name: 'Contributor Friendly',
    emoji: '🤝',
    description: 'Have a CONTRIBUTING.md in 5+ projects.',
    trigger: { contributingGuides: { min: 5 } },
    rarity: 'uncommon',
    unlockedPercentage: 10,
  },

  always_shipping: {
    id: 'always_shipping',
    name: 'Always Shipping',
    emoji: '📦',
    description: '95%+ project completion rate.',
    trigger: { projectCompletionRate: { min: 0.95 } },
    rarity: 'rare',
    unlockedPercentage: 4,
  },

  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    emoji: '🔄',
    description: 'Return after 6+ months without commits.',
    trigger: { hasGaps: true, longestGap: { min: 6 }, isActive: true },
    rarity: 'uncommon',
    unlockedPercentage: 15,
  },

  silent_achiever: {
    id: 'silent_achiever',
    name: 'Silent Achiever',
    emoji: '🤐',
    description: '30+ repos with less than 100 followers.',
    trigger: { repositoryCount: { min: 30 }, followers: { max: 100 } },
    rarity: 'uncommon',
    unlockedPercentage: 14,
  },

  rising_star: {
    id: 'rising_star',
    name: 'Rising Star',
    emoji: '⭐',
    description: 'Gain 500+ followers in last year.',
    trigger: { followerGrowthYear: { min: 500 } },
    rarity: 'uncommon',
    unlockedPercentage: 12,
  },

  code_archaeologist: {
    id: 'code_archaeologist',
    name: 'Code Archaeologist',
    emoji: '🏺',
    description: 'Oldest repo is 10+ years old.',
    trigger: { maxProjectAge: { min: 10 } },
    rarity: 'rare',
    unlockedPercentage: 5,
  },

  tech_historian: {
    id: 'tech_historian',
    name: 'Tech Historian',
    emoji: '📚',
    description: 'Use a language from before 2000.',
    trigger: { legacyLanguages: { min: 1 } },
    rarity: 'uncommon',
    unlockedPercentage: 8,
  },
};

export function getAchievement(id) {
  return ACHIEVEMENTS[id] || null;
}

export function getAllAchievements() {
  return Object.values(ACHIEVEMENTS);
}

export function getAchievementsByRarity(rarity) {
  return Object.values(ACHIEVEMENTS).filter((a) => a.rarity === rarity);
}

export function calculateUnlockedAchievements(metrics) {
  // Determine which achievements the developer has unlocked
  const unlocked = [];
  for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
    if (matchesConditions(achievement.trigger, metrics)) {
      unlocked.push({ ...achievement, unlockedAt: new Date() });
    }
  }
  return unlocked;
}

export function calculateAchievementProgress(metrics) {
  // For each achievement, calculate progress toward unlocking (0-100%)
  const progress = {};
  for (const [id, achievement] of Object.entries(ACHIEVEMENTS)) {
    progress[id] = calculateProgress(achievement.trigger, metrics);
  }
  return progress;
}

function matchesConditions(conditions, metrics) {
  // Helper to check if all conditions are met
  if (!conditions) return false;

  for (const [key, condition] of Object.entries(conditions)) {
    const value = metrics[key];
    if (value === undefined) return false;

    if (condition.min && value < condition.min) return false;
    if (condition.max && value > condition.max) return false;
    if (condition.includes && !condition.includes.includes(value)) return false;
    if (typeof condition === 'boolean' && value !== condition) return false;
  }
  return true;
}

function calculateProgress(conditions, metrics) {
  // Return 0-100 representing progress toward achievement
  if (!conditions) return 0;
  if (matchesConditions(conditions, metrics)) return 100;

  let totalProgress = 0;
  let conditionCount = 0;

  for (const [key, condition] of Object.entries(conditions)) {
    const value = metrics[key] || 0;
    conditionCount++;

    if (condition.min) {
      totalProgress += Math.min(100, (value / condition.min) * 100);
    } else if (condition.max) {
      totalProgress += Math.max(0, ((condition.max - value) / condition.max) * 100);
    } else {
      totalProgress += 50; // Unknown condition, assume 50% progress
    }
  }

  return Math.round(totalProgress / conditionCount);
}

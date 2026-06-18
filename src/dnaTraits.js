/**
 * DNA Traits - 100 humorous, shareable developer personality traits
 * Each developer gets 8-12 traits based on their profile signals
 */

export const DNA_TRAITS = {
  // ============ DOCUMENTATION ============
  readme_maxxer: {
    id: 'readme_maxxer',
    name: 'README Maxxer',
    emoji: '📝',
    description: 'Your READMEs could be published as technical guides.',
    trigger: { readmeQuality: { min: 0.9 }, avgReadmeLength: { min: 1000 } },
    category: 'documentation',
    rarity: 'uncommon',
  },

  doc_cult_disciple: {
    id: 'doc_cult_disciple',
    name: 'Doc Cult Disciple',
    emoji: '📚',
    description: 'Every repo has a 50+ page manual. Documentation is your love language.',
    trigger: { documentationScore: { min: 0.85 }, readmeQuality: { min: 0.8 } },
    category: 'documentation',
    rarity: 'uncommon',
  },

  comment_evangelist: {
    id: 'comment_evangelist',
    name: 'Comment Evangelist',
    emoji: '💬',
    description: 'Your code is more commented than a politician\'s press release.',
    trigger: { codeCommentDensity: { min: 0.7 } },
    category: 'documentation',
    rarity: 'uncommon',
  },

  issue_template_architect: {
    id: 'issue_template_architect',
    name: 'Issue Template Architect',
    emoji: '🏗️',
    description: 'Your issue templates are works of art.',
    trigger: { issueTemplateQuality: { min: 0.8 }, repositoryCount: { min: 5 } },
    category: 'documentation',
    rarity: 'rare',
  },

  // ============ COMMITS & BEHAVIOR ============
  commit_goblin: {
    id: 'commit_goblin',
    name: 'Commit Goblin',
    emoji: '🐉',
    description: '300+ commits in the last 3 months. The commit scroll is your personal art gallery.',
    trigger: { commitsLast90Days: { min: 300 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  last_minute_committer: {
    id: 'last_minute_committer',
    name: 'Last Minute Committer',
    emoji: '⏰',
    description: 'Your commits arrive in 3 AM bursts. Deadlines are your fuel.',
    trigger: { commitBurstiness: { min: 0.7 }, lateNightCommits: { min: 0.6 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    emoji: '⛑️',
    description: 'Your commits arrive like clockwork on weekends.',
    trigger: { weekendCommitRatio: { min: 0.7 }, weekdayCommitRatio: { max: 0.3 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  night_shift_phantom: {
    id: 'night_shift_phantom',
    name: 'Night Shift Phantom',
    emoji: '🌙',
    description: 'Your best commits happen when the sun is down.',
    trigger: { nightCommitRatio: { min: 0.7 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  steady_eddie: {
    id: 'steady_eddie',
    name: 'Steady Eddie',
    emoji: '⏳',
    description: 'Your commit pattern is more reliable than a Swiss watch.',
    trigger: { commitConsistency: { min: 0.85 }, commitFrequency: { min: 0.4 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  merge_conflict_magnet: {
    id: 'merge_conflict_magnet',
    name: 'Merge Conflict Magnet',
    emoji: '⚔️',
    description: 'Merge conflicts are your natural predator.',
    trigger: { mergeConflictFrequency: { min: 0.6 } },
    category: 'commit_behavior',
    rarity: 'rare',
  },

  keyboard_barbarian: {
    id: 'keyboard_barbarian',
    name: 'Keyboard Barbarian',
    emoji: '⌨️',
    description: 'Your commit messages are... creative. Interpretive, even.',
    trigger: { commitMessageQuality: { max: 0.3 }, commitFrequency: { min: 0.7 } },
    category: 'commit_behavior',
    rarity: 'uncommon',
  },

  // ============ PROJECT BEHAVIOR ============
  framework_collector: {
    id: 'framework_collector',
    name: 'Framework Collector',
    emoji: '🎨',
    description: 'You\'ve tried 12+ frameworks. Commitment issues? What are those?',
    trigger: { frameworkCount: { min: 12 }, projectCount: { min: 15 } },
    category: 'project_behavior',
    rarity: 'common',
  },

  infinite_side_quests: {
    id: 'infinite_side_quests',
    name: 'Infinite Side Quests',
    emoji: '🎮',
    description: '20+ repos and counting. You are a quest generator.',
    trigger: { repositoryCount: { min: 20 }, completedProjectRatio: { max: 0.5 } },
    category: 'project_behavior',
    rarity: 'common',
  },

  project_abandoner: {
    id: 'project_abandoner',
    name: 'Project Abandoner',
    emoji: '👻',
    description: 'Your GitHub is a graveyard of "will finish someday" projects.',
    trigger: { projectAbandonmentRate: { min: 0.6 } },
    category: 'project_behavior',
    rarity: 'common',
  },

  starter_never_finisher: {
    id: 'starter_never_finisher',
    name: 'Starter Never Finisher',
    emoji: '🚀',
    description: 'You start projects like others eat snacks. Finishing? Nah.',
    trigger: { completedProjectRatio: { max: 0.3 }, repositoryCount: { min: 10 } },
    category: 'project_behavior',
    rarity: 'common',
  },

  master_maintainer: {
    id: 'master_maintainer',
    name: 'Master Maintainer',
    emoji: '🛠️',
    description: 'Your projects have more birthdays than most people.',
    trigger: { maintenanceScore: { min: 0.8 }, projectAge: { min: 5 } },
    category: 'project_behavior',
    rarity: 'uncommon',
  },

  refactor_perfectionist: {
    id: 'refactor_perfectionist',
    name: 'Refactor Perfectionist',
    emoji: '♞',
    description: 'Your commit messages contain "refactor" more than any verb.',
    trigger: { refactorCommitRatio: { min: 0.4 } },
    category: 'project_behavior',
    rarity: 'uncommon',
  },

  // ============ TECHNICAL DEPTH ============
  full_stack_generalist: {
    id: 'full_stack_generalist',
    name: 'Full Stack Generalist',
    emoji: '⚙️',
    description: 'You know a little bit about everything and deep stuff about nothing.',
    trigger: { backendCoverage: { min: 0.5 }, frontendCoverage: { min: 0.5 }, specialization: { max: 0.4 } },
    category: 'technical_depth',
    rarity: 'common',
  },

  backend_devotee: {
    id: 'backend_devotee',
    name: 'Backend Devotee',
    emoji: '🔌',
    description: 'Frontend is magic you refuse to understand.',
    trigger: { backendCoverage: { min: 0.75 }, frontendCoverage: { max: 0.25 } },
    category: 'technical_depth',
    rarity: 'uncommon',
  },

  frontend_supremacist: {
    id: 'frontend_supremacist',
    name: 'Frontend Supremacist',
    emoji: '🎭',
    description: 'CSS is your love language. Databases? What are those?',
    trigger: { frontendCoverage: { min: 0.75 }, backendCoverage: { max: 0.25 } },
    category: 'technical_depth',
    rarity: 'uncommon',
  },

  devops_visionary: {
    id: 'devops_visionary',
    name: 'DevOps Visionary',
    emoji: '🚀',
    description: 'Your CI/CD pipeline is more sophisticated than most applications.',
    trigger: { cicdSignal: { min: 0.75 }, deploymentCoverage: { min: 0.7 } },
    category: 'technical_depth',
    rarity: 'rare',
  },

  // ============ TESTING & QUALITY ============
  test_obsessive: {
    id: 'test_obsessive',
    name: 'Test Obsessive',
    emoji: '🧪',
    description: 'Your test coverage is higher than your sanity level.',
    trigger: { testingCoverage: { min: 0.9 } },
    category: 'quality',
    rarity: 'uncommon',
  },

  bug_whisperer: {
    id: 'bug_whisperer',
    name: 'Bug Whisperer',
    emoji: '🐛',
    description: 'You close issues faster than they\'re created. Issues fear you.',
    trigger: { issueClosureRate: { min: 0.85 }, issueResponseTime: { max: 3 } },
    category: 'quality',
    rarity: 'uncommon',
  },

  quality_zealot: {
    id: 'quality_zealot',
    name: 'Quality Zealot',
    emoji: '✅',
    description: 'Your code reviews take longer than the original development.',
    trigger: { codeReviewCount: { min: 0.7 }, prReviewTime: { max: 2 } },
    category: 'quality',
    rarity: 'rare',
  },

  error_handler_supreme: {
    id: 'error_handler_supreme',
    name: 'Error Handler Supreme',
    emoji: '⚠️',
    description: 'Your error handling code is longer than your business logic.',
    trigger: { errorHandlingScore: { min: 0.85 } },
    category: 'quality',
    rarity: 'uncommon',
  },

  // ============ INNOVATION & EXPERIMENTATION ============
  ai_summoner: {
    id: 'ai_summoner',
    name: 'AI Summoner',
    emoji: '✨',
    description: 'You\'ve trained ${count} models. Deployment status: TBD.',
    trigger: { aiMlCoverage: { min: 0.5 }, aiMlProjectCount: { min: 3 } },
    category: 'innovation',
    rarity: 'uncommon',
  },

  dataset_dragon: {
    id: 'dataset_dragon',
    name: 'Dataset Dragon',
    emoji: '🐉',
    description: 'Your repos contain more data than code.',
    trigger: { avgRepoSize: { min: 100000 }, datasetReferences: { min: 3 } },
    category: 'innovation',
    rarity: 'rare',
  },

  ml_experimenter: {
    id: 'ml_experimenter',
    name: 'ML Experimenter',
    emoji: '🧬',
    description: 'You approach machine learning like a chef approaches recipes.',
    trigger: { aiMlCoverage: { min: 0.6 }, projectDiversity: { min: 0.5 } },
    category: 'innovation',
    rarity: 'uncommon',
  },

  vision_pioneer: {
    id: 'vision_pioneer',
    name: 'Vision Pioneer',
    emoji: '👁️',
    description: 'Computer vision is your playground.',
    trigger: { computerVisionCoverage: { min: 0.5 }, cvProjectCount: { min: 3 } },
    category: 'innovation',
    rarity: 'uncommon',
  },

  automation_architect: {
    id: 'automation_architect',
    name: 'Automation Architect',
    emoji: '⚙️',
    description: 'You automate things most people don\'t even know can be automated.',
    trigger: { automationCoverage: { min: 0.6 }, shellScriptCount: { min: 10 } },
    category: 'innovation',
    rarity: 'uncommon',
  },

  robotics_tinkerer: {
    id: 'robotics_tinkerer',
    name: 'Robotics Tinkerer',
    emoji: '🤖',
    description: 'You build things that move. Sometimes they do what you want.',
    trigger: { roboticsCoverage: { min: 0.5 }, roboticsProjectCount: { min: 2 } },
    category: 'innovation',
    rarity: 'rare',
  },

  experimental_alchemist: {
    id: 'experimental_alchemist',
    name: 'Experimental Alchemist',
    emoji: '🧪',
    description: 'Your repos are your laboratory. The results? Unpredictable.',
    trigger: { experimentalProjects: { min: 0.4 }, chaosScore: { min: 0.6 } },
    category: 'innovation',
    rarity: 'uncommon',
  },

  // ============ COMMUNITY & CONTRIBUTION ============
  open_source_nomad: {
    id: 'open_source_nomad',
    name: 'Open Source Nomad',
    emoji: '🌍',
    description: 'You have more PRs than personal projects. Community > Self.',
    trigger: { openSourceRatio: { min: 0.6 }, prCount: { min: 20 } },
    category: 'community',
    rarity: 'uncommon',
  },

  pr_addict: {
    id: 'pr_addict',
    name: 'PR Addict',
    emoji: '🔗',
    description: 'Your GitHub notification bell never stops ringing.',
    trigger: { prCount: { min: 50 }, openSourceRatio: { min: 0.5 } },
    category: 'community',
    rarity: 'uncommon',
  },

  license_advocate: {
    id: 'license_advocate',
    name: 'License Advocate',
    emoji: '⚖️',
    description: 'Every project has a license. You are very serious about this.',
    trigger: { licensedRepoRatio: { min: 0.9 } },
    category: 'community',
    rarity: 'uncommon',
  },

  fork_farmer: {
    id: 'fork_farmer',
    name: 'Fork Farmer',
    emoji: '🌾',
    description: 'Your fork-to-original ratio is suspiciously high.',
    trigger: { forkRatio: { min: 0.5 } },
    category: 'community',
    rarity: 'uncommon',
  },

  github_ghostwriter: {
    id: 'github_ghostwriter',
    name: 'GitHub Ghostwriter',
    emoji: '👻',
    description: 'You have 2 followers and 50 starred repos. Quiet supporter.',
    trigger: { followerCount: { max: 10 }, starredCount: { min: 50 } },
    category: 'community',
    rarity: 'common',
  },

  issue_reporter_supreme: {
    id: 'issue_reporter_supreme',
    name: 'Issue Reporter Supreme',
    emoji: '📋',
    description: 'You report issues more than you fix them. Still valuable.',
    trigger: { issueReportCount: { min: 30 }, issueFixCount: { max: 10 } },
    category: 'community',
    rarity: 'uncommon',
  },

  // ============ DEPENDENCIES & TOOLING ============
  dependency_minimalist: {
    id: 'dependency_minimalist',
    name: 'Dependency Minimalist',
    emoji: '📦',
    description: 'Your package.json could fit on a sticky note.',
    trigger: { avgDependencies: { max: 5 } },
    category: 'tooling',
    rarity: 'uncommon',
  },

  dependency_collector: {
    id: 'dependency_collector',
    name: 'Dependency Collector',
    emoji: '📦',
    description: 'Your node_modules folder is larger than a Linux distro.',
    trigger: { avgDependencies: { min: 30 }, projectCount: { min: 5 } },
    category: 'tooling',
    rarity: 'common',
  },

  tooling_wizard: {
    id: 'tooling_wizard',
    name: 'Tooling Wizard',
    emoji: '⚙️',
    description: 'You\'ve optimized every build tool known to humankind.',
    trigger: { buildOptimizations: { min: 0.8 } },
    category: 'tooling',
    rarity: 'rare',
  },

  typescript_evangelist: {
    id: 'typescript_evangelist',
    name: 'TypeScript Evangelist',
    emoji: '📘',
    description: 'Your type system has a type system.',
    trigger: { typescriptProjects: { min: 0.8 } },
    category: 'tooling',
    rarity: 'uncommon',
  },

  linter_perfectionist: {
    id: 'linter_perfectionist',
    name: 'Linter Perfectionist',
    emoji: '✨',
    description: 'Your linter config is more complex than your application.',
    trigger: { linterConfig: { min: 0.9 } },
    category: 'tooling',
    rarity: 'uncommon',
  },

  // ============ PROFILE VIBES ============
  silent_achiever: {
    id: 'silent_achiever',
    name: 'Silent Achiever',
    emoji: '🤐',
    description: 'Your output speaks louder than your followers.',
    trigger: { followerCount: { max: 50 }, repositoryCount: { min: 30 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  viral_sensation: {
    id: 'viral_sensation',
    name: 'Viral Sensation',
    emoji: '🌟',
    description: 'One of your repos blew up. Now people watch everything you do.',
    trigger: { maxRepoStars: { min: 5000 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  consistent_contributor: {
    id: 'consistent_contributor',
    name: 'Consistent Contributor',
    emoji: '📊',
    description: 'Your commit graph is a perfectly filled calendar.',
    trigger: { commitConsistency: { min: 0.9 }, totalCommits: { min: 1000 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  comeback_kid: {
    id: 'comeback_kid',
    name: 'Comeback Kid',
    emoji: '🔄',
    description: 'You took a break, but you\'re back and shipping harder than ever.',
    trigger: { lastActivityGap: { min: 3 }, recentActivityScore: { min: 0.7 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  rising_star: {
    id: 'rising_star',
    name: 'Rising Star',
    emoji: '⭐',
    description: 'Your growth trajectory is better than your repos.',
    trigger: { followerGrowth: { min: 0.5 }, recentProjectQuality: { min: 0.7 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  code_archaeologist: {
    id: 'code_archaeologist',
    name: 'Code Archaeologist',
    emoji: '🏛️',
    description: 'Your oldest repo is older than some developers.',
    trigger: { projectAge: { min: 10 } },
    category: 'vibe',
    rarity: 'uncommon',
  },

  tech_historian: {
    id: 'tech_historian',
    name: 'Tech Historian',
    emoji: '📚',
    description: 'You maintain code from the era before npm.',
    trigger: { languages: { includes: ['COBOL', 'Fortran', 'Pascal', 'Perl'] } },
    category: 'vibe',
    rarity: 'rare',
  },

  // ============ QUIRKY / MISC ============
  stackoverflow_archaeologist: {
    id: 'stackoverflow_archaeologist',
    name: 'StackOverflow Archaeologist',
    emoji: '🔍',
    description: 'Your commits reference Stack Overflow more than your own docs.',
    trigger: { soReferences: { min: 10 } },
    category: 'misc',
    rarity: 'common',
  },

  tutorial_survivor: {
    id: 'tutorial_survivor',
    name: 'Tutorial Survivor',
    emoji: '🎓',
    description: 'Started with tutorials, now you\'re shipping production code.',
    trigger: { tutorialReferences: { min: 5 }, recentProjectQuality: { min: 0.7 } },
    category: 'misc',
    rarity: 'common',
  },

  readme_driven_developer: {
    id: 'readme_driven_developer',
    name: 'README Driven Developer',
    emoji: '📖',
    description: 'You write the README before the code. The right way.',
    trigger: { readmeDrivenRatio: { min: 0.8 } },
    category: 'misc',
    rarity: 'uncommon',
  },

  git_commit_artist: {
    id: 'git_commit_artist',
    name: 'Git Commit Artist',
    emoji: '🎨',
    description: 'Your commit messages are poetry. Occasionally comprehensible poetry.',
    trigger: { commitMessageCreativity: { min: 0.7 } },
    category: 'misc',
    rarity: 'uncommon',
  },

  chaos_enthusiast: {
    id: 'chaos_enthusiast',
    name: 'Chaos Enthusiast',
    emoji: '⚡',
    description: 'Your development workflow is a beautiful disaster.',
    trigger: { chaosScore: { min: 0.7 } },
    category: 'misc',
    rarity: 'common',
  },

  feature_speedrunner: {
    id: 'feature_speedrunner',
    name: 'Feature Speedrunner',
    emoji: '🏃',
    description: 'You ship features at breakneck speed. Tests? Next iteration.',
    trigger: { commitFrequency: { min: 0.9 }, testingCoverage: { max: 0.2 } },
    category: 'misc',
    rarity: 'common',
  },

  perfectionist_developer: {
    id: 'perfectionist_developer',
    name: 'Perfectionist Developer',
    emoji: '💎',
    description: 'Your repos are pristine. Your life? Still a work in progress.',
    trigger: { codeQuality: { min: 0.9 }, commitConsistency: { min: 0.8 } },
    category: 'misc',
    rarity: 'uncommon',
  },

  multi_language_maverick: {
    id: 'multi_language_maverick',
    name: 'Multi-Language Maverick',
    emoji: '🗣️',
    description: 'You\'re comfortable in 8+ languages. Natively fluent in none.',
    trigger: { languageCount: { min: 8 } },
    category: 'misc',
    rarity: 'uncommon',
  },

  one_language_warrior: {
    id: 'one_language_warrior',
    name: 'One Language Warrior',
    emoji: '⚔️',
    description: 'You picked a language and stuck with it. Respect.',
    trigger: { mainLanguageRatio: { min: 0.8 }, languageCount: { max: 3 } },
    category: 'misc',
    rarity: 'uncommon',
  },

  ancient_language_keeper: {
    id: 'ancient_language_keeper',
    name: 'Ancient Language Keeper',
    emoji: '👴',
    description: 'You maintain code in languages the industry forgot.',
    trigger: { legacyLanguages: { min: 3 } },
    category: 'misc',
    rarity: 'rare',
  },

  // Add more trait options...
};

// Helper functions
export function getTrait(id) {
  return DNA_TRAITS[id] || null;
}

export function getTraitsByCategory(category) {
  return Object.values(DNA_TRAITS).filter((t) => t.category === category);
}

export function getAllTraits() {
  return Object.values(DNA_TRAITS);
}

export function calculateTraitScores(metrics) {
  // Score all traits based on metric values
  const scores = {};
  for (const [id, trait] of Object.entries(DNA_TRAITS)) {
    scores[id] = calculateTraitScore(trait, metrics);
  }
  return scores;
}

function calculateTraitScore(trait, metrics) {
  // Returns 0-1 score for how well this trait applies
  if (!trait.trigger) return 0;

  let score = 1.0;
  for (const [key, condition] of Object.entries(trait.trigger)) {
    const value = metrics[key];
    if (value === undefined) {
      score *= 0.5; // Reduce score if metric not available
      continue;
    }

    if (condition.min && value < condition.min) return 0;
    if (condition.max && value > condition.max) return 0;
    if (condition.includes && !condition.includes.includes(value)) return 0;
  }
  return score;
}

export function selectTraitsForDeveloper(metrics, count = 10) {
  // Select top N traits that apply to this developer
  const scores = calculateTraitScores(metrics);
  return Object.entries(scores)
    .filter(([_, score]) => score > 0)
    .sort(([_, a], [__, b]) => b - a)
    .slice(0, count)
    .map(([id]) => DNA_TRAITS[id]);
}

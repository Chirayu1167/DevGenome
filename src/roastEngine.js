/**
 * Roast Engine - Generate context-aware, funny roasts
 * Roasts are tailored to archetype and profile data, never random
 */

export const ROAST_TEMPLATES = {
  // ============ AI ALCHEMIST ============
  ai_alchemist: {
    gentle: [
      '${name} has explored ${modelCount} AI models and learned from all of them. (Deployed: ${deployedCount})',
      'The AI Alchemist has summoned ${modelCount} models. Still perfecting the recipe.',
      '${name} lives in Jupyter notebooks. Deployment is a theoretical concept.',
    ],
    sarcastic: [
      '${name} has trained ${modelCount} models that the world will never see.',
      'Your datasets are magnificent. Your deployment strategy? Imaginative.',
      '${name} keeps discovering "just one more technique" before shipping.',
    ],
    brutal: [
      '${name} has ${modelCount} undeployed models. This is a hostage situation.',
      'Your GitHub is a graveyard of abandoned models. Pick one and ship it.',
      'You\'ve created more models than most people have tried recipes.',
    ],
  },

  // ============ DATASET HOARDER ============
  dataset_hoarder: {
    gentle: [
      '${name} has ${totalSize}MB of data across repos. The ratio is... creative.',
      'Your datasets are vast. Your documentation of them is... optional.',
    ],
    sarcastic: [
      '${name}\'s repos are ${codePercentage}% data, ${docPercentage}% documentation, ${codePercentage}% code.',
      'You\'ve collected more datasets than most countries collect taxes.',
    ],
    brutal: [
      '${name}, you have so much data you could start your own data warehousing company.',
      'Your node_modules are actually just datasets at this point.',
    ],
  },

  // ============ DOCUMENTATION CULTIST ============
  documentation_cultist: {
    gentle: [
      '${name}\'s README is longer than some dissertations.',
      'Your documentation is so good it has its own documentation.',
    ],
    sarcastic: [
      '${name}, your README is longer than the actual code. Well played.',
      'You\'ve written more in READMEs than most people write in a year.',
    ],
    brutal: [
      'Is that a README or a novel? ${name} has blurred the line.',
      'Your documentation is a cry for help that\'s very well explained.',
    ],
  },

  // ============ FULL STACK MERCENARY ============
  full_stack_mercenary: {
    gentle: [
      '${name} is a jack of all trades. Master of shipping things.',
      'You know frontend, backend, and deployment. That\'s basically everything.',
    ],
    sarcastic: [
      '${name} works on both sides of the stack. Scary.',
      'You\'re equally dangerous with a database and a CSS file.',
    ],
    brutal: [
      '${name}, you\'ve weaponized full-stack development.',
      'You\'re the type to ship a complete product alone. Respect and fear.',
    ],
  },

  // ============ BACKEND WARLOCK ============
  backend_warlock: {
    gentle: [
      '${name}, you\'ve mastered the backend. The frontend remains a mystery.',
      'Your database optimization skills are legendary.',
    ],
    sarcastic: [
      '${name} thinks "user interface" is a debug log level.',
      'To ${name}, CSS is a form of witchcraft they refuse to learn.',
    ],
    brutal: [
      '${name} views the frontend like a Lovecraftian horror.',
      'Your backend is beautiful. Your fear of buttons is palpable.',
    ],
  },

  // ============ FRONTEND BARD ============
  frontend_bard: {
    gentle: [
      '${name}, your CSS is a work of art.',
      'You make pixels dance. Literally.',
    ],
    sarcastic: [
      '${name} thinks a database is something in DevTools.',
      'Your animation skills are unmatched. Your SQL skills? Unknown.',
    ],
    brutal: [
      'Backend is a language ${name} refuses to learn.',
      'You\'ve optimized styling more than server response times.',
    ],
  },

  // ============ OPEN SOURCE NOMAD ============
  open_source_nomad: {
    gentle: [
      '${name} has contributed to ${projectCount} open source projects.',
      'Your PR count (${prCount}) is higher than your repo count.',
    ],
    sarcastic: [
      '${name}, your GitHub identity is basically just a list of pull requests.',
      'You\'ve touched more repos than most people have dreamed of.',
    ],
    brutal: [
      '${name}, your personal projects are outnumbered by your contributions.',
      'You\'ve PR-ed your way into multiple GitHub Hall of Fame categories.',
    ],
  },

  // ============ REFACTOR KNIGHT ============
  refactor_knight: {
    gentle: [
      '${name} has refactored ${refactorCount} times. Commitment to quality.',
      'Your commit messages are ${refactorPercentage}% "refactor".',
    ],
    sarcastic: [
      '${name}, I have a theory: you refactor because you love it, not because it\'s necessary.',
      'Your refactor commits outnumber your feature commits.',
    ],
    brutal: [
      'At ${name}\'s pace, you\'ll finish refactoring that file in ${yearsToFinish} years.',
      'Somewhere, a project deadline is crying because ${name} wants to "optimize one more thing".',
    ],
  },

  // ============ CHAOS ENGINEER ============
  chaos_engineer: {
    gentle: [
      '${name}\'s commit history is... unpredictable.',
      'Your development pattern suggests you don\'t believe in schedules.',
    ],
    sarcastic: [
      '${name} treats Git like it\'s a choose-your-own-adventure book.',
      'Your commits are timed like a person discovering coffee.',
    ],
    brutal: [
      '${name}\'s GitHub activity graph looks like a seismic readout.',
      'Does a pattern exist? Asking for a friend (who needs to deploy).',
    ],
  },

  // ============ BUG HUNTER ============
  bug_hunter: {
    gentle: [
      '${name} has closed ${issuesClosed} issues. The code thanks them.',
      'Your issue closure rate is... inhuman.',
    ],
    sarcastic: [
      'Bugs fear ${name}. Seriously.',
      '${name} closes issues faster than people can create them.',
    ],
    brutal: [
      'If GitHub was a warzone, ${name} would be a general.',
      'Your kryptonite is an open issue lasting more than a day.',
    ],
  },

  // ============ FRAMEWORK COLLECTOR ============
  framework_collector: {
    gentle: [
      '${name} has tried ${frameworkCount} frameworks. Adventure enthusiast.',
      'You\'re always learning something new.',
    ],
    sarcastic: [
      'By the time ${name} finishes a project, there\'s already a better framework.',
      'Your framework resume is longer than your project list.',
    ],
    brutal: [
      '${name}, you\'ve written more "hello world" apps than actual apps.',
      'Your GitHub is a framework museum exhibit.',
    ],
  },

  // ============ NIGHT SHIFT CODER ============
  night_shift_coder: {
    gentle: [
      '${name} commits between 11 PM and 6 AM. Vampire status: confirmed.',
      'Your peak productivity is when others sleep.',
    ],
    sarcastic: [
      'The sun hasn\'t seen ${name}\'s best work in years.',
      'Your circadian rhythm is just a suggestion.',
    ],
    brutal: [
      '${name}, your commits are basically a cry for help at 3 AM.',
      'Somewhere, a sleep scientist is studying your GitHub graph.',
    ],
  },

  // ============ SPEEDRUNNER ============
  feature_speedrunner: {
    gentle: [
      '${name} ships features like they\'re going out of style.',
      'Your velocity is impressive. Your test coverage is... a work in progress.',
    ],
    sarcastic: [
      '${name}\'s deployment strategy: ship it, fix it later.',
      'You and "deployment-ready code" have different definitions.',
    ],
    brutal: [
      '${name} moves so fast that bugs have to run to catch up.',
      'Your code works. It probably shouldn\'t, but it does.',
    ],
  },

  // ============ SILENT BUILDER ============
  silent_builder: {
    gentle: [
      '${name} has ${repoCount} repos with ${followerCount} followers.',
      'Your impact is understated.',
    ],
    sarcastic: [
      'The GitHub community has no idea how productive ${name} is.',
      '${name}, you\'re basically GitHub\'s best-kept secret.',
    ],
    brutal: [
      'You\'re the developer other developers don\'t know they admire.',
      '${name}, your code has more followers than you do.',
    ],
  },

  // ============ AI SUMMONER ============
  ai_summoner: {
    gentle: [
      '${name} has summoned ${modelCount} AI models this year.',
      'Your experimental approach is commendable.',
    ],
    sarcastic: [
      '${name}, you\'ve created more models than some companies ship products.',
      'The only thing more theoretical than your models is your deployment plan.',
    ],
    brutal: [
      '${name}\'s model graveyard is larger than most people\'s career.',
      'You\'ve trained enough models to power a small nation.',
    ],
  },

  // ============ ROBOTICS TINKERER ============
  robotics_tinkerer: {
    gentle: [
      '${name}\'s robots are more reliable than most software.',
      'Your hardware integration skills are solid.',
    ],
    sarcastic: [
      'Your robots work better than your code. Probably.',
      '${name}, you\'ve built things that actually move. Respect.',
    ],
    brutal: [
      'Your robots have fewer bugs than your software. Think about that.',
      'If ${name} applied their robotics skills to code, the world would break.',
    ],
  },

  // ============ TERMINAL MONK ============
  terminal_monk: {
    gentle: [
      '${name}\'s bash scripts are legendary.',
      'You\'ve achieved automation enlightenment.',
    ],
    sarcastic: [
      '${name}\'s shell scripts are indecipherable to normal humans.',
      'You\'ve spent more time in the terminal than in your shell.',
    ],
    brutal: [
      'If the terminal was a language, ${name} would be fluent in dialects nobody else knows.',
      'Your one-liners could power a startup.',
    ],
  },

  // ============ LAST MINUTE COMMITTER ============
  last_minute_committer: {
    gentle: [
      '${name}\'s commits arrive in ${batchSize}-line bursts at odd hours.',
      'Your deadline-driven development style is... reliable.',
    ],
    sarcastic: [
      'The 3 AM commit surge is ${name}\'s natural rhythm.',
      'You\'ve turned procrastination into an art form.',
    ],
    brutal: [
      '${name}, your commit history is a panic log.',
      'Your code works despite your deadline strategy.',
    ],
  },

  // ============ WEEKDAY WARRIOR ============
  weekday_warrior: {
    gentle: [
      '${name} commits consistently on weekdays.',
      'Your work-life balance is... structured.',
    ],
    sarcastic: [
      '${name}, your weekend commits count is basically zero. Very professional.',
      'You\'ve mastered the art of 9-to-5 development.',
    ],
    brutal: [
      'The weekend is when ${name}\'s code rests.',
      'Your commit graph has weekdays. Not mistakes.',
    ],
  },

  // Default fallback
  default: [
    '${name}, your GitHub profile is a unique journey.',
    'We have no idea what you are, but we admire it.',
  ],
};

/**
 * Generate a roast for a developer based on their profile and archetype
 */
export function generateRoast(profile, dna, archetype, severity = 'sarcastic') {
  if (!profile || !archetype) return 'Your profile is too mysterious to roast.';

  const templates = ROAST_TEMPLATES[archetype.id] || ROAST_TEMPLATES.default;
  const roastPool = templates[severity] || templates.sarcastic || templates.default || ['Your profile speaks for itself.'];

  // Pick a random roast template
  const template = roastPool[Math.floor(Math.random() * roastPool.length)];

  // Gather contextual data
  const context = {
    name: profile.name || profile.login,
    login: profile.login,
    repoCount: dna.stats.publicRepos,
    followerCount: dna.stats.followers,
    starCount: dna.stats.totalStars,
    totalCommits: dna.scoring.totalCommits || 0,
    modelCount: estimateModelCount(dna),
    deployedCount: estimateDeployedCount(dna),
    totalSize: Math.round((dna.stats.totalSize || 0) / 1024 / 1024),
    codePercentage: estimateCodePercentage(dna),
    docPercentage: estimateDocPercentage(dna),
    projectCount: dna.stats.publicRepos,
    prCount: dna.scoring.pullRequestScore || 0,
    issuesClosed: estimateIssuesClosed(dna),
    frameworkCount: estimateFrameworkCount(dna),
    refactorCount: estimateRefactorCount(dna),
    yearsToFinish: estimateRefactorYears(dna),
    batchSize: estimateBatchSize(dna),
  };

  // Replace template variables
  return replaceTemplateVariables(template, context);
}

/**
 * Generate roasts for all severity levels
 */
export function generateAllRoasts(profile, dna, archetype) {
  return {
    gentle: generateRoast(profile, dna, archetype, 'gentle'),
    sarcastic: generateRoast(profile, dna, archetype, 'sarcastic'),
    brutal: generateRoast(profile, dna, archetype, 'brutal'),
  };
}

/**
 * Generate a random roast from any archetype
 */
export function generateRandomRoast(profile, dna) {
  const allArchetypes = Object.keys(ROAST_TEMPLATES);
  const randomArchetype = allArchetypes[Math.floor(Math.random() * allArchetypes.length)];
  const severities = ['gentle', 'sarcastic', 'brutal'];
  const randomSeverity = severities[Math.floor(Math.random() * severities.length)];

  return generateRoast(profile, dna, { id: randomArchetype }, randomSeverity);
}

// ============ ESTIMATION HELPERS ============

function estimateModelCount(dna) {
  return Math.max(1, Math.floor((dna.scoring.aiMlCoverage || 0) * 20));
}

function estimateDeployedCount(dna) {
  return Math.max(0, Math.floor((dna.scoring.deploymentCoverage || 0) * 5));
}

function estimateCodePercentage(dna) {
  return Math.round((1 - (dna.scoring.codePercentage || 0.3)) * 100);
}

function estimateDocPercentage(dna) {
  return Math.round((dna.scoring.documentationScore || 0.1) * 100);
}

function estimateIssuesClosed(dna) {
  return Math.floor(Math.max(0, (dna.stats.publicRepos || 1) * 5));
}

function estimateFrameworkCount(dna) {
  return Math.max(1, Math.floor((dna.languages?.length || 1) * 2));
}

function estimateRefactorCount(dna) {
  // Estimate refactor commits from commit consistency patterns
  return Math.max(1, Math.floor((dna.scoring.commitConsistency || 0.5) * 100));
}

function estimateRefactorYears(dna) {
  const refactorCount = estimateRefactorCount(dna);
  return Math.max(1, Math.round(refactorCount / 12));
}

function estimateBatchSize(dna) {
  // Estimate typical commit batch size
  const totalCommits = dna.scoring.totalCommits || 100;
  const repoCount = Math.max(1, dna.stats.publicRepos);
  return Math.max(50, Math.round((totalCommits / repoCount) * 5));
}

// ============ TEMPLATE REPLACEMENT ============

function replaceTemplateVariables(template, context) {
  let result = template;

  // Replace ${variable} patterns with context values
  const pattern = /\$\{(\w+)\}/g;
  result = result.replace(pattern, (match, key) => {
    const value = context[key];
    if (value === undefined) return match; // Keep original if not found
    return String(value);
  });

  return result;
}

/**
 * Get all roast templates for an archetype
 */
export function getRoastTemplates(archetypeId) {
  return ROAST_TEMPLATES[archetypeId] || ROAST_TEMPLATES.default;
}

/**
 * Count available archetypes with roasts
 */
export function getAvailableArchetypesForRoasting() {
  return Object.keys(ROAST_TEMPLATES).filter((key) => key !== 'default');
}

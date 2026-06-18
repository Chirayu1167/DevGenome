/**
 * Archetype System - 50+ RPG-style character classes
 * Each archetype defines trigger conditions, strengths, weaknesses, and roast templates
 */

export const ARCHETYPES = {
  // ============ AI/ML DOMAIN ============
  ai_alchemist: {
    id: 'ai_alchemist',
    name: 'AI Alchemist',
    emoji: '🧙‍♂️',
    rarity: 'rare',
    domain: 'ai_ml',
    description: 'Transmutes data into models. Lives in Jupyter notebooks and experiments.',
    triggerConditions: {
      aiMlCoverage: { min: 0.6 },
      readmeQuality: { min: 0.5 },
      repositoryCount: { min: 5 }
    },
    strengths: ['Cutting-edge tech', 'Research mindset', 'Data fluency', 'Experimentation'],
    weaknesses: ['Shipping projects', 'Documentation rigor', 'Practical deployment'],
    roastTemplates: [
      'Has ${modelCount} undeployed models. Still training the perfect one.',
      '${name} summons models like a chef tries recipes. None are quite right yet.',
      'The only thing more theoretical than ${name}\'s code is their deployment strategy.',
    ],
    shareablePhrase: "I'm an AI Alchemist — I build models, I just don't deploy them.",
  },

  dataset_hoarder: {
    id: 'dataset_hoarder',
    name: 'Dataset Hoarder',
    emoji: '🐉',
    rarity: 'rare',
    domain: 'ai_ml',
    description: 'Collects datasets like dragons collect gold. Size matters to them.',
    triggerConditions: {
      aiMlCoverage: { min: 0.5 },
      avgRepoSize: { min: 50000 },
      datasetReferences: { min: 3 }
    },
    strengths: ['Data sourcing', 'Large-scale processing', 'Pattern recognition'],
    weaknesses: ['Code elegance', 'Performance optimization', 'Sharing (their hoards)'],
    roastTemplates: [
      '${name}\'s repositories contain ${totalSize}MB of data. The code is like ${codePercentage}% of that.',
      'Each of ${name}\'s projects has more data than most countries have citizens.',
    ],
    shareablePhrase: "I'm a Dataset Hoarder — my repos are 90% data, 10% Python.",
  },

  prompt_summoner: {
    id: 'prompt_summoner',
    name: 'Prompt Summoner',
    emoji: '✨',
    rarity: 'uncommon',
    domain: 'ai_ml',
    description: 'Masters the arcane art of convincing AI to do their bidding.',
    triggerConditions: {
      aiMlCoverage: { min: 0.4 },
      readmeQuality: { min: 0.6 },
      commitFrequency: { min: 0.7 }
    },
    strengths: ['LLM expertise', 'Creative prompting', 'Rapid iteration'],
    weaknesses: ['Understanding fundamentals', 'Debugging', 'Reproducibility'],
    roastTemplates: [
      '${name} spends more time crafting prompts than reading documentation.',
      'If ChatGPT goes down, ${name} will too.',
    ],
    shareablePhrase: "I'm a Prompt Summoner — my GPT bill is higher than my salary.",
  },

  // ============ COMPUTER VISION ============
  cv_ranger: {
    id: 'cv_ranger',
    name: 'CV Ranger',
    emoji: '🎯',
    rarity: 'rare',
    domain: 'computer_vision',
    description: 'Hunts bugs in image space. Sees patterns humans miss.',
    triggerConditions: {
      computerVisionCoverage: { min: 0.5 },
      projectDiversity: { min: 0.4 },
      readmeQuality: { min: 0.6 }
    },
    strengths: ['Image processing', 'Pattern detection', 'Visual thinking'],
    weaknesses: ['Text processing', 'NLP tasks', 'Documentation'],
    roastTemplates: [
      '${name} can detect a bug in a screenshot but not in their commit history.',
      'Give ${name} a dataset and they\'ll find every edge case except when the model actually works.',
    ],
    shareablePhrase: "I'm a CV Ranger — I've trained ${modelCount} vision models this year.",
  },

  pixel_wizard: {
    id: 'pixel_wizard',
    name: 'Pixel Wizard',
    emoji: '🪄',
    rarity: 'uncommon',
    domain: 'computer_vision',
    description: 'Manipulates pixels with arcane precision. Former graphics hacker.',
    triggerConditions: {
      computerVisionCoverage: { min: 0.4 },
      languages: { includes: ['GLSL', 'Shader', 'WebGL'] },
      projectCount: { min: 3 }
    },
    strengths: ['Graphics programming', 'Performance', 'Visual effects'],
    weaknesses: ['High-level abstractions', 'Documentation', 'Readability'],
    roastTemplates: [
      '${name}\'s shaders are more optimized than their life choices.',
    ],
    shareablePhrase: "I'm a Pixel Wizard — I can make anything look good at 60 FPS.",
  },

  // ============ ROBOTICS/EMBEDDED ============
  robotics_tinkerer: {
    id: 'robotics_tinkerer',
    name: 'Robotics Tinkerer',
    emoji: '🤖',
    rarity: 'rare',
    domain: 'robotics',
    description: 'Builds things that move. Combines hardware and software into chaos.',
    triggerConditions: {
      roboticsCoverage: { min: 0.5 },
      projectDiversity: { min: 0.5 },
      documentationScore: { min: 0.5 }
    },
    strengths: ['Hardware integration', 'Problem solving', 'Persistence'],
    weaknesses: ['Software architecture', 'Scalability', 'Testing'],
    roastTemplates: [
      '${name}\'s robots have fewer bugs than their code reviews.',
      'If ${name}\'s code was as functional as their robots, they\'d have no projects.',
    ],
    shareablePhrase: "I'm a Robotics Tinkerer — my bugs are hardware problems.",
  },

  // ============ BACKEND/INFRASTRUCTURE ============
  backend_warlock: {
    id: 'backend_warlock',
    name: 'The Backend Warlock',
    emoji: '🔮',
    rarity: 'rare',
    domain: 'backend',
    description: 'Conjures API spells and infrastructure demons. Backend is life.',
    triggerConditions: {
      backendCoverage: { min: 0.7 },
      deploymentCoverage: { min: 0.6 },
      testingCoverage: { min: 0.5 }
    },
    strengths: ['System design', 'Scalability', 'Database mastery'],
    weaknesses: ['Frontend', 'User empathy', 'UI/UX'],
    roastTemplates: [
      '${name} spends more time optimizing databases than sleep.',
      'To ${name}, "user interface" is a debug log.',
    ],
    shareablePhrase: "I'm a Backend Warlock — frontend is magic I don't understand.",
  },

  api_blacksmith: {
    id: 'api_blacksmith',
    name: 'API Blacksmith',
    emoji: '⚒️',
    rarity: 'uncommon',
    domain: 'backend',
    description: 'Forges RESTful endpoints with meticulous precision.',
    triggerConditions: {
      backendCoverage: { min: 0.6 },
      documentationScore: { min: 0.7 },
      apiEndpoints: { min: 10 }
    },
    strengths: ['API design', 'Documentation', 'Backward compatibility'],
    weaknesses: ['Innovation', 'Edge cases', 'Performance'],
    roastTemplates: [
      '${name} has documented every single endpoint. Somewhere, a DevOps engineer weeps.',
    ],
    shareablePhrase: "I'm an API Blacksmith — my REST routes are art.",
  },

  deployment_wizard: {
    id: 'deployment_wizard',
    name: 'Deployment Wizard',
    emoji: '🚀',
    rarity: 'uncommon',
    domain: 'devops',
    description: 'Bends CI/CD pipelines to their will. Deployment is meditation.',
    triggerConditions: {
      deploymentCoverage: { min: 0.7 },
      cicdSignal: { min: 0.6 },
      repositoryCount: { min: 5 }
    },
    strengths: ['DevOps', 'Automation', 'Reliability'],
    weaknesses: ['Coding', 'Architecture', 'Work-life balance'],
    roastTemplates: [
      '${name}\'s deployment pipeline is more complex than the actual application.',
      'If ${name}\'s infrastructure was as reliable as a solid rock, rocks would be obsolete.',
    ],
    shareablePhrase: "I'm a Deployment Wizard — my deployments never fail (I've never deployed).",
  },

  infrastructure_druid: {
    id: 'infrastructure_druid',
    name: 'Infrastructure Druid',
    emoji: '🌳',
    rarity: 'rare',
    domain: 'devops',
    description: 'Communes with cloud spirits and orchestrates containers.',
    triggerConditions: {
      deploymentCoverage: { min: 0.6 },
      containerUsage: { min: 0.5 },
      cicdSignal: { min: 0.5 }
    },
    strengths: ['Cloud architecture', 'Scalability', 'Kubernetes'],
    weaknesses: ['Security', 'Cost optimization', 'Documentation'],
    roastTemplates: [
      '${name}\'s infrastructure bill is higher than their happiness index.',
    ],
    shareablePhrase: "I'm an Infrastructure Druid — my Kubernetes clusters are sacred.",
  },

  // ============ FRONTEND/FULLSTACK ============
  frontend_bard: {
    id: 'frontend_bard',
    name: 'Frontend Bard',
    emoji: '🎭',
    rarity: 'common',
    domain: 'frontend',
    description: 'Composes beautiful UIs with the precision of a musician.',
    triggerConditions: {
      frontendCoverage: { min: 0.6 },
      languages: { includes: ['JavaScript', 'TypeScript', 'React'] },
      projectCount: { min: 5 }
    },
    strengths: ['UI/UX', 'CSS mastery', 'Animation', 'User empathy'],
    weaknesses: ['Backend', 'Performance', 'Scalability'],
    roastTemplates: [
      '${name}\'s CSS is more organized than their life.',
      'To ${name}, "database" is probably something in DevTools.',
    ],
    shareablePhrase: "I'm a Frontend Bard — I make pixels sing.",
  },

  full_stack_mercenary: {
    id: 'full_stack_mercenary',
    name: 'Full Stack Mercenary',
    emoji: '⚔️',
    rarity: 'common',
    domain: 'fullstack',
    description: 'Works for hire. Knows enough about everything to be dangerous.',
    triggerConditions: {
      backendCoverage: { min: 0.5 },
      frontendCoverage: { min: 0.5 },
      deploymentCoverage: { min: 0.4 }
    },
    strengths: ['Versatility', 'Rapid development', 'End-to-end thinking'],
    weaknesses: ['Deep expertise', 'Specialization', 'Focus'],
    roastTemplates: [
      '${name} is a master of all trades and an expert at none.',
      '${name}\'s GitHub is a resume in repository form.',
    ],
    shareablePhrase: "I'm a Full Stack Mercenary — I'll build your entire product for coffee.",
  },

  // ============ OPEN SOURCE / COMMUNITY ============
  open_source_nomad: {
    id: 'open_source_nomad',
    name: 'Open Source Nomad',
    emoji: '🌍',
    rarity: 'uncommon',
    domain: 'community',
    description: 'Wanders between projects, contributing wherever needed.',
    triggerConditions: {
      openSourceRatio: { min: 0.6 },
      prCount: { min: 20 },
      repositoryCount: { min: 3 }
    },
    strengths: ['Collaboration', 'Code review', 'Community impact'],
    weaknesses: ['Ownership', 'Long-term commitment', 'Personal projects'],
    roastTemplates: [
      '${name} has more pull requests than personal projects.',
      'To ${name}, someone else\'s bug is a personal mission.',
    ],
    shareablePhrase: "I'm an Open Source Nomad — I PR, therefore I am.",
  },

  bug_hunter: {
    id: 'bug_hunter',
    name: 'Bug Hunter',
    emoji: '🐛',
    rarity: 'uncommon',
    domain: 'community',
    description: 'Finds bugs other developers ignore. Issue closer extraordinaire.',
    triggerConditions: {
      issueClosureRate: { min: 0.8 },
      issueResponseTime: { max: 7 },
      repositoryCount: { min: 5 }
    },
    strengths: ['Testing', 'Quality assurance', 'Attention to detail'],
    weaknesses: ['Feature development', 'Innovation', 'Patience'],
    roastTemplates: [
      '${name} closes issues faster than developers create them.',
      'If there\'s a bug, ${name} has already filed it.',
    ],
    shareablePhrase: "I'm a Bug Hunter — I've found ${bugCount} issues this month.",
  },

  // ============ DOCUMENTATION / EDUCATION ============
  documentation_cultist: {
    id: 'documentation_cultist',
    name: 'Documentation Cultist',
    emoji: '📚',
    rarity: 'uncommon',
    domain: 'documentation',
    description: 'Writes READMEs like sacred texts. Docs over code.',
    triggerConditions: {
      documentationScore: { min: 0.8 },
      readmeQuality: { min: 0.85 },
      issueTemplateQuality: { min: 0.7 }
    },
    strengths: ['Communication', 'Onboarding', 'Knowledge sharing'],
    weaknesses: ['Shipping fast', 'Experimental work', 'Edge cases'],
    roastTemplates: [
      '${name}\'s README is longer than most novels.',
      'For ${name}, a project without documentation doesn\'t exist.',
    ],
    shareablePhrase: "I'm a Documentation Cultist — my READMEs have Table of Contents.",
  },

  // ============ EXPERIMENTAL / UNIQUE ============
  code_necromancer: {
    id: 'code_necromancer',
    name: 'Code Necromancer',
    emoji: '☠️',
    rarity: 'rare',
    domain: 'experimental',
    description: 'Resurrects dead code. Uses ancient languages. Maintains legacy.',
    triggerConditions: {
      languages: { includes: ['COBOL', 'Fortran', 'Pascal', 'Ruby', 'Perl'] },
      projectAge: { min: 10 },
      maintenanceScore: { min: 0.6 }
    },
    strengths: ['Legacy systems', 'Backward compatibility', 'Patience'],
    weaknesses: ['Modern tech', 'Innovation', 'Job satisfaction'],
    roastTemplates: [
      '${name} maintains code from an era before GitHub existed.',
      'If Y2K happened again, ${name} would fix it for fun.',
    ],
    shareablePhrase: "I'm a Code Necromancer — I maintain systems from 2003.",
  },

  chaos_engineer: {
    id: 'chaos_engineer',
    name: 'Chaos Engineer',
    emoji: '⚡',
    rarity: 'rare',
    domain: 'experimental',
    description: 'Breaks things to see how they fail. Entropy is the goal.',
    triggerConditions: {
      chaosScore: { min: 0.7 },
      commitFrequencyVariance: { min: 0.6 },
      projectAbandonmentRate: { min: 0.4 }
    },
    strengths: ['Experimentation', 'Resilience thinking', 'Creative problem solving'],
    weaknesses: ['Stability', 'Documentation', 'Planning'],
    roastTemplates: [
      '${name}\'s GitHub is a beautiful disaster waiting to happen.',
      '${name}\'s idea of quality assurance is "if it doesn\'t crash, it works."',
    ],
    shareablePhrase: "I'm a Chaos Engineer — my code works better when I stop worrying.",
  },

  algorithm_gladiator: {
    id: 'algorithm_gladiator',
    name: 'Algorithm Gladiator',
    emoji: '⚔️',
    rarity: 'rare',
    domain: 'experimental',
    description: 'Battles algorithmic complexity. LeetCode legend.',
    triggerConditions: {
      algorithmComplexity: { min: 0.7 },
      projectDiversity: { min: 0.5 },
      readmeQuality: { min: 0.6 }
    },
    strengths: ['Complex problem solving', 'Performance', 'Mathematical thinking'],
    weaknesses: ['Practical shipping', 'User empathy', 'Documentation'],
    roastTemplates: [
      '${name} optimizes code that doesn\'t need optimization.',
      'For ${name}, O(n log n) is a minimum viable solution.',
    ],
    shareablePhrase: "I'm an Algorithm Gladiator — my solutions are beautiful and over-engineered.",
  },

  terminal_monk: {
    id: 'terminal_monk',
    name: 'Terminal Monk',
    emoji: '🧘',
    rarity: 'uncommon',
    domain: 'experimental',
    description: 'Finds zen in shell scripts and command-line incantations.',
    triggerConditions: {
      shellScripts: { min: 10 },
      commitMessages: { includesKeywords: ['bash', 'sh', 'zsh', 'awk'] },
      documentationScore: { min: 0.5 }
    },
    strengths: ['Automation', 'Systems thinking', 'Efficiency'],
    weaknesses: ['UI thinking', 'Collaboration', 'Readability'],
    roastTemplates: [
      '${name}\'s bash scripts are indecipherable to normal humans.',
    ],
    shareablePhrase: "I'm a Terminal Monk — I meditate via command line.",
  },

  refactor_knight: {
    id: 'refactor_knight',
    name: 'The Refactor Knight',
    emoji: '♞',
    rarity: 'uncommon',
    domain: 'experimental',
    description: 'Quests to perfect legacy code. Slays technical debt.',
    triggerConditions: {
      commitMessageFrequency: { includes: 'refactor' },
      projectAge: { min: 2 },
      codeQualityImprovement: { min: 0.5 }
    },
    strengths: ['Code quality', 'Long-term thinking', 'Maintenance'],
    weaknesses: ['New features', 'Shipping speed', 'Innovation'],
    roastTemplates: [
      '${name} spent 3 months refactoring one function.',
    ],
    shareablePhrase: "I'm The Refactor Knight — I've rewritten your codebase for you.",
  },

  // ============ QUIRKY / NICHE ============
  framework_collector: {
    id: 'framework_collector',
    name: 'Framework Collector',
    emoji: '🎨',
    rarity: 'common',
    domain: 'quirky',
    description: 'Has tried every framework. Commits to none.',
    triggerConditions: {
      frameworkCount: { min: 8 },
      projectCount: { min: 15 },
      averageProjectAge: { max: 6 }
    },
    strengths: ['Breadth of knowledge', 'Adaptability', 'Exploration'],
    weaknesses: ['Depth', 'Mastery', 'Commitment issues'],
    roastTemplates: [
      '${name} has more framework experience than completed projects.',
      'By the time ${name} finishes a project, there\'s already a better framework.',
    ],
    shareablePhrase: "I'm a Framework Collector — I've tried ${frameworkCount} frameworks.",
  },

  dependency_collector: {
    id: 'dependency_collector',
    name: 'Dependency Collector',
    emoji: '📦',
    rarity: 'uncommon',
    domain: 'quirky',
    description: 'npm install is meditation. Dependencies > code.',
    triggerConditions: {
      avgDependencies: { min: 25 },
      projectCount: { min: 5 },
      bundleSize: { min: 500 }
    },
    strengths: ['Reusability', 'Rapid development', 'Ecosystem knowledge'],
    weaknesses: ['Performance', 'Security updates', 'Understanding dependencies'],
    roastTemplates: [
      '${name}\'s node_modules folder is larger than a Linux distro.',
      'For ${name}, "dependency hell" is just home.',
    ],
    shareablePhrase: "I'm a Dependency Collector — my package.json has ${depCount} dependencies.",
  },

  weekend_warrior: {
    id: 'weekend_warrior',
    name: 'Weekend Warrior',
    emoji: '⛑️',
    rarity: 'uncommon',
    domain: 'quirky',
    description: 'Only commits on weekends. Day job pays the bills.',
    triggerConditions: {
      weekendCommitRatio: { min: 0.7 },
      commitFrequency: { min: 0.4 },
      projectDiversity: { min: 0.3 }
    },
    strengths: ['Work-life balance', 'Passion projects', 'Consistency'],
    weaknesses: ['Time availability', 'Shipping speed', 'Momentum'],
    roastTemplates: [
      '${name}\'s GitHub is updated every Saturday like clockwork.',
      'Monday through Friday, ${name} dreams in code.',
    ],
    shareablePhrase: "I'm a Weekend Warrior — my best work happens when I'm off the clock.",
  },

  night_shift_coder: {
    id: 'night_shift_coder',
    name: 'Night Shift Coder',
    emoji: '🌙',
    rarity: 'uncommon',
    domain: 'quirky',
    description: 'Peak productivity after midnight. Vampire programmer.',
    triggerConditions: {
      nightCommitRatio: { min: 0.7 },
      commitFrequency: { min: 0.5 },
      regularCommitPattern: true
    },
    strengths: ['Deep focus', 'Creativity', 'Persistence'],
    weaknesses: ['Communication', 'Team coordination', 'Sleep schedule'],
    roastTemplates: [
      '${name}\'s commit timestamps form a perfect nighttime arc.',
      'The sun hasn\'t seen ${name}\'s best code in years.',
    ],
    shareablePhrase: "I'm a Night Shift Coder — my Heroku dyno sleeps more than I do.",
  },

  speedrunner: {
    id: 'speedrunner',
    name: 'Feature Speedrunner',
    emoji: '🏃',
    rarity: 'uncommon',
    domain: 'quirky',
    description: 'Ships features at breakneck speed. Tests? Never heard of them.',
    triggerConditions: {
      commitFrequency: { min: 0.8 },
      deploymentFrequency: { min: 0.7 },
      testingCoverage: { max: 0.3 }
    },
    strengths: ['Shipping speed', 'Rapid iteration', 'MVP mindset'],
    weaknesses: ['Quality', 'Testing', 'Technical debt'],
    roastTemplates: [
      '${name} ships faster than they can document.',
      'If ${name}\'s code were a speed run, it would have world record glitches.',
    ],
    shareablePhrase: "I'm a Feature Speedrunner — I ship now, debug later.",
  },

  last_minute_committer: {
    id: 'last_minute_committer',
    name: 'Last Minute Committer',
    emoji: '⏰',
    rarity: 'uncommon',
    domain: 'quirky',
    description: 'Code arrives in 3 AM bursts. Deadline-driven development.',
    triggerConditions: {
      commitBurstiness: { min: 0.7 },
      lateNightCommits: { min: 0.6 },
      batchCommitSize: { min: 500 }
    },
    strengths: ['Crisis management', 'Adrenaline coding', 'Shipping under pressure'],
    weaknesses: ['Planning', 'Testing', 'Documentation'],
    roastTemplates: [
      '${name}\'s commit history shows ${count} commits at 3 AM.',
      'The deadline is ${name}\'s primary motivation.',
    ],
    shareablePhrase: "I'm a Last Minute Committer — I don't have a Git history, I have a panic log.",
  },

  // ============ RARE / LEGENDARY ============
  silent_builder: {
    id: 'silent_builder',
    name: 'The Silent Builder',
    emoji: '🤐',
    rarity: 'rare',
    domain: 'legendary',
    description: 'Works in silence, ships in secret. Unknown legend.',
    triggerConditions: {
      repositoryCount: { min: 40 },
      followerCount: { max: 100 },
      commitConsistency: { min: 0.8 }
    },
    strengths: ['Consistency', 'Humility', 'Output quality'],
    weaknesses: ['Visibility', 'Networking', 'Fame'],
    roastTemplates: [
      '${name} is the most prolific developer nobody knows about.',
      'The GitHub community has no idea how productive ${name} actually is.',
    ],
    shareablePhrase: "I'm The Silent Builder — my GitHub speaks louder than words.",
  },

  digital_detective: {
    id: 'digital_detective',
    name: 'Digital Detective',
    emoji: '🔍',
    rarity: 'uncommon',
    domain: 'legendary',
    description: 'Debugs the impossible. Finds patterns in chaos.',
    triggerConditions: {
      issueClosureRate: { min: 0.85 },
      debuggingReputation: { min: 0.7 },
      documentedBugFixes: { min: 20 }
    },
    strengths: ['Debugging', 'Pattern recognition', 'Documentation'],
    weaknesses: ['New feature development', 'Big picture thinking'],
    roastTemplates: [
      '${name} can debug your code by reading commit messages.',
    ],
    shareablePhrase: "I'm a Digital Detective — I solve mysteries other developers ignore.",
  },

  data_cartographer: {
    id: 'data_cartographer',
    name: 'Data Cartographer',
    emoji: '🗺️',
    rarity: 'rare',
    domain: 'legendary',
    description: 'Maps data landscapes. Visualizes the invisible.',
    triggerConditions: {
      dataVisualizationProjects: { min: 5 },
      documentationScore: { min: 0.7 },
      readmeQuality: { min: 0.75 }
    },
    strengths: ['Data visualization', 'Communication', 'Insight derivation'],
    weaknesses: ['Real-time systems', 'Performance', 'Backend scale'],
    roastTemplates: [
      '${name}\'s visualizations make data beautiful. The underlying code? Mystery.',
    ],
    shareablePhrase: "I'm a Data Cartographer — I make data look so good people think it\'s art.",
  },

  neural_engineer: {
    id: 'neural_engineer',
    name: 'Neural Engineer',
    emoji: '🧠',
    rarity: 'legendary',
    domain: 'legendary',
    description: 'Deep learning practitioner. TensorFlow is their love language.',
    triggerConditions: {
      deepLearningProjects: { min: 5 },
      aiMlCoverage: { min: 0.7 },
      readmeQuality: { min: 0.6 }
    },
    strengths: ['Deep learning', 'Research', 'Cutting-edge tech'],
    weaknesses: ['Deployment', 'Scalability', 'Practical concerns'],
    roastTemplates: [
      '${name} trains models that are smarter than their documentation.',
    ],
    shareablePhrase: "I'm a Neural Engineer — I've trained ${modelCount} neural networks.",
  },

  vision_architect: {
    id: 'vision_architect',
    name: 'Vision Architect',
    emoji: '👁️',
    rarity: 'legendary',
    domain: 'legendary',
    description: 'Designs entire vision systems. Can see the whole picture.',
    triggerConditions: {
      computerVisionCoverage: { min: 0.6 },
      systemDesignScore: { min: 0.7 },
      deploymentCoverage: { min: 0.5 }
    },
    strengths: ['System design', 'Vision expertise', 'End-to-end thinking'],
    weaknesses: ['Details', 'Quick hacks', 'MVP speed'],
    roastTemplates: [
      '${name} designs vision systems the way architects design buildings.',
    ],
    shareablePhrase: "I'm a Vision Architect — I design vision systems, not just models.",
  },

  logic_sorcerer: {
    id: 'logic_sorcerer',
    name: 'Logic Sorcerer',
    emoji: '🔮',
    rarity: 'rare',
    domain: 'legendary',
    description: 'Casts spells in pure logic. Functional programming purist.',
    triggerConditions: {
      languages: { includes: ['Haskell', 'Lisp', 'Clojure', 'Rust', 'Scala'] },
      projectCount: { min: 10 },
      commitConsistency: { min: 0.7 }
    },
    strengths: ['Type systems', 'Functional programming', 'Code correctness'],
    weaknesses: ['Team adoption', 'Quick prototyping', 'Readability to others'],
    roastTemplates: [
      '${name}\'s code is mathematically perfect and practically impossible to understand.',
    ],
    shareablePhrase: "I'm a Logic Sorcerer — my type system has type systems.",
  },

  runtime_explorer: {
    id: 'runtime_explorer',
    name: 'Runtime Explorer',
    emoji: '🗺️',
    rarity: 'uncommon',
    domain: 'legendary',
    description: 'Ventures into runtime internals. Low-level is home.',
    triggerConditions: {
      languages: { includes: ['C', 'C++', 'Rust', 'Go', 'Assembly'] },
      performanceOptimizations: { min: 15 },
      commitConsistency: { min: 0.6 }
    },
    strengths: ['Performance', 'Systems programming', 'Optimization'],
    weaknesses: ['Rapid development', 'High-level abstractions', 'User-facing features'],
    roastTemplates: [
      '${name}\'s idea of "high-level" is still close to the metal.',
    ],
    shareablePhrase: "I'm a Runtime Explorer — I optimize things that don't need optimizing.",
  },
};

export function getArchetype(id) {
  return ARCHETYPES[id] || null;
}

export function getArchetypesByRarity(rarity) {
  return Object.values(ARCHETYPES).filter((a) => a.rarity === rarity);
}

export function getAllArchetypes() {
  return Object.values(ARCHETYPES);
}

export function getRandomArchetype() {
  const all = getAllArchetypes();
  return all[Math.floor(Math.random() * all.length)];
}

export function selectArchetype(metrics) {
  // Score-based archetype selection
  // This will be called with computed metrics from github.js
  // Returns the best matching archetype based on trigger conditions
  // Implementation details in main scoring logic
  const candidates = Object.values(ARCHETYPES)
    .filter((archetype) => matchesConditions(archetype.triggerConditions, metrics))
    .sort((a, b) => rarityWeight(b.rarity) - rarityWeight(a.rarity));

  return candidates[0] || getRandomArchetype();
}

function matchesConditions(conditions, metrics) {
  // Helper to match trigger conditions against metrics
  for (const [key, condition] of Object.entries(conditions)) {
    const value = metrics[key];
    if (!value) continue;

    if (condition.min && value < condition.min) return false;
    if (condition.max && value > condition.max) return false;
    if (condition.includes && !condition.includes.includes(value)) return false;
  }
  return true;
}

function rarityWeight(rarity) {
  const weights = { legendary: 4, rare: 3, uncommon: 2, common: 1 };
  return weights[rarity] || 0;
}

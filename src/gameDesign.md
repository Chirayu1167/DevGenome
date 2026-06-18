# GitHub DNA Analyzer - Game Design Document

## Design Philosophy
Transform GitHub profile analysis into an entertaining, shareable experience that feels like Spotify Wrapped + RPG character sheet + Steam achievements. Results should be believable yet humorous, with every profile feeling genuinely unique.

---

## CORE SYSTEMS

### 1. SCORING METRICS (10 Gamified Stats)

Instead of generic "Technical Depth," use entertaining metrics:

#### **Shipping Power** (0-100)
- Formula: `0.25 * repoCount + 0.35 * recentActivityScore + 0.20 * deploymentCoverage + 0.20 * documentationScore`
- What it measures: Ability to get code into production
- High = Ships frequently, documents well, deploys reliably
- Low = Lots of unfinished projects, no deployment signal

#### **Chaos Energy** (0-100)
- Formula: `0.40 * commitFrequencyVariance + 0.30 * mergeConflictFrequency + 0.20 * languageDiversity + 0.10 * repositoryAbandonmentRate`
- What it measures: Unpredictability and instability
- High = Inconsistent commits, jumps between languages/projects
- Low = Steady, focused developer

#### **Innovation Spark** (0-100)
- Formula: `0.35 * aiMlCoverage + 0.25 * computerVisionCoverage + 0.15 * automationCoverage + 0.15 * originalityScore + 0.10 * readmeQuality`
- What it measures: Cutting-edge, experimental work
- High = Works with AI/ML, vision, experimental tech
- Low = Standard web development

#### **Documentation Aura** (0-100)
- Formula: `0.40 * readmeQuality + 0.30 * documentationScore + 0.20 * codeCommentDensity + 0.10 * issueTemplateQuality`
- What it measures: Communication through docs
- High = Great READMEs, inline documentation, issue templates
- Low = Cryptic code, no documentation

#### **Open Source Karma** (0-100)
- Formula: `0.40 * openSourceContributionScore + 0.30 * prActivityScore + 0.15 * licensingSignal + 0.15 * communityEngagementScore`
- What it measures: Community contribution and collaboration
- High = PRs to projects, licenses, active in open source
- Low = All private, no community engagement

#### **Technical Wizardry** (0-100)
- Formula: `0.35 * backendCoverage + 0.25 * testingCoverage + 0.20 * deploymentCoverage + 0.15 * systemDesignComplexity + 0.05 * toolingMaturity`
- What it measures: Low-level, infrastructure knowledge
- High = Backend work, testing, deployment pipelines, DevOps
- Low = Frontend-only or tutorial-level projects

#### **Main Character Energy** (0-100)
- Formula: `0.30 * followerRatio + 0.25 * starGravity + 0.20 * projectDiversity + 0.15 * consistencyScore + 0.10 * accountAge`
- What it measures: Presence, impact, visibility
- High = Popular projects, many followers, consistent presence
- Low = Unknown, little impact

#### **Build Stability** (0-100)
- Formula: `0.40 * testingCoverage + 0.30 * errorHandlingScore + 0.20 * ciCdSignal + 0.10 * issueResolutionRate`
- What it measures: Reliability and quality
- High = Good tests, error handling, CI/CD pipelines
- Low = No tests, errors everywhere

#### **Side Quest Completion** (0-100)
- Formula: `0.35 * completedProjectRatio + 0.30 * projectRelevance + 0.20 * maintenanceScore + 0.15 * sideProjectSuccess`
- What it measures: Ability to finish projects, not just start
- High = Completed, maintained projects
- Low = Abandoned projects, work in progress everywhere

#### **Debugging Resistance** (0-100)
- Formula: `1.0 - (0.40 * issueCount + 0.35 * errorFrequency + 0.25 * bugFixLatency) / 3`
- What it measures: How much chaos is in codebase
- High = Few issues, quick fixes
- Low = Lots of bugs, slow responses

---

### 2. DNA TRAITS (100 Humorous Traits)

Each developer gets 8-12 DNA traits based on their profile.

**Examples:**
- README Maxxer (High documentation, README > 1000 lines)
- Commit Goblin (300+ commits in last 3 months)
- StackOverflow Archaeologist (Frequently searches Stack Overflow terms in code)
- Dependency Collector (20+ external dependencies per project)
- Tutorial Survivor (Began with tutorials, now ships production)
- Bug Whisperer (Closes issues faster than anyone)
- Weekend Warrior (Most commits on weekends)
- Night Shift Coder (Most commits 11 PM - 6 AM)
- Last Minute Committer (Commits in batches, rare but massive)
- Feature Speedrunner (Fast implementation cycles)
- Merge Conflict Magnet (High merge conflict frequency)
- Keyboard Barbarian (Chaotic commit messages)
- AI Summoner (3+ AI/ML projects)
- Dataset Dragon (Hoards large datasets)

Traits should:
- Trigger based on GitHub signals
- Generate humorous flavor text
- Contribute to archetype selection
- Be sharable ("I'm a Code Necromancer + README Maxxer")

---

### 3. ARCHETYPE SYSTEM (50+ Classes)

Each developer gets a PRIMARY archetype + up to 3 SECONDARY traits.

**Rarity Distribution:**
- Common (40%): Approachable, relatable
- Uncommon (35%): More specific niches
- Rare (20%): Unique combinations
- Legendary (5%): True edge cases

**Archetype Structure:**
```javascript
{
  id: "ai_alchemist",
  name: "AI Alchemist",
  emoji: "🧙‍♂️",
  rarity: "rare",
  description: "Transmutes data into models. Lives in Jupyter notebooks.",
  triggerConditions: {
    aiMlCoverage: { min: 0.6 },
    readmeQuality: { min: 0.5 },
    projectDiversity: { min: 0.4 }
  },
  strengths: ["Cutting-edge tech", "Research mindset", "Data fluency"],
  weaknesses: ["Shipping projects", "Documentation", "Practical deployment"],
  roastTemplates: [
    "Has ${modelCount} undeployed models. Still training the perfect one.",
    "${name} summons models like a chef tries recipes. None are quite right.",
  ],
  shareablePhrase: "I'm an AI Alchemist — I build models, I just don't deploy them."
}
```

---

### 4. ROAST ENGINE

Roasts should be:
- **Contextual** - Reference actual profile data
- **Funny** - Humorous, not mean
- **Shareable** - Quotable, memorable
- **Varied** - Multiple templates per archetype
- **Truthful** - Based on real profile signals

**Roast Template Structure:**
```javascript
{
  archetype: "ai_alchemist",
  roasts: [
    { severity: "gentle", text: "The AI Alchemist has discovered ${count} models. Deployment remains a mystery." },
    { severity: "brutal", text: "${name}, you've built so many models they're forming their own civilization." },
  ]
}
```

---

### 5. ACHIEVEMENTS (100+)

Unlockable achievements similar to Steam:

**Examples:**
- 🥇 **First Blood** - Create your first repository
- 📝 **README Enjoyer** - Have a README over 500 words
- 🎯 **Commit Addict** - 100+ commits in 30 days
- 🏆 **Documentation Cultist** - 90%+ documentation coverage
- 🌍 **Open Source Wanderer** - Contribute to 5+ open source projects
- 🐛 **Bug Exterminator** - Close 50+ issues
- 🎮 **Infinite Side Quest** - Have 20+ repositories
- 🌙 **Night Owl** - 70%+ commits between 11 PM - 6 AM
- 🚀 **Deployment Survivor** - Deploy to 3+ different platforms
- ⚡ **Git Push Any% Speedrun** - Have 1000+ commits in a year

Achievement data:
```javascript
{
  id: "readme_enjoyer",
  name: "README Enjoyer",
  emoji: "📝",
  description: "Documentation is love. Documentation is life.",
  trigger: { readmeQuality: { min: 0.8 } },
  rarity: "uncommon",
  unlockedPercentage: 15
}
```

---

## IMPLEMENTATION STRATEGY

### Phase 1: Data Layer
- Create `archetypes.js` - All 50+ archetypes
- Create `dnaTraits.js` - All 100 traits
- Create `achievements.js` - All 100+ achievements
- Create `roastEngine.js` - Roast templates + generation
- Create `gameScoringMetrics.js` - New scoring formulas

### Phase 2: Scoring Engine
- Update `github.js` to calculate new metrics
- Implement signal detection for DNA traits
- Archetype matching algorithm

### Phase 3: UI Integration
- Update `Report.jsx` to display achievements
- Create achievement badge display
- Update roast engine integration
- Add DNA traits display

### Phase 4: Polish
- Animations for achievements
- Share functionality
- Mobile optimization

---

## Data Structures

### Scoring Output
```javascript
{
  metrics: {
    shippingPower: 75,
    chaosEnergy: 45,
    innovationSpark: 82,
    documentationAura: 60,
    openSourceKarma: 55,
    technicalWizardry: 70,
    mainCharacterEnergy: 48,
    buildStability: 65,
    sideQuestCompletion: 40,
    debuggingResistance: 68,
  },
  dnaTraits: [
    { id: "readme_maxxer", name: "README Maxxer", score: 0.95 },
    { id: "commit_goblin", name: "Commit Goblin", score: 0.88 },
    // ...
  ],
  archetype: {
    primary: { id: "ai_alchemist", name: "AI Alchemist", rarity: "rare" },
    secondary: [
      { id: "dataset_hoarder", name: "Dataset Hoarder" },
      { id: "documentation_cultist", name: "Documentation Cultist" }
    ]
  },
  achievements: {
    unlocked: [
      { id: "first_blood", name: "First Blood", unlockedAt: "2023-01-15" },
      // ...
    ],
    progress: [
      { id: "commit_addict", progress: 0.65 }
    ]
  },
  roasts: [
    { template: "...", rendered: "..." }
  ]
}
```

---

## JSON Schemas

### Archetype
```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": { "type": "string" },
    "name": { "type": "string" },
    "emoji": { "type": "string" },
    "rarity": { "enum": ["common", "uncommon", "rare", "legendary"] },
    "description": { "type": "string" },
    "triggerConditions": { "type": "object" },
    "strengths": { "type": "array", "items": { "type": "string" } },
    "weaknesses": { "type": "array", "items": { "type": "string" } },
    "roastTemplates": { "type": "array", "items": { "type": "string" } },
    "shareablePhrase": { "type": "string" }
  }
}
```

---

## Future Expansion Ideas

1. **Dynamic Roasts** - ML-based roast generation
2. **Seasons** - Rotating achievements and archetypes
3. **Comparisons** - "Battle" profiles against each other
4. **Timeline** - Show developer evolution over time
5. **Leaderboards** - Global stats on metrics
6. **Custom Themes** - Visual skins for archetypes
7. **Badges** - Wearable achievements
8. **Personality Matching** - Developer matchmaking
9. **Boss Battles** - Challenges and speedruns
10. **Trading Cards** - Collectible developer archetypes

---

## Tone & Voice

- **Humorous**: Self-aware, gently roasting
- **Empowering**: Make developers feel cool about their choices
- **Shareable**: Every stat feels brag-worthy
- **Inclusive**: All developer types represented
- **Gaming**: RPG/Steam vocabulary throughout

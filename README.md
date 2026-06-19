# DEV.WRAPPED — GitHub Developer DNA 🧬

Turn any public GitHub profile into a shareable, game-ified "developer DNA" report: trait scores, an RPG-style archetype, achievements, and a few good-natured roasts.

## What it does

Enter a GitHub username and the app:

1. Pulls public profile + repo data from the GitHub REST API (via a small server-side proxy, so no token is ever exposed to the browser).
2. Scores the profile across ten fun metrics (Shipping Power, Innovation Spark, Technical Wizardry, Main Character Energy, etc.) plus five core DNA traits (Shipping, Technical Depth, Open Source Impact, Collaboration, Innovation).
3. Picks an **archetype** (one of 50+ RPG-style classes — AI Alchemist, Backend Warlock, Robotics Tinkerer, Silent Builder...) based on which trigger conditions the profile fits best.
4. Unlocks achievements and generates gentle / sarcastic / brutal roasts.
5. Renders it all as an animated DNA helix report you can screenshot and share.

### Compare two developers head-to-head

Click **⚔ Compare** in the nav (or the link under the main form) to pit two GitHub usernames against each other. The compare report mirrors the single-profile UI — same visual language, same archetypes and traits — but side by side:

- Dueling profile cards with a "leading" crown on the higher overall score
- Stat-for-stat showdown (repos, stars, followers, forks, top language)
- Trait-by-trait breakdown with mirrored bars for all 5 DNA traits
- A verdict terminal with gentle / sarcastic / brutal tone options and a final winner call

Starting a compare from an existing single-profile report pre-fills that profile as the first contender.

### Share your result as an image

Both the solo report and the compare duel have a **📸 Share Card** / **📸 Share Duel** button in the footer. It renders a branded 1200×630 PNG (avatar, archetype, score, top trait bars, a roast line) entirely client-side via the Canvas API — no server round-trip, no extra dependencies. Alongside the download, a ready-to-post caption is auto-generated and copyable in one click, so sharing the result on LinkedIn/Twitter takes zero extra writing.

## Scoring philosophy

The engine is built to feel **fair, not popularity-contest-y**:

- **Quality over vanity metrics.** Documentation, deployment, testing, recent activity, and project originality carry more weight than raw stars/forks/followers (which are log-scaled, not linear, so one viral repo can't dominate a score).
- **Additive, not gated.** Archetypes are chosen by accumulating partial credit across each trigger condition — a well-documented AI/ML, CV, NLP, robotics, automation, or security project can still win an archetype even with very few stars. No single missing signal disqualifies a strong fit.
- **Domain depth is recognized on its own merits.** A niche developer with low popularity but strong engineering practices (docs, deploys, tests, recent commits) can outscore a popular but shallow repo collector.

## Tech stack

- **React 18 + Vite** for the frontend
- **Vercel serverless function** (`api/github.mjs`) that proxies GitHub API calls and (optionally) injects a server-side `GITHUB_TOKEN` to raise rate limits
- Plain CSS (no framework) for the retro-terminal / DNA-helix visual style

## Running locally

```bash
npm install
npm run dev
```

Open the printed local URL and enter any public GitHub username.

### Optional: higher rate limits

Unauthenticated GitHub API requests are capped at 60/hour. To raise that limit, set a personal access token (no special scopes needed — public data only) as an environment variable before running locally or deploying:

```bash
GITHUB_TOKEN=ghp_xxxxxxxxxxxx npm run dev
```

On Vercel, add `GITHUB_TOKEN` under Project Settings → Environment Variables.

## Project structure

```
src/
  App.jsx                 entry component / routing between views
  github.js                GitHub data fetching + raw scoring signal computation
  gameAnalyzer.js           orchestrates metrics → archetype → traits → achievements → roasts
  gameScoringMetrics.js     the 10 game metrics (Shipping Power, Innovation Spark, ...)
  archetypes.js             50+ archetype definitions + additive selection logic
  dnaScoring.js             5 core DNA traits + primary/secondary archetype derivation
  dnaTraits.js              100 shareable personality traits
  achievements.js           unlockable achievements + progress tracking
  roastEngine.js             gentle / sarcastic / brutal roast generation
  Helix.jsx, DNAEngine.jsx  DNA helix visualization
  Report.jsx, ProfileCard.jsx, LanguageDNA.jsx   report UI
  CompareHero.jsx, CompareLoading.jsx, CompareError.jsx, CompareReport.jsx   head-to-head comparison flow
  shareCard.js              Canvas-based PNG renderer + caption generator for sharing
  ShareButton.jsx           reusable share modal (preview, download, copy caption)
api/
  github.mjs                serverless proxy to the GitHub REST API
```

## Notes

- All GitHub requests go through `/api/github` — the frontend never talks to `api.github.com` directly, and the token (if set) never reaches the browser.
- Scoring and archetype selection are pure functions (`gameScoringMetrics.js`, `archetypes.js`, `dnaScoring.js`) — easy to unit test independent of the UI or network layer.

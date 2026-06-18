/* Shared lookup data for the Language DNA section. */

export const LANGUAGE_COLORS = {
  JavaScript: '#F7DF1E',
  TypeScript: '#3178C6',
  Python:     '#3572A5',
  Rust:       '#DEA584',
  Go:         '#00ADD8',
  Ruby:       '#CC342D',
  Java:       '#B07219',
  'C++':      '#F34B7D',
  C:          '#555555',
  'C#':       '#178600',
  PHP:        '#4F5D95',
  Swift:      '#F05138',
  Kotlin:     '#A97BFF',
  Scala:      '#C22D40',
  Shell:      '#89E051',
  HTML:       '#E34C26',
  CSS:        '#563D7C',
  Lua:        '#000080',
  Elixir:     '#6E4A7E',
  Dart:       '#00B4AB',
}

export const DEFAULT_LANG_COLOR = '#00F5FF'

export const getLangColor = (name) =>
  LANGUAGE_COLORS[name] || DEFAULT_LANG_COLOR

/* One-line per-language personality insight. */
export const LANGUAGE_INSIGHTS = {
  JavaScript: 'Web-first thinker',
  TypeScript: 'Type-safety advocate',
  Python:     'Data-driven pragmatist',
  Rust:       'Systems-level precision',
  Go:         'Pragmatic minimalist',
  Ruby:       'Developer-experience craftsman',
  Java:       'Enterprise-scale architect',
  'C++':      'Performance maximalist',
  C:          'Foundations purist',
  'C#':       'Microsoft-stack builder',
  PHP:        'Web veteran',
  Swift:      'Apple ecosystem engineer',
  Kotlin:     'Modern JVM polyglot',
  Scala:      'Functional engineer',
  Shell:      'Automation specialist',
  HTML:       'Markup artisan',
  CSS:        'Visual systems designer',
  Lua:        'Embedded scripting mind',
  Elixir:     'Distributed systems tinkerer',
  Dart:       'Cross-platform generalist',
}

export const getLangInsight = (name) =>
  LANGUAGE_INSIGHTS[name] || 'General-purpose engineer'

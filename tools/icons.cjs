// Icon set for the beginner lessons and websites.
// Each icon is a rounded tile; the tile colour shows WHERE the action happens:
//   folder  = your project folder (amber)
//   desktop = GitHub Desktop (violet)
//   web     = GitHub.com (blue)
//   ai      = an AI assistant (magenta)
//   help    = recovery and safety (slate)
//   ink     = general ideas (teal)
// Glyphs are drawn on a 24-unit grid with round white strokes.

const PLACES = {
  folder: { color: '#A86400', label: 'Your project folder' },
  desktop: { color: '#6A4CC2', label: 'GitHub Desktop' },
  web: { color: '#2F5BEA', label: 'GitHub.com' },
  ai: { color: '#C0306B', label: 'AI assistant' },
  help: { color: '#5B6676', label: 'Help' },
  ink: { color: '#17767B', label: 'Idea' },
};

const G = {
  folder: '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/>',
  monitor: '<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4"/>',
  browser: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/><path d="M6.5 6.5h.01M9.5 6.5h.01"/>',
  account: '<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c0-4 3.4-6 7.5-6s7.5 2 7.5 6"/>',
  install: '<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M4 20h16"/>',
  'new-repo': '<path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l2 2h8.5A1.5 1.5 0 0 1 21 9.5v8a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5z"/><path d="M12 10.5v6M9 13.5h6"/>',
  edit: '<path d="M4 20h4.5L19.5 9 15 4.5 4 15.5z"/><path d="M12.5 7l4.5 4.5"/>',
  changes: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 12h6M12 9v6M9 17.5h6"/>',
  commit: '<path d="M2 12h6M16 12h6"/><circle cx="12" cy="12" r="4"/>',
  publish: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3 3.2 15 0 18M12 3c-3.2 3-3.2 15 0 18"/>',
  push: '<path d="M7 18.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 9a4.5 4.5 0 0 1 .5 9"/><path d="M12 12.5v8M9 15.5l3-3 3 3"/>',
  pull: '<path d="M7 16.5a4.5 4.5 0 0 1-.6-9A6 6 0 0 1 18 7a4.5 4.5 0 0 1 .5 9"/><path d="M12 11v9M9 17l3 3 3-3"/>',
  fetch: '<path d="M20 12a8 8 0 1 1-2.4-5.7"/><path d="M20 3.5V9h-5.5"/>',
  branch: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="6" r="2"/><path d="M6 7v10M18 8c0 5-12 3-12 9"/>',
  'pull-request': '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/><path d="M6 7v10M18 17V9a3 3 0 0 0-3-3h-4"/><path d="M13 3.5 10.5 6 13 8.5"/>',
  review: '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
  merge: '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="13" r="2"/><path d="M6 7v10M6 8.5c0 3.5 5 4.5 10 4.5"/>',
  issue: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="1.6"/>',
  clone: '<rect x="8.5" y="8.5" width="12" height="12" rx="2"/><path d="M15.5 8.5V5.5A2 2 0 0 0 13.5 3.5h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h3"/>',
  history: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  warning: '<path d="M12 3.5 21.5 20h-19z"/><path d="M12 10v4.5M12 17.2v.3"/>',
  undo: '<path d="M9 14.5 4 9.5l5-5"/><path d="M4 9.5h10.5a6 6 0 0 1 0 12H11"/>',
  revert: '<path d="M4 12a8 8 0 1 0 2.4-5.7"/><path d="M4 3.5V9h5.5"/><path d="M9 12h6"/>',
  conflict: '<path d="M3 8h13M12.5 4.5 16 8l-3.5 3.5M21 16H8M11.5 12.5 8 16l3.5 3.5"/>',
  ai: '<path d="M11 3l1.8 4.7L17.5 9.5l-4.7 1.8L11 16l-1.8-4.7L4.5 9.5l4.7-1.8z"/><path d="M18 14.5l.9 2.1 2.1.9-2.1.9-.9 2.1-.9-2.1-2.1-.9 2.1-.9z"/>',
  chat: '<path d="M4 5h16v11H9.5L5 20v-4H4z"/><path d="M8 9.5h8M8 12.5h5"/>',
  people: '<circle cx="9" cy="8" r="3"/><path d="M3 20c0-3.3 2.7-5.5 6-5.5s6 2.2 6 5.5"/><circle cx="17" cy="9" r="2.5"/><path d="M16.5 14.6c2.8.2 4.5 2.2 4.5 5.4"/>',
  lock: '<rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7.5a4 4 0 0 1 8 0V11"/>',
  idea: '<path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.8 10.6c.7.7 .8 1.4.8 2.4h6c0-1 .1-1.7.8-2.4A6 6 0 0 0 12 3z"/>',
  map: '<path d="M3 6.5 9 4l6 2.5L21 4v13.5L15 20l-6-2.5L3 20z"/><path d="M9 4v13.5M15 6.5V20"/>',
  practice: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
  book: '<path d="M5 4.5h11.5A1.5 1.5 0 0 1 18 6v14H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h11"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.6 2.2c-.7.4-1.1.9-1.1 1.7v.6M12 16.8v.4"/>',
  list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
};

// Icon name -> [glyph, place]
const ICONS = {
  'place-folder': ['folder', 'folder'],
  'place-desktop': ['monitor', 'desktop'],
  'place-web': ['browser', 'web'],
  account: ['account', 'web'],
  install: ['install', 'desktop'],
  'new-repo': ['new-repo', 'desktop'],
  'open-folder': ['folder', 'folder'],
  edit: ['edit', 'folder'],
  changes: ['changes', 'desktop'],
  commit: ['commit', 'desktop'],
  publish: ['publish', 'desktop'],
  push: ['push', 'desktop'],
  fetch: ['fetch', 'desktop'],
  pull: ['pull', 'desktop'],
  branch: ['branch', 'desktop'],
  clone: ['clone', 'desktop'],
  history: ['history', 'desktop'],
  'pull-request': ['pull-request', 'web'],
  review: ['review', 'web'],
  merge: ['merge', 'web'],
  issue: ['issue', 'web'],
  'view-online': ['browser', 'web'],
  people: ['people', 'web'],
  ai: ['ai', 'ai'],
  'ai-chat': ['chat', 'ai'],
  check: ['check', 'folder'],
  warning: ['warning', 'help'],
  undo: ['undo', 'help'],
  revert: ['revert', 'help'],
  conflict: ['conflict', 'help'],
  lock: ['lock', 'help'],
  idea: ['idea', 'ink'],
  map: ['map', 'ink'],
  practice: ['practice', 'ink'],
  book: ['book', 'ink'],
  question: ['question', 'help'],
  list: ['list', 'ink'],
};

function tile(name, size = 64) {
  const [glyph, place] = ICONS[name];
  const color = PLACES[place].color;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64" role="img" aria-label="${name.replace(/-/g, ' ')}">` +
    `<rect width="64" height="64" rx="15" fill="${color}"/>` +
    `<g transform="translate(14 14) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${G[glyph]}</g></svg>\n`;
}

module.exports = { PLACES, G, ICONS, tile };

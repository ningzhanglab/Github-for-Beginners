// Builds the whole guide as ONE web page: index.html.
//
// Source: the Markdown lessons in lessons/. Icons and route pictures are embedded,
// so index.html is a single self-contained file that also works offline.
//
// Run from the repository root after editing a lesson:
//   npm install --no-save marked@15
//   node tools/build-site.cjs
// Edit the Markdown, never index.html.
const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');
const assets = require('./build-assets.cjs');
const { PLACES, G, ICONS } = require('./icons.cjs');

const root = path.join(__dirname, '..');
const REPO = 'https://github.com/ningzhanglab/Github-for-Beginners';
const PAGES = 'https://ningzhanglab.github.io/Github-for-Beginners/';

// Everything on the page, in order.
const SECTIONS = [
  { id: 'lesson-1', file: '01-what-is-github', icon: 'idea', title: 'What is GitHub?', time: '10 min', n: 1 },
  { id: 'lesson-2', file: '02-get-set-up', icon: 'install', title: 'Get set up', time: '10 min', n: 2 },
  { id: 'lesson-3', file: '03-your-first-project', icon: 'new-repo', title: 'Your first project', time: '15 min', n: 3 },
  { id: 'lesson-4', file: '04-save-and-sync', icon: 'push', title: 'Save and sync every day', time: '10 min', n: 4 },
  { id: 'lesson-5', file: '05-branches-and-pull-requests', icon: 'branch', title: 'Branches and pull requests', time: '20 min', n: 5 },
  { id: 'lesson-6', file: '06-work-with-other-people', icon: 'people', title: 'Work with other people', time: '20 min', n: 6 },
  { id: 'lesson-7', file: '07-work-with-ai', icon: 'ai', title: 'Work with an AI assistant', time: '20 min', n: 7 },
  { id: 'lesson-8', file: '08-fix-mistakes', icon: 'undo', title: 'Fix mistakes', time: '15 min', n: 8 },
  { id: 'practice', file: 'practice', icon: 'practice', title: 'Practise everything' },
  { id: 'cheat-sheet', file: 'cheat-sheet', icon: 'list', title: 'Cheat sheet' },
  { id: 'dictionary', file: 'dictionary', icon: 'book', title: 'Dictionary', folded: true },
  { id: 'ai-prompts', file: 'ai-prompts', icon: 'ai-chat', title: 'AI prompt library', folded: true },
];
const LESSONS = SECTIONS.filter(s => s.n);
const BY_FILE = Object.fromEntries(SECTIONS.map(s => [s.file + '.md', s]));

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
const icon = (name, size, cls = 'ic') => `<svg class="${cls}" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}"/></svg>`;

function sprite() {
  const symbols = Object.entries(ICONS).map(([name, [glyph, place]]) =>
    `<symbol id="i-${name}" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="${PLACES[place].color}"/><g transform="translate(14 14) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${G[glyph]}</g></symbol>`).join('');
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${symbols}</svg>`;
}

// Make links that work on GitHub point inside this page instead.
function fixLinks(html) {
  return html.replace(/href="([^"]+)"/g, (all, url) => {
    if (url === PAGES) return 'href="#top"';
    if (url.startsWith(PAGES)) return `href="${url.slice(PAGES.length)}"`;
    if (/^(https?:|mailto:|#)/.test(url)) return all;
    const p = url.split('#')[0];
    if (BY_FILE[p]) return `href="#${BY_FILE[p].id}"`;
    if (p === 'README.md') return 'href="#contents"';
    if (p === '../README.md') return `href="${REPO}"`;
    const abs = path.posix.normalize(path.posix.join('lessons', p)).replace(/\/$/, '');
    return `href="${REPO}/blob/main/${abs}"`;
  });
}

// Replace image files with embedded icons and pictures.
function embedImages(html) {
  html = html.replace(/<img src="\.\.\/assets\/icons\/([\w-]+)\.svg" width="(\d+)" height="\d+" alt="[^"]*">/g, (m, name, w) => icon(name, w));
  html = html.replace(/<img src="\.\.\/assets\/routes\/([\w-]+)\.svg" alt="([^"]*)">/g, (m, id) => {
    const svg = fs.readFileSync(path.join(root, 'assets', 'routes', id + '.svg'), 'utf8').trim();
    return `<span class="route">${svg.replace(/ width="\d+" height="\d+"/, '')}</span>`;
  });
  html = html.replace(/<img src="\.\.\/assets\/illustrations\/([\w-]+)\.svg" alt="([^"]*)">/g, (m, name, alt) => {
    const data = fs.readFileSync(path.join(root, 'assets', 'illustrations', name + '.svg')).toString('base64');
    return `<img class="illustration" src="data:image/svg+xml;base64,${data}" alt="${alt}">`;
  });
  return html;
}

// Step headings become cards; "where" lines become badges; warnings get their own style.
function decorate(html) {
  html = html.replace(/<p><svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-(place-folder|place-desktop|place-web|ai|people)"\/><\/svg> <strong>([^<]+)<\/strong><\/p>/g,
    (m, name, label) => `<p class="where where-${name}">${icon(name, 22)} ${label}</p>`);
  html = html.replace(/<blockquote>\s*<p><svg class="ic" width="20" height="20" aria-hidden="true"><use href="#i-warning"\/><\/svg> <strong>Watch out:<\/strong>/g,
    `<blockquote class="watch"><p>${icon('warning', 22)} <strong>Watch out:</strong>`);
  html = html.replace(/<h4>\s*<svg class="ic" width="36"/g, '<h4 class="step-title"><svg class="ic" width="44"').replace(/(<h4 class="step-title"><svg class="ic" width="44") height="36"/g, '$1 height="44"');
  const parts = html.split(/(?=<h[34][ >])|(?=<hr>)/);
  return parts.map(part => (part.startsWith('<h4 class="step-title"') ? `<div class="step">${part}</div>\n` : part)).join('');
}

function sectionBody(s) {
  let md = fs.readFileSync(path.join(root, 'lessons', s.file + '.md'), 'utf8');
  md = md.replace(/^# .+\n/, '');                         // the page draws its own title
  const cut = md.lastIndexOf('\n---\n');                   // drop "Next / All lessons" footers
  if (cut > 0) md = md.slice(0, cut) + '\n';
  const tokens = marked.lexer(md);
  marked.walkTokens(tokens, t => { if (t.type === 'heading') t.depth = Math.min(6, t.depth + 1); });
  return decorate(embedImages(fixLinks(marked.parser(tokens))));
}

function lessonSection(s, i) {
  const next = SECTIONS[SECTIONS.indexOf(s) + 1];
  return `<section class="lesson" id="${s.id}" data-lesson="${s.n}" aria-labelledby="${s.id}-title">
<header class="lesson-head"><span class="lesson-num" aria-hidden="true">${s.n}</span>${icon(s.icon, 56, 'ic lesson-icon')}<div><p class="kicker">Lesson ${s.n} of ${LESSONS.length}, about ${s.time}</p><h2 id="${s.id}-title">${esc(s.title)}</h2></div></header>
${sectionBody(s)}
<footer class="lesson-end"><label class="done"><input type="checkbox" data-done="${s.n}"> I finished lesson ${s.n}</label>${next ? `<a class="next" href="#${next.id}">Next: ${esc(next.n ? 'Lesson ' + next.n + ', ' : '')}${esc(next.title)}</a>` : ''}</footer>
</section>`;
}

function extraSection(s) {
  const head = `${icon(s.icon, 40)}<span>${esc(s.title)}</span>`;
  if (s.folded) {
    return `<section class="extra" id="${s.id}"><details><summary><h2>${head}</h2><span class="open-hint">Show</span></summary>${sectionBody(s)}</details></section>`;
  }
  return `<section class="extra" id="${s.id}"><h2>${head}</h2>${sectionBody(s)}</section>`;
}

function navList(cls) {
  const lessons = LESSONS.map(s => `<li><a href="#${s.id}" data-nav="${s.id}">${icon(s.icon, 26)}<span>${s.n}. ${esc(s.title)}</span><svg class="tick" width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></a></li>`).join('');
  const extras = SECTIONS.filter(s => !s.n).map(s => `<li><a href="#${s.id}" data-nav="${s.id}">${icon(s.icon, 26)}<span>${esc(s.title)}</span></a></li>`).join('');
  return `<ol class="${cls}">${lessons}</ol><p class="nav-label">Extras</p><ul class="${cls}">${extras}</ul>`;
}

function page() {
  const css = fs.readFileSync(path.join(__dirname, 'site.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, 'site.js'), 'utf8');
  const intro = `<section class="intro" id="contents" aria-labelledby="pageTitle">
<h1 id="pageTitle">Learn GitHub on one page</h1>
<p class="lede">Keep versions of your work, collaborate with coauthors, and check what an AI assistant changed, using the free GitHub Desktop app. No coding, no terminal. Every example uses a small, made-up economics project.</p>
<div class="how">
  <p><strong>How to use this page:</strong> just scroll. Everything is here, in order, with a picture or icon for every step. Tick <em>I finished</em> at the end of each lesson to keep your place; this browser remembers it.</p>
  <p><strong>Short on time?</strong> Lessons 1 to 4 are all you need for a personal project.</p>
</div>
<h2 class="small-h">Every step happens in one of three places</h2>
<ol class="places">
  <li>${icon('place-folder', 48)}<strong>Your project folder</strong><span>You edit files with your usual editor.</span></li>
  <li>${icon('place-desktop', 48)}<strong>GitHub Desktop</strong><span>You see what changed, save checkpoints, and sync.</span></li>
  <li>${icon('place-web', 48)}<strong>GitHub.com</strong><span>You and others review and accept changes.</span></li>
</ol>
<p class="note">Each step's icon colour matches its place. Magenta ${icon('ai', 20)} means an AI assistant does the step, and you check it afterwards.</p>
<h2 class="small-h">What's on this page</h2>
<div class="toc-grid">${LESSONS.map(s => `<a class="toc-card" href="#${s.id}">${icon(s.icon, 40)}<span><span class="toc-n">Lesson ${s.n}, ${s.time}</span><strong>${esc(s.title)}</strong></span></a>`).join('')}</div>
<p class="extras-line">Plus: ${SECTIONS.filter(s => !s.n).map(s => `<a href="#${s.id}">${esc(s.title)}</a>`).join(', ')}.</p>
<p class="start"><a class="button" href="#lesson-1">Start with lesson 1</a></p>
</section>`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="The whole beginner's guide to GitHub Desktop on one page: eight short lessons with an icon for every step. No coding, no terminal.">
<title>GitHub for Beginners: everything on one page</title>
<link rel="icon" href="data:image/svg+xml;base64,${Buffer.from(fs.readFileSync(path.join(root, 'assets/icons/branch.svg'))).toString('base64')}">
<style>${css}</style>
</head>
<body id="top">
${sprite()}
<a class="skip" href="#contents">Skip to the guide</a>
<header class="bar">
  <a class="brand" href="#top">${icon('branch', 30)}<span>GitHub for Beginners</span></a>
  <div class="progress" aria-live="polite"><span id="progressText">0 of ${LESSONS.length} lessons done</span><span class="rail" aria-hidden="true"><span id="progressFill"></span></span></div>
  <details class="mobile-nav"><summary id="mobileNavLabel">Contents</summary><nav aria-label="Contents">${navList('nav-list')}</nav></details>
</header>
<div class="frame">
<nav class="side" aria-label="Contents"><p class="nav-label">Lessons</p>${navList('nav-list')}<p class="side-extra"><a href="course.html">Practise clicking in a safe simulator</a></p></nav>
<main>
${intro}
${LESSONS.map(lessonSection).join('\n')}
<div class="extras-intro"><h2>Extras</h2><p>Practice labs and quick references. Come back to these whenever you need them.</p></div>
${SECTIONS.filter(s => !s.n).map(extraSection).join('\n')}
<footer class="foot">
<p>Button names follow current GitHub Desktop; check the <a href="https://docs.github.com/en/desktop">official GitHub Desktop documentation</a> if yours look different. Pictures are illustrations, not screenshots.</p>
<p>This page is a guide only: nothing here connects to your GitHub account. <a href="${REPO}">Source on GitHub</a>.</p>
</footer>
</main>
</div>
<script>${js}</script>
</body>
</html>
`;
}

function build() {
  const a = assets.build();
  fs.writeFileSync(path.join(root, 'index.html'), page());
  const kb = Math.round(fs.statSync(path.join(root, 'index.html')).size / 1024);
  console.log(`Built index.html (${kb} KB): ${LESSONS.length} lessons and ${SECTIONS.length - LESSONS.length} extras on one page; ${a.icons} icons, ${a.routes} route pictures.`);
}

module.exports = { SECTIONS, LESSONS };
if (require.main === module) build();

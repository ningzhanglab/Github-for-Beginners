// Builds the lesson website from the Markdown lessons.
//
//   lessons/*.md   ->  learn/*.html   (one web page per lesson)
//   (lesson list)  ->  index.html     (the website's home page)
//
// It also rebuilds the icons and route pictures (tools/build-assets.cjs).
// Run from the repository root after editing a lesson:
//   npm install --no-save marked@15
//   node tools/build-site.cjs
// Edit the Markdown, never the generated HTML.
const fs = require('node:fs');
const path = require('node:path');
const { marked } = require('marked');
const assets = require('./build-assets.cjs');

const root = path.join(__dirname, '..');
const REPO = 'https://github.com/ningzhanglab/Github-for-Beginners';
const PAGES = 'https://ningzhanglab.github.io/Github-for-Beginners/';

// The learning path. Order here is the order on the site.
const PAGES_LIST = [
  { file: '01-what-is-github', icon: 'idea', short: 'What is GitHub?', blurb: 'The three places and six key words', time: '10 min', group: 'Start' },
  { file: '02-get-set-up', icon: 'install', short: 'Get set up', blurb: 'Account, GitHub Desktop, sign in', time: '10 min', group: 'Start' },
  { file: '03-your-first-project', icon: 'new-repo', short: 'Your first project', blurb: 'Create, edit, commit and publish', time: '15 min', group: 'Start' },
  { file: '04-save-and-sync', icon: 'push', short: 'Save and sync', blurb: 'Push your work, pull others’ work', time: '10 min', group: 'Start' },
  { file: '05-branches-and-pull-requests', icon: 'branch', short: 'Branches and pull requests', blurb: 'Try changes safely, accept after review', time: '20 min', group: 'Grow' },
  { file: '06-work-with-other-people', icon: 'people', short: 'Work with other people', blurb: 'Join a project, Issues, reviews', time: '20 min', group: 'Grow' },
  { file: '07-work-with-ai', icon: 'ai', short: 'Work with an AI assistant', blurb: 'Let AI help; you decide', time: '20 min', group: 'Grow' },
  { file: '08-fix-mistakes', icon: 'undo', short: 'Fix mistakes', blurb: 'Undo safely at every stage', time: '15 min', group: 'Grow' },
  { file: 'practice', icon: 'practice', short: 'Practise everything', blurb: 'Four hands-on labs', group: 'Reference' },
  { file: 'cheat-sheet', icon: 'list', short: 'Cheat sheet', blurb: 'Every button on one page', group: 'Reference' },
  { file: 'dictionary', icon: 'book', short: 'Dictionary', blurb: 'Every GitHub word, in plain English', group: 'Reference' },
  { file: 'ai-prompts', icon: 'ai-chat', short: 'AI prompt library', blurb: 'Safe instructions to copy', group: 'Reference' },
];
const LESSONS = PAGES_LIST.filter(p => p.time);

function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }

// Rewrite links that make sense on GitHub into links that work on the website.
function fixLinks(html, depth) {
  const up = depth ? '../' : '';
  return html.replace(/(href|src)="([^"]+)"/g, (all, attr, url) => {
    if (url.startsWith(PAGES)) url = up + url.slice(PAGES.length);
    if (/^(https?:|mailto:|#)/.test(url)) return `${attr}="${url}"`;
    const [p, hash] = url.split('#');
    let out = p;
    if (depth && !p.includes('/') && p.endsWith('.md')) out = p === 'README.md' ? 'index.html' : p.replace(/\.md$/, '.html');
    else if (depth && p === '../README.md') out = '../index.html';
    else if (p.endsWith('.md') || p.endsWith('/') || p.endsWith('.csv')) {
      const abs = path.posix.normalize(path.posix.join(depth ? 'lessons' : '', p));
      out = `${REPO}/blob/main/${abs.replace(/\/$/, '')}`;
    }
    return `${attr}="${out}${hash ? '#' + hash : ''}"`;
  });
}

// Turn "### <icon> Step" sections into cards and mark "where" lines and warnings.
function decorate(html) {
  html = html.replace(/<p><img src="\.\.\/assets\/icons\/(place-folder|place-desktop|place-web|ai|people)\.svg"[^>]*> <strong>([^<]+)<\/strong><\/p>/g,
    (m, icon, label) => `<p class="where where-${icon}"><img src="../assets/icons/${icon}.svg" width="22" height="22" alt=""> ${label}</p>`);
  html = html.replace(/<blockquote>\s*<p><img src="\.\.\/assets\/icons\/warning\.svg"[^>]*> <strong>Watch out:<\/strong>/g,
    '<blockquote class="watch"><p><img src="../assets/icons/warning.svg" width="22" height="22" alt=""> <strong>Watch out:</strong>');
  const parts = html.split(/(?=<h[23][ >])|(?=<hr>)/);
  return parts.map(part => (/^<h3>\s*<img /.test(part) ? `<section class="step">${part}</section>\n` : part)).join('');
}

const CSS = fs.readFileSync(path.join(__dirname, 'site.css'), 'utf8');

function shell({ title, description, depth, body, active }) {
  const up = depth ? '../' : '';
  const nav = ['Start', 'Grow', 'Reference'].map(group => {
    const items = PAGES_LIST.filter(p => p.group === group).map(p => {
      const n = LESSONS.indexOf(p);
      const label = (n >= 0 ? (n + 1) + '. ' : '') + p.short;
      return `<li><a href="${up}learn/${p.file}.html"${active === p.file ? ' aria-current="page"' : ''}><img src="${up}assets/icons/${p.icon}.svg" width="26" height="26" alt="">${esc(label)}</a></li>`;
    }).join('');
    const name = { Start: 'Lessons 1–4: on your own', Grow: 'Lessons 5–8: with others', Reference: 'Practice and reference' }[group];
    return `<p class="nav-group">${name}</p><ul>${items}</ul>`;
  }).join('');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="${esc(description)}">
<title>${esc(title)}</title>
<link rel="icon" href="${up}assets/icons/branch.svg">
<style>${CSS}</style>
</head>
<body>
<a class="skip" href="#content">Skip to the lesson</a>
<header class="bar">
  <a class="home" href="${up}index.html"><img src="${up}assets/icons/branch.svg" width="30" height="30" alt="">GitHub for Beginners</a>
  <nav aria-label="Websites"><a href="${up}learn/index.html"${active === 'lessons' ? ' aria-current="page"' : ''}>Lessons</a><a href="${up}workflows.html">Route map</a><a href="${up}course.html">Simulator</a></nav>
</header>
<div class="frame${depth ? '' : ' frame-home'}">
${depth ? `<nav class="side" aria-label="All lessons">${nav}</nav>` : ''}
<main id="content" tabindex="-1">
${body}
</main>
</div>
<footer class="foot"><p>Free, beginner-friendly lessons for GitHub Desktop. No terminal. Every example uses a fictional economics project.</p>
<p>Button names follow current GitHub Desktop; check the <a href="https://docs.github.com/en/desktop">official documentation</a> if yours look different. <a href="${REPO}">Source on GitHub</a>.</p></footer>
</body>
</html>
`;
}

function buildLesson(p, i) {
  const md = fs.readFileSync(path.join(root, 'lessons', p.file + '.md'), 'utf8');
  // The page has its own previous/next buttons, so drop the Markdown footer links.
  const trimmed = md.replace(/\n---\n\n\*\*Next:\*\*[^\n]*\n/, '\n').replace(/\n---\n\n\[All lessons\][^\n]*\n/, '\n').replace(/\n---\n\n\[Lesson 7[^\n]*\n/, '\n');
  let html = decorate(fixLinks(marked.parse(trimmed), 1));
  const title = (md.match(/^# (.+)$/m) || [, p.short])[1];
  const prev = PAGES_LIST[i - 1], next = PAGES_LIST[i + 1];
  html += `<nav class="pager" aria-label="Previous and next">${prev ? `<a class="prev" href="${prev.file}.html"><span>Previous</span>${esc(prev.short)}</a>` : '<span></span>'}${next ? `<a class="next" href="${next.file}.html"><span>Next</span>${esc(next.short)}</a>` : ''}</nav>`;
  return shell({ title: title.replace(/<[^>]+>/g, '') + ' | GitHub for Beginners', description: p.blurb, depth: 1, body: `<article class="lesson">${html}</article>`, active: p.file });
}

function buildLessonIndex() {
  const md = fs.readFileSync(path.join(root, 'lessons', 'README.md'), 'utf8').replace(/\n---\n\n\[Back to the start page\][^\n]*\n/, '\n');
  const html = decorate(fixLinks(marked.parse(md), 1));
  return shell({ title: 'All lessons | GitHub for Beginners', description: 'Eight short GitHub Desktop lessons for complete beginners.', depth: 1, body: `<article class="lesson">${html}</article>`, active: 'lessons' });
}

function buildHome() {
  const card = (p, i) => `<li><a class="card" href="learn/${p.file}.html"><img src="assets/icons/${p.icon}.svg" width="48" height="48" alt=""><span class="card-text"><span class="card-num">Lesson ${i + 1}${p.time ? ', ' + p.time : ''}</span><strong>${esc(p.short)}</strong><span>${esc(p.blurb)}</span></span></a></li>`;
  const body = `
<section class="hero">
  <h1>Learn GitHub one picture at a time</h1>
  <p class="lede">Keep versions of your work, collaborate with coauthors, and check what an AI assistant changed. Eight short lessons with an icon for every step. No coding, no terminal.</p>
  <p class="cta"><a class="button" href="learn/01-what-is-github.html">Start lesson 1</a><a class="button ghost" href="workflows.html">See every workflow</a></p>
  <figure class="hero-route"><a href="workflows.html#pr"><img src="assets/routes/pr.svg" alt="Route picture of proposing a change: start in GitHub Desktop, edit in your folder, commit and publish in Desktop, review and merge on GitHub.com, then pull back into Desktop."></a>
  <figcaption>This is how every lesson shows a workflow: each circle is a step, placed in the band where it happens. This one is lesson 5, proposing a change for review.</figcaption></figure>
</section>
<section class="places" aria-labelledby="placesTitle">
  <h2 id="placesTitle">Every step happens in one of three places</h2>
  <ol class="place-row">
    <li><img src="assets/icons/place-folder.svg" width="56" height="56" alt=""><strong>Your project folder</strong><span>You edit files with your usual editor.</span></li>
    <li><img src="assets/icons/place-desktop.svg" width="56" height="56" alt=""><strong>GitHub Desktop</strong><span>You see what changed, save checkpoints, and sync.</span></li>
    <li><img src="assets/icons/place-web.svg" width="56" height="56" alt=""><strong>GitHub.com</strong><span>You and others review and accept changes.</span></li>
  </ol>
  <p class="note">The icon colours in every lesson match these three places, so you always know where you are.</p>
</section>
<section aria-labelledby="pathTitle">
  <h2 id="pathTitle">The learning path</h2>
  <div class="path">
    <div><h3>On your own</h3><p>Lessons 1 to 4 are all you need for a personal project.</p><ol class="cards">${LESSONS.slice(0, 4).map((p, i) => card(p, i)).join('')}</ol></div>
    <div><h3>With others</h3><p>Add coauthors, AI assistants, and a safety net.</p><ol class="cards">${LESSONS.slice(4).map((p, i) => card(p, i + 4)).join('')}</ol></div>
  </div>
</section>
<section class="tools" aria-labelledby="toolsTitle">
  <h2 id="toolsTitle">Two ways to practise</h2>
  <ul class="tool-row">
    <li><a class="card" href="workflows.html"><img src="assets/icons/map.svg" width="48" height="48" alt=""><span class="card-text"><strong>Route map</strong><span>Step through all eight workflows and see where each step happens.</span></span></a></li>
    <li><a class="card" href="course.html"><img src="assets/icons/practice.svg" width="48" height="48" alt=""><span class="card-text"><strong>Desktop simulator</strong><span>Click through a safe, pretend GitHub Desktop. Nothing real changes.</span></span></a></li>
    <li><a class="card" href="learn/cheat-sheet.html"><img src="assets/icons/list.svg" width="48" height="48" alt=""><span class="card-text"><strong>Cheat sheet</strong><span>Every button you need, on one page.</span></span></a></li>
  </ul>
</section>`;
  return shell({ title: 'GitHub for Beginners: learn GitHub Desktop step by step', description: 'Eight short, picture-based lessons for GitHub Desktop beginners, with a route map and a safe simulator.', depth: 0, body, active: 'home' });
}

function build() {
  const a = assets.build();
  const out = path.join(root, 'learn');
  fs.mkdirSync(out, { recursive: true });
  PAGES_LIST.forEach((p, i) => fs.writeFileSync(path.join(out, p.file + '.html'), buildLesson(p, i)));
  fs.writeFileSync(path.join(out, 'index.html'), buildLessonIndex());
  fs.writeFileSync(path.join(root, 'index.html'), buildHome());
  console.log(`Built ${PAGES_LIST.length + 1} lesson pages, the home page, ${a.icons} icons and ${a.routes} route pictures.`);
}

module.exports = { PAGES_LIST, LESSONS };
if (require.main === module) build();

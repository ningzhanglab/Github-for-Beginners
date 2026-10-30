// Builds the guide page, index.html: one story followed from start to finish,
// with every step showing Mia's folder, GitHub Desktop and GitHub.com side by side.
//
// Run from the repository root after changing the story, the look, or an icon:
//   node tools/build-guide.cjs
// No installation needed. Edit tools/story.cjs (words) or tools/guide.css (look), never index.html.
// It also rebuilds the icons and route pictures used by the Markdown lessons.
const fs = require('node:fs');
const path = require('node:path');
const { PLACES, G, ICONS } = require('./icons.cjs');
const assets = require('./build-assets.cjs');
const story = require('./story.cjs');

const root = path.join(__dirname, '..');
const REPO = 'https://github.com/ningzhanglab/Github-for-Beginners';
const PLACE = {
  folder: { name: 'Your folder', icon: 'place-folder' },
  desktop: { name: 'GitHub Desktop', icon: 'place-desktop' },
  web: { name: 'GitHub.com', icon: 'place-web' },
};

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = s => esc(s).replace(/\*\*(.+?)\*\*/g, '<b class="ui">$1</b>').replace(/`([^`]+)`/g, '<code>$1</code>').replace(/\*(.+?)\*/g, '<em>$1</em>');
const icon = (name, size, cls = 'ic') => `<svg class="${cls}" width="${size}" height="${size}" aria-hidden="true"><use href="#i-${name}"/></svg>`;
const cls = (...c) => c.filter(Boolean).join(' ');

function sprite() {
  return `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${Object.entries(ICONS).map(([name, [glyph, place]]) =>
    `<symbol id="i-${name}" viewBox="0 0 64 64"><rect width="64" height="64" rx="15" fill="${PLACES[place].color}"/><g transform="translate(14 14) scale(1.5)" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round">${G[glyph]}</g></symbol>`).join('')}</svg>`;
}

function codeLines(ls) {
  return `<pre class="code">${ls.map(l => `<span class="${cls('ln', l.k)}">${l.k === 'add' ? '+' : l.k === 'del' ? '−' : l.k === 'warn' ? '!' : ' '} ${esc(l.t) || ' '}</span>`).join('')}</pre>`;
}

// ---- The three mini screens --------------------------------------------------
function folderPane(f) {
  return `<div class="files">${f.files.map(x => `<span class="${cls('file', x.open && 'open', x.new && 'new')}">${esc(x.n)}</span>`).join('')}</div>` +
    (f.doc ? `<div class="${cls('doc', f.stale && 'stale')}"><div class="doc-name">${esc(f.doc.name)}</div>${codeLines(f.doc.lines)}</div>` : '<p class="empty">Only a README so far.</p>');
}

function desktopPane(d) {
  const bar = `<div class="app-bar"><div class="seg"><small>Current repository</small><b>wage-study</b></div><div class="${cls('seg', d.branchNew && 'new')}"><small>Current branch</small><b>${esc(d.branch)}</b></div><div class="${cls('seg btn', d.btn.new && 'new')}"><small>&nbsp;</small><b>${esc(d.btn.label)}</b></div></div>`;
  const nChanges = (d.changes || []).length;
  const tabs = `<div class="tabs"><span class="${d.tab === 'changes' ? 'on' : ''}">Changes${nChanges ? ' ' + nChanges : ''}</span><span class="${d.tab === 'history' ? 'on' : ''}">History</span></div>`;
  let body;
  if (d.tab === 'changes') {
    body = nChanges ? d.changes.map(c => `<div class="chg"><span class="tick" aria-hidden="true">✓</span>${esc(c.file)}</div>${codeLines(c.lines)}`).join('') +
      (d.commitBox ? `<div class="commit-box"><span class="field">${esc(d.commitBox)}</span><span class="cbtn">Commit to ${esc(d.branch)}</span></div>` : '')
      : '<p class="empty">No local changes</p>';
  } else {
    body = `<ol class="history">${d.history.slice(0, 5).map(h => `<li class="${cls(h.new && 'new', h.bad && 'bad')}">${esc(h.t)}${h.by ? `<small>${esc(h.by)}</small>` : ''}</li>`).join('')}${d.history.length > 5 ? `<li class="earlier">and ${d.history.length - 5} earlier</li>` : ''}</ol>`;
  }
  return `<div class="app">${bar}${tabs}<div class="app-body">${body}</div></div>`;
}

function webPane(w) {
  if (w.view === 'none') {
    return `<div class="browser"><div class="url">github.com</div><div class="page empty-page"><p><b>Not online yet.</b></p><p>${esc(w.note || 'This project only exists on Mia’s computer.')}</p></div></div>`;
  }
  if (w.view === 'repo') {
    return `<div class="${cls('browser', w.new && 'new')}"><div class="url">github.com/mia/wage-study</div><div class="page">` +
      `<div class="repo-head"><b>mia / wage-study</b><span class="pill">Private</span></div>` +
      `<div class="repo-meta"><span class="branch-chip">${esc(w.branch)}</span><span>${w.commits} commits</span></div>` +
      `<div class="latest">Latest: ${esc(w.latest)}</div>` +
      `<div class="files">${w.files.map(x => `<span class="file">${esc(x.n)}</span>`).join('')}</div>` +
      (w.preview ? `<div class="doc"><div class="doc-name">${esc(w.preview.name)}</div>${codeLines(w.preview.lines)}</div>` : '') +
      (w.note ? `<p class="web-note">${esc(w.note)}</p>` : '') + `</div></div>`;
  }
  const p = w.pr;
  const statusCls = { Open: 'open', Merged: 'merged', 'Changes requested': 'changes' }[p.status];
  return `<div class="${cls('browser', w.new && 'new')}"><div class="url">github.com/mia/wage-study/pull/${p.n}</div><div class="page">` +
    `<div class="pr-title"><b>${esc(p.title)}</b> <span class="muted">#${p.n}</span></div>` +
    `<div class="pr-meta"><span class="${cls('status', statusCls, p.statusNew && 'flash')}">${esc(p.status)}</span><span>${esc(p.by)} wants to merge <code>${esc(p.head)}</code> into <code>${esc(p.base)}</code></span></div>` +
    (p.ref ? `<div class="latest">${esc(p.ref)}</div>` : '') +
    `<div class="tabs"><span>Conversation</span><span class="on">Files changed ${p.files.length}</span></div>` +
    p.files.map(f => `<div class="${cls('pr-file', f.warn && 'warn')}"><div class="doc-name">${esc(f.name)}</div>${codeLines(f.lines.map(l => (f.warn && l.k ? { ...l, k: l.k } : l)))}</div>`).join('') +
    (p.comments || []).map(c => `<div class="${cls('comment', c.kind)}"><b>${esc(c.by)}:</b> ${esc(c.t)}</div>`).join('') + `</div></div>`;
}

function pane(kind, data, active) {
  const p = PLACE[kind];
  const inner = kind === 'folder' ? folderPane(data) : kind === 'desktop' ? desktopPane(data) : webPane(data);
  const tag = kind === 'folder' && data.branch ? `<span class="branch-chip">${esc(data.branch)}</span>` : '';
  const note = kind === 'folder' && data.note ? `<span class="flag">${esc(data.note)}</span>` : '';
  return `<figure class="${cls('pane', 'pane-' + kind, active && 'active')}" aria-label="${p.name}${active ? ' (this step happens here)' : ''}">` +
    `<figcaption class="pane-head">${icon(p.icon, 22)}<span>${p.name}</span>${tag}${note}${active ? '<span class="here">This step</span>' : ''}</figcaption>${inner}</figure>`;
}

// ---- Page ----------------------------------------------------------------
function stepSection(s, i, n) {
  const order = s.active === 'folder' ? ['folder', 'desktop', 'web'] : s.active === 'web' ? ['web', 'folder', 'desktop'] : ['desktop', 'folder', 'web'];
  const who = s.who === 'Mia' ? '' : `<span class="who">${icon(s.who === 'Sam' ? 'people' : 'ai', 20)}${esc(s.who)} does this</span>`;
  return `<section class="step" id="step-${i + 1}" data-step="${i + 1}" aria-labelledby="step-${i + 1}-title">
<div class="step-text">
  <header class="step-head"><span class="step-num">${i + 1}</span>${icon(s.icon, 44)}<div><p class="kicker">Step ${i + 1} of ${n}</p><h3 id="step-${i + 1}-title">${esc(s.title)}</h3></div></header>
  ${who}
  <p class="story">${fmt(s.story)}</p>
  <div class="do"><p class="do-label">${icon(PLACE[s.active].icon, 20)} Do this, in ${s.active === 'folder' ? 'your folder' : PLACE[s.active].name}</p><ol>${s.do.map(d => `<li>${fmt(d)}</li>`).join('')}</ol></div>
  <p class="why"><b>What changed:</b> ${fmt(s.why)}</p>
  ${s.watch ? `<p class="watch">${icon('warning', 20)} <span><b>Watch out:</b> ${fmt(s.watch)}</span></p>` : ''}
</div>
<div class="board" data-order="${order.join(' ')}">${['folder', 'desktop', 'web'].map(k => pane(k, s[k], k === s.active)).join('')}</div>
</section>`;
}

function page() {
  const css = fs.readFileSync(path.join(__dirname, 'guide.css'), 'utf8');
  const js = fs.readFileSync(path.join(__dirname, 'guide.js'), 'utf8');
  const n = story.steps.length;
  let body = '';
  for (const act of story.acts) {
    const steps = story.steps.map((s, i) => [s, i]).filter(([s]) => s.act === act.id);
    body += `<section class="act" id="${act.id}"><h2>${esc(act.title)}</h2><p>${esc(act.blurb)}</p></section>\n`;
    body += steps.map(([s, i]) => stepSection(s, i, n)).join('\n');
  }
  const navSteps = story.acts.map(act => `<li class="nav-act"><a href="#${act.id}">${esc(act.title.replace(/^Part \d: /, ''))}</a><ol>${story.steps.map((s, i) => [s, i]).filter(([s]) => s.act === act.id).map(([s, i]) => `<li><a href="#step-${i + 1}" data-nav="step-${i + 1}"><span class="n">${i + 1}</span>${esc(s.title)}</a></li>`).join('')}</ol></li>`).join('');

  const recap = story.steps.map((s, i) => `<tr><td>${icon(s.icon, 26)}</td><td><a href="#step-${i + 1}">${i + 1}. ${esc(s.title)}</a></td><td>${icon(PLACE[s.active].icon, 18)} ${PLACE[s.active].name}</td><td>${fmt(s.do[s.do.length - 1])}</td></tr>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Learn GitHub by following one small project from start to finish. Every step shows your folder, GitHub Desktop and GitHub.com side by side. No coding, no terminal.">
<title>GitHub for Beginners: follow one project from start to finish</title>
<link rel="icon" href="data:image/svg+xml;base64,${fs.readFileSync(path.join(root, 'assets/icons/branch.svg')).toString('base64')}">
<style>${css}</style>
</head>
<body id="top">
${sprite()}
<a class="skip" href="#story">Skip to the story</a>
<header class="bar">
  <a class="brand" href="#top">${icon('branch', 28)}<span>GitHub for Beginners</span></a>
  <details class="jump"><summary id="jumpLabel">All ${n} steps</summary><nav aria-label="All steps"><ol class="nav">${navSteps}</ol></nav></details>
</header>

<div class="frame">
<nav class="side" aria-label="All steps"><ol class="nav">${navSteps}</ol></nav>
<main>
<section class="intro">
  <h1>Learn GitHub by following one small project</h1>
  <p class="lede">Watch Mia keep her research notes in GitHub, from creating the project to working with a coauthor and an AI assistant. Every step shows what happens in all three places, so you can see exactly what changed and where.</p>
  <div class="places">
    ${['folder', 'desktop', 'web'].map(k => `<div class="place place-${k}">${icon(PLACE[k].icon, 40)}<div><b>${PLACE[k].name}</b><span>${{ folder: 'The files on Mia’s computer. She edits them with her usual editor.', desktop: 'The free app that shows what changed, saves checkpoints, and syncs.', web: 'The online copy, where people review and accept changes.' }[k]}</span></div></div>`).join('')}
  </div>
  <p class="how">In every step, the place where you act is <b>highlighted</b>, and anything that just changed is <mark>marked like this</mark>. Lines that were added show <span class="ln add inline">+ in green</span>, removed lines <span class="ln del inline">− in red</span>.</p>
  <div class="cast">${story.cast.map(c => `<div>${icon(c.icon, 32)}<p><b>${esc(c.name)}</b> ${esc(c.role)}</p></div>`).join('')}</div>
  <details class="before"><summary>${icon('install', 24)} Before you start: get a free account and the app (5 minutes)</summary>
    <ol><li>Create a free account at <a href="https://github.com/signup">github.com/signup</a>.</li>
    <li>Download <a href="https://desktop.github.com/">GitHub Desktop</a> for Mac or Windows, install it, and open it.</li>
    <li>Click <b class="ui">Sign in to GitHub.com</b> on the welcome screen. (Later: <b class="ui">GitHub Desktop → Settings… → Accounts</b> on Mac, <b class="ui">File → Options… → Accounts</b> on Windows.)</li></ol>
    <p>You never need to type commands. Everything is buttons.</p></details>
  <p class="start"><a class="button" href="#step-1">Start the story</a> <span class="muted">${n} steps, about 30 minutes to read. Steps 1 to 5 are all you need for personal work.</span></p>
</section>

<div id="story">
${body}
</div>

<section class="recap" id="recap">
  <h2>The whole story on one table</h2>
  <p>Come back to this whenever you forget which button to press.</p>
  <div class="table-wrap"><table><thead><tr><th></th><th>Step</th><th>Where</th><th>Key click</th></tr></thead><tbody>${recap}</tbody></table></div>
</section>

<section class="rules" id="rules">
  <h2>Four things people mix up</h2>
  <div class="rule-grid">
    <div>${icon('commit', 32)}<p><b>Commit is not push.</b> Commit saves on your computer (step 3). Push puts it online (step 5).</p></div>
    <div>${icon('fetch', 32)}<p><b>Fetch is not pull.</b> Fetch only checks for news. Pull brings it into your folder (step 7).</p></div>
    <div>${icon('pull-request', 32)}<p><b>A pull request is not a merge.</b> It’s a proposal (step 10). Merging accepts it (step 11).</p></div>
    <div>${icon('ai', 32)}<p><b>"Done" is not proof.</b> Read the AI’s changes yourself (step 14).</p></div>
  </div>
</section>

<section class="help" id="help">
  <h2>If something looks wrong</h2>
  <div class="table-wrap"><table><thead><tr><th>What you see</th><th>Usually means</th><th>Do this</th></tr></thead><tbody>
    <tr><td>GitHub.com shows the old file</td><td>You committed but didn’t push, or the website shows another branch</td><td><b class="ui">Push origin</b>; check the branch on the website</td></tr>
    <tr><td>Your folder shows the old file</td><td>Someone changed it online (like step 6)</td><td><b class="ui">Fetch origin</b>, then <b class="ui">Pull origin</b></td></tr>
    <tr><td>Files "disappeared"</td><td>You’re on a different branch</td><td>Check <b class="ui">Current Branch</b> before anything else</td></tr>
    <tr><td>An AI says it’s done, but nothing changed</td><td>It worked on GitHub.com, or in another folder</td><td>Ask for the pull request link</td></tr>
    <tr><td>Desktop says there’s a conflict</td><td>Two people changed the same lines</td><td>Open the file, keep the right text, remove the <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> markers, save, then <b class="ui">Continue merge</b></td></tr>
  </tbody></table></div>
  <p class="muted">Never click <b class="ui">Discard changes</b>, delete branches, or "force push" just to make a message go away.</p>
</section>

<section class="further" id="more">
  <h2>Ready for more?</h2>
  <div class="further-grid">
    <a href="${REPO}/blob/main/lessons/README.md">${icon('book', 36)}<span><b>Detailed lessons</b>The same ideas in eight longer lessons, with quizzes</span></a>
    <a href="course.html">${icon('practice', 36)}<span><b>Practice simulator</b>Click through a safe, pretend GitHub Desktop</span></a>
    <a href="${REPO}/blob/main/lessons/ai-prompts.md">${icon('ai-chat', 36)}<span><b>AI instructions to copy</b>Safe ways to ask an AI assistant for help</span></a>
    <a href="${REPO}/blob/main/lessons/dictionary.md">${icon('list', 36)}<span><b>Dictionary</b>Every GitHub word in plain English</span></a>
  </div>
</section>

<footer class="foot">
  <p>Mia, Sam and the wage numbers are made up. Button names follow current GitHub Desktop; if yours look different, see the <a href="https://docs.github.com/en/desktop">official GitHub Desktop documentation</a>. The screens on this page are simplified drawings, not screenshots.</p>
  <p>This page doesn’t connect to your GitHub account. <a href="${REPO}">Source on GitHub</a>.</p>
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
  console.log(`Built index.html (${kb} KB): ${story.steps.length} story steps; ${a.icons} icons and ${a.routes} route pictures for the lessons.`);
}

module.exports = { story };
if (require.main === module) build();

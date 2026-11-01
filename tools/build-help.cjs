// Builds help.html: a searchable, printable page for people who already know what they need.
//   1. "Something looks different"  (I see X, what do I do?)
//   2. "I want to…"                 (the one-page cheat sheet)
//   3. Words                        (the plain-English dictionary)
// Called by tools/build-guide.cjs. Edit the content in tools/extras.cjs and the look in tools/guide.css, never help.html.
const fs = require('node:fs');
const path = require('node:path');

const SCRIPT = `(function () {
  "use strict";
  var q = document.getElementById("q");
  var rows = Array.prototype.slice.call(document.querySelectorAll("tr[data-s]"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("section.hsec"));
  var none = document.getElementById("none");
  var count = document.getElementById("count");
  function run() {
    var terms = q.value.toLowerCase().split(/\\s+/).filter(Boolean);
    var shown = 0;
    rows.forEach(function (r) {
      var hay = r.getAttribute("data-s");
      var ok = terms.every(function (t) { return hay.indexOf(t) !== -1; });
      r.hidden = !ok;
      if (ok) shown++;
    });
    sections.forEach(function (s) { s.hidden = !s.querySelector("tr[data-s]:not([hidden])"); });
    none.hidden = shown !== 0;
    count.textContent = terms.length ? shown + (shown === 1 ? " answer" : " answers") + " found" : "";
  }
  q.addEventListener("input", run);
  document.getElementById("print").addEventListener("click", function () { window.print(); });
  var pre = (location.hash.match(/[?&]q=([^&]*)/) || [])[1];
  if (pre) { q.value = decodeURIComponent(pre); run(); }
})();`;

function page({ esc, fmt, icon, sprite, topbar, REPO, extras }) {
  const css = fs.readFileSync(path.join(__dirname, 'guide.css'), 'utf8');
  const hay = (...parts) => esc(parts.join(' ').replace(/[*`]/g, '').toLowerCase());

  const symptoms = extras.symptoms.map(r => `<tr data-s="${hay(r.see, r.means, r.do)}"><td class="ic-cell">${icon(r.icon, 26)}</td><td data-label="What you see"><b>${esc(r.see)}</b></td><td data-label="Usually means">${esc(r.means)}</td><td data-label="Do this">${fmt(r.do)}${r.step ? ` <a class="seelink" href="index.html#step-${r.step}">See step ${r.step}</a>` : ''}</td></tr>`).join('');
  const wants = extras.wants.map(r => `<tr data-s="${hay(r.want, r.click)}"><td class="ic-cell">${icon(r.icon, 26)}</td><td data-label="I want to…"><b>${esc(r.want)}</b></td><td data-label="Click">${fmt(r.click)}</td></tr>`).join('');
  const words = extras.words.map(([w, d]) => `<tr data-s="${hay(w, d)}"><td data-label="Word"><b>${esc(w)}</b></td><td data-label="Meaning">${esc(d)}</td></tr>`).join('');
  const pairs = extras.pairs.map(p => `<div>${icon(p.icon, 32)}<p><b>${esc(p.a)} ≠ ${esc(p.b)}.</b> ${esc(p.text)}</p></div>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="description" content="Quick answers for GitHub Desktop beginners: what to do when something looks different, where to click for each task, and every GitHub word in plain English. Searchable and printable.">
<meta property="og:title" content="GitHub for Beginners: Help">
<meta property="og:description" content="Search quick answers: push rejected, files disappeared, undo a commit, merge conflicts, and every GitHub word in plain English.">
<meta name="theme-color" content="#6a4cc2">
<title>Help: quick answers for GitHub Desktop beginners</title>
<link rel="icon" href="data:image/svg+xml;base64,${fs.readFileSync(path.join(__dirname, '..', 'assets/icons/branch.svg')).toString('base64')}">
<style>${css}</style>
</head>
<body id="top" class="help-page">
${sprite()}
<a class="skip" href="#answers">Skip to the answers</a>
${topbar('help')}
<main class="wrap">
  <h1>Help: find what you need fast</h1>
  <p class="lede">Type a word, or scroll. Each answer says what you’re probably seeing and which button to click. New to GitHub? <a href="index.html">Start with the guide</a>.</p>

  <div class="search" role="search">
    <label for="q">Search all answers</label>
    <div class="search-row"><input id="q" type="search" placeholder="Try: push, conflict, old file, undo" autocomplete="off"><button type="button" id="print" class="ghost">Print this page</button></div>
    <p class="muted" id="count" role="status" aria-live="polite"></p>
  </div>

  <p class="rule-first">${icon('warning', 22)} <span><b>First rule:</b> don’t panic-click <b class="ui">Discard</b>, delete branches, or follow advice to “force push”. Find out where you are first: check <b class="ui">Current Repository</b>, <b class="ui">Current Branch</b>, then the <b class="ui">Changes</b> and <b class="ui">History</b> tabs.</span></p>

  <nav class="hnav" aria-label="On this page"><a href="#wrong">Something looks different</a><a href="#want">I want to…</a><a href="#words">Words</a></nav>

  <div id="answers">
  <section class="hsec" id="wrong">
    <h2>Something looks different</h2>
    <div class="table-wrap"><table><thead><tr><th></th><th>What you see</th><th>Usually means</th><th>Do this</th></tr></thead><tbody>${symptoms}</tbody></table></div>
  </section>

  <section class="hsec" id="want">
    <h2>I want to…</h2>
    <div class="table-wrap"><table><thead><tr><th></th><th>I want to…</th><th>Click</th></tr></thead><tbody>${wants}</tbody></table></div>
  </section>

  <section class="hsec" id="words">
    <h2>Words</h2>
    <div class="table-wrap"><table><thead><tr><th>Word</th><th>Meaning</th></tr></thead><tbody>${words}</tbody></table></div>
  </section>
  </div>

  <p id="none" class="none" hidden>No answers match. Try one short word, like <b>push</b> or <b>branch</b>, or <a href="${REPO}/issues/new">tell us what’s missing</a>.</p>

  <section class="rules" id="mixups">
    <h2>Three things people mix up</h2>
    <div class="rule-grid three">${pairs}</div>
  </section>

  <footer class="foot">
    <p>Button names follow current GitHub Desktop. If yours look different, see the <a href="https://docs.github.com/en/desktop">official GitHub Desktop documentation</a>. This page doesn’t connect to your GitHub account. <a href="${REPO}">Source on GitHub</a>.</p>
  </footer>
</main>
<script>${SCRIPT}</script>
</body>
</html>
`;
}

module.exports = { page };

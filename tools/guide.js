(function () {
  "use strict";
  var steps = Array.prototype.slice.call(document.querySelectorAll("section.step"));
  var links = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var label = document.getElementById("jumpLabel");
  var jump = document.querySelector(".jump");
  var total = steps.length, current = null;

  // Highlight the step you are reading, in the contents and in the phone menu label.
  function setCurrent(sec) {
    var id = sec ? sec.id : null;
    if (id === current) return;
    current = id;
    links.forEach(function (a) {
      if (a.getAttribute("data-nav") === id) a.setAttribute("aria-current", "step"); else a.removeAttribute("aria-current");
    });
    if (label) {
      if (!sec) label.textContent = "All " + total + " steps";
      else label.textContent = "Step " + sec.getAttribute("data-step") + " of " + total + ": " + sec.querySelector("h3").textContent;
    }
  }
  function onScroll() {
    var line = window.innerHeight * 0.35, best = null;
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].getBoundingClientRect().top <= line) best = steps[i]; else break;
    }
    var recap = document.getElementById("recap");
    if (best && recap && recap.getBoundingClientRect().top <= line) best = null;
    setCurrent(best);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); }
  }, { passive: true });
  onScroll();

  // ---- Progress: tick steps off, remembered in this browser only ----------------
  var KEY = "github-for-beginners-progress";
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".done-btn"));
  var progress = document.getElementById("progress");
  var progressText = document.getElementById("progressText");
  var progressFill = document.getElementById("progressFill");
  var cont = document.getElementById("continueBtn");
  var startBtn = document.getElementById("startBtn");
  var done = [];
  try {
    var saved = JSON.parse(localStorage.getItem(KEY) || "[]");
    if (Array.isArray(saved)) done = saved.filter(function (n) { return typeof n === "number" && n >= 1 && n <= total; });
  } catch (e) { done = []; }
  function store() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  function renderProgress() {
    buttons.forEach(function (b) {
      var n = +b.getAttribute("data-done"), on = done.indexOf(n) !== -1;
      b.setAttribute("aria-pressed", on ? "true" : "false");
      b.textContent = on ? "Step " + n + " done" : "Mark step " + n + " done";
      var sec = document.getElementById("step-" + n);
      if (sec) sec.classList.toggle("is-done", on);
    });
    links.forEach(function (a) {
      var n = +a.getAttribute("data-nav").replace("step-", "");
      a.classList.toggle("done", done.indexOf(n) !== -1);
    });
    if (progress) {
      progress.hidden = done.length === 0;
      if (progressText) progressText.textContent = done.length + " of " + total + " done";
      if (progressFill) progressFill.style.width = Math.round(100 * done.length / total) + "%";
    }
    if (cont) {
      var next = 0;
      for (var i = 1; i <= total; i++) if (done.indexOf(i) === -1) { next = i; break; }
      if (done.length === 0) { cont.hidden = true; if (startBtn) startBtn.hidden = false; }
      else if (next === 0) { cont.hidden = false; cont.textContent = "All " + total + " steps done: see the summary"; cont.setAttribute("href", "#recap"); if (startBtn) startBtn.hidden = true; }
      else { cont.hidden = false; cont.textContent = "Continue at step " + next; cont.setAttribute("href", "#step-" + next); if (startBtn) startBtn.hidden = true; }
    }
  }
  buttons.forEach(function (b) {
    b.addEventListener("click", function () {
      var n = +b.getAttribute("data-done"), at = done.indexOf(n);
      if (at === -1) done.push(n); else done.splice(at, 1);
      done.sort(function (x, y) { return x - y; });
      store(); renderProgress();
    });
  });
  renderProgress();

  // ---- Pop-up definitions: the first time a GitHub word appears in a step ------------
  var gloss = [];
  try { gloss = JSON.parse(document.getElementById("glossary").textContent).map(function (g) { g.re = new RegExp("\\b(" + g.match + ")\\b", "i"); return g; }); } catch (e) { gloss = []; }
  function wrapTerms(root, seen) {
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (t) {
        return t.parentNode.closest("b.ui,code,button,a,.term") ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [], n;
    while ((n = walker.nextNode())) nodes.push(n);
    nodes.forEach(function (node) {
      var rest = node;
      while (rest) {
        var best = null, bestAt = Infinity;
        for (var i = 0; i < gloss.length; i++) {
          if (seen[gloss[i].term]) continue;
          var m = gloss[i].re.exec(rest.nodeValue);
          if (m && m.index < bestAt) { best = { g: gloss[i], m: m }; bestAt = m.index; }
        }
        if (!best) return;
        seen[best.g.term] = true;
        var hit = rest.splitText(best.m.index);
        var after = hit.splitText(best.m[0].length);
        var btn = document.createElement("button");
        btn.type = "button"; btn.className = "term";
        btn.setAttribute("data-term", best.g.term);
        btn.textContent = hit.nodeValue;
        hit.parentNode.replaceChild(btn, hit);
        rest = after;
      }
    });
  }
  if (gloss.length) steps.forEach(function (sec) {
    var seen = {};
    Array.prototype.forEach.call(sec.querySelectorAll(".story,.why,.watch"), function (el) { wrapTerms(el, seen); });
  });

  var tip = document.createElement("div");
  tip.id = "tip"; tip.setAttribute("role", "tooltip"); tip.hidden = true;
  document.body.appendChild(tip);
  var tipFor = null, tipY = 0;
  function showTip(el) {
    var g = gloss.filter(function (x) { return x.term === el.getAttribute("data-term"); })[0];
    if (!g) return;
    tip.innerHTML = "";
    var h = document.createElement("b"); h.textContent = g.term;
    tip.appendChild(h); tip.appendChild(document.createTextNode(g.def));
    tip.hidden = false; tipFor = el; tipY = window.scrollY;
    el.setAttribute("aria-describedby", "tip");
    var r = el.getBoundingClientRect(), w = tip.offsetWidth;
    var left = Math.min(Math.max(8, r.left + window.scrollX - 4), window.scrollX + document.documentElement.clientWidth - w - 8);
    tip.style.left = left + "px";
    tip.style.top = (r.bottom + window.scrollY + 8) + "px";
  }
  function hideTip() { tip.hidden = true; if (tipFor) tipFor.removeAttribute("aria-describedby"); tipFor = null; }
  document.addEventListener("mouseover", function (e) { var t = e.target.closest && e.target.closest(".term"); if (t) showTip(t); });
  document.addEventListener("mouseout", function (e) { if (e.target.closest && e.target.closest(".term")) hideTip(); });
  document.addEventListener("focusin", function (e) { var t = e.target.closest && e.target.closest(".term"); if (t) showTip(t); });
  document.addEventListener("focusout", function (e) { if (e.target.closest && e.target.closest(".term")) hideTip(); });
  document.addEventListener("click", function (e) {
    var t = e.target.closest && e.target.closest(".term");
    if (t) { if (tipFor === t && !tip.hidden) hideTip(); else showTip(t); } else hideTip();
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") hideTip(); });
  window.addEventListener("scroll", function () { if (tipFor && Math.abs(window.scrollY - tipY) > 60) hideTip(); }, { passive: true });

  if (jump) jump.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) jump.open = false; });

})();

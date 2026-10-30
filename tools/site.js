(function () {
  "use strict";
  var KEY = "gh-beginners-done";
  var lessons = Array.prototype.slice.call(document.querySelectorAll("section.lesson"));
  var sections = Array.prototype.slice.call(document.querySelectorAll("section.lesson, section.extra, section.intro"));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll("[data-nav]"));
  var mobileNav = document.querySelector(".mobile-nav");
  var mobileLabel = document.getElementById("mobileNavLabel");

  // Remember finished lessons in this browser only.
  var done = {};
  try { done = JSON.parse(localStorage.getItem(KEY) || "{}") || {}; } catch (e) { done = {}; }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {} }
  function renderProgress() {
    var count = 0;
    lessons.forEach(function (s) {
      var n = s.getAttribute("data-lesson"), isDone = !!done[n];
      if (isDone) count++;
      s.classList.toggle("is-done", isDone);
      var box = s.querySelector("[data-done]"); if (box) box.checked = isDone;
      navLinks.forEach(function (a) { if (a.getAttribute("data-nav") === s.id) a.classList.toggle("is-done", isDone); });
    });
    document.getElementById("progressText").textContent = count + " of " + lessons.length + " lessons done";
    document.getElementById("progressFill").style.width = (100 * count / lessons.length) + "%";
  }
  document.querySelectorAll("[data-done]").forEach(function (box) {
    box.addEventListener("change", function () {
      var n = box.getAttribute("data-done");
      if (box.checked) done[n] = true; else delete done[n];
      save(); renderProgress();
    });
  });
  renderProgress();

  // Highlight where you are in the contents.
  var current = null;
  function setCurrent(id) {
    if (id === current) return;
    current = id;
    navLinks.forEach(function (a) {
      if (a.getAttribute("data-nav") === id) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
    });
    var sec = document.getElementById(id);
    if (mobileLabel) {
      if (!sec || id === "contents") mobileLabel.textContent = "Contents";
      else {
        var n = sec.getAttribute("data-lesson"), h = sec.querySelector("h2");
        mobileLabel.textContent = (n ? "Lesson " + n + ": " : "") + (h ? h.textContent.trim().replace(/\s*Show$/, "") : "");
      }
    }
  }
  function onScroll() {
    var line = window.innerHeight * 0.3, best = sections[0];
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top <= line) best = sections[i]; else break;
    }
    if (best) setCurrent(best.id);
  }
  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(function () { ticking = false; onScroll(); }); }
  }, { passive: true });
  onScroll();

  // Open folded extras when someone links to them, and close the phone menu after a choice.
  function openTarget() {
    var id = decodeURIComponent((location.hash || "").slice(1));
    var el = id && document.getElementById(id);
    if (!el) return;
    var d = (el.classList.contains("extra") && el.querySelector(":scope > details")) || (el.closest && el.closest("details"));
    if (d) d.open = true;
  }
  window.addEventListener("hashchange", openTarget);
  openTarget();
  if (mobileNav) mobileNav.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) mobileNav.open = false; });
})();

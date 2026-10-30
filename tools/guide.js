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

  if (jump) jump.addEventListener("click", function (e) { if (e.target.closest && e.target.closest("a")) jump.open = false; });

})();

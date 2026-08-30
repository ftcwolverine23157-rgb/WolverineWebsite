(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -----------------------------------------------------------
     Nav: scrolled state + active section highlight
  ----------------------------------------------------------- */
  var nav = document.getElementById("nav");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".nav-links a"));
  var sections = navLinks
    .map(function (a) {
      var id = a.getAttribute("href").slice(1);
      return document.getElementById(id);
    })
    .filter(Boolean);

  function onScroll() {
    nav.classList.toggle("is-scrolled", window.scrollY > 12);
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.id;
          var link = navLinks.find(function (a) {
            return a.getAttribute("href") === "#" + id;
          });
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (a) {
              a.classList.remove("active");
            });
            link.classList.add("active");
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
    );
    sections.forEach(function (s) {
      navObserver.observe(s);
    });
  }

  /* -----------------------------------------------------------
     Mobile menu
  ----------------------------------------------------------- */
  var burger = document.getElementById("burger");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMenu() {
    burger.classList.remove("open");
    mobileMenu.classList.remove("open");
    document.body.style.overflow = "";
  }

  burger.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    burger.classList.toggle("open", isOpen);
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  mobileMenu.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", closeMenu);
  });

  /* -----------------------------------------------------------
     Scroll reveal
  ----------------------------------------------------------- */
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("in");
    });
  } else {
    var revealObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  /* -----------------------------------------------------------
     Hero annotation nodes: staggered fade-in on load
  ----------------------------------------------------------- */
  var heroNodes = document.querySelectorAll(".hero-visual .node");
  heroNodes.forEach(function (node, i) {
    window.setTimeout(function () {
      node.classList.add("show");
    }, reduceMotion ? 0 : 500 + i * 180);
  });

  /* -----------------------------------------------------------
     Anatomy schematic draw-in
  ----------------------------------------------------------- */
  var anatomySection = document.getElementById("robot");
  if (anatomySection && "IntersectionObserver" in window) {
    var anatomyObserver = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    anatomyObserver.observe(anatomySection);
  } else if (anatomySection) {
    anatomySection.classList.add("in");
  }

  /* -----------------------------------------------------------
     Count-up stats
  ----------------------------------------------------------- */
  var counters = document.querySelectorAll(".count[data-count]");

  function animateCount(el) {
    var target = parseInt(el.getAttribute("data-count"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduceMotion) {
      el.textContent = target.toLocaleString() + suffix;
      return;
    }
    var duration = 1400;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      var value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString() + suffix;
      }
    }
    window.requestAnimationFrame(step);
  }

  if (counters.length) {
    if ("IntersectionObserver" in window) {
      var countObserver = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              obs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 }
      );
      counters.forEach(function (el) {
        countObserver.observe(el);
      });
    } else {
      counters.forEach(animateCount);
    }
  }

  /* -----------------------------------------------------------
     Pause ticker when off-screen (perf)
  ----------------------------------------------------------- */
  var ticker = document.getElementById("ticker");
  if (ticker && "IntersectionObserver" in window) {
    var tickerObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          ticker.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
        });
      },
      { threshold: 0 }
    );
    tickerObserver.observe(ticker);
  }
})();

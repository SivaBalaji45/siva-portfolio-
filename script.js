/* ═══════════════════════════════════════════════════════════
   SIVA BALAJI PORTFOLIO — script.js
   ═══════════════════════════════════════════════════════════ */

/* ─── PROFILE IMAGE ──────────────────────────────────────── */
// Google Drive direct image link (public "anyone with link" file)
// GitHub avatar — always public and fast
const PROFILE_IMG = 'https://avatars.githubusercontent.com/u/175281334?v=4';

(function loadProfileImages() {
  document.querySelectorAll('.profile-img').forEach(function (img) {
    img.src = PROFILE_IMG;
    // Fallback: if Drive image fails to load, hide gracefully
    img.onerror = function () {
      this.style.background = 'var(--surface2)';
      this.style.border = '2px solid var(--pri)';
    };
  });
})();

/* ─── BOOT SCREEN ────────────────────────────────────────── */
(function bootSequence() {
  const ids = ['b0', 'b1', 'b2', 'b3', 'b4', 'b5', 'b6'];
  ids.forEach(function (id, i) {
    setTimeout(function () {
      var el = document.getElementById(id);
      if (el) el.classList.add('show');
    }, 200 + i * 280);
  });

  // Fade out boot screen after all lines shown
  var fadeDelay = 200 + ids.length * 280 + 700;
  setTimeout(function () {
    var boot = document.getElementById('boot');
    if (!boot) return;
    boot.classList.add('out');
    setTimeout(function () { boot.style.display = 'none'; }, 850);
  }, fadeDelay);
})();

/* ─── TYPEWRITER EFFECT ──────────────────────────────────── */
(function typewriterEffect() {
  var roles = [
    'Full-Stack Developer',
    'AI / ML Engineer',
    'MERN Stack Dev',
    'Data Scientist',
    'Deep Learning Researcher',
    'Multi-Cloud Engineer'
  ];
  var ri = 0, ci = 0, deleting = false;
  var el = document.getElementById('typewriter');

  function tick() {
    if (!el) return;
    var cur = roles[ri];
    if (deleting) {
      el.textContent = cur.slice(0, ci--);
      if (ci < 0) {
        deleting = false;
        ri = (ri + 1) % roles.length;
        ci = 0;
      }
      setTimeout(tick, 45);
    } else {
      el.textContent = cur.slice(0, ci++);
      if (ci > cur.length) {
        deleting = true;
        setTimeout(tick, 1900);
      } else {
        setTimeout(tick, 80);
      }
    }
  }

  // Start after boot screen finishes
  var bootDuration = 200 + 7 * 280 + 700 + 850 + 300;
  setTimeout(tick, bootDuration);
})();

/* ─── MATRIX RAIN ────────────────────────────────────────── */
(function matrixRain() {
  var canvas = document.getElementById('matrix-bg');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var fs = 13;
  var chars = 'アイウエオカキクケコサシスセソ01アイウEFGH';
  var drops = [];

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    var cols = Math.floor(canvas.width / fs);
    while (drops.length < cols) drops.push(Math.floor(Math.random() * canvas.height / fs));
    drops.length = cols;
  }

  resize();
  window.addEventListener('resize', resize);

  setInterval(function () {
    ctx.fillStyle = 'rgba(1, 12, 10, 0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#00ff88';
    ctx.font = fs + 'px JetBrains Mono, monospace';

    drops.forEach(function (y, i) {
      var ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fs, y * fs);
      if (y * fs > canvas.height && Math.random() > .975) drops[i] = 0;
      drops[i]++;
    });
  }, 55);
})();

/* ─── SCROLL REVEAL ──────────────────────────────────────── */
(function scrollReveal() {
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    io.observe(el);
  });
})();

/* ─── NAVBAR SCROLL SHADOW ───────────────────────────────── */
(function navbarShadow() {
  var nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      nav.style.boxShadow = '0 4px 24px rgba(0,0,0,.4)';
    } else {
      nav.style.boxShadow = 'none';
    }
  }, { passive: true });
})();

/* ─── SMOOTH ACTIVE NAV LINK ─────────────────────────────── */
(function activeNavHighlight() {
  var sections = document.querySelectorAll('section[id]');
  var pieces   = document.querySelectorAll('.nav-pieces a');
  var links    = document.querySelectorAll('.nav-links a');

  function onScroll() {
    var scrollY = window.scrollY + 120;
    sections.forEach(function (s) {
      if (scrollY >= s.offsetTop && scrollY < s.offsetTop + s.offsetHeight) {
        var id = s.id;
        pieces.forEach(function (a) {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'var(--pri)' : '';
          a.style.textShadow = a.getAttribute('href') === '#' + id
            ? '0 0 12px var(--pri)' : '';
        });
        links.forEach(function (a) {
          a.style.color = a.getAttribute('href') === '#' + id
            ? 'var(--pri)' : '';
        });
      }
    });
  }

  window.addEventListener('scroll', onScroll, { passive: true });
})();

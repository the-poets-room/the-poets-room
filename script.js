/* =========================================================
   THE POET'S ROOM — BEHAVIOUR (final, batch 1)
   ========================================================= */

const PALETTE = [
  { name: 'Terracotta',  hex: '#C97B63' },
  { name: 'Deep Sage',   hex: '#7A8B6F' },
  { name: 'Dusty Rose',  hex: '#C48B9F' },
  { name: 'Muted Amber', hex: '#D4A24C' },
  { name: 'Slate Blue',  hex: '#6B7A99' }
];

function applyRandomAccent() {
  const isDark = document.body.classList.contains('dark');
  let pick;
  if (isDark) {
    pick = PALETTE.find(p => p.name === 'Muted Amber');
  } else {
    pick = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  }
  document.documentElement.style.setProperty('--accent', pick.hex);
  document.documentElement.style.setProperty('--accent-soft', pick.hex + '22');
}

function initTheme() {
  const toggle = document.getElementById('theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') document.body.classList.add('dark');
  if (toggle) {
    toggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const dark = document.body.classList.contains('dark');
      localStorage.setItem('theme', dark ? 'dark' : 'light');
      toggle.textContent = dark ? '☀️' : '🌙';
      applyRandomAccent();
    });
  }
}

function initGreeting() {
  const el = document.getElementById('greeting');
  if (!el) return;
  const h = new Date().getHours();
  let greeting;
  if (h < 5)       greeting = 'Still awake, wanderer';
  else if (h < 12) greeting = 'Good morning, wanderer';
  else if (h < 17) greeting = 'Good afternoon, wanderer';
  else if (h < 22) greeting = 'Good evening, wanderer';
  else             greeting = 'Late night, wanderer';
  el.textContent = greeting;
}

function initStreak() {
  const el = document.getElementById('streak');
  if (!el) return;
  const today = new Date().toDateString();
  const lastVisit = localStorage.getItem('lastVisit');
  let streak = parseInt(localStorage.getItem('streak') || '0', 10);

  if (lastVisit !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    streak = (lastVisit === yesterday) ? streak + 1 : 1;
    localStorage.setItem('streak', streak);
    localStorage.setItem('lastVisit', today);
  }

  if (streak <= 1)       el.textContent = '🌱 welcome back';
  else if (streak < 5)   el.textContent = `🌱 day ${streak} of reading`;
  else if (streak < 15)  el.textContent = `🔥 ${streak} days in a row`;
  else                   el.textContent = `🔥🔥 ${streak} days — you live here now`;
}

function makeGradient(seed) {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  const h1 = Math.abs(hash) % 360;
  const h2 = (h1 + 40) % 360;
  return `linear-gradient(135deg, hsl(${h1},35%,55%), hsl(${h2},45%,40%))`;
}

function poemCoverStyle(poem) {
  if (poem.cover && poem.cover.trim() !== '') {
    return `background-image: url('${poem.cover}');`;
  }
  return `background: ${makeGradient(poem.title)};`;
}

function findPoemIndex(id) {
  return poems.findIndex(p => p.id === id);
}

function renderHome() {
  const grid = document.getElementById('poem-grid');
  if (!grid || typeof poems === 'undefined') return;

  grid.innerHTML = '';
  poems.forEach(poem => {
    const card = document.createElement('a');
    card.className = 'poem-card';
    card.href = `poem.html?id=${encodeURIComponent(poem.id)}`;
    card.innerHTML = `
      <div class="poem-card-cover" style="${poemCoverStyle(poem)}">
        <span class="cover-title">${poem.title}</span>
      </div>
      <div class="poem-card-meta">
        <h3>${poem.title}</h3>
        <div class="date">${poem.date || ''}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function renderPoemOfTheDay() {
  const container = document.getElementById('featured');
  if (!container || typeof poems === 'undefined' || poems.length === 0) return;

  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const poem = poems[seed % poems.length];
  const excerpt = poem.lines.slice(0, 2).join(' ');

  container.innerHTML = `
    <div class="featured-card">
      <div class="featured-label">☾ poem of the day</div>
      <h3 class="featured-title">${poem.title}</h3>
      <p class="featured-excerpt">“${excerpt}…”</p>
      <a class="featured-link" href="poem.html?id=${encodeURIComponent(poem.id)}">
        read the full poem →
      </a>
    </div>
  `;
}

function initWander() {
  const btn = document.getElementById('wander-btn');
  if (!btn || typeof poems === 'undefined' || poems.length === 0) return;
  btn.addEventListener('click', () => {
    const poem = poems[Math.floor(Math.random() * poems.length)];
    fadeAndGo(`poem.html?id=${encodeURIComponent(poem.id)}`, 500);
  });
}

function fadeAndGo(url, ms) {
  document.body.style.transition = `opacity ${ms}ms ease`;
  document.body.style.opacity = '0';
  setTimeout(() => { window.location.href = url; }, ms);
}

function getBookmarks() {
  try { return JSON.parse(localStorage.getItem('bookmarks') || '[]'); }
  catch { return []; }
}
function setBookmarks(list) {
  localStorage.setItem('bookmarks', JSON.stringify(list));
}

function renderSavedPage() {
  const grid = document.getElementById('saved-grid');
  if (!grid || typeof poems === 'undefined') return;

  const saved = getBookmarks();
  const savedPoems = poems.filter(p => saved.includes(p.id));

  if (savedPoems.length === 0) {
    const empty = document.getElementById('empty-shelf');
    if (empty) empty.style.display = 'block';
    return;
  }

  savedPoems.forEach(poem => {
    const card = document.createElement('a');
    card.className = 'poem-card';
    card.href = `poem.html?id=${encodeURIComponent(poem.id)}`;
    card.innerHTML = `
      <div class="poem-card-cover" style="${poemCoverStyle(poem)}">
        <span class="cover-title">${poem.title}</span>
      </div>
      <div class="poem-card-meta">
        <h3>${poem.title}</h3>
        <div class="date">${poem.date || ''}</div>
      </div>
    `;
    grid.appendChild(card);
  });
}

function initBookmarkButton(currentPoemId) {
  const btn = document.getElementById('bookmark-btn');
  if (!btn || !currentPoemId) return;

  const update = () => {
    const saved = getBookmarks().includes(currentPoemId);
    btn.textContent = saved ? '❤️' : '🤍';
    btn.classList.toggle('saved', saved);
  };
  update();

  btn.addEventListener('click', () => {
    let list = getBookmarks();
    if (list.includes(currentPoemId)) list = list.filter(id => id !== currentPoemId);
    else list.push(currentPoemId);
    setBookmarks(list);
    update();
    btn.animate(
      [{ transform: 'scale(1)' }, { transform: 'scale(1.3)' }, { transform: 'scale(1)' }],
      { duration: 320, easing: 'ease-out' }
    );
  });
}

function renderPoem() {
  const article = document.querySelector('.poem-article');
  if (!article || typeof poems === 'undefined' || poems.length === 0) return;

  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const index = id ? findPoemIndex(id) : 0;
  const poem = poems[index >= 0 ? index : 0];

  document.title = `${poem.title} — The Poet's Room`;

  const cover = document.getElementById('poem-cover');
  if (poem.cover && poem.cover.trim() !== '') {
    cover.style.backgroundImage = `url('${poem.cover}')`;
  } else {
    cover.style.background = makeGradient(poem.title);
    cover.innerHTML = `<span class="cover-title">${poem.title}</span>`;
  }

  document.getElementById('poem-title').textContent = poem.title;
  document.getElementById('poem-meta').textContent = poem.date || '';

  const tags = document.getElementById('poem-tags');
  tags.innerHTML = (poem.tags || []).map(t => `<span>${t}</span>`).join('');

  const body = document.getElementById('poem-body');
  body.innerHTML = poem.lines
    .map((line, i) => `<div class="line" data-index="${i}">${line || '&nbsp;'}</div>`)
    .join('');

  const hidden = document.getElementById('comment-poem');
  if (hidden) hidden.value = poem.title;

  const prevBtn = document.getElementById('prev-poem');
  const nextBtn = document.getElementById('next-poem');
  const prevIndex = (index - 1 + poems.length) % poems.length;
  const nextIndex = (index + 1) % poems.length;

  if (prevBtn) {
    prevBtn.disabled = poems.length < 2;
    prevBtn.addEventListener('click', () => goToPoem(prevIndex));
  }
  if (nextBtn) {
    nextBtn.disabled = poems.length < 2;
    nextBtn.addEventListener('click', () => goToPoem(nextIndex));
  }

  document.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'ArrowLeft' && poems.length > 1) goToPoem(prevIndex);
    if (e.key === 'ArrowRight' && poems.length > 1) goToPoem(nextIndex);
  });

  initBookmarkButton(poem.id);
  initQuoteCard(poem);
  initBreathPrelude(poem);
  initCandleTimer();
}

function initBreathPrelude(poem) {
  const overlay = document.getElementById('breath-overlay');
  const circle = document.getElementById('breath-circle');
  const word = document.getElementById('breath-word');
  const body = document.getElementById('poem-body');

  if (!overlay || !circle || !word || !body) {
    body.querySelectorAll('.line').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  body.querySelectorAll('.line').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(8px)';
  });

  const cycle = [
    { word: 'breathe in',  cls: 'in',  ms: 4000 },
    { word: 'breathe out', cls: 'out', ms: 4000 }
  ];

  let i = 0;
  function step() {
    if (i >= cycle.length) {
      overlay.classList.add('done');
      setTimeout(() => {
        writePoem(poem);
      }, 600);
      return;
    }
    const phase = cycle[i];
    word.textContent = phase.word;
    circle.classList.remove('in', 'out');
    void circle.offsetWidth;
    circle.classList.add(phase.cls);
    i++;
    setTimeout(step, phase.ms);
  }

  setTimeout(step, 800);
}

function writePoem(poem) {
  const body = document.getElementById('poem-body');
  if (!body) return;
  const lines = body.querySelectorAll('.line');
  let lineIndex = 0;

  function writeLine() {
    if (lineIndex >= lines.length) return;
    const lineEl = lines[lineIndex];
    const fullText = lineEl.innerHTML.replace(/&nbsp;/g, ' ');
    lineEl.innerHTML = '';
    lineEl.classList.add('typing-line');
    lineEl.style.opacity = '1';
    lineEl.style.transform = 'none';

    let charIndex = 0;
    const speed = 32;

    function typeChar() {
      if (charIndex >= fullText.length) {
        lineEl.classList.add('finished');
        lineIndex++;
        setTimeout(writeLine, 280);
        return;
      }
      lineEl.innerHTML = fullText.slice(0, charIndex + 1);
      charIndex++;
      setTimeout(typeChar, speed);
    }
    typeChar();
  }

  writeLine();
}

function initCandleTimer() {
  const btn = document.getElementById('candle-btn');
  const overlay = document.getElementById('candle-overlay');
  const timeEl = document.getElementById('candle-time');
  const stopBtn = document.getElementById('candle-stop');
  if (!btn || !overlay || !timeEl || !stopBtn) return;

  let interval = null;
  let remaining = 180;

  function fmt(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  function start() {
    remaining = 180;
    timeEl.textContent = fmt(remaining);
    overlay.classList.add('open');
    btn.classList.add('active');

    interval = setInterval(() => {
      remaining--;
      timeEl.textContent = fmt(remaining);
      if (remaining <= 0) {
        stop();
        timeEl.textContent = 'done';
      }
    }, 1000);
  }

  function stop() {
    clearInterval(interval);
    interval = null;
    overlay.classList.remove('open');
    btn.classList.remove('active');
  }

  btn.addEventListener('click', () => {
    if (overlay.classList.contains('open')) stop();
    else start();
  });

  stopBtn.addEventListener('click', stop);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) stop();
  });
}

function goToPoem(index) {
  fadeAndGo(`poem.html?id=${encodeURIComponent(poems[index].id)}`, 400);
}

function initFocusMode() {
  const btn = document.getElementById('focus-toggle');
  if (!btn) return;
  btn.addEventListener('click', () => {
    document.body.classList.toggle('focus-mode');
    const on = document.body.classList.contains('focus-mode');
    btn.textContent = on ? '✕' : '📖';
    btn.title = on ? 'Exit focus mode (Esc)' : 'Focus reading mode';
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') document.body.classList.remove('focus-mode');
  });
}

function initFontSize() {
  const up = document.getElementById('font-up');
  const down = document.getElementById('font-down');
  if (!up || !down) return;

  const sizes = [1.0, 1.1, 1.2, 1.35, 1.5, 1.7];
  let idx = parseInt(localStorage.getItem('poem-size-idx') || '2', 10);

  function apply() {
    document.documentElement.style.setProperty('--poem-size', sizes[idx] + 'rem');
    localStorage.setItem('poem-size-idx', idx);
  }
  apply();

  up.addEventListener('click', () => { if (idx < sizes.length - 1) { idx++; apply(); } });
  down.addEventListener('click', () => { if (idx > 0) { idx--; apply(); } });
}

function initReactions() {
  const buttons = document.querySelectorAll('.reaction-buttons button');
  if (!buttons.length) return;
  const status = document.getElementById('reaction-status');

  buttons.forEach(btn => {
    btn.addEventListener('click', async () => {
      buttons.forEach(b => b.classList.remove('chosen'));
      btn.classList.add('chosen');

      const reaction = btn.dataset.reaction;
      const poemTitle = document.getElementById('poem-title')?.textContent || '';
      const form = document.getElementById('comment-form');
      const endpoint = form?.action;

      if (!endpoint || endpoint.includes('YOUR_FORM_ID')) {
        if (status) status.textContent = '🤍 received';
        return;
      }

      const data = new FormData();
      data.append('poem', poemTitle);
      data.append('reaction', reaction);
      data.append('type', 'whisper');

      try {
        await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
        if (status) status.textContent = '🤍 the poet felt that';
      } catch {
        if (status) status.textContent = '🤍 received';
      }
    });
  });
}

function initCommentForm() {
  const form = document.getElementById('comment-form');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const status = document.getElementById('form-status');
    const data = new FormData(form);

    if (form.action.includes('YOUR_FORM_ID')) {
      status.textContent = '⚠️ Add your Formspree ID in poem.html first.';
      return;
    }

    status.textContent = 'Sending…';
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        status.textContent = '🤍 Thank you. Your note is on its way.';
      } else {
        status.textContent = 'Hmm, something went wrong. Please try again.';
      }
    } catch {
      status.textContent = 'Hmm, something went wrong. Please try again.';
    }
  });
}

function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

function initQuoteCard(currentPoem) {
  const modal = document.getElementById('quote-modal');
  const shareBtn = document.getElementById('share-btn');
  const closeBtn = document.getElementById('quote-close');
  const select = document.getElementById('quote-line-select');
  const canvas = document.getElementById('quote-canvas');
  const status = document.getElementById('quote-status');

  if (!modal || !shareBtn || !currentPoem) return;

  const nonEmptyLines = currentPoem.lines.filter(l => l.trim() !== '');
  select.innerHTML = nonEmptyLines
    .map((line, i) => `<option value="${i}">${line}</option>`)
    .join('');

  function draw() {
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    const accent = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim() || '#C97B63';

    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, '#FAF6F0');
    grad.addColorStop(1, '#EFE7DA');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    ctx.fillStyle = accent;
    ctx.fillRect(0, 0, W, 8);
    ctx.fillRect(0, H - 8, W, 8);

    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.15;
    ctx.font = 'italic 260px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('“', W / 2, 240);
    ctx.globalAlpha = 1;

    const lineIndex = parseInt(select.value, 10);
    const line = nonEmptyLines[lineIndex] || '';

    ctx.fillStyle = '#2B2B2B';
    ctx.font = 'italic 64px "Cormorant Garamond", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const words = line.split(' ');
    const lines = [];
    let current = '';
    const maxWidth = W - 220;
    words.forEach(word => {
      const test = current ? current + ' ' + word : word;
      if (ctx.measureText(test).width > maxWidth && current) {
        lines.push(current);
        current = word;
      } else current = test;
    });
    if (current) lines.push(current);

    const lineHeight = 90;
    const startY = H / 2 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((l, i) => ctx.fillText(l, W / 2, startY + i * lineHeight));

    ctx.fillStyle = accent;
    ctx.font = 'italic 34px "Dancing Script", cursive';
    ctx.fillText(`— ${currentPoem.title}`, W / 2, H - 180);
    ctx.font = 'italic 26px "Cormorant Garamond", Georgia, serif';
    ctx.fillStyle = '#6b6b6b';
    ctx.fillText('Privilege the Poet · The Poet\u2019s Room', W / 2, H - 120);
  }

  function open() {
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => draw());
    } else {
      draw();
    }
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }
  function close() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
  }

  shareBtn.addEventListener('click', open);
  closeBtn.addEventListener('click', close);
  modal.addEventListener('click', (e) => { if (e.target === modal) close(); });
  select.addEventListener('change', draw);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) close();
  });

  document.getElementById('quote-download').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `${currentPoem.id}-quote.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    status.textContent = '🤍 saved to your downloads';
  });

  document.getElementById('quote-copy').addEventListener('click', async () => {
    try {
      const blob = await new Promise(r => canvas.toBlob(r, 'image/png'));
      await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
      status.textContent = '🤍 copied — paste it anywhere';
    } catch {
      status.textContent = 'copy not supported — try Download';
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  applyRandomAccent();
  initTheme();
  initGreeting();
  initStreak();
  renderPoemOfTheDay();
  renderHome();
  renderSavedPage();
  renderPoem();
  initWander();
  initFocusMode();
  initFontSize();
  initReactions();
  initCommentForm();
  initScrollProgress();

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.body.classList.remove('loading');

  setTimeout(() => {
    const w = document.getElementById('welcome');
    if (w) w.remove();
  }, 3400);
});

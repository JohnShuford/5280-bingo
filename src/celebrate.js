import { completedLineIds, isBlackout } from './lib/bingo.js';

// Returns an update(doneIds) function. Call it on every state change; it fires a confetti
// "BINGO!" the first time each line completes, and a full-rave "BLACKOUT!" (lasers, strobe,
// confetti storm + an Honorary Coloradan banner) when all 16 are done.
// Re-completing a line that was undone celebrates again (it is pruned when broken).
// The very first call primes state silently, so saved progress loaded on page open
// does not re-trigger celebrations for lines/blackouts already achieved.
export function createCelebrator(activities, mount = document.body) {
  const stage = ensureStage(mount);
  const celebrated = new Set();
  let blackoutShown = false;
  let primed = false;

  // Map the done activity-ids to grid cell indices (board order === activities order).
  function doneIndices(doneIds) {
    const set = new Set();
    activities.forEach((a, i) => { if (doneIds.has(a.id)) set.add(i); });
    return set;
  }

  return function update(doneIds) {
    const completed = completedLineIds(doneIndices(doneIds));
    const completedSet = new Set(completed);

    for (const id of completed) {
      if (!celebrated.has(id)) {
        celebrated.add(id);
        if (primed) bingoCelebration(stage);
      }
    }
    for (const id of [...celebrated]) {
      if (!completedSet.has(id)) celebrated.delete(id);  // line broken — allow future re-celebrate
    }

    if (isBlackout(doneIds.size)) {
      if (!blackoutShown) { blackoutShown = true; if (primed) blackoutCelebration(stage); }
    } else {
      blackoutShown = false;
    }

    primed = true;  // subsequent calls reflect genuine user transitions, not loaded state
  };
}

const CONFETTI_COLORS = ['#fb4f14', '#0d52b0', '#ffffff', '#ffd23f'];
const NEON = ['#fb4f14', '#0d52b0', '#ffd23f', '#c71fa2', '#00e5ff', '#39ff14'];

// A single fixed, click-through overlay that all the effects render into.
function ensureStage(mount) {
  let stage = mount.querySelector(':scope > .celebrate-stage');
  if (!stage) {
    stage = document.createElement('div');
    stage.className = 'celebrate-stage';
    mount.appendChild(stage);
  }
  return stage;
}

function confettiBurst(stage, count) {
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'celebrate-confetti';
    const size = 6 + Math.random() * 9;
    p.style.left = Math.random() * 100 + 'vw';
    p.style.width = size + 'px';
    p.style.height = size * 0.6 + 'px';
    p.style.background = CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0];
    if (Math.random() > 0.6) p.style.borderRadius = '50%';
    p.style.animationDuration = 1.6 + Math.random() * 2.2 + 's';
    p.style.animationDelay = Math.random() * 0.4 + 's';
    stage.appendChild(p);
    setTimeout(() => p.remove(), 4200);
  }
}

function bigWord(stage, text, blackout) {
  const wrap = document.createElement('div');
  wrap.className = 'celebrate-word' + (blackout ? ' blackout' : '');
  const span = document.createElement('span');
  span.textContent = text;
  wrap.appendChild(span);
  stage.appendChild(wrap);
  setTimeout(() => wrap.remove(), 1700);
}

function bingoCelebration(stage) {
  bigWord(stage, 'BINGO!', false);
  confettiBurst(stage, 90);
}

function blackoutCelebration(stage) {
  // strobing rave wash
  const strobe = document.createElement('div');
  strobe.className = 'celebrate-strobe';
  stage.appendChild(strobe);

  // sweeping neon lasers
  for (let i = 0; i < 9; i++) {
    const laser = document.createElement('div');
    laser.className = 'celebrate-laser';
    laser.style.setProperty('--c', NEON[i % NEON.length]);
    laser.style.left = 6 + Math.random() * 88 + 'vw';
    laser.style.animationDuration = 1.6 + Math.random() * 1.4 + 's';
    laser.style.animationDelay = Math.random() * 0.8 + 's';
    stage.appendChild(laser);
    setTimeout(() => laser.remove(), 6000);
  }

  // confetti storm in waves
  confettiBurst(stage, 140);
  setTimeout(() => confettiBurst(stage, 140), 700);
  setTimeout(() => confettiBurst(stage, 140), 1500);
  setTimeout(() => confettiBurst(stage, 120), 2400);

  bigWord(stage, 'BLACKOUT!', true);

  // Honorary Coloradan banner drops from the top
  const banner = document.createElement('div');
  banner.className = 'celebrate-banner drop';
  banner.innerHTML =
    '<div class="mtn">⛰️ 🏔️ ⛰️</div>' +
    '<div class="title">YOU ARE NOW AN<br>HONORARY COLORADAN</div>' +
    '<div class="sub">★ WELCOME HOME, RACHEL &amp; STEVEN ★</div>' +
    '<div class="stripe"></div>';
  stage.appendChild(banner);

  setTimeout(() => strobe.remove(), 5600);
  setTimeout(() => banner.remove(), 6500);
}

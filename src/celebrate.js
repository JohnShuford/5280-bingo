import { completedLineIds, isBlackout } from './lib/bingo.js';

// Returns an update(doneIds) function. Call it on every state change; it fires a
// "BINGO!" banner the first time each line completes and "BLACKOUT!" when all 16 are done.
// Re-completing a line that was undone celebrates again (it is pruned when broken).
// The very first call primes state silently, so saved progress loaded on page open
// does not re-trigger banners for lines/blackouts already achieved.
export function createCelebrator(activities, mount = document.body) {
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
        if (primed) showBanner('BINGO!', false, mount);
      }
    }
    for (const id of [...celebrated]) {
      if (!completedSet.has(id)) celebrated.delete(id);  // line broken — allow future re-celebrate
    }

    if (isBlackout(doneIds.size)) {
      if (!blackoutShown) { blackoutShown = true; if (primed) showBanner('BLACKOUT!', true, mount); }
    } else {
      blackoutShown = false;
    }

    primed = true;  // subsequent calls reflect genuine user transitions, not loaded state
  };
}

function showBanner(text, isBlackout, mount) {
  const wrap = document.createElement('div');
  wrap.className = 'celebrate';
  const span = document.createElement('div');
  span.className = 'celebrate-text' + (isBlackout ? ' blackout' : '');
  span.textContent = text;
  wrap.appendChild(span);
  mount.appendChild(wrap);
  setTimeout(() => wrap.remove(), 1500);
}

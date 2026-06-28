// Render the 4x4 grid and wire square taps to the store. Depends only on store + activities.
export function renderBoard(container, activities, store) {
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'grid';
  const squares = new Map();

  for (const a of activities) {
    const square = document.createElement('div');
    square.className = 'square';
    square.setAttribute('role', 'button');
    square.setAttribute('aria-pressed', 'false');
    square.setAttribute('aria-label', a.description);
    square.tabIndex = 0;

    const x = document.createElement('span');
    x.className = 'x';
    x.textContent = '✕';

    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = a.label;

    const link = document.createElement('a');
    link.className = 'link';
    link.href = a.url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = '↗';
    link.setAttribute('aria-label', `Open the ${a.label} website`);
    link.addEventListener('click', e => e.stopPropagation()); // don't toggle when opening link

    square.append(x, label, link);
    square.addEventListener('click', () => store.toggle(a.id));
    square.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); store.toggle(a.id); }
    });

    grid.appendChild(square);
    squares.set(a.id, square);
  }

  container.appendChild(grid);

  store.subscribe(doneIds => {
    for (const [id, square] of squares) {
      const done = doneIds.has(id);
      square.classList.toggle('done', done);
      square.setAttribute('aria-pressed', String(done));
    }
  });
}

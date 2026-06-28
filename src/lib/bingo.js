// Pure bingo geometry + win detection. No DOM, no Firebase — Node-testable.
export const GRID_SIZE = 4;
export const TOTAL = GRID_SIZE * GRID_SIZE;

// Generate every winning line for a size x size grid, as arrays of cell indices.
export function buildLines(size = GRID_SIZE) {
  const lines = [];
  for (let r = 0; r < size; r++) {
    lines.push(Array.from({ length: size }, (_, c) => r * size + c)); // rows
  }
  for (let c = 0; c < size; c++) {
    lines.push(Array.from({ length: size }, (_, r) => r * size + c)); // columns
  }
  lines.push(Array.from({ length: size }, (_, i) => i * size + i));               // top-left → bottom-right
  lines.push(Array.from({ length: size }, (_, i) => i * size + (size - 1 - i)));  // top-right → bottom-left
  return lines;
}

export const LINES = buildLines();

// Stable string id for a line, used to track which lines already celebrated.
export function lineId(line) {
  return line.join('-');
}

// Given the done cell indices, return ids of every fully-complete line.
export function completedLineIds(doneIndices, lines = LINES) {
  const done = doneIndices instanceof Set ? doneIndices : new Set(doneIndices);
  return lines.filter(line => line.every(i => done.has(i))).map(lineId);
}

export function isBlackout(doneCount, total = TOTAL) {
  return doneCount >= total;
}

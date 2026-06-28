import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildLines, LINES, lineId, completedLineIds, isBlackout, TOTAL } from '../src/lib/bingo.js';

test('a 4x4 grid has 10 winning lines (4 rows, 4 cols, 2 diagonals)', () => {
  assert.equal(buildLines(4).length, 10);
});

test('every line has exactly 4 cell indices', () => {
  for (const line of LINES) assert.equal(line.length, 4);
});

test('top row is [0,1,2,3] and left column is [0,4,8,12]', () => {
  assert.deepEqual(LINES[0], [0, 1, 2, 3]);
  assert.deepEqual(LINES[4], [0, 4, 8, 12]);
});

test('the two diagonals are [0,5,10,15] and [3,6,9,12]', () => {
  assert.deepEqual(LINES[8], [0, 5, 10, 15]);
  assert.deepEqual(LINES[9], [3, 6, 9, 12]);
});

test('completedLineIds returns a completed top row', () => {
  const done = new Set([0, 1, 2, 3]);
  assert.deepEqual(completedLineIds(done), ['0-1-2-3']);
});

test('completedLineIds returns empty when no line is complete', () => {
  const done = new Set([0, 1, 2, 5]);
  assert.deepEqual(completedLineIds(done), []);
});

test('completedLineIds accepts a plain array too', () => {
  assert.deepEqual(completedLineIds([0, 5, 10, 15]), ['0-5-10-15']);
});

test('isBlackout is true only when all 16 are done', () => {
  assert.equal(isBlackout(16), true);
  assert.equal(isBlackout(15), false);
  assert.equal(TOTAL, 16);
});

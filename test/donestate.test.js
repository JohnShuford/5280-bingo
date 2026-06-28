import { test } from 'node:test';
import assert from 'node:assert/strict';
import { serializeDone, deserializeDone } from '../src/lib/donestate.js';

test('serializeDone turns a Set of ids into a {id:true} object', () => {
  assert.deepEqual(serializeDone(new Set(['red-rocks', 'casa-bonita'])), {
    'red-rocks': true,
    'casa-bonita': true,
  });
});

test('deserializeDone turns a {id:true} object into a Set of ids', () => {
  const set = deserializeDone({ 'red-rocks': true, 'casa-bonita': true });
  assert.ok(set instanceof Set);
  assert.deepEqual([...set].sort(), ['casa-bonita', 'red-rocks']);
});

test('deserializeDone drops falsy values', () => {
  const set = deserializeDone({ 'red-rocks': true, 'casa-bonita': false, 'little-man': 0 });
  assert.deepEqual([...set], ['red-rocks']);
});

test('deserializeDone handles null/undefined/empty as an empty Set', () => {
  assert.equal(deserializeDone(null).size, 0);
  assert.equal(deserializeDone(undefined).size, 0);
  assert.equal(deserializeDone({}).size, 0);
});

test('round-trips cleanly', () => {
  const original = new Set(['a', 'b', 'c']);
  assert.deepEqual([...deserializeDone(serializeDone(original))].sort(), ['a', 'b', 'c']);
});

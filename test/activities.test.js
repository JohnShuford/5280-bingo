import { test } from 'node:test';
import assert from 'node:assert/strict';
import { activities } from '../src/activities.js';

test('there are exactly 16 activities', () => {
  assert.equal(activities.length, 16);
});

test('every activity has the required fields with correct types', () => {
  for (const a of activities) {
    assert.equal(typeof a.id, 'string', `id missing on ${JSON.stringify(a)}`);
    assert.equal(typeof a.label, 'string', `label missing on ${a.id}`);
    assert.equal(typeof a.description, 'string', `description missing on ${a.id}`);
    assert.match(a.url, /^https?:\/\//, `url malformed on ${a.id}`);
    assert.equal(typeof a.lat, 'number', `lat missing on ${a.id}`);
    assert.equal(typeof a.lng, 'number', `lng missing on ${a.id}`);
  }
});

test('all ids are unique', () => {
  const ids = activities.map(a => a.id);
  assert.equal(new Set(ids).size, ids.length);
});

test('all coordinates are in the Colorado Front Range bounding box', () => {
  for (const a of activities) {
    assert.ok(a.lat > 39.4 && a.lat < 40.2, `lat out of range on ${a.id}: ${a.lat}`);
    assert.ok(a.lng > -105.5 && a.lng < -104.7, `lng out of range on ${a.id}: ${a.lng}`);
  }
});

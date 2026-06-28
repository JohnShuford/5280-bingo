// Pure conversion between the Firebase shape ({id:true}) and an in-memory Set of ids.
export function serializeDone(idSet) {
  const obj = {};
  for (const id of idSet) obj[id] = true;
  return obj;
}

export function deserializeDone(obj) {
  const set = new Set();
  if (obj && typeof obj === 'object') {
    for (const [id, value] of Object.entries(obj)) {
      if (value) set.add(id);
    }
  }
  return set;
}

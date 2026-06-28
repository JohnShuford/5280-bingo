import { serializeDone, deserializeDone } from './lib/donestate.js';
import { firebaseConfig } from '../firebase-config.js';

const LOCAL_KEY = '5280-done';
const FB_VERSION = '10.12.2';

let doneSet = new Set();
const listeners = new Set();
let backend = 'local';          // 'firebase' | 'local'
let fbSet = null;               // firebase database set() fn
let fbRef = null;               // firebase database ref to 'done'

function emit() {
  for (const cb of listeners) cb(new Set(doneSet));
}

// Initialize the store. Uses Firebase when firebaseConfig.databaseURL is present,
// otherwise a localStorage fallback that still syncs across tabs in one browser.
export async function initStore() {
  if (firebaseConfig && firebaseConfig.databaseURL) {
    try {
      const { initializeApp } = await import(`https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-app.js`);
      const { getDatabase, ref, onValue, set } = await import(`https://www.gstatic.com/firebasejs/${FB_VERSION}/firebase-database.js`);
      const app = initializeApp(firebaseConfig);
      const db = getDatabase(app);
      fbRef = ref(db, 'done');
      fbSet = set;
      backend = 'firebase';
      onValue(fbRef, snapshot => {
        doneSet = deserializeDone(snapshot.val());
        emit();
      });
      return;
    } catch (err) {
      console.warn('[store] Firebase init failed, using local fallback:', err);
    }
  }
  backend = 'local';
  doneSet = deserializeDone(readLocal());
  window.addEventListener('storage', evt => {
    if (evt.key === LOCAL_KEY) {
      doneSet = deserializeDone(JSON.parse(evt.newValue || '{}'));
      emit();
    }
  });
  emit();
}

function readLocal() {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || '{}');
  } catch {
    return {};
  }
}

// Register a listener. Immediately invoked with the current state. Returns an unsubscribe fn.
export function subscribe(cb) {
  listeners.add(cb);
  cb(new Set(doneSet));
  return () => listeners.delete(cb);
}

export function isDone(id) {
  return doneSet.has(id);
}

// Flip one activity's done state and persist it.
export async function toggle(id) {
  const next = new Set(doneSet);
  if (next.has(id)) next.delete(id);
  else next.add(id);

  if (backend === 'firebase') {
    await fbSet(fbRef, serializeDone(next));   // onValue listener will emit the new state
  } else {
    doneSet = next;
    localStorage.setItem(LOCAL_KEY, JSON.stringify(serializeDone(next)));
    emit();
  }
}

// Firebase web config for the shared 5280 Bingo board.
//
// NOTE: a Firebase *web* API key is an identifier, not a secret. It is designed to be
// shipped in client-side code and is safe to be public — what actually protects your
// data is your Realtime Database security rules, NOT this key. (See Google's docs:
// https://firebase.google.com/docs/projects/api-keys)
//
// store.js reads `databaseURL` here to decide whether to use Firebase (live cross-device
// sync) or fall back to per-browser localStorage. It loads the Firebase SDK from a CDN
// itself, so this file only needs to export the config object — nothing else.
export const firebaseConfig = {
  apiKey: "AIzaSyCtIOnAVviVbO-pc_rucbRbVwdl6G_kgZk",
  authDomain: "bingo-13c4e.firebaseapp.com",
  databaseURL: "https://bingo-13c4e-default-rtdb.firebaseio.com",
  projectId: "bingo-13c4e",
  storageBucket: "bingo-13c4e.firebasestorage.app",
  messagingSenderId: "529763722223",
  appId: "1:529763722223:web:7c66c986469d5799704c1a",
  measurementId: "G-FEVZVQXW2C",
};

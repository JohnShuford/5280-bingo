# 5280 Bingo

A welcome-to-Colorado gift for Rachel & Steven: a 4x4 "5280 Bingo" board of 16 activities
John & Kelly love, plus a Front Range map. Mark off adventures as you do them — progress
syncs live between devices. Themed after the Broncos 1977 "Orange Crush" throwbacks.

## Run locally

This is a static site that uses ES modules, so it must be served over HTTP (not opened
as a `file://` path). From the repo root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

(or `npx serve` if you prefer Node.)

Without Firebase configured, the board works using a per-browser localStorage fallback —
great for development and demos. Add Firebase (below) to sync across devices.

## Run the tests

```bash
node --test
```

Covers the pure logic: bingo line detection, blackout, done-state serialization, and the
activity data integrity.

## Firebase setup (enables cross-device sync)

1. Go to https://console.firebase.google.com/ and create a free project.
2. Build → **Realtime Database** → Create database.
3. Project settings → **Your apps** → add a **Web app** → copy the config object.
4. Paste *only the config object* into `firebase-config.js` as
   `export const firebaseConfig = { ... }` (don't paste the `import`/`initializeApp`
   lines from the console snippet — `store.js` handles SDK loading and init).
5. **Lock down the database rules.** In Realtime Database → **Rules**, paste the contents
   of [`database.rules.json`](./database.rules.json) and Publish. This restricts the
   database to the board's `done` map (boolean values only), so it can't be read elsewhere
   or abused as free storage.

The app auto-detects `databaseURL` and switches from the local fallback to live sync.

### A note on the API key

A Firebase **web** API key is an identifier, not a secret — it is designed to ship in
client-side code and is safe to be public. (See
https://firebase.google.com/docs/projects/api-keys.) Your data is protected by the
**security rules** above, not by hiding the key. On any static deploy (like GitHub Pages)
the config is delivered to every visitor's browser regardless of repo visibility, so the
correct hardening is the rules — not a private repo.

**Optional extra hardening:** in Google Cloud Console → APIs & Services → Credentials,
edit the auto-created browser API key and set **Application restrictions → HTTP referrers**
to `johnshuford.github.io/*` and `localhost:*`. (Safe here because this project doesn't use
Firebase Auth, which is the one service that can be sensitive to referrer restrictions.)

## Deploy to GitHub Pages

Push to GitHub, then Settings → Pages → deploy from `main` (root). The site is served as-is;
there is no build step.

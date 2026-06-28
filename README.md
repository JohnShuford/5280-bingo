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
2. Build → **Realtime Database** → Create database (start in **test mode** for this
   private family board; rules can be locked down later).
3. Project settings → **Your apps** → add a **Web app** → copy the config object.
4. Paste it into `firebase-config.js`, e.g.:

   ```js
   export const firebaseConfig = {
     apiKey: "AIza...",
     authDomain: "your-project.firebaseapp.com",
     databaseURL: "https://your-project-default-rtdb.firebaseio.com",
     projectId: "your-project",
     appId: "1:1234567890:web:abcdef"
   };
   ```

The app auto-detects `databaseURL` and switches from local fallback to live sync. The key
being visible in the page is expected and fine — only Rachel & Steven use this private URL.

## Deploy to GitHub Pages

Push to GitHub, then Settings → Pages → deploy from `main` (root). The site is served as-is;
there is no build step.

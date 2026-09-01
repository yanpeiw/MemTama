# AI Work Companion

Chrome extension (Manifest V3 currently) that overlays a pet on ChatGPT, growing from
the user's own message activity. See the project brief for full context and
constraints — the short version: this only ever reads the user's own
submitted input (char count + timestamp), never the assistant's responses.

## Develop

```
npm install
npm run dev      # vite dev server with HMR, load dist/ as unpacked extension
npm run build    # production build -> dist/
npm test         # pet-engine unit tests (vitest)
```

## Load in Chrome

1. `npm run build` (or `npm run dev` for HMR)
2. `chrome://extensions` → enable Developer Mode → "Load unpacked" → select `dist/`
3. Open chatgpt.com — the pet appears bottom-right and reacts to sent messages

## Layout

- `src/adapters/chatgpt.ts` — all ChatGPT DOM knowledge lives here; emits a
  generic `onUserMessage(charCount, timestamp)` event
- `src/engine/petEngine.ts` — pure, deterministic stats/stage logic (no DOM,
  no chrome APIs); unit tested in `petEngine.test.ts`
- `src/storage/storage.ts` — `chrome.storage.local` read/write
- `src/store/petStore.ts` — Zustand store gluing engine + storage together
- `src/overlay/` — Shadow-DOM-mounted React UI (placeholder emoji pet)
- `src/content/main.tsx` — content script entry point; mounts the overlay and
  wires the adapter to the store

Adding a new platform later = a new file in `src/adapters/`, nothing else
should need to change.

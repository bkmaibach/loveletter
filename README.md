# Love Letter (GitHub Pages)

A tiny, lightweight “open the envelope” love letter page.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

This project is configured with Vite `base: './'` in [`vite.config.js`](vite.config.js),
so built asset paths stay relative (handy for GitHub Pages repo sites).

Two common options:

- **GitHub Actions (recommended)**: use a workflow that runs `npm ci`, `npm run build`,
  then publishes `dist/` to Pages.
- **Manual**: run `npm run build` and publish the `dist/` folder via the Pages settings
  (or push `dist/` to a `gh-pages` branch if you prefer that approach).


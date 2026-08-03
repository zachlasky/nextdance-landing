# NextDance Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and deploy a two-page static marketing site (landing page + privacy policy) for the NextDance app at `nextdance.app`, matching the approved design spec.

**Architecture:** Vite multi-page build (`index.html` + `privacy.html` as separate entries, no framework runtime) styled with Tailwind CSS v4, whose theme is extended with NextDance's exact design tokens. Deployed to GitHub Pages via GitHub Actions.

**Tech Stack:** Vite 6, Tailwind CSS v4 (`@tailwindcss/vite` plugin, CSS-based `@theme` config — no `tailwind.config.js`/`postcss.config.js` needed), pnpm, GitHub Actions (`actions/deploy-pages`).

## Global Constraints

- Repo root: `~/Personal/nextdance-landing` (already `git init`'d, branch `master`, remote `origin` = `git@github.com:zachlasky/nextdance-landing.git`, not yet pushed).
- Package manager: pnpm (matches the NextDance app repo's convention).
- No React or any UI framework runtime — plain HTML + Tailwind utility classes + zero JS.
- No backend, no analytics, no crash reporting.
- No `LICENSE` file (intentional — default all-rights-reserved).
- Design tokens (exact hex values, mirrored from `nextdance/styles/global.ts`):
  - `bg: #171513`, `bg-elevated: #1F1C19`, `bg-inset: #100E0D`
  - `text: #EFE6D2`, `text-muted: #A39A88`, `text-dim: #6E6759`
  - `gold: #C9A86A`, `gold-dim: #8A7448`
  - `blue: #7B92A6`, `blue-dim: #54657A`
  - `border: #2A2622`, `border-strong: #3A352F`
- Display font: Fraunces (weight 600, plus italic 600), loaded from Google Fonts. Body font: system sans (Tailwind default stack).
- Custom domain: `nextdance.app` (already owned) via a `CNAME` file in the built output.
- "Testing" for this project means: build with `pnpm build` and grep the generated `dist/` output for expected strings/classes. There is no application logic to unit-test — verification is "does the static output contain what we specified."

---

### Task 1: Scaffold Vite + Tailwind v4 project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `src/style.css`
- Create: `index.html`
- Create: `.gitignore`

**Interfaces:**
- Produces: a working `pnpm dev` / `pnpm build` / `pnpm preview` pipeline that later tasks build on. `src/style.css` is the single stylesheet imported by both `index.html` and (in Task 6) `privacy.html`.

- [ ] **Step 1: Write `package.json`**

```json
{
  "name": "nextdance-landing",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run: `cd ~/Personal/nextdance-landing && pnpm add -D vite@^6 tailwindcss@^4 @tailwindcss/vite@^4`

Expected: `package.json` gains a `devDependencies` block and a `pnpm-lock.yaml` is created.

- [ ] **Step 3: Write `.gitignore`**

```
node_modules
dist
.DS_Store
```

- [ ] **Step 4: Write `vite.config.js`**

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()]
});
```

- [ ] **Step 5: Write `src/style.css`**

```css
@import "tailwindcss";
```

- [ ] **Step 6: Write a smoke-test `index.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NextDance</title>
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body>
    <div class="bg-black text-white p-8">Hello NextDance</div>
  </body>
</html>
```

- [ ] **Step 7: Build and verify**

Run: `pnpm build`

Expected: command succeeds, creates a `dist/` directory containing `index.html` and an `assets/*.css` file. Run `grep -c "Hello NextDance" dist/index.html` — expected output: `1`.

- [ ] **Step 8: Commit**

```bash
git add package.json pnpm-lock.yaml vite.config.js src/style.css index.html .gitignore
git commit -m "Scaffold Vite + Tailwind v4 project"
```

---

### Task 2: Add NextDance design tokens to the Tailwind theme

**Files:**
- Modify: `src/style.css`
- Modify: `index.html`

**Interfaces:**
- Consumes: `src/style.css` from Task 1 (currently just `@import "tailwindcss";`).
- Produces: Tailwind utility classes `bg-bg`, `bg-bg-elevated`, `bg-bg-inset`, `text-text`, `text-text-muted`, `text-text-dim`, `text-gold`, `bg-gold`, `text-blue`, `bg-blue`, `border-border`, `border-border-strong`, and `font-display` (Fraunces) — available for use in every later task's markup.

- [ ] **Step 1: Write the theme block in `src/style.css`**

```css
@import "tailwindcss";

@theme {
  --color-bg: #171513;
  --color-bg-elevated: #1f1c19;
  --color-bg-inset: #100e0d;

  --color-text: #efe6d2;
  --color-text-muted: #a39a88;
  --color-text-dim: #6e6759;

  --color-gold: #c9a86a;
  --color-gold-dim: #8a7448;
  --color-blue: #7b92a6;
  --color-blue-dim: #54657a;

  --color-border: #2a2622;
  --color-border-strong: #3a352f;

  --font-display: "Fraunces", serif;
}
```

- [ ] **Step 2: Load Fraunces in `index.html`'s `<head>`, and use theme classes in the smoke-test body**

Replace the full contents of `index.html` with:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NextDance</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body class="bg-bg text-text">
    <div class="font-display text-gold p-8">Hello NextDance</div>
  </body>
</html>
```

- [ ] **Step 3: Build and verify the theme compiled**

Run: `pnpm build`

Expected: `grep -c "#c9a86a" dist/assets/*.css` outputs `1` or more (confirms the `gold` token made it into compiled CSS). Run `grep -c "fonts.googleapis.com" dist/index.html` — expected: `1` or more.

- [ ] **Step 4: Commit**

```bash
git add src/style.css index.html
git commit -m "Add NextDance design tokens to Tailwind theme"
```

---

### Task 3: Build the header and hero section markup

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: theme classes from Task 2 (`bg-bg`, `text-text`, `text-gold`, `font-display`, etc.).
- Produces: the full hero markup that Task 4 (footer) and Task 5 (responsive classes) build on top of.

- [ ] **Step 1: Replace the full contents of `index.html` with the real header + hero markup**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NextDance</title>
    <meta
      name="description"
      content="NextDance — track your dance sessions. Activity, style, timestamped notes, all stored on your device."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body class="bg-bg text-text">
    <header class="flex items-center justify-between px-6 py-6 md:px-12">
      <span class="font-display text-lg text-text">NextDance</span>
      <a href="/privacy.html" class="text-sm text-text-muted hover:text-text">
        Privacy Policy
      </a>
    </header>

    <main class="px-6 md:px-12">
      <section class="relative overflow-hidden rounded-3xl bg-bg-elevated p-8 md:p-16">
        <!-- decorative squiggle accent -->
        <svg
          class="pointer-events-none absolute inset-0 h-full w-full opacity-30"
          viewBox="0 0 800 400"
          fill="none"
          preserveAspectRatio="none"
        >
          <path
            d="M0 320 C 150 260, 250 380, 400 300 S 650 180, 800 260"
            stroke="#3A352F"
            stroke-width="2"
            fill="none"
          />
        </svg>

        <div class="relative">
          <h1 class="font-display text-5xl leading-none md:text-7xl">
            <span class="block font-semibold">TRACK YOUR</span>
            <span class="block italic text-text-muted">NIGHT</span>
          </h1>

          <p class="mt-6 max-w-md text-text-muted">
            Log every session — activity, style, timestamped notes. All
            stored on your device, nothing in the cloud.
          </p>

          <a
            href="#"
            class="mt-8 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-bg"
          >
            Get the app
          </a>
          <!-- TODO: replace href="#" with the real App Store link once NextDance is published -->

          <div class="mt-10">
            <p class="text-sm text-text-muted">Coming soon</p>
            <div class="mt-3 flex gap-3">
              <span
                class="rounded-full border border-border-strong px-4 py-2 text-sm text-text-dim"
              >
                App Store
              </span>
              <span
                class="rounded-full border border-border-strong px-4 py-2 text-sm text-text-dim"
              >
                Google Play
              </span>
            </div>
          </div>

          <div class="mt-12 flex justify-center">
            <div
              class="flex h-96 w-48 items-center justify-center rounded-3xl border border-border-strong bg-bg-inset"
            >
              <span class="px-4 text-center text-sm text-text-dim">
                screenshot coming soon
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>
```

- [ ] **Step 2: Build and verify the hero copy is present**

Run: `pnpm build`

Expected: each of these greps returns `1` or more:
```bash
grep -c "TRACK YOUR" dist/index.html
grep -c "NIGHT" dist/index.html
grep -c "Get the app" dist/index.html
grep -c "Coming soon" dist/index.html
grep -c "App Store" dist/index.html
grep -c "Google Play" dist/index.html
grep -c "Privacy Policy" dist/index.html
```

- [ ] **Step 3: Verify the TODO comment is present in source (not required in build output)**

Run: `grep -c "TODO: replace href" index.html`

Expected: `1`.

- [ ] **Step 4: Commit**

```bash
git add index.html
git commit -m "Build header and hero section markup"
```

---

### Task 4: Add the footer

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: the hero markup from Task 3.
- Produces: final page structure (header, main, footer) that Task 5's responsive pass applies breakpoint classes to.

- [ ] **Step 1: Insert a `<footer>` immediately after the closing `</main>` tag and before `</body>`**

```html
    <footer class="mt-16 flex items-center justify-between px-6 py-8 text-sm text-text-dim md:px-12">
      <a href="/privacy.html" class="hover:text-text-muted">Privacy Policy</a>
      <span>&copy; 2026 NextDance</span>
    </footer>
  </body>
</html>
```

(This replaces the previous `  </body>\n</html>` closing lines — the `<footer>` block goes between `</main>` and `</body>`.)

- [ ] **Step 2: Build and verify**

Run: `pnpm build`

Expected:
```bash
grep -c "© 2026 NextDance" dist/index.html
```
outputs `1`.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Add footer with privacy link and copyright"
```

---

### Task 5: Make the hero responsive (two-column on md+, stacked below)

**Files:**
- Modify: `index.html`

**Interfaces:**
- Consumes: the hero `<div class="relative">` block from Task 3/4.
- Produces: final responsive layout — no later task depends on this one's internals.

- [ ] **Step 1: Restructure the hero's inner content into a two-column flex layout**

Replace the `<div class="relative">...</div>` block (the one directly inside `<section>`, after the `<svg>`) with:

```html
        <div class="relative flex flex-col md:flex-row md:items-center md:gap-12">
          <div class="md:flex-1">
            <h1 class="font-display text-5xl leading-none md:text-7xl">
              <span class="block font-semibold">TRACK YOUR</span>
              <span class="block italic text-text-muted">NIGHT</span>
            </h1>

            <p class="mt-6 max-w-md text-text-muted">
              Log every session — activity, style, timestamped notes. All
              stored on your device, nothing in the cloud.
            </p>

            <a
              href="#"
              class="mt-8 inline-block rounded-full bg-gold px-6 py-3 font-semibold text-bg"
            >
              Get the app
            </a>
            <!-- TODO: replace href="#" with the real App Store link once NextDance is published -->

            <div class="mt-10">
              <p class="text-sm text-text-muted">Coming soon</p>
              <div class="mt-3 flex gap-3">
                <span
                  class="rounded-full border border-border-strong px-4 py-2 text-sm text-text-dim"
                >
                  App Store
                </span>
                <span
                  class="rounded-full border border-border-strong px-4 py-2 text-sm text-text-dim"
                >
                  Google Play
                </span>
              </div>
            </div>
          </div>

          <div class="mt-12 flex justify-center md:mt-0 md:flex-1">
            <div
              class="flex h-96 w-48 items-center justify-center rounded-3xl border border-border-strong bg-bg-inset"
            >
              <span class="px-4 text-center text-sm text-text-dim">
                screenshot coming soon
              </span>
            </div>
          </div>
        </div>
```

- [ ] **Step 2: Build and verify the responsive classes compiled**

Run: `pnpm build`

Expected:
```bash
grep -c "md:flex-row" dist/index.html
grep -c "md:flex-1" dist/index.html
```
both output `1` or more, and `grep -c "md:flex-row" dist/assets/*.css` outputs `1` or more (confirms Tailwind generated the responsive utility, not just left the literal class name in HTML).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "Make hero responsive: two-column on md+, stacked below"
```

---

### Task 6: Build `privacy.html`

**Files:**
- Create: `privacy.html`
- Modify: `vite.config.js`

**Interfaces:**
- Consumes: `src/style.css` (Task 2), and links to/from `index.html`'s header/footer (Tasks 3–4).
- Produces: `dist/privacy.html` in the build output — nothing later depends on this task's internals.

- [ ] **Step 1: Write `privacy.html`**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Privacy Policy — NextDance</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,600;1,600&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body class="bg-bg text-text">
    <header class="flex items-center justify-between px-6 py-6 md:px-12">
      <a href="/index.html" class="font-display text-lg text-text">NextDance</a>
      <a href="/privacy.html" class="text-sm text-text-muted hover:text-text">
        Privacy Policy
      </a>
    </header>

    <main class="px-6 py-8 md:px-12">
      <div class="mx-auto max-w-2xl">
        <h1 class="font-display text-3xl">Privacy Policy</h1>
        <p class="mt-2 text-sm text-text-dim">Effective date: August 2, 2026</p>

        <h2 class="mt-8 font-display text-xl">What we collect</h2>
        <p class="mt-3 text-text-muted">
          Nothing. NextDance stores all of your session data — activity
          type, dance style, notes, and timestamps — locally on your
          device. None of it is transmitted anywhere: there is no backend
          server, and the app does not include any analytics or
          crash-reporting service.
        </p>

        <h2 class="mt-8 font-display text-xl">Changes to this policy</h2>
        <p class="mt-3 text-text-muted">
          If this ever changes — for example, if a future version of the
          app adds analytics — this page will be updated and the effective
          date above will change accordingly.
        </p>
      </div>
    </main>

    <footer class="mt-16 flex items-center justify-between px-6 py-8 text-sm text-text-dim md:px-12">
      <a href="/index.html" class="hover:text-text-muted">Home</a>
      <span>&copy; 2026 NextDance</span>
    </footer>
  </body>
</html>
```

- [ ] **Step 2: Register `privacy.html` as a second Vite build entry**

Replace the full contents of `vite.config.js` with:

```js
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privacy: resolve(__dirname, 'privacy.html')
      }
    }
  }
});
```

- [ ] **Step 3: Build and verify**

Run: `pnpm build`

Expected:
```bash
ls dist/privacy.html   # exists
grep -c "Effective date" dist/privacy.html
grep -c "there is no backend server" dist/privacy.html
grep -c "privacy.html" dist/index.html   # header/footer links resolve
```
all succeed / output `1` or more.

- [ ] **Step 4: Commit**

```bash
git add privacy.html vite.config.js
git commit -m "Add privacy policy page as a second Vite entry"
```

---

### Task 7: Add GitHub Pages deployment (CNAME + Actions workflow)

**Files:**
- Create: `public/CNAME`
- Create: `.github/workflows/deploy.yml`

**Interfaces:**
- Consumes: the `pnpm build` pipeline from Task 1 (produces `dist/`).
- Produces: a `dist/CNAME` file (Vite copies everything in `public/` to the build output root) and a CI workflow — final task, nothing depends on this.

- [ ] **Step 1: Write `public/CNAME`**

```
nextdance.app
```

(No trailing newline is preferred for `CNAME` files, but a trailing newline does not break GitHub Pages — either is fine.)

- [ ] **Step 2: Write `.github/workflows/deploy.yml`**

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: pnpm
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 3: Build and verify `CNAME` ends up in the output**

Run: `pnpm build`

Expected: `cat dist/CNAME` outputs `nextdance.app`.

- [ ] **Step 4: Commit**

```bash
git add public/CNAME .github/workflows/deploy.yml
git commit -m "Add GitHub Pages deployment workflow and custom domain"
```

- [ ] **Step 5: Push to the remote and enable GitHub Pages (requires explicit go-ahead — this pushes to a real remote and changes a live repo setting)**

Run: `git push -u origin master`

Then, in the repo's GitHub settings (Settings → Pages), set the Pages source to "GitHub Actions" (or via `gh api repos/zachlasky/nextdance-landing/pages -X POST -f build_type=workflow` if the `gh` CLI is authenticated). Confirm with the user before running either — this is a real push and a real settings change on `zachlasky/nextdance-landing`, not local-only.

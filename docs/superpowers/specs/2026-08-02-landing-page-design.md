# NextDance landing page — design

## Purpose

A small marketing/landing site for the NextDance app, hosted at `nextdance.app` via GitHub Pages, living in its own repo (`nextdance-landing`, separate from the app repo). The immediate driver is needing a public URL for the app's privacy policy; since that requires hosting anyway, it doubles as a proper landing page.

## Scope

Two static pages:
- `index.html` — landing page (hero pitch + app store links)
- `privacy.html` — privacy policy

No user accounts, no backend, no analytics. Not trying to be a full marketing site (no blog, no reviews, no "about us") — NextDance is a personal app, not a product with a team or content pipeline behind it.

## Tech approach

**Vite (multi-page) + Tailwind CSS, no framework runtime.**

- Vite's built-in [multi-page app support](https://vite.dev/guide/build.html#multi-page-app) treats `index.html` and `privacy.html` as separate entry points — no React/Vue/etc., just HTML + Tailwind utility classes + a sliver of vanilla JS if truly needed (none is currently anticipated).
- Tailwind's theme is extended with the NextDance app's exact design tokens (see below) so classes read as `bg-bg text-text` rather than arbitrary hex values, and the landing page stays visually consistent with the app if the app's palette ever shifts.
- Rejected alternatives: plain hand-written HTML/CSS (simpler deploy, but slower to iterate on layout without Tailwind); a static-site generator or React/Vite SPA (unnecessary tooling for two mostly-static pages).

### Design tokens (mirrored from `nextdance/styles/global.ts`)

```
colors:
  bg: #171513
  bg-elevated: #1F1C19
  bg-inset: #100E0D
  text: #EFE6D2
  text-muted: #A39A88
  text-dim: #6E6759
  gold: #C9A86A
  gold-dim: #8A7448
  blue: #7B92A6
  blue-dim: #54657A
  border: #2A2622
  border-strong: #3A352F

fonts:
  display: Fraunces (SemiBold + Italic), loaded via Google Fonts
  body: system sans stack (Tailwind's default)
```

Vibe carries over directly from the app: warm dark charcoal, cream text, muted gold/blue accents, "never crisp or corporate."

## Deployment

- GitHub Pages, custom domain `nextdance.app` (already owned), via a `CNAME` file in the built output.
- GitHub Actions workflow: on push to `master`, run `vite build`, publish `dist/` using `actions/deploy-pages`. Standard Vite + GitHub Pages flow — no manual `gh-pages` branch pushes.
- Repo is public (already created at `git@github.com:zachlasky/nextdance-landing.git`); GitHub Pages on the free plan requires a public repo for a private-account setup, and there's no reason to keep this one private. No LICENSE file — default all-rights-reserved is fine for a personal marketing page.

## Page: `index.html`

**Header** — wordmark ("NextDance") on the left, a single "Privacy Policy" text link on the right. No other nav items (no blog/reviews/about to link to).

**Hero**
- Two-line display headline, echoing the reference image's oversized treatment: "TRACK YOUR" (Fraunces SemiBold) / "NIGHT" (Fraunces Italic), both in `text` color.
- Body paragraph, `text-muted`, sans, max-width constrained (not full bleed): "Log every session — activity, style, timestamped notes. All stored on your device, nothing in the cloud."
- CTA button: "Get the app", pill-shaped, solid `gold` background with `bg`-colored text for contrast. Links to a placeholder (`href="#"`) with an inline `<!-- TODO: replace with real App Store link once published -->` comment — the app isn't on the App Store yet (dev-client only per the app's README).
- Below the CTA: "Coming soon" + two pill-outline badge placeholders labeled "App Store" / "Google Play", non-clickable (`href="#"`).
- Hero visual: a large rounded card in `bg-elevated` (not a new color — reusing the app's layered-elevation pattern instead of the reference's lavender block) containing a phone-mockup placeholder: a simple rounded-rect device frame outline with a `bg-inset` fill and a small "screenshot coming soon" label — no fake app UI drawn inside it.
- Decorative squiggle accent: a thin SVG line in `border`/`border-strong` tone, faint, positioned behind/around the hero content — subtle, not a focal element.

**Footer** — "Privacy Policy" link (duplicate of header's, for scannability) + a small `© 2026 NextDance` line. No social icons, no extra links.

## Page: `privacy.html`

Same header (wordmark + link back to home). Body is plain prose, styled consistently with the hero (Fraunces for the page title, sans body text), covering:

1. **Effective date** — dated to when this is published (keeps the "as of" framing honest since this may change).
2. **What we collect** — none. NextDance stores all session data (activity type, dance style, notes, timestamps) locally on-device via `AsyncStorage`. Nothing is transmitted to any server; there is no backend and no analytics/crash-reporting SDK in the app today (confirmed against `package.json` during design).
3. **Changes to this policy** — one line noting the policy may change if data collection is added in the future, and the effective date at the top will update accordingly. This deliberately avoids an absolute "we will never collect data" promise, since the user indicated that could change.

No contact-us section — not needed for a personal app with no support pipeline.

## Responsive behavior

Single breakpoint collapse: on narrow viewports, the hero stacks vertically (headline + body + CTA above the phone-mockup card, full width) instead of the two-column layout. This is table-stakes for a public page, not a separate feature — implemented via Tailwind's responsive utility prefixes (`md:` for the two-column layout).


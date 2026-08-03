# NextDance Landing

Marketing landing page for NextDance, deployed at [nextdance.app](https://nextdance.app).

## Stack

- [Vite](https://vite.dev) — multi-page build (`index.html`, `privacy.html`), each mounting a React root
- [React](https://react.dev) — shared components (`Header`, `Footer`, `GetAppButton`) live in `src/components`, pages in `src/pages`
- [Tailwind CSS v4](https://tailwindcss.com)

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build    # outputs to dist/
pnpm preview  # preview the production build locally
```

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages.

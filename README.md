# gymbite-site

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_uUPut23mJWSXCzTOuMWz6VfbABhP)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Hosting

`pnpm build` and `pnpm start` are the Next.js server used by the existing Vercel project. That server build still serves `/`, `/get`, `/GymBite.apk`, and the dynamic `/api/seo` route behind the `vercel.json` rewrites.

`pnpm build:static` writes a static copy to `out/` for hosts that do not run Next. It prerenders the homepage, install page, APK, sitemap, robots.txt, and every SEO URL. No environment values are required. `SITE_URL` is the public origin without a path, and `NEXT_PUBLIC_BASE_PATH` is an optional path prefix.

The checked-in Cloudflare config is asset-only: `wrangler.jsonc` serves `out/` and does not invoke a Worker script for files that exist. Deploy it with `pnpm exec wrangler deploy` after `pnpm build:static`. The workflow `.github/workflows/deploy-cloudflare.yml` expects secret names `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID`.

`.github/workflows/deploy-github-pages.yml` publishes the same static build to GitHub Pages for this repository.

Production `https://gymbite-site.vercel.app` is unchanged until DNS is updated by hand. The calorie-tracker web app linked from this site is a separate host and is not built from this repository.

Vercel Web Analytics is included only when `VERCEL=1`, which Vercel sets for its own builds. Static hosts do not request `/_vercel/insights/script.js`. This repository does not reference PulseHQ.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

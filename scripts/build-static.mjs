import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  DEFAULT_SITE_URL,
  createCtx,
  getAllSlugs,
  parseSlug,
  renderHub,
  renderPage,
  renderRobots,
  renderSitemap,
} from '../lib/seo-content.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const nextOut = path.join(root, 'out')
const outDir = path.resolve(root, process.env.STATIC_OUT_DIR || 'out')

function fail(message) {
  throw new Error(message)
}

function runNextBuild() {
  const result = spawnSync('pnpm', ['exec', 'next', 'build'], {
    cwd: root,
    env: {
      ...process.env,
      STATIC_EXPORT: '1',
      NEXT_PUBLIC_TRAILING_SLASH: '1',
      SITE_URL: process.env.SITE_URL || DEFAULT_SITE_URL,
      NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH || '',
    },
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    fail(`next build exited ${result.status}`)
  }
}

function writeFile(rel, body) {
  const file = path.join(outDir, rel)
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, body)
}

function cloudflareHeaders() {
  return `# Cloudflare Workers static asset headers.
/GymBite.apk
  Content-Type: application/vnd.android.package-archive
  X-Content-Type-Options: nosniff

/sitemap.xml
  Content-Type: application/xml; charset=utf-8

/robots.txt
  Content-Type: text/plain; charset=utf-8

/seo/*
  Cache-Control: public, max-age=3600
`
}

function prerenderSeo() {
  const origin = process.env.SITE_URL || DEFAULT_SITE_URL
  const ctx = createCtx(origin, {
    origin,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
    trailingSlash: true,
  })
  const slugs = getAllSlugs()
  writeFile('sitemap.xml', renderSitemap(ctx))
  writeFile('robots.txt', renderRobots(ctx))
  writeFile(path.join('seo', 'index.html'), renderHub(ctx))
  for (const slug of slugs) {
    const parsed = parseSlug(slug)
    if (!parsed) fail(`Unparseable SEO slug: ${slug}`)
    writeFile(path.join('seo', slug, 'index.html'), renderPage(parsed, slug, ctx))
  }
  writeFile('_headers', cloudflareHeaders())
  fs.writeFileSync(
    path.join(root, '.static-build-manifest.json'),
    JSON.stringify(
      {
        slugs: slugs.length,
        origin: ctx.origin,
        basePath: ctx.basePath,
        trailingSlash: true,
        outDir,
      },
      null,
      2,
    ),
  )
  console.log(`Prerendered ${slugs.length} SEO pages into ${outDir}`)
}

let exitCode = 0
try {
  fs.rmSync(nextOut, { recursive: true, force: true })
  runNextBuild()
  if (!fs.existsSync(path.join(nextOut, 'index.html'))) {
    fail('Static export did not write out/index.html')
  }
  if (path.resolve(outDir) !== path.resolve(nextOut)) {
    fs.rmSync(outDir, { recursive: true, force: true })
    fs.renameSync(nextOut, outDir)
  }
  prerenderSeo()
} catch (error) {
  console.error(error instanceof Error ? error.message : error)
  exitCode = 1
}

if (exitCode === 0) {
  const verify = spawnSync(process.execPath, [path.join(root, 'scripts', 'verify-static.mjs')], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      STATIC_OUT_DIR: outDir,
      NEXT_PUBLIC_TRAILING_SLASH: '1',
    },
  })
  exitCode = verify.status || 0
}

process.exit(exitCode)

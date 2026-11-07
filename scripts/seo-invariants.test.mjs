import assert from 'node:assert/strict'
import test from 'node:test'
import {
  ANGLES,
  CHAINS,
  DEFAULT_SITE_URL,
  GOALS,
  createCtx,
  getAllSlugs,
  handleSeoRequest,
  parseSlug,
  renderSitemap,
} from '../lib/seo-content.mjs'

test('catalog slug count is the full chain, angle, and goal product', () => {
  const slugs = getAllSlugs()
  assert.equal(slugs.length, CHAINS.length * ANGLES.length * GOALS.length)
  assert.ok(slugs.length >= 5000)
  for (const slug of slugs) {
    assert.ok(parseSlug(slug), slug)
  }
})

test('dynamic SEO responses keep the current Vercel paths', () => {
  const sitemap = handleSeoRequest('http://localhost/api/seo?mode=sitemap', 'gymbite-site.vercel.app')
  assert.equal(sitemap.status, 200)
  assert.equal(sitemap.contentType, 'application/xml; charset=utf-8')
  assert.match(sitemap.body, /<loc>https:\/\/gymbite-site\.vercel\.app\/<\/loc>/)
  assert.match(sitemap.body, /<loc>https:\/\/gymbite-site\.vercel\.app\/seo<\/loc>/)
  const sample = getAllSlugs()[0]
  assert.match(sitemap.body, new RegExp(`<loc>https://gymbite-site\\.vercel\\.app/seo/${sample}</loc>`))
  assert.doesNotMatch(sitemap.body, new RegExp(`<loc>https://gymbite-site\\.vercel\\.app/seo/${sample}/</loc>`))

  const robots = handleSeoRequest('http://localhost/api/seo?mode=robots', 'localhost:3000')
  assert.match(robots.body, new RegExp(`Sitemap: ${DEFAULT_SITE_URL}/sitemap.xml`))

  const hub = handleSeoRequest('http://localhost/api/seo?slug=__hub__', 'gymbite-site.vercel.app')
  assert.equal(hub.status, 200)
  assert.match(hub.body, /Chipotle Mexican Grill/)
  assert.match(hub.body, /href="\/seo\/chipotle-/)

  const missing = handleSeoRequest('http://localhost/api/seo?slug=not-a-page', 'gymbite-site.vercel.app')
  assert.equal(missing.status, 404)
  assert.match(missing.body, /5,000/)

  const page = handleSeoRequest(`http://localhost/api/seo?slug=${sample}`, 'gymbite-site.vercel.app')
  assert.equal(page.status, 200)
  assert.match(page.body, /<link rel="canonical" href="https:\/\/gymbite-site\.vercel\.app\/seo\//)
  assert.match(page.body, /href="\/"/)
  assert.ok(page.body.includes(CHAINS[0].topOrder))
})

test('static hosting can prefix a project path and use directory URLs', () => {
  const ctx = createCtx('https://karwanatta.github.io', {
    origin: 'https://karwanatta.github.io',
    basePath: '/gymbite-site',
    trailingSlash: true,
  })
  const sample = getAllSlugs()[0]
  const xml = renderSitemap(ctx)
  assert.match(xml, new RegExp(`<loc>https://karwanatta\\.github\\.io/gymbite-site/seo/${sample}/</loc>`))
  assert.match(xml, /<loc>https:\/\/karwanatta\.github\.io\/gymbite-site\/<\/loc>/)
})

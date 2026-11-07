import { createHash } from 'node:crypto'
import { createServer } from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ANGLES, CHAINS, GOALS } from '../lib/seo-content.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.static-build-manifest.json'), 'utf8'))
const outDir = path.resolve(manifest.outDir)
const basePath = manifest.basePath || ''
const failures = []

function check(condition, message) {
  if (!condition) failures.push(message)
}

function sha256(file) {
  return createHash('sha256').update(fs.readFileSync(file)).digest('hex')
}

function expectedDefaultTarget() {
  const weightLb = 180
  const heightIn = 70
  const age = 28
  const weightKg = weightLb * 0.45359237
  const heightCm = heightIn * 2.54
  const baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5
  return Math.max(1200, Math.round(baseBmr * 1.55) - 500)
}

function contentType(file) {
  const ext = path.extname(file)
  const types = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.apk': 'application/vnd.android.package-archive',
    '.xml': 'application/xml; charset=utf-8',
    '.txt': 'text/plain; charset=utf-8',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
  }
  return types[ext] || 'application/octet-stream'
}

function resolveRequest(urlPath) {
  let pathname = decodeURIComponent(urlPath.split('?')[0])
  if (basePath) {
    if (pathname !== basePath && !pathname.startsWith(`${basePath}/`)) return null
    pathname = pathname.slice(basePath.length) || '/'
  }
  let rel = pathname.replace(/^\/+/, '')
  if (rel === '' || rel.endsWith('/')) rel += 'index.html'
  const file = path.resolve(outDir, rel)
  if (file !== outDir && !file.startsWith(`${outDir}${path.sep}`)) return null
  return file
}

function startServer() {
  const server = createServer((req, res) => {
    const file = resolveRequest(req.url || '/')
    if (!file || !fs.existsSync(file) || !fs.statSync(file).isFile()) {
      const missing = path.join(outDir, '404.html')
      const body = fs.existsSync(missing) ? fs.readFileSync(missing) : Buffer.from('missing')
      res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' })
      res.end(body)
      return
    }
    res.writeHead(200, { 'content-type': contentType(file) })
    res.end(fs.readFileSync(file))
  })
  return new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => resolve(server))
  })
}

const slug = `${CHAINS[0].slug}-${ANGLES[0].slug}-${GOALS[0].slug}`
const publicRoot = `${manifest.origin}${basePath}`
const homeFile = path.join(outDir, 'index.html')
const getFile = path.join(outDir, 'get', 'index.html')
const hubFile = path.join(outDir, 'seo', 'index.html')
const pageFile = path.join(outDir, 'seo', slug, 'index.html')
const apkFile = path.join(outDir, 'GymBite.apk')
const sourceApk = path.join(root, 'public', 'GymBite.apk')

check(fs.existsSync(homeFile), 'missing homepage')
check(fs.existsSync(getFile), 'missing /get page')
check(fs.existsSync(hubFile), 'missing SEO hub')
check(fs.existsSync(pageFile), 'missing sample SEO page')
check(fs.existsSync(path.join(outDir, '404.html')), 'missing 404.html')
check(fs.existsSync(apkFile), 'missing APK')
check(sha256(apkFile) === sha256(sourceApk), 'exported APK does not match public/GymBite.apk')
check(fs.statSync(apkFile).size > 5 * 1024 * 1024, 'APK is unexpectedly small')

const seoPages = fs.readdirSync(path.join(outDir, 'seo')).filter((name) => name !== 'index.html')
check(seoPages.length === manifest.slugs, `expected ${manifest.slugs} SEO directories, found ${seoPages.length}`)
check(
  manifest.slugs === CHAINS.length * ANGLES.length * GOALS.length,
  'manifest slug count drifted from the catalog',
)

const sitemap = fs.readFileSync(path.join(outDir, 'sitemap.xml'), 'utf8')
const locCount = sitemap.match(/<loc>/g)?.length || 0
check(locCount === manifest.slugs + 2, `sitemap has ${locCount} urls, expected ${manifest.slugs + 2}`)
check(sitemap.includes(`${publicRoot}/seo/${slug}/`), 'sitemap sample URL missing trailing slash or base path')
check(!sitemap.includes(`${publicRoot}/seo/${slug}</loc>`), 'sitemap sample URL dropped the directory slash')

const robots = fs.readFileSync(path.join(outDir, 'robots.txt'), 'utf8')
check(robots.includes(`Sitemap: ${publicRoot}/sitemap.xml`), 'robots.txt sitemap URL is wrong')
check(robots.includes('Allow: /'), 'robots.txt no longer allows crawling')

const headers = fs.readFileSync(path.join(outDir, '_headers'), 'utf8')
check(headers.includes('/GymBite.apk'), 'Cloudflare headers missing APK rule')
check(headers.includes('application/vnd.android.package-archive'), 'APK content type missing')

const server = await startServer()
const address = server.address()
const origin = `http://127.0.0.1:${address.port}`

async function get(urlPath) {
  const response = await fetch(`${origin}${urlPath}`)
  const body = Buffer.from(await response.arrayBuffer())
  return { status: response.status, type: response.headers.get('content-type') || '', body, text: body.toString('utf8') }
}

try {
  const home = await get(`${basePath}/`)
  const target = expectedDefaultTarget()
  check(home.status === 200, `homepage status ${home.status}`)
  check(home.text.includes('GymBite'), 'homepage missing GymBite')
  check(home.text.includes(String(target)), `homepage missing default target ${target}`)
  check(home.text.includes('Mifflin') || home.text.includes('MIFFLIN'), 'homepage missing calculator')
  check(home.text.includes('https://calorie-tracker-gamma-ivory.vercel.app'), 'web app link was removed')
  check(home.text.includes(`${basePath}/GymBite.apk`), 'homepage APK path is wrong')
  check(home.text.includes(`${basePath}/seo/`), 'homepage SEO path is wrong')
  check(home.text.includes(`${publicRoot}/`) || home.text.includes(publicRoot), 'homepage canonical origin is wrong')
  check(!home.text.includes('/_vercel/insights/script.js'), 'static host still requests Vercel-only analytics')

  const script = home.text.match(/src="([^"]+_next\/static\/[^"]+\.js)"/)
  check(Boolean(script), 'homepage has no Next static script')
  if (script) {
    const asset = await get(script[1])
    check(asset.status === 200, `script ${script[1]} returned ${asset.status}`)
    check(asset.type.includes('javascript'), `script content type ${asset.type}`)
  }

  const download = await get(`${basePath}/get/`)
  check(download.status === 200, `/get status ${download.status}`)
  check(download.text.includes('Download GymBite.apk'), 'download page missing APK button')
  check(download.text.includes('https://calorie-tracker-gamma-ivory.vercel.app/GymBite.apk'), 'APK mirror link removed')
  check(download.text.includes('com.gymbite.app'), 'application id removed from install page')

  const apk = await get(`${basePath}/GymBite.apk`)
  check(apk.status === 200, `APK status ${apk.status}`)
  check(apk.type.includes('vnd.android.package-archive'), `APK content type ${apk.type}`)
  check(apk.body.subarray(0, 2).toString() === 'PK', 'APK is not a zip archive')
  check(apk.body.length === fs.statSync(sourceApk).size, 'served APK length differs')

  const hub = await get(`${basePath}/seo/`)
  check(hub.status === 200, `SEO hub status ${hub.status}`)
  check(hub.text.includes('Chipotle Mexican Grill'), 'SEO hub missing a catalog entry')
  check(hub.text.includes(`${publicRoot}/seo/`), 'SEO hub canonical is wrong')

  const article = await get(`${basePath}/seo/${slug}/`)
  check(article.status === 200, `SEO article status ${article.status}`)
  check(article.text.includes(CHAINS[0].topOrder), 'SEO article missing the verified order')
  check(article.text.includes(`${publicRoot}/seo/${slug}/`), 'SEO article canonical is wrong')
  check(article.text.includes('application/ld+json'), 'SEO article missing structured data')

  const map = await get(`${basePath}/sitemap.xml`)
  check(map.status === 200, `sitemap status ${map.status}`)
  check(map.type.includes('xml'), `sitemap content type ${map.type}`)

  const missing = await get(`${basePath}/seo/not-a-real-guide/`)
  check(missing.status === 404, `unknown SEO slug status ${missing.status}`)
  check(missing.text.includes('Page not found'), 'unknown URL did not use the branded 404')

  const icon = await get(`${basePath}/icon.svg`)
  check(icon.status === 200, 'icon.svg was not exported')
} finally {
  await new Promise((resolve) => server.close(resolve))
}

if (failures.length) {
  console.error(`Static site verification failed (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Verified ${manifest.slugs} SEO pages, APK, calculator, and sitemap in ${outDir}`)

import { handleSeoRequest } from '../../../lib/seo-content.mjs'

const CACHE_CONTROL = 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'

export async function GET(request) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || ''
  const out = handleSeoRequest(request.url, host)
  return new Response(out.body, {
    status: out.status,
    headers: {
      'content-type': out.contentType,
      'cache-control': CACHE_CONTROL,
    },
  })
}

export default async function handler(req, res) {
  if (req instanceof Request && !res) {
    return GET(req)
  }
  const host = (req.headers && (req.headers['x-forwarded-host'] || req.headers.host)) || ''
  const out = handleSeoRequest(req.url || '/', String(host))
  if (res) {
    res.statusCode = out.status
    if (typeof res.setHeader === 'function') {
      res.setHeader('Content-Type', out.contentType)
      res.setHeader('Cache-Control', CACHE_CONTROL)
    }
    if (typeof res.end === 'function') {
      res.end(out.body)
    }
  }
}

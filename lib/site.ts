const DEFAULT_ORIGIN = 'https://gymbite-site.vercel.app'

export function siteOrigin(): string {
  return (process.env.SITE_URL || DEFAULT_ORIGIN).replace(/\/$/, '')
}

export function siteBasePath(): string {
  return (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '')
}

export function sitePublicRoot(): string {
  return `${siteOrigin()}${siteBasePath()}`
}

export function sitePageUrl(path: string): string {
  const root = sitePublicRoot()
  if (path === '/') return `${root}/`
  if (process.env.NEXT_PUBLIC_TRAILING_SLASH === '1') return `${root}${path}/`
  return `${root}${path}`
}

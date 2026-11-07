export function withBase(path: string, options?: { directory?: boolean }): string {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '')
  if (!path.startsWith('/')) return path
  if (path === '/') return base ? `${base}/` : '/'
  let result = `${base}${path}`
  if (
    options?.directory &&
    process.env.NEXT_PUBLIC_TRAILING_SLASH === '1' &&
    !result.endsWith('/')
  ) {
    result += '/'
  }
  return result
}

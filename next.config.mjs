const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || '').replace(/\/$/, '')
const staticExport = process.env.STATIC_EXPORT === '1'

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath || undefined,
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // The SEO route handler cannot be part of a static export. Limiting
  // page extensions for that build leaves app/api/seo/route.js in place for
  // the normal Next server build.
  pageExtensions: staticExport ? ['ts', 'tsx', 'mdx'] : ['ts', 'tsx', 'js', 'jsx', 'mdx'],
  ...(staticExport
    ? {
        output: 'export',
        trailingSlash: true,
      }
    : {}),
}

export default nextConfig

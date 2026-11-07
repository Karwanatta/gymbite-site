import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Page not found — GymBite',
  robots: { index: false, follow: true },
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased">
      <main className="mx-auto max-w-xl px-4 py-20">
        <p className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A6EBE]">404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">This GymBite page is not in the index.</h1>
        <p className="mt-3 text-sm text-[#475569]">
          The homepage calculator, Android APK, and nutrition directory are still available.
        </p>
        <div className="mt-6 flex flex-wrap gap-3 text-sm font-semibold">
          <Link href="/" className="rounded-lg bg-[#0f172a] px-4 py-2 text-white">
            Home
          </Link>
          <Link href="/get" className="rounded-lg border border-[#cbd5e1] bg-white px-4 py-2">
            Download APK
          </Link>
          <Link href="/seo" className="rounded-lg border border-[#cbd5e1] bg-white px-4 py-2">
            Nutrition index
          </Link>
        </div>
      </main>
    </div>
  )
}

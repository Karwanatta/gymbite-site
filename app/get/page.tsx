import type { Metadata } from "next"
import Link from "next/link"
import { sitePageUrl } from "@/lib/site"
import { withBase } from "@/lib/with-base"

export const metadata: Metadata = {
  title: "Download GymBite (Android APK, iOS & Web) — Free Calorie & Gym Tracker",
  description:
    "Download the signed GymBite Android APK (v1.4, 5.8 MB) with Health Connect sync or launch the GymBite Web & iOS PWA tracker.",
  alternates: {
    canonical: sitePageUrl("/get"),
  },
}

export default function GetGymBitePage() {
  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased" style={{ fontVariantNumeric: "tabular-nums" }}>
      <header className="border-b border-[#e2e8f0] bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-sm font-bold text-[#0A6EBE] hover:underline">
            ← Back to GymBite Overview &amp; TDEE Calculator
          </Link>
          <span className="rounded border border-[#a7f3d0] bg-[#ecfdf5] px-2.5 py-0.5 font-mono text-xs font-bold text-[#047857]">
            v1.4.2 · v1+v2+v3 Signed APK
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-4xl">
          Install GymBite on Android, iPhone &amp; Web
        </h1>
        <p className="mt-3 text-base text-[#475569]">
          Choose the native Android APK for two-way Health Connect synchronization, or launch the zero-install Web &amp; iOS Home Screen app.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Android APK Card */}
          <section className="flex flex-col justify-between rounded-xl border-2 border-[#0A6EBE] bg-white p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A6EBE]">
                  ANDROID NATIVE APK
                </span>
                <span className="font-mono text-xs text-[#64748b]">5.8 MB · API 26+</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-[#0f172a]">Direct APK Download</h2>
              <p className="mt-2 text-sm text-[#475569]">
                Includes native camera barcode &amp; meal plate scanning, plus Android Health Connect read/write integration for steps, sleep, active calories, weight, and workouts.
              </p>

              <div className="mt-5 space-y-2">
                <a
                  href={withBase("/GymBite.apk")}
                  download="GymBite.apk"
                  className="flex w-full items-center justify-center rounded-lg bg-[#0A6EBE] px-4 py-3 text-sm font-bold text-white hover:bg-[#085a9c]"
                >
                  Download GymBite.apk (5.8 MB)
                </a>
                <a
                  href="https://calorie-tracker-gamma-ivory.vercel.app/GymBite.apk"
                  className="flex w-full items-center justify-center rounded-lg border border-[#cbd5e1] bg-[#f8fafc] px-4 py-2 text-xs font-semibold text-[#334155] hover:bg-[#f1f5f9]"
                >
                  Mirror Download (Primary App Host)
                </a>
              </div>
            </div>

            <dl className="mt-6 divide-y divide-[#f1f5f9] border-t border-[#e2e8f0] pt-3 text-xs">
              <div className="flex justify-between py-1.5">
                <dt className="text-[#64748b]">Application ID</dt>
                <dd className="font-mono font-semibold text-[#0f172a]">com.gymbite.app</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-[#64748b]">Signature Schemes</dt>
                <dd className="font-mono font-semibold text-[#047857]">APK Signature v1 + v2 + v3</dd>
              </div>
              <div className="flex justify-between py-1.5">
                <dt className="text-[#64748b]">Android Compatibility</dt>
                <dd className="font-mono font-semibold text-[#0f172a]">Android 8.0 – Android 16</dd>
              </div>
            </dl>
          </section>

          {/* Web & iOS PWA Card */}
          <section className="flex flex-col justify-between rounded-xl border border-[#cbd5e1] bg-white p-6 shadow-sm">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#334155]">
                  WEB &amp; iOS PWA
                </span>
                <span className="font-mono text-xs text-[#64748b]">Instant Launch</span>
              </div>
              <h2 className="mt-2 text-xl font-bold text-[#0f172a]">Launch in Browser or iPhone</h2>
              <p className="mt-2 text-sm text-[#475569]">
                Full feature parity in any desktop or mobile browser with offline IndexedDB persistence, 1-tap protein &amp; hydration presets, and OpenFoodFacts barcode lookup.
              </p>

              <div className="mt-5">
                <a
                  href="https://calorie-tracker-gamma-ivory.vercel.app"
                  className="flex w-full items-center justify-center rounded-lg bg-[#0f172a] px-4 py-3 text-sm font-bold text-white hover:bg-[#1e293b]"
                >
                  Open GymBite Web App →
                </a>
              </div>
            </div>

            <div className="mt-6 border-t border-[#e2e8f0] pt-4 text-xs text-[#475569]">
              <strong className="text-[#0f172a]">iOS Home Screen Setup (Safari):</strong>
              <ol className="mt-2 list-decimal space-y-1.5 pl-4">
                <li>Open the GymBite Web App in Safari on your iPhone.</li>
                <li>Tap the <strong>Share</strong> button in the Safari toolbar.</li>
                <li>Tap <strong>Add to Home Screen</strong> for full-screen standalone mode.</li>
              </ol>
            </div>
          </section>
        </div>

        <div className="mt-8 flex flex-wrap gap-4 text-xs font-semibold text-[#475569]">
          <Link href="/" className="hover:text-[#0f172a]">
            ← Home &amp; TDEE Calculator
          </Link>
          <span>·</span>
          <a href={withBase("/seo", { directory: true })} className="hover:text-[#0f172a]">
            5,000+ Nutrition &amp; Restaurant Macro Guides
          </a>
          <span>·</span>
          <a href="https://calorie-tracker-gamma-ivory.vercel.app/privacy" className="hover:text-[#0f172a]">
            Privacy Policy
          </a>
        </div>
      </main>
    </div>
  )
}

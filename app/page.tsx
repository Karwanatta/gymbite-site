"use client"

import { useMemo, useState } from "react"
import Link from "next/link"

type GoalMode = "cut" | "recomp" | "maintain" | "bulk"
type Sex = "male" | "female"

type RestaurantOrder = {
  id: string
  chain: string
  item: string
  calories: number
  protein: number
  carbs: number
  fat: number
  notes: string
}

const RESTAURANT_ORDERS: RestaurantOrder[] = [
  {
    id: "chipotle-double",
    chain: "Chipotle",
    item: "Double Chicken Bowl (Light Rice, Black Beans, Fajita Veggies, Fresh Tomato Salsa)",
    calories: 710,
    protein: 68,
    carbs: 62,
    fat: 20,
    notes: "9.6g protein per 100 kcal · Skip sour cream/queso to save 230 kcal",
  },
  {
    id: "cfa-nuggets-12",
    chain: "Chick-fil-A",
    item: "12 ct Grilled Nuggets + Kale Crunch Side",
    calories: 370,
    protein: 42,
    carbs: 21,
    fat: 13.5,
    notes: "11.4g protein per 100 kcal · Highest protein density on menu",
  },
  {
    id: "cava-harissa-bowl",
    chain: "CAVA",
    item: "Double Grilled Chicken Greens & Grains Bowl (Tzatziki, Crazy Feta, Hummus)",
    calories: 695,
    protein: 64,
    carbs: 51,
    fat: 26,
    notes: "9.2g protein per 100 kcal · High fiber & potassium",
  },
  {
    id: "mcd-double-qp",
    chain: "McDonald's",
    item: "Double Quarter Pounder with Cheese (No Mayo/Pickles + Diet Soda)",
    calories: 740,
    protein: 48,
    carbs: 43,
    fat: 42,
    notes: "6.5g protein per 100 kcal · Remove top bun to drop 110 kcal & 21g carbs",
  },
  {
    id: "panda-teriyaki",
    chain: "Panda Express",
    item: "Double Grilled Teriyaki Chicken + Super Greens (No Sauce Packet)",
    calories: 630,
    protein: 78,
    carbs: 24,
    fat: 26,
    notes: "12.4g protein per 100 kcal · Best post-workout fast-casual macro profile",
  },
  {
    id: "sweetgreen-harvest",
    chain: "Sweetgreen",
    item: "Harvest Bowl + Extra Roasted Chicken (Light Balsamic Vinaigrette)",
    calories: 760,
    protein: 56,
    carbs: 58,
    fat: 34,
    notes: "7.4g protein per 100 kcal · Complex carbs from sweet potato & wild rice",
  },
  {
    id: "sbux-wrap",
    chain: "Starbucks",
    item: "Spinach, Feta & Egg White Wrap + Cold Brew with Splash of Nonfat Milk",
    calories: 305,
    protein: 22,
    carbs: 36,
    fat: 8,
    notes: "7.2g protein per 100 kcal · Portable morning cut option",
  },
  {
    id: "subway-rotisserie",
    chain: "Subway",
    item: "6-Inch Double Rotisserie Chicken on Multigrain (All Veggies, Mustard)",
    calories: 470,
    protein: 46,
    carbs: 42,
    fat: 12,
    notes: "9.8g protein per 100 kcal · Lean whole-breast meat",
  },
]

const ACTIVITY_LEVELS = [
  { id: "1.2", label: "Sedentary (Desk job, <5k steps)", mult: 1.2 },
  { id: "1.375", label: "Lightly Active (Lifting 2–3x/wk, 7k steps)", mult: 1.375 },
  { id: "1.55", label: "Moderately Active (Lifting 4–5x/wk, 9k steps)", mult: 1.55 },
  { id: "1.725", label: "Very Active (Hard training 6x/wk, 12k+ steps)", mult: 1.725 },
]

export default function HomePage() {
  const [sex, setSex] = useState<Sex>("male")
  const [age, setAge] = useState<number>(28)
  const [weightLb, setWeightLb] = useState<number>(180)
  const [heightIn, setHeightIn] = useState<number>(70)
  const [activityMult, setActivityMult] = useState<number>(1.55)
  const [goalMode, setGoalMode] = useState<GoalMode>("cut")
  const [selectedChain, setSelectedChain] = useState<string>("All")

  const calc = useMemo(() => {
    const weightKg = weightLb * 0.45359237
    const heightCm = heightIn * 2.54
    const baseBmr = 10 * weightKg + 6.25 * heightCm - 5 * age + (sex === "male" ? 5 : -161)
    const bmr = Math.round(baseBmr)
    const tdee = Math.round(baseBmr * activityMult)

    const delta =
      goalMode === "cut" ? -500 : goalMode === "recomp" ? -200 : goalMode === "bulk" ? 250 : 0
    const targetCalories = Math.max(1200, tdee + delta)

    const proteinPerLb = goalMode === "cut" || goalMode === "recomp" ? 1.0 : 0.9
    const proteinG = Math.round(weightLb * proteinPerLb)
    const fatG = Math.max(45, Math.round((targetCalories * 0.25) / 9))
    const remainingKcal = Math.max(0, targetCalories - proteinG * 4 - fatG * 9)
    const carbsG = Math.round(remainingKcal / 4)
    const waterLiters = Math.round(weightKg * 0.035 * 10) / 10
    const waterOz = Math.round((waterLiters * 1000) / 29.5735)

    return {
      bmr,
      tdee,
      targetCalories,
      proteinG,
      carbsG,
      fatG,
      waterLiters,
      waterOz,
      proteinPct: Math.round(((proteinG * 4) / targetCalories) * 100),
      carbsPct: Math.round(((carbsG * 4) / targetCalories) * 100),
      fatPct: Math.round(((fatG * 9) / targetCalories) * 100),
    }
  }, [sex, age, weightLb, heightIn, activityMult, goalMode])

  const chains = useMemo(
    () => ["All", ...Array.from(new Set(RESTAURANT_ORDERS.map((r) => r.chain)))],
    [],
  )

  const filteredOrders = useMemo(
    () =>
      selectedChain === "All"
        ? RESTAURANT_ORDERS
        : RESTAURANT_ORDERS.filter((r) => r.chain === selectedChain),
    [selectedChain],
  )

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased" style={{ fontVariantNumeric: "tabular-nums" }}>
      {/* Top Bar */}
      <header className="sticky top-0 z-30 border-b border-[#e2e8f0] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0f172a] font-mono text-sm font-bold text-white">
              GB
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-[#0f172a]">GymBite</span>
              <span className="ml-2 rounded border border-[#cbd5e1] bg-[#f1f5f9] px-1.5 py-0.5 font-mono text-[11px] font-semibold text-[#334155]">
                v1.4 PROD
              </span>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm font-medium text-[#475569] md:flex">
            <a href="#calculator" className="hover:text-[#0f172a]">
              TDEE &amp; Macro Calculator
            </a>
            <a href="#restaurants" className="hover:text-[#0f172a]">
              Restaurant Macros
            </a>
            <a href="/seo" className="hover:text-[#0f172a]">
              5,000+ Nutrition Index
            </a>
            <Link href="/get" className="hover:text-[#0f172a]">
              Android APK &amp; iOS
            </Link>
          </nav>

          <div className="flex items-center gap-2.5">
            <Link
              href="/get"
              className="rounded-lg border border-[#cbd5e1] bg-white px-3.5 py-2 text-xs font-semibold text-[#0f172a] hover:bg-[#f1f5f9]"
            >
              Get APK (5.8 MB)
            </Link>
            <a
              href="https://calorie-tracker-gamma-ivory.vercel.app"
              className="rounded-lg bg-[#0A6EBE] px-3.5 py-2 text-xs font-semibold text-white hover:bg-[#085a9c]"
            >
              Launch Web App →
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 sm:pt-14">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded border border-[#cbd5e1] bg-white px-2.5 py-1 font-mono text-xs font-semibold uppercase tracking-wider text-[#334155]">
              <span className="h-2 w-2 rounded-full bg-[#10b981]" />
              Zero Subscription Paywall · Local-First SQLite/IDB · Health Connect
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-[#0f172a] sm:text-5xl sm:leading-[1.08]">
              Precision Calorie, Macro &amp; Hypertrophy Telemetry.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#475569] sm:text-lg">
              Built for lifters who want MacroFactor-grade speed without a $79/year paywall. Scan whole plates with Gemini Flash, search OpenFoodFacts UPC barcodes and 5,000+ restaurant orders, log protein &amp; hydration in one tap, and track progressive overload sets offline.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://calorie-tracker-gamma-ivory.vercel.app"
                className="inline-flex items-center justify-center rounded-lg bg-[#0f172a] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1e293b]"
              >
                Open Live Tracker (Web / iOS)
              </a>
              <a
                href="/GymBite.apk"
                download="GymBite.apk"
                className="inline-flex items-center justify-center rounded-lg border border-[#0A6EBE] bg-[#eff6ff] px-5 py-3 text-sm font-semibold text-[#0A6EBE] hover:bg-[#dbeafe]"
              >
                Download Android APK (v1.4 · 5.8 MB)
              </a>
              <Link
                href="/get"
                className="inline-flex items-center justify-center rounded-lg border border-[#cbd5e1] bg-white px-4 py-3 text-sm font-semibold text-[#334155] hover:bg-[#f8fafc]"
              >
                Install Guide &amp; SHA Specs
              </Link>
            </div>

            {/* Key Engineering & Nutrition Specs */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-3.5">
                <div className="font-mono text-xs font-semibold uppercase text-[#64748b]">FOOD INDEX</div>
                <div className="mt-1 text-xl font-bold text-[#0f172a]">5,002+</div>
                <div className="text-xs text-[#475569]">Restaurant &amp; TDEE guides</div>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-3.5">
                <div className="font-mono text-xs font-semibold uppercase text-[#64748b]">BARCODE DB</div>
                <div className="mt-1 text-xl font-bold text-[#0f172a]">OpenFoodFacts</div>
                <div className="text-xs text-[#475569]">Live UPC + verified local</div>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-3.5">
                <div className="font-mono text-xs font-semibold uppercase text-[#64748b]">QUICK LOG</div>
                <div className="mt-1 text-xl font-bold text-[#0f172a]">1-Tap</div>
                <div className="text-xs text-[#475569]">Whey, chicken &amp; hydration</div>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-white p-3.5">
                <div className="font-mono text-xs font-semibold uppercase text-[#64748b]">PRIVACY</div>
                <div className="mt-1 text-xl font-bold text-[#0f172a]">100% Local</div>
                <div className="text-xs text-[#475569]">On-device storage + JSON export</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Telemetry Preview Card */}
          <div className=" rounded-xl border border-[#cbd5e1] bg-white p-5 shadow-sm lg:col-span-5">
            <div className="flex items-center justify-between border-b border-[#e2e8f0] pb-3">
              <div>
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#64748b]">
                  DAILY TELEMETRY SNAPSHOT
                </span>
                <h2 className="text-base font-bold text-[#0f172a]">Active Cut · Day 42 (14d Streak)</h2>
              </div>
              <span className="rounded bg-[#ecfdf5] px-2 py-0.5 font-mono text-xs font-bold text-[#047857]">
                ON TARGET
              </span>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2.5 text-center">
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-2.5">
                <div className="font-mono text-[10px] font-bold uppercase text-[#64748b]">CONSUMED</div>
                <div className="mt-0.5 text-lg font-extrabold text-[#0f172a]">1,640</div>
                <div className="text-[11px] text-[#64748b]">of 2,150 kcal</div>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-2.5">
                <div className="font-mono text-[10px] font-bold uppercase text-[#64748b]">REMAINING</div>
                <div className="mt-0.5 text-lg font-extrabold text-[#0A6EBE]">510</div>
                <div className="text-[11px] text-[#64748b]">kcal budget</div>
              </div>
              <div className="rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-2.5">
                <div className="font-mono text-[10px] font-bold uppercase text-[#64748b]">HYDRATION</div>
                <div className="mt-0.5 text-lg font-extrabold text-[#0284c7]">2.50 L</div>
                <div className="text-[11px] text-[#64748b]">85 oz / 2.8 L</div>
              </div>
            </div>

            {/* Macro Progress Bars */}
            <div className="mt-4 space-y-2.5">
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Protein (Target 180g · 33%)</span>
                  <span className="font-mono">154 / 180 g</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#ffe4e6]">
                  <div className="h-full w-[86%] bg-[#e11d48]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Carbohydrates (Target 210g · 39%)</span>
                  <span className="font-mono">148 / 210 g</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#fef3c7]">
                  <div className="h-full w-[70%] bg-[#d97706]" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold">
                  <span>Dietary Fat (Target 65g · 28%)</span>
                  <span className="font-mono">46 / 65 g</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-[#d1fae5]">
                  <div className="h-full w-[71%] bg-[#059669]" />
                </div>
              </div>
            </div>

            {/* Sample Logged Entries */}
            <div className="mt-4 border-t border-[#e2e8f0] pt-3">
              <div className="font-mono text-[11px] font-bold uppercase text-[#64748b]">RECENT LOGGED ITEMS</div>
              <ul className="mt-2 divide-y divide-[#f1f5f9] text-xs">
                <li className="flex items-center justify-between py-1.5">
                  <div>
                    <strong className="text-[#0f172a]">Chipotle Double Chicken Bowl</strong>
                    <div className="text-[#64748b]">P 68g · C 62g · F 20g · Verified Restaurant</div>
                  </div>
                  <span className="font-mono font-bold text-[#0f172a]">710 kcal</span>
                </li>
                <li className="flex items-center justify-between py-1.5">
                  <div>
                    <strong className="text-[#0f172a]">Fairlife Core Power Elite 42g</strong>
                    <div className="text-[#64748b]">P 42g · C 8g · F 3.5g · UPC 0811620022149</div>
                  </div>
                  <span className="font-mono font-bold text-[#0f172a]">230 kcal</span>
                </li>
                <li className="flex items-center justify-between py-1.5">
                  <div>
                    <strong className="text-[#0f172a]">3 Large Whole Eggs + Sourdough</strong>
                    <div className="text-[#64748b]">P 24g · C 28g · F 15g · AI Plate Scan</div>
                  </div>
                  <span className="font-mono font-bold text-[#0f172a]">345 kcal</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive TDEE & Macro Calculator */}
        <section id="calculator" className="mt-14 rounded-xl border border-[#cbd5e1] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#0A6EBE]">
                MIFFLIN–ST JEOR ENGINE
              </span>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                Interactive TDEE, Protein &amp; Hydration Calculator
              </h2>
            </div>
            <a
              href="https://calorie-tracker-gamma-ivory.vercel.app"
              className="rounded-lg bg-[#0f172a] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1e293b]"
            >
              Load These Targets in GymBite →
            </a>
          </div>

          <div className="mt-6 grid gap-8 lg:grid-cols-12">
            {/* Inputs */}
            <div className="space-y-4 lg:col-span-6">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-[#475569]">Biological Sex</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setSex("male")}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                        sex === "male"
                          ? "border-[#0f172a] bg-[#0f172a] text-white"
                          : "border-[#cbd5e1] bg-[#f8fafc] text-[#334155]"
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setSex("female")}
                      className={`rounded-lg border px-3 py-2 text-xs font-bold ${
                        sex === "female"
                          ? "border-[#0f172a] bg-[#0f172a] text-white"
                          : "border-[#cbd5e1] bg-[#f8fafc] text-[#334155]"
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div>
                  <label htmlFor="calc-age" className="block text-xs font-bold uppercase text-[#475569]">
                    Age (Years): <span className="font-mono text-[#0f172a]">{age}</span>
                  </label>
                  <input
                    id="calc-age"
                    type="range"
                    min={16}
                    max={75}
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="mt-2.5 w-full accent-[#0A6EBE]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="calc-weight" className="block text-xs font-bold uppercase text-[#475569]">
                    Body Weight: <span className="font-mono text-[#0f172a]">{weightLb} lb ({Math.round(weightLb * 0.4536)} kg)</span>
                  </label>
                  <input
                    id="calc-weight"
                    type="range"
                    min={95}
                    max={320}
                    value={weightLb}
                    onChange={(e) => setWeightLb(Number(e.target.value))}
                    className="mt-2 w-full accent-[#0A6EBE]"
                  />
                </div>

                <div>
                  <label htmlFor="calc-height" className="block text-xs font-bold uppercase text-[#475569]">
                    Height: <span className="font-mono text-[#0f172a]">{Math.floor(heightIn / 12)}&apos;{heightIn % 12}&quot; ({Math.round(heightIn * 2.54)} cm)</span>
                  </label>
                  <input
                    id="calc-height"
                    type="range"
                    min={58}
                    max={80}
                    value={heightIn}
                    onChange={(e) => setHeightIn(Number(e.target.value))}
                    className="mt-2 w-full accent-[#0A6EBE]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="calc-activity" className="block text-xs font-bold uppercase text-[#475569]">
                  Training &amp; Step Activity Multiplier
                </label>
                <select
                  id="calc-activity"
                  value={String(activityMult)}
                  onChange={(e) => setActivityMult(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-[#cbd5e1] bg-white px-3 py-2.5 text-sm font-medium text-[#0f172a]"
                >
                  {ACTIVITY_LEVELS.map((lvl) => (
                    <option key={lvl.id} value={lvl.id}>
                      {lvl.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#475569]">Phase Goal</label>
                <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {(
                    [
                      { id: "cut", label: "Fat Loss (-500)" },
                      { id: "recomp", label: "Recomp (-200)" },
                      { id: "maintain", label: "Maintenance" },
                      { id: "bulk", label: "Lean Bulk (+250)" },
                    ] as const
                  ).map((g) => (
                    <button
                      key={g.id}
                      type="button"
                      onClick={() => setGoalMode(g.id)}
                      className={`rounded-lg border px-2.5 py-2 text-xs font-bold ${
                        goalMode === g.id
                          ? "border-[#0A6EBE] bg-[#0A6EBE] text-white"
                          : "border-[#cbd5e1] bg-[#f8fafc] text-[#334155]"
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Output Telemetry */}
            <div className="rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-5 lg:col-span-6">
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="font-mono text-[11px] font-bold text-[#64748b]">RESTING BMR</div>
                  <div className="mt-1 text-xl font-extrabold text-[#0f172a]">{calc.bmr} kcal</div>
                </div>
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="font-mono text-[11px] font-bold text-[#64748b]">MAINTENANCE TDEE</div>
                  <div className="mt-1 text-xl font-extrabold text-[#0f172a]">{calc.tdee} kcal</div>
                </div>
                <div className="rounded-lg border border-[#0A6EBE] bg-[#eff6ff] p-3">
                  <div className="font-mono text-[11px] font-bold text-[#0A6EBE]">DAILY TARGET</div>
                  <div className="mt-1 text-xl font-extrabold text-[#0A6EBE]">{calc.targetCalories} kcal</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="text-xs font-semibold text-[#e11d48]">Protein ({calc.proteinPct}%)</div>
                  <div className="mt-0.5 text-lg font-extrabold text-[#0f172a]">{calc.proteinG}g</div>
                  <div className="text-[11px] text-[#64748b]">{calc.proteinG * 4} kcal</div>
                </div>
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="text-xs font-semibold text-[#d97706]">Carbs ({calc.carbsPct}%)</div>
                  <div className="mt-0.5 text-lg font-extrabold text-[#0f172a]">{calc.carbsG}g</div>
                  <div className="text-[11px] text-[#64748b]">{calc.carbsG * 4} kcal</div>
                </div>
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="text-xs font-semibold text-[#059669]">Fats ({calc.fatPct}%)</div>
                  <div className="mt-0.5 text-lg font-extrabold text-[#0f172a]">{calc.fatG}g</div>
                  <div className="text-[11px] text-[#64748b]">{calc.fatG * 9} kcal</div>
                </div>
                <div className="rounded-lg border border-[#e2e8f0] bg-white p-3">
                  <div className="text-xs font-semibold text-[#0284c7]">Hydration</div>
                  <div className="mt-0.5 text-lg font-extrabold text-[#0f172a]">{calc.waterLiters} L</div>
                  <div className="text-[11px] text-[#64748b]">{calc.waterOz} fl oz / day</div>
                </div>
              </div>

              <p className="mt-4 text-xs text-[#475569]">
                <strong>Macro rationale:</strong> Protein is anchored at {goalMode === "cut" || goalMode === "recomp" ? "1.0g" : "0.9g"} per lb of body weight to preserve lean muscle mass, dietary fat is set at 25% of total calories for hormone support, and remaining energy is allocated to carbohydrates to fuel training volume.
              </p>
            </div>
          </div>
        </section>

        {/* High-Protein Restaurant Macro Matcher */}
        <section id="restaurants" className="mt-12 rounded-xl border border-[#cbd5e1] bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e2e8f0] pb-4">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#047857]">
                VERIFIED CHAIN NUTRITION
              </span>
              <h2 className="text-2xl font-bold text-[#0f172a]">
                High-Protein Fast-Casual Orders vs. Your {calc.proteinG}g Target
              </h2>
            </div>
            <a href="/seo" className="text-xs font-bold text-[#0A6EBE] hover:underline">
              Browse All 5,000+ Restaurant &amp; Food Pages →
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {chains.map((chain) => (
              <button
                key={chain}
                type="button"
                onClick={() => setSelectedChain(chain)}
                className={`rounded-full border px-3 py-1.5 text-xs font-bold ${
                  selectedChain === chain
                    ? "border-[#0f172a] bg-[#0f172a] text-white"
                    : "border-[#cbd5e1] bg-[#f8fafc] text-[#334155] hover:bg-[#f1f5f9]"
                }`}
              >
                {chain}
              </button>
            ))}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {filteredOrders.map((order) => {
              const pctOfDailyProtein = Math.min(100, Math.round((order.protein / Math.max(1, calc.proteinG)) * 100))
              return (
                <div key={order.id} className="flex flex-col justify-between rounded-lg border border-[#e2e8f0] bg-[#f8fafc] p-4">
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="rounded bg-[#fef3c7] px-2 py-0.5 font-mono text-[11px] font-bold uppercase text-[#92400e]">
                        {order.chain}
                      </span>
                      <span className="font-mono text-xs font-bold text-[#047857]">
                        Covers {pctOfDailyProtein}% of your daily protein
                      </span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-[#0f172a]">{order.item}</h3>
                    <p className="mt-1 text-xs text-[#64748b]">{order.notes}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[#e2e8f0] pt-2.5 font-mono text-xs">
                    <span>
                      <strong className="text-[#0f172a]">{order.calories} kcal</strong> · P {order.protein}g · C {order.carbs}g · F {order.fat}g
                    </span>
                    <a
                      href="https://calorie-tracker-gamma-ivory.vercel.app"
                      className="font-sans font-bold text-[#0A6EBE] hover:underline"
                    >
                      Log in App →
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </main>

      <footer className="border-t border-[#e2e8f0] bg-white py-8 text-xs text-[#64748b]">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <div>
            <strong className="text-[#0f172a]">GymBite</strong> · Precision Calorie, Macro &amp; Hypertrophy Tracker
          </div>
          <div className="flex flex-wrap gap-5 font-medium">
            <a href="https://calorie-tracker-gamma-ivory.vercel.app" className="hover:text-[#0f172a]">
              Launch Web App
            </a>
            <Link href="/get" className="hover:text-[#0f172a]">
              Download Android APK (/get)
            </Link>
            <a href="/GymBite.apk" className="hover:text-[#0f172a]">
              Direct GymBite.apk
            </a>
            <a href="/seo" className="hover:text-[#0f172a]">
              Nutrition &amp; TDEE Directory (/seo)
            </a>
            <a href="/sitemap.xml" className="hover:text-[#0f172a]">
              Sitemap
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

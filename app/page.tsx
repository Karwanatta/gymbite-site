import {
  ArrowUpRight,
  Camera,
  Check,
  Dumbbell,
  Flame,
  HeartPulse,
  Menu,
  ScanLine,
  Sparkles,
} from 'lucide-react'

const appUrl = 'https://calorie-tracker-gamma-ivory.vercel.app'
const testersUrl = 'https://groups.google.com/g/gymbite-testers'
const playUrl = 'https://play.google.com/apps/testing/com.konegroup.gymbite'

export default function Page() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#f7faff] text-[#10254a]">
      <section className="relative isolate">
        <div className="absolute inset-x-0 top-0 -z-10 h-[680px] bg-[radial-gradient(circle_at_78%_12%,rgba(73,137,255,0.2),transparent_34%),linear-gradient(180deg,#eaf3ff_0%,#f7faff_78%)]" />
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 lg:px-8">
          <a href="#top" className="flex items-center gap-2.5 font-semibold tracking-tight" aria-label="GymBite home">
            <span className="grid size-9 place-items-center rounded-xl bg-[#1769ff] text-white shadow-[0_7px_18px_rgba(23,105,255,0.28)]">
              <HeartPulse size={19} strokeWidth={2.5} />
            </span>
            <span className="text-[17px]">GymBite</span>
          </a>
          <a href={appUrl} target="_blank" rel="noreferrer" className="hidden items-center gap-1.5 text-sm font-semibold text-[#1769ff] transition-colors hover:text-[#0b4fc7] sm:flex">
            Open the app <ArrowUpRight size={16} />
          </a>
          <span className="grid size-9 place-items-center rounded-full border border-[#cfe0fb] bg-white/70 sm:hidden" aria-hidden="true"><Menu size={18} /></span>
        </nav>

        <div id="top" className="mx-auto grid w-full max-w-6xl items-center gap-16 px-6 pb-20 pt-12 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:pb-28 lg:pt-20">
          <div className="max-w-xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#cfe0fb] bg-white/70 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#1769ff] shadow-sm">
              <Sparkles size={14} /> A simpler way to get fit
            </div>
            <h1 className="text-balance text-5xl font-semibold leading-[1.04] tracking-[-0.055em] text-[#10254a] sm:text-6xl lg:text-[76px]">Fitness starts with one <span className="text-[#1769ff]">bite.</span></h1>
            <p className="mt-7 max-w-lg text-pretty text-lg leading-8 text-[#526987]">GymBite is a simple, free fitness app that turns your meals and movement into a clear daily plan.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={appUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1769ff] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,105,255,0.25)] transition-transform hover:-translate-y-0.5">See GymBite <ArrowUpRight size={17} /></a>
              <a href="#how-it-works" className="inline-flex items-center justify-center rounded-full border border-[#c7daf7] bg-white/70 px-6 py-3.5 text-sm font-semibold text-[#24518f] transition-colors hover:bg-white">How it works</a>
            </div>
            <p className="mt-5 text-xs leading-5 text-[#7185a3]">Free to use · Built for beginners and students</p>
          </div>

          <div className="relative mx-auto w-full max-w-[440px] lg:mr-3">
            <div className="absolute -left-5 top-16 hidden rounded-2xl border border-[#d5e4fa] bg-white p-3.5 shadow-[0_14px_36px_rgba(31,75,133,0.12)] sm:block">
              <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold text-[#6880a2]"><span className="size-2 rounded-full bg-[#45c889]" /> Daily progress</div>
              <div className="flex items-end gap-1"><span className="text-xl font-semibold text-[#10254a]">On track</span><Check size={16} className="mb-1 text-[#45c889]" /></div>
            </div>
            <div className="relative rounded-[2.3rem] border-[8px] border-[#17345e] bg-white p-3 shadow-[0_24px_60px_rgba(31,75,133,0.2)]">
              <div className="rounded-[1.7rem] bg-[#f3f7fd] px-5 pb-7 pt-4">
                <div className="mx-auto mb-5 h-1.5 w-16 rounded-full bg-[#d5e2f5]" />
                <div className="flex items-center justify-between"><div><p className="text-xs font-medium text-[#7b8da8]">Good morning</p><p className="mt-1 text-xl font-semibold text-[#10254a]">Your day, at a glance</p></div><div className="grid size-9 place-items-center rounded-full bg-[#dbeaff] text-[#1769ff]"><Dumbbell size={17} /></div></div>
                <div className="mt-5 rounded-2xl bg-[#1769ff] p-4 text-white shadow-[0_10px_22px_rgba(23,105,255,0.2)]"><div className="flex items-center justify-between"><span className="text-xs font-medium text-blue-100">Daily progress</span><ScanLine size={17} /></div><div className="mt-5 h-2 rounded-full bg-blue-300/50"><div className="h-2 w-3/5 rounded-full bg-white" /></div><div className="mt-2 flex justify-between text-[10px] text-blue-100"><span>Meals logged</span><span>Keep going</span></div></div>
                <div className="mt-4 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-[#e0e9f7] bg-white p-4"><div className="mb-4 grid size-8 place-items-center rounded-xl bg-[#fff2d8] text-[#dd9111]"><Flame size={16} /></div><p className="text-xs text-[#7b8da8]">Calories</p><p className="mt-1 text-base font-semibold">Track as you go</p></div><div className="rounded-2xl border border-[#e0e9f7] bg-white p-4"><div className="mb-4 grid size-8 place-items-center rounded-xl bg-[#e1f8ee] text-[#2da970]"><HeartPulse size={16} /></div><p className="text-xs text-[#7b8da8]">Protein</p><p className="mt-1 text-base font-semibold">Know your intake</p></div></div>
                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-[#a7c6f4] bg-[#eaf3ff] p-4"><div className="grid size-10 place-items-center rounded-xl bg-white text-[#1769ff]"><Camera size={18} /></div><div><p className="text-sm font-semibold">Snap your next meal</p><p className="mt-0.5 text-xs text-[#6880a2]">AI does the counting</p></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-10 border-t border-[#dbe7f7] pt-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#1769ff]">How it works</p><h2 className="mt-4 max-w-sm text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#10254a]">Less guessing. More doing.</h2></div>
          <div className="grid gap-8 sm:grid-cols-3"><Step number="01" icon={<Camera size={19} />} title="Snap a meal" text="Take a photo of what you are eating." /><Step number="02" icon={<ScanLine size={19} />} title="AI counts" text="Get calorie and protein guidance from your meal." /><Step number="03" icon={<Dumbbell size={19} />} title="Keep moving" text="Track daily progress and follow your workouts." /></div>
        </div>
      </section>

      <section className="bg-[#10254a] text-white"><div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 lg:flex-row lg:items-end lg:justify-between lg:px-8 lg:py-20"><div><p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#83b5ff]">Why GymBite</p><h2 className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">Getting fit should feel possible.</h2><p className="mt-5 max-w-xl leading-7 text-[#b7c8e3]">GymBite makes fitness easier to start for beginners and students—without paying for a trainer or a pricey app.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href={testersUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#10254a] hover:bg-[#e5efff]">Join Android testers <ArrowUpRight size={16} /></a><a href={playUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#5e7da8] px-5 py-3 text-sm font-semibold text-white hover:bg-white/10">Google Play testing <ArrowUpRight size={16} /></a></div></div></section>

      <footer className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-[#7185a3] sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>GymBite · A project by <span className="font-semibold text-[#24518f]">Karwan Atta</span></p><a href={appUrl} target="_blank" rel="noreferrer" className="font-semibold text-[#1769ff] hover:underline">calorie-tracker-gamma-ivory.vercel.app <ArrowUpRight className="ml-1 inline" size={14} /></a></footer>
    </main>
  )
}

function Step({ number, icon, title, text }: { number: string; icon: React.ReactNode; title: string; text: string }) {
  return <div><div className="flex items-center justify-between border-b border-[#dbe7f7] pb-4 text-[#1769ff]"><span className="grid size-9 place-items-center rounded-xl bg-[#eaf3ff]">{icon}</span><span className="text-xs font-semibold tracking-[0.14em] text-[#9aacc5]">{number}</span></div><h3 className="mt-5 text-lg font-semibold text-[#10254a]">{title}</h3><p className="mt-2 text-sm leading-6 text-[#7185a3]">{text}</p></div>
}

export const dynamic = 'force-static'


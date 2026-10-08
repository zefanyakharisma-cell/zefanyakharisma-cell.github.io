import type { LucideIcon } from 'lucide-react'

/** Illustration of an app's midnight sidebar (SidebarNav style), paired with menu descriptions. */
export function MenuRail({ app, items }: { app: string; items: { name: string; desc: string; icon: LucideIcon }[] }) {
  return (
    <div className="flex flex-wrap gap-8 items-stretch">
      <div
        role="img"
        aria-label={`Illustration of the ${app} sidebar menu`}
        className="flex-[0_1_280px] min-w-[240px] bg-midnight rounded-panel py-6 px-3.5 flex flex-col gap-1"
      >
        <span className="pcu-eyebrow text-amber px-3.5 pb-3">{app}</span>
        {items.map((m, i) => (
          <span
            key={m.name}
            className={`flex items-center gap-3 min-h-[40px] px-3.5 rounded-md text-white text-[.9375rem] ${i === 0 ? 'bg-white/[.14] font-semibold' : ''}`}
          >
            <m.icon aria-hidden size={20} strokeWidth={1.75} className="flex-none" />
            {m.name}
          </span>
        ))}
      </div>
      <dl className="flex-[999_1_520px] min-w-0 m-0 grid-2 !gap-x-8 !gap-y-0 content-start">
        {items.map(m => (
          <div key={m.name} className="py-4 border-b border-[#d5dbe2]">
            <dt className="font-bold">{m.name}</dt>
            <dd className="muted m-0 mt-1">{m.desc}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

import type { LucideIcon } from 'lucide-react'
import { IconBadge } from './IconBadge'

export type Step = { icon: LucideIcon; title: string; text: string }

/** Numbered process list: index, icon badge, title and description. */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  return (
    <ol className="m-0 p-0 list-none grid-2 !gap-x-12 !gap-y-0">
      {steps.map((s, i) => (
        <li key={s.title} className="grid grid-cols-[48px_1fr] gap-5 py-7 border-t border-line">
          <IconBadge icon={s.icon} size={48} />
          <div>
            <span className="pcu-eyebrow text-accent-strong">Step {String(i + 1).padStart(2, '0')}</span>
            <h3 className="!text-xl mt-1">{s.title}</h3>
            <p className="muted m-0 mt-2">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  )
}

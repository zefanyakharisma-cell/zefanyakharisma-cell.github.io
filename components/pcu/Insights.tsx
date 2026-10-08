import { Lightbulb } from 'lucide-react'
import { Rich } from './Rich'

/** Numbered analysis notes on a midnight panel. */
export function Insights({ title, items }: { title: string; items: { text: string }[] }) {
  return (
    <div className="pcu-card pcu-card--midnight">
      <div className="flex items-center gap-3 mb-5">
        <Lightbulb aria-hidden size={20} className="text-amber" />
        <h3 className="text-white !text-xl">{title}</h3>
      </div>
      <ol className="m-0 p-0 list-none flex flex-col gap-4">
        {items.map((a, i) => (
          <li key={i} className="grid grid-cols-[28px_1fr] gap-3">
            <span className="font-bold text-amber tabular-nums">{String(i + 1).padStart(2, '0')}</span>
            <p className="m-0 text-smoke [&_strong]:text-white">
              <Rich text={a.text} />
            </p>
          </li>
        ))}
      </ol>
    </div>
  )
}

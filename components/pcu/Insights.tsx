import { Lightbulb } from 'lucide-react'
import { Details } from './Details'
import { Rich } from './Rich'

function Item({ n, text }: { n: number; text: string }) {
  return (
    <li className="grid grid-cols-[28px_1fr] gap-3">
      <span className="font-bold text-amber tabular-nums">{String(n).padStart(2, '0')}</span>
      <p className="m-0 text-smoke [&_strong]:text-white">
        <Rich text={text} />
      </p>
    </li>
  )
}

/** Numbered analysis notes on a midnight panel. The headline note shows; the rest sit in a drawer. */
export function Insights({ title, items, shown = 1 }: { title: string; items: { text: string }[]; shown?: number }) {
  const rest = items.slice(shown)
  return (
    <div className="pcu-card pcu-card--midnight">
      <div className="flex items-center gap-3 mb-5">
        <Lightbulb aria-hidden size={20} className="text-amber" />
        <h3 className="text-white !text-xl">{title}</h3>
      </div>
      <ol className="m-0 p-0 list-none flex flex-col gap-4">
        {items.slice(0, shown).map((a, i) => <Item key={i} n={i + 1} text={a.text} />)}
      </ol>
      {rest.length > 0 && (
        <Details light summary={`${rest.length} more`} className="mt-4">
          <ol className="m-0 p-0 list-none flex flex-col gap-4">
            {rest.map((a, i) => <Item key={i} n={i + 1 + shown} text={a.text} />)}
          </ol>
        </Details>
      )}
    </div>
  )
}

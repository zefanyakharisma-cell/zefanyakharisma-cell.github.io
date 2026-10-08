import { cn } from '@/lib/utils'
import { SINGLE } from '@/lib/chart'

export type Bar = { label: React.ReactNode; value: number; display?: string; color?: string; key?: string }

/** Horizontal labelled bars. Values are printed, so colour never carries meaning alone. */
export function BarList({ bars, max, className, caption }: { bars: Bar[]; max?: number; className?: string; caption?: string }) {
  const top = max ?? Math.max(...bars.map(b => b.value), 1)
  return (
    <figure className={cn('m-0', className)}>
      {caption && <figcaption className="sr-only">{caption}</figcaption>}
      <ul className="m-0 p-0 list-none flex flex-col gap-3.5">
        {bars.map((b, i) => (
          <li key={b.key ?? i}>
            <div className="flex justify-between gap-4 text-[.9375rem]">
              <span className="min-w-0">{b.label}</span>
              <b className="tabular-nums">{b.display ?? b.value}</b>
            </div>
            <div className="bar-track mt-1.5">
              <div className="bar-fill" style={{ width: `${Math.max((b.value / top) * 100, 2)}%`, background: b.color ?? SINGLE }} />
            </div>
          </li>
        ))}
      </ul>
    </figure>
  )
}

import { seriesColor } from '@/lib/chart'

export type Segment = { label: string; value: number; display?: string }

/** One 100% bar split into categories, with a legend that prints every value. */
export function StackedBar({ segments, caption }: { segments: Segment[]; caption: string }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1
  return (
    <figure className="m-0 flex flex-col gap-4">
      <figcaption className="sr-only">{caption}</figcaption>
      <div className="flex h-4 w-full overflow-hidden rounded-pill gap-[2px]" aria-hidden="true">
        {segments.map((s, i) => (
          <div key={s.label} style={{ width: `${(s.value / total) * 100}%`, background: seriesColor(i) }} title={`${s.label}: ${s.display ?? s.value}`} />
        ))}
      </div>
      <ul className="m-0 p-0 list-none grid gap-2">
        {segments.map((s, i) => (
          <li key={s.label} className="flex items-center gap-2.5 text-sm">
            <span className="legend-dot" style={{ background: seriesColor(i) }} />
            <span className="flex-1 min-w-0">{s.label}</span>
            <span className="tabular-nums font-semibold">{s.display ?? s.value}</span>
            <span className="tabular-nums text-ink-muted w-12 text-right">{Math.round((s.value / total) * 100)}%</span>
          </li>
        ))}
      </ul>
    </figure>
  )
}

import { ArrowRight } from 'lucide-react'

/** The status sequence a record moves through, plus states off the main path. */
export function StatusFlow({ main, side, sideLabel = 'Side states', label }: { main: string[]; side?: string[]; sideLabel?: string; label: string }) {
  return (
    <div className="flex flex-wrap items-center gap-x-2 gap-y-3" aria-label={label}>
      <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-2">
        {main.map((s, i) => (
          <li key={s} className="flex items-center gap-2">
            <span className={`font-mono text-xs rounded-sm px-2 py-1.5 ${i === main.length - 1 ? 'bg-midnight text-white' : 'bg-[#e8f0fa] text-accent-strong'}`}>{s}</span>
            {i < main.length - 1 && <ArrowRight aria-hidden size={14} className="text-ink-muted" />}
          </li>
        ))}
      </ol>
      {side && side.length > 0 && (
        <span className="flex flex-wrap items-center gap-2 sm:ml-4">
          <span className="text-xs text-ink-muted">{sideLabel}</span>
          {side.map(s => <span key={s} className="font-mono text-xs rounded-sm px-2 py-1.5 border border-dashed border-accent-pending text-accent-pending">{s}</span>)}
        </span>
      )}
    </div>
  )
}

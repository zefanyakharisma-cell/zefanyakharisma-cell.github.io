'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { ChevronDown, type LucideIcon } from 'lucide-react'

/** A toolbar button that opens a small panel of options; closes on outside click or Escape. */
export function ToolbarMenu({ title, icon: Icon, active, children }: {
  title: string
  icon: LucideIcon
  active?: boolean
  children: (close: () => void) => ReactNode
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false) }
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <div className="admin-menu" ref={ref}>
      <button
        type="button" title={title} aria-label={title} aria-haspopup="true" aria-expanded={open} aria-pressed={active ?? false}
        onMouseDown={e => e.preventDefault()} onClick={() => setOpen(o => !o)}
      >
        <Icon aria-hidden size={18} /><ChevronDown aria-hidden size={12} />
      </button>
      {open && <div className="admin-menu__panel" role="group" aria-label={title}>{children(() => setOpen(false))}</div>}
    </div>
  )
}

/** Hover-to-size grid for inserting a table. */
export function TableSizePicker({ onPick }: { onPick: (rows: number, cols: number) => void }) {
  const [size, setSize] = useState({ rows: 3, cols: 3 })
  return (
    <div className="admin-gridpick">
      <div className="admin-gridpick__grid" onMouseLeave={() => setSize({ rows: 3, cols: 3 })}>
        {Array.from({ length: 8 * 8 }, (_, i) => {
          const rows = Math.floor(i / 8) + 1
          const cols = (i % 8) + 1
          const on = rows <= size.rows && cols <= size.cols
          return (
            <button
              key={i} type="button" aria-label={`${rows} rows by ${cols} columns`} className={on ? 'on' : undefined}
              onMouseEnter={() => setSize({ rows, cols })} onFocus={() => setSize({ rows, cols })}
              onMouseDown={e => e.preventDefault()} onClick={() => onPick(rows, cols)}
            />
          )
        })}
      </div>
      <span aria-live="polite">{size.rows} × {size.cols} table</span>
    </div>
  )
}

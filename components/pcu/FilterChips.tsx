'use client'

/** Multi-select filter chips. An empty selection means "all". */
export function FilterChips({ options, value, onChange, label }: {
  options: string[]
  value: string[]
  onChange: (next: string[]) => void
  label: string
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      <button type="button" aria-pressed={value.length === 0} onClick={() => onChange([])}>All</button>
      {options.map(o => (
        <button
          key={o}
          type="button"
          aria-pressed={value.includes(o)}
          onClick={() => onChange(value.includes(o) ? value.filter(v => v !== o) : [...value, o])}
        >
          {o}
        </button>
      ))}
    </div>
  )
}

'use client'

/** Pill segmented control (batch picker). Buttons expose aria-pressed. */
export function Segmented<T extends string>({ options, value, onChange, label }: {
  options: { key: T; label: string }[]
  value: T
  onChange: (key: T) => void
  label: string
}) {
  return (
    <div className="seg" role="group" aria-label={label}>
      {options.map(o => (
        <button key={o.key} type="button" aria-pressed={o.key === value} onClick={() => onChange(o.key)}>
          {o.label}
        </button>
      ))}
    </div>
  )
}

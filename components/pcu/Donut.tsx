import { SINGLE } from '@/lib/chart'

/** Ring gauge for a single score out of a maximum (e.g. satisfaction 4.6 / 5). */
export function Donut({ value, max, label, size = 96 }: { value: number; max: number; label: string; size?: number }) {
  const r = 34
  const c = 2 * Math.PI * r
  const pct = Math.min(value / max, 1)
  return (
    <figure className="m-0 flex flex-col items-center gap-2 text-center">
      <svg viewBox="0 0 80 80" width={size} height={size} role="img" aria-label={`${label}: ${value} out of ${max}`}>
        <circle cx="40" cy="40" r={r} fill="none" stroke="#f1f1f1" strokeWidth="8" />
        <circle
          cx="40" cy="40" r={r} fill="none" stroke={SINGLE} strokeWidth="8" strokeLinecap="round"
          strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 40 40)"
        />
        <text x="40" y="45" textAnchor="middle" fontSize="16" fontWeight="700" fill={SINGLE}>{value}</text>
      </svg>
      <figcaption className="text-sm text-ink-secondary leading-snug max-w-[16ch]">{label}</figcaption>
    </figure>
  )
}

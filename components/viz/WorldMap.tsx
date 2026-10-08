'use client'

import type { WorldMapData } from '@/lib/geo'
import { Tooltip, useTooltip } from './useTooltip'

// Sequential ramp on the brand's midnight hue: lightness only, light → dark.
const RAMP = ['#cfdcec', '#9db8d8', '#6a91bf', '#3d6aa0', '#19304b']

function shade(value: number, max: number) {
  const t = Math.log(value + 1) / Math.log(max + 1)
  return RAMP[Math.min(RAMP.length - 1, Math.floor(t * RAMP.length))]
}

type Props = {
  map: WorldMapData
  /** Unit for tooltips and the summary, e.g. "partners" or "students". */
  unit: string
  label: string
  selected?: string | null
  onSelect?: (country: string | null) => void
  className?: string
}

/** Choropleth world map. Countries with data are focusable; small ones are dots. */
export function WorldMap({ map, unit, label, selected, onSelect, className }: Props) {
  const { ref, tip, show, hide } = useTooltip()
  const max = map.countries[0]?.value ?? 1
  const total = map.countries.reduce((s, c) => s + c.value, 0)

  const interactive = (name: string, value: number) => ({
    tabIndex: 0,
    role: onSelect ? 'button' : 'img',
    'aria-label': `${name}: ${value} ${unit}`,
    'aria-pressed': onSelect ? selected === name : undefined,
    onPointerMove: (e: React.PointerEvent) => show(e, name, `${value} ${unit}`),
    onPointerLeave: hide,
    onFocus: (e: React.FocusEvent<SVGElement>) => show(e.currentTarget.getBoundingClientRect(), name, `${value} ${unit}`),
    onBlur: hide,
    onClick: onSelect ? () => onSelect(selected === name ? null : name) : undefined,
    onKeyDown: onSelect
      ? (e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(selected === name ? null : name) } }
      : undefined,
    className: `outline-none transition-opacity focus-visible:stroke-amber focus-visible:[stroke-width:2] ${onSelect ? 'cursor-pointer' : ''} ${selected && selected !== name ? 'opacity-40' : ''}`,
  })

  return (
    <figure className={`m-0 ${className ?? ''}`}>
      <div ref={ref} className="relative">
        <svg viewBox={`0 0 ${map.width} ${map.height}`} className="block w-full h-auto" role="group" aria-label={label}>
          <path d={map.base} fill="#e2e5e9" stroke="#ffffff" strokeWidth={0.5} />
          {map.countries.filter(c => c.d).map(c => (
            <path key={c.name} d={c.d!} fill={shade(c.value, max)} stroke="#ffffff" strokeWidth={0.6} {...interactive(c.name, c.value)} />
          ))}
          {map.countries.filter(c => !c.d).map(c => (
            <circle key={c.name} cx={c.cx} cy={c.cy} r={5} fill={shade(c.value, max)} stroke="#ffffff" strokeWidth={1.5} {...interactive(c.name, c.value)} />
          ))}
        </svg>
        <Tooltip tip={tip} />
      </div>
      <figcaption className="flex flex-wrap items-center justify-between gap-3 mt-3 text-sm text-ink-secondary">
        <span>{map.countries.length} countries · {total} {unit}</span>
        <span className="flex items-center gap-1.5" aria-hidden>
          Fewer
          {RAMP.map(c => <span key={c} className="inline-block w-5 h-2.5 rounded-sm" style={{ background: c }} />)}
          More
        </span>
      </figcaption>
    </figure>
  )
}

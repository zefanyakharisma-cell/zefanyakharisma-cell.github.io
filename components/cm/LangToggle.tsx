'use client'

import { CM_LOCALES, type CMLocale } from '@/lib/cm/i18n'

const GOLD = '#D4B15A'
const MIDNIGHT = '#071126'

// Compact EN/ID segmented switch. Inline-styled so it sits cleanly on the
// celestial dark/gold chrome shared across every CroissantsMoon surface.
export function LangToggle({
  locale,
  onChange,
  compact = false,
}: {
  locale: CMLocale
  onChange: (l: CMLocale) => void
  compact?: boolean
}) {
  return (
    <div
      role="group"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        padding: 2,
        borderRadius: 999,
        border: '1px solid rgba(212,177,90,0.3)',
        background: 'rgba(212,177,90,0.06)',
      }}
    >
      {CM_LOCALES.map((l) => {
        const active = l === locale
        return (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            style={{
              font: 'inherit',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.06em',
              lineHeight: 1,
              padding: compact ? '4px 8px' : '5px 11px',
              borderRadius: 999,
              border: 'none',
              cursor: 'pointer',
              background: active ? GOLD : 'transparent',
              color: active ? MIDNIGHT : 'rgba(212,177,90,0.85)',
              transition: 'background .2s ease, color .2s ease',
            }}
          >
            {l.toUpperCase()}
          </button>
        )
      })}
    </div>
  )
}

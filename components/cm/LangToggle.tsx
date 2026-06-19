'use client'

import { useRouter } from 'next/navigation'
import { CM_LOCALES, type CMLocale } from '@/lib/cm/i18n'

const GOLD = '#D4B15A'
const MIDNIGHT = '#071126'

// Compact EN/ID segmented switch, used in two modes:
//
//  • Stateful (proposal portal / gate / print / editor) — pass `onChange`. The
//    locale is component state; clicking just swaps the rendered copy in place.
//    Proposals are a single URL, so no navigation happens.
//
//  • Routed (public landing) — omit `onChange`. Each option is a real <a> to
//    /croissantsmoon/{locale} so both languages stay crawlable and give a
//    reciprocal hreflang target. Clicking persists the explicit choice in the
//    cm_locale cookie (honoured by the bare /croissantsmoon redirect) and
//    navigates client-side without resetting scroll, preserving the reader's place.
//
// Inline-styled to sit cleanly on the shared celestial dark/gold chrome.
export function LangToggle({
  locale,
  onChange,
  compact = false,
}: {
  locale: CMLocale
  onChange?: (l: CMLocale) => void
  compact?: boolean
}) {
  const router = useRouter()

  const itemStyle = (active: boolean): React.CSSProperties => ({
    font: 'inherit',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: '0.06em',
    lineHeight: 1,
    padding: compact ? '4px 8px' : '5px 11px',
    borderRadius: 999,
    border: 'none',
    textDecoration: 'none',
    cursor: 'pointer',
    background: active ? GOLD : 'transparent',
    color: active ? MIDNIGHT : 'rgba(212,177,90,0.85)',
    transition: 'background .2s ease, color .2s ease',
  })

  function goRouted(e: React.MouseEvent, l: CMLocale) {
    if (l === locale) return
    e.preventDefault()
    document.cookie = `cm_locale=${l}; path=/; max-age=31536000; samesite=lax`
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    router.push(`/croissantsmoon/${l}${hash}`, { scroll: false })
  }

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
        return onChange ? (
          <button
            key={l}
            type="button"
            onClick={() => onChange(l)}
            aria-pressed={active}
            style={itemStyle(active)}
          >
            {l.toUpperCase()}
          </button>
        ) : (
          <a
            key={l}
            href={`/croissantsmoon/${l}`}
            hrefLang={l}
            onClick={(e) => goRouted(e, l)}
            aria-current={active ? 'true' : undefined}
            style={itemStyle(active)}
          >
            {l.toUpperCase()}
          </a>
        )
      })}
    </div>
  )
}

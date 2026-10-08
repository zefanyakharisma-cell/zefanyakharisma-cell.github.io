import { countryCode } from '@/lib/data/countries'
import { cn } from '@/lib/utils'

/** A country flag (flag-icons, self-hosted SVG). Renders nothing for unknown countries. */
export function Flag({ country, code, className }: { country?: string; code?: string; className?: string }) {
  const c = (code ?? (country ? countryCode(country) : null))?.toLowerCase()
  if (!c) return null
  return <span aria-hidden className={cn('fi', `fi-${c}`, 'pcu-flag', className)} />
}

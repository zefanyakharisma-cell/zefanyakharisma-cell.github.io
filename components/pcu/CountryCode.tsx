import { countryCode } from '@/lib/data/countries'
import { Flag } from './Flag'

/** Country label with its flag; falls back to an ISO code chip, then to the name alone. */
export function CountryCode({ country, showName = true }: { country: string; showName?: boolean }) {
  const code = countryCode(country)
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      {code && <Flag code={code} />}
      {showName ? <span className="truncate">{country}</span> : <span className={code ? 'sr-only' : ''}>{country}</span>}
    </span>
  )
}

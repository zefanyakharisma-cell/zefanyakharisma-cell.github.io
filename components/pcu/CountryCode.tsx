import { countryCode } from '@/lib/data/countries'

/** Country label with an ISO code chip, used instead of emoji flags. */
export function CountryCode({ country, showName = true }: { country: string; showName?: boolean }) {
  const code = countryCode(country)
  return (
    <span className="inline-flex items-center gap-2 min-w-0">
      {code && (
        <span className="pcu-tag pcu-tag--outline !text-[.6875rem] !px-1.5 !py-0.5 tabular-nums" aria-hidden={showName || undefined}>
          {code}
        </span>
      )}
      {showName ? <span className="truncate">{country}</span> : !code && <span>{country}</span>}
    </span>
  )
}

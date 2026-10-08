'use client'

import { useState } from 'react'
import { MapPin, Search, X } from 'lucide-react'
import { CountryCode, Flag, SectionHead, Tag } from '@/components/pcu'
import { InstitutionLogo } from '@/components/pcu/InstitutionLogo'
import { Segmented } from '@/components/pcu/Segmented'

import { CONT_BTNS, CONTINENT, DOM_DATA, INTL_DATA, PAGE_SIZE, TYPE_BTNS } from '@/lib/data/partners'

type Tab = 'intl' | 'dom'

type Props = {
  /** Set by a map click: show only this country (international) or city (domestic). */
  country?: string | null
  city?: string | null
  onClear?: () => void
  /** Render without the section wrapper and heading (when embedded). */
  bare?: boolean
}

export default function PartnerDirectory({ country, city, onClear, bare }: Props) {
  const [tabState, setTab] = useState<Tab>('intl')
  const tab: Tab = country ? 'intl' : city ? 'dom' : tabState
  const [intlContinent, setIntlCont] = useState('all')
  const [domType, setDomType] = useState('all')
  const [intlSearch, setIntlSearch] = useState('')
  const [domSearch, setDomSearch] = useState('')
  const [intlShowing, setIntlShowing] = useState(PAGE_SIZE)
  const [domShowing, setDomShowing] = useState(PAGE_SIZE)

  const intlQ = intlSearch.trim().toLowerCase()
  const domQ = domSearch.trim().toLowerCase()

  const filteredIntl = intlQ
    ? INTL_DATA.filter(p => p.name.toLowerCase().includes(intlQ) || p.country.toLowerCase().includes(intlQ))
    : country ? INTL_DATA.filter(p => p.country === country)
    : intlContinent !== 'all' ? INTL_DATA.filter(p => CONTINENT[p.country] === intlContinent) : INTL_DATA

  const filteredDom = domQ
    ? DOM_DATA.filter(p => [p.name, p.city, p.type].some(t => t.toLowerCase().includes(domQ)))
    : city ? DOM_DATA.filter(p => p.city === city)
    : domType !== 'all' ? DOM_DATA.filter(p => p.type === domType) : DOM_DATA

  const isIntl = tab === 'intl'
  const search = isIntl ? intlSearch : domSearch
  const query = isIntl ? intlQ : domQ
  const total = isIntl ? filteredIntl.length : filteredDom.length
  const showing = isIntl ? intlShowing : domShowing

  const body = (
    <>

        <div className="tabs mb-8" role="tablist" aria-label="Partner type">
          {([['intl', 'International', INTL_DATA.length], ['dom', 'Domestic', DOM_DATA.length]] as const).map(([key, label, count]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => { setTab(key); onClear?.() }}
              className={`px-4 min-h-[44px] -mb-px border-0 border-b-2 bg-transparent cursor-pointer text-[.9375rem] ${tab === key ? 'border-midnight text-midnight font-semibold' : 'border-transparent text-ink-secondary font-medium'}`}
            >
              {label} <span className="ml-1 text-sm tabular-nums">{count}</span>
            </button>
          ))}
        </div>

        {(country || city) && (
          <p className="flex flex-wrap items-center gap-3 m-0 mb-5">
            <span className="text-sm muted">Filtered by map:</span>
            <button type="button" onClick={onClear} className="pcu-tag !text-sm !px-3 !py-1.5 border-0 cursor-pointer">
              {country ?? city} <X aria-hidden size={14} className="inline -mt-0.5" /><span className="sr-only"> (clear filter)</span>
            </button>
          </p>
        )}

        <div role="tabpanel">
          <label className="sr-only" htmlFor="partner-search">{isIntl ? 'Search institutions or countries' : 'Search partners, cities or types'}</label>
          <div className="flex items-center gap-2 bg-white border border-line rounded-pill px-5 min-h-[48px] mb-5 focus-within:outline focus-within:outline-[3px] focus-within:outline-amber focus-within:outline-offset-2">
            <Search aria-hidden size={18} className="text-ink-muted flex-none" />
            <input
              id="partner-search"
              type="search"
              value={search}
              onChange={e => {
                if (isIntl) { setIntlSearch(e.target.value); setIntlShowing(PAGE_SIZE) }
                else { setDomSearch(e.target.value); setDomShowing(PAGE_SIZE) }
              }}
              placeholder={isIntl ? 'Search institutions or countries…' : 'Search partners, cities or types…'}
              className="flex-1 min-w-0 bg-transparent border-0 outline-none text-[.9375rem] text-midnight placeholder:text-ink-muted py-2"
            />
          </div>

          <div className={query ? 'opacity-50' : ''}>
            {isIntl ? (
              <Segmented label="Filter by region" options={CONT_BTNS} value={intlContinent} onChange={k => { setIntlCont(k); setIntlShowing(PAGE_SIZE) }} />
            ) : (
              <Segmented label="Filter by partner type" options={TYPE_BTNS} value={domType} onChange={k => { setDomType(k); setDomShowing(PAGE_SIZE) }} />
            )}
          </div>

          <p className="text-sm muted mt-5 mb-4" aria-live="polite">
            {query
              ? `${total} result${total !== 1 ? 's' : ''} for "${search.trim()}" across all ${isIntl ? 'regions' : 'types'}`
              : `Showing ${Math.min(showing, total)} of ${total} ${isIntl ? 'institutions' : 'partners'}`}
          </p>

          <ul className="m-0 p-0 list-none grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-6">
            {isIntl
              ? filteredIntl.slice(0, intlShowing).map(p => (
                  <li key={`${p.name}-${p.country}`} className="bg-white border border-line rounded-md p-4 flex gap-3 items-start">
                    <InstitutionLogo name={p.name} size={40} />
                    <span className="flex flex-col gap-2 min-w-0">
                      <span className="font-medium leading-snug">{p.name}</span>
                      <span className="text-sm text-ink-secondary"><CountryCode country={p.country} /></span>
                    </span>
                  </li>
                ))
              : filteredDom.slice(0, domShowing).map(p => (
                  <li key={`${p.name}-${p.city}`} className="bg-white border border-line rounded-md p-4 flex gap-3 items-start">
                    <InstitutionLogo name={p.name} size={40} />
                    <span className="flex flex-col gap-2 min-w-0">
                      <span className="font-medium leading-snug">{p.name}</span>
                      <span className="flex flex-wrap items-center gap-2 text-sm text-ink-secondary">
                        <Flag code="ID" /> <MapPin aria-hidden size={14} /> {p.city}
                        <Tag outline className="text-midnight">{p.type}</Tag>
                      </span>
                    </span>
                  </li>
                ))}
          </ul>
          {total === 0 && <p className="text-center muted py-8">No {isIntl ? 'institutions' : 'partners'} found.</p>}

          {!query && total > showing && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => (isIntl ? setIntlShowing(s => s + PAGE_SIZE) : setDomShowing(s => s + PAGE_SIZE))}
                className="pcu-btn pcu-btn--outline text-midnight"
              >
                Load more ({total - showing} remaining)
              </button>
            </div>
          )}
        </div>
    </>
  )

  if (bare) return body
  return (
    <section className="section section--smoke">
      <div className="wrap">
        <SectionHead eyebrow="Directory" title="Browse every partner" />
        {body}
      </div>
    </section>
  )
}

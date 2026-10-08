'use client'

import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { ALL_VENDORS, DATA, TABS, type AllSat, type Sat } from '@/lib/data/aci'
import { BarList, CountryCode, Donut, SectionHead, StackedBar, Stat, Tag } from '@/components/pcu'
import { Insights } from '@/components/pcu/Insights'
import { Segmented } from '@/components/pcu/Segmented'
import { SERIES } from '@/lib/chart'

const BATCHES = ['b1_2024', 'b1_2025', 'b21_2025', 'b22_2025'] as const

function idr(n: number): string {
  if (n >= 1_000_000) return 'IDR ' + (n / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M'
  if (n >= 1_000) return 'IDR ' + Math.round(n / 1_000) + 'K'
  return 'IDR ' + n.toLocaleString('id-ID')
}

export default function AciStats() {
  const [active, setActive] = useState('all')
  const d = DATA[active]
  const isAll = active === 'all'
  const sat = d.satisfaction

  return (
    <section className="section section--smoke">
      <div className="wrap">
        <SectionHead
          eyebrow="Data & analytics"
          title="Program statistics"
          lead={
            isAll
              ? '4 batches · Malang, Solo, Mojokerto'
              : `${d.label} · ${d.sublabel} · ${d.period}`
          }
        />

        <div className="mb-8">
          <Segmented label="Choose a batch" options={TABS} value={active} onChange={setActive} />
        </div>

        {isAll ? (
          <div className="grid-4 !gap-4 mb-12">
            {BATCHES.map(k => {
              const b = DATA[k]
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setActive(k)}
                  className="pcu-card text-left cursor-pointer border-0 flex flex-col gap-1 hover:-translate-y-px transition-transform motion-reduce:transition-none"
                >
                  <span className="text-[2.5rem] font-bold leading-none tracking-[-0.02em]">{b.participants}</span>
                  <span className="font-semibold mt-2">{b.label}</span>
                  <span className="text-sm">{b.sublabel}</span>
                  <span className="text-sm muted">{b.period}</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="grid-4 !gap-8 mb-12">
            <Stat value={d.participants} label="Participants" />
            <Stat value={d.location?.split(',')[0] ?? '—'} label={d.location ?? 'Destination'} />
            <Stat value={d.nationalities.filter(n => !/other/i.test(n.country)).length} label="Nationalities recorded" />
            <Stat value={idr(d.budgetTotal)} label="Total spent" />
          </div>
        )}

        {/* Vendors & activities */}
        <div className="grid-2 !gap-12 items-start mb-12">
          <div className="pcu-card">
            <h3 className="!text-xl mb-4">{isAll ? 'Vendors across all batches' : 'Vendors'}</h3>
            <ul className="m-0 p-0 list-none flex flex-col">
              {(isAll ? ALL_VENDORS : d.vendors ?? []).map(v => (
                <li key={`${v.name}-${v.batch ?? ''}`} className="py-2.5 border-t border-line first:border-t-0 first:pt-0">
                  <details className="group">
                    <summary className="flex flex-wrap items-center gap-2 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                      <Tag outline className="text-midnight">{v.category}</Tag>
                      <b>{v.name}</b>
                      {isAll && v.batch && <span className="text-sm text-ink-muted">· {v.batch}</span>}
                      <ChevronDown aria-hidden size={16} className="ml-auto text-accent-strong transition-transform group-open:rotate-180 motion-reduce:transition-none" />
                    </summary>
                    <p className="muted text-sm m-0 mt-1.5">{v.desc}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-8">
            {!isAll && d.activities && (
              <div className="pcu-card">
                <h3 className="!text-xl mb-4">Key activities</h3>
                <ol className="m-0 pl-5 flex flex-col gap-2.5 marker:text-accent-strong marker:font-bold">
                  {d.activities.map(a => <li key={a}>{a}</li>)}
                </ol>
              </div>
            )}

            <div className="pcu-card">
              <h3 className="!text-xl mb-4">Budget analysis</h3>
              <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-6">
                <div><p className="m-0 text-2xl font-bold">{idr(d.budgetTotal)}</p><p className="m-0 text-sm muted">Total spent</p></div>
                {d.budgetAlloc ? (
                  <>
                    <div><p className="m-0 text-2xl font-bold">{idr(d.budgetAlloc)}</p><p className="m-0 text-sm muted">Allocated</p></div>
                    <div>
                      <p className="m-0 text-2xl font-bold text-emerald">{((1 - d.budgetTotal / d.budgetAlloc) * 100).toFixed(0)}% under</p>
                      <p className="m-0 text-sm muted">Budget efficiency</p>
                    </div>
                  </>
                ) : null}
                {d.participants ? (
                  <div><p className="m-0 text-2xl font-bold">{idr(Math.round(d.budgetTotal / d.participants))}</p><p className="m-0 text-sm muted">Per participant</p></div>
                ) : null}
              </div>
              <StackedBar
                caption={`Budget by category, ${d.label}`}
                segments={d.budgetCategories.map(c => ({ label: c.name, value: c.amount, display: idr(c.amount) }))}
              />
              {d.budgetNote && <p className="text-sm muted mt-4 mb-0">{d.budgetNote}</p>}
              {isAll && d.budgetBatches && (
                <>
                  <h4 className="font-semibold mt-6 mb-3">By batch</h4>
                  <BarList
                    caption="Spending by batch"
                    bars={d.budgetBatches.map(b => ({
                      key: b.label,
                      label: b.label,
                      value: b.spent,
                      display: b.budget ? `${idr(b.spent)} of ${idr(b.budget)}` : idr(b.spent),
                    }))}
                  />
                </>
              )}
            </div>
          </div>
        </div>

        {/* Demographics */}
        <div className="grid-2 !gap-12 items-start mb-12">
          <div className="pcu-card">
            <h3 className="!text-xl mb-1">Nationalities</h3>
            <p className="muted text-sm mt-0 mb-5">{d.natNote ?? `${d.nationalities.length} countries`}</p>
            <BarList
              caption={`Participants by nationality, ${d.label}`}
              bars={d.nationalities.map(n => ({
                key: n.country,
                label: <CountryCode country={n.country} />,
                value: n.count,
                display: d.participants ? `${n.count} · ${Math.round((n.count / d.participants) * 100)}%` : String(n.count),
              }))}
            />
          </div>

          <div className="flex flex-col gap-8">
            <div className="pcu-card">
              <h3 className="!text-xl mb-5">Enrolled programs</h3>
              <BarList
                caption={`Participants by program, ${d.label}`}
                bars={d.programs.map(p => ({ key: p.name, label: p.name, value: p.count, color: SERIES[0] }))}
              />
            </div>

            <div className="pcu-card">
              <h3 className="!text-xl mb-4">Gender distribution</h3>
              {d.gender ? (
                <>
                  <StackedBar
                    caption={`Gender distribution, ${d.label}`}
                    segments={[
                      { label: 'Female', value: d.gender.F },
                      { label: 'Male', value: d.gender.M },
                    ]}
                  />
                  {d.gender.note && <p className="text-sm muted mt-4 mb-0">{d.gender.note}</p>}
                </>
              ) : (
                <p className="muted m-0">Gender data was not recorded for this batch.</p>
              )}
            </div>
          </div>
        </div>

        {/* Satisfaction */}
        <div className="pcu-card mb-12">
          <h3 className="!text-xl mb-1">Satisfaction</h3>
          {sat && 'batches' in sat ? (
            <>
              <p className="muted text-sm mt-0 mb-6">{(sat as AllSat).note}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {(sat as AllSat).batches.map(b => (
                  <Donut key={b.label} value={b.overall} max={b.max} label={`${b.label} · ${b.pct}% · n=${b.n}`} />
                ))}
              </div>
            </>
          ) : sat && 'criteria' in sat ? (
            (() => {
              const s = sat as NonNullable<Sat>
              const sorted = [...s.criteria].sort((a, b) => b.score - a.score)
              return (
                <div className="grid gap-10 md:grid-cols-[200px_1fr] items-start mt-4">
                  <div className="flex flex-col items-center gap-2">
                    <Donut value={s.overall} max={s.max} label={`Overall, scale ${s.scale}, ${s.n} responses`} size={140} />
                  </div>
                  <div>
                    <BarList
                      caption={`Satisfaction by criterion, ${d.label}`}
                      max={s.max}
                      bars={sorted.map(c => ({ key: c.label, label: c.label, value: c.score, display: `${c.score.toFixed(2)} / ${c.max}`, color: SERIES[0] }))}
                    />
                    {s.note && <p className="text-sm muted mt-4 mb-0">{s.note}</p>}
                  </div>
                </div>
              )
            })()
          ) : null}
        </div>

        <Insights title={isAll ? 'Program analysis' : 'Batch analysis'} items={d.analysis} />
      </div>
    </section>
  )
}

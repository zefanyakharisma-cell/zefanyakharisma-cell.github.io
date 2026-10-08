'use client'

import { useState } from 'react'
import { DATA, TABS } from '@/lib/data/amerta'
import { BarList, CountryCode, SectionHead, Stat } from '@/components/pcu'
import { Insights } from '@/components/pcu/Insights'
import { Segmented } from '@/components/pcu/Segmented'

const BATCHES = ['21', '22', '23', '24'] as const

export default function AmertaStats() {
  const [active, setActive] = useState('all')
  const d = DATA[active]

  return (
    <section className="section section--smoke">
      <div className="wrap">
        <SectionHead
          eyebrow="Data & analytics"
          title="Participant statistics"
          lead={
            active === 'all'
              ? 'Compiled from AMERTA XXI–XXIV: 207 participants, 14 nationalities and 24 partner universities.'
              : `${d.label} · ${d.period} · ${d.students} participants from ${d.countries} countries`
          }
        />

        <div className="mb-8">
          <Segmented label="Choose a batch" options={TABS} value={active} onChange={setActive} />
        </div>

        {active === 'all' ? (
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
                  <span className="text-[2.5rem] font-bold leading-none tracking-[-0.02em]">{b.students}</span>
                  <span className="font-semibold mt-2">{b.label}</span>
                  <span className="text-sm muted">{b.period}</span>
                  <span className="text-sm muted mt-2">{b.countries} countries · {b.uniCount} universities</span>
                </button>
              )
            })}
          </div>
        ) : (
          <div className="grid-4 !gap-8 mb-12">
            <Stat value={d.students} label="Participants" />
            <Stat value={d.countries} label="Countries" />
            <Stat value={d.uniCount} label="Partner universities" />
            <Stat value={d.label.replace('AMERTA ', '')} label={d.period} />
          </div>
        )}

        <div className="grid-2 !gap-12 items-start">
          <div className="pcu-card">
            <h3 className="!text-xl mb-1">Nationalities</h3>
            <p className="muted text-sm mt-0 mb-5">{d.nationalities.length} countries · share of {d.students} participants</p>
            <BarList
              caption={`Participants by nationality, ${d.label}`}
              bars={d.nationalities.map(n => ({
                key: n.country,
                label: <CountryCode country={n.country} />,
                value: n.count,
                display: `${n.count} · ${Math.round((n.count / d.students) * 100)}%`,
              }))}
            />
          </div>

          <div className="pcu-card">
            <h3 className="!text-xl mb-1">Faculty enrollment at Airlangga</h3>
            {d.faculties ? (
              <>
                {d.facultyNote && <p className="muted text-sm mt-0 mb-5">{d.facultyNote}</p>}
                <BarList
                  caption={`Course registrations by faculty, ${d.label}`}
                  bars={d.faculties.map(f => ({ key: f.name, label: f.name, value: f.count, color: '#3880d0' }))}
                />
              </>
            ) : (
              <p className="muted mt-4 mb-0 p-6 border border-dashed border-line rounded-md text-center">
                Faculty enrollment was not recorded for this batch.
              </p>
            )}
          </div>
        </div>

        <div className="mt-12">
          <h3 className="!text-xl mb-5">
            Partner universities <span className="muted font-normal text-base">· {d.uniCount} institutions</span>
          </h3>
          <div className="grid-3 !gap-4">
            {d.universities.map(g => (
              <div key={g.region} className="bg-white rounded-md p-5 border border-line">
                <p className="mb-3 mt-0 font-semibold"><CountryCode country={g.region} /></p>
                <ul className="m-0 p-0 list-none flex flex-col gap-2">
                  {g.items.map(item => (
                    <li key={item.name} className="flex justify-between gap-3 text-sm">
                      <span>{item.name}</span>
                      {item.count != null && <b className="tabular-nums">{item.count}</b>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <Insights title={active === 'all' ? 'Program analysis' : 'Batch analysis'} items={d.analysis} />
        </div>
      </div>
    </section>
  )
}

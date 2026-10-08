import type { Metadata } from 'next'
import { Bell, ChartColumn, Database, FilePlus2, RefreshCw, Search, Settings, Timer } from 'lucide-react'
import { Card, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'
import { MenuRail } from '@/components/pcu/MenuRail'
import { simKerjasama as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Kerjasama',
  alternates: { canonical: '/sim-kerjasama' },
  description: sim.tagline,
}

const menuIcons = [ChartColumn, Search, FilePlus2, Timer, RefreshCw, Bell, Database, Settings]
const stakeholderShapes = [
  <Shape key="a" kind="quarter-tl" color="amber" className="w-12 right-0 bottom-0" />,
  <Shape key="b" kind="circle" color="cerise" className="w-8 right-4 bottom-4" />,
  <span key="c" aria-hidden className="absolute w-10 h-10 right-0 bottom-0 bg-teal" />,
  <Shape key="d" kind="quarter-tl" color="blue" className="w-12 right-0 bottom-0" />,
  <Shape key="e" kind="circle" color="amber" className="w-8 right-4 bottom-4" />,
  <span key="f" aria-hidden className="absolute w-10 h-10 right-0 bottom-0 bg-cerise" />,
]
const stakeholderTags = ['Office', 'Units', 'Approvers', 'Mobility', 'Leadership', 'Partners']

export default function SimKerjasamaPage() {
  return (
    <>
      <PageHero
        brand
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Information system', 'Petra Christian University']}
        title="SIM Kerjasama"
        lead={sim.summary}
        shapes={<>
          <Shape kind="ring-n" color="blue" className="right-[6%] bottom-0 w-[320px]" />
          <Shape kind="ring-u-line" color="amber" className="right-[2%] top-0 w-[220px]" />
        </>}
      >
        <p className="m-0 text-xl font-semibold text-white max-w-[40ch]">{sim.tagline}.</p>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Goals G1–G9" title="Nine goals for the system" />
          <ol className="m-0 p-0 list-none grid-3 !gap-4">
            {sim.goals.map((g, i) => (
              <li key={g} className="flex gap-4 items-center p-5 bg-smoke rounded-md">
                <span aria-hidden className="pcu-icon-badge flex-none font-bold text-[.9375rem]" style={{ '--size': '52px' } as React.CSSProperties}>
                  G{i + 1}
                </span>
                <span className="font-semibold leading-snug"><span className="sr-only">G{i + 1}: </span>{g}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="The app" title="Eight menus, one document lifecycle" />
          <MenuRail app="SIM Kerja Sama" items={sim.menus.map((m, i) => ({ ...m, icon: menuIcons[i] }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Benefits" title="Lighter work for every user" />
          <div className="grid-3">
            {sim.stakeholders.map((s, i) => (
              <Card key={s.group} shape={stakeholderShapes[i]} className="!pb-12">
                <Tag>{stakeholderTags[i]}</Tag>
                <h3 className="!text-xl">{s.group}</h3>
                <p className="muted m-0">{s.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Before and after" title="What wasn't measured now is" />
          <div className="overflow-x-auto bg-white rounded-md">
            <table className="data-table">
              <thead>
                <tr><th scope="col" className="w-[44%]">Measure</th><th scope="col">Before</th><th scope="col">With the system</th></tr>
              </thead>
              <tbody>
                {sim.metrics.map(m => (
                  <tr key={m.measure}>
                    <td>{m.measure}</td>
                    <td className="muted">{m.before}</td>
                    <td className="font-semibold">{m.after}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <Card
            tone="midnight"
            href="/sim-realisasi"
            className="!p-[clamp(28px,4vw,48px)]"
            bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6"
            shape={<Shape kind="ring-n" color="teal" className="w-[220px] right-[24%] bottom-0" />}
          >
            <div className="flex flex-col gap-2 max-w-[60ch]">
              <span className="pcu-eyebrow text-amber">Companion system</span>
              <h2 className="h-sub text-white">SIM Realisasi</h2>
              <p className="m-0 text-smoke">From agreements on paper to real activities: RENSTRA indicators, semester reports and dormant partnerships made visible.</p>
            </div>
            <span className="pcu-btn pcu-btn--accent">View SIM Realisasi →</span>
          </Card>
        </div>
      </section>
    </>
  )
}

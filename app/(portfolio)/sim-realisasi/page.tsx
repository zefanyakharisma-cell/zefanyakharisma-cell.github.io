import type { Metadata } from 'next'
import { BookOpen, ChartColumn, FileDown, Link2, Plus, Settings, Users } from 'lucide-react'
import { Card, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'
import { MenuRail } from '@/components/pcu/MenuRail'
import { simRealisasi as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Realisasi',
  alternates: { canonical: '/sim-realisasi' },
  description: sim.mission,
}

const menuIcons = [ChartColumn, BookOpen, Plus, Users, FileDown, Settings, Link2]

export default function SimRealisasiPage() {
  return (
    <>
      <PageHero
        brand
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Information system', 'Petra Christian University']}
        title="SIM Realisasi"
        lead={sim.mission}
        shapes={<>
          <Shape kind="ring-u" color="teal" className="right-[6%] top-0 w-[300px]" />
          <Shape kind="circle" color="amber" className="right-[30%] bottom-10 w-14" />
        </>}
      >
        <p className="m-0 text-xl font-semibold text-white max-w-[40ch]">{sim.tagline}.</p>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Outcomes" title="What the system delivers" />
          <div className="grid-3 mb-6">
            {sim.outcomes.map((o, i) => (
              <Card key={o.title}>
                <span className="text-[3rem] font-bold leading-none text-accent-strong">{i + 1}</span>
                <h3 className="!text-xl">{o.title}</h3>
                <p className="muted m-0">{o.desc}</p>
              </Card>
            ))}
          </div>
          <div className="grid-2 !gap-4">
            <Card tone="smoke"><p className="m-0"><strong className="text-emerald">Included:</strong> {sim.included}</p></Card>
            <Card tone="smoke"><p className="m-0"><strong className="text-accent-pending">Not included:</strong> {sim.excluded}</p></Card>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="The app" title="Reporting an activity on one page" />
          <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-3 mb-10" aria-label="Activity form steps">
            {sim.formSteps.map((step, i) => (
              <li key={step} className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-2 rounded-pill px-4 min-h-[40px] font-semibold ${i === 0 ? 'bg-midnight text-white' : 'border-[1.5px] border-[#c5ccd4] text-ink-secondary bg-white'}`}>
                  {i + 1} {step}
                </span>
                {i < sim.formSteps.length - 1 && <span aria-hidden className="w-8 h-0.5 bg-[#c5ccd4]" />}
              </li>
            ))}
          </ol>
          <MenuRail app="Realisasi" items={sim.menus.map((m, i) => ({ ...m, icon: menuIcons[i] }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Integration" title="Each system shows the other's data" />
          <div className="grid-2">
            {([['In SIM Kerjasama', sim.integration.inKerjasama], ['In SIM Realisasi', sim.integration.inRealisasi]] as const).map(([heading, items]) => (
              <Card key={heading} tone="smoke">
                <Tag>{heading}</Tag>
                {items.map(item => (
                  <div key={item.title} className="pt-3">
                    <h3 className="!text-lg">{item.title}</h3>
                    <p className="muted m-0 mt-1">{item.desc}</p>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <Card
            tone="midnight"
            href="/sim-kerjasama"
            className="!p-[clamp(28px,4vw,48px)]"
            bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6"
            shape={<Shape kind="ring-n" color="blue" className="w-[220px] right-[24%] bottom-0" />}
          >
            <div className="flex flex-col gap-2 max-w-[60ch]">
              <span className="pcu-eyebrow text-amber">Source system</span>
              <h2 className="h-sub text-white">SIM Kerjasama</h2>
              <p className="m-0 text-smoke">The system of record for every MoU and MoA that SIM Realisasi reports against.</p>
            </div>
            <span className="pcu-btn pcu-btn--accent">View SIM Kerjasama →</span>
          </Card>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import {
  ArrowLeftRight, BookOpen, ChartColumn, Check, FileDown, FileText, Flag, Layers, Link2, ListChecks, Paperclip, Plus, Send, Settings, Users, X,
} from 'lucide-react'
import { Card, FlipCard, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'
import { MenuRail } from '@/components/pcu/MenuRail'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { simRealisasi as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Realisasi',
  alternates: { canonical: '/sim-realisasi' },
  description: sim.mission,
}

const menuIcons = [ChartColumn, BookOpen, Plus, Users, FileDown, Settings, Link2]
const formText = [
  'Pick the agreement valid on the activity date.',
  'Student numbers looked up; duplicates decided and recorded.',
  'Attach the evidence.',
  'Verified, then counted toward RENSTRA.',
]
const formIcons = [FileText, Users, Paperclip, Send]
const integrationIcons = { inKerjasama: [Layers, Flag, ListChecks], inRealisasi: [FileText, BookOpen, Link2] }

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
          <SectionHead eyebrow="Outcomes" title="Three things it delivers" />
          <div className="grid-3 mb-6">
            {sim.outcomes.map((o, i) => (
              <Card key={o.title} tone={i === 1 ? 'midnight' : undefined}>
                <span className={`text-[3.5rem] font-bold leading-none ${i === 1 ? 'text-amber' : 'text-accent-strong'}`}>{i + 1}</span>
                <h3 className={`!text-xl ${i === 1 ? 'text-white' : ''}`}>{o.title}</h3>
                <p className={`m-0 ${i === 1 ? 'text-smoke' : 'muted'}`}>{o.desc}</p>
              </Card>
            ))}
          </div>
          <div className="grid-2 !gap-4">
            <div className="flex gap-3 items-start p-5 rounded-md bg-smoke">
              <span className="grid place-items-center w-8 h-8 rounded-pill bg-emerald text-white flex-none" aria-hidden><Check size={16} /></span>
              <p className="m-0"><span className="sr-only">Included: </span>{sim.included}</p>
            </div>
            <div className="flex gap-3 items-start p-5 rounded-md bg-smoke">
              <span className="grid place-items-center w-8 h-8 rounded-pill bg-accent-pending text-white flex-none" aria-hidden><X size={16} /></span>
              <p className="m-0"><span className="sr-only">Not included: </span>{sim.excluded}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap flex flex-col gap-12">
          <div>
            <SectionHead eyebrow="Report an activity" title="Four steps, one page" />
            <Lifecycle
              label="Activity report form"
              steps={sim.formSteps.map((step, i) => {
                const Icon = formIcons[i]
                return { icon: <Icon size={20} aria-hidden />, title: step, text: formText[i] }
              })}
            />
          </div>
          <div>
            <SectionHead eyebrow="The app" title="Seven menus" size="sub" />
            <MenuRail app="Realisasi" items={sim.menus.map((m, i) => ({ ...m, icon: menuIcons[i] }))} />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Integration" title="Each shows the other's data" lead="Tap a card." />
          <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr] items-center">
            {([['In SIM Kerjasama', 'inKerjasama'], null, ['In SIM Realisasi', 'inRealisasi']] as const).map((col, ci) => col === null ? (
              <span key="arrow" aria-hidden className="justify-self-center grid place-items-center w-14 h-14 rounded-pill bg-amber text-midnight rotate-90 lg:rotate-0">
                <ArrowLeftRight size={24} />
              </span>
            ) : (
              <div key={col[1]} className="flex flex-col gap-3">
                <Tag className="self-start">{col[0]}</Tag>
                {sim.integration[col[1]].map((item, i) => {
                  const Icon = integrationIcons[col[1]][i]
                  return <FlipCard key={item.title} icon={<Icon aria-hidden />} title={item.title} back={item.desc} tone={ci === 0 ? 'midnight' : 'white'} />
                })}
              </div>
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
              <p className="m-0 text-smoke">The system of record SIM Realisasi reports against.</p>
            </div>
            <span className="pcu-btn pcu-btn--accent">View SIM Kerjasama →</span>
          </Card>
        </div>
      </section>
    </>
  )
}

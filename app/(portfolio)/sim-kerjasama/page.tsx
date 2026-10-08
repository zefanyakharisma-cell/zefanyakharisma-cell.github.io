import type { Metadata } from 'next'
import {
  Bell, Building, ChartColumn, ClipboardCheck, Crown, Database, FilePlus2, Globe2, PenLine, Plane, RefreshCw, Search, Settings,
  ShieldCheck, Stamp, Timer, Users,
} from 'lucide-react'
import { Card, Details, FlipCard, PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { MenuRail } from '@/components/pcu/MenuRail'
import BeforeAfter from '@/components/projects/BeforeAfter'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { simKerjasama as sim } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Kerjasama',
  alternates: { canonical: '/sim-kerjasama' },
  description: sim.tagline,
}

const menuIcons = [ChartColumn, Search, FilePlus2, Timer, RefreshCw, Bell, Database, Settings]
const stakeholderIcons = [Building, Users, Stamp, Plane, Crown, Globe2]

const lifecycle = [
  { icon: <PenLine size={20} aria-hidden />, title: 'Propose', text: 'A unit proposes an agreement, or records one already signed.' },
  { icon: <ShieldCheck size={20} aria-hidden />, title: 'Approve', text: 'Dean to Rector, in order. Approvers can ask for revisions.' },
  { icon: <Timer size={20} aria-hidden />, title: 'Track', text: 'Each queue has an SLA; slow approvals show up.' },
  { icon: <Globe2 size={20} aria-hidden />, title: 'Active', text: 'Valid agreements are visible to everyone, on the map and dashboard.' },
  { icon: <ClipboardCheck size={20} aria-hidden />, title: 'Evaluate', text: 'Faculties and partners rate the partnership; partners need no account.' },
  { icon: <RefreshCw size={20} aria-hidden />, title: 'Renew', text: 'Renewal is decided on evidence and joins the agreement chain.' },
]

export default function SimKerjasamaPage() {
  return (
    <>
      <PageHero
        brand
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Information system', 'Petra Christian University']}
        title="SIM Kerjasama"
        lead={`${sim.tagline}.`}
        shapes={<>
          <Shape kind="ring-n" color="blue" className="right-[6%] bottom-0 w-[320px]" />
          <Shape kind="ring-u-line" color="amber" className="right-[2%] top-0 w-[220px]" />
        </>}
      >
        <Details light summary="About the system">{sim.summary}</Details>
      </PageHero>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={String(sim.goals.length)} label="Goals, G1–G9" />
          <Stat value={String(sim.menus.length)} label="Menus" />
          <Stat value={String(sim.stakeholders.length)} label="User groups" />
          <Stat value={String(sim.metrics.length)} label="New measures" />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap">
          <SectionHead eyebrow="Lifecycle" title="One agreement, six stages" />
          <Lifecycle steps={lifecycle} label="MoU and MoA lifecycle in SIM Kerjasama" />
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Goals" title="G1–G9" />
          <ol className="m-0 p-0 list-none grid gap-3 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
            {sim.goals.map((g, i) => (
              <li key={g} className="flex gap-4 items-center p-4 bg-smoke rounded-md">
                <span aria-hidden className="pcu-icon-badge flex-none font-bold text-[.9375rem]" style={{ '--size': '48px' } as React.CSSProperties}>
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
          <SectionHead eyebrow="Benefits" title="Six user groups" lead="Tap a card." />
          <div className="grid-3">
            {sim.stakeholders.map((s, i) => {
              const Icon = stakeholderIcons[i]
              return <FlipCard key={s.group} icon={<Icon aria-hidden />} title={s.group} back={s.desc} tone={i % 2 ? 'midnight' : 'white'} />
            })}
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Before and after" title="Unmeasured, now measured" />
          <BeforeAfter metrics={sim.metrics} />
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
              <p className="m-0 text-smoke">Agreements on paper, turned into counted activities.</p>
            </div>
            <span className="pcu-btn pcu-btn--accent">View SIM Realisasi →</span>
          </Card>
        </div>
      </section>
    </>
  )
}

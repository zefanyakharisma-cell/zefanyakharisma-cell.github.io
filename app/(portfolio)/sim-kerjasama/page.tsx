import type { Metadata } from 'next'
import {
  Award, Bell, Building, ChartColumn, ClipboardCheck, Crown, Database, Eye, FilePlus2, Globe2, Landmark, MonitorPlay, PenLine, Plane, RefreshCw,
  Scale, Search, Settings, ShieldCheck, Stamp, Timer, TrendingUp, Users,
} from 'lucide-react'
import { Card, DemoFrame, Details, FlipCard, IconBadge, PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { Tabs } from '@/components/pcu/Tabs'
import { MenuRail } from '@/components/pcu/MenuRail'
import BeforeAfter from '@/components/projects/BeforeAfter'
import { ProcessPanel, SimBackground, StatusFlow } from '@/components/projects/SimParts'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { simKerjasama as sim, simKerjasamaDetail as detail } from '@/lib/data/sim'

export const metadata: Metadata = {
  title: 'SIM Kerjasama',
  alternates: { canonical: '/sim-kerjasama' },
  description: `${sim.tagline}: business process, objectives, benefits and a live demo.`,
}

const menuIcons = [ChartColumn, Search, FilePlus2, Timer, RefreshCw, Bell, Database, Settings]
const stakeholderIcons = [Building, Users, Stamp, Plane, Crown, Globe2]
const themeIcons = [Scale, Database, Eye]
const themeTones = ['brand', 'aqua', 'sunrise'] as const
const institutionalIcons = [Award, TrendingUp, Globe2, Landmark]

const lifecycle = [
  { icon: <PenLine size={20} aria-hidden />, title: 'Propose', text: 'A unit proposes an agreement, or records one already signed.' },
  { icon: <ShieldCheck size={20} aria-hidden />, title: 'Approve', text: 'Dean to Rector, in order. Approvers can ask for revisions.' },
  { icon: <Timer size={20} aria-hidden />, title: 'Track', text: 'Each queue has an SLA; slow approvals show up.' },
  { icon: <Globe2 size={20} aria-hidden />, title: 'Active', text: 'Valid agreements are visible to everyone, on the map and dashboard.' },
  { icon: <ClipboardCheck size={20} aria-hidden />, title: 'Evaluate', text: 'Faculties and partners rate the partnership; partners need no account.' },
  { icon: <RefreshCw size={20} aria-hidden />, title: 'Renew', text: 'Renewal is decided on evidence and joins the agreement chain.' },
]

const [approval, renewal] = detail.processes

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
        <div className="flex flex-wrap gap-3">
          <a href="#demo" className="pcu-btn pcu-btn--accent"><MonitorPlay aria-hidden size={18} /> Try the live demo</a>
          <a href="#process" className="pcu-btn pcu-btn--inverse">Business process</a>
        </div>
      </PageHero>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={String(sim.goals.length)} label="Goals, G1–G9" />
          <Stat value={String(sim.menus.length)} label="Menus" />
          <Stat value={String(sim.stakeholders.length)} label="User groups" />
          <Stat value={String(detail.tiers.length)} label="Approval tiers" amber />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap">
          <SectionHead eyebrow="Background" title="Why a system of record" lead="Partnership documents used to live in inboxes and folders. SIM Kerjasama gives each one a single, traceable path." />
          <SimBackground {...detail.background} />
        </div>
      </section>

      <section id="demo" className="section section--smoke scroll-mt-20">
        <div className="wrap">
          <SectionHead eyebrow="Live demo" title="Try SIM Kerjasama" lead="The working app, on demo data. Sign in with a demo account to see the dashboard, queues and renewals." />
          <DemoFrame src={sim.demoUrl} app="SIM Kerjasama" note="Demo environment with sample agreements. Data there is not PCU's live partnership record." />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Objectives · Tujuan" title="Nine goals, three themes" />
          <div className="grid-3">
            {detail.objectives.map((o, i) => (
              <div key={o.theme} className="rounded-panel border border-line p-6 flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <IconBadge icon={themeIcons[i]} tone={themeTones[i]} size={52} />
                  <h3 className="m-0 h-sub !text-xl">{o.theme}</h3>
                </div>
                <p className="m-0 text-ink-secondary">{o.text}</p>
                <ol className="m-0 p-0 list-none flex flex-col gap-2">
                  {o.goals.map(g => (
                    <li key={g} className="flex gap-3 items-baseline p-3 bg-smoke rounded-md">
                      <span className="font-bold text-accent-strong text-sm flex-none w-7">G{g + 1}</span>
                      <span className="font-semibold leading-snug text-midnight">{sim.goals[g]}</span>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section section--smoke scroll-mt-20">
        <div className="wrap">
          <SectionHead eyebrow="Business process" title="Two processes, one document" lead="Modelled in BPMN from the rules the database enforces: who acts, in what order, and which status each step sets." />
          <Tabs
            label="SIM Kerjasama business processes"
            tabs={[
              {
                key: approval.key,
                label: approval.label,
                panel: (
                  <ProcessPanel
                    process={approval}
                    rules={detail.approvalRules}
                    status={<StatusFlow label="Document status sequence" main={detail.statuses} side={detail.sideStatuses} />}
                    extra={
                      <div className="rounded-md bg-midnight text-white p-5 flex flex-col gap-3">
                        <span className="pcu-eyebrow text-amber">Approval tiers</span>
                        <dl className="m-0 flex flex-col gap-2">
                          {detail.tiers.map(t => (
                            <div key={t.tier} className="flex gap-3">
                              <dt className="font-bold flex-none w-14">{t.tier}</dt>
                              <dd className="m-0 text-sm text-smoke">{t.who}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    }
                  />
                ),
              },
              {
                key: renewal.key,
                label: renewal.label,
                panel: (
                  <ProcessPanel
                    process={renewal}
                    rules={detail.renewalRules}
                    status={<StatusFlow label="Renewal status sequence" main={detail.renewalStatuses} side={detail.archiveReasons} sideLabel="Archive reasons" />}
                  />
                ),
              },
            ]}
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Lifecycle" title="One agreement, six stages" lead="The two processes above, in one line." />
          <Lifecycle steps={lifecycle} label="MoU and MoA lifecycle in SIM Kerjasama" />
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="The app" title="Eight menus, one document lifecycle" />
          <MenuRail app="SIM Kerja Sama" items={sim.menus.map((m, i) => ({ ...m, icon: menuIcons[i] }))} />
        </div>
      </section>

      <section className="section">
        <div className="wrap flex flex-col gap-12">
          <div>
            <SectionHead eyebrow="Benefits · Manfaat" title="Six user groups" lead="Tap a card." />
            <div className="grid-3">
              {sim.stakeholders.map((s, i) => {
                const Icon = stakeholderIcons[i]
                return <FlipCard key={s.group} icon={<Icon aria-hidden />} title={s.group} back={s.desc} tone={i % 2 ? 'midnight' : 'white'} />
              })}
            </div>
          </div>
          <div>
            <SectionHead eyebrow="For the university" title="Institutional benefits" size="sub" />
            <div className="grid-4">
              {detail.institutionalBenefits.map((b, i) => {
                const Icon = institutionalIcons[i]
                return (
                  <Card key={b.title} tone="smoke">
                    <IconBadge icon={Icon} size={44} tone={i % 2 ? 'amber' : 'brand'} />
                    <h3 className="m-0 text-lg font-bold text-midnight">{b.title}</h3>
                    <p className="m-0 text-sm text-ink-secondary">{b.text}</p>
                  </Card>
                )
              })}
            </div>
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

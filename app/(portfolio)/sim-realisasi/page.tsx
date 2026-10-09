import type { Metadata } from 'next'
import {
  ArrowLeftRight, ArrowRight, BookOpen, Building, Camera, ChartColumn, Check, ClipboardCheck, Crown, Database, FileDown, FileText, Flag, Layers, Link2,
  ListChecks, Minus, MonitorPlay, Paperclip, Plane, Plus, Send, Settings, ShieldCheck, Target, Trophy, UserCheck, Users, X,
} from 'lucide-react'
import { Card, DemoFrame, FlipCard, IconBadge, PageHero, SectionHead, Shape, Stat, StackedBar, Tag } from '@/components/pcu'
import { Tabs } from '@/components/pcu/Tabs'
import { PovSwitch } from '@/components/pcu/PovSwitch'
import { SimDev } from '@/components/projects/SimDev'
import { MenuRail } from '@/components/pcu/MenuRail'
import { ProcessPanel, SimBackground, StatusFlow } from '@/components/projects/SimParts'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { simRealisasi as sim, simRealisasiDetail as detail } from '@/lib/data/sim'
import { simRealisasiDev } from '@/lib/data/simDev'

export const metadata: Metadata = {
  title: 'SIM Realisasi',
  alternates: { canonical: '/sim-realisasi' },
  description: `${sim.mission} Business process, objectives, benefits and a live demo.`,
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
const objectiveIcons = [ClipboardCheck, ShieldCheck, Target, Camera, Flag]
const benefitIcons = [Building, Plane, Settings, Crown, Users, UserCheck]

const flow = {
  inputs: [
    { title: 'SIM Kerjasama', text: 'Agreements valid on the activity date, with renewal chains' },
    { title: 'Academic units', text: 'Activity details, IA, IR and participants' },
    { title: 'BAAK & HR', text: 'Student and employee numbers' },
  ],
  outputs: [
    { title: 'RENSTRA 1.1', text: 'Inbound and outbound students' },
    { title: 'RENSTRA 1.19.S1 · 1.19.S4', text: 'International activities; agreements realised' },
    { title: 'International Awards', text: 'Study programs ranked on verified activity' },
    { title: 'Back to SIM Kerjasama', text: 'Implementation tab and "no activity yet" flag' },
  ],
}

const [submit, close] = detail.processes

function Cell({ v }: { v: string | boolean }) {
  if (v === true) return <span className="inline-grid place-items-center w-7 h-7 rounded-pill bg-emerald text-white"><Check aria-hidden size={15} /><span className="sr-only">Yes</span></span>
  if (v === false) return <span className="inline-grid place-items-center w-7 h-7 rounded-pill bg-smoke text-ink-muted"><Minus aria-hidden size={15} /><span className="sr-only">No</span></span>
  return <span className="text-sm font-semibold text-midnight">{v}</span>
}

export default function SimRealisasiPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/student-services/monev-tias/img-7067.jpg' }}
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
        <div className="flex flex-wrap gap-3">
          <a href="#demo" className="pcu-btn pcu-btn--accent"><MonitorPlay aria-hidden size={18} /> Try the live demo</a>
          <a href="?pov=dev" className="pcu-btn pcu-btn--inverse">Programmer view</a>
        </div>
      </PageHero>

      <section id="demo" className="section section--smoke decor-grid scroll-mt-20">
        <div className="wrap">
          <SectionHead eyebrow="Live demo" title="Try SIM Realisasi" lead="The working app, on demo data: the dashboard, the activity list and the single-page report form." />
          <DemoFrame src={sim.demoUrl} app="SIM Realisasi" note="Demo environment with generated activities over real agreements. Figures there are not official PETRA indicators." />
        </div>
      </section>

      <PovSwitch
        general={<>
          <section className="section !pb-10 decor-glow-tr">
            <div className="wrap grid gap-10 lg:grid-cols-[2fr_1fr] items-end">
              <div className="grid-3 !gap-8">
                <Stat value={detail.demoFigures[0].value} label={detail.demoFigures[0].label} />
                <Stat value={detail.demoFigures[1].value} label={detail.demoFigures[1].label} amber />
                <Stat value={detail.demoFigures[4].value} label={detail.demoFigures[4].label} />
              </div>
              <div className="flex flex-col gap-3">
                <span className="pcu-eyebrow">RENSTRA 1.1 by semester, 2025/26</span>
                <StackedBar
                  caption="RENSTRA 1.1 students in 2025/26 by semester, demo data"
                  segments={[
                    { label: detail.demoFigures[2].label, value: Number(detail.demoFigures[2].value) },
                    { label: detail.demoFigures[3].label, value: Number(detail.demoFigures[3].value) },
                  ]}
                />
              </div>
            </div>
            <p className="wrap mt-4 text-sm text-ink-muted">Demo data generated over the real SIM Kerjasama agreements and units; not yet real activities.</p>
          </section>

          <section className="section !pt-6 decor-ring-bl">
            <div className="wrap">
              <SectionHead eyebrow="Background" title="Why realisation needed its own system" lead="An agreement is only worth what is carried out under it. Until now, nobody could count that reliably." />
              <SimBackground {...detail.background} />
            </div>
          </section>

          <section className="section decor-glow-br">
            <div className="wrap flex flex-col gap-12">
              <div>
                <SectionHead eyebrow="Objectives · Tujuan" title="Five objectives" />
                <ol className="m-0 p-0 list-none grid gap-4 [grid-template-columns:repeat(auto-fit,minmax(min(100%,200px),1fr))]">
                  {detail.objectives.map((o, i) => (
                    <li key={o.title} className="relative overflow-hidden rounded-panel border border-line p-5 flex flex-col gap-3">
                      <span aria-hidden className="absolute -right-2 -top-4 text-[5rem] font-bold leading-none text-smoke">{i + 1}</span>
                      <IconBadge icon={objectiveIcons[i]} size={44} tone={i % 2 ? 'aqua' : 'brand'} className="relative" />
                      <h3 className="relative m-0 text-lg font-bold text-midnight leading-snug">{o.title}</h3>
                      <p className="relative m-0 text-sm text-ink-secondary">{o.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <SectionHead eyebrow="Outcomes" title="Three things it delivers" size="sub" />
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
            </div>
          </section>

          <section className="section section--smoke decor-grid">
            <div className="wrap">
              <SectionHead eyebrow="Key concepts" title="Six terms the system is built on" />
              <dl className="m-0 grid-3 !gap-4">
                {detail.concepts.map(c => (
                  <div key={c.term} className="rounded-md bg-white p-5 flex flex-col gap-2 border-t-4 border-amber">
                    <dt className="font-bold text-midnight text-lg">{c.term}</dt>
                    <dd className="m-0 text-sm text-ink-secondary">{c.text}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>

          <section id="process" className="section scroll-mt-20 decor-ring-tr">
            <div className="wrap">
              <SectionHead eyebrow="Business process" title="From activity to indicator" lead="Modelled in BPMN: one process follows an activity through verification; the other covers what runs on a schedule." />
              <Tabs
                stickyTop={138}
                label="SIM Realisasi business processes"
                tabs={[
                  {
                    key: submit.key,
                    label: submit.label,
                    panel: (
                      <ProcessPanel
                        process={submit}
                        rules={detail.submissionRules}
                        status={<StatusFlow label="Activity status sequence" main={detail.statuses} side={detail.sideStatuses} sideLabel="Flags" />}
                      />
                    ),
                  },
                  { key: close.key, label: close.label, panel: <ProcessPanel process={close} rules={detail.closeRules} status={null} /> },
                ]}
              />
            </div>
          </section>

          <section className="section section--smoke decor-grid">
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

          <section className="section decor-glow-bl">
            <div className="wrap">
              <SectionHead eyebrow="Data flow" title="Three sources in, four results out" />
              <div className="grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] items-center">
                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {flow.inputs.map(f => (
                    <li key={f.title} className="rounded-md bg-smoke p-4">
                      <b className="block text-midnight">{f.title}</b>
                      <span className="text-sm text-ink-secondary">{f.text}</span>
                    </li>
                  ))}
                </ul>
                <ArrowRight aria-hidden size={28} className="justify-self-center text-amber rotate-90 lg:rotate-0" />
                <div className="relative overflow-hidden rounded-panel pcu-surface-brand p-6 flex flex-col gap-3 min-h-[220px] justify-center">
                  <Shape kind="ring-u" color="amber" className="w-[160px] -right-8 top-0" />
                  <Database aria-hidden size={28} className="relative text-amber" />
                  <b className="relative text-2xl">SIM Realisasi</b>
                  <span className="relative text-sm text-smoke">Verifies, de-duplicates, counts verified data only, and freezes each semester.</span>
                </div>
                <ArrowRight aria-hidden size={28} className="justify-self-center text-amber rotate-90 lg:rotate-0" />
                <ul className="m-0 p-0 list-none flex flex-col gap-3">
                  {flow.outputs.map((f, i) => (
                    <li key={f.title} className="rounded-md border border-line p-4 flex gap-3 items-start">
                      {i === 2 ? <Trophy aria-hidden size={20} className="text-amber flex-none mt-0.5" /> : <ChartColumn aria-hidden size={20} className="text-accent-strong flex-none mt-0.5" />}
                      <span><b className="block text-midnight">{f.title}</b><span className="text-sm text-ink-secondary">{f.text}</span></span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="section section--smoke decor-grid">
            <div className="wrap">
              <SectionHead eyebrow="Access" title="Who can do what" lead="Enforced in the database with row-level security, not only hidden in the interface. Every export with student data is logged (UU PDP 27/2022)." />
              <div className="relative overflow-x-auto rounded-panel bg-white border border-line">
                <table className="w-full min-w-[720px] border-collapse text-left">
                  <thead>
                    <tr className="bg-midnight text-white">
                      <th scope="col" className="p-4 text-sm font-semibold">Action</th>
                      {detail.roles.columns.map(c => <th key={c} scope="col" className="p-4 text-sm font-semibold text-center">{c}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {detail.roles.rows.map(r => (
                      <tr key={r.action} className="border-t border-line">
                        <th scope="row" className="p-4 text-sm font-medium text-ink-secondary">{r.action}</th>
                        {r.cells.map((c, i) => <td key={i} className="p-4 text-center"><Cell v={c} /></td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="section decor-glow-tr">
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

          <section className="section section--smoke decor-grid">
            <div className="wrap">
              <SectionHead eyebrow="Benefits · Manfaat" title="Who gains what" lead="Tap a card." />
              <div className="grid-3">
                {detail.benefits.map((b, i) => {
                  const Icon = benefitIcons[i]
                  return <FlipCard key={b.group} icon={<Icon aria-hidden />} title={b.group} back={b.desc} tone={i % 2 ? 'midnight' : 'white'} />
                })}
              </div>
            </div>
          </section>

        </>}
        dev={
          <SimDev dev={simRealisasiDev} processes={detail.processes} name="SIM Realisasi" integration={{
            title: 'Reading SIM Kerjasama without writing it',
            items: [
              { label: 'Adapter views in schema kerjasama', text: 'profiles, units, agendas, documents, document_partners, document_scope_units, partners and countries, mapped from the SIM-KS tables (0001_kerjasama_adapter.sql).' },
              { label: 'Chains, not documents', text: 'An activity stores the original agreement and its chain_id; the current document is always resolved through the renewal chain (chain_current, chain_root).' },
              { label: 'Feedback to SIM Kerjasama', text: 'agreement_realization and agreement_flags feed the Implementation tab and the "no activity yet" flag.' },
            ],
          }} />
        }
      />

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-ring-bl">
        <div className="wrap">
          <Card
            tone="theme"
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

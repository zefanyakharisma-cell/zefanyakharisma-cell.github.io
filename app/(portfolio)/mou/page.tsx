import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Archive, BarChart2, Bell, Building, CheckSquare, ClipboardCheck, FileCheck, FilePen, Handshake, PenTool, RefreshCw, ShieldCheck, Zap } from 'lucide-react'
import { Button, Card, Details, FlipCard, PageHero, Reveal, SectionHead, Shape, Stat, StatusFlow } from '@/components/pcu'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { SubNav } from '@/components/pcu/SubNav'
import { stats } from '@/lib/data/profile'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'
import { pageMeta } from '@/lib/og'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = pageMeta('/mou', {
  title: 'MoU and MoA Lifecycle: Draft to Renewal',
  description: `How MoUs and MoAs are coordinated at Petra Christian University, Indonesia: ${stats.agreementsPerMonth} reviewed a month for compliance and fit, in 8 stages from draft to archive.`,
})

const framework = [
  { icon: <FileCheck aria-hidden />, title: 'Drafting', back: 'Scope, objectives and mutual commitments, written clearly.' },
  { icon: <CheckSquare aria-hidden />, title: 'Compliance', back: 'Checked against policy; approved by the right authority.' },
  { icon: <RefreshCw aria-hidden />, title: 'Renewal', back: 'Renewals, amendments and updates as priorities change.' },
  { icon: <BarChart2 aria-hidden />, title: 'Activation', back: 'Both sides deliver on what they signed.' },
]

const lifecycle = [
  { icon: <FilePen size={20} aria-hidden />, title: 'Draft', text: 'Scope and commitments written up.' },
  { icon: <Building size={20} aria-hidden />, title: 'Faculty', text: 'The proposing faculty reviews fit.' },
  { icon: <ShieldCheck size={20} aria-hidden />, title: 'Approval', text: 'Dean to Rector, enforced in order.' },
  { icon: <Handshake size={20} aria-hidden />, title: 'Partner', text: 'The partner reviews the final text.' },
  { icon: <PenTool size={20} aria-hidden />, title: 'Signature', text: 'Signed by both institutions.' },
  { icon: <Zap size={20} aria-hidden />, title: 'Active', text: 'Programs run under the agreement.' },
  { icon: <RefreshCw size={20} aria-hidden />, title: 'Renewal', text: 'Renewed on evaluation evidence.' },
  { icon: <Archive size={20} aria-hidden />, title: 'Archived', text: 'Closed, kept on record.' },
]

const tiers = [
  { n: '1', title: 'International Office & Rector’s Secretariat', text: 'The head of the International Office and the head of the Rector’s Secretariat review the document first.' },
  { n: '2', title: 'Deans and unit heads', text: 'The deans and heads of the programmes and units involved confirm the fit with their own plans.' },
  { n: '3', title: 'Vice Rectors and Rector', text: 'Leadership approves in parallel. Only then does the document reach Disetujui (approved).' },
]

const renewal = [
  { icon: <Bell aria-hidden />, title: 'Six months ahead', back: 'Renewal reminders start six months before the end date, not when the agreement has already lapsed.' },
  { icon: <ClipboardCheck aria-hidden />, title: 'Two evaluations', back: 'One from the PETRA unit that owns the partnership, one from the partner via an official link, no account needed.' },
  { icon: <Activity aria-hidden />, title: 'Activity as evidence', back: 'Verified activities across the renewal chain sit beside the evaluations; active agreements with none get a “no activity yet” flag.' },
]

export default function MouPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/mou" />
      <PageHero
        image={{ src: '/assets/images/student-services/monev-tias/img-4590.jpg' }}
        eyebrow="Agreement management"
        title="MoU / MoA coordination"
        lead={`${stats.agreementsPerMonth} memoranda of understanding and of agreement (MoU and MoA) reviewed a month at Petra Christian University (PETRA).`}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.agreementsPerMonth} label="Agreements reviewed a month" />
          <Stat value={stats.partners} label="Partners managed" />
          <Stat value="40+" label="Active agreements" />
          <Stat value="24h" label="Minutes turnaround" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead
            eyebrow="Lifecycle"
            title="Eight stages, draft to archive"
            lead={<>The signature stage has its own <Link href="/signing">MoU and MoA signing process</Link>; every stage is now recorded in <Link href="/sim-kerjasama">SIM Kerjasama</Link>.</>}
          />
          <Lifecycle steps={lifecycle} label="MoU and MoA lifecycle" />
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Framework" title="Four jobs per agreement" lead="Tap a card." />
          <div className="grid-4">{framework.map(f => <FlipCard key={f.title} {...f} />)}</div>
        </div>
      </section>

      <section className="section decor-glow-br">
        <div className="wrap">
          <SectionHead
            eyebrow="Approval"
            title="Three tiers, enforced in order"
            lead="Once the proposing faculty has drafted the scope, approval runs through the university hierarchy. SIM Kerjasama enforces the order in software."
          />
          <div className="grid-3">
            {tiers.map((t, i) => (
              <Reveal key={t.n} delay={i * 60} className="h-full">
                <Card className="h-full">
                  <span className="font-bold text-amber tabular-nums text-2xl">{t.n.padStart(2, '0')}</span>
                  <h3 className="!text-lg m-0">{t.title}</h3>
                  <p className="m-0 text-ink-secondary">{t.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <h3 className="!text-lg mt-10 mb-4">What an approver can do</h3>
          <StatusFlow main={['Approve']} side={['Revise', 'Hold', 'Reject']} sideLabel="Or" label="Approver options" />
          <p className="mt-3 mb-0 text-sm muted max-w-[70ch]">
            A revision comes back with a note; time on hold is not counted against the approver. Lock the text before approval starts: any change
            afterwards restarts the chain.
          </p>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Renewal" title="Renewed on evidence, not by default" lead="An agreement is only worth what is carried out under it. Tap a card." />
          <div className="grid-3">{renewal.map(r => <FlipCard key={r.title} {...r} />)}</div>
          <Details summary="Why dormant agreements matter" className="mt-6">
            Partnerships count toward accreditation, RENSTRA indicators and rankings, and an agreement with nothing carried out under it is
            visible as dormant. Renewal opens when both evaluations recommend continuing, so the best preparation is a record of activity.
          </Details>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-glow-br">
        <div className="wrap">
          <Card
            tone="theme"
            className="!p-[clamp(28px,4vw,48px)]"
            bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6"
            shape={<Shape kind="ring-n-line" color="white" className="w-[220px] right-[24%] bottom-0 opacity-70" />}
          >
            <div className="flex flex-col gap-2 max-w-[60ch]">
              <span className="pcu-eyebrow text-amber">System of record</span>
              <h2 className="h-sub text-white">Now in SIM Kerjasama</h2>
              <Details light summary="What changed">
                Approval queues, SLA flags, proactive renewals with evaluations, and a clean partner dataset that other systems can trust.
              </Details>
            </div>
            <Button href="/sim-kerjasama" variant="accent">See SIM Kerjasama →</Button>
          </Card>
        </div>
      </section>
      <WritingAboutThis page="/mou" />
    </>
  )
}

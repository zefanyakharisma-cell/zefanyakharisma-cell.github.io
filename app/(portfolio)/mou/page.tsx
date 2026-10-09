import type { Metadata } from 'next'
import { Archive, BarChart2, Building, CheckSquare, FileCheck, FilePen, Handshake, PenTool, RefreshCw, ShieldCheck, Zap } from 'lucide-react'
import { Button, Card, Details, FlipCard, PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { SubNav } from '@/components/pcu/SubNav'
import { stats } from '@/lib/data/profile'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'MoU / MoA Coordination',
  alternates: { canonical: '/mou' },
  description: `Reviewing ${stats.agreementsPerMonth} partnership agreements a month at PETRA for compliance, institutional fit and timely processing.`,
}

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

export default function MouPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/student-services/monev-tias/img-4590.jpg' }}
        eyebrow="Agreement management"
        title="MoU / MoA coordination"
        lead={`${stats.agreementsPerMonth} agreements reviewed a month at PETRA.`}
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
          <SectionHead eyebrow="Lifecycle" title="Eight stages, draft to archive" />
          <Lifecycle steps={lifecycle} label="MoU and MoA lifecycle" />
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Framework" title="Four jobs per agreement" lead="Tap a card." />
          <div className="grid-4">{framework.map(f => <FlipCard key={f.title} {...f} />)}</div>
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

import type { Metadata } from 'next'
import { BarChart2, CheckSquare, FileCheck, RefreshCw } from 'lucide-react'
import { Button, Card, PageHero, SectionHead, Shape, Stat, Tag } from '@/components/pcu'
import { ProcessSteps } from '@/components/pcu/ProcessSteps'
import { SubNav } from '@/components/pcu/SubNav'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'MoU / MoA Coordination',
  alternates: { canonical: '/mou' },
  description: `Reviewing ${stats.agreementsPerMonth} partnership agreements a month at PCU for compliance, institutional fit and timely processing.`,
}

const framework = [
  { icon: FileCheck, title: 'Drafting & negotiation', text: 'Developing MoU/MoA documents that clearly define partnership scope, objectives and mutual commitments.' },
  { icon: CheckSquare, title: 'Compliance & approval', text: 'Checking every agreement against institutional policy and securing approvals from the right authorities.' },
  { icon: RefreshCw, title: 'Renewal & updates', text: 'Managing the agreement lifecycle: renewals, amendments and updates as partnership priorities change.' },
  { icon: BarChart2, title: 'Monitoring & activation', text: 'Tracking implementation and making sure both parties meet their commitments and use the opportunities.' },
]

const lifecycle = ['Draft', 'Faculty review', 'Approval hierarchy', 'Partner review', 'Signature', 'Active', 'Renewal', 'Archived']

export default function MouPage() {
  return (
    <>
      <PageHero
        eyebrow="Agreement management"
        title="MoU / MoA coordination"
        lead={`Reviewing ${stats.agreementsPerMonth} partnership agreements a month at PCU, for compliance, institutional alignment and timely processing across a diverse global network.`}
      />
      <SubNav />

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.agreementsPerMonth} label="Agreements reviewed a month" />
          <Stat value={stats.partners} label="Partners managed" />
          <Stat value="40+" label="Active agreements" />
          <Stat value="24h" label="Meeting minutes turnaround" />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap">
          <SectionHead
            eyebrow="Coordination framework"
            title="How agreements are managed"
            lead="An end-to-end process that handles every MoU and MoA carefully, from first draft to activation and ongoing monitoring."
          />
          <ProcessSteps steps={framework} />
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead
            eyebrow="System of record"
            title="Now managed in SIM Kerjasama"
            lead="Every agreement moves through one lifecycle in SIM Kerjasama, with the approval hierarchy enforced in software and delays visible per approver."
          />
          <ol className="m-0 p-0 list-none flex flex-wrap items-center gap-2 mb-10" aria-label="Agreement lifecycle">
            {lifecycle.map((step, i) => (
              <li key={step} className="flex items-center gap-2">
                <Tag outline={i !== 0} className={i === 0 ? '' : 'text-midnight'}>{step}</Tag>
                {i < lifecycle.length - 1 && <span aria-hidden className="text-ink-muted">→</span>}
              </li>
            ))}
          </ol>
          <Card
            tone="midnight"
            className="!p-[clamp(28px,4vw,48px)]"
            bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6"
            shape={<Shape kind="ring-n" color="blue" className="w-[220px] right-[24%] bottom-0" />}
          >
            <div className="flex flex-col gap-2 max-w-[60ch]">
              <span className="pcu-eyebrow text-amber">Information system</span>
              <h2 className="h-sub text-white">SIM Kerjasama</h2>
              <p className="m-0 text-smoke">Approval queues, SLA flags, proactive renewals with evaluations, and a clean partner dataset that other systems can trust.</p>
            </div>
            <Button href="/sim-kerjasama" variant="accent">See SIM Kerjasama →</Button>
          </Card>
        </div>
      </section>
    </>
  )
}

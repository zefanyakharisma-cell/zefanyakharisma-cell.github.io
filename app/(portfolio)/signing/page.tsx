import type { Metadata } from 'next'
import { Camera, CheckSquare, FilePen, Handshake, Megaphone, PenTool, Route, Zap } from 'lucide-react'
import { Button, Card, Details, FlipCard, PageHero, PhotoWall, SectionHead, Shape, Stat, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { EngagementCards } from '@/components/projects/EngagementCards'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { engagements, engagementsOf } from '@/lib/data/engagements'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'MoU & MoA Signing Process',
  alternates: { canonical: '/signing' },
  description: 'How partnership agreements at PETRA get from final text to a signed, published and active MoU or MoA: documents, approvals, ceremony and activation.',
}

const signings = engagementsOf('signing')
/** Every documented event where an agreement was signed, including program launches. */
const signedEvents = engagements.filter(e => e.kind === 'signing' || e.id === 'drone-academy')

const steps = [
  { icon: <FilePen size={20} aria-hidden />, title: 'Final text', text: 'Lock the agreed text with the partner, in both languages where needed.' },
  { icon: <CheckSquare size={20} aria-hidden />, title: 'Approval', text: 'Route through the proposing unit, legal review and leadership, in order.' },
  { icon: <Route size={20} aria-hidden />, title: 'Logistics', text: 'Set the date, signatories, venue, run of show and the copies to be signed.' },
  { icon: <Handshake size={20} aria-hidden />, title: 'Ceremony', text: 'Host the delegation, run the program and guide signatories through each copy.' },
  { icon: <PenTool size={20} aria-hidden />, title: 'Signed', text: 'Originals checked, exchanged and archived; scans filed the same day.' },
  { icon: <Megaphone size={20} aria-hidden />, title: 'Publication', text: 'Photos and news shared with the partner and PETRA communications.' },
  { icon: <Zap size={20} aria-hidden />, title: 'Activation', text: 'Recorded in SIM Kerjasama and handed to the units that will run the activities.' },
]

const jobs = [
  { icon: <FilePen aria-hidden />, title: 'Documents', back: 'Final text, signing copies, signatory names and titles, all checked before the day.' },
  { icon: <Route aria-hidden />, title: 'Coordination', back: 'Partner, leadership, faculties, protocol and media aligned on one run of show.' },
  { icon: <Camera aria-hidden />, title: 'The moment', back: 'Backdrop, seating, signing order and the photo that both institutions will publish.' },
  { icon: <Zap aria-hidden />, title: 'After the ink', back: 'Archived, recorded and handed over, so the agreement turns into activities.' },
]

export default function SigningPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/partnerships/signings/pgpi-2.jpg' }}
        eyebrow="Partnerships · PETRA"
        title="MoU & MoA signing process"
        lead="From approved text to a signed agreement that is ready to use."
        aside={<Stat amber value={stats.agreementsPerMonth} label="Agreements reviewed a month" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.agreementsPerMonth} label="Agreements reviewed a month" />
          <Stat value={String(signedEvents.length)} label="Signing ceremonies documented" />
          <Stat value="7" label="Steps, text to activation" />
          <Stat value={stats.partners} label="Partners managed" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="The process" title="Seven steps, final text to activation" />
          <Lifecycle steps={steps} label="MoU and MoA signing process" />
          <Details className="mt-6">
            A signing is the visible moment of a long process. Behind it I make sure the text is final, every approval is in place, the
            signatories and copies are right, and that the agreement is recorded and handed over the same week, so it does not sit in a drawer.
          </Details>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Signed in 2026" title="Agreements I brought to signature" />
          <EngagementCards items={signings} />
        </div>
      </section>

      <section className="section decor-glow-br">
        <div className="wrap">
          <SectionHead eyebrow="My part" title="Four jobs per signing" lead="Tap a card." />
          <div className="grid-4">{jobs.map(j => <FlipCard key={j.title} {...j} />)}</div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="Signing ceremonies" />
          <PhotoWall images={signedEvents.flatMap(e => e.photos.map(p => p.src))} alt="MoU and MoA signing ceremonies at PETRA" />
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <Card
            tone="theme"
            className="!p-[clamp(28px,4vw,48px)]"
            bodyClassName="!flex-row flex-wrap justify-between items-center !gap-6"
            shape={<Shape kind="ring-n-line" color="white" className="w-[220px] right-[24%] bottom-0 opacity-70" />}
          >
            <div className="flex flex-col gap-2 max-w-[60ch]">
              <span className="pcu-eyebrow text-amber">Before and after the signing</span>
              <h2 className="h-sub text-white">The full agreement lifecycle</h2>
              <p className="m-0 text-white/85">Drafting, compliance, renewal and the system that tracks every agreement.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href="/mou" variant="inverse">MoU / MoA lifecycle</Button>
              <Button href="/sim-kerjasama" variant="accent">SIM Kerjasama →</Button>
            </div>
          </Card>
        </div>
      </section>
      <ThemeBand eyebrow="For the university" value={stats.partners} label="Partners supported across PETRA's faculties and units" cta={{ href: '/university-support', label: 'University support' }} />
    </>
  )
}

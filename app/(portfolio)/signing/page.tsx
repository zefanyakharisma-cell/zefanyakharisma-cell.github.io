import type { Metadata } from 'next'
import Link from 'next/link'
import { Archive, Camera, CheckSquare, FilePen, FileText, Handshake, Megaphone, PenTool, Route, Timer, Undo2, Zap } from 'lucide-react'
import { Button, Card, Details, FlipCard, PageHero, PhotoWall, Reveal, SectionHead, Shape, Stat, StatusFlow, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { EngagementCards } from '@/components/projects/EngagementCards'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { engagements, engagementsOf } from '@/lib/data/engagements'
import { stats } from '@/lib/data/profile'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'
import { pageMeta } from '@/lib/og'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = pageMeta('/signing', {
  title: 'MoU & MoA Signing Process at PETRA',
  description: `How an MoU or MoA at Petra Christian University, Indonesia, goes from final text to a signed, active agreement in 7 steps, with ${stats.agreementsPerMonth} reviewed a month.`,
})

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

const kinds = [
  { icon: <FileText aria-hidden />, title: 'MoU · nota kesepahaman', text: 'A framework. It records that two institutions intend to work together and names the broad areas: student exchange, research, staff development, curriculum.' },
  { icon: <FilePen aria-hidden />, title: 'MoA · perjanjian kerja sama', text: 'Specific. It usually sits under an MoU, or stands alone with a narrower scope, and sets out the activities, the units responsible and what each side commits.' },
]

const fixes = [
  { icon: <Timer aria-hidden />, title: 'A clock on every approval', back: 'Business days counted from when a tier opens. Yellow at 2 days, red at 4: nobody is blamed, the delay is just visible.' },
  { icon: <Undo2 aria-hidden />, title: 'More than yes or no', back: 'A revise option with a note keeps a document moving instead of sitting with an unsure approver.' },
  { icon: <Archive aria-hidden />, title: 'Signed elsewhere, still recorded', back: 'Agreements signed abroad or at events are recorded directly, so they can still be activated and renewed.' },
]

const weekOf = [
  'Final text confirmed in writing by both sides',
  'Approval trail complete and in order',
  'Signatory names, titles and order of signing checked against the text',
  'Copies printed, checked and in signing order',
  'Run of show shared with the partner, protocol and media',
  'Photographer briefed on the one photo both institutions need',
  'Same day: originals archived, scans filed',
  'Same week: agreement active in SIM Kerjasama, handed to the implementing units, news shared',
]

export default function SigningPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/signing" />
      <PageHero
        image={{ src: '/assets/images/partnerships/signings/pgpi-2.jpg' }}
        eyebrow="Partnerships · PETRA"
        title="MoU & MoA signing process"
        lead="How a memorandum of understanding (MoU) or memorandum of agreement (MoA) at Petra Christian University (PETRA) goes from approved text to a signed agreement that is ready to use."
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
            A signing is the visible moment of a long process, which often starts at a{' '}
            <Link href="/strategic-meetings">strategic partner meeting</Link> and goes through{' '}
            <Link href="/mou">MoU and MoA review and coordination</Link>. Behind it I make sure the text is final, every approval is in place, the
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

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="What is being signed" title="MoU or MoA?" lead="An MoU opens the door; an MoA says who walks through it and when." />
          <div className="grid-2 !gap-6">
            {kinds.map((k, i) => (
              <Reveal key={k.title} delay={i * 60} className="h-full">
                <Card className="h-full">
                  <span className="text-accent-strong">{k.icon}</span>
                  <h3 className="!text-xl m-0">{k.title}</h3>
                  <p className="m-0 text-ink-secondary">{k.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <p className="mt-6 mb-8 text-ink-secondary max-w-[70ch]">
            Activities under either are documented with an Implementation Arrangement (IA) and reported with an Implementation Report (IR).
          </p>
          <h3 className="!text-lg mb-4">In SIM Kerjasama, the signing path</h3>
          <StatusFlow main={['Disetujui', 'Siap TTD', 'Aktif']} label="Agreement statuses along the signing path" />
          <p className="mt-3 mb-0 text-sm muted">Approved when every tier has signed off, ready to sign at the ceremony, active once the signed file is uploaded.</p>
        </div>
      </section>

      <section className="section decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="Keeping it moving" title="Where agreements stall, and what helps" lead="Before SIM Kerjasama, nobody could say where a document was. Three habits, now built into the system. Tap a card." />
          <div className="grid-3">{fixes.map(f => <FlipCard key={f.title} {...f} />)}</div>
          <Details summary="Checklist for the week of a signing" className="mt-6">
            <ul className="m-0 pl-5 flex flex-col gap-1.5">
              {weekOf.map(c => <li key={c}>{c}</li>)}
            </ul>
          </Details>
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
      <WritingAboutThis page="/signing" />
      <ThemeBand eyebrow="For the university" value={stats.partners} label="Partners supported across PETRA's faculties and units" cta={{ href: '/university-support', label: 'University support' }} />
    </>
  )
}

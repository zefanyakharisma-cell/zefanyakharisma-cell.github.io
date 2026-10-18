import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, CalendarCheck, ClipboardList, FileText, Gift, Languages, ListChecks, MailOpen, Presentation, Send, UserCheck, Users } from 'lucide-react'
import { Card, Details, FlipCard, PageHero, PhotoWall, Reveal, SectionHead, Stat, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { EngagementCards } from '@/components/projects/EngagementCards'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { engagementsOf } from '@/lib/data/engagements'
import { stats } from '@/lib/data/profile'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'
import { pageMeta } from '@/lib/og'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = pageMeta('/strategic-meetings', {
  title: 'Strategic Partner Meetings at PETRA',
  description: `How I arrange ${stats.meetingsPerMonth} strategic partnership meetings a month at Petra Christian University, from visit request and briefing to minutes within 24 hours.`,
})

const meetings = engagementsOf('meeting')
const countries = new Set(meetings.map(m => m.country)).size

const steps = [
  { icon: <MailOpen size={20} aria-hidden />, title: 'Request', text: 'Receive or initiate the visit request and confirm purpose, delegation and date.' },
  { icon: <ClipboardList size={20} aria-hidden />, title: 'Agenda', text: 'Agree the agenda with the partner and the PETRA units that should be at the table.' },
  { icon: <FileText size={20} aria-hidden />, title: 'Briefing', text: 'Brief PETRA leaders on the partner: profile, existing agreements and what each side wants.' },
  { icon: <CalendarCheck size={20} aria-hidden />, title: 'Protocol', text: 'Room, seating, presentations, souvenirs and campus tour, ready before the delegation arrives.' },
  { icon: <Presentation size={20} aria-hidden />, title: 'Meeting', text: 'Host and facilitate the discussion, keeping it on agenda and on time.' },
  { icon: <ListChecks size={20} aria-hidden />, title: 'Minutes', text: 'Minutes delivered within 24 hours, with owners and dates for every action.' },
  { icon: <Send size={20} aria-hidden />, title: 'Follow-up', text: 'Thank-you letters, document exchange and next steps toward an MoU or program.' },
]

const skills = [
  { icon: <Users aria-hidden />, title: 'Stakeholder alignment', back: 'The right faculties, units and leaders in the room, each briefed on what to bring.' },
  { icon: <Languages aria-hidden />, title: 'Cross-cultural communication', back: 'English–Indonesian facilitation and partner etiquette for delegations from abroad.' },
  { icon: <UserCheck aria-hidden />, title: 'Diplomatic protocol', back: 'Order of speakers, seating, gifts and photos handled the way each partner expects.' },
  { icon: <ListChecks aria-hidden />, title: 'Follow-through', back: 'A meeting only counts if it moves: 24-hour minutes and tracked actions.' },
]

const visitTips = [
  { icon: <Users aria-hidden />, title: 'Names and titles, early', text: 'Send the delegation list ahead, so the right people are invited from the PETRA side.' },
  { icon: <ClipboardList aria-hidden />, title: 'Agenda agreed', text: 'Agree the agenda in advance, including which faculties should be at the table.' },
  { icon: <BookOpen aria-hidden />, title: 'A specific proposal', text: 'Bring a short institutional profile and the programme you want to start with.' },
  { icon: <Gift aria-hidden />, title: 'Formal protocol', text: 'Expect an order of speakers, seating, a souvenir exchange and a group photo. It matters here.' },
]

export default function StrategicMeetingsPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/strategic-meetings" />
      <PageHero
        image={{ src: '/assets/images/partnerships/meetings/formosa-2.jpg' }}
        eyebrow="Partnerships · PETRA"
        title="Strategic meeting arrangements"
        lead="From the first email to the minutes, every partner visit to Petra Christian University (PETRA) run end to end."
        aside={<Stat amber value={stats.meetingsPerMonth} label="Strategic meetings a month" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.meetingsPerMonth} label="Meetings a month" />
          <Stat value="24h" label="Minutes turnaround" />
          <Stat value={String(meetings.length)} label="Delegations documented here" />
          <Stat value={String(countries)} label="Countries and territories" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead
            eyebrow="How I run a meeting"
            title="Seven steps, request to follow-up"
            lead={<>Where much of <Link href="/partnerships">partnership development</Link> starts, and often the first step toward an <Link href="/signing">MoU or MoA signing</Link>.</>}
          />
          <Lifecycle steps={steps} label="How I arrange a strategic meeting" />
          <Details className="mt-6">
            A partner visit is often the first time two institutions meet in person. I treat it as the start of the partnership, not an event:
            everyone at the table is briefed, the conversation has a clear goal, and the minutes turn into actions that someone owns.
          </Details>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Recent delegations" title="Meetings I arranged" lead="Partner visits hosted at PETRA in 2026." />
          <EngagementCards items={meetings} />
        </div>
      </section>

      <section className="section decor-glow-br">
        <div className="wrap">
          <SectionHead eyebrow="What it takes" title="Four skills in every meeting" lead="Tap a card." />
          <div className="grid-4">{skills.map(s => <FlipCard key={s.title} {...s} />)}</div>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead
            eyebrow="For visiting delegations"
            title="Before you visit"
            lead="Four things that make a first meeting at PETRA move faster."
          />
          <div className="grid-4">
            {visitTips.map((t, i) => (
              <Reveal key={t.title} delay={i * 60} className="h-full">
                <Card className="h-full">
                  <span className="text-accent-strong">{t.icon}</span>
                  <h3 className="!text-lg m-0">{t.title}</h3>
                  <p className="m-0 text-ink-secondary">{t.text}</p>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="grid-2 !gap-x-12 !gap-y-2 mt-8">
            <Details summary="What the 24-hour minutes contain">
              Minutes go out within 24 hours, with an owner and a date for every action. Ask your counterpart for the same after every
              meeting: it is the clearest sign a partnership is moving.
            </Details>
            <Details summary="From meeting to MoU">
              Follow-up starts the day after: thank-you letters, an exchange of documents and the next step, often a draft MoU or MoA that then
              goes through <Link href="/mou">review and approval</Link>.
            </Details>
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="On the day" />
          <PhotoWall images={meetings.flatMap(m => m.photos.map(p => p.src))} alt="Strategic partnership meetings at PETRA" />
        </div>
      </section>
      <WritingAboutThis page="/strategic-meetings" />
      <ThemeBand eyebrow="From meeting to agreement" value={stats.agreementsPerMonth} label="MoU and MoA reviews a month" cta={{ href: '/signing', label: 'MoU & MoA signing' }} />
    </>
  )
}

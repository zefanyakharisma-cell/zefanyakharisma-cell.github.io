import type { Metadata } from 'next'
import { CalendarCheck, ClipboardList, FileText, Languages, ListChecks, MailOpen, Presentation, Send, UserCheck, Users } from 'lucide-react'
import { Details, FlipCard, PageHero, PhotoWall, SectionHead, Stat, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { EngagementCards } from '@/components/projects/EngagementCards'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { engagementsOf } from '@/lib/data/engagements'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'Strategic Meeting Arrangements',
  alternates: { canonical: '/strategic-meetings' },
  description: `Arranging ${stats.meetingsPerMonth} strategic partnership meetings a month at PETRA, from invitation to minutes and follow-up, with universities and institutions abroad.`,
}

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

export default function StrategicMeetingsPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/partnerships/meetings/formosa-2.jpg' }}
        eyebrow="Partnerships · PETRA"
        title="Strategic meeting arrangements"
        lead="From the first email to the minutes, every partner visit run end to end."
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
          <SectionHead eyebrow="How I run a meeting" title="Seven steps, request to follow-up" />
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

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="On the day" />
          <PhotoWall images={meetings.flatMap(m => m.photos.map(p => p.src))} alt="Strategic partnership meetings at PETRA" />
        </div>
      </section>
      <ThemeBand eyebrow="From meeting to agreement" value={stats.agreementsPerMonth} label="MoU and MoA reviews a month" cta={{ href: '/signing', label: 'MoU & MoA signing' }} />
    </>
  )
}

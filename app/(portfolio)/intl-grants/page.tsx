import type { Metadata } from 'next'
import {
  Award, Bookmark, Calendar, CheckCircle, ClipboardList, Flag, GitMerge, Layers, Megaphone, PieChart, Plane, Search, Send, UploadCloud, Users, Zap,
} from 'lucide-react'
import { Details, FlipCard, PageHero, SectionHead, Shape, Tag } from '@/components/pcu'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { SubNav } from '@/components/pcu/SubNav'

export const metadata: Metadata = {
  title: 'International Grants Management',
  alternates: { canonical: '/intl-grants' },
  description: 'A system to inform, maintain and execute international grants at Petra Christian University: a digital dashboard and a physical operational workflow.',
}

const pipeline = [
  { icon: <Megaphone size={20} aria-hidden />, title: 'Awareness', text: 'Students hear about grants before deadlines pass.' },
  { icon: <Send size={20} aria-hidden />, title: 'Application', text: 'Checklists and reviews for complete applications.' },
  { icon: <Award size={20} aria-hidden />, title: 'Selection', text: 'Each applicant tracked by stage, per cycle.' },
  { icon: <Plane size={20} aria-hidden />, title: 'Placement', text: 'Coordinated with partners and funders.' },
  { icon: <Flag size={20} aria-hidden />, title: 'Completion', text: 'Outcomes recorded and reported.' },
]

const principles = [
  { icon: <Layers aria-hidden />, title: 'Digital + physical', back: 'Dashboard as backbone; briefings and advising make it work.' },
  { icon: <Zap aria-hidden />, title: 'Live status', back: 'Every grant, applicant and stage, updated live.' },
  { icon: <Calendar aria-hidden />, title: 'Deadline-first', back: 'All deadlines sorted by urgency.' },
  { icon: <GitMerge aria-hidden />, title: 'Stage pipeline', back: 'Bottlenecks and follow-ups are obvious.' },
]

const dashboard = [
  { icon: <Search aria-hidden />, title: 'Matching', back: 'Faculty and programme matched to eligibility.' },
  { icon: <Bookmark aria-hidden />, title: 'Bookmarks', back: 'Saved grants, synced across devices.' },
  { icon: <UploadCloud aria-hidden />, title: 'Attachments', back: 'PDFs and forms per grant, with an audit trail.' },
  { icon: <PieChart aria-hidden />, title: 'Analytics', back: 'Acceptance, funding and placements, live.' },
]

const physical = [
  { icon: <Megaphone size={20} aria-hidden />, title: 'Inform', text: 'Briefings, printed guides and faculty outreach.' },
  { icon: <ClipboardList size={20} aria-hidden />, title: 'Maintain', text: 'A physical archive kept in step with the dashboard.' },
  { icon: <Users size={20} aria-hidden />, title: 'Guide', text: 'In-person advising and application reviews.' },
  { icon: <CheckCircle size={20} aria-hidden />, title: 'Execute', text: 'Placement and support after selection.' },
]

export default function IntlGrantsPage() {
  return (
    <>
      <PageHero
        eyebrow="International Education · PCU"
        tags={['In development']}
        title="International grants management"
        lead="One dashboard and one physical workflow for every grant."
      />
      <SubNav />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Pipeline" title="Five stages per grant" />
          <Lifecycle steps={pipeline} label="International grant pipeline" />
          <Details summary="Why it's being built" className="mt-6">
            Grant information at PCU was spread across emails, shared drives and spreadsheets. The system gives faculty, staff and students one
            source of truth: a digital dashboard that tracks every grant, applicant and deadline, and a physical workflow that keeps students
            informed and supported through each cycle.
          </Details>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Principles" title="Four design rules" lead="Tap a card." />
          <div className="grid-4">{principles.map(p => <FlipCard key={p.title} {...p} />)}</div>
        </div>
      </section>

      <section className="pcu-surface-brand section relative overflow-hidden">
        <Shape kind="ring-u" color="teal" className="w-[280px] right-[4%] top-0" />
        <div className="wrap relative">
          <SectionHead light eyebrow="Digital" title="The dashboard" />
          <div className="grid-4">{dashboard.map(d => <FlipCard key={d.title} {...d} tone="midnight" />)}</div>
          <div className="flex flex-wrap gap-2 mt-10">
            {['Live updates', 'Role-based access', 'Analytics', 'Audit trail'].map(t => <Tag key={t} outline className="text-white">{t}</Tag>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Physical" title="Beyond the dashboard" />
          <Lifecycle steps={physical} label="Physical grant workflow" />
        </div>
      </section>
    </>
  )
}

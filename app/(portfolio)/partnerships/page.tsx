import type { Metadata } from 'next'
import Link from 'next/link'
import { Activity, Award, BarChart2, BookOpen, CalendarCheck, FilePen, Handshake, Layers, Mail, Microscope, PenTool, RefreshCw, Search, ShieldCheck, TrendingUp, Trophy, Users, FileCheck } from 'lucide-react'
import { BarList, Details, FlipCard, PageHero, SectionHead, Stat, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { Lifecycle } from '@/components/viz/Lifecycle'
import PartnerExplorer from '@/components/projects/PartnerExplorer'
import { CITY_COORDS } from '@/lib/data/cities'
import { CONTINENT, countBy, DOM_DATA, INTL_DATA } from '@/lib/data/partners'
import { stats } from '@/lib/data/profile'
import { buildIndonesiaMap, buildWorldMap } from '@/lib/geo'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'
import { pageMeta } from '@/lib/og'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = pageMeta('/partnerships', {
  title: 'University Partnership Development',
  description: 'International and domestic partnership development at Petra Christian University (PETRA), Surabaya: 505+ partners in 32 countries and 52 Indonesian cities.',
})

const enables = [
  { icon: <BookOpen aria-hidden />, title: 'Student exchange', back: 'Semester abroad, dual-degree and degree-level mobility.' },
  { icon: <Microscope aria-hidden />, title: 'Research', back: 'Joint projects and interdisciplinary initiatives.' },
  { icon: <Users aria-hidden />, title: 'Faculty development', back: 'Teaching capacity, research mentoring and professional growth.' },
  { icon: <Layers aria-hidden />, title: 'Curriculum', back: 'Joint program design and curriculum internationalisation.' },
]

const approach = [
  { icon: <Search size={20} aria-hidden />, title: 'Identify', text: "Find institutions aligned with PETRA's mission and strengths, with due diligence." },
  { icon: <Handshake size={20} aria-hidden />, title: 'Negotiate', text: 'Build the relationship and agree terms that benefit both sides.' },
  { icon: <FileCheck size={20} aria-hidden />, title: 'Develop', text: 'Co-design exchange, research and joint curriculum programs.' },
  { icon: <TrendingUp size={20} aria-hidden />, title: 'Grow', text: 'Implement, monitor and keep the partnership active.' },
]

const counted = [
  { icon: <Award aria-hidden />, title: 'Accreditation', back: 'Valid agreements are evidence for national accreditation by BAN-PT and the subject-level LAM bodies.' },
  { icon: <BarChart2 aria-hidden />, title: 'Strategic plan', back: "Partnership activity feeds the university's RENSTRA indicators, reported every semester." },
  { icon: <Trophy aria-hidden />, title: 'Rankings', back: 'Counts of international partners and countries go into ranking submissions such as QS and THE.' },
  { icon: <Activity aria-hidden />, title: 'Activity', back: 'Signing is not enough: an agreement with nothing carried out under it shows up as dormant.' },
]

const guide = [
  { icon: <Mail size={20} aria-hidden />, title: 'First contact', text: 'Say who you are, which faculty or programme you want to work with, and what you would like to do in year one.' },
  { icon: <Users size={20} aria-hidden />, title: 'Meeting', text: 'In person or online, with delegation names and titles sent early and an agenda agreed in advance.' },
  { icon: <FilePen size={20} aria-hidden />, title: 'MoU or MoA', text: 'An MoU for a general framework; an MoA, or both together, if you already know the activity and the faculty.' },
  { icon: <ShieldCheck size={20} aria-hidden />, title: 'Approval', text: 'The agreed text goes through three internal tiers in order. Lock it first: any change restarts the chain.' },
  { icon: <PenTool size={20} aria-hidden />, title: 'Signing', text: 'At a ceremony during a visit or by exchanging copies, followed by a photo and news both sides publish.' },
  { icon: <CalendarCheck size={20} aria-hidden />, title: 'First activity', text: 'Agree it, with a date, at signing: a guest lecture, a short visit or a few exchange nominations.' },
  { icon: <RefreshCw size={20} aria-hidden />, title: 'Renewal', text: 'Reminders start six months before the end date; renewal needs an evaluation from both sides.' },
]

const checklist = [
  'Name the faculty and the first-year activity in your first email',
  'Send delegation names and titles early',
  'Ask for minutes and agreed actions after each meeting',
  'Choose MoU, MoA, or both, based on how specific you are',
  'Lock the text before it enters approval',
  'Agree the first activity at signing',
  "Keep track of what you do together; you'll be asked to evaluate it",
]

export default function PartnershipsPage() {
  const world = buildWorldMap(countBy(INTL_DATA, p => p.country))
  const indonesia = buildIndonesiaMap(countBy(DOM_DATA, p => p.city), CITY_COORDS)
  const continents = Object.entries(countBy(INTL_DATA, p => CONTINENT[p.country] ?? 'Other')).sort((a, b) => b[1] - a[1])
  const types = Object.entries(countBy(DOM_DATA, p => p.type)).sort((a, b) => b[1] - a[1])

  return (
    <>
      <BreadcrumbJsonLd path="/partnerships" />
      <PageHero
        image={{ src: '/assets/images/student-services/tailor-made/ljmu-unair-2.jpg' }}
        eyebrow="Global partnerships"
        title="Partnership development"
        lead={`${stats.partners} partners managed at Petra Christian University (PETRA), ${stats.meetingsPerMonth} meetings a month.`}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value="505+" label="Partners at PETRA" />
          <Stat value="32" label="Countries" />
          <Stat value="52" label="Indonesian cities" />
          <Stat value={stats.meetingsPerMonth} label="Meetings a month" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="Explore" title="The network, mapped" />
          <PartnerExplorer world={world} indonesia={indonesia} />
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap grid-2 !gap-12 items-start">
          <div className="pcu-card">
            <h3 className="!text-xl mb-5">International, by region</h3>
            <BarList caption="International partners by region" bars={continents.map(([k, v]) => ({ key: k, label: k, value: v }))} />
          </div>
          <div className="pcu-card">
            <h3 className="!text-xl mb-5">Domestic, by type</h3>
            <BarList caption="Domestic partners by type" bars={types.map(([k, v]) => ({ key: k, label: k, value: v, color: '#3880d0' }))} />
          </div>
        </div>
      </section>

      <section className="section decor-glow-br">
        <div className="wrap">
          <SectionHead eyebrow="What they enable" title="Four kinds of value" />
          <div className="grid-4">
            {enables.map(e => <FlipCard key={e.title} icon={e.icon} title={e.title} back={e.back} />)}
          </div>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead
            eyebrow="Why it matters here"
            title="Partnerships are counted"
            lead="Indonesian universities partner for exchange, research, faculty development and curriculum, like yours. They also have to show it. Tap a card."
          />
          <div className="grid-4">{counted.map(c => <FlipCard key={c.title} {...c} />)}</div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-ring-bl">
        <div className="wrap">
          <SectionHead
            eyebrow="My approach"
            title="Four phases"
            lead={<>Most partnerships start with a <Link href="/strategic-meetings">strategic partner meeting</Link> and become formal through the <Link href="/signing">MoU and MoA signing process</Link>.</>}
          />
          <Lifecycle steps={approach} label="How I build partnerships" />
          <Details className="mt-6">
            Every partnership moves from identification to growth. I evaluate fit with PETRA&apos;s academic strengths, negotiate terms that serve
            both institutions, co-design the programs that make the agreement real, and keep it active through monitoring and regular engagement.
          </Details>
        </div>
      </section>
      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead
            eyebrow="For international offices"
            title="Partnering with PETRA, in seven steps"
            lead="What to expect, from the first email to the first renewal. Other Indonesian universities differ in detail, but the shape is broadly the same."
          />
          <Lifecycle steps={guide} label="How to partner with PETRA" />
          <Details summary="A short checklist" className="mt-6">
            <ul className="m-0 pl-5 flex flex-col gap-1.5">
              {checklist.map(c => <li key={c}>{c}</li>)}
            </ul>
          </Details>
        </div>
      </section>
      <WritingAboutThis page="/partnerships" />
      <ThemeBand eyebrow="Where partnerships start" value={stats.meetingsPerMonth} label="Strategic meetings arranged a month" cta={{ href: '/strategic-meetings', label: 'Strategic meetings' }} />
    </>
  )
}

import type { Metadata } from 'next'
import { BookOpen, Handshake, Layers, Microscope, Search, TrendingUp, Users, FileCheck } from 'lucide-react'
import { BarList, Details, FlipCard, PageHero, SectionHead, Stat, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { Lifecycle } from '@/components/viz/Lifecycle'
import PartnerExplorer from '@/components/projects/PartnerExplorer'
import { CITY_COORDS } from '@/lib/data/cities'
import { CONTINENT, countBy, DOM_DATA, INTL_DATA } from '@/lib/data/partners'
import { stats } from '@/lib/data/profile'
import { buildIndonesiaMap, buildWorldMap } from '@/lib/geo'

export const metadata: Metadata = {
  title: 'Partnership Development',
  alternates: { canonical: '/partnerships' },
  description: 'PCU partnerships mapped: 505+ partners across 32 countries and 52 Indonesian cities.',
}

const enables = [
  { icon: <BookOpen aria-hidden />, title: 'Student exchange', back: 'Semester abroad, dual-degree and degree-level mobility.' },
  { icon: <Microscope aria-hidden />, title: 'Research', back: 'Joint projects and interdisciplinary initiatives.' },
  { icon: <Users aria-hidden />, title: 'Faculty development', back: 'Teaching capacity, research mentoring and professional growth.' },
  { icon: <Layers aria-hidden />, title: 'Curriculum', back: 'Joint program design and curriculum internationalisation.' },
]

const approach = [
  { icon: <Search size={20} aria-hidden />, title: 'Identify', text: "Find institutions aligned with PCU's mission and strengths, with due diligence." },
  { icon: <Handshake size={20} aria-hidden />, title: 'Negotiate', text: 'Build the relationship and agree terms that benefit both sides.' },
  { icon: <FileCheck size={20} aria-hidden />, title: 'Develop', text: 'Co-design exchange, research and joint curriculum programs.' },
  { icon: <TrendingUp size={20} aria-hidden />, title: 'Grow', text: 'Implement, monitor and keep the partnership active.' },
]

export default function PartnershipsPage() {
  const world = buildWorldMap(countBy(INTL_DATA, p => p.country))
  const indonesia = buildIndonesiaMap(countBy(DOM_DATA, p => p.city), CITY_COORDS)
  const continents = Object.entries(countBy(INTL_DATA, p => CONTINENT[p.country] ?? 'Other')).sort((a, b) => b[1] - a[1])
  const types = Object.entries(countBy(DOM_DATA, p => p.type)).sort((a, b) => b[1] - a[1])

  return (
    <>
      <PageHero
        eyebrow="Global partnerships"
        title="Partnership development"
        lead={`${stats.partners} partners managed, ${stats.meetingsPerMonth} meetings a month.`}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value="505+" label="Partners at PCU" />
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

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="My approach" title="Four phases" />
          <Lifecycle steps={approach} label="How I build partnerships" />
          <Details className="mt-6">
            Every partnership moves from identification to growth. I evaluate fit with PCU&apos;s academic strengths, negotiate terms that serve
            both institutions, co-design the programs that make the agreement real, and keep it active through monitoring and regular engagement.
          </Details>
        </div>
      </section>
      <ThemeBand eyebrow="Agreements" value={stats.agreementsPerMonth} label="MoU and MoA reviews a month" cta={{ href: '/mou', label: 'MoU / MoA coordination' }} />
    </>
  )
}

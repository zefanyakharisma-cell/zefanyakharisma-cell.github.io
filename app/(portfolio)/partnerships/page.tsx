import type { Metadata } from 'next'
import { BookOpen, Building2, FileCheck, Globe, Handshake, Layers, Microscope, Search, TrendingUp, Users } from 'lucide-react'
import { Card, IconBadge, PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { ProcessSteps } from '@/components/pcu/ProcessSteps'
import { SubNav } from '@/components/pcu/SubNav'
import PartnerDirectory from '@/components/projects/PartnerDirectory'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'Partnership Development',
  alternates: { canonical: '/partnerships' },
  description: 'Coordinating 505+ institutional partnerships across 32 countries and 52 Indonesian cities at Petra Christian University.',
}

const enables = [
  { icon: BookOpen, title: 'Student exchange', text: 'Semester abroad, dual-degree and degree-level mobility.' },
  { icon: Microscope, title: 'Research collaboration', text: 'Joint projects and interdisciplinary initiatives.' },
  { icon: Users, title: 'Faculty development', text: 'Teaching capacity, research mentoring and professional growth.' },
  { icon: Layers, title: 'Curriculum design', text: 'Joint program design and curriculum internationalisation.' },
]

const approach = [
  { icon: Search, title: 'Strategic identification', text: "Finding partner institutions aligned with PCU's mission and academic strengths, through evaluation and due diligence." },
  { icon: Handshake, title: 'Engagement & negotiation', text: 'Building relationships and negotiating terms that benefit both institutions and advance shared goals.' },
  { icon: FileCheck, title: 'Program development', text: 'Co-designing exchange programs, research collaborations and joint curriculum initiatives.' },
  { icon: TrendingUp, title: 'Activation & growth', text: 'Implementing programs, monitoring progress and growing the partnership through continuous engagement.' },
]

export default function PartnershipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Global partnerships"
        title="Partnership development"
        lead={`I manage ${stats.partners} institutional partners and facilitate ${stats.meetingsPerMonth} strategic meetings a month at Petra Christian University, building collaborations that create academic and global opportunity.`}
      />
      <SubNav />

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value="505+" label="Partners in PCU's portfolio" />
          <Stat value={stats.meetingsPerMonth} label="Strategic meetings a month" />
          <Stat value="32" label="Countries" />
          <Stat value="52" label="Indonesian cities" />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap">
          <SectionHead
            eyebrow="Partnership network"
            title="Institutional reach at PCU"
            lead="PCU's portfolio has two tracks: global academic institutions and domestic organisations across Indonesia. I help coordinate, manage and grow both."
          />
          <div className="grid-2">
            <Card tone="midnight" shape={<Shape kind="ring-u" color="blue" className="w-[200px] right-6 top-0" />}>
              <IconBadge icon={Globe} tone="aqua" />
              <span className="pcu-eyebrow text-amber">International</span>
              <h3 className="text-white !text-2xl">International partnerships</h3>
              <p className="text-smoke m-0">Academic institutions across Asia, Europe, North America and Australia.</p>
              <div className="grid grid-cols-3 gap-4 pt-4 mt-2 border-t border-white/20">
                {[['184', 'Institutions'], ['32', 'Countries'], ['4', 'Continents']].map(([n, l]) => (
                  <div key={l}><p className="m-0 text-3xl font-bold text-white">{n}</p><p className="m-0 text-sm text-smoke">{l}</p></div>
                ))}
              </div>
            </Card>
            <Card shape={<Shape kind="quarter-bl" color="teal" className="w-[110px] right-0 top-0" />}>
              <IconBadge icon={Building2} />
              <span className="pcu-eyebrow text-accent-strong">Domestic</span>
              <h3 className="!text-2xl">Domestic partnerships</h3>
              <p className="muted m-0">Industry, education, government and regional organisations, under MoU, MoA, IA/IR and strategic frameworks.</p>
              <div className="grid grid-cols-3 gap-4 pt-4 mt-2 border-t border-line">
                {[['321', 'Partners'], ['52', 'Cities'], ['5', 'Partner types']].map(([n, l]) => (
                  <div key={l}><p className="m-0 text-3xl font-bold">{n}</p><p className="m-0 text-sm muted">{l}</p></div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Collaboration areas" title="What the partnerships enable" />
          <div className="grid-4">
            {enables.map(e => (
              <Card key={e.title}>
                <IconBadge icon={e.icon} size={52} />
                <h3 className="!text-lg">{e.title}</h3>
                <p className="muted m-0 text-[.9375rem]">{e.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="My approach"
            title="How I build partnerships"
            lead="Four phases to identify, formalise and sustain collaborations, so every partnership creates lasting value for both sides."
          />
          <ProcessSteps steps={approach} />
        </div>
      </section>

      <PartnerDirectory />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Deeper breakdown" title="The network in numbers" size="sub" />
          <div className="grid-4 !gap-8">
            <Stat value="8" label="ASEAN nations with active agreements" />
            <Stat value="4" label="Continents: Asia, Europe, Americas, Oceania" />
            <Stat value="40+" label="Active MoU/MoA agreements, managed from draft to renewal" />
            <Stat value={stats.years} label="Years building the network" />
          </div>
        </div>
      </section>
    </>
  )
}

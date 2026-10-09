import type { Metadata } from 'next'
import { BarChart2, Building2, Coins, Compass, FileCheck, LayoutDashboard, MessagesSquare, Rocket } from 'lucide-react'
import { Button, FlipCard, PageHero, PhotoWall, Reveal, SectionHead, Stat, Tag, ThemeBand } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { EngagementCards } from '@/components/projects/EngagementCards'
import { engagementsOf } from '@/lib/data/engagements'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'University Support on Partnership',
  alternates: { canonical: '/university-support' },
  description: `How I support PETRA's faculties and units on partnership: finding partners, preparing agreements, hosting visits and launches, and the systems that track it all.`,
}

const launches = engagementsOf('support')

const areas = [
  { icon: <Compass aria-hidden />, title: 'Partner matching', back: 'Find institutions that fit a faculty’s plans, and open the first conversation.' },
  { icon: <FileCheck aria-hidden />, title: 'Agreement service', back: `${stats.agreementsPerMonth} MoU and MoA reviews a month for faculties and units, checked for compliance and fit.` },
  { icon: <MessagesSquare aria-hidden />, title: 'Visits and meetings', back: `${stats.meetingsPerMonth} strategic meetings a month arranged, hosted and followed up.` },
  { icon: <Rocket aria-hidden />, title: 'Launches and ceremonies', back: 'Partnership side of university launches and signings, from documents to the stage.' },
  { icon: <Coins aria-hidden />, title: 'Grant access', back: 'Collaborations that open the way to international grants for staff and students.' },
  { icon: <LayoutDashboard aria-hidden />, title: 'Systems of record', back: 'SIM Kerjasama and SIM Realisasi: one place for every agreement and its activities.' },
  { icon: <BarChart2 aria-hidden />, title: 'Reporting', back: 'Verified partnership activity turned into RENSTRA indicators and semester reports.' },
  { icon: <Building2 aria-hidden />, title: 'Unit liaison', back: 'One contact for faculties, leadership and partners, so nothing falls between offices.' },
]

const links = [
  { href: '/strategic-meetings', title: 'Strategic meetings', text: 'How each partner visit is arranged and followed up.' },
  { href: '/signing', title: 'MoU & MoA signing', text: 'From approved text to a signed, active agreement.' },
  { href: '/sim-kerjasama', title: 'SIM Kerjasama', text: 'The system of record for every PETRA agreement.' },
  { href: '/intl-grants', title: 'International grants', text: 'Finding, tracking and delivering grants.' },
]

export default function UniversitySupportPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/partnerships/support/drone-academy-2.jpg' }}
        eyebrow="Partnerships · PETRA"
        title="University support on partnership"
        lead="Helping faculties and units turn partners into programs."
        aside={<Stat amber value={stats.partners} label="Partners managed for the university" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.partners} label="Partners managed" />
          <Stat value={stats.agreementsPerMonth} label="Agreements reviewed a month" />
          <Stat value={stats.meetingsPerMonth} label="Meetings arranged a month" />
          <Stat value="2" label="Systems built for PETRA" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="What I contribute" title="Eight ways I support the university" lead="Tap a card." />
          <div className="grid-4">{areas.map(a => <FlipCard key={a.title} {...a} />)}</div>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Spotlight" title="PETRA Drone Academy launch" lead="A university program launched with partner agreements signed on stage." />
          <div className="grid gap-8 items-start lg:grid-cols-[minmax(280px,360px)_1fr]">
            <EngagementCards items={launches} />
            <PhotoWall images={launches.flatMap(e => e.photos.map(p => p.src))} alt="PETRA Drone Academy launch" />
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-glow-br">
        <div className="wrap">
          <SectionHead eyebrow="See the work" title="Where the support shows" />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,240px),1fr))]">
            {links.map((l, i) => (
              <Reveal key={l.href} delay={i * 60} className="pcu-card flex flex-col gap-3 h-full">
                <Tag outline>Read more</Tag>
                <h3 className="!text-xl m-0">{l.title}</h3>
                <p className="m-0 text-ink-secondary">{l.text}</p>
                <Button href={l.href} variant="outline" className="mt-auto self-start">Open →</Button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <ThemeBand eyebrow="Partner with PETRA" value={stats.partners} label="Partners and counting" cta={{ href: '/contact', label: 'Get in touch' }} />
    </>
  )
}

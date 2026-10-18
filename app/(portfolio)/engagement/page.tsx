import type { Metadata } from 'next'
import { FileCheck, Handshake, Landmark, PenTool, Users, Waypoints } from 'lucide-react'
import { Button, Card, Details, PageHero, PhotoCard, Reveal, SectionHead, Shape, Stat, Tag, ThemeBand } from '@/components/pcu'
import { PhotoStrip } from '@/components/pcu/PhotoStrip'
import { SubNav } from '@/components/pcu/SubNav'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { roles } from '@/lib/data/experience'
import { stats } from '@/lib/data/profile'
import { pageMeta } from '@/lib/og'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

export const metadata: Metadata = pageMeta('/engagement', {
  title: 'International Education Overview',
  description: `Seven areas of international office work at Petra Christian University and Universitas Airlangga: ${stats.studentsPerSemester} students a semester, ${stats.partners} partners, ${stats.agreementsPerMonth} MoU and MoA reviews a month.`,
})

const areas = [
  { href: '/onboarding', src: '/assets/images/student-services/knb-orientation-2025/img-8471.jpg', alt: 'KNB scholarship students at orientation', tag: `${stats.studentsPerSemester} / semester`, title: 'Student support', text: 'Arrival to departure' },
  { href: '/onboarding', src: '/assets/images/student-services/best-buddies/img-6934.jpg', alt: 'Best Buddies peer mentoring event', tag: 'Best Buddies', title: 'Student engagement', text: 'Culture, community, mentoring' },
  { href: '/partnerships', src: '/assets/images/aero/aero-3.jpg', alt: 'Partner university booth at AERO', tag: `${stats.partners} partners`, title: 'Partnerships', text: `${stats.meetingsPerMonth} meetings a month` },
  { href: '/strategic-meetings', src: '/assets/images/partnerships/meetings/hketo-1.jpg', alt: 'Hong Kong Economic and Trade Office meeting at PETRA', tag: `${stats.meetingsPerMonth} / month`, title: 'Strategic meetings', text: 'Request to follow-up' },
  { href: '/signing', src: '/assets/images/partnerships/signings/pgpi-2.jpg', alt: 'MoU signing between PETRA and PGPI', tag: 'Ceremonies', title: 'MoU & MoA signing', text: 'Final text to activation' },
  { href: '/mou', src: '/assets/images/aero/aero-10.jpg', alt: 'Partnership signing and exhibition at AERO', tag: `${stats.agreementsPerMonth} / month`, title: 'MoU / MoA', text: 'Drafting to renewal' },
  { href: '/university-support', src: '/assets/images/partnerships/support/drone-academy-1.jpg', alt: 'PETRA Drone Academy launch', tag: 'For PETRA', title: 'University support', text: 'Faculties, units, launches' },
]

const flow = [
  { icon: <Users size={20} aria-hidden />, title: 'Students', text: 'Support and mentoring for international students, arrival to departure.' },
  { icon: <Waypoints size={20} aria-hidden />, title: 'Partners', text: "Identify institutions that fit PETRA's mission and strengths, then build the relationship." },
  { icon: <Handshake size={20} aria-hidden />, title: 'Meeting', text: 'A briefed, well-run visit, with minutes and owned actions within 24 hours.' },
  { icon: <FileCheck size={20} aria-hidden />, title: 'Agreement', text: 'Draft, faculty review, tiered approval and partner review of the MoU or MoA.' },
  { icon: <PenTool size={20} aria-hidden />, title: 'Signing', text: 'Final text to ceremony to an agreement that is active in SIM Kerjasama.' },
  { icon: <Landmark size={20} aria-hidden />, title: 'University', text: 'Activities run by faculties and units, verified and counted as RENSTRA indicators.' },
]

/** International education roles, newest first. */
const intlRoles = roles.filter(r => ['pcu', 'age-mobility', 'age-students'].includes(r.id))

const strip = [
  '/assets/images/student-services/knb-orientation-2025/img-8467.jpg', '/assets/images/student-services/tailor-made/griffith-unair-3.jpg',
  '/assets/images/student-services/best-buddies/img-6941.jpg', '/assets/images/student-services/tailor-made/ljmu-unair-2.jpg',
  '/assets/images/student-services/arrival-tias-2025/arrival-tias-2025-1.jpg', '/assets/images/student-services/monev-tias/img-4598.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8504.jpg', '/assets/images/student-services/best-buddies/img-6927.jpg',
]

export default function EngagementPage() {
  return (
    <>
      <BreadcrumbJsonLd path="/engagement" />
      <PageHero
        image={{ src: '/assets/images/student-services/monev-tias/img-7092.jpg' }}
        eyebrow="International Education"
        title="One student at a time"
        lead="Airport to meeting to agreement to activity."
        aside={<Stat amber value={stats.studentsPerSemester} label="International students per semester" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section decor-glow-tr">
        <div className="wrap">
          <SectionHead eyebrow="Seven areas" title="Where I work" />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,300px),1fr))]">
            {areas.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <PhotoCard {...a} className="!min-h-[380px] h-full" />
              </Reveal>
            ))}
            <Reveal delay={300}>
              <Card tone="midnight" className="!min-h-[380px] h-full" shape={<Shape kind="ring-u" color="amber" className="w-[160px] right-6 top-0" />}>
                <div className="mt-auto flex flex-col gap-3">
                  <h3 className="text-white !text-2xl">A partnership in mind?</h3>
                  <Button href="/contact" variant="inverse" className="self-start">Get in touch</Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead
            eyebrow="How it connects"
            title="One thread, six stages"
            lead="Each tab is one stage. Most partnerships pass through all of them, and what happens at the end feeds the next renewal."
          />
          <Lifecycle steps={flow} label="How the international education work connects" />
          <Details summary="Why the order matters" className="mt-6">
            A meeting without minutes rarely becomes an agreement, and an agreement that is never activated produces nothing to report. I run
            the stages as one process so each hand-off is owned: briefed visits, approvals with a visible clock, signed copies recorded the same
            week, and activities verified before they are counted.
          </Details>
        </div>
      </section>

      <section className="section decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="Where" title="Three roles, two universities" lead="Student support and mobility at Universitas Airlangga (UNAIR), then partnerships at Petra Christian University (PETRA)." />
          <div className="grid-3">
            {intlRoles.map((r, i) => (
              <Reveal key={r.id} delay={i * 60} className="h-full">
                <Card className="h-full">
                  <div className="flex flex-wrap gap-2">
                    <Tag outline>{r.period}</Tag>
                    {r.current && <Tag>Now</Tag>}
                  </div>
                  <h3 className="!text-xl m-0">{r.title}</h3>
                  <p className="m-0 text-sm font-semibold text-accent-strong">{r.org}</p>
                  <ul className="m-0 pl-5 flex flex-col gap-1.5 text-[.9375rem] text-ink-secondary">
                    {r.bullets.slice(0, 3).map(b => <li key={b}>{b}</li>)}
                  </ul>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="pb-[clamp(56px,8vw,96px)]">
        <PhotoStrip images={strip} alt="International student programs" />
      </section>
      <ThemeBand eyebrow="Partnerships" value={stats.meetingsPerMonth} label="Partner meetings a month" cta={{ href: '/partnerships', label: 'Partnership development' }} />
    </>
  )
}

import type { Metadata } from 'next'
import { Button, Card, PageHero, PhotoCard, Reveal, SectionHead, Shape, Stat, ThemeBand } from '@/components/pcu'
import { PhotoStrip } from '@/components/pcu/PhotoStrip'
import { SubNav } from '@/components/pcu/SubNav'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'International Education',
  alternates: { canonical: '/engagement' },
  description: `Supporting ${stats.studentsPerSemester} international students per semester across welfare, mobility, engagement and partnership programs at Airlangga Global Engagement and Petra Christian University.`,
}

const areas = [
  { href: '/onboarding', src: '/assets/images/student-services/knb-orientation-2025/img-8471.jpg', alt: 'KNB scholarship students at orientation', tag: `${stats.studentsPerSemester} / semester`, title: 'Student support', text: 'Arrival to departure' },
  { href: '/onboarding', src: '/assets/images/student-services/best-buddies/img-6934.jpg', alt: 'Best Buddies peer mentoring event', tag: 'Best Buddies', title: 'Student engagement', text: 'Culture, community, mentoring' },
  { href: '/partnerships', src: '/assets/images/aero/aero-3.jpg', alt: 'Partner university booth at AERO', tag: `${stats.partners} partners`, title: 'Partnerships', text: `${stats.meetingsPerMonth} meetings a month` },
  { href: '/mou', src: '/assets/images/aero/aero-10.jpg', alt: 'Partnership signing and exhibition at AERO', tag: `${stats.agreementsPerMonth} / month`, title: 'MoU / MoA', text: 'Drafting to renewal' },
  { href: '/intl-grants', src: '/assets/images/student-services/monev-tias/img-7061.jpg', alt: 'Scholarship monitoring session', tag: 'In development', title: 'International grants', text: 'Find, track, deliver' },
]

const strip = [
  '/assets/images/student-services/knb-orientation-2025/img-8467.jpg', '/assets/images/student-services/tailor-made/griffith-unair-3.jpg',
  '/assets/images/student-services/best-buddies/img-6941.jpg', '/assets/images/student-services/tailor-made/ljmu-unair-2.jpg',
  '/assets/images/student-services/arrival-tias-2025/arrival-tias-2025-1.jpg', '/assets/images/student-services/monev-tias/img-4598.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8504.jpg', '/assets/images/student-services/best-buddies/img-6927.jpg',
]

export default function EngagementPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/student-services/monev-tias/img-7092.jpg' }}
        eyebrow="International Education"
        title="One student at a time"
        lead="Airport to agreement to grant."
        aside={<Stat amber value={stats.studentsPerSemester} label="International students per semester" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section decor-glow-tr">
        <div className="wrap">
          <SectionHead eyebrow="Five areas" title="Where I work" />
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

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="pb-[clamp(56px,8vw,96px)]">
        <PhotoStrip images={strip} alt="International student programs" />
      </section>
      <ThemeBand eyebrow="Partnerships" value={stats.meetingsPerMonth} label="Partner meetings a month" cta={{ href: '/partnerships', label: 'Partnership development' }} />
    </>
  )
}

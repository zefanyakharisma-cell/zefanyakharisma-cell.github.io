import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, FileText, Handshake, HeartHandshake, LogIn } from 'lucide-react'
import { Button, Card, IconBadge, PageHero, SectionHead, Shape, Stat, Tag } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'International Education',
  alternates: { canonical: '/engagement' },
  description: `Supporting ${stats.studentsPerSemester} international students per semester across welfare, mobility, engagement and partnership programs at Airlangga Global Engagement and Petra Christian University.`,
}

const areas = [
  { href: '/onboarding', icon: LogIn, tone: 'brand' as const, title: 'International student support', text: 'Care from arrival to departure: visas, welfare, scholarships and peer mentoring.', tags: ['Airport pick-up', 'Immigration', 'Welfare'] },
  { href: '/onboarding', icon: HeartHandshake, tone: 'aqua' as const, title: 'Student engagement', text: 'Cultural immersion, community engagement and experiential learning.', tags: ['City tour', 'Cultural events', 'Best Buddies'] },
  { href: '/partnerships', icon: Handshake, tone: 'brand' as const, title: 'Partnership development', text: `${stats.partners} institutional partners and ${stats.meetingsPerMonth} strategic meetings a month at PCU.`, tags: ['Research', 'Exchange', 'Faculty development'] },
  { href: '/mou', icon: FileText, tone: 'brand' as const, title: 'MoU / MoA coordination', text: `${stats.agreementsPerMonth} agreements reviewed a month, now tracked in SIM Kerjasama.`, tags: ['Drafting', 'Compliance', 'Renewals'] },
  { href: '/intl-grants', icon: Award, tone: 'amber' as const, title: 'International grants', text: 'A system to find, track and deliver international grants at PCU, digitally and physically.', tags: ['In development', 'Grant dashboard'] },
]

const moments = [
  { src: '/assets/images/student-services/knb-orientation-2025/img-8467.jpg', alt: 'KNB scholarship students at orientation', caption: 'KNB scholarship orientation, 2025' },
  { src: '/assets/images/student-services/tailor-made/griffith-unair-3.jpg', alt: 'Griffith University and Universitas Airlangga tailor-made program', caption: 'Griffith × Airlangga tailor-made program' },
  { src: '/assets/images/student-services/tailor-made/ljmu-unair-2.jpg', alt: 'LJMU and Universitas Airlangga tailor-made program', caption: 'LJMU × Airlangga tailor-made program' },
]

export default function EngagementPage() {
  return (
    <>
      <PageHero
        eyebrow="International Education"
        title="One student at a time"
        lead="From welcoming students at the airport to formalising global partnerships and building grant systems. Each area is one part of running international education well."
        aside={<Stat amber value={stats.studentsPerSemester} label="International students supported per semester" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Five areas" title="How I work in international education" />
          <div className="grid-3">
            {areas.map(a => (
              <Card key={a.title} href={a.href}>
                <IconBadge icon={a.icon} tone={a.tone} />
                <h3 className="!text-xl">{a.title}</h3>
                <p className="muted m-0">{a.text}</p>
                <div className="flex flex-wrap gap-2">
                  {a.tags.map(t => <Tag key={t} outline className="text-midnight">{t}</Tag>)}
                </div>
                <span className="font-semibold mt-auto pt-2">Learn more →</span>
              </Card>
            ))}
            <Card tone="midnight" className="min-h-[240px] justify-end" shape={<Shape kind="ring-u" color="amber" className="w-[160px] right-6 top-0" />}>
              <div className="mt-auto flex flex-col gap-3">
                <h3 className="text-white !text-xl">Have a partnership in mind?</h3>
                <Button href="/contact" variant="inverse" className="self-start">Get in touch</Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="In practice" title="Moments from the work" />
          <div className="grid-3">
            {moments.map(m => (
              <figure key={m.src} className="m-0">
                <div className="relative aspect-[4/3] rounded-md overflow-hidden">
                  <Image src={m.src} alt={m.alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="muted text-sm mt-2.5">{m.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

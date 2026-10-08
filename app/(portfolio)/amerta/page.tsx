import type { Metadata } from 'next'
import Image from 'next/image'
import { BookOpenCheck, ClipboardCheck, Mail, Mountain, PartyPopper, PlaneLanding, Presentation, Users } from 'lucide-react'
import { PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { ProcessSteps, type Step } from '@/components/pcu/ProcessSteps'
import RotatingGallery from '@/components/projects/RotatingGallery'
import AmertaStats from '@/components/projects/AmertaStats'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'AMERTA',
  alternates: { canonical: '/amerta' },
  description: 'Airlangga Mobility, Exchange, Research & Transfer Academic: the flagship semester exchange at Universitas Airlangga, managed end to end across four batches.',
}

const GALLERY_IMAGES = [
  '/assets/images/amerta/img-0570.jpg', '/assets/images/amerta/img-0576.jpg',
  '/assets/images/amerta/img-0578.jpg', '/assets/images/amerta/img-0589.jpg',
  '/assets/images/amerta/img-0590.jpg', '/assets/images/amerta/img-0594.jpg',
  '/assets/images/amerta/img-0629.jpg', '/assets/images/amerta/img-0637.jpg',
  '/assets/images/amerta/img-0641.jpg', '/assets/images/amerta/img-0642.jpg',
  '/assets/images/amerta/img-0980.jpg', '/assets/images/amerta/img-0993.jpg',
  '/assets/images/amerta/img-1003.jpg', '/assets/images/amerta/img-1006.jpg',
  '/assets/images/amerta/img-1007.jpg', '/assets/images/amerta/img-1008.jpg',
  '/assets/images/amerta/img-1807.jpg', '/assets/images/amerta/img-1813.jpg',
  '/assets/images/amerta/img-3529.jpg', '/assets/images/amerta/img-3534.jpg',
  '/assets/images/amerta/img-3535.jpg', '/assets/images/amerta/img-3720.jpg',
  '/assets/images/amerta/img-3723.jpg', '/assets/images/amerta/img-3867.jpg',
  '/assets/images/amerta/img-3868.jpg', '/assets/images/amerta/img-3869.jpg',
  '/assets/images/amerta/fullsizerender.jpg', '/assets/images/amerta/amerta-1.jpg',
]

const steps: Step[] = [
  { icon: Mail, title: 'Institutional Outreach & Student Recruitment', text: 'Coordinated with international partner universities regarding program promotion, student nominations, application processes, and recruitment timelines. Managed communication with both institutional representatives and prospective exchange students.' },
  { icon: Presentation, title: 'Pre-Departure Orientation', text: 'Organized pre-departure orientation sessions covering academic systems, Indonesian culture, immigration procedures, accommodation guidance, and student preparedness before arrival in Indonesia.' },
  { icon: BookOpenCheck, title: 'Academic Coordination & Credit Transfer', text: 'Managed course mapping and credit transfer processes between Universitas Airlangga and international partner institutions. Bridged communication between faculties, academic coordinators, and students to ensure smooth academic recognition.' },
  { icon: PlaneLanding, title: 'Arrival, Visa, Immigration & Accommodation', text: 'Managed airport pick-up services, accommodation arrangements, visa documentation, immigration coordination, and arrival logistics to ensure students experienced a smooth transition into Indonesia.' },
  { icon: Users, title: 'Arrival Orientation & Student Integration', text: 'Conducted orientation sessions introducing students to campus life, academic systems, Indonesian culture, safety information, and student support services to help them adapt quickly.' },
  { icon: ClipboardCheck, title: 'Semester Monitoring & Student Support', text: 'Monitored academic progress and student well-being throughout the semester by coordinating continuously with faculties, lecturers, and students. Ensured issues were addressed efficiently and student experiences remained positive.' },
  { icon: Mountain, title: 'Cultural Trips & Cultural Experiences', text: 'Planned and managed cultural immersion activities, local trips, and intercultural experiences to help international students better understand Indonesian culture and strengthen cross-cultural engagement.' },
  { icon: PartyPopper, title: 'Farewell Session & Program Closure', text: 'Organized farewell sessions and program closure activities to celebrate student achievements, gather feedback, and maintain long-term institutional and student relationships.' },
]

export default function Amerta() {
  return (
    <>
      <PageHero
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Exchange program', 'Universitas Airlangga']}
        kicker="Airlangga Mobility, Exchange, Research & Transfer Academic"
        title="AMERTA"
        lead="Universitas Airlangga's flagship semester exchange. I managed it end to end across four batches, from partner outreach to program closure."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image
            src="/assets/images/student-services/tailor-made/griffith-unair-2.jpg"
            alt="International exchange students at Universitas Airlangga"
            fill
            priority
            sizes="(min-width: 1200px) 1100px, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.amertaParticipants} label="Students, AMERTA XXI–XXIV" />
          <Stat value="14" label="Countries" />
          <Stat value="24" label="Partner universities" />
          <Stat value={stats.programBudget} label="Budget per cohort" />
        </div>
      </section>

      <section className="section !pt-6 relative overflow-hidden">
        <Shape kind="quarter-bl" color="amber" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead
            eyebrow="Program process"
            title="End-to-end responsibilities"
            lead="As Project Manager of AMERTA at Airlangga Global Engagement, I oversaw the whole mobility journey: outreach and recruitment, academic coordination, cultural programming and program closure, across four cohorts with IDR 50–100M budgets each."
          />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <RotatingGallery
        images={GALLERY_IMAGES}
        alt="AMERTA exchange activity"
        title="Moments from the exchange"
        subtitle="Four batches · 207 students · 14 countries · 2024–2027"
      />

      <AmertaStats />
    </>
  )
}

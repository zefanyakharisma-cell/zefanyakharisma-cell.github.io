import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Globe, GraduationCap, Heart, ShieldCheck, Users } from 'lucide-react'
import { BarList, Card, CountryCode, IconBadge, PageHero, SectionHead, StackedBar, Stat, Tag } from '@/components/pcu'
import { SubNav } from '@/components/pcu/SubNav'
import StudentActivities from '@/components/projects/StudentActivities'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'International Student Support',
  alternates: { canonical: '/onboarding' },
  description: `Support for ${stats.studentsPerSemester} international students per semester, from arrival to departure: visas, welfare, scholarships and peer mentoring at Airlangga Global Engagement.`,
}

const KNB_GALLERY = [
  '/assets/images/student-services/knb-orientation-2025/img-8467.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8471.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8478.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8484.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8504.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8510.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8513.jpg',
]

const supportCards = [
  { icon: GraduationCap, title: 'Academic Coordination', text: 'Liaised with faculty and academic staff to ensure students\' course registrations, schedules, and academic obligations were smoothly managed throughout their program.' },
  { icon: ShieldCheck, title: 'Immigration & Visa Assistance', text: 'Guided students through KITAS applications, extensions, and immigration reporting requirements — coordinating closely with visa staff to keep every student legally compliant.' },
  { icon: Heart, title: 'Student Welfare', text: 'Provided personalized, responsive support for student wellbeing — from healthcare coordination and accommodation assistance to emotional support during difficult personal situations.' },
  { icon: Globe, title: 'Cross-Cultural Adaptation', text: 'Helped students navigate cultural differences, language barriers, and Indonesian social norms — offering practical guidance on daily life, customs, and building meaningful local connections.' },
  { icon: Award, title: 'Government Scholarship Administration', text: 'Managed administrative obligations for KNB and TIAS scholarship holders — including progress monitoring, tax reporting support, and formal reporting to scholarship authorities.' },
  { icon: Users, title: 'Community & Peer Support', text: 'Built an inclusive support community through the Best Buddies peer mentoring program — connecting international students with trained local mentors and organizing integration activities throughout the semester.' },
]

const programs = [
  { value: '193', label: 'AMERTA exchange', sub: 'Batches 21–24 (2024–2027) · 15 countries', tags: ['Batch 21: 34', 'Batch 22: 43', 'Batch 23: 67', 'Batch 24: 49'] },
  { value: '27', label: 'KNB scholarship', sub: 'Government-funded · 10+ countries · monitored and evaluated', tags: ['Pakistan · Yemen', 'Timor-Leste'] },
  { value: '9', label: 'TIAS scholarship', sub: 'Government-funded · 5 countries · monitored and evaluated', tags: ['Kenya · Nigeria', 'Zimbabwe'] },
  { value: '251', label: 'Inbound & welfare', sub: 'All programs · 25+ countries · arrival to departure', tags: ['Yemen · Pakistan', 'Timor-Leste'] },
]

const amertaNations = [
  { name: 'Malaysia', count: 87 }, { name: 'Philippines', count: 49 }, { name: 'France', count: 11 }, { name: 'Brunei', count: 10 },
  { name: 'Germany', count: 9 }, { name: 'Australia', count: 6 }, { name: 'Poland', count: 6 }, { name: 'Singapore', count: 3 },
]

const inboundNations = [
  { name: 'Yemen', count: 60 }, { name: 'Pakistan', count: 55 }, { name: 'Timor-Leste', count: 27 }, { name: 'Myanmar', count: 14 },
  { name: 'Gambia', count: 14 }, { name: 'Nigeria', count: 10 }, { name: 'Sudan', count: 9 }, { name: 'Tanzania', count: 9 },
]

export default function OnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Student welfare & mobility"
        title="International student support"
        lead="Care from arrival to departure for international students at Airlangga Global Engagement: visas, welfare, scholarships and peer mentoring."
        aside={<Stat amber value={stats.studentsPerSemester} label="International students supported per semester" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="pt-10">
        <div className="wrap">
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x" role="region" tabIndex={0} aria-label="KNB scholarship orientation photos">
            {KNB_GALLERY.map((src, i) => (
              <div key={src} className="relative flex-none w-[min(320px,80vw)] aspect-[4/3] rounded-md overflow-hidden snap-start">
                <Image src={src} alt={`KNB scholarship orientation 2025, photo ${i + 1}`} fill sizes="320px" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Support ecosystem" title="What students needed, and what I did" />
          <div className="grid-3">
            {supportCards.map(c => (
              <Card key={c.title}>
                <IconBadge icon={c.icon} />
                <h3 className="!text-xl">{c.title}</h3>
                <p className="muted m-0">{c.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Activities & services" title="Student services in practice" lead="Open an activity to see my role, the workflow and the impact." />
          <StudentActivities />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Data overview"
            title="Student overview"
            lead="A snapshot of the international students I supported across exchange programs, government scholarships and inbound welfare services at Airlangga Global Engagement."
          />
          <div className="grid-4 !gap-4 mb-12">
            {programs.map(p => (
              <Card key={p.label} tone="smoke">
                <span className="text-[2.5rem] font-bold leading-none tracking-[-0.02em]">{p.value}</span>
                <span className="font-semibold">{p.label}</span>
                <span className="text-sm muted">{p.sub}</span>
                <div className="flex flex-wrap gap-1.5 mt-1">{p.tags.map(t => <Tag key={t} outline className="text-midnight">{t}</Tag>)}</div>
              </Card>
            ))}
          </div>

          <div className="grid-2 !gap-8 mb-8">
            <Card>
              <h3 className="!text-xl">AMERTA exchange: top nationalities</h3>
              <BarList caption="AMERTA students by nationality" bars={amertaNations.map(n => ({ key: n.name, label: <CountryCode country={n.name} />, value: n.count }))} />
            </Card>
            <Card>
              <h3 className="!text-xl">Inbound & scholarship: top nationalities</h3>
              <BarList caption="Inbound and scholarship students by nationality" bars={inboundNations.map(n => ({ key: n.name, label: <CountryCode country={n.name} />, value: n.count, color: '#3880d0' }))} />
            </Card>
          </div>

          <div className="grid-2 !gap-8">
            <Card>
              <h3 className="!text-xl">Gender distribution</h3>
              <p className="text-sm muted m-0">AMERTA exchange, batches 22–24 · 158 students</p>
              <StackedBar caption="AMERTA gender distribution" segments={[{ label: 'Female', value: 111 }, { label: 'Male', value: 47 }]} />
              <p className="text-sm muted m-0 mt-4">Inbound & welfare (ADS) · 110 students with data</p>
              <StackedBar caption="Inbound gender distribution" segments={[{ label: 'Female', value: 38 }, { label: 'Male', value: 72 }]} />
            </Card>
            <Card>
              <h3 className="!text-xl">Study program level</h3>
              <p className="text-sm muted m-0">AMERTA exchange · 156 students, batches 22–24</p>
              <StackedBar caption="AMERTA study level" segments={[{ label: 'Undergraduate', value: 145 }, { label: "Master's", value: 11 }]} />
              <p className="text-sm muted m-0 mt-4">Based on batches 22–24, where study level was recorded. All KNB and TIAS students are government scholarship recipients.</p>
            </Card>
          </div>

          <div className="grid-4 !gap-8 mt-12">
            <Stat value={stats.studentsPerSemester} label="Students supported per semester" />
            <Stat value="30+" label="Countries represented" />
            <Stat value="10+" label="Stakeholder types coordinated" />
            <Stat value="4" label="AMERTA batches managed" />
          </div>
        </div>
      </section>
    </>
  )
}

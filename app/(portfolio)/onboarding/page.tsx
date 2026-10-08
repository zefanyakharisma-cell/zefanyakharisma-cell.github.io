import type { Metadata } from 'next'
import { Award, Globe, GraduationCap, Heart, ShieldCheck, Users } from 'lucide-react'
import { Card, FlipCard, PageHero, Reveal, SectionHead, Stat } from '@/components/pcu'
import { PhotoStrip } from '@/components/pcu/PhotoStrip'
import { SubNav } from '@/components/pcu/SubNav'
import StudentActivities from '@/components/projects/StudentActivities'
import { MapSwitch } from '@/components/viz/MapSwitch'
import { Waffle } from '@/components/viz/Waffle'
import { stats } from '@/lib/data/profile'
import { amertaNations, gender, inboundNations, studentPrograms, studyLevel } from '@/lib/data/students'
import { buildWorldMap } from '@/lib/geo'

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

const support = [
  { icon: <GraduationCap aria-hidden />, title: 'Academics', back: 'Course registration, schedules and faculty liaison.' },
  { icon: <ShieldCheck aria-hidden />, title: 'Immigration', back: 'KITAS applications, extensions and reporting, kept compliant.' },
  { icon: <Heart aria-hidden />, title: 'Welfare', back: 'Healthcare, housing and support through hard moments.' },
  { icon: <Globe aria-hidden />, title: 'Adaptation', back: 'Language, customs and daily life in Indonesia.' },
  { icon: <Award aria-hidden />, title: 'Scholarships', back: 'KNB and TIAS monitoring, tax reports and formal reporting.' },
  { icon: <Users aria-hidden />, title: 'Peer support', back: 'Best Buddies: trained local mentors for every semester.' },
]

const toCounts = (list: { name: string; count: number }[]) => Object.fromEntries(list.map(n => [n.name, n.count]))

export default function OnboardingPage() {
  return (
    <>
      <PageHero
        eyebrow="Student welfare & mobility"
        title="International student support"
        lead="Visas, welfare, scholarships and mentoring, arrival to departure."
        aside={<Stat amber value={stats.studentsPerSemester} label="International students per semester" className="flex-[0_1_260px]" />}
      />
      <SubNav />

      <section className="pt-10">
        <PhotoStrip images={KNB_GALLERY} alt="KNB scholarship orientation 2025" />
      </section>

      <section className="section">
        <div className="wrap grid-4 !gap-8">
          {studentPrograms.map(p => <Stat key={p.label} value={p.value} label={p.label} />)}
        </div>
      </section>

      <section className="section !pt-0">
        <div className="wrap">
          <SectionHead eyebrow="Reach" title="Where students came from" lead="Top nationalities per group." />
          <Reveal>
            <MapSwitch
              label="Student nationalities"
              layers={[
                { key: 'inbound', label: 'Inbound & scholarship', unit: 'students', map: buildWorldMap(toCounts(inboundNations)) },
                { key: 'amerta', label: 'AMERTA exchange', unit: 'students', map: buildWorldMap(toCounts(amertaNations)) },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Who" title="Students at a glance" />
          <div className="grid-3">
            <Card>
              <h3 className="!text-lg">Gender · AMERTA</h3>
              <Waffle label="AMERTA students by gender, batches 22–24" parts={gender.amerta} />
            </Card>
            <Card>
              <h3 className="!text-lg">Gender · inbound</h3>
              <Waffle label="Inbound and welfare students by gender" parts={gender.inbound} />
            </Card>
            <Card>
              <h3 className="!text-lg">Study level · AMERTA</h3>
              <Waffle label="AMERTA students by study level, batches 22–24" parts={studyLevel} />
            </Card>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Support" title="Six kinds of care" lead="Tap a card." />
          <div className="grid-3">{support.map(s => <FlipCard key={s.title} {...s} />)}</div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="In practice" title="Activities and services" lead="Open one for my role and the impact." />
          <StudentActivities />
        </div>
      </section>
    </>
  )
}

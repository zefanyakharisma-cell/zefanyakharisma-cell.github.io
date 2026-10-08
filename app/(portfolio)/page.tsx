import type { Metadata } from 'next'
import Image from 'next/image'
import { BarChart2, Handshake, HeartHandshake, Workflow } from 'lucide-react'
import { Button, FlipCard, PhotoCard, Reveal, SectionHead, Shape, Stat, Card, Tag } from '@/components/pcu'
import { PhotoStrip } from '@/components/pcu/PhotoStrip'
import { SkillExplorer } from '@/components/pcu/SkillExplorer'
import { MapSwitch } from '@/components/viz/MapSwitch'
import { countBy, INTL_DATA } from '@/lib/data/partners'
import { stats } from '@/lib/data/profile'
import { DATA as AMERTA } from '@/lib/data/amerta'
import { inboundNations } from '@/lib/data/students'
import { buildWorldMap, mergeCounts } from '@/lib/geo'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const strip = [
  '/assets/images/amerta/img-0570.jpg', '/assets/images/aci/aci-1.jpg', '/assets/images/aero/aero-3.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8471.jpg', '/assets/images/amerta/img-1003.jpg',
  '/assets/images/aci/aci-7.jpg', '/assets/images/aero/aero-10.jpg', '/assets/images/student-services/tailor-made/griffith-unair-2.jpg',
  '/assets/images/amerta/img-3534.jpg', '/assets/images/aci/aci-12.jpg',
]

const skills = [
  { icon: <Handshake aria-hidden />, title: 'Partnerships', back: `${stats.partners} partners, ${stats.agreementsPerMonth} MoU/MoA reviews a month at PCU.` },
  { icon: <HeartHandshake aria-hidden />, title: 'Student support', back: `${stats.studentsPerSemester} international students supported every semester.` },
  { icon: <BarChart2 aria-hidden />, title: 'Program management', back: `AMERTA, ACI and AERO, ${stats.programBudget} per program.` },
  { icon: <Workflow aria-hidden />, title: 'Systems design', back: 'SIM Kerjasama and SIM Realisasi for PCU.' },
]

export default function Home() {
  const partners = buildWorldMap(countBy(INTL_DATA, p => p.country))
  const students = buildWorldMap(mergeCounts(
    Object.fromEntries(AMERTA.all.nationalities.filter(n => !/other/i.test(n.country)).map(n => [n.country, n.count])),
    Object.fromEntries(inboundNations.map(n => [n.name, n.count])),
  ))

  return (
    <>
      <section className="relative overflow-hidden pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,7vw,96px)]">
        <div className="wrap flex flex-wrap gap-14 items-center">
          <div className="flex flex-col gap-6 min-w-0 flex-[1_1_440px]">
            <span className="pcu-eyebrow text-accent-strong">International Education · Surabaya</span>
            <h1 className="h-page">Partnerships, students, systems.</h1>
            <p className="lead">International Partnership Specialist, Petra Christian University.</p>
            <div className="flex flex-wrap gap-3">
              <Button href="/projects-overview">See projects</Button>
              <Button href="/about-overview" variant="outline" className="text-midnight">About me</Button>
            </div>
          </div>
          <div className="relative min-w-0 flex-[1_1_420px] h-[clamp(360px,46vw,520px)]">
            <div aria-hidden className="absolute left-[12%] top-0 w-[46%] h-[78%] bg-midnight" />
            <div aria-hidden className="absolute right-0 top-0 w-[34%] h-[38%] bg-blue" />
            <Shape kind="quarter-br" color="amber" className="right-[8%] top-[38%] w-[26%]" />
            <Shape kind="circle" color="cerise" className="left-0 top-[6%] w-16" />
            <div aria-hidden className="absolute right-0 bottom-0 w-[22%] h-[30%] bg-teal" />
            <Shape kind="ring-u" color="amber" className="right-[4%] top-0 w-[22%]" />
            <div className="arch-photo absolute left-[22%] top-[14%] w-[46%] h-[82%] shadow-card">
              <Image src="/assets/images/self-portrait/profile-pic-1.png" alt="Portrait of Zefanya Kharisma Nugroho" fill priority sizes="(min-width: 1024px) 280px, 45vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="section--smoke pt-2 pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.amertaParticipants} label="AMERTA students" />
          <Stat value={stats.studentsPerSemester} label="Students per semester" />
          <Stat value={String(INTL_DATA.length)} label="International partners" />
          <Stat value={stats.agreementsPerMonth} label="MoU/MoA a month" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Reach" title="Where the work connects" />
          <Reveal>
            <MapSwitch
              label="World map"
              layers={[
                { key: 'partners', label: 'Partners', unit: 'partners', map: partners },
                { key: 'students', label: 'Students', unit: 'students', map: students },
              ]}
            />
          </Reveal>
        </div>
      </section>

      <section className="pb-[clamp(56px,8vw,96px)]">
        <PhotoStrip images={strip} alt="Program moments" />
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Selected work" title="Programs and systems" />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            <Reveal><PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students" tag="207 students" title="AMERTA" text="Semester exchange · 14 countries" className="!min-h-[400px]" /></Reveal>
            <Reveal delay={80}><PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI cultural immersion participants" tag="191 participants" title="ACI" text="Cultural immersion · 3 cities" className="!min-h-[400px]" /></Reveal>
            <Reveal delay={160}><PhotoCard href="/aero" src="/assets/images/aero/aero-1.jpg" alt="AERO exhibition booths" tag="19 booths" title="AERO" text="Partnership exhibition" className="!min-h-[400px]" imagePosition="center 35%" /></Reveal>
            <Reveal delay={240}>
              <Card tone="midnight" href="/sim-kerjasama" className="!min-h-[400px]" shape={<><Shape kind="ring-n" color="blue" className="w-[200px] -right-10 top-8" /><Shape kind="circle" color="amber" className="w-12 right-10 top-[140px]" /></>}>
                <div className="mt-auto flex flex-col gap-3">
                  <Tag outline className="text-white">2 systems</Tag>
                  <h3 className="text-white !text-2xl">SIM Kerjasama &amp; Realisasi</h3>
                  <p className="m-0 text-smoke">Agreements and their activities</p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What I do" title="Four strengths" />
          <div className="grid-4">
            {skills.map(s => <FlipCard key={s.title} icon={s.icon} title={s.title} back={s.back} />)}
          </div>
        </div>
      </section>

      <SkillExplorer />
    </>
  )
}

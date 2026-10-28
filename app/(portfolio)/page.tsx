import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { BarChart2, Handshake, HeartHandshake, Workflow } from 'lucide-react'
import { Button, FlipCard, PhotoCard, Reveal, SectionHead, Shape, Stat, Card, Tag, ThemeBand } from '@/components/pcu'
import { PhotoStrip } from '@/components/pcu/PhotoStrip'
import { SkillExplorer } from '@/components/pcu/SkillExplorer'
import { MapSwitch } from '@/components/viz/MapSwitch'
import { countBy, INTL_DATA } from '@/lib/data/partners'
import { stats } from '@/lib/data/profile'
import { DATA as AMERTA } from '@/lib/data/amerta'
import { inboundNations } from '@/lib/data/students'
import { buildWorldMap, mergeCounts } from '@/lib/geo'
import { pageMeta } from '@/lib/og'

export const metadata: Metadata = pageMeta('/', {
  title: 'Zefanya Kharisma Nugroho — International Partnership Specialist',
  absolute: true,
  description: `International Partnership Specialist at Petra Christian University (PETRA), Surabaya, Indonesia: ${stats.partners} partners and ${stats.agreementsPerMonth} MoU/MoA reviews a month.`,
})

const strip = [
  '/assets/images/amerta/img-0570.jpg', '/assets/images/aci/aci-1.jpg', '/assets/images/aero/aero-3.jpg',
  '/assets/images/student-services/knb-orientation-2025/img-8471.jpg', '/assets/images/amerta/img-1003.jpg',
  '/assets/images/aci/aci-7.jpg', '/assets/images/aero/aero-10.jpg', '/assets/images/student-services/tailor-made/griffith-unair-2.jpg',
  '/assets/images/amerta/img-3534.jpg', '/assets/images/aci/aci-12.jpg',
]

const skills = [
  { icon: <Handshake aria-hidden />, title: 'Partnerships', back: `${stats.partners} partners, ${stats.agreementsPerMonth} MoU/MoA reviews a month at PETRA.` },
  { icon: <HeartHandshake aria-hidden />, title: 'Student support', back: `${stats.studentsPerSemester} international students supported every semester.` },
  { icon: <BarChart2 aria-hidden />, title: 'Program management', back: `AMERTA, ACI and AERO, ${stats.programBudget} per program.` },
  { icon: <Workflow aria-hidden />, title: 'Systems design', back: 'SIM Kerjasama and SIM Realisasi for PETRA.' },
]

export default function Home() {
  const byCountry = countBy(INTL_DATA, p => p.country)
  const partners = buildWorldMap(byCountry)
  const students = buildWorldMap(mergeCounts(
    Object.fromEntries(AMERTA.all.nationalities.filter(n => !/other/i.test(n.country)).map(n => [n.country, n.count])),
    Object.fromEntries(inboundNations.map(n => [n.name, n.count])),
  ))

  return (
    <>
      <section className="relative overflow-hidden pt-[clamp(40px,6vw,88px)] pb-[clamp(48px,7vw,96px)] decor-grid">
        <Image src="/assets/images/aero/aero-2.jpg" alt="" aria-hidden fill priority sizes="100vw" className="hero-photo hero-photo--light" />
        <div aria-hidden className="hero-glow hero-glow--light" />
        <div className="wrap relative flex flex-wrap gap-14 items-center">
          <div className="hero-seq flex flex-col gap-6 min-w-0 flex-[1_1_440px]">
            <span className="pcu-eyebrow text-accent-strong">International Education · Surabaya</span>
            <h1 className="h-page">Partnerships, students, systems.</h1>
            <p className="lead">
              International Partnership Specialist at Petra Christian University (PETRA), Surabaya, where I built the{' '}
              <Link href="/sim-kerjasama">SIM Kerjasama partnership system</Link>. Formerly at Universitas Airlangga (UNAIR), running the{' '}
              <Link href="/amerta">AMERTA semester exchange</Link>.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/projects-overview">See projects</Button>
              <Button href="/about-overview" variant="outline" className="text-midnight">About me</Button>
            </div>
          </div>
          <div className="hero-art relative min-w-0 flex-[1_1_420px] h-[clamp(360px,46vw,520px)]">
            <div aria-hidden className="absolute left-[12%] top-0 w-[46%] h-[78%] bg-midnight" />
            <div aria-hidden className="absolute right-0 top-0 w-[34%] h-[38%] bg-blue" />
            <Shape kind="quarter-br" color="amber" className="right-[8%] top-[38%] w-[26%]" />
            <Shape kind="circle" color="cerise" className="left-0 top-[6%] w-16" />
            <div aria-hidden className="absolute right-0 bottom-0 w-[22%] h-[30%] bg-teal" />
            <Shape kind="ring-u" color="amber" className="right-[4%] top-0 w-[22%]" />
            <div className="arch-photo absolute left-[22%] top-[14%] w-[46%] h-[82%] shadow-card">
              <Image src="/assets/images/self-portrait/profile-pic-1.png" alt="Portrait of Zefanya Kharisma Nugroho" fill priority sizes="(min-width: 1024px) 280px, 45vw" />
            </div>
            <div className="hero-glass glass absolute left-0 bottom-[4%]">
              <span className="hero-glass__eyebrow"><span aria-hidden className="hero-glass__dot" />Partner network</span>
              <span className="hero-glass__value"><b>{INTL_DATA.length}</b><span>international partners</span></span>
              <span className="hero-glass__meta">{Object.keys(byCountry).length} countries</span>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="stats-glass pt-10 pb-10">
        <div className="wrap grid-4 !gap-6">
          <Stat value={stats.amertaParticipants} label="AMERTA students" className="stat--glass glass" />
          <Stat value={stats.studentsPerSemester} label="Students per semester" className="stat--glass glass" />
          <Stat value={String(INTL_DATA.length)} label="International partners" className="stat--glass glass" />
          <Stat value={stats.agreementsPerMonth} label="MoU/MoA a month" className="stat--glass glass" />
        </div>
      </section>

      <section className="section decor-glow-tr">
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

      <section className="pb-[clamp(56px,8vw,96px)] decor-glow-bl">
        <PhotoStrip images={strip} alt="Program moments" />
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Selected work" title="Programs and systems" lead="Each part of the site has its own brand gradient: sunrise for programs, aqua for systems, dusk for international education." />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr))]">
            <Reveal theme="sunrise"><PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students" tag="207 students" title="AMERTA" text="Semester exchange · 14 countries" className="!min-h-[400px] theme-edge" /></Reveal>
            <Reveal delay={80} theme="sunrise"><PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI cultural immersion participants" tag="191 participants" title="ACI" text="Cultural immersion · 3 cities" className="!min-h-[400px] theme-edge" /></Reveal>
            <Reveal delay={160} theme="sunrise"><PhotoCard href="/aero" src="/assets/images/aero/aero-1.jpg" alt="AERO exhibition booths" tag="19 booths" title="AERO" text="Partnership exhibition" className="!min-h-[400px] theme-edge" imagePosition="center 35%" /></Reveal>
            <Reveal delay={240} theme="aqua">
              <Card tone="theme" href="/sim-kerjasama" className="!min-h-[400px] theme-edge" shape={<><Shape kind="ring-n-line" color="white" className="w-[200px] -right-10 top-8 opacity-70" /><Shape kind="circle" color="amber" className="w-12 right-10 top-[140px]" /></>}>
                <div className="glass--dark mt-auto flex flex-col gap-3 rounded-md p-5">
                  <Tag outline className="text-white">2 systems</Tag>
                  <h3 className="text-white !text-2xl">SIM Kerjasama &amp; Realisasi</h3>
                  <p className="m-0 text-smoke">Agreements and their activities</p>
                </div>
              </Card>
            </Reveal>
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="What I do" title="Four strengths" />
          <div className="grid-4">
            {skills.map(s => <FlipCard key={s.title} icon={s.icon} title={s.title} back={s.back} />)}
          </div>
        </div>
      </section>

      <SkillExplorer />

      <div data-theme="dusk">
        <ThemeBand eyebrow="International education" value={stats.studentsPerSemester} label="International students supported every semester at PETRA" cta={{ href: '/engagement', label: 'Intl. Ed' }} />
      </div>
    </>
  )
}

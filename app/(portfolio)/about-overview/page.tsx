import type { Metadata } from 'next'
import Image from 'next/image'
import {
  Award, BarChart2, BookOpen, Code2, FileCheck, Globe, Globe2, GraduationCap, Handshake, Heart, Languages,
  LayoutDashboard, Lightbulb, Network, Plane, School, Target, Users, Zap,
} from 'lucide-react'
import { Button, Card, Details, FlipCard, IconBadge, PhotoCard, SectionHead, Shape, Stat, Tag, ThemeBand } from '@/components/pcu'
import { Tabs } from '@/components/pcu/Tabs'
import { Gantt } from '@/components/viz/Gantt'
import { roles } from '@/lib/data/experience'
import { contact, stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about-overview' },
  description: `${stats.years} years in international higher education: partnerships, student mobility and the systems behind them.`,
}

const expertise = [
  { icon: <Handshake aria-hidden />, title: 'Partnerships', back: `${stats.partners} partners and ${stats.meetingsPerMonth} strategic meetings a month.` },
  { icon: <FileCheck aria-hidden />, title: 'MoU / MoA', back: `${stats.agreementsPerMonth} agreements reviewed monthly for compliance and fit.` },
  { icon: <Plane aria-hidden />, title: 'Student mobility', back: '5 exchange programs, 120+ students per semester.' },
  { icon: <Heart aria-hidden />, title: 'Student welfare', back: `Support for ${stats.studentsPerSemester} international students per semester.` },
  { icon: <BarChart2 aria-hidden />, title: 'Budgets', back: `${stats.programBudget} per program, 50+ stakeholders.` },
  { icon: <Languages aria-hidden />, title: 'Interpretation', back: 'English–Indonesian at conferences and company visits.' },
  { icon: <LayoutDashboard aria-hidden />, title: 'Systems design', back: 'SIM Kerjasama and SIM Realisasi for PCU.' },
  { icon: <Code2 aria-hidden />, title: 'Digital platforms', back: 'Websites and dashboards for institutional work.' },
  { icon: <Network aria-hidden />, title: 'Systems thinking', back: 'Education, design and strategy as one whole.' },
]

const values = [
  { icon: <Target aria-hidden />, title: 'Excellence', back: 'High standards in programs, partnerships and support.' },
  { icon: <Users aria-hidden />, title: 'Inclusivity', back: 'International education open to every student.' },
  { icon: <Lightbulb aria-hidden />, title: 'Innovation', back: 'Always looking for a better approach.' },
  { icon: <Handshake aria-hidden />, title: 'Integrity', back: 'Partnerships built on trust and mutual benefit.' },
  { icon: <Globe aria-hidden />, title: 'Global citizenship', back: 'Cross-cultural understanding, engaged graduates.' },
  { icon: <Zap aria-hidden />, title: 'Student-centred', back: "Decisions start from students' success and well-being." },
]

const skillGroups = [
  { title: 'Partnerships', tags: ['Strategic Partnerships', 'MoU/MoA Coordination', 'Stakeholder Management', 'Partnership Development'] },
  { title: 'Mobility & programs', tags: ['Exchange Program Management', 'KNB & TIAS Scholarships', 'Budget Management', 'Vendor Coordination'] },
  { title: 'Student support', tags: ['International Student Services', 'Immigration Coordination', 'Onboarding', 'Case Management'] },
  { title: 'Systems & data', tags: ['Process Design', 'Information Systems', 'Data Management', 'RENSTRA Reporting'] },
  { title: 'Communication', tags: ['Strategic Communications', 'English–Indonesian Interpretation', 'Academic Research', 'Cross-Cultural Communication'] },
]

const publications = [
  'Kebijakan Luar Negeri Pro-Israel Amerika Serikat di Pemerintahan Obama',
  'Menelaah Interdependensi Korea Selatan-Tiongkok Akibat THAAD dalam Analisis Neoliberalisme',
  'Israel dan Perjanjian Abraham: Upaya Peningkatan Status Israel dalam Sistem Internasional',
]

const focus = [
  { icon: <Globe2 aria-hidden />, title: 'Intl. education leadership', back: 'Partnership strategy and internationalisation at PCU.' },
  { icon: <LayoutDashboard aria-hidden />, title: 'Partnership systems', back: 'SIM Kerjasama and SIM Realisasi, from approvals to RENSTRA.' },
  { icon: <Network aria-hidden />, title: 'Problem solving', back: 'Education, systems thinking and design, together.' },
]

const principles = [
  { title: 'Systems over silos', text: 'Connected systems, not one-off fixes.' },
  { title: 'Global view, local action', text: 'Every agreement ends with a real person.' },
  { title: 'Creativity as strategy', text: 'Design multiplies institutional impact.' },
]

export default function AboutOverview() {
  const overview = (
    <div className="flex flex-col gap-16">
      <div>
        <SectionHead eyebrow="Now" title="Current focus" size="sub" />
        <div className="grid-3">{focus.map(f => <FlipCard key={f.title} {...f} />)}</div>
      </div>
      <div>
        <SectionHead eyebrow="Selected" title="Programs and systems" size="sub" />
        <div className="grid-4">
          <PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students" tag="207 students" title="AMERTA" sizes="(min-width: 1024px) 25vw, 100vw" />
          <PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI participants" tag="191 participants" title="ACI" sizes="(min-width: 1024px) 25vw, 100vw" />
          <PhotoCard href="/aero" src="/assets/images/aero/aero-1.jpg" alt="AERO exhibition" tag="19 booths" title="AERO" sizes="(min-width: 1024px) 25vw, 100vw" />
          <Card tone="midnight" href="/sim-kerjasama" className="min-h-[340px]" shape={<Shape kind="ring-u" color="blue" className="w-[160px] right-4 top-0" />}>
            <div className="mt-auto flex flex-col gap-2">
              <Tag outline className="text-white">2 systems</Tag>
              <h3 className="text-white !text-2xl">SIM</h3>
            </div>
          </Card>
        </div>
      </div>
      <div className="pcu-surface-brand rounded-panel p-[clamp(24px,4vw,48px)] relative overflow-hidden">
        <Shape kind="ring-n" color="blue" className="w-[240px] right-6 bottom-0" />
        <p className="pcu-eyebrow text-amber m-0">How I work</p>
        <div className="grid-3 mt-6 relative">
          {principles.map((p, i) => (
            <div key={p.title} className="border-t-2 border-amber pt-4">
              <span className="text-amber font-bold">0{i + 1}</span>
              <p className="m-0 mt-1 text-xl font-bold text-white">{p.title}</p>
              <p className="m-0 mt-1 text-smoke">{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )

  const education = (
    <div className="grid-2 !gap-12 items-start">
      <div className="flex flex-col gap-6">
        <Card shape={<Shape kind="quarter-bl" color="amber" className="w-[88px] right-0 top-0" />}>
          <IconBadge icon={GraduationCap} />
          <Tag>2020 – 2024</Tag>
          <h3 className="!text-2xl">B.A. International Relations</h3>
          <p className="m-0 font-semibold">Universitas Airlangga</p>
          <Details>
            International relations theory, foreign policy analysis and cross-cultural dynamics. Published on U.S.–ASEAN cooperation and Abraham
            Accords diplomacy; Assistant Lecturer in Foreign Policy Analysis; presenter at the 9th ICoCSPA (2023).
          </Details>
        </Card>
        <Card tone="smoke">
          <IconBadge icon={School} tone="aqua" />
          <Tag>2017 – 2020</Tag>
          <h3 className="!text-xl">SMAN 15 Surabaya</h3>
          <p className="m-0 muted">Mathematics & Natural Sciences</p>
        </Card>
      </div>
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-2 gap-4">
          <Card tone="smoke" className="items-center text-center">
            <IconBadge icon={Award} tone="amber" />
            <b className="text-lg">Gold Medal</b>
            <span className="text-sm muted">World Youth Invention & Innovation Award 2022</span>
          </Card>
          <Card tone="smoke" className="items-center text-center">
            <IconBadge icon={Award} />
            <b className="text-lg">Bronze Medal</b>
            <span className="text-sm muted">Your-K, Your-ASEAN Short Video 2022</span>
          </Card>
        </div>
        <div className="pcu-card">
          <div className="flex items-center gap-3">
            <IconBadge icon={BookOpen} size={44} />
            <div><b className="text-3xl">3</b> <span className="muted">peer-reviewed papers</span></div>
          </div>
          <Details summary="Show titles" className="mt-3">
            <ul className="m-0 pl-5 flex flex-col gap-2" lang="id">{publications.map(p => <li key={p}>{p}</li>)}</ul>
          </Details>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <section className="relative overflow-hidden pt-[clamp(40px,6vw,80px)] pb-12 decor-glow-tr decor-grid">
        <Image src="/assets/images/student-services/monev-tias/img-7095.jpg" alt="" aria-hidden fill priority sizes="100vw" className="hero-photo hero-photo--light hero-photo--left" />
        <div className="wrap relative flex flex-wrap gap-12 items-center">
          <div className="arch-photo flex-[0_1_300px] min-w-[220px] aspect-[3/4]">
            <Image src="/assets/images/self-portrait/profile-pic-1.png" alt="Portrait of Zefanya Kharisma Nugroho" fill priority sizes="300px" />
          </div>
          <div className="flex-[1_1_480px] min-w-0 flex flex-col gap-5">
            <span className="pcu-eyebrow text-accent-strong">About</span>
            <h1 className="h-page"><span className="pcu-kicker">International Partnership</span>Zefanya Kharisma Nugroho</h1>
            <p className="lead">Petra Christian University · formerly Airlangga Global Engagement.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <Stat value={stats.years} label="Years" />
              <Stat value="6" label="Roles" />
              <Stat value="5" label="Programs led" />
              <Stat value="2" label="Medals" />
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={contact.cv} download>Download CV</Button>
              <Button href="/contact" variant="outline" className="text-midnight">Get in touch</Button>
            </div>
          </div>
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="pb-24 decor-ring-bl decor-glow-br">
        <div className="wrap">
          <Tabs
            label="About sections"
            tabs={[
              { key: 'overview', label: 'Overview', panel: overview },
              { key: 'experience', label: 'Experience', panel: <Gantt roles={roles} /> },
              { key: 'education', label: 'Education', panel: education },
              { key: 'expertise', label: 'Expertise', panel: <div className="grid-3">{expertise.map(e => <FlipCard key={e.title} {...e} />)}</div> },
              {
                key: 'skills',
                label: 'Skills',
                panel: (
                  <div className="grid-2">
                    {skillGroups.map(g => (
                      <Card key={g.title}>
                        <h3 className="!text-xl">{g.title}</h3>
                        <div className="flex flex-wrap gap-2">{g.tags.map(t => <Tag key={t} outline className="text-midnight !text-sm">{t}</Tag>)}</div>
                      </Card>
                    ))}
                  </div>
                ),
              },
              { key: 'values', label: 'Values', panel: <div className="grid-3">{values.map(v => <FlipCard key={v.title} {...v} />)}</div> },
            ]}
          />
        </div>
      </section>
      <ThemeBand eyebrow="In numbers" value={stats.years} label="Years in international higher education" cta={{ href: '/projects-overview', label: 'See projects' }} />
    </>
  )
}

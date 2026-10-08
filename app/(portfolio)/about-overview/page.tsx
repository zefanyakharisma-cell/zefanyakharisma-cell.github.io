import type { Metadata } from 'next'
import Image from 'next/image'
import {
  BarChart2, Code2, FileCheck, Globe2, Handshake, Heart, Languages, LayoutDashboard, Network, Plane,
} from 'lucide-react'
import { Button, Card, IconBadge, PhotoCard, SectionHead, Shape, Tag } from '@/components/pcu'
import { SkillExplorer } from '@/components/pcu/SkillExplorer'
import { Timeline } from '@/components/pcu/Timeline'
import { roles } from '@/lib/data/experience'
import { contact, stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'About',
  alternates: { canonical: '/about-overview' },
  description: `${stats.years} years in international higher education: partnerships, student mobility and the systems behind them.`,
}

const expertise = [
  { icon: Handshake, title: 'Strategic partnerships', text: `${stats.partners} institutional partners and ${stats.meetingsPerMonth} strategic meetings a month.` },
  { icon: FileCheck, title: 'MoU / MoA coordination', text: `${stats.agreementsPerMonth} partnership agreements reviewed monthly for compliance and fit.` },
  { icon: Plane, title: 'Student mobility', text: 'End-to-end management of 5 exchange programs, 120+ students per semester.' },
  { icon: Heart, title: 'Student welfare & support', text: `Non-academic support for ${stats.studentsPerSemester} international students per semester.` },
  { icon: BarChart2, title: 'Program & budget management', text: `${stats.programBudget} budgets per program, 50+ stakeholders, end-to-end delivery.` },
  { icon: Languages, title: 'Cross-cultural communication', text: 'English–Indonesian interpretation at international conferences and company visits.' },
  { icon: LayoutDashboard, title: 'Systems & process design', text: 'Turning approval rules and reporting needs into SIM Kerjasama and SIM Realisasi.' },
  { icon: Code2, title: 'Digital platforms', text: 'Building purpose-driven websites and dashboards for institutional work.' },
  { icon: Network, title: 'Systems thinking', text: 'Connecting education, digital design and strategy into one working whole.' },
]

const focus = [
  { icon: Globe2, title: 'International education leadership', text: 'Deepening partnership strategy and internationalisation frameworks at Petra Christian University.', status: 'Active' },
  { icon: LayoutDashboard, title: 'Digital systems for partnerships', text: 'Designing SIM Kerjasama and SIM Realisasi, from approval rules to RENSTRA reporting.', status: 'In progress' },
  { icon: Network, title: 'Interdisciplinary problem solving', text: 'Connecting international education, systems thinking and digital design into practical solutions.', status: 'Always' },
]

const milestones = [
  { when: '2022', title: 'Gold Medal, World Youth Invention & Innovation Award', text: 'International recognition for innovation and creative problem solving.' },
  { when: '2022', title: 'Bronze Medal, Your-K Your-ASEAN Short Video Contest', text: 'Visual storytelling and creative communication in an ASEAN context.' },
  { when: '2023', title: 'Research presenter, 9th ICoCSPA', text: 'Presented research on U.S.–ASEAN economic cooperation.' },
  { when: '2023–2024', title: 'Academic publications in IR', text: 'Peer-reviewed papers on U.S. foreign policy, Korea–China THAAD dynamics and the Abraham Accords.' },
  { when: '2024–2025', title: '5 exchange programs led', text: 'AMERTA, ACI, AERO and the KNB and TIAS government scholarship programs.' },
  { when: '2026', title: 'SIM Kerjasama & SIM Realisasi', text: 'Designed the systems of record for PCU partnership agreements and their activities.' },
]

const principles = [
  { title: 'Systems over silos', text: 'Complex problems in international education need connected systems, not one-off fixes.' },
  { title: 'Global orientation, local action', text: 'Every agreement and support case plays out at a human, local level. I keep both in view.' },
  { title: 'Creativity as strategy', text: "Design and systems thinking aren't separate from international education. They multiply its impact." },
]

const interests = [
  { title: 'Visual storytelling', text: 'Award-winning short video work and graphic design for institutional and personal projects.' },
  { title: 'International culture', text: 'Curiosity for cross-cultural dynamics, language, and how global contexts shape education.' },
  { title: 'Design systems', text: 'How good systems create coherence, from brand guidelines to component libraries.' },
  { title: 'Interdisciplinary thinking', text: 'The most interesting problems sit between education, technology and creative practice.' },
]

export default function AboutOverview() {
  return (
    <>
      <section className="section">
        <div className="wrap flex flex-wrap gap-14 items-start">
          <div className="arch-photo flex-[0_1_360px] min-w-[240px] aspect-[3/4]">
            <Image src="/assets/images/self-portrait/profile-pic-1.png" alt="Portrait of Zefanya Kharisma Nugroho" fill priority sizes="360px" />
          </div>
          <div className="flex-[1_1_520px] min-w-0 flex flex-col gap-5">
            <span className="pcu-eyebrow text-accent-strong">About</span>
            <h1 className="h-page">
              <span className="pcu-kicker">International Education Professional</span>
              Zefanya Kharisma Nugroho
            </h1>
            <p className="lead">
              At Petra Christian University I manage relationships with {stats.partners} global partners and facilitate {stats.meetingsPerMonth} strategic
              meetings each month. Before that, at Airlangga Global Engagement, I ran exchange programs and supported {stats.studentsPerSemester} international
              students every semester.
            </p>
            <div className="grid-2 !gap-4 mt-2">
              <Card className="!p-6">
                <Tag>Currently</Tag>
                <h3 className="!text-lg">International Partnership</h3>
                <p className="muted m-0 text-sm">Petra Christian University · Surabaya</p>
              </Card>
              <Card tone="smoke" className="!p-6">
                <Tag>Open to</Tag>
                <p className="m-0 text-[.9375rem]">International partnerships, education consulting, digital projects and speaking.</p>
              </Card>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={contact.cv} download>Download CV</Button>
              <Button href="/contact" variant="outline" className="text-midnight">Get in touch</Button>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Now" title="What I'm building and exploring" />
          <div className="grid-3">
            {focus.map(f => (
              <Card key={f.title}>
                <div className="flex items-center justify-between gap-3">
                  <IconBadge icon={f.icon} size={52} />
                  <Tag outline className="text-midnight">{f.status}</Tag>
                </div>
                <h3 className="!text-xl">{f.title}</h3>
                <p className="muted m-0 text-[.9375rem]">{f.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] items-start">
          <div className="lg:sticky lg:top-24">
            <SectionHead
              eyebrow="Experience"
              title="Where I've worked"
              lead={`${stats.years} years in international higher education: partnerships, mobility programs and student support in Surabaya.`}
            />
            <Button href="/experience" variant="ghost" className="text-midnight">Full experience →</Button>
          </div>
          <Timeline roles={roles} initiallyOpen="pcu" />
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Expertise" title="What I bring" />
          <div className="grid-3">
            {expertise.map(e => (
              <Card key={e.title}>
                <IconBadge icon={e.icon} size={52} />
                <h3 className="!text-xl">{e.title}</h3>
                <p className="muted m-0 text-[.9375rem]">{e.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2 !gap-14 items-start">
          <div>
            <SectionHead eyebrow="Education" title="Background" />
            <Card shape={<Shape kind="quarter-bl" color="amber" className="w-[72px] right-0 top-0" />}>
              <Tag>Jul 2020 – Mar 2024</Tag>
              <h3 className="!text-[1.375rem]">Bachelor&apos;s in International Relations</h3>
              <p className="muted m-0">
                Universitas Airlangga. International relations theory, foreign policy analysis and cross-cultural dynamics. Published research on
                U.S.–ASEAN cooperation and Middle East diplomacy, and presented at the 9th ICoCSPA in 2023.
              </p>
              <Button href="/education" variant="ghost" className="text-midnight self-start">Education details →</Button>
            </Card>
          </div>
          <div>
            <SectionHead eyebrow="Milestones" title="Recognition" />
            <ol className="m-0 p-0 list-none border-t border-line">
              {milestones.map(m => (
                <li key={m.title} className="py-5 border-b border-line grid grid-cols-[96px_1fr] gap-4">
                  <span className="pcu-eyebrow text-ink-muted pt-1">{m.when}</span>
                  <div>
                    <h3 className="!text-lg">{m.title}</h3>
                    <p className="muted m-0 mt-1 text-[.9375rem]">{m.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Selected projects" title="Programs and systems" />
          <div className="grid-4">
            <PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students in a seminar room" tag="Exchange" title="AMERTA" text="Semester exchange, 207 students." sizes="(min-width: 1024px) 25vw, 100vw" />
            <PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI cultural immersion participants" tag="Cultural immersion" title="ACI" text="Learning through culture." sizes="(min-width: 1024px) 25vw, 100vw" />
            <Card tone="midnight" href="/sim-kerjasama" className="min-h-[340px]" shape={<Shape kind="ring-u" color="blue" className="w-[160px] right-4 top-0" />}>
              <div className="mt-auto flex flex-col gap-2">
                <Tag outline className="text-white">MoU · MoA</Tag>
                <h3 className="text-white !text-2xl">SIM Kerjasama</h3>
                <p className="m-0 text-smoke text-[.9375rem]">The system of record for every agreement.</p>
              </div>
            </Card>
            <Card href="/sim-realisasi" className="min-h-[340px]" shape={<Shape kind="quarter-bl" color="teal" className="w-[110px] right-0 top-0" />}>
              <div className="mt-auto flex flex-col gap-2">
                <Tag>RENSTRA</Tag>
                <h3 className="!text-2xl">SIM Realisasi</h3>
                <p className="muted m-0 text-[.9375rem]">Activities and indicators under each agreement.</p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="pcu-surface-brand section relative overflow-hidden">
        <Shape kind="ring-n" color="blue" className="w-[300px] right-[4%] bottom-0" />
        <div className="wrap relative">
          <SectionHead
            light
            eyebrow="Leadership & philosophy"
            title="How I work"
            lead="Whether managing partnerships, designing programs or building digital tools, good work comes from understanding the whole, not just the parts."
          />
          <div className="grid-3">
            {principles.map((p, i) => (
              <div key={p.title} className="border-t-2 border-amber pt-5">
                <span className="pcu-eyebrow text-amber">0{i + 1}</span>
                <h3 className="text-white !text-xl mt-2">{p.title}</h3>
                <p className="text-smoke m-0 mt-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Beyond work" title="Interests" />
          <div className="grid-4">
            {interests.map(it => (
              <div key={it.title} className="border-t-2 border-midnight pt-5">
                <h3 className="!text-lg">{it.title}</h3>
                <p className="muted m-0 mt-2 text-[.9375rem]">{it.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SkillExplorer eyebrow="Skill map" title="Explore by skill" />
    </>
  )
}

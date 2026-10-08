import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button, Card, PhotoCard, SectionHead, Shape, Stat, Tag } from '@/components/pcu'
import { SkillExplorer } from '@/components/pcu/SkillExplorer'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

const competencies = [
  { href: '/partnerships', title: 'International partnership management', text: `${stats.partners} institutional partners and ${stats.agreementsPerMonth} MoU/MoA reviews a month at PCU.` },
  { href: '/onboarding', title: 'International student support', text: `Welfare, mobility and onboarding for ${stats.studentsPerSemester} international students every semester.` },
  { href: '/projects-overview', title: 'Exchange program management', text: `AMERTA, ACI and AERO, with budgets of ${stats.programBudget} per program.` },
  { href: '/sim-kerjasama', title: 'Process and systems design', text: 'Turning approval rules and reporting needs into working software.' },
]

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden pt-[clamp(48px,7vw,96px)] pb-[clamp(56px,8vw,112px)]">
        <div className="wrap flex flex-wrap gap-14 items-center">
          <div className="flex flex-col gap-6 min-w-0 flex-[1_1_480px]">
            <span className="pcu-eyebrow text-accent-strong">International Education · Surabaya</span>
            <h1 className="h-page">Bridging global engagement and digital systems.</h1>
            <p className="lead max-w-[56ch]">
              I&apos;m an International Partnership Specialist at Petra Christian University. I build partnerships with {stats.partners} institutions,
              look after international students, and design the systems that keep it all running.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button href="/projects-overview">See my projects</Button>
              <Button href="/about-overview" variant="outline" className="text-midnight">About me</Button>
            </div>
          </div>

          <div className="relative min-w-0 flex-[1_1_420px] h-[clamp(380px,48vw,520px)]" aria-hidden="false">
            <div aria-hidden className="absolute left-[12%] top-0 w-[46%] h-[78%] bg-midnight" />
            <div aria-hidden className="absolute right-0 top-0 w-[34%] h-[38%] bg-blue" />
            <Shape kind="quarter-br" color="amber" className="right-[8%] top-[38%] w-[26%]" />
            <Shape kind="circle" color="cerise" className="left-0 top-[6%] w-16" />
            <div aria-hidden className="absolute right-0 bottom-0 w-[22%] h-[30%] bg-teal" />
            <Shape kind="ring-u" color="amber" className="right-[4%] top-0 w-[22%]" />
            <div className="arch-photo absolute left-[22%] top-[14%] w-[46%] h-[82%] shadow-card">
              <Image
                src="/assets/images/self-portrait/profile-pic-1.png"
                alt="Portrait of Zefanya Kharisma Nugroho"
                fill
                priority
                sizes="(min-width: 1024px) 280px, 45vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section--smoke pt-2 pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={stats.amertaParticipants} label="AMERTA exchange students across four batches" />
          <Stat value={stats.studentsPerSemester} label="International students supported every semester" />
          <Stat value={stats.partners} label="Institutional partners I manage at PCU" />
          <Stat value={stats.agreementsPerMonth} label="MoU and MoA documents reviewed every month" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Selected work" title="Programs and systems" />
          <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))]">
            <PhotoCard
              href="/amerta"
              src="/assets/images/amerta/amerta-1.jpg"
              alt="AMERTA exchange students in a seminar room"
              tag="Exchange program"
              title="AMERTA"
              text={`${stats.amertaParticipants} students from 14 countries, managed end to end.`}
              className="min-h-[420px]"
            />
            <PhotoCard
              href="/aci"
              src="/assets/images/aci/aci-4.jpg"
              alt="ACI cultural immersion participants"
              tag="Cultural immersion"
              title="ACI"
              text="International and local students learning together through culture."
              className="min-h-[420px]"
            />
            <Card
              tone="midnight"
              href="/sim-kerjasama"
              className="min-h-[420px] justify-end"
              shape={<>
                <Shape kind="ring-n" color="blue" className="w-[220px] -right-10 top-8" />
                <Shape kind="circle" color="amber" className="w-12 right-10 top-[150px]" />
              </>}
            >
              <div className="mt-auto flex flex-col gap-3">
                <Tag outline className="text-white">Information systems</Tag>
                <h3 className="text-white !text-2xl">SIM Kerjasama &amp; SIM Realisasi</h3>
                <p className="m-0 text-smoke text-[.9375rem]">
                  The system of record for PCU&apos;s MoUs and MoAs, and the activities carried out under them.
                </p>
              </div>
            </Card>
          </div>
          <PhotoCard
            href="/aero"
            src="/assets/images/aero/aero-1.jpg"
            alt="AERO exhibition booths"
            tag="Exhibition"
            title="AERO"
            text="An annual exhibition of global partnerships at Universitas Airlangga."
            className="!min-h-[240px] mt-6"
            imagePosition="center 35%"
            sizes="100vw"
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="What I do" title="Core competencies" />
          <div>
            {competencies.map((c, i) => (
              <Link key={c.href} href={c.href} className="row-link">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
                <ArrowRight aria-hidden size={20} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SkillExplorer />
    </>
  )
}

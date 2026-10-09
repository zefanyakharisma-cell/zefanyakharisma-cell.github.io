import type { Metadata } from 'next'
import { PageHero, Shape, Stat, ThemeBand } from '@/components/pcu'
import ProjectGrid from '@/components/projects/ProjectGrid'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'Projects',
  alternates: { canonical: '/projects-overview' },
  description: 'Flagship programs AMERTA, ACI and AERO at Universitas Airlangga, and the SIM Kerjasama and SIM Realisasi systems at Petra Christian University.',
}

export default function ProjectsOverview() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/amerta/amerta-1.jpg' }}
        eyebrow="Projects"
        title={<span className="block max-w-[14ch]">Programs run, systems built</span>}
        lead="Three programs at Universitas Airlangga, two systems at Petra Christian University."
        shapes={<>
          <Shape kind="ring-n" className="theme-ring -right-14 bottom-0 w-[360px] hidden sm:block" />
          <Shape kind="circle" color="amber" className="right-[320px] top-12 w-14" />
        </>}
      />

      <section className="pt-2 pb-10 section--smoke">
        <div className="wrap grid-4 !gap-8">
          <Stat value="3" label="Programs at UNAIR" />
          <Stat value="2" label="Systems at PETRA" />
          <Stat value={stats.amertaParticipants} label="AMERTA students" />
          <Stat value="50+" label="Stakeholders per program" />
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section decor-glow-tr">
        <div className="wrap">
          <ProjectGrid />
        </div>
      </section>
      <ThemeBand eyebrow="Behind the programs" value={stats.studentsPerSemester} label="International students supported every semester at PETRA" cta={{ href: '/engagement', label: 'International education' }} />
    </>
  )
}

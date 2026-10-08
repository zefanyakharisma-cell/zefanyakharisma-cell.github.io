import type { Metadata } from 'next'
import { PageHero, Shape, Stat } from '@/components/pcu'
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
        brand
        eyebrow="Projects"
        title={<span className="block max-w-[14ch]">Programs run, systems built</span>}
        lead="Three programs at Universitas Airlangga, two systems at Petra Christian University."
        shapes={<>
          <Shape kind="ring-n" color="blue" className="-right-14 bottom-0 w-[360px]" />
          <Shape kind="circle" color="amber" className="right-[320px] top-12 w-14" />
        </>}
      />

      <section className="pt-2 pb-10 section--smoke">
        <div className="wrap grid-4 !gap-8">
          <Stat value="3" label="Programs at UNAIR" />
          <Stat value="2" label="Systems at PCU" />
          <Stat value={stats.amertaParticipants} label="AMERTA students" />
          <Stat value="50+" label="Stakeholders per program" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <ProjectGrid />
        </div>
      </section>
    </>
  )
}

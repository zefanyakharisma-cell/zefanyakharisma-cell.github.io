import type { Metadata } from 'next'
import { Card, PageHero, PhotoCard, SectionHead, Shape, Stat, Tag } from '@/components/pcu'
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
        title={<span className="block max-w-[14ch]">Programs I ran and systems I designed</span>}
        lead="Three flagship exchange and engagement programs at Universitas Airlangga, and two connected information systems for Petra Christian University."
        shapes={<>
          <Shape kind="ring-n" color="blue" className="-right-14 bottom-0 w-[360px]" />
          <Shape kind="circle" color="amber" className="right-[320px] top-12 w-14" />
        </>}
      />

      <section className="pt-2 pb-10 section--smoke">
        <div className="wrap grid-4 !gap-8">
          <Stat value="3" label="Flagship programs at Universitas Airlangga" />
          <Stat value={stats.amertaParticipants} label="AMERTA participants across four batches" />
          <Stat value={stats.programBudget} label="Budget per program" />
          <Stat value="50+" label="Stakeholders per program" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Programs" title="Universitas Airlangga" />
          <div className="grid-3">
            <PhotoCard
              href="/amerta"
              src="/assets/images/amerta/amerta-1.jpg"
              alt="AMERTA exchange students in a seminar room"
              tag="Exchange · 2024–2027"
              title="AMERTA"
              text={`The flagship semester exchange: ${stats.amertaParticipants} students from 14 countries and 24 universities.`}
              className="!min-h-[440px]"
            />
            <PhotoCard
              href="/aci"
              src="/assets/images/aci/aci-4.jpg"
              alt="ACI cultural immersion participants"
              tag="Cultural immersion"
              title="ACI"
              text="International and local students together through site visits and structured engagement."
              className="!min-h-[440px]"
            />
            <PhotoCard
              href="/aero"
              src="/assets/images/aero/aero-header-1.jpg"
              alt="AERO exhibition at Universitas Airlangga"
              tag="Exhibition"
              title="AERO"
              text="An annual showcase of global partnerships, with 50+ stakeholders."
              className="!min-h-[440px]"
              imagePosition="center 30%"
            />
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead
            eyebrow="Information systems"
            title="Petra Christian University"
            lead="Two connected systems for the partnerships and international affairs office: one partnership dataset, used by three parties."
          />
          <div className="grid-2">
            <Card
              tone="midnight"
              href="/sim-kerjasama"
              className="min-h-[320px]"
              shape={<Shape kind="ring-u" color="blue" className="w-[200px] right-8 top-0" />}
            >
              <div className="mt-auto flex flex-col gap-3">
                <Tag outline className="text-white">MoU · MoA</Tag>
                <h3 className="text-white !text-[1.75rem]">SIM Kerjasama</h3>
                <p className="m-0 text-smoke">
                  The official system of record for every MoU and MoA: who proposed it, who approved it, when it is valid, and whether it has been renewed.
                </p>
                <span className="text-amber font-semibold">View project →</span>
              </div>
            </Card>
            <Card href="/sim-realisasi" className="min-h-[320px]" shape={<Shape kind="quarter-bl" color="teal" className="w-[120px] right-0 top-0" />}>
              <div className="mt-auto flex flex-col gap-3">
                <Tag>Realisasi · RENSTRA</Tag>
                <h3 className="!text-[1.75rem]">SIM Realisasi</h3>
                <p className="muted m-0">
                  Links every activity to its agreement, calculates the RENSTRA indicators, and sends evidence back to SIM Kerjasama.
                </p>
                <span className="font-semibold underline decoration-blue decoration-[1.5px] underline-offset-4">View project →</span>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  )
}

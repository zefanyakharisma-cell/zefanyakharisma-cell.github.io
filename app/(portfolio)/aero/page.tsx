import type { Metadata } from 'next'
import Image from 'next/image'
import { Building2, CalendarCheck, Globe, Megaphone, Mic, Receipt, Users } from 'lucide-react'
import { CountryCode, Details, FlipCard, PageHero, PhotoCard, PhotoWall, Reveal, SectionHead, Shape, Stat, ThemeBand } from '@/components/pcu'
import { InstitutionLogo } from '@/components/pcu/InstitutionLogo'
import Rundown from '@/components/projects/Rundown'
import { BoothMap } from '@/components/viz/BoothMap'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { Treemap } from '@/components/viz/Treemap'
import { AERO_BUDGET, contributions, GALLERY_IMAGES, highlights, INSTITUTIONS } from '@/lib/data/aero'
import { WritingAboutThis } from '@/components/writing/WritingAboutThis'

// Refreshes "Writing about this" for newly published or scheduled posts.
export const revalidate = 3600

export const metadata: Metadata = {
  title: 'AERO 2025',
  alternates: { canonical: '/aero' },
  description: 'AERO, Airlangga Expanding Reach & Opportunities: the annual internationalisation exhibition at Universitas Airlangga.',
}

const highlightIcons = [Building2, Mic, Globe, Users]
const contributionIcons = [CalendarCheck, Receipt, Building2, Megaphone]
const contributionLabels = ['Logistics', 'Vendors & budget', 'Partners & guests', 'Promotion & report']

const rp = (n: number) => `Rp ${(n / 1_000_000).toFixed(1)}M`

export default function AeroPage() {
  return (
    <>
      <PageHero
        image={{ src: '/assets/images/aero/aero-10.jpg' }}
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Exhibition', 'Universitas Airlangga']}
        kicker="Airlangga Expanding Reach & Opportunities"
        title="AERO 2025"
        lead="UNAIR's internationalisation exhibition · 9–10 May 2025, Surabaya."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image src="/assets/images/aero/aero-header-1.jpg" alt="AERO 2025 exhibition entrance at Universitas Airlangga" fill priority sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover object-[center_30%]" />
        </div>
      </div>

      <section className="section !pb-10 decor-glow-tr">
        <div className="wrap grid-4 !gap-8">
          <Stat value="19" label="Exhibition booths" />
          <Stat value="12" label="Partner institutions" />
          <Stat value="50+" label="Stakeholders" />
          <Stat value="9" label="Student delegations" />
        </div>
      </section>

      <section className="section !pt-6 decor-ring-bl">
        <div className="wrap">
          <SectionHead eyebrow="Floor plan" title="19 booths, one boulevard" lead="Tap a booth to see who was there." />
          <Reveal><BoothMap /></Reveal>
          <Details summary="All institutions" className="mt-6">
            <div className="grid-3 mt-3">
              {INSTITUTIONS.map(g => (
                <div key={g.country}>
                  <p className="m-0 mb-2 font-semibold"><CountryCode country={g.country} /></p>
                  <ul className="m-0 p-0 list-none flex flex-col gap-2 text-[.9375rem]">{g.orgs.map(o => <li key={o.name} className="flex items-center gap-2.5"><InstitutionLogo name={o.name} size={28} />{o.name}</li>)}</ul>
                </div>
              ))}
            </div>
          </Details>
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="What to expect" title="Four highlights" />
          <div className="grid-4">
            {highlights.map((h, i) => {
              const Icon = highlightIcons[i]
              return <FlipCard key={h.title} icon={<Icon aria-hidden />} title={h.title} back={h.desc} />
            })}
          </div>
        </div>
      </section>

      <section className="section relative overflow-hidden decor-glow-br">
        <Shape kind="quarter-bl" color="amber" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead eyebrow="My role" title="What I ran" />
          <Lifecycle
            label="My contributions to AERO 2025"
            steps={contributions.map((c, i) => {
              const Icon = contributionIcons[i]
              return { icon: <Icon size={20} aria-hidden />, title: contributionLabels[i], text: c.desc }
            })}
          />
        </div>
      </section>

      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Schedule" title="Event rundown" lead="9–10 May 2025 · Surabaya" />
          <Rundown />
        </div>
      </section>

      <section className="section decor-ring-tr">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] items-start">
          <div className="flex flex-col gap-4">
            <SectionHead eyebrow="Financials" title="Budget" size="sub" />
            <Stat value={rp(AERO_BUDGET.grandTotal)} label="Grand total" />
          </div>
          <div className="pcu-card">
            <Treemap
              label="AERO 2025 budget by category"
              items={AERO_BUDGET.categories.map(c => ({ label: c.name, value: c.total, display: rp(c.total) }))}
            />
          </div>
        </div>
      </section>

      <section className="section !pt-0 decor-glow-bl">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="Moments" />
          <PhotoWall images={GALLERY_IMAGES} alt="AERO 2025 exhibition" />
        </div>
      </section>

      <div aria-hidden className="pcu-pattern pattern-band" />
      <section className="section section--smoke decor-grid">
        <div className="wrap">
          <SectionHead eyebrow="Related programs" title="Part of the same story" />
          <div className="grid-2">
            <PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students" tag="Semester exchange" title="AMERTA" text="The inbound exchange AERO promotes." sizes="(min-width: 1024px) 50vw, 100vw" />
            <PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI participants" tag="Cultural immersion" title="ACI" text="Culture behind the student performances." sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>
      <WritingAboutThis page="/aero" />
      <ThemeBand eyebrow="Two days" value="19" label="Booths on one boulevard at UNAIR" cta={{ href: '/sim-kerjasama', label: 'Next: SIM Kerjasama' }} />
    </>
  )
}

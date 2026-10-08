import type { Metadata } from 'next'
import Image from 'next/image'
import { Building2, CalendarCheck, Globe, Megaphone, Mic, Package, Receipt, Users, Utensils } from 'lucide-react'
import { Card, CountryCode, IconBadge, PageHero, PhotoCard, SectionHead, Shape, StackedBar, Stat, Tag } from '@/components/pcu'
import { ProcessSteps } from '@/components/pcu/ProcessSteps'
import RotatingGallery from '@/components/projects/RotatingGallery'
import Rundown from '@/components/projects/Rundown'
import { AERO_BUDGET, contributions, CORNERS, GALLERY_IMAGES, highlights, INSTITUTIONS, STUDENT_DELEGATIONS } from '@/lib/data/aero'

export const metadata: Metadata = {
  title: 'AERO 2025',
  alternates: { canonical: '/aero' },
  description: 'AERO, Airlangga Expanding Reach & Opportunities: the annual internationalisation exhibition at Universitas Airlangga.',
}

const highlightIcons = [Building2, Mic, Globe, Users]
const contributionIcons = [CalendarCheck, Receipt, Building2, Megaphone]
const budgetIcons = [Package, Building2, Utensils, Users]

const rp = (n: number) => 'Rp ' + n.toLocaleString('id-ID')

export default function AeroPage() {
  return (
    <>
      <PageHero
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Exhibition', 'Universitas Airlangga']}
        kicker="Airlangga Expanding Reach & Opportunities"
        title="AERO 2025"
        lead="The annual internationalisation exhibition connecting UNAIR students with global partners, alumni and opportunities. 9–10 May 2025, Surabaya."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image src="/assets/images/aero/aero-header-1.jpg" alt="AERO 2025 exhibition entrance at Universitas Airlangga" fill priority sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover object-[center_30%]" />
        </div>
      </div>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value="19" label="Exhibition booths" />
          <Stat value="12" label="Partner universities & institutions" />
          <Stat value="50+" label="Stakeholders" />
          <Stat value="Rp 149.7M" label="Total budget" />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap">
          <SectionHead eyebrow="What to expect" title="Program highlights" />
          <div className="grid-4">
            {highlights.map((h, i) => (
              <Card key={h.title}>
                <IconBadge icon={highlightIcons[i]} size={52} tone={i % 2 ? 'aqua' : 'brand'} />
                <h3 className="!text-lg">{h.title}</h3>
                <p className="muted m-0 text-[.9375rem]">{h.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--smoke relative overflow-hidden">
        <Shape kind="quarter-bl" color="amber" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead eyebrow="My role" title="Contributions" />
          <ProcessSteps steps={contributions.map((c, i) => ({ icon: contributionIcons[i], title: c.title, text: c.desc }))} />
        </div>
      </section>

      <RotatingGallery images={GALLERY_IMAGES} alt="AERO 2025 exhibition" title="Moments from AERO 2025" subtitle="19 booths · 12 partner institutions · 9 student delegations" />

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Institutions"
            title="Participating institutions"
            lead="19 booths: 12 partner universities and institutions, plus 9 international student delegations."
          />
          <div className="grid-3">
            <Card tone="smoke">
              <h3 className="!text-lg">UNAIR internal corners</h3>
              <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                {CORNERS.map(c => (
                  <li key={c.name} className="flex justify-between gap-3">
                    <span>{c.name}</span>
                    <Tag outline className="text-midnight">Booth {c.booth}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
            {INSTITUTIONS.map(g => (
              <Card key={g.country}>
                <h3 className="!text-lg"><CountryCode country={g.country} /></h3>
                <ul className="m-0 p-0 list-none flex flex-col gap-2.5">
                  {g.orgs.map(o => (
                    <li key={o.name} className="flex justify-between gap-3 text-[.9375rem]">
                      <span>{o.name}</span>
                      {o.booth && <Tag outline className="text-midnight flex-none">Booth {o.booth}</Tag>}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <h3 className="!text-xl mt-12 mb-4">International student delegations</h3>
          <ul className="m-0 p-0 list-none flex flex-wrap gap-3">
            {STUDENT_DELEGATIONS.map(s => (
              <li key={s.country} className="flex items-center gap-2 bg-smoke rounded-pill pl-3 pr-4 py-2">
                <CountryCode country={s.country} />
                {s.booth && <span className="text-sm text-ink-muted">· Booth {s.booth}</span>}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Schedule" title="Event rundown" lead="9–10 May 2025 · Universitas Airlangga, Surabaya" />
          <Rundown />
        </div>
      </section>

      <section className="section">
        <div className="wrap grid-2 !gap-12 items-start">
          <div>
            <SectionHead eyebrow="Financials" title="Budget overview" lead="AERO 2025 spending across four categories." />
            <div className="grid grid-cols-2 gap-4">
              {AERO_BUDGET.categories.map((c, i) => (
                <Card key={c.name} tone="smoke" className="!p-5">
                  <IconBadge icon={budgetIcons[i]} size={40} />
                  <p className="m-0 text-sm muted">{c.name}</p>
                  <p className="m-0 font-bold text-lg tabular-nums">{rp(c.total)}</p>
                </Card>
              ))}
            </div>
          </div>
          <Card className="lg:mt-[120px]">
            <p className="pcu-eyebrow text-accent-strong m-0">Grand total</p>
            <p className="m-0 text-[2rem] font-bold tracking-[-0.02em] tabular-nums">{rp(AERO_BUDGET.grandTotal)}</p>
            <StackedBar
              caption="AERO 2025 budget by category"
              segments={AERO_BUDGET.categories.map(c => ({ label: c.name, value: c.total, display: rp(c.total) }))}
            />
          </Card>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap">
          <SectionHead eyebrow="Related programs" title="Part of the same story" />
          <div className="grid-2">
            <PhotoCard href="/amerta" src="/assets/images/amerta/amerta-1.jpg" alt="AMERTA exchange students" tag="Semester exchange" title="AMERTA" text="The flagship inbound exchange that AERO celebrates and promotes every year." sizes="(min-width: 1024px) 50vw, 100vw" />
            <PhotoCard href="/aci" src="/assets/images/aci/aci-4.jpg" alt="ACI participants" tag="Cultural immersion" title="ACI" text="Cultural activities that feed into AERO's student performance program." sizes="(min-width: 1024px) 50vw, 100vw" />
          </div>
        </div>
      </section>
    </>
  )
}

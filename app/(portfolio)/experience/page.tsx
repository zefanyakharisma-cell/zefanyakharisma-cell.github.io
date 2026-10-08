import type { Metadata } from 'next'
import { PageHero } from '@/components/pcu'
import { Timeline } from '@/components/pcu/Timeline'
import { roles } from '@/lib/data/experience'
import { stats } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'Experience',
  alternates: { canonical: '/experience' },
  description: `${stats.years} years building international partnerships and supporting student mobility in Surabaya.`,
}

export default function Experience() {
  return (
    <>
      <PageHero
        back={{ href: '/about-overview', label: 'About' }}
        eyebrow="Experience"
        title="Professional experience"
        lead={`${stats.years} years building international partnerships and supporting student mobility in Surabaya. Open a role to see the detail.`}
      />
      <section className="pb-24">
        <div className="wrap">
          <Timeline roles={roles} initiallyOpen="pcu" />
        </div>
      </section>
    </>
  )
}

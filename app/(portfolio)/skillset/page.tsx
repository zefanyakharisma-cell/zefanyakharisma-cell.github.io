import type { Metadata } from 'next'
import { Card, PageHero, Tag } from '@/components/pcu'

export const metadata: Metadata = {
  title: 'Skillset',
  alternates: { canonical: '/skillset' },
  description: 'Core competencies and professional capabilities.',
}

const groups = [
  { title: 'Partnership & institutional relations', tags: ['Strategic Partnerships', 'MoU/MoA Coordination', 'Stakeholder Management', 'Partnership Development'] },
  { title: 'Mobility & program management', tags: ['Exchange Program Management', 'KNB & TIAS Scholarships', 'Budget Management', 'Vendor Coordination'] },
  { title: 'Student support & welfare', tags: ['International Student Services', 'Immigration Coordination', 'Onboarding', 'Case Management'] },
  { title: 'Systems & data', tags: ['Process Design', 'Information Systems', 'Data Management', 'RENSTRA Reporting'] },
  { title: 'Communication & research', tags: ['Strategic Communications', 'English–Indonesian Interpretation', 'Academic Research', 'Cross-Cultural Communication'] },
]

export default function Skillset() {
  return (
    <>
      <PageHero
        back={{ href: '/about-overview', label: 'About' }}
        eyebrow="Skillset"
        title="Skills and capabilities"
        lead="The professional skills behind my partnership, mobility and systems work."
      />
      <section className="section section--smoke">
        <div className="wrap grid-2">
          {groups.map(g => (
            <Card key={g.title}>
              <h2 className="!text-xl">{g.title}</h2>
              <div className="flex flex-wrap gap-2">
                {g.tags.map(t => <Tag key={t} outline className="text-midnight !text-sm">{t}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

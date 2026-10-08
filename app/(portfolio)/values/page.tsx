import type { Metadata } from 'next'
import { Globe, Handshake, Lightbulb, Target, Users, Zap } from 'lucide-react'
import { Card, IconBadge, PageHero } from '@/components/pcu'

export const metadata: Metadata = {
  title: 'Values',
  alternates: { canonical: '/values' },
  description: 'The principles that guide my work in international education.',
}

const values = [
  { icon: Target, title: 'Excellence & quality', text: 'High standards in program design, partnership development and student support.' },
  { icon: Users, title: 'Inclusivity & equity', text: 'International education should be open to every student, whatever their background.' },
  { icon: Lightbulb, title: 'Innovation & adaptability', text: 'Looking for better approaches to education and partnership, and learning continuously.' },
  { icon: Handshake, title: 'Collaboration & integrity', text: 'Partnerships built on trust, transparency and mutual benefit.' },
  { icon: Globe, title: 'Global citizenship', text: 'Cross-cultural understanding, and students who leave as engaged global citizens.' },
  { icon: Zap, title: 'Student-centred approach', text: "Decisions start from students' success, well-being and growth." },
]

export default function Values() {
  return (
    <>
      <PageHero
        back={{ href: '/about-overview', label: 'About' }}
        eyebrow="Values"
        title="Professional values"
        lead="The principles that guide my work and decisions in international education."
      />
      <section className="section section--smoke">
        <div className="wrap grid-3">
          {values.map(v => (
            <Card key={v.title}>
              <IconBadge icon={v.icon} />
              <h2 className="!text-xl">{v.title}</h2>
              <p className="muted m-0">{v.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

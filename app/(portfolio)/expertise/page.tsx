import type { Metadata } from 'next'
import { BarChart2, FileText, Handshake, Heart, Languages, Plane } from 'lucide-react'
import { Card, IconBadge, PageHero } from '@/components/pcu'

export const metadata: Metadata = {
  title: 'Expertise',
  alternates: { canonical: '/expertise' },
  description: 'Core competencies built through hands-on experience in international higher education.',
}

const expertise = [
  { icon: Handshake, title: 'Strategic partnerships', text: 'Managing 30+ institutional partners, facilitating 15+ strategic meetings a month, and driving joint academic initiatives at PCU.' },
  { icon: FileText, title: 'MoU / MoA coordination', text: 'Reviewing 25+ partnership agreements a month for compliance, institutional fit and timely processing.' },
  { icon: Plane, title: 'Student mobility programs', text: 'End-to-end management of 5 exchange programs, including KNB and TIAS government scholarships, for 120+ students per semester.' },
  { icon: Heart, title: 'International student welfare', text: 'Non-academic support for 100+ students per semester: accommodation, healthcare, insurance, banking and immigration.' },
  { icon: BarChart2, title: 'Program & budget management', text: 'IDR 50–100M budgets per program, coordinating logistics, events and vendors across 50+ stakeholders.' },
  { icon: Languages, title: 'Cross-cultural communication', text: 'English–Indonesian interpretation at conferences and company visits, bridging local and international stakeholders.' },
]

export default function Expertise() {
  return (
    <>
      <PageHero
        back={{ href: '/about-overview', label: 'About' }}
        eyebrow="Expertise"
        title="Areas of expertise"
        lead="Core competencies built through hands-on work in international higher education."
      />
      <section className="section section--smoke">
        <div className="wrap grid-3">
          {expertise.map(e => (
            <Card key={e.title}>
              <IconBadge icon={e.icon} />
              <h2 className="!text-xl">{e.title}</h2>
              <p className="muted m-0">{e.text}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import Image from 'next/image'
import { ClipboardList, Handshake, MapPin, MountainSnow, Star, Users } from 'lucide-react'
import { PageHero, SectionHead, Shape, Stat } from '@/components/pcu'
import { ProcessSteps, type Step } from '@/components/pcu/ProcessSteps'
import RotatingGallery from '@/components/projects/RotatingGallery'
import AciStats from '@/components/projects/AciStats'

export const metadata: Metadata = {
  title: 'ACI',
  alternates: { canonical: '/aci' },
  description: 'Airlangga Cultural Immersion: four batches of guided cultural trips across Java, managed end to end from destination planning to post-event reporting.',
}

const GALLERY_IMAGES = [
  '/assets/images/aci/aci-1.jpg',
  '/assets/images/aci/aci-2.jpg',
  '/assets/images/aci/aci-3.jpg',
  '/assets/images/aci/aci-4.jpg',
  '/assets/images/aci/aci-5.jpg',
  '/assets/images/aci/aci-6.jpg',
  '/assets/images/aci/aci-7.jpg',
  '/assets/images/aci/aci-8.jpg',
  '/assets/images/aci/aci-9.jpg',
  '/assets/images/aci/aci-10.jpg',
  '/assets/images/aci/aci-11.jpg',
  '/assets/images/aci/aci-12.jpg',
  '/assets/images/aci/aci-13.jpg',
  '/assets/images/aci/aci-14.jpg',
  '/assets/images/aci/aci-15.jpg',
]

const steps: Step[] = [
  { icon: MapPin, title: 'Destination Planning', text: 'Researched and selected cultural immersion destinations across Java — Malang, Solo, and Mojokerto — tailoring each batch to offer distinct cultural experiences. Coordinated with local tourism boards and cultural institutions to design meaningful itineraries.' },
  { icon: Handshake, title: 'Vendor Coordination', text: 'Engaged and negotiated with hotels, transportation providers, catering vendors, and cultural experience operators. Drafted vendor agreements, managed procurement timelines, and ensured service quality met program standards.' },
  { icon: Users, title: 'Participant Registration', text: 'Managed end-to-end participant registration for each batch — collecting dietary requirements, emergency contacts, roommate preferences, and travel documentation. Coordinated closely with faculties and AMERTA coordinators to confirm participant lists.' },
  { icon: ClipboardList, title: 'Budget Planning & Control', text: 'Developed detailed program budgets for each batch covering accommodation, transportation, food, activities, and contingencies. Monitored expenditure in real time during program delivery and prepared post-program financial reconciliation reports.' },
  { icon: MountainSnow, title: 'On-Site Delivery', text: 'Led and coordinated all on-site program activities — managing schedules, briefing vendors and volunteers, troubleshooting logistics, and ensuring participant safety and wellbeing throughout each cultural immersion journey.' },
  { icon: Star, title: 'Post-Event Reporting', text: 'Compiled program completion reports covering attendance, budget utilisation, vendor performance, and participant satisfaction survey results. Documented lessons learned and provided recommendations to improve future batches.' },
]

export default function Aci() {
  return (
    <>
      <PageHero
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Cultural immersion', 'Universitas Airlangga']}
        kicker="Airlangga Cultural Immersion"
        title="ACI"
        lead="Four batches of guided cultural trips across Java, managed end to end from destination planning to post-event reporting."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image src="/assets/images/aci/aci-4.jpg" alt="ACI participants on a cultural trip" fill priority sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover" />
        </div>
      </div>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value="191" label="Total participants" />
          <Stat value="4" label="Batches" />
          <Stat value="25+" label="Nationalities" />
          <Stat value="IDR 236M" label="Total budget" />
        </div>
      </section>

      <section className="section !pt-6 relative overflow-hidden">
        <Shape kind="quarter-bl" color="teal" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead
            eyebrow="Program process"
            title="End-to-end responsibilities"
            lead="As coordinator of ACI at Airlangga Global Engagement, I managed the full delivery of 4 cultural immersion trips across three cities in Java — Malang, Solo, and Mojokerto — serving 191 international participants from 25+ countries with a combined budget of IDR 236M."
          />
          <ProcessSteps steps={steps} />
        </div>
      </section>

      <RotatingGallery
        images={GALLERY_IMAGES}
        alt="ACI cultural immersion activity"
        title="Moments from the field"
        subtitle="Four batches · Three cities · 191 participants · 2024–2025"
      />

      <AciStats />
    </>
  )
}

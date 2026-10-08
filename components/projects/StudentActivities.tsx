'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BookOpen, ClipboardList, FileText, HeartHandshake, Plane, Sparkles, X, type LucideIcon } from 'lucide-react'
import { IconBadge, Tag } from '@/components/pcu'

type Activity = {
  id: string
  icon: LucideIcon
  thumbnail: string
  heroImage: string
  gallery?: string[]
  title: string
  preview: string
  role: string
  responsibilities: string[]
  workflow: string
  impact: string
  highlights: string[]
}

const ACTIVITIES: Activity[] = [
  {
    id: 'pickup',
    icon: Plane,
    thumbnail: '/assets/images/student-services/arrival-tias-2025/arrival-tias-2025-1.jpg',
    heroImage: '/assets/images/student-services/arrival-tias-2025/arrival-tias-2025-1.jpg',
    title: 'Student Pick-Up Services',
    preview: 'Coordinating airport arrivals and ensuring every student felt welcomed from their very first moment in Indonesia.',
    role: 'I served as the first point of contact for international students arriving in Surabaya — managing transportation logistics, monitoring flight schedules, and ensuring a seamless first-arrival experience for every student that set a warm, welcoming tone for their entire stay.',
    responsibilities: [
      'Received and reviewed flight manifests from inbound mobility staff',
      'Communicated directly with students before arrival to confirm schedules and needs',
      'Coordinated transportation teams and driver assignments for each batch',
      'Welcomed students personally at Juanda International Airport',
      'Assisted with luggage, local SIM cards, and immediate settlement logistics',
      'Transferred students safely to their designated accommodation',
      'Provided welcome packages with essential Surabaya information and emergency contacts',
    ],
    workflow: 'Received pre-arrival student information → coordinated transportation logistics → monitored live flight schedules → greeted students at arrival terminal → managed first-hour needs (SIM cards, cash, etc.) → transported to accommodation → handed over to buddy system for continued support.',
    impact: 'Ensured 100+ students per semester arrived stress-free and felt genuinely welcomed from day one — setting a positive emotional foundation for their entire study experience in Indonesia.',
    highlights: ['Supported arrivals across multiple flight batches per semester', 'Available for weekend and late-night arrivals', 'Coordinated logistics for students from 20+ countries'],
  },
  {
    id: 'orientation',
    icon: BookOpen,
    thumbnail: '/assets/images/amerta/img-0637.jpg',
    heroImage: '/assets/images/amerta/img-0637.jpg',
    gallery: [
      '/assets/images/amerta/amerta-1.jpg',
      '/assets/images/amerta/fullsizerender.jpg',
      '/assets/images/amerta/img-0570.jpg',
      '/assets/images/amerta/img-0576.jpg',
      '/assets/images/amerta/img-0578.jpg',
      '/assets/images/amerta/img-0589.jpg',
      '/assets/images/amerta/img-0590.jpg',
      '/assets/images/amerta/img-0594.jpg',
      '/assets/images/amerta/img-0629.jpg',
      '/assets/images/amerta/img-0637.jpg',
      '/assets/images/amerta/img-0641.jpg',
      '/assets/images/amerta/img-0642.jpg',
      '/assets/images/amerta/img-0980.jpg',
      '/assets/images/amerta/img-0993.jpg',
      '/assets/images/amerta/img-1003.jpg',
    ],
    title: 'Onboarding & Orientation Session',
    preview: 'Designing and delivering comprehensive orientation programs that helped students adapt academically, culturally, and administratively from day one.',
    role: 'I co-designed and facilitated multi-day orientation sessions that equipped incoming international students with the knowledge, connections, and confidence they needed to succeed at Airlangga and in Surabaya — covering academic, cultural, and administrative dimensions.',
    responsibilities: [
      'Developed orientation program schedules, rundowns, and supporting materials',
      'Facilitated academic information sessions covering course registration and faculty expectations',
      'Coordinated campus tours and introduced students to key offices and services',
      'Delivered cultural adaptation briefings on Indonesian customs, norms, and daily life',
      'Connected students with academic advisors, faculty contacts, and peer mentors',
      'Distributed essential documents: student handbooks, emergency contacts, and resource directories',
      'Facilitated open Q&A sessions and created space for student concerns to be heard',
    ],
    workflow: 'Collaborated with academic and visa staff to define orientation content → prepared logistics and materials → facilitated multi-day program → introduced students to peer buddy network → conducted follow-up check-ins in the first two weeks.',
    impact: 'Successfully onboarded 100+ students per semester, significantly reducing early-stage confusion and improving student confidence during the critical first weeks of their program.',
    highlights: ['Multi-day structured orientation programs', 'Delivered in English with multilingual visual guides', 'Inclusive design accommodating diverse cultural backgrounds'],
  },
  {
    id: 'bestbuddies',
    icon: HeartHandshake,
    thumbnail: '/assets/images/student-services/best-buddies/img-6934.jpg',
    heroImage: '/assets/images/student-services/best-buddies/img-6934.jpg',
    gallery: [
      '/assets/images/student-services/best-buddies/img-6927.jpg',
      '/assets/images/student-services/best-buddies/img-6928.jpg',
      '/assets/images/student-services/best-buddies/img-6929.jpg',
      '/assets/images/student-services/best-buddies/img-6934.jpg',
      '/assets/images/student-services/best-buddies/img-6941.jpg',
    ],
    title: 'Best Buddies Support',
    preview: 'Building a peer mentoring ecosystem where local and international students formed meaningful, lasting cross-cultural friendships.',
    role: 'I coordinated the Best Buddies peer mentoring program — recruiting and training local student volunteers, matching them with international students based on shared interests, and facilitating ongoing relationship support and integration activities throughout the semester.',
    responsibilities: [
      'Recruited local student volunteers through campus-wide outreach campaigns',
      'Designed and delivered buddy mentor training and cultural sensitivity briefings',
      'Matched buddies with international students based on academic interests and backgrounds',
      'Organized buddy kickoff meet-and-greet events to spark initial connections',
      'Monitored buddy relationships and mediated any cultural or communication challenges',
      'Facilitated group activities and cross-cultural social events throughout the semester',
      'Collected regular feedback to continuously improve the matching and support process',
    ],
    workflow: 'Open recruitment campaign → application screening → buddy training and briefing → matching process → kickoff event → semester-long check-ins and group activities → end-of-semester appreciation and feedback collection.',
    impact: 'Created meaningful cross-cultural friendships for 100+ international students per semester, with many buddy pairs maintaining contact long after program completion.',
    highlights: ['50+ trained local student mentors per semester', 'Organized cross-cultural friendship events throughout the semester', 'High continuation rates of buddy relationships post-program'],
  },
  {
    id: 'tax',
    icon: FileText,
    thumbnail: '/assets/images/student-services/tax-report-2025/tax-report-2025-2.jpg',
    heroImage: '/assets/images/student-services/tax-report-2025/tax-report-2025-2.jpg',
    gallery: [
      '/assets/images/student-services/tax-report-2025/tax-report-2025-1.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-2.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-3.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-4.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-5.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-6.jpg',
      '/assets/images/student-services/tax-report-2025/tax-report-2025-7.jpg',
    ],
    title: 'Tax Reporting Support',
    preview: 'Guiding international students through Indonesian tax reporting obligations — turning a complex administrative process into a clear, manageable experience.',
    role: 'I assisted international students — particularly government scholarship recipients — in understanding, preparing for, and completing their Indonesian tax reporting obligations accurately and on time, coordinating across university offices and scholarship authorities to ensure compliance.',
    responsibilities: [
      'Explained Indonesian tax reporting requirements in simple, accessible language',
      'Coordinated with university finance and administrative offices for official guidance',
      'Assisted students in gathering and preparing required documentation',
      'Hosted group information sessions on tax obligations for scholarship holders',
      'Accompanied students to relevant government offices when needed',
      'Followed up individually to ensure timely and accurate submission',
      'Liaised with scholarship offices to confirm compliance status',
    ],
    workflow: 'Identified students with tax reporting obligations → coordinated with finance office for official guidance → hosted group information session → provided individual assistance with documents → monitored submission deadlines → confirmed compliance with scholarship authorities.',
    impact: 'Ensured 100% tax reporting compliance for all government scholarship students, protecting their visa and scholarship status and maintaining institutional credibility with DIKTI.',
    highlights: ['Supported KNB and TIAS scholarship holders', 'Zero compliance issues or missed deadlines', 'Created step-by-step guidance materials in accessible English'],
  },
  {
    id: 'farewell',
    icon: Sparkles,
    thumbnail: '/assets/images/amerta/img-3867.jpg',
    heroImage: '/assets/images/amerta/img-3867.jpg',
    title: 'Farewell Party',
    preview: 'Celebrating the journeys of departing students with memorable farewell events that honored their time in Indonesia and strengthened lasting connections.',
    role: 'I organized and facilitated warm, meaningful farewell celebrations for international students completing their programs — creating a sense of closure, appreciation, and community for both departing students and the staff who supported them throughout their journey.',
    responsibilities: [
      'Planned and coordinated farewell event themes, logistics, and budgets',
      'Curated cultural performances and student talent showcases',
      'Organized student sharing sessions and cultural reflection moments',
      'Coordinated certificate distribution and institutional appreciation gestures',
      'Facilitated alumni network-building and contact sharing sessions',
      'Arranged event photography and video documentation for lasting memories',
      'Supported students with departure logistics and administrative clearance',
    ],
    workflow: 'Planned event concept and theme → coordinated with student committees for program contributions → managed venue and catering → facilitated the event ceremony → documented highlights → supported post-event alumni engagement.',
    impact: 'Created emotionally meaningful closure for 100+ students per semester, with many participants citing the farewell event as one of the most memorable moments of their Indonesia experience.',
    highlights: ['Cultural performance and student talent showcases', 'Institutional certificate and appreciation ceremonies', 'Alumni connection and network-building moments'],
  },
  {
    id: 'monitoring',
    icon: ClipboardList,
    thumbnail: '/assets/images/student-services/monev-tias/img-4586.jpg',
    heroImage: '/assets/images/student-services/monev-tias/img-4586.jpg',
    gallery: [
      '/assets/images/student-services/monev-tias/img-4586.jpg',
      '/assets/images/student-services/monev-tias/img-4589.jpg',
      '/assets/images/student-services/monev-tias/img-4590.jpg',
      '/assets/images/student-services/monev-tias/img-4595.jpg',
      '/assets/images/student-services/monev-tias/img-4596.jpg',
      '/assets/images/student-services/monev-tias/img-4598.jpg',
      '/assets/images/student-services/monev-tias/img-7061.jpg',
      '/assets/images/student-services/monev-tias/img-7067.jpg',
      '/assets/images/student-services/monev-tias/img-7074.jpg',
      '/assets/images/student-services/monev-tias/img-7092.jpg',
      '/assets/images/student-services/monev-tias/img-7095.jpg',
      '/assets/images/student-services/monev-tias/img-7096.jpg',
    ],
    title: 'Monitoring & Evaluation',
    preview: 'Ensuring government scholarship students met all program requirements through structured monitoring, stakeholder reporting, and proactive issue resolution.',
    role: 'I coordinated monitoring and evaluation activities for government-funded scholarship programs — specifically KNB (Kemitraan Negara Berkembang) and TIAS scholarships — ensuring full compliance with program obligations, maintaining accurate student progress records, and communicating regularly with national scholarship authorities.',
    responsibilities: [
      'Conducted regular individual and group check-in meetings with KNB and TIAS scholarship holders',
      'Monitored academic progress, attendance, and wellbeing indicators throughout the semester',
      'Prepared structured progress reports for formal submission to scholarship authorities',
      'Communicated officially with DIKTI and relevant scholarship stakeholders',
      'Organized evaluation sessions and collected qualitative student feedback',
      'Proactively identified and resolved compliance issues before reporting deadlines',
      'Coordinated with academic and visa staff on student status updates and concerns',
    ],
    workflow: 'Established semester-long monitoring schedules → conducted regular check-ins with scholarship holders → collected academic and welfare data → compiled official progress reports → submitted to scholarship offices → addressed any flagged concerns with relevant departments.',
    impact: 'Maintained 100% reporting compliance across all government scholarship programs, ensuring uninterrupted funding and sustaining strong institutional credibility with national scholarship authorities.',
    highlights: ['Full oversight of KNB and TIAS scholarship programs', 'Regular structured reporting to DIKTI', 'Zero reporting compliance failures across all monitored semesters'],
  },
]

export default function StudentActivities() {
  const [active, setActive] = useState<Activity | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  return (
    <>
      <ul className="m-0 p-0 list-none grid-3">
        {ACTIVITIES.map(act => (
          <li key={act.id}>
            <button
              type="button"
              onClick={() => setActive(act)}
              className="pcu-card !p-0 w-full h-full text-left cursor-pointer border-0 flex flex-col overflow-hidden hover:-translate-y-px transition-transform motion-reduce:transition-none"
            >
              <span className="relative block aspect-[16/10] w-full bg-smoke">
                <Image src={act.thumbnail} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </span>
              <span className="flex flex-col gap-2 p-6">
                <span className="flex items-center gap-3">
                  <IconBadge icon={act.icon} size={40} />
                  <span className="text-lg font-bold leading-snug">{act.title}</span>
                </span>
                <span className="font-semibold mt-1">Open →</span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={e => { if (e.target === dialogRef.current) setActive(null) }}
        aria-labelledby="activity-title"
        className="pcu w-[min(880px,calc(100vw-32px))] max-h-[calc(100vh-48px)] p-0 rounded-panel border-0 shadow-card backdrop:bg-midnight/70"
      >
        {active && (
          <div className="flex flex-col">
            <div className="relative h-[clamp(200px,32vw,320px)]">
              <Image src={active.heroImage} alt="" fill sizes="880px" className="object-cover" />
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute top-4 right-4 w-11 h-11 rounded-pill bg-white text-midnight grid place-items-center border-0 cursor-pointer"
              >
                <X aria-hidden size={20} />
              </button>
            </div>
            <div className="p-[clamp(20px,4vw,40px)] flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <IconBadge icon={active.icon} size={52} />
                <h2 id="activity-title" className="h-sub">{active.title}</h2>
              </div>
              <p className="lead m-0">{active.preview}</p>
              <p className="m-0">{active.role}</p>
              <div className="grid-2 !gap-8">
                <div>
                  <h3 className="!text-lg mb-3">Responsibilities</h3>
                  <ul className="m-0 pl-5 flex flex-col gap-2 muted marker:text-accent-strong">
                    {active.responsibilities.map(r => <li key={r}>{r}</li>)}
                  </ul>
                </div>
                <div className="flex flex-col gap-6">
                  <div>
                    <h3 className="!text-lg mb-2">Workflow</h3>
                    <p className="muted m-0">{active.workflow}</p>
                  </div>
                  <div>
                    <h3 className="!text-lg mb-2">Impact</h3>
                    <p className="muted m-0">{active.impact}</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {active.highlights.map(h => <Tag key={h} outline className="text-midnight">{h}</Tag>)}
              </div>
              {active.gallery && active.gallery.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {active.gallery.map((src, i) => (
                    <div key={src} className="relative aspect-square rounded-md overflow-hidden">
                      <Image src={src} alt={`${active.title}, photo ${i + 1}`} fill sizes="280px" className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  )
}

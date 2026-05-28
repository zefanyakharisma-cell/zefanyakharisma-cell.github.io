'use client'
import { useState, useEffect } from 'react'
import { Plane, BookOpen, HeartHandshake, FileText, Sparkles, ClipboardList, ArrowRight, X } from 'lucide-react'

type Activity = {
  id: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any
  color: string
  gradient: string
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
    Icon: Plane,
    color: '#1E3A5F',
    gradient: 'linear-gradient(135deg,#1E3A5F 0%,#4A6B8A 100%)',
    thumbnail: '/assets/images/student-services/10162025_Arrival TIAS /Usman Yahaya Garba.jpg',
    heroImage: '/assets/images/student-services/10162025_Arrival TIAS /Usman Yahaya Garba.jpg',
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
    Icon: BookOpen,
    color: '#4A6B8A',
    gradient: 'linear-gradient(135deg,#4A6B8A 0%,#6B8FAA 100%)',
    thumbnail: '/assets/images/amerta/amerta/IMG_0637.JPG',
    heroImage: '/assets/images/amerta/amerta/IMG_0637.JPG',
    gallery: [
      '/assets/images/amerta/amerta/FullSizeRender 2.JPG',
      '/assets/images/amerta/amerta/FullSizeRender.JPG',
      '/assets/images/amerta/amerta/IMG_0570.JPG',
      '/assets/images/amerta/amerta/IMG_0576.JPG',
      '/assets/images/amerta/amerta/IMG_0578.JPG',
      '/assets/images/amerta/amerta/IMG_0589.JPG',
      '/assets/images/amerta/amerta/IMG_0590.JPG',
      '/assets/images/amerta/amerta/IMG_0594.JPG',
      '/assets/images/amerta/amerta/IMG_0629.JPG',
      '/assets/images/amerta/amerta/IMG_0637.JPG',
      '/assets/images/amerta/amerta/IMG_0641.JPG',
      '/assets/images/amerta/amerta/IMG_0642.JPG',
      '/assets/images/amerta/amerta/IMG_0980.JPG',
      '/assets/images/amerta/amerta/IMG_0993.JPG',
      '/assets/images/amerta/amerta/IMG_1003.JPG',
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
    Icon: HeartHandshake,
    color: '#8B7355',
    gradient: 'linear-gradient(135deg,#8B7355 0%,#A69070 100%)',
    thumbnail: '/assets/images/student-services/best-buddies/IMG_6934.JPG',
    heroImage: '/assets/images/student-services/best-buddies/IMG_6934.JPG',
    gallery: [
      '/assets/images/student-services/best-buddies/IMG_6927.jpeg',
      '/assets/images/student-services/best-buddies/IMG_6928.jpeg',
      '/assets/images/student-services/best-buddies/IMG_6929.jpeg',
      '/assets/images/student-services/best-buddies/IMG_6934.JPG',
      '/assets/images/student-services/best-buddies/IMG_6941.jpeg',
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
    Icon: FileText,
    color: '#059669',
    gradient: 'linear-gradient(135deg,#064E3B 0%,#059669 100%)',
    thumbnail: '/assets/images/student-services/03132025_Tax-Report-2025/Game Baraedi Dintle.jpeg',
    heroImage: '/assets/images/student-services/03132025_Tax-Report-2025/Game Baraedi Dintle.jpeg',
    gallery: [
      '/assets/images/student-services/03132025_Tax-Report-2025/Ariel David Dominguez Cardona.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Game Baraedi Dintle.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Ghulam Muhammad.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Jaqueline Da Silva Figueiredo.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Mohammed Abdullah Ahmed Mareai.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Mojeeb Abdo Abdullah Qasem.jpeg',
      '/assets/images/student-services/03132025_Tax-Report-2025/Zainab Kasenya Selemani.jpeg',
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
    Icon: Sparkles,
    color: '#EA580C',
    gradient: 'linear-gradient(135deg,#7C2D12 0%,#EA580C 100%)',
    thumbnail: '/assets/images/amerta/amerta/IMG_3867.JPG',
    heroImage: '/assets/images/amerta/amerta/IMG_3867.JPG',
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
    Icon: ClipboardList,
    color: '#7C3AED',
    gradient: 'linear-gradient(135deg,#3B0764 0%,#7C3AED 100%)',
    thumbnail: '/assets/images/student-services/monev-tias/IMG_4586.jpeg',
    heroImage: '/assets/images/student-services/monev-tias/IMG_4586.jpeg',
    gallery: [
      '/assets/images/student-services/monev-tias/IMG_4586.jpeg',
      '/assets/images/student-services/monev-tias/IMG_4589.jpeg',
      '/assets/images/student-services/monev-tias/IMG_4590.jpeg',
      '/assets/images/student-services/monev-tias/IMG_4595.jpeg',
      '/assets/images/student-services/monev-tias/IMG_4596.jpeg',
      '/assets/images/student-services/monev-tias/IMG_4598.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7061.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7067.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7074.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7092.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7095.jpeg',
      '/assets/images/student-services/monev-tias/IMG_7096.jpeg',
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

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [active])

  return (
    <>
      {/* Activity Cards Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ACTIVITIES.map(act => (
          <div
            key={act.id}
            onClick={() => setActive(act)}
            className="card rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            style={{ border: '1px solid rgba(28,28,30,0.08)' }}
          >
            {/* Thumbnail */}
            <div className="relative overflow-hidden" style={{ height: 160 }}>
              <img
                loading="lazy"
                src={act.thumbnail}
                alt={act.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ transition: 'transform .5s ease' }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom,transparent 40%,rgba(0,0,0,0.3))' }} />
            </div>
            {/* Body */}
            <div className="p-6">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(28,28,30,0.06)' }}>
                <act.Icon style={{ width: 24, height: 24, color: act.color }} />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#1C1C1E' }}>{act.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: '#5C5C5C' }}>{act.preview}</p>
              <div className="flex items-center gap-1.5" style={{ color: act.color }}>
                <span className="text-xs font-semibold">View Details</span>
                <ArrowRight style={{ width: 13, height: 13 }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 9999, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', padding: '20px' }}
          onClick={() => setActive(null)}
        >
          <div
            className="relative bg-white rounded-2xl overflow-hidden w-full"
            style={{ maxWidth: 680, maxHeight: '90vh', overflowY: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Hero */}
            <div className="relative overflow-hidden" style={{ padding: '48px 40px 40px', minHeight: 200 }}>
              <img
                src={active.heroImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover"
                style={{ zIndex: 0, objectPosition: 'center top' }}
              />
              <div className="absolute inset-0" style={{ zIndex: 1, background: 'linear-gradient(160deg,rgba(10,10,18,0.82) 0%,rgba(18,32,52,0.76) 60%,rgba(26,44,66,0.72) 100%)' }} />
              <div className="absolute -right-8 -top-8 w-48 h-48 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', zIndex: 2 }} />
              <div className="absolute right-16 bottom-4 w-24 h-24 rounded-full" style={{ border: '1.5px solid rgba(255,255,255,0.1)', zIndex: 2 }} />
              {/* Close */}
              <button
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)', zIndex: 10 }}
              >
                <X style={{ width: 16, height: 16, color: '#fff' }} />
              </button>
              {/* Title */}
              <div className="relative" style={{ zIndex: 5 }}>
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <active.Icon style={{ width: 28, height: 28, color: '#fff' }} />
                </div>
                <h2 className="font-heading font-bold text-white mb-2" style={{ fontSize: 'clamp(1.4rem,4vw,1.75rem)' }}>{active.title}</h2>
                <p style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>{active.preview}</p>
              </div>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '32px 40px 40px' }}>
              {/* My Role */}
              <div className="mb-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3 px-2 py-1 rounded" style={{ background: 'rgba(28,28,30,0.05)', color: active.color }}>My Role</span>
                <p style={{ color: '#5C5C5C', lineHeight: 1.7 }}>{active.role}</p>
              </div>
              {/* Key Responsibilities */}
              <div className="mb-8">
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4 px-2 py-1 rounded" style={{ background: 'rgba(28,28,30,0.05)', color: active.color }}>Key Responsibilities</span>
                <div className="space-y-2.5">
                  {active.responsibilities.map((r, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full mt-2.5 flex-shrink-0" style={{ background: active.color }} />
                      <span style={{ color: '#5C5C5C', lineHeight: 1.6 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Workflow */}
              <div className="mb-8 p-5 rounded-xl" style={{ background: 'rgba(28,28,30,0.03)', borderLeft: `3px solid ${active.color}` }}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: active.color }}>Workflow &amp; Process</span>
                <p style={{ color: '#5C5C5C', lineHeight: 1.7, fontSize: '0.9rem' }}>{active.workflow}</p>
              </div>
              {/* Impact */}
              <div className="mb-8 p-5 rounded-xl" style={{ background: 'rgba(28,28,30,0.03)' }}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: active.color }}>Impact</span>
                <p style={{ color: '#5C5C5C', lineHeight: 1.7 }}>{active.impact}</p>
              </div>
              {/* Highlights */}
              <div className={active.gallery?.length ? 'mb-8' : ''}>
                <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: active.color }}>Highlights</span>
                <div className="flex flex-wrap gap-2">
                  {active.highlights.map((h, i) => (
                    <span key={i} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'rgba(28,28,30,0.06)', color: '#1C1C1E' }}>{h}</span>
                  ))}
                </div>
              </div>
              {/* Gallery */}
              {active.gallery && active.gallery.length > 0 && (
                <div className="mt-8 pt-8 border-t" style={{ borderColor: 'rgba(28,28,30,0.1)' }}>
                  <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: active.color }}>Photo Gallery</span>
                  <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
                    {active.gallery.map((img, i) => (
                      <img
                        key={i}
                        loading="lazy"
                        src={img}
                        alt=""
                        className="rounded-xl flex-shrink-0 object-cover"
                        style={{ height: 160, width: 'auto', maxWidth: 240, scrollSnapAlign: 'start' }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

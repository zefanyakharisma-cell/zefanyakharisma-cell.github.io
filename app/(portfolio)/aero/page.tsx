import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Building2, Mic, Globe, Users, CalendarCheck, Receipt, Megaphone, Package, Utensils } from 'lucide-react'
import RotatingGallery from '@/components/projects/RotatingGallery'

export const metadata: Metadata = {
  title: 'AERO 2025',
  alternates: { canonical: '/aero' },
  description: 'AERO — Airlangga Expanding Reach & Opportunities, annual internationalization exhibition at Universitas Airlangga.',
}

const GALLERY_IMAGES = [
  '/assets/images/aero/aero-1.jpg', '/assets/images/aero/aero-2.jpg', '/assets/images/aero/aero-3.jpg',
  '/assets/images/aero/aero-4.jpg', '/assets/images/aero/aero-5.jpg', '/assets/images/aero/aero-6.jpg',
  '/assets/images/aero/aero-7.jpg', '/assets/images/aero/aero-8.jpg', '/assets/images/aero/aero-9.jpg',
  '/assets/images/aero/aero-10.jpg', '/assets/images/aero/aero-11.jpg', '/assets/images/aero/aero-12.jpg',
  '/assets/images/aero/aero-14.jpg', '/assets/images/aero/aero-15.jpg', '/assets/images/aero/aero-16.jpg',
  '/assets/images/aero/aero-20.JPEG', '/assets/images/aero/aero-21.JPEG', '/assets/images/aero/aero-22.JPEG',
  '/assets/images/aero/aero-23.JPEG', '/assets/images/aero/aero-24.JPEG', '/assets/images/aero/aero-25.JPEG',
  '/assets/images/aero/aero-promotional-1.png', '/assets/images/aero/aero-promotional-2.PNG', '/assets/images/aero/aero-promotional-3.JPG',
]

const highlights = [
  { Icon: Building2, color: '#1C1C1E', bg: 'rgba(28,28,30,0.06)', title: 'Partner University Booths', desc: 'Meet representatives from international partner universities and learn about study programs, scholarships, and academic opportunities.' },
  { Icon: Mic,       color: '#4A6B8A', bg: 'rgba(74,107,138,0.08)', title: 'Global Talks & Alumni Sharing', desc: 'Gain firsthand insights from alumni who have studied abroad — covering academic experiences, career prospects, and opportunities encountered.' },
  { Icon: Globe,     color: '#8B7355', bg: 'rgba(139,115,85,0.08)', title: 'Cultural Exchange & Performances', desc: 'Experience the richness of global cultures through artistic performances and interactive activities showcasing traditions from different countries.' },
  { Icon: Users,     color: '#4A5235', bg: 'rgba(74,82,53,0.08)',   title: 'Networking & Interactive Sessions', desc: 'Connect with international experts, alumni, and students from diverse backgrounds in engaging and inspiring sessions.' },
]

const contributions = [
  { n: '01', Icon: CalendarCheck, color: '#1C1C1E', bg: 'rgba(28,28,30,0.06)', title: 'Event Planning & Logistics', desc: 'Planned and coordinated end-to-end event logistics across 50+ stakeholders, including venue setup, scheduling, and operational readiness.' },
  { n: '02', Icon: Receipt,       color: '#8B7355', bg: 'rgba(139,115,85,0.08)', title: 'Vendor Management & Budgeting', desc: 'Managed vendor relationships and procurement within a Rp 149.7M budget, ensuring cost-efficient delivery across all event components.' },
  { n: '03', Icon: Building2,     color: '#4A6B8A', bg: 'rgba(74,107,138,0.08)', title: 'Partner University & Guest Coordination', desc: 'Coordinated partner university booth logistics and facilitated international guest attendance, ensuring smooth communication and on-site experience.' },
  { n: '04', Icon: Megaphone,     color: '#4A5235', bg: 'rgba(74,82,53,0.08)',   title: 'Promotion, Operations & Reporting', desc: 'Led pre-event promotion campaigns, managed on-site operations, and prepared comprehensive post-event completion reports for stakeholders.' },
]

const AERO_BUDGET = {
  categories: [
    { name: 'Event & EO', Icon: Package, color: '#1C1C1E', bg: 'linear-gradient(135deg,#F4F4F4,#EBEBEB)', border: 'rgba(28,28,30,0.15)', total: 92812500 },
    { name: 'Accommodation', Icon: Building2, color: '#4A6B8A', bg: 'linear-gradient(135deg,#EEF2F7,#D8E5EF)', border: 'rgba(74,107,138,0.2)', total: 20000000 },
    { name: 'Meals & Catering', Icon: Utensils, color: '#8B7355', bg: 'linear-gradient(135deg,#F5F1EC,#EDE5D8)', border: 'rgba(139,115,85,0.2)', total: 17250000 },
    { name: 'Honorarium', Icon: Users, color: '#4A5235', bg: 'linear-gradient(135deg,#F1F3EE,#E4E8DC)', border: 'rgba(74,82,53,0.2)', total: 19600000 },
  ],
  grandTotal: 149662500,
}

function fmtRp(n: number) {
  return 'Rp ' + n.toLocaleString('id-ID')
}

const CORNERS = [
  { name: 'European Union Centre', note: 'Universitas Airlangga', booth: 1 },
  { name: 'American Corner', note: 'Universitas Airlangga', booth: 2 },
  { name: 'CYUT-UNAIR Taiwan Centre', note: 'Universitas Airlangga', booth: 3 },
  { name: 'Aussie Banget Corner', note: 'Universitas Airlangga', booth: 4 },
]

const INSTITUTIONS = [
  { country: 'Australia', flag: '🇦🇺', orgs: [{ name: 'The University of Western Australia', booth: 5 }, { name: 'University of New South Wales', booth: 6 }, { name: 'Western Sydney University', booth: null }]},
  { country: 'France', flag: '🇫🇷', orgs: [{ name: 'IFI Campus France', booth: 7 }]},
  { country: 'Japan', flag: '🇯🇵', orgs: [{ name: 'Kumamoto University', booth: 8 }]},
  { country: 'Singapore', flag: '🇸🇬', orgs: [{ name: 'Singapore Management University', booth: null }]},
  { country: 'Malaysia', flag: '🇲🇾', orgs: [
    { name: 'International Islamic University Malaysia (IIUM)', booth: 10 }, { name: 'INTI International University', booth: null },
    { name: 'Universiti Sultan Zainal Abidin (UniSZA)', booth: null }, { name: 'Management and Science University (MSU)', booth: 11 },
    { name: 'Tunku Abdul Rahman University of Management and Technology', booth: 12 }, { name: 'UiTM Cawangan Perlis', booth: null },
    { name: 'Universiti Malaya (UM)', booth: 13 },
  ]},
  { country: 'Organizations', flag: '🌐', orgs: [{ name: 'AIESEC in Surabaya', booth: 14 }]},
]

const STUDENT_DELEGATIONS = [
  { country: 'Myanmar', flag: '🇲🇲', booth: 15 }, { country: 'Cambodia', flag: '🇰🇭', booth: 16 },
  { country: 'Yemen', flag: '🇾🇪', booth: 17 }, { country: 'Sudan', flag: '🇸🇩', booth: 18 },
  { country: 'Vietnam', flag: '🇻🇳', booth: 19 }, { country: 'Mexico', flag: '🇲🇽', booth: null },
  { country: 'Palestine', flag: '🇵🇸', booth: null }, { country: 'Sierra Leone', flag: '🇸🇱', booth: null },
  { country: 'China', flag: '🇨🇳', booth: null },
]

const RUNDOWN = [
  {
    day: 'Pre-Arrival', date: 'Friday, 2 May 2025', label: 'Online Meeting', color: '#767676',
    items: [{ time: '15:00 – 16:00', activity: 'Technical Meeting', venue: 'Online (Zoom)', note: null }],
  },
  {
    day: 'Day 0', date: 'Thursday, 8 May 2025', label: 'Arrival Day', color: '#4A6B8A',
    items: [{ time: 'TBC', activity: 'Participant Arrival & Hotel Check-in', venue: 'Zoom Hotel Dharmahusada, Jl. Dharmahusada No.188, Surabaya', note: null }],
  },
  {
    day: 'Day 1', date: 'Friday, 9 May 2025', label: 'AERO Exhibition', color: '#1C1C1E',
    items: [
      { time: '07:00', activity: 'Transfer to Venue', venue: 'Meet at Hotel Lobby', note: null },
      { time: '07:00 – 08:00', activity: 'Exhibitor Registration & Badge Collection', venue: 'Boulevard Area, UNAIR Library Campus B', note: null },
      { time: '08:00 – 09:00', activity: 'Booth Preparation (Exhibitor Loading In)', venue: 'Exhibition Area', note: null },
      { time: '09:00 – 09:05', activity: 'MC Start — Opening Ceremony', venue: 'Main Stage', note: null },
      { time: '09:05 – 09:15', activity: 'Welcoming Speech — Vice Dean of Academic, Students & Alumni Affairs', venue: 'Main Stage', note: 'Prof. Dr. Bambang Sektiari Lukiswanto, DEA, DVM' },
      { time: '09:15 – 09:20', activity: 'Photo Session with All Participants', venue: 'Main Stage', note: null },
      { time: '09:20 – 09:30', activity: 'Interactive Session — Marking Start of Exhibition', venue: 'Exhibition Area', note: null },
      { time: '09:30 – 10:30', activity: 'Global Talks — Session 1', venue: 'Main Stage', note: 'IIUM · INTI International · Kumamoto University · MSU · Singapore Management University · Western Sydney University' },
      { time: '10:30 – 11:00', activity: 'Interactive Session with Partner University Booths', venue: 'Exhibition Area', note: null },
      { time: '11:00 – 13:00', activity: 'Lunch Break (Friday Prayer)', venue: '—', note: null },
      { time: '13:00 – 14:00', activity: 'AERO Spotlight — Alumni & Student Success Stories', venue: 'Main Stage', note: 'Inbound: Nesrine Kawkeb Aggoun (France) · Outbound: Amrizal Ahmad (Kumamoto), Fiona Lim (NUS)' },
      { time: '14:00 – 15:00', activity: 'Interactive Session with Partner University Booths', venue: 'Exhibition Area', note: null },
      { time: '15:00 – 15:50', activity: 'Global Talks — Session 2', venue: 'Main Stage', note: 'TAR UMT · UiTM Cawangan Perlis · Universiti Malaya · IFI Campus France · UniSZA' },
      { time: '15:50 – 16:00', activity: 'Closing Event', venue: 'Main Stage', note: null },
      { time: '16:00 – 17:00', activity: 'Exhibitors Loading Out', venue: 'Exhibition Area', note: null },
      { time: '17:00 – 18:00', activity: 'Free Time', venue: '—', note: null },
    ],
  },
  {
    day: 'Day 1', date: 'Friday, 9 May 2025', label: 'Networking Dinner', color: '#8B7355',
    items: [
      { time: '18:00 – 18:05', activity: 'Opening — Networking Dinner', venue: 'Ruang Sriwijaya, Lt. 5, ASEEC Tower, Campus B', note: null },
      { time: '18:05 – 18:15', activity: 'Welcoming Speech — Director of Airlangga Global Engagement', venue: '', note: 'Prof. Iman Harymawan, Ph.D' },
      { time: '18:15 – 18:20', activity: 'Photo Session with All Participants', venue: '', note: null },
      { time: '18:25 – 18:30', activity: 'Awarding Session — Best Booth Display', venue: '', note: null },
      { time: '18:30 – 18:35', activity: 'Awarding Session — Outstanding Booth', venue: '', note: null },
      { time: '18:35 – 19:55', activity: 'Dinner & Networking Session', venue: '', note: null },
      { time: '19:55 – 20:00', activity: 'Closing Event', venue: '', note: null },
      { time: '20:00', activity: 'Transfer Back to Hotel', venue: 'Bus at Lobby', note: null },
    ],
  },
  {
    day: 'Day 2', date: 'Saturday, 10 May 2025', label: 'Surabaya City Tour', color: '#4A5235',
    items: [
      { time: '06:00 – 07:30', activity: 'Breakfast', venue: 'Hotel', note: null },
      { time: '07:30 – 08:00', activity: 'Preparation for City Tour', venue: 'Meet at Hotel Lobby', note: null },
      { time: '08:00 – 08:30', activity: 'Transfer to Kota Tua Surabaya', venue: 'Bus from Hotel', note: null },
      { time: '08:30 – 09:00', activity: 'Explore Kota Tua Surabaya', venue: 'Kota Tua, Surabaya', note: null },
      { time: '09:00 – 10:00', activity: 'Tourwagen Trip', venue: 'Guide & LO assisting', note: null },
      { time: '10:00 – 10:30', activity: 'Photo Session at Kota Tua', venue: 'Kota Tua, Surabaya', note: null },
      { time: '10:30 – 11:00', activity: 'Transfer Back to Hotel', venue: '', note: null },
      { time: '11:00 – 12:00', activity: 'Hotel Check-Out (lunch box provided)', venue: 'Hotel', note: null },
    ],
  },
]

export default function AeroPage() {
  return (
    <div style={{ background: '#FAFAF8', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div className="relative overflow-hidden" style={{ padding: '64px 0 48px' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" src="/assets/images/aero/aero-header-1.JPEG" alt="AERO" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg,rgba(28,28,30,0.88) 0%,rgba(44,44,46,0.82) 60%,rgba(60,60,62,0.77) 100%)' }} />
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full" style={{ background: 'rgba(255,255,255,0.03)' }} />
        <div className="absolute right-24 bottom-8 w-48 h-48 rounded-full" style={{ border: '2px solid rgba(255,255,255,0.05)' }} />
        <div className="absolute inset-0 flex items-center justify-end overflow-hidden pr-8 pointer-events-none select-none" aria-hidden="true">
          <span className="font-heading font-bold" style={{ fontSize: 'clamp(5rem,15vw,12rem)', color: 'rgba(255,255,255,0.04)', letterSpacing: '-.04em', lineHeight: 1 }}>AERO</span>
        </div>
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <Link href="/projects-overview" className="inline-flex items-center gap-2 mb-8 px-3.5 py-1.5 rounded-full text-sm font-medium" style={{ background: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)', color: 'rgba(255,255,255,0.9)', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.18)' }}>
            <ArrowLeft style={{ width: 14, height: 14 }} /> Back
          </Link>
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-5 uppercase tracking-wider" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff' }}>Project Management</span>
          <h1 className="font-heading font-bold mb-3 text-white" style={{ fontSize: 'clamp(2.5rem,6vw,4rem)', letterSpacing: '-.02em' }}>AERO 2025</h1>
          <p className="text-base max-w-2xl" style={{ color: 'rgba(255,255,255,0.65)' }}>Airlangga Expanding Reach &amp; Opportunities — annual internationalization exhibition connecting UNAIR students with global partners, alumni, and opportunities. 9–10 May 2025, Surabaya.</p>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-wrap gap-10 py-10" style={{ borderBottom: '1px solid rgba(28,28,30,0.08)' }}>
          {[['19', 'Exhibition Booths'], ['12', 'Partner Universities'], ['50+', 'Stakeholders'], ['Rp 149.7M', 'Total Budget']].map(([val, label]) => (
            <div key={label}>
              <div className="font-heading font-bold text-4xl" style={{ color: '#1C1C1E' }}>{val}</div>
              <div className="text-xs uppercase tracking-wider mt-1" style={{ color: '#767676' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Intro + What to Expect + Contributions ── */}
      <div className="max-w-6xl mx-auto px-6 py-14">
        <p className="text-lg max-w-3xl leading-relaxed mb-14" style={{ color: '#5C5C5C' }}>
          AERO is an internationalization event that opens doors for Universitas Airlangga students to explore global opportunities in education, careers, and cultural exchange — shaping students into future-ready individuals with global insight. Through AERO, students engage directly with international universities, alumni, and professionals.
        </p>

        <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#5C5C5C' }}>What to Expect</span></div>
        <h2 className="font-heading font-bold text-3xl mb-8" style={{ color: '#1C1C1E' }}>Program Highlights</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {highlights.map(h => (
            <div key={h.title} className="rounded-xl p-6" style={{ background: '#F8FAFC', border: '1px solid rgba(28,28,30,0.07)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4" style={{ background: h.bg }}>
                <h.Icon style={{ width: 20, height: 20, color: h.color }} />
              </div>
              <h4 className="font-heading font-semibold text-base mb-2" style={{ color: '#1C1C1E' }}>{h.title}</h4>
              <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{h.desc}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#5C5C5C' }}>My Role</span></div>
        <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Contributions</h2>
        <div className="mt-6">
          {contributions.map(c => (
            <div key={c.n} className="flex gap-6 py-8" style={{ borderTop: '1px solid rgba(28,28,30,0.07)' }}>
              <div className="flex-shrink-0 w-10 pt-0.5">
                <span className="font-heading font-bold text-3xl select-none" style={{ color: 'rgba(28,28,30,0.1)', lineHeight: 1 }}>{c.n}</span>
              </div>
              <div className="flex gap-4 flex-1">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: c.bg }}>
                  <c.Icon style={{ width: 18, height: 18, color: c.color }} />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#1C1C1E' }}>{c.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: '#5C5C5C' }}>{c.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Gallery ── */}
      <RotatingGallery
        images={GALLERY_IMAGES}
        title="Moments from the Event"
        subtitle="19 booths · 12 partner universities · 50+ stakeholders · 9–10 May 2025"
      />

      {/* ── Participants + Rundown + Budget ── */}
      <div style={{ background: '#F2ECE4', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
        <div className="max-w-6xl mx-auto px-6 py-16">

          {/* Participating Institutions */}
          <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#5C5C5C' }}>Institutions</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Participating Institutions</h2>
          <p className="text-sm mb-10" style={{ color: '#5C5C5C' }}>19 booths · 12 partner universities &amp; institutions · 9 international student delegations</p>

          <h3 className="font-heading font-semibold text-base mb-3" style={{ color: '#1C1C1E' }}>UNAIR Internal Corners</h3>
          <div className="grid sm:grid-cols-2 gap-2 mb-8">
            {CORNERS.map(c => (
              <div key={c.name} className="flex items-center gap-3 px-4 py-3 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid rgba(28,28,30,0.08)' }}>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: 'rgba(28,28,30,0.08)', color: '#1C1C1E' }}>B{c.booth}</span>
                <div>
                  <p className="text-sm font-medium" style={{ color: '#1C1C1E' }}>{c.name}</p>
                  <p className="text-xs" style={{ color: '#767676' }}>{c.note}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-heading font-semibold text-base mb-3" style={{ color: '#1C1C1E' }}>
            Partner Universities &amp; Institutions <span className="text-sm font-normal ml-1" style={{ color: '#767676' }}>— 5 countries</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {INSTITUTIONS.map(g => (
              <div key={g.country} className="rounded-lg p-4" style={{ background: '#F8FAFC', border: '1px solid rgba(28,28,30,0.08)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#5C5C5C' }}>{g.flag} {g.country}</p>
                <div className="space-y-1.5">
                  {g.orgs.map(o => (
                    <div key={o.name} className="flex items-center justify-between gap-2">
                      <span className="text-sm" style={{ color: '#1C1C1E' }}>{o.name}</span>
                      {o.booth && <span className="text-xs font-bold px-1.5 py-0.5 rounded flex-shrink-0" style={{ background: 'rgba(28,28,30,0.08)', color: '#1C1C1E' }}>B{o.booth}</span>}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-heading font-semibold text-base mb-3" style={{ color: '#1C1C1E' }}>
            International Student Delegations <span className="text-sm font-normal ml-1" style={{ color: '#767676' }}>— representing their home countries</span>
          </h3>
          <div className="grid sm:grid-cols-3 gap-2 mb-16">
            {STUDENT_DELEGATIONS.map(c => (
              <div key={c.country} className="flex items-center gap-2 px-3 py-2 rounded-lg" style={{ background: '#F8FAFC', border: '1px solid rgba(28,28,30,0.08)' }}>
                <span className="text-base">{c.flag}</span>
                <span className="text-sm" style={{ color: '#1C1C1E' }}>{c.country}</span>
                {c.booth && <span className="text-xs font-bold ml-auto" style={{ color: '#1C1C1E' }}>B{c.booth}</span>}
              </div>
            ))}
          </div>

          {/* Event Rundown */}
          <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#5C5C5C' }}>Schedule</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Event Rundown</h2>
          <p className="text-sm mb-8" style={{ color: '#5C5C5C' }}>9–10 May 2025 · Universitas Airlangga, Surabaya</p>
          <div className="space-y-5 mb-16">
            {RUNDOWN.map((s, si) => (
              <div key={si}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold" style={{ background: `${s.color}18`, color: s.color }}>{s.day}</span>
                  <span className="font-heading font-semibold text-sm" style={{ color: '#1C1C1E' }}>{s.date} — {s.label}</span>
                </div>
                <div className="rounded-xl overflow-auto" style={{ border: '1px solid rgba(28,28,30,0.08)' }}>
                  <table className="w-full" style={{ borderCollapse: 'collapse', minWidth: 500 }}>
                    <tbody>
                      {s.items.map((item, ii) => (
                        <>
                          <tr key={ii}>
                            <td className="py-1.5 pr-4 text-xs font-mono whitespace-nowrap align-top" style={{ color: s.color, width: '8rem', paddingLeft: '1rem' }}>{item.time}</td>
                            <td className="py-1.5 pr-4 text-sm font-medium align-top" style={{ color: '#1C1C1E' }}>{item.activity}</td>
                            <td className="py-1.5 text-xs align-top" style={{ color: '#767676', paddingRight: '1rem' }}>{item.venue}</td>
                          </tr>
                          {item.note && (
                            <tr key={`${ii}-note`}>
                              <td />
                              <td colSpan={2} className="pb-2 text-xs italic" style={{ color: '#767676' }}>{item.note}</td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>

          {/* Budget */}
          <div className="flex items-center gap-3 mb-3"><span className="accent-line" /><span className="text-sm font-semibold" style={{ color: '#5C5C5C' }}>Financials</span></div>
          <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Budget Overview</h2>
          <p className="text-sm mb-8" style={{ color: '#5C5C5C' }}>Budget breakdown across 4 categories — AERO 2025</p>
          <div className="space-y-3 mb-6">
            {AERO_BUDGET.categories.map(cat => (
              <div key={cat.name} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: cat.bg, border: `1px solid ${cat.border}` }}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(0,0,0,0.06)' }}>
                  <cat.Icon style={{ width: 20, height: 20, color: cat.color }} />
                </div>
                <p className="text-sm font-semibold flex-1" style={{ color: '#1C1C1E' }}>{cat.name}</p>
                <p className="font-heading font-bold text-base" style={{ color: cat.color }}>{fmtRp(cat.total)}</p>
              </div>
            ))}
          </div>
          <div className="rounded-xl p-5 flex items-center justify-between" style={{ background: '#1C1C1E', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>Grand Total</p>
              <p className="font-heading font-bold text-2xl" style={{ color: '#fff' }}>{fmtRp(AERO_BUDGET.grandTotal)}</p>
            </div>
            <Receipt style={{ width: 36, height: 36, color: 'rgba(255,255,255,0.2)' }} />
          </div>

          {/* Related */}
          <div className="flex items-center gap-4 mt-16 mb-6">
            <span className="label-small">Related Programs</span>
            <div style={{ flex: 1, height: 1, background: 'rgba(28,28,30,0.08)' }} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { href: '/amerta', title: 'AMERTA', sub: 'Semester Exchange', desc: 'The flagship inbound exchange program that AERO celebrates and promotes annually.' },
              { href: '/aci', title: 'ACI', sub: 'Cultural Immersion', desc: "Cultural integration activities that feed into AERO's student performance program." },
            ].map(card => (
              <Link key={card.href} href={card.href} className="card p-6 block" style={{ textDecoration: 'none' }}>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="font-heading font-bold" style={{ color: '#1C1C1E' }}>{card.title}</span>
                    <span style={{ fontSize: '.72rem', color: '#767676', marginLeft: 8 }}>{card.sub}</span>
                  </div>
                  <ArrowRight style={{ width: 16, height: 16, color: '#8B7355' }} />
                </div>
                <p className="text-sm" style={{ color: '#5C5C5C', lineHeight: 1.6 }}>{card.desc}</p>
              </Link>
            ))}
          </div>

        </div>
      </div>
    </div>
  )
}

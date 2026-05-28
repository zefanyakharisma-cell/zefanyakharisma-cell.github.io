'use client'
import { useState, useEffect, useRef } from 'react'

type Nat = { country: string; flag: string; count: number }
type UniItem = { name: string; count?: number }
type UniGroup = { region: string; items: UniItem[] }
type Faculty = { name: string; count: number }
type Analysis = { icon: string; text: string }

type BatchData = {
  label: string; period: string; students: number; countries: number; uniCount: number
  color: string; bg: string; border: string
  nationalities: Nat[]; universities: UniGroup[]
  faculties: Faculty[] | null; facultyNote: string | null
  analysis: Analysis[]
}

const DATA: Record<string, BatchData> = {
  all: {
    label: 'All Batches', period: '2024 – 2027', students: 207, countries: 14, uniCount: 24,
    color: '#1E3A5F', bg: 'linear-gradient(135deg,#EEF2F7,#D8E5EF)', border: 'rgba(30,58,95,0.15)',
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 114 }, { country: 'Philippines', flag: '🇵🇭', count: 29 },
      { country: 'France', flag: '🇫🇷', count: 14 }, { country: 'Germany', flag: '🇩🇪', count: 10 },
      { country: 'Brunei', flag: '🇧🇳', count: 10 }, { country: 'Australia', flag: '🇦🇺', count: 6 },
      { country: 'Poland', flag: '🇵🇱', count: 6 }, { country: 'Pakistan', flag: '🇵🇰', count: 4 },
      { country: 'Netherlands', flag: '🇳🇱', count: 3 }, { country: 'Cambodia', flag: '🇰🇭', count: 3 },
      { country: 'Singapore', flag: '🇸🇬', count: 2 }, { country: 'UK', flag: '🇬🇧', count: 1 },
      { country: 'Mexico', flag: '🇲🇽', count: 1 }, { country: 'Belgium', flag: '🇧🇪', count: 1 },
    ],
    universities: [
      { region: '🇲🇾 Malaysia', items: [
        { name: 'Universiti Sultan Zainal Abidin (UniSZA)', count: 83 }, { name: 'Universiti Teknologi MARA (UiTM)', count: 16 },
        { name: 'Universiti Kebangsaan Malaysia (UKM)', count: 15 }, { name: 'Management & Science University (MSU)', count: 1 },
      ]},
      { region: '🇵🇭 Philippines', items: [{ name: 'Pangasinan State University', count: 18 }, { name: 'Batangas State University', count: 11 }]},
      { region: '🇫🇷 France', items: [{ name: "Université Le Havre Normandie", count: 9 }, { name: 'VetAgro Sup', count: 4 }, { name: "CESI École d'Ingénieurs", count: 2 }]},
      { region: '🇩🇪 Germany', items: [{ name: 'DHBW Ravensburg', count: 3 }, { name: 'Universität Hamburg', count: 3 }, { name: 'Frankfurt University of Applied Sciences', count: 1 }]},
      { region: '🇧🇳 Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)', count: 10 }]},
      { region: '🇵🇱 Poland', items: [{ name: 'University of Warsaw', count: 6 }]},
      { region: '🇦🇺 Australia', items: [{ name: 'Deakin University', count: 6 }]},
      { region: '🇵🇰 Pakistan', items: [{ name: 'Lahore University of Management Sciences', count: 4 }]},
      { region: '🇳🇱 Netherlands', items: [{ name: 'Fontys University of Applied Sciences', count: 2 }, { name: 'Maastricht University', count: 1 }]},
      { region: '🇰🇭 Cambodia', items: [{ name: 'Royal University of Law & Economics', count: 3 }]},
      { region: '🇸🇬 Singapore', items: [{ name: 'Temasek Polytechnic', count: 2 }]},
      { region: '🇬🇧 United Kingdom', items: [{ name: 'Liverpool John Moores University', count: 1 }]},
      { region: '🇧🇪 Belgium', items: [{ name: 'EPHEC Brussels', count: 1 }]},
      { region: '🇲🇽 Mexico', items: [{ name: 'Universidad Panamericana', count: 1 }]},
    ],
    faculties: [
      { name: 'Social & Political Science (FISIP)', count: 51 }, { name: 'Humanities (FIB)', count: 29 },
      { name: 'Law (FH)', count: 25 }, { name: 'Psychology (FPsi)', count: 23 },
      { name: 'Economy & Business (FEB)', count: 17 }, { name: 'Vocational Studies (FV)', count: 5 },
      { name: 'Veterinary Medicine (FKH)', count: 4 }, { name: 'Medicine, Nursing & others', count: 5 },
    ],
    facultyNote: 'Based on course registrations for AMERTA XXI, XXIII & XXIV. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { icon: '🌍', text: 'Across 4 batches (2024–2027), AMERTA enrolled <strong>207 students from 14 countries</strong> at 24 partner universities.' },
      { icon: '🇲🇾', text: '<strong>Malaysia is the dominant sending country</strong> across all batches, contributing 114 students — 55% of total enrollment.' },
      { icon: '🌏', text: 'Southeast Asian students (Malaysia + Philippines + Brunei) collectively account for over <strong>74%</strong> of total enrollment.' },
      { icon: '📚', text: '<strong>FISIP and FIB</strong> are the most popular study destinations, together hosting 39% of all course registrations across 3 batches.' },
      { icon: '📈', text: 'Geographic diversity grew steadily: <strong>7 → 9 → 7 → 12 countries</strong> per batch, with XXIV being the most diverse to date.' },
    ],
  },
  '21': {
    label: 'AMERTA XXI', period: '2024 – 2025 Sem. 1', students: 68, countries: 7, uniCount: 10,
    color: '#2563EB', bg: 'linear-gradient(135deg,#EFF6FF,#DBEAFE)', border: 'rgba(37,99,235,0.15)',
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 58 }, { country: 'France', flag: '🇫🇷', count: 3 },
      { country: 'Germany', flag: '🇩🇪', count: 2 }, { country: 'Brunei', flag: '🇧🇳', count: 2 },
      { country: 'Belgium', flag: '🇧🇪', count: 1 }, { country: 'Netherlands', flag: '🇳🇱', count: 1 },
      { country: 'Pakistan', flag: '🇵🇰', count: 1 },
    ],
    universities: [
      { region: '🇲🇾 Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }, { name: 'Management & Science University (MSU)' }]},
      { region: '🇫🇷 France', items: [{ name: "Université Le Havre Normandie" }]},
      { region: '🇩🇪 Germany', items: [{ name: 'Universität Hamburg' }]},
      { region: '🇧🇳 Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: '🇧🇪 Belgium', items: [{ name: 'EPHEC Brussels' }]},
      { region: '🇳🇱 Netherlands', items: [{ name: 'Fontys University of Applied Sciences' }]},
      { region: '🇵🇰 Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
    ],
    faculties: [
      { name: 'Social & Political Science (FISIP)', count: 46 }, { name: 'Law (FH)', count: 14 },
      { name: 'Psychology (FPsi)', count: 12 }, { name: 'Economy & Business (FEB)', count: 3 },
      { name: 'Humanities (FIB)', count: 2 }, { name: 'Vocational Studies (FV)', count: 1 }, { name: 'Medicine (FK)', count: 1 },
    ],
    facultyNote: 'From Course-Students sheet. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { icon: '🏆', text: 'AMERTA XXI was the <strong>largest single-batch enrollment</strong> with 68 students — establishing the program\'s scale and operational blueprint.' },
      { icon: '🇲🇾', text: '<strong>Malaysia dominated with 85%</strong> of participants (58 of 68), primarily from UniSZA, reflecting a strong bilateral partnership.' },
      { icon: '🎓', text: '<strong>FISIP was the clear academic preference</strong> — 46 of 79 course registrations (58%) — the highest single-faculty concentration across all batches.' },
      { icon: '🌍', text: 'Despite the strong Malaysian majority, 7 countries were represented, including niche academic perspectives from Belgium, the Netherlands, and Germany.' },
    ],
  },
  '22': {
    label: 'AMERTA XXII', period: '2024 – 2025 Sem. 2', students: 22, countries: 9, uniCount: 9,
    color: '#10B981', bg: 'linear-gradient(135deg,#F0FDF4,#DCFCE7)', border: 'rgba(16,185,129,0.15)',
    nationalities: [
      { country: 'Philippines', flag: '🇵🇭', count: 8 }, { country: 'Poland', flag: '🇵🇱', count: 3 },
      { country: 'France', flag: '🇫🇷', count: 2 }, { country: 'Cambodia', flag: '🇰🇭', count: 2 },
      { country: 'Brunei', flag: '🇧🇳', count: 2 }, { country: 'Australia', flag: '🇦🇺', count: 1 },
      { country: 'Mexico', flag: '🇲🇽', count: 1 }, { country: 'Pakistan', flag: '🇵🇰', count: 1 },
      { country: 'Germany', flag: '🇩🇪', count: 1 },
    ],
    universities: [
      { region: '🇵🇭 Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: '🇵🇱 Poland', items: [{ name: 'University of Warsaw' }]},
      { region: '🇫🇷 France', items: [{ name: "Université Le Havre Normandie" }]},
      { region: '🇰🇭 Cambodia', items: [{ name: 'Royal University of Law & Economics' }]},
      { region: '🇧🇳 Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: '🇦🇺 Australia', items: [{ name: 'Deakin University' }]},
      { region: '🇲🇽 Mexico', items: [{ name: 'Universidad Panamericana' }]},
      { region: '🇵🇰 Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
      { region: '🇩🇪 Germany', items: [{ name: 'Frankfurt University of Applied Sciences' }]},
    ],
    faculties: null,
    facultyNote: null,
    analysis: [
      { icon: '🌍', text: 'AMERTA XXII was the <strong>smallest but most proportionally diverse</strong> batch: 9 nationalities for just 22 students — averaging 1 university per country.' },
      { icon: '🇵🇭', text: 'The Philippines led with <strong>8 students (36%)</strong>. For the first time in program history, <strong>Malaysia was entirely absent</strong> from the batch.' },
      { icon: '🆕', text: '<strong>First appearances</strong> of Mexico and Cambodia — significantly broadening AMERTA\'s global reach beyond Southeast Asia.' },
      { icon: '📋', text: '<strong>Faculty enrollment data was not recorded</strong> for this batch — a documentation gap that was addressed in subsequent semesters.' },
    ],
  },
  '23': {
    label: 'AMERTA XXIII', period: '2025 – 2026', students: 67, countries: 7, uniCount: 10,
    color: '#F97316', bg: 'linear-gradient(135deg,#FFF7ED,#FFEDD5)', border: 'rgba(249,115,22,0.15)',
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 42 }, { country: 'Philippines', flag: '🇵🇭', count: 11 },
      { country: 'Germany', flag: '🇩🇪', count: 5 }, { country: 'Australia', flag: '🇦🇺', count: 4 },
      { country: 'Brunei', flag: '🇧🇳', count: 3 }, { country: 'Netherlands', flag: '🇳🇱', count: 1 },
      { country: 'UK', flag: '🇬🇧', count: 1 },
    ],
    universities: [
      { region: '🇲🇾 Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }]},
      { region: '🇵🇭 Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: '🇩🇪 Germany', items: [{ name: 'DHBW Ravensburg' }, { name: 'Universität Hamburg' }]},
      { region: '🇦🇺 Australia', items: [{ name: 'Deakin University' }]},
      { region: '🇧🇳 Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: '🇳🇱 Netherlands', items: [{ name: 'Fontys / Maastricht University' }]},
      { region: '🇬🇧 United Kingdom', items: [{ name: 'Liverpool John Moores University' }]},
    ],
    faculties: [
      { name: 'Humanities (FIB)', count: 17 }, { name: 'Law (FH)', count: 10 },
      { name: 'Economy & Business (FEB)', count: 6 }, { name: 'Psychology (FPsi)', count: 5 },
      { name: 'Nursing (FKep)', count: 1 }, { name: 'Vocational Studies (FV)', count: 1 },
      { name: 'Science & Technology (FST)', count: 1 },
    ],
    facultyNote: 'From KRS Baru course registration sheet. Students may be enrolled in multiple faculties simultaneously.',
    analysis: [
      { icon: '📈', text: 'AMERTA XXIII <strong>returned to scale with 67 students</strong> after the smaller XXII batch, maintaining the program\'s momentum.' },
      { icon: '🇲🇾', text: 'Malaysia remained the majority at 63%, but <strong>Philippines grew to 16%</strong> and Germany showed a notable 5-student cohort.' },
      { icon: '📚', text: '<strong>Humanities (FIB) overtook FISIP</strong> as the top faculty for the first time — 17 registrations reflect growing interest in Indonesian language and culture.' },
      { icon: '🇬🇧', text: 'The <strong>first British student</strong> joined from Liverpool John Moores University, adding a new European partner to the program network.' },
    ],
  },
  '24': {
    label: 'AMERTA XXIV', period: '2026 – 2027', students: 50, countries: 12, uniCount: 13,
    color: '#A855F7', bg: 'linear-gradient(135deg,#FDF4FF,#FAE8FF)', border: 'rgba(168,85,247,0.15)',
    nationalities: [
      { country: 'Malaysia', flag: '🇲🇾', count: 14 }, { country: 'Philippines', flag: '🇵🇭', count: 10 },
      { country: 'France', flag: '🇫🇷', count: 9 }, { country: 'Poland', flag: '🇵🇱', count: 3 },
      { country: 'Brunei', flag: '🇧🇳', count: 3 }, { country: 'Germany', flag: '🇩🇪', count: 2 },
      { country: 'Singapore', flag: '🇸🇬', count: 2 }, { country: 'Pakistan', flag: '🇵🇰', count: 2 },
      { country: 'Netherlands', flag: '🇳🇱', count: 1 }, { country: 'Australia', flag: '🇦🇺', count: 1 },
      { country: 'Cambodia', flag: '🇰🇭', count: 1 },
    ],
    universities: [
      { region: '🇲🇾 Malaysia', items: [{ name: 'Universiti Sultan Zainal Abidin (UniSZA)' }, { name: 'Universiti Teknologi MARA (UiTM)' }, { name: 'Universiti Kebangsaan Malaysia (UKM)' }]},
      { region: '🇵🇭 Philippines', items: [{ name: 'Pangasinan State University' }, { name: 'Batangas State University' }]},
      { region: '🇫🇷 France', items: [{ name: "Université Le Havre Normandie" }, { name: 'VetAgro Sup' }, { name: "CESI École d'Ingénieurs" }]},
      { region: '🇵🇱 Poland', items: [{ name: 'University of Warsaw' }]},
      { region: '🇧🇳 Brunei', items: [{ name: 'Universiti Brunei Darussalam (UBD)' }]},
      { region: '🇩🇪 Germany', items: [{ name: 'Frankfurt University of Applied Sciences' }]},
      { region: '🇸🇬 Singapore', items: [{ name: 'Temasek Polytechnic' }]},
      { region: '🇵🇰 Pakistan', items: [{ name: 'Lahore University of Management Sciences' }]},
      { region: '🇳🇱 Netherlands', items: [{ name: 'Fontys University of Applied Sciences' }]},
      { region: '🇦🇺 Australia', items: [{ name: 'Deakin University' }]},
      { region: '🇰🇭 Cambodia', items: [{ name: 'Royal University of Law & Economics' }]},
    ],
    faculties: [
      { name: 'Humanities (FIB)', count: 10 }, { name: 'Economy & Business (FEB)', count: 8 },
      { name: 'Psychology (FPsi)', count: 6 }, { name: 'Social & Political Science (FISIP)', count: 5 },
      { name: 'Veterinary Medicine (FKH)', count: 4 }, { name: 'Vocational Studies (FV)', count: 3 },
      { name: 'Law (FH)', count: 1 }, { name: 'Medicine (FK)', count: 1 },
      { name: 'Advanced Technology (FTMM)', count: 1 },
    ],
    facultyNote: 'From Matkul per Mahasiswa sheet. Data reflects applicants — final enrollment may vary. Students may enroll across multiple faculties.',
    analysis: [
      { icon: '🌍', text: 'AMERTA XXIV is the <strong>most geographically diverse batch</strong> with 12 countries — more than any previous iteration of the program.' },
      { icon: '🇫🇷', text: '<strong>France emerged as the 3rd-largest sender</strong> (18%, 9 students) from 3 partner institutions — reflecting a maturing European partnership network.' },
      { icon: '🆕', text: '<strong>Singapore appeared for the first time</strong>, and Veterinary Medicine (FKH) and Advanced Technology (FTMM) debuted as Airlangga study destinations.' },
      { icon: '📊', text: 'Malaysia\'s share dropped from 85% (XXI) to 28% (XXIV), demonstrating strong <strong>diversification of the sending-country portfolio</strong> over program iterations.' },
    ],
  },
}

const TABS = [
  { key: 'all', label: 'All Batches' },
  { key: '21', label: 'AMERTA XXI' },
  { key: '22', label: 'AMERTA XXII' },
  { key: '23', label: 'AMERTA XXIII' },
  { key: '24', label: 'AMERTA XXIV' },
]

export default function AmertaStats() {
  const [active, setActive] = useState('all')
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const bars = contentRef.current.querySelectorAll<HTMLElement>('[data-w]')
    bars.forEach(b => { b.style.width = '0' })
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        contentRef.current?.querySelectorAll<HTMLElement>('[data-w]').forEach(b => {
          b.style.width = b.dataset.w || '0'
        })
      })
    })
  }, [active])

  const d = DATA[active]

  const subtitle = active === 'all'
    ? 'Data compiled from AMERTA XXI–XXIV across 207 participants, 14 nationalities, and 24 partner universities.'
    : `${d.label} · ${d.period} · ${d.students} participants from ${d.countries} countries`

  return (
    <div style={{ background: '#F2ECE4', borderTop: '1px solid rgba(28,28,30,0.07)' }}>
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-3">
          <span className="accent-line" />
          <span className="text-sm font-semibold" style={{ color: '#4A6B8A' }}>Data &amp; Analytics</span>
        </div>
        <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Participant Statistics</h2>
        <p className="text-sm mb-8" style={{ color: '#5C5C5C' }}>{subtitle}</p>

        {/* Batch tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TABS.map(t => {
            const bd = DATA[t.key]
            const isActive = active === t.key
            return (
              <button
                key={t.key}
                onClick={() => setActive(t.key)}
                className="px-4 py-2 rounded-full text-sm font-semibold border transition-all duration-200"
                style={{
                  cursor: 'pointer',
                  background: isActive ? bd.color : 'transparent',
                  color: isActive ? '#fff' : '#5C5C5C',
                  borderColor: isActive ? bd.color : 'rgba(28,28,30,0.2)',
                }}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        <div ref={contentRef}>
          {/* Overview — All Batches shows 4 batch cards */}
          {active === 'all' ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              {(['21','22','23','24'] as const).map(k => {
                const b = DATA[k]
                return (
                  <button
                    key={k}
                    onClick={() => setActive(k)}
                    className="rounded-xl p-5 text-center cursor-pointer hover:shadow-md transition-all duration-200"
                    style={{ background: b.bg, border: `1px solid ${b.border}` }}
                  >
                    <p className="font-heading font-bold text-2xl mb-1" style={{ color: b.color }}>{b.students}</p>
                    <p className="font-heading font-semibold text-sm mb-1" style={{ color: '#0F172A' }}>{b.label}</p>
                    <p className="text-xs mb-3" style={{ color: '#64748B' }}>{b.period}</p>
                    <p className="text-xs" style={{ color: '#64748B' }}>
                      <span style={{ color: b.color, fontWeight: 600 }}>{b.countries}</span> countries ·{' '}
                      <span style={{ color: b.color, fontWeight: 600 }}>{b.uniCount}</span> universities
                    </p>
                  </button>
                )
              })}
            </div>
          ) : (
            <div className="rounded-xl p-6 mb-8 flex flex-wrap gap-8 items-center" style={{ background: d.bg, border: `1px solid ${d.border}` }}>
              {[['Participants', d.students], ['Countries', d.countries], ['Universities', d.uniCount]].map(([label, val]) => (
                <div key={label as string} className="text-center">
                  <p className="font-heading font-bold text-3xl" style={{ color: d.color }}>{val}</p>
                  <p className="text-xs mt-1" style={{ color: '#64748B' }}>{label}</p>
                </div>
              ))}
              <div className="ml-auto text-right">
                <p className="font-heading font-bold text-xl" style={{ color: '#0F172A' }}>{d.label}</p>
                <p className="text-sm" style={{ color: '#64748B' }}>{d.period}</p>
              </div>
            </div>
          )}

          {/* Nationalities */}
          <h3 className="font-heading font-semibold text-lg mb-5" style={{ color: '#0F172A' }}>
            Nationalities <span className="text-sm font-normal ml-2" style={{ color: '#64748B' }}>— {d.nationalities.length} countries</span>
          </h3>
          <div className="space-y-3 mb-10">
            {d.nationalities.map(n => {
              const barPct = ((n.count / d.nationalities[0].count) * 100).toFixed(1)
              const sharePct = ((n.count / d.students) * 100).toFixed(0)
              return (
                <div key={n.country} className="flex items-center gap-3">
                  <span className="text-base w-7 flex-shrink-0">{n.flag}</span>
                  <span className="text-sm w-28 flex-shrink-0" style={{ color: '#0F172A' }}>{n.country}</span>
                  <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', height: 10 }}>
                    <div
                      data-w={`${barPct}%`}
                      style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: 'linear-gradient(90deg,#1E3A5F,#4A6B8A)' }}
                    />
                  </div>
                  <span className="text-sm font-semibold w-8 text-right" style={{ color: '#1E3A5F' }}>{n.count}</span>
                  <span className="text-xs w-9 text-right" style={{ color: '#94A3B8' }}>{sharePct}%</span>
                </div>
              )
            })}
          </div>

          {/* Universities */}
          <h3 className="font-heading font-semibold text-lg mb-5" style={{ color: '#0F172A' }}>
            Partner Universities <span className="text-sm font-normal ml-2" style={{ color: '#64748B' }}>— {d.uniCount} institutions</span>
          </h3>
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            {d.universities.map(g => (
              <div key={g.region} className="rounded-lg p-4" style={{ background: '#F8FAFC', border: '1px solid rgba(74,107,138,0.12)' }}>
                <p className="text-xs font-semibold mb-2" style={{ color: '#1E3A5F' }}>{g.region}</p>
                <div className="space-y-1.5">
                  {g.items.map(item => (
                    <div key={item.name} className="flex justify-between items-center gap-2">
                      <span className="text-sm" style={{ color: '#0F172A' }}>{item.name}</span>
                      {item.count != null && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0" style={{ background: 'rgba(30,58,95,0.1)', color: '#1E3A5F' }}>{item.count}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Faculties */}
          <h3 className="font-heading font-semibold text-lg mb-2" style={{ color: '#0F172A' }}>Faculty Enrollment at Airlangga</h3>
          {d.faculties ? (
            <>
              {d.facultyNote && <p className="text-xs mb-5" style={{ color: '#94A3B8' }}>{d.facultyNote}</p>}
              <div className="space-y-3 mb-10">
                {d.faculties.map(f => {
                  const pct = ((f.count / d.faculties![0].count) * 100).toFixed(1)
                  return (
                    <div key={f.name} className="flex items-center gap-3">
                      <span className="text-sm flex-shrink-0" style={{ color: '#0F172A', maxWidth: 'min(13rem,40vw)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={f.name}>{f.name}</span>
                      <div className="flex-1 rounded-full overflow-hidden" style={{ background: '#F1F5F9', height: 10 }}>
                        <div
                          data-w={`${pct}%`}
                          style={{ height: 10, borderRadius: 999, transition: 'width .55s ease', background: 'linear-gradient(90deg,#1E3A5F,#4A6B8A)' }}
                        />
                      </div>
                      <span className="text-sm font-semibold w-8 text-right" style={{ color: '#1E3A5F' }}>{f.count}</span>
                    </div>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="rounded-lg p-6 mb-10 text-center" style={{ background: '#F8FAFC', border: '1px dashed rgba(100,116,139,0.3)' }}>
              <p className="text-sm" style={{ color: '#94A3B8' }}>📋 Faculty enrollment data was not recorded for this batch.</p>
            </div>
          )}

          {/* Analysis */}
          <div className="rounded-xl p-6" style={{ background: 'linear-gradient(135deg,#EEF2F7,#D8E5EF)', border: '1px solid rgba(30,58,95,0.12)' }}>
            <h3 className="font-heading font-semibold text-base mb-4" style={{ color: '#0F172A' }}>Batch Analysis</h3>
            <div className="space-y-3">
              {d.analysis.map((a, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <span className="text-xl flex-shrink-0 mt-0.5">{a.icon}</span>
                  <p className="text-sm leading-relaxed" style={{ color: '#475569' }} dangerouslySetInnerHTML={{ __html: a.text }} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

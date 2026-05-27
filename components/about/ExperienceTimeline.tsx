'use client'

import { useState } from 'react'
import { Briefcase, Plane, BookOpen, Mic2, Search, ChevronDown } from 'lucide-react'

const experiences = [
  {
    id: 'pcu',
    icon: Briefcase,
    iconBg: '#1E3A5F',
    badge: 'Current',
    title: 'International Partnership',
    org: 'Petra Christian University · Surabaya',
    orgColor: '#1E3A5F',
    period: 'Mar 2026 – Present',
    summary: ['Manage 30+ institutional partners & review 25+ MoU/MoA monthly', 'Facilitate 15+ strategic partnership meetings per month', 'Initiate collaborations to strengthen PCU\'s global presence'],
    detail: 'Building and strengthening institutional partnerships to expand PCU\'s global presence and international grant access.',
    bullets: ['Manage communication with 30+ institutional partners monthly', 'Review 25+ partnership agreements (MoU/MoA) per month for compliance', 'Facilitate 15+ strategic partnership meetings per month with minutes within 24hrs', 'Initiate collaborations to expand international grant access'],
    tags: ['International Partnership', 'MoU/MoA', 'Stakeholder Management', 'Strategic Communications'],
    pulse: true,
  },
  {
    id: 'age',
    icon: Plane,
    iconBg: '#4A6B8A',
    title: 'Airlangga Global Engagement',
    org: 'Airlangga Global Engagement · Surabaya',
    orgColor: '#4A6B8A',
    period: 'Jan 2024 – Mar 2026',
    summary: ['Managed 5 exchange programs end-to-end with IDR 50–100M budgets', 'Welfare support for 100+ students — accommodation, healthcare, immigration'],
    detail: '',
    bullets: [],
    tags: ['Exchange Programs', 'Budget Management', 'Student Support', 'Project Management'],
    multi: [
      { title: 'International Mobility & Global Reputation', period: 'Sep 2025 – Mar 2026', bullets: ['Managed 5 end-to-end exchange programs — promotion, pre-departure, arrival, study period, post-program', 'Budget management of IDR 50–100M per program across 50+ stakeholders', 'High-quality exchange experiences for 120+ international students per semester'], tags: ['Exchange Programs', 'Budget Management', 'Project Management', 'Leadership'] },
      { title: 'International Student & Mobility', period: 'Jan 2024 – Sep 2025', bullets: ['End-to-end welfare support — accommodation, healthcare, insurance, banking, immigration', 'Coordinated across 10+ stakeholders including faculties, hospitals, banks, immigration', 'Managed KNB & TIAS government scholarship processing and student welfare cases'], tags: ['Student Support', 'Welfare Coordination', 'Immigration', 'Stakeholder Management'] },
    ],
  },
  {
    id: 'lecturer',
    icon: BookOpen,
    iconBg: '#8B7355',
    title: 'Assistant Lecturer — Foreign Policy Analysis',
    org: 'Universitas Airlangga',
    orgColor: '#8B7355',
    period: 'Sep 2023 – Jan 2024',
    summary: ['Co-facilitated Foreign Policy Analysis for undergraduate IR students', 'Moderated debates & managed grading, scheduling, and coordination'],
    bullets: ['Co-facilitated Foreign Policy Analysis discussions for undergraduate IR students', 'Moderated debates and facilitated critical analysis sessions', 'Managed grading, scheduling, and administrative coordination'],
    tags: ['Teaching', 'Foreign Policy', 'Academic Leadership'],
  },
  {
    id: 'coordinator',
    icon: Mic2,
    iconBg: '#8B7355',
    title: 'Intl. Program & Inbound Coordinator',
    org: 'Koordinasi Informasi dan Kehumasan FISIP Unair',
    orgColor: '#8B7355',
    period: 'Jun 2023 – Jan 2024',
    summary: ['Coordinated logistics for foreign lecturers and visiting students', 'English–Indonesian interpretation at conferences and guest lectures'],
    bullets: ['Coordinated logistics and program delivery for foreign lecturers and visiting students', 'English–Indonesian interpretation at conferences, guest lectures, and company visits', 'Primary point of contact for all inbound international guests'],
    tags: ['International Coordination', 'Interpretation', 'Event Management'],
  },
  {
    id: 'research',
    icon: Search,
    iconBg: 'rgba(28,28,30,0.18)',
    iconColor: '#5C5C5C',
    title: 'Research Assistant',
    org: 'Universitas Airlangga',
    orgColor: '#5C5C5C',
    period: 'May 2023 – Jan 2024',
    summary: ['Researched U.S.–ASEAN economic cooperation across Biden & Trump administrations', 'Contributed to paper presented at the 9th ICoCSPA 2023'],
    bullets: ['Researched U.S.–ASEAN economic cooperation across Biden and Trump administrations', 'Contributed to paper presented at the 9th ICoCSPA 2023', 'Synthesized U.S.–China economic dynamics into structured research briefs'],
    tags: ['Academic Research', 'International Relations', 'Policy Analysis'],
  },
]

export default function ExperienceTimeline() {
  const [open, setOpen] = useState<string | null>(null)

  return (
    <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4"><span className="accent-line" /><span className="label-small">Career Timeline</span></div>
          <h2 className="font-heading font-bold text-3xl" style={{ color: '#1C1C1E' }}>Professional Experience</h2>
        </div>
        <p className="text-sm mb-12" style={{ color: '#5C5C5C', maxWidth: 520 }}>3+ years in international higher education — building partnerships, leading mobility programs, and supporting global students across Surabaya.</p>

        <div className="relative">
          <div className="absolute left-5 top-2 bottom-2 w-px hidden md:block" style={{ background: 'linear-gradient(to bottom,#1E3A5F,#4A6B8A,#8B7355,rgba(28,28,30,0.06))' }} />
          <div className="space-y-4">
            {experiences.map(exp => (
              <div key={exp.id} className="md:pl-16 relative">
                <div className="hidden md:flex absolute left-0 top-6 w-10 h-10 rounded-full items-center justify-center z-10"
                  style={{ background: exp.iconBg, boxShadow: `0 0 0 3px #FAFAF8, 0 0 0 5px ${exp.iconBg}`, animation: exp.pulse ? 'about-tl-pulse 2.5s ease-in-out infinite' : undefined }}>
                  <exp.icon style={{ width: 16, height: 16, color: exp.iconColor || '#fff' }} />
                </div>
                <div className="card overflow-hidden">
                  <button className="w-full text-left p-6" onClick={() => setOpen(open === exp.id ? null : exp.id)}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                      <div className="flex-1">
                        {exp.badge && <div className="flex items-center gap-2 mb-1.5"><span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ background: 'rgba(30,58,95,0.1)', color: '#1E3A5F' }}>{exp.badge}</span></div>}
                        {exp.multi ? (
                          <>
                            <p className="text-sm font-semibold mb-2" style={{ color: exp.orgColor }}>{exp.org}</p>
                            {exp.multi.map((m, i) => (
                              <div key={i} className={i > 0 ? 'mt-3 pt-3' : ''} style={i > 0 ? { borderTop: '1px solid rgba(28,28,30,0.06)' } : {}}>
                                <h3 className="font-heading font-semibold text-base" style={{ color: '#1C1C1E' }}>{m.title}</h3>
                                <p className="text-xs mb-1.5" style={{ color: '#767676' }}>{m.period}</p>
                                <ul className="space-y-1">
                                  {exp.summary?.slice(i === 0 ? 0 : 1, i === 0 ? 1 : 2).map((s, j) => (
                                    <li key={j} className="flex gap-1.5 text-xs" style={{ color: '#5C5C5C' }}>
                                      <span style={{ color: exp.orgColor, flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </>
                        ) : (
                          <>
                            <h3 className="font-heading font-semibold text-lg" style={{ color: '#1C1C1E' }}>{exp.title}</h3>
                            <p className="text-sm font-medium mt-0.5" style={{ color: exp.orgColor }}>{exp.org}</p>
                            <ul className="mt-2 space-y-1">
                              {(exp.summary || []).map((s, i) => (
                                <li key={i} className="flex gap-1.5 text-xs" style={{ color: '#5C5C5C' }}>
                                  <span style={{ color: exp.orgColor, flexShrink: 0, marginTop: 1 }}>✓</span>{s}
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span className="label-small" style={{ color: '#767676' }}>{exp.period}</span>
                        <ChevronDown style={{ width: 16, height: 16, color: '#767676', transition: 'transform .25s', transform: open === exp.id ? 'rotate(180deg)' : 'rotate(0deg)', flexShrink: 0 }} />
                      </div>
                    </div>
                  </button>

                  {open === exp.id && (
                    <div style={{ borderTop: '1px solid rgba(28,28,30,0.06)' }}>
                      <div className="p-6 pt-5">
                        {exp.multi ? (
                          exp.multi.map((m, i) => (
                            <div key={i} className={i > 0 ? 'mt-5 pt-5' : ''} style={i > 0 ? { borderTop: '1px solid rgba(28,28,30,0.06)' } : {}}>
                              <h4 className="font-heading font-semibold text-sm mb-1" style={{ color: '#1C1C1E' }}>{m.title}</h4>
                              <p className="text-xs mb-3" style={{ color: '#767676' }}>{m.period}</p>
                              <ul className="space-y-2 mb-3">
                                {m.bullets.map((b, j) => (
                                  <li key={j} className="flex gap-2 text-sm" style={{ color: '#5C5C5C' }}>
                                    <span style={{ color: exp.orgColor, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
                                  </li>
                                ))}
                              </ul>
                              <div className="flex flex-wrap gap-2">{m.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                            </div>
                          ))
                        ) : (
                          <>
                            {exp.detail && <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C' }}>{exp.detail}</p>}
                            <ul className="space-y-2 mb-5">
                              {(exp.bullets || []).map((b, i) => (
                                <li key={i} className="flex gap-2 text-sm" style={{ color: '#5C5C5C' }}>
                                  <span style={{ color: exp.iconBg, flexShrink: 0, marginTop: 2 }}>✓</span>{b}
                                </li>
                              ))}
                            </ul>
                            <div className="flex flex-wrap gap-2">{(exp.tags || []).map(t => <span key={t} className="tag">{t}</span>)}</div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

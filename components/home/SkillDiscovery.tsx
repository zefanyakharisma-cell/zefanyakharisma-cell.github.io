'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'

const discoveryItems = [
  { id: 'partnerships', title: 'International Partnership Management', category: 'Experience', description: 'Managing 30+ institutional partners, reviewing 25+ MoU/MoA agreements monthly at Petra Christian University.', skills: ['International Partnership', 'Leadership', 'Systems Thinking', 'Cross-Cultural Communication'], page: 'partnerships', accent: '#4A6B8A' },
  { id: 'mou', title: 'MoU / MoA Coordination', category: 'Experience', description: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment.', skills: ['International Partnership', 'Leadership', 'Systems Thinking'], page: 'mou', accent: '#4A6B8A' },
  { id: 'amerta', title: 'AMERTA Exchange Program', category: 'Project', description: "Universitas Airlangga's flagship semester exchange — 120+ students, IDR 50–100M budget per cohort.", skills: ['Student Mobility', 'Project Management', 'International Partnership', 'Leadership', 'Student Support'], page: 'amerta', accent: '#6B4F32' },
  { id: 'aci', title: 'ACI — Airlangga Cultural Immersion', category: 'Project', description: 'Structured engagement program connecting international and local students through cultural experience.', skills: ['Student Mobility', 'Project Management', 'Student Support', 'Cross-Cultural Communication'], page: 'aci', accent: '#6B4F32' },
  { id: 'aero', title: 'AERO Exhibition', category: 'Project', description: 'Annual exhibition at Universitas Airlangga showcasing global partnerships and international programs.', skills: ['Project Management', 'International Partnership', 'Branding', 'Creative Direction'], page: 'aero', accent: '#6B4F32' },
  { id: 'pcu-global', title: 'PCU Global — International Office Website', category: 'Project', description: "Rebuilding PCU's International Office online presence with a full-stack web app, news CMS, partnership directory, and mobile-first design.", skills: ['Full-Stack Development', 'Front-End Development', 'UI/UX Design', 'International Partnership', 'Digital Strategy', 'Web Experience', 'Branding'], page: 'pcu-global', accent: '#003087' },
  { id: 'intl-grants', title: 'International Grants System', category: 'Experience', description: 'Building a digital and physical system to inform, maintain, and execute international grants at Petra Christian University.', skills: ['International Partnership', 'Systems Thinking', 'Digital Strategy', 'Student Support', 'Internationalization'], page: 'intl-grants', accent: '#064E3B' },
  { id: 'onboarding', title: 'Student Onboarding & Orientation', category: 'Experience', description: 'End-to-end welfare support for 100+ international students per semester — housing, healthcare, immigration.', skills: ['Student Support', 'Student Mobility', 'Cross-Cultural Communication', 'Systems Thinking'], page: 'onboarding', accent: '#4A5235' },
  { id: 'engagement', title: 'Student Engagement Initiatives', category: 'Experience', description: 'Building meaningful connections and fostering personal growth for exchange students through curated programs.', skills: ['Student Support', 'Leadership', 'Cross-Cultural Communication'], page: 'engagement', accent: '#4A5235' },
  { id: 'websites', title: 'Web Development & Design', category: 'Creative', description: 'Responsive, user-centered websites for institutional communications and international engagement.', skills: ['Full-Stack Development', 'Front-End Development', 'UI/UX Design', 'Web Experience', 'Digital Strategy'], page: 'pcu-global', accent: '#8B7355' },
  { id: 'designs', title: 'Graphic Design & Branding', category: 'Creative', description: 'Strategic visual design for institutional identity, event collateral, and international partnerships.', skills: ['Branding', 'Creative Direction', 'UI/UX Design', 'Digital Strategy'], page: 'croissantsmoon', accent: '#8B7355' },
  { id: 'expertise', title: 'Areas of Expertise', category: 'About', description: 'Core competencies built through 3+ years in international higher education and creative digital work.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Internationalization', 'Leadership'], page: 'expertise', accent: '#1E3A5F' },
  { id: 'croissantsmoon', title: 'CroissantsMoon — Creative Identity', category: 'Creative', description: 'A future-facing boutique studio identity in development — editorial design, web experiences, brand systems.', skills: ['Branding', 'Creative Direction', 'UI/UX Design', 'Digital Strategy', 'Web Experience', 'Full-Stack Development'], page: 'croissantsmoon', accent: '#D4B15A' },
  { id: 'writing', title: 'Writing & Reflections', category: 'Writing', description: 'Essays and insights on international education, leadership, systems thinking, and digital craft.', skills: ['Writing', 'Leadership', 'Internationalization', 'Digital Strategy', 'Systems Thinking'], page: 'writing', accent: '#5C5C5C' },
  { id: 'skillset', title: 'Full Skillset Overview', category: 'About', description: 'A complete map of technical, professional, and creative competencies.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Leadership', 'UI/UX Design', 'Full-Stack Development', 'Branding', 'Systems Thinking', 'Writing'], page: 'skillset', accent: '#1C1C1E' },
]

const manualIndex = [
  { title: 'About Me', subtitle: 'Profile Overview', page: 'about-overview', accent: '#1E3A5F', keywords: 'about profile overview background zefanya specialist' },
  { title: 'Experience', subtitle: 'Career Timeline', page: 'experience', accent: '#1E3A5F', keywords: 'experience career work history timeline professional years' },
  { title: 'Expertise', subtitle: 'Core Competencies', page: 'expertise', accent: '#1E3A5F', keywords: 'expertise skills competencies areas specialization core' },
  { title: 'Education', subtitle: 'Academic Profile', page: 'education', accent: '#1E3A5F', keywords: 'education university degree airlangga international relations academic' },
  { title: 'Skillset', subtitle: 'Full Skills List', page: 'skillset', accent: '#1E3A5F', keywords: 'skills all competencies full list technical professional creative' },
  { title: 'Contact', subtitle: 'Get in Touch', page: 'contact', accent: '#1C1C1E', keywords: 'contact email message collaborate hire reach' },
  { title: 'Projects Overview', subtitle: 'All Projects', page: 'projects-overview', accent: '#6B4F32', keywords: 'projects portfolio all overview work amerta aci aero' },
  { title: 'Writing & Reflections', subtitle: 'Articles & Essays', page: 'writing', accent: '#5C5C5C', keywords: 'writing articles essays blog reflections thoughts journal insights' },
  { title: 'CroissantsMoon', subtitle: 'Creative Studio', page: 'croissantsmoon', accent: '#D4B15A', keywords: 'croissantsmoon creative studio design branding identity moon boutique celestial' },
  { title: 'Web Development', subtitle: 'Creative Services', page: 'pcu-global', accent: '#8B7355', keywords: 'websites web development frontend responsive html css javascript' },
  { title: 'Graphic Design', subtitle: 'Creative Services', page: 'croissantsmoon', accent: '#8B7355', keywords: 'graphic design branding visual identity print digital' },
  { title: 'Partnerships', subtitle: 'Global Engagement', page: 'partnerships', accent: '#4A6B8A', keywords: 'partnerships international global institutional promotion mou moa agreements' },
  { title: 'Student Onboarding', subtitle: 'Student Services', page: 'onboarding', accent: '#4A5235', keywords: 'onboarding students support welfare orientation arrival housing immigration' },
  { title: 'Student Engagement', subtitle: 'Student Services', page: 'engagement', accent: '#4A5235', keywords: 'engagement students activities cultural support community exchange' },
  { title: 'International Grants', subtitle: 'Intl. Education', page: 'intl-grants', accent: '#064E3B', keywords: 'grants international scholarships pcu petra christian university dashboard pipeline digital' },
]

const seen = new Set(manualIndex.map(m => m.page))
const searchIndex = [
  ...manualIndex,
  ...discoveryItems
    .filter(item => !seen.has(item.page))
    .map(item => ({ title: item.title, subtitle: item.category, page: item.page, accent: item.accent, keywords: [...item.skills, item.description].join(' ').toLowerCase() })),
]

const skillTags = [
  { skill: 'International Partnership', cat: 'cat-education' },
  { skill: 'Student Mobility', cat: 'cat-education' },
  { skill: 'Internationalization', cat: 'cat-education' },
  { skill: 'Student Support', cat: 'cat-education' },
  { skill: 'Cross-Cultural Communication', cat: 'cat-education' },
  { skill: 'Project Management', cat: 'cat-leadership' },
  { skill: 'Leadership', cat: 'cat-leadership' },
  { skill: 'Systems Thinking', cat: 'cat-leadership' },
  { skill: 'UI/UX Design', cat: 'cat-creative' },
  { skill: 'Branding', cat: 'cat-creative' },
  { skill: 'Creative Direction', cat: 'cat-creative' },
  { skill: 'Digital Strategy', cat: 'cat-creative' },
  { skill: 'Writing', cat: 'cat-creative' },
  { skill: 'Full-Stack Development', cat: 'cat-tech' },
  { skill: 'Front-End Development', cat: 'cat-tech' },
  { skill: 'Web Experience', cat: 'cat-tech' },
]

type SearchResult = typeof searchIndex[number]

export default function SkillDiscovery() {
  const router = useRouter()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [query, setQuery] = useState('')
  const [dropdown, setDropdown] = useState<SearchResult[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const onInput = (value: string) => {
    setQuery(value)
    const q = value.toLowerCase().trim()
    if (!q && selectedSkills.length === 0) { setDropdown([]); return }
    const results = searchIndex.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.keywords.toLowerCase().includes(q)
    ).slice(0, 6)
    setDropdown(results)
  }

  const executeSearch = () => {
    if (selectedSkills.length > 0) {
      const match = discoveryItems.find(item =>
        selectedSkills.every(s => item.skills.includes(s))
      )
      if (match) { router.push(`/${match.page}`); return }
    }
    const q = query.toLowerCase().trim()
    if (q) {
      const match = searchIndex.find(item =>
        item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q)
      )
      if (match) router.push(`/${match.page}`)
    }
  }

  return (
    <div style={{ background: 'rgba(242,242,247,0.8)', padding: '72px 20px' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Sticky heading column */}
          <div className="lg:col-span-2" style={{ position: 'sticky', top: 80 }}>
            <div className="flex items-center gap-3 mb-5"><span className="accent-line" /><span className="label-small">Skill Discovery</span></div>
            <h2 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,5vw,2.5rem)', color: '#1C1C1E', letterSpacing: '-.02em', lineHeight: 1.1 }}>
              Explore My<br /><em style={{ fontStyle: 'normal', color: '#0A84FF' }}>Ecosystem</em>
            </h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C', maxWidth: 300 }}>
              Click a skill tag below to add it to your search, or type a keyword to find any page.
            </p>
            <ol className="mb-6" style={{ maxWidth: 300, listStyle: 'none', padding: 0, fontSize: '.75rem', color: '#767676', lineHeight: 1.7 }}>
              {['Pick a skill or type', 'Hit search to see matching work'].map((step, i) => (
                <li key={i} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: '#0A84FF', color: '#fff', fontSize: '.6rem', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>

            {/* Search box */}
            <div style={{ position: 'relative', marginTop: 4 }}>
              <div
                style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 5, background: '#fff', border: '1.5px solid rgba(28,28,30,0.12)', borderRadius: 14, padding: '8px 8px 8px 14px', minHeight: 52, cursor: 'text' }}
                onClick={() => inputRef.current?.focus()}
              >
                {selectedSkills.map(skill => (
                  <span key={skill} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#0A84FF', color: '#fff', borderRadius: 999, fontSize: '.72rem', fontWeight: 600, padding: '3px 10px' }}>
                    {skill}
                    <button
                      onClick={e => { e.stopPropagation(); toggleSkill(skill) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', padding: 0, lineHeight: 1, fontSize: '.85rem' }}
                    >×</button>
                  </span>
                ))}
                <input
                  ref={inputRef}
                  type="text"
                  placeholder={selectedSkills.length ? '' : 'Search pages, projects…'}
                  value={query}
                  onChange={e => onInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') executeSearch() }}
                  onFocus={e => {
                    const box = e.target.parentElement as HTMLElement
                    box.style.borderColor = '#0A84FF'
                    box.style.boxShadow = '0 0 0 3px rgba(10,132,255,0.12)'
                  }}
                  onBlur={e => {
                    setTimeout(() => {
                      const box = e.target.parentElement as HTMLElement
                      if (box) { box.style.borderColor = 'rgba(28,28,30,0.12)'; box.style.boxShadow = 'none' }
                      setDropdown([])
                    }, 180)
                  }}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '.83rem', color: '#1C1C1E', flex: '1 1 80px', minWidth: 80, padding: '3px 0', lineHeight: 1.4 }}
                />
                <button
                  onClick={executeSearch}
                  onMouseOver={e => (e.currentTarget.style.background = '#0A84FF')}
                  onMouseOut={e => (e.currentTarget.style.background = '#1C1C1E')}
                  style={{ background: '#1C1C1E', color: '#fff', border: 'none', cursor: 'pointer', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'background .2s', marginLeft: 2 }}
                >
                  <Search style={{ width: 15, height: 15 }} />
                </button>
              </div>

              {dropdown.length > 0 && (
                <div style={{ position: 'absolute', left: 0, right: 0, top: 'calc(100% + 6px)', zIndex: 200, background: '#fff', border: '1px solid rgba(28,28,30,0.1)', borderRadius: 12, boxShadow: '0 8px 24px rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  {dropdown.map(item => (
                    <button
                      key={`${item.page}-${item.title}`}
                      onMouseDown={() => router.push(`/${item.page}`)}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F2F2F7')}
                      onMouseLeave={e => (e.currentTarget.style.background = 'none')}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', transition: 'background .15s' }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: item.accent, flexShrink: 0 }} />
                      <span style={{ flex: 1 }}>
                        <span style={{ display: 'block', fontSize: '.83rem', fontWeight: 600, color: '#1C1C1E' }}>{item.title}</span>
                        <span style={{ display: 'block', fontSize: '.72rem', color: '#767676' }}>{item.subtitle}</span>
                      </span>
                      <ArrowRight style={{ width: 12, height: 12, color: '#C7C7CC' }} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {selectedSkills.length > 0 && (
              <button
                onClick={() => { setSelectedSkills([]); setQuery('') }}
                className="text-sm mt-3 inline-block"
                style={{ color: '#767676', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Clear all
              </button>
            )}
          </div>

          {/* Tag cloud column */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-4 mb-6">
              {[
                { color: '#2B4F6E', label: 'Intl. Education' },
                { color: '#1E3A5F', label: 'Leadership' },
                { color: '#6B4F32', label: 'Creative & Digital' },
                { color: '#4A5235', label: 'Technology' },
              ].map(l => (
                <div key={l.label} className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: l.color, display: 'inline-block' }} />
                  <span className="label-small">{l.label}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-2.5">
              {skillTags.map(({ skill, cat }) => (
                <button
                  key={skill}
                  className={`skill-tag ${cat}${selectedSkills.includes(skill) ? ' selected' : ''}`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

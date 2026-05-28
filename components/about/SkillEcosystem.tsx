'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'

type DiscoveryItem = {
  id: string
  title: string
  category: string
  description: string
  skills: string[]
  page: string
  accent: string
}

const discoveryItems: DiscoveryItem[] = [
  { id: 'partnerships', title: 'International Partnership Management', category: 'Experience', description: 'Managing 30+ institutional partners, reviewing 25+ MoU/MoA agreements monthly at Petra Christian University.', skills: ['International Partnership', 'Leadership', 'Systems Thinking', 'Cross-Cultural Communication'], page: 'partnerships', accent: '#4A6B8A' },
  { id: 'mou', title: 'MoU / MoA Coordination', category: 'Experience', description: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment.', skills: ['International Partnership', 'Leadership', 'Systems Thinking'], page: 'mou', accent: '#4A6B8A' },
  { id: 'amerta', title: 'AMERTA Exchange Program', category: 'Project', description: "Universitas Airlangga's flagship semester exchange — 120+ students, IDR 50–100M budget per cohort.", skills: ['Student Mobility', 'Project Management', 'International Partnership', 'Leadership', 'Student Support'], page: 'amerta', accent: '#6B4F32' },
  { id: 'aci', title: 'ACI — Airlangga Cultural Immersion', category: 'Project', description: 'Structured engagement program connecting international and local students through cultural experience.', skills: ['Student Mobility', 'Project Management', 'Student Support', 'Cross-Cultural Communication'], page: 'aci', accent: '#6B4F32' },
  { id: 'aero', title: 'AERO Exhibition', category: 'Project', description: 'Annual exhibition at Universitas Airlangga showcasing global partnerships and international programs.', skills: ['Project Management', 'International Partnership', 'Branding', 'Creative Direction'], page: 'aero', accent: '#6B4F32' },
  { id: 'pcu-global', title: 'PCU Global — International Office Website', category: 'Project', description: "Rebuilding PCU's International Office online presence with a full-stack web app, news CMS, partnership directory, and mobile-first design.", skills: ['Full-Stack Development', 'Front-End Development', 'UI/UX Design', 'International Partnership', 'Digital Strategy', 'Web Experience', 'Branding'], page: 'pcu-global', accent: '#003087' },
  { id: 'intl-grants', title: 'International Grants System', category: 'Experience', description: 'Building a digital and physical system to inform, maintain, and execute international grants at Petra Christian University.', skills: ['International Partnership', 'Systems Thinking', 'Digital Strategy', 'Student Support', 'Internationalization'], page: 'intl-grants', accent: '#064E3B' },
  { id: 'onboarding', title: 'Student Onboarding & Orientation', category: 'Experience', description: 'End-to-end welfare support for 100+ international students per semester — housing, healthcare, immigration.', skills: ['Student Support', 'Student Mobility', 'Cross-Cultural Communication', 'Systems Thinking'], page: 'onboarding', accent: '#4A5235' },
  { id: 'engagement', title: 'Student Engagement Initiatives', category: 'Experience', description: 'Building meaningful connections and fostering personal growth for exchange students through curated programs.', skills: ['Student Support', 'Leadership', 'Cross-Cultural Communication'], page: 'engagement', accent: '#4A5235' },
  { id: 'croissantsmoon', title: 'CroissantsMoon — Creative Identity', category: 'Creative', description: 'A future-facing boutique studio identity in development — editorial design, web experiences, brand systems.', skills: ['Branding', 'Creative Direction', 'UI/UX Design', 'Digital Strategy', 'Web Experience', 'Full-Stack Development'], page: 'croissantsmoon', accent: '#D4B15A' },
  { id: 'writing', title: 'Writing & Reflections', category: 'Writing', description: 'Essays and insights on international education, leadership, systems thinking, and digital craft.', skills: ['Writing', 'Leadership', 'Internationalization', 'Digital Strategy', 'Systems Thinking'], page: 'writing', accent: '#5C5C5C' },
  { id: 'skillset', title: 'Full Skillset Overview', category: 'About', description: 'A complete map of technical, professional, and creative competencies.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Leadership', 'UI/UX Design', 'Full-Stack Development', 'Branding', 'Systems Thinking', 'Writing'], page: 'skillset', accent: '#1C1C1E' },
]

const skillTags = [
  { skill: 'International Partnership', cat: 'cat-education' },
  { skill: 'Student Mobility', cat: 'cat-education' },
  { skill: 'MoU/MoA Coordination', cat: 'cat-education' },
  { skill: 'Internationalization', cat: 'cat-education' },
  { skill: 'Student Support', cat: 'cat-education' },
  { skill: 'Cross-Cultural Communication', cat: 'cat-education' },
  { skill: 'Project Management', cat: 'cat-leadership' },
  { skill: 'Strategic Planning', cat: 'cat-leadership' },
  { skill: 'Leadership', cat: 'cat-leadership' },
  { skill: 'Systems Thinking', cat: 'cat-leadership' },
  { skill: 'Stakeholder Management', cat: 'cat-leadership' },
  { skill: 'UI/UX Design', cat: 'cat-creative' },
  { skill: 'Branding', cat: 'cat-creative' },
  { skill: 'Creative Direction', cat: 'cat-creative' },
  { skill: 'Digital Strategy', cat: 'cat-creative' },
  { skill: 'Writing', cat: 'cat-creative' },
  { skill: 'Full-Stack Development', cat: 'cat-tech' },
  { skill: 'Front-End Development', cat: 'cat-tech' },
  { skill: 'Web Experience', cat: 'cat-tech' },
  { skill: 'Responsive Design', cat: 'cat-tech' },
]

export default function SkillEcosystem() {
  const router = useRouter()
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [query, setQuery] = useState('')

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }

  const clearAll = () => { setSelectedSkills([]); setQuery('') }

  const hasFilter = selectedSkills.length > 0 || query.trim().length > 0

  const results = hasFilter
    ? discoveryItems.filter(item => {
        const skillMatch = !selectedSkills.length || item.skills.some(s => selectedSkills.includes(s))
        const q = query.trim().toLowerCase()
        const textMatch = !q || item.title.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.category.toLowerCase().includes(q) || item.skills.some(s => s.toLowerCase().includes(q))
        return skillMatch && textMatch
      }).sort((a, b) => {
        const aScore = selectedSkills.length ? a.skills.filter(s => selectedSkills.includes(s)).length : 0
        const bScore = selectedSkills.length ? b.skills.filter(s => selectedSkills.includes(s)).length : 0
        return bScore - aScore
      }).slice(0, 9)
    : []

  return (
    <div style={{ padding: '72px 24px', background: '#FAFAF8' }}>
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-12 items-start">

          {/* Left: sticky heading + search */}
          <div className="lg:col-span-2" style={{ position: 'sticky', top: 80 }}>
            <div className="flex items-center gap-3 mb-5"><span className="accent-line" /><span className="label-small">Skill Ecosystem</span></div>
            <h2 className="font-heading font-bold text-3xl mb-2" style={{ color: '#1C1C1E' }}>Professional Skill Map</h2>
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#5C5C5C', maxWidth: 300 }}>Click a skill tag to explore related work, or type a keyword to find any project.</p>
            <ol style={{ maxWidth: 300, listStyle: 'none', padding: 0, fontSize: '.75rem', color: '#767676', lineHeight: 1.7, marginBottom: 24 }}>
              <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: '#1E3A5F', color: '#fff', fontSize: '.6rem', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>1</span>
                <span>Pick a skill or type a keyword</span>
              </li>
              <li style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 18, height: 18, borderRadius: '50%', background: '#1E3A5F', color: '#fff', fontSize: '.6rem', fontWeight: 700, flexShrink: 0, marginTop: 2 }}>2</span>
                <span>See matching work below</span>
              </li>
            </ol>
            <div style={{ position: 'relative', marginTop: 4 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#fff', border: '1.5px solid rgba(28,28,30,0.12)', borderRadius: 14, padding: '8px 8px 8px 14px', minHeight: 52 }}>
                <input
                  type="text"
                  placeholder="Search projects, skills…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={e => e.key === 'Escape' && clearAll()}
                  style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '.83rem', color: '#1C1C1E', flex: '1 1 80px', minWidth: 80, padding: '3px 0', fontFamily: "'DM Sans',sans-serif", lineHeight: 1.4 }}
                />
                <div style={{ background: '#1C1C1E', width: 36, height: 36, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Search style={{ width: 15, height: 15, color: '#fff' }} />
                </div>
              </div>
            </div>
            {hasFilter && (
              <button onClick={clearAll} className="text-sm mt-3 inline-block" style={{ color: '#767676', background: 'none', border: 'none', cursor: 'pointer' }}>Clear all</button>
            )}
          </div>

          {/* Right: legend + tag cloud + results */}
          <div className="lg:col-span-3">
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1E3A5F', display: 'inline-block' }} /><span className="label-small" style={{ color: '#1E3A5F' }}>Intl. Education</span></div>
              <div className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1C1C1E', display: 'inline-block' }} /><span className="label-small">Leadership</span></div>
              <div className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#6B4F32', display: 'inline-block' }} /><span className="label-small" style={{ color: '#6B4F32' }}>Creative &amp; Digital</span></div>
              <div className="flex items-center gap-2"><span style={{ width: 8, height: 8, borderRadius: '50%', background: '#4A5235', display: 'inline-block' }} /><span className="label-small" style={{ color: '#4A5235' }}>Technology</span></div>
            </div>
            <div className="flex flex-wrap gap-2.5 mb-8">
              {skillTags.map(({ skill, cat }) => (
                <button key={skill} className={`skill-tag ${cat}${selectedSkills.includes(skill) ? ' selected' : ''}`} onClick={() => toggleSkill(skill)}>
                  {skill}
                </button>
              ))}
            </div>
            {hasFilter && (
              <div>
                <div className="flex items-center gap-3 mb-5">
                  <span style={{ width: 20, height: 1, background: 'rgba(28,28,30,0.15)', display: 'inline-block' }} />
                  <span className="label-small">Related Work</span>
                </div>
                {results.length === 0 ? (
                  <p className="text-sm py-8" style={{ color: '#767676' }}>No matching items found. Try a different keyword or skill.</p>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-4">
                    {results.map(item => (
                      <button key={item.id} onClick={() => router.push(`/${item.page}`)} className="card text-left about-card-lift p-5" style={{ background: '#fff' }}>
                        <div className="label-small mb-2" style={{ color: item.accent }}>{item.category}</div>
                        <h3 className="font-heading font-semibold text-sm mb-2" style={{ color: '#1C1C1E' }}>{item.title}</h3>
                        <p className="text-xs leading-relaxed mb-3" style={{ color: '#5C5C5C' }}>{item.description}</p>
                        <div className="flex flex-wrap gap-1">{item.skills.slice(0, 3).map(s => <span key={s} className="tag">{s}</span>)}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}

// Items for the skill explorer on the home and about pages. Each links to a page.
export type DiscoveryItem = {
  id: string
  title: string
  category: string
  description: string
  skills: string[]
  page: string
}

export const discoveryItems: DiscoveryItem[] = [
  { id: 'partnerships', title: 'International Partnership Management', category: 'Experience', description: 'Managing 30+ institutional partners, reviewing 25+ MoU/MoA agreements monthly at Petra Christian University.', skills: ['International Partnership', 'Leadership', 'Systems Thinking', 'Cross-Cultural Communication'], page: 'partnerships' },
  { id: 'mou', title: 'MoU / MoA Coordination', category: 'Experience', description: 'Formalizing academic partnerships through strategic agreements — ensuring compliance and institutional alignment.', skills: ['International Partnership', 'Leadership', 'Systems Thinking'], page: 'mou' },
  { id: 'amerta', title: 'AMERTA Exchange Program', category: 'Project', description: "Universitas Airlangga's flagship semester exchange — 120+ students, IDR 50–100M budget per cohort.", skills: ['Student Mobility', 'Project Management', 'International Partnership', 'Leadership', 'Student Support'], page: 'amerta' },
  { id: 'aci', title: 'ACI — Airlangga Cultural Immersion', category: 'Project', description: 'Structured engagement program connecting international and local students through cultural experience.', skills: ['Student Mobility', 'Project Management', 'Student Support', 'Cross-Cultural Communication'], page: 'aci' },
  { id: 'aero', title: 'AERO Exhibition', category: 'Project', description: 'Annual exhibition at Universitas Airlangga showcasing global partnerships and international programs.', skills: ['Project Management', 'International Partnership', 'Branding', 'Creative Direction'], page: 'aero' },
  { id: 'sim-kerjasama', title: 'SIM Kerjasama', category: 'Project', description: 'The official system of record for PETRA MoU and MoA documents, with an enforced approval hierarchy, SLA tracking and proactive renewals.', skills: ['International Partnership', 'Process Design', 'Data Management', 'Digital Strategy'], page: 'sim-kerjasama' },
  { id: 'sim-realisasi', title: 'SIM Realisasi', category: 'Project', description: 'Records every activity carried out under PETRA partnership agreements and turns verified data into RENSTRA indicators and semester reports.', skills: ['International Partnership', 'Process Design', 'Data Management', 'Reporting'], page: 'sim-realisasi' },
  { id: 'intl-grants', title: 'International Grants System', category: 'Experience', description: 'Building a digital and physical system to inform, maintain, and execute international grants at Petra Christian University.', skills: ['International Partnership', 'Systems Thinking', 'Digital Strategy', 'Student Support', 'Internationalization'], page: 'intl-grants' },
  { id: 'onboarding', title: 'Student Onboarding & Orientation', category: 'Experience', description: 'End-to-end welfare support for 100+ international students per semester — housing, healthcare, immigration.', skills: ['Student Support', 'Student Mobility', 'Cross-Cultural Communication', 'Systems Thinking'], page: 'onboarding' },
  { id: 'engagement', title: 'Student Engagement Initiatives', category: 'Experience', description: 'Building meaningful connections and fostering personal growth for exchange students through curated programs.', skills: ['Student Support', 'Leadership', 'Cross-Cultural Communication'], page: 'engagement' },
  { id: 'skillset', title: 'Full Skillset Overview', category: 'About', description: 'A complete map of technical, professional, and creative competencies.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Leadership', 'UI/UX Design', 'Full-Stack Development', 'Branding', 'Systems Thinking', 'Writing'], page: 'skillset' },
  { id: 'expertise', title: 'Areas of Expertise', category: 'About', description: 'Core competencies built through 3+ years in international higher education and creative digital work.', skills: ['International Partnership', 'Student Mobility', 'Project Management', 'Internationalization', 'Leadership'], page: 'expertise' },
]

export const skillGroups: { label: string; skills: string[] }[] = [
  { label: 'International education', skills: ['International Partnership', 'Student Mobility', 'Internationalization', 'Student Support', 'Cross-Cultural Communication'] },
  { label: 'Leadership', skills: ['Project Management', 'Leadership', 'Systems Thinking'] },
  { label: 'Systems & digital', skills: ['Process Design', 'Data Management', 'Reporting', 'Digital Strategy', 'UI/UX Design'] },
  { label: 'Creative', skills: ['Branding', 'Creative Direction', 'Writing'] },
]

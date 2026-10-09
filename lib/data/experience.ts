// Career history, newest first. Used by the About page Experience tab.
export type Role = {
  id: string
  title: string
  org: string
  period: string
  /** Organisation logo under /public. */
  logo: string
  current?: boolean
  bullets: string[]
  tags: string[]
}

export const roles: Role[] = [
  {
    id: 'pcu',
    title: 'International Partnership',
    org: 'Petra Christian University',
    period: 'Mar 2026 – now',
    logo: '/assets/images/logos/pcu.png',
    current: true,
    bullets: [
      'Manage communication with 30+ institutional partners every month through formal correspondence',
      'Review 25+ partnership agreements (MoU/MoA) a month for compliance and institutional fit',
      'Arrange 15+ strategic partnership meetings a month, from briefing and protocol to minutes within 24 hours',
      'Bring MoUs and MoAs to signature: final text, approvals, signing ceremonies and activation',
      "Support PETRA's faculties and units on partnership, from partner matching to program launches",
      "Start collaborations that strengthen PETRA's global presence and widen access to international grants",
      'Designed SIM Kerjasama and SIM Realisasi, the systems of record for agreements and their activities',
    ],
    tags: ['International Partnership', 'MoU/MoA', 'Stakeholder Management', 'Systems Design'],
  },
  {
    id: 'age-mobility',
    title: 'International Mobility & Global Reputation',
    org: 'Airlangga Global Engagement',
    period: 'Sep 2025 – Mar 2026',
    logo: '/assets/images/logos/age.png',
    bullets: [
      'Managed 5 end-to-end exchange programs: promotion, pre-departure, arrival, study period and completion',
      'Ran budgets of IDR 50–100M per program across 50+ stakeholders',
      'Delivered exchange experiences for 120+ international students per semester',
    ],
    tags: ['Exchange Programs', 'Budget Management', 'Project Management', 'Leadership'],
  },
  {
    id: 'age-students',
    title: 'International Student & Mobility',
    org: 'Airlangga Global Engagement',
    period: 'Jan 2024 – Sep 2025',
    logo: '/assets/images/logos/age.png',
    bullets: [
      'End-to-end welfare and non-academic support for 100+ international students per semester',
      'Accommodation, healthcare, insurance, banking and immigration coordination',
      'Worked with 10+ stakeholders, including faculties, hospitals, banks and immigration authorities',
      'Processed KNB and TIAS government scholarships and handled student welfare cases',
    ],
    tags: ['Student Support', 'Welfare Coordination', 'Immigration', 'Stakeholder Management'],
  },
  {
    id: 'lecturer',
    title: 'Assistant Lecturer, Foreign Policy Analysis',
    org: 'Universitas Airlangga',
    period: 'Sep 2023 – Jan 2024',
    logo: '/assets/images/logos/fisip-unair.png',
    bullets: [
      'Co-facilitated Foreign Policy Analysis discussions for undergraduate IR students and moderated debates',
      'Managed grading, scheduling and administrative coordination for the lead lecturer',
    ],
    tags: ['Teaching', 'Foreign Policy', 'Academic Leadership'],
  },
  {
    id: 'coordinator',
    title: 'International Program & Inbound Coordinator',
    org: 'Koordinasi Informasi dan Kehumasan FISIP Unair',
    period: 'Jun 2023 – Jan 2024',
    logo: '/assets/images/logos/fisip-unair.png',
    bullets: [
      'Coordinated logistics and program delivery for foreign lecturers and visiting students',
      'English–Indonesian interpretation at conferences, guest lectures and company visits',
      'Primary point of contact for inbound guests across several events each semester',
    ],
    tags: ['International Coordination', 'Interpretation', 'Event Management'],
  },
  {
    id: 'research',
    title: 'Research Assistant',
    org: 'Universitas Airlangga',
    period: 'May 2023 – Jan 2024',
    logo: '/assets/images/logos/fisip-unair.png',
    bullets: [
      'Researched U.S.–ASEAN economic cooperation across the Biden and Trump administrations',
      'Contributed to a paper presented at the 9th ICoCSPA in 2023',
      'Synthesised sources on U.S.–China economic dynamics in Southeast Asia into research briefs',
    ],
    tags: ['Academic Research', 'International Relations', 'Policy Analysis'],
  },
]

// AERO 2025 exhibition: highlights, role, participants, rundown and budget.

export const GALLERY_IMAGES = [
  '/assets/images/aero/aero-1.jpg', '/assets/images/aero/aero-2.jpg', '/assets/images/aero/aero-3.jpg',
  '/assets/images/aero/aero-4.jpg', '/assets/images/aero/aero-5.jpg', '/assets/images/aero/aero-6.jpg',
  '/assets/images/aero/aero-7.jpg', '/assets/images/aero/aero-8.jpg', '/assets/images/aero/aero-9.jpg',
  '/assets/images/aero/aero-10.jpg', '/assets/images/aero/aero-11.jpg', '/assets/images/aero/aero-12.jpg',
  '/assets/images/aero/aero-14.jpg', '/assets/images/aero/aero-15.jpg', '/assets/images/aero/aero-16.jpg',
  '/assets/images/aero/aero-20.jpg', '/assets/images/aero/aero-21.jpg', '/assets/images/aero/aero-22.jpg',
  '/assets/images/aero/aero-23.jpg', '/assets/images/aero/aero-24.jpg', '/assets/images/aero/aero-25.jpg',
  '/assets/images/aero/aero-promotional-1.png', '/assets/images/aero/aero-promotional-2.png', '/assets/images/aero/aero-promotional-3.jpg',
]

export const highlights = [
  { title: 'Partner University Booths', desc: 'Meet representatives from international partner universities and learn about study programs, scholarships, and academic opportunities.' },
  { title: 'Global Talks & Alumni Sharing', desc: 'Gain firsthand insights from alumni who have studied abroad — covering academic experiences, career prospects, and opportunities encountered.' },
  { title: 'Cultural Exchange & Performances', desc: 'Experience the richness of global cultures through artistic performances and interactive activities showcasing traditions from different countries.' },
  { title: 'Networking & Interactive Sessions', desc: 'Connect with international experts, alumni, and students from diverse backgrounds in engaging and inspiring sessions.' },
]

export const contributions = [
  { title: 'Event Planning & Logistics', desc: 'Planned and coordinated end-to-end event logistics across 50+ stakeholders, including venue setup, scheduling, and operational readiness.' },
  { title: 'Vendor Management & Budgeting', desc: 'Managed vendor relationships and procurement within a Rp 149.7M budget, ensuring cost-efficient delivery across all event components.' },
  { title: 'Partner University & Guest Coordination', desc: 'Coordinated partner university booth logistics and facilitated international guest attendance, ensuring smooth communication and on-site experience.' },
  { title: 'Promotion, Operations & Reporting', desc: 'Led pre-event promotion campaigns, managed on-site operations, and prepared comprehensive post-event completion reports for stakeholders.' },
]

export const AERO_BUDGET = {
  categories: [
    { name: 'Event & EO', total: 92812500 },
    { name: 'Accommodation', total: 20000000 },
    { name: 'Meals & Catering', total: 17250000 },
    { name: 'Honorarium', total: 19600000 },
  ],
  grandTotal: 149662500,
}


export const CORNERS = [
  { name: 'European Union Centre', note: 'Universitas Airlangga', booth: 1 },
  { name: 'American Corner', note: 'Universitas Airlangga', booth: 2 },
  { name: 'CYUT-UNAIR Taiwan Centre', note: 'Universitas Airlangga', booth: 3 },
  { name: 'Aussie Banget Corner', note: 'Universitas Airlangga', booth: 4 },
]

export const INSTITUTIONS = [
  { country: 'Australia', orgs: [{ name: 'The University of Western Australia', booth: 5 }, { name: 'University of New South Wales', booth: 6 }, { name: 'Western Sydney University', booth: null }]},
  { country: 'France', orgs: [{ name: 'IFI Campus France', booth: 7 }]},
  { country: 'Japan', orgs: [{ name: 'Kumamoto University', booth: 8 }]},
  { country: 'Singapore', orgs: [{ name: 'Singapore Management University', booth: null }]},
  { country: 'Malaysia', orgs: [
    { name: 'International Islamic University Malaysia (IIUM)', booth: 10 }, { name: 'INTI International University', booth: null },
    { name: 'Universiti Sultan Zainal Abidin (UniSZA)', booth: null }, { name: 'Management and Science University (MSU)', booth: 11 },
    { name: 'Tunku Abdul Rahman University of Management and Technology', booth: 12 }, { name: 'UiTM Cawangan Perlis', booth: null },
    { name: 'Universiti Malaya (UM)', booth: 13 },
  ]},
  { country: 'Organizations', orgs: [{ name: 'AIESEC in Surabaya', booth: 14 }]},
]

export const STUDENT_DELEGATIONS = [
  { country: 'Myanmar', booth: 15 }, { country: 'Cambodia', booth: 16 },
  { country: 'Yemen', booth: 17 }, { country: 'Sudan', booth: 18 },
  { country: 'Vietnam', booth: 19 }, { country: 'Mexico', booth: null },
  { country: 'Palestine', booth: null }, { country: 'Sierra Leone', booth: null },
  { country: 'China', booth: null },
]

export const RUNDOWN = [
  {
    day: 'Pre-Arrival', date: 'Friday, 2 May 2025', label: 'Online Meeting',
    items: [{ time: '15:00 – 16:00', activity: 'Technical Meeting', venue: 'Online (Zoom)', note: null }],
  },
  {
    day: 'Day 0', date: 'Thursday, 8 May 2025', label: 'Arrival Day',
    items: [{ time: 'TBC', activity: 'Participant Arrival & Hotel Check-in', venue: 'Zoom Hotel Dharmahusada, Jl. Dharmahusada No.188, Surabaya', note: null }],
  },
  {
    day: 'Day 1', date: 'Friday, 9 May 2025', label: 'AERO Exhibition',
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
    day: 'Day 1', date: 'Friday, 9 May 2025', label: 'Networking Dinner',
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
    day: 'Day 2', date: 'Saturday, 10 May 2025', label: 'Surabaya City Tour',
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

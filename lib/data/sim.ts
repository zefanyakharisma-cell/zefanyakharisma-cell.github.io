// Content for the SIM Kerjasama and SIM Realisasi project pages, taken from
// the "SIM Kerja Sama & SIM Realisasi" briefing deck and translated to English.

export const simKerjasama = {
  tagline: 'The official system of record for every PCU MoU and MoA',
  summary:
    'SIM Kerjasama records who proposed each agreement, who approved it, when it is valid, and whether it has been renewed. Two other systems, the internationalisation KPI dashboard and SIM Realisasi, depend on it as a stable source of partnership data.',
  goals: [
    'Enforce the approval hierarchy in software',
    'Give approvers an option besides rejecting',
    'Make approval delays visible',
    'Measure document completion time',
    'Proactive, evidence-based renewals',
    'A clean partnership dataset others can reference',
    'Active partnerships visible to everyone',
    'Structured partnership evaluation data',
    'Present officially as a PCU property, including to partners',
  ],
  menus: [
    { name: 'Dashboard', desc: 'KPIs, global partner map, chart studio, bottlenecks' },
    { name: 'Find Agreements', desc: 'Lifecycle tabs, per-column filters, export' },
    { name: 'New Agreement', desc: 'Propose a new agreement, or record one already signed' },
    { name: 'My Queue', desc: 'Documents waiting for your position to act' },
    { name: 'Renewals', desc: 'Requests, faculty and partner evaluations, gates' },
    { name: 'Notifications', desc: 'In the app and by email' },
    { name: 'Master Data', desc: 'Units, positions and tiers, partners (merge), countries, agendas' },
    { name: 'Admin', desc: 'Settings and SLA thresholds' },
  ],
  stakeholders: [
    { group: 'Partnerships office', desc: 'The whole document lifecycle in one place. Queues, SLAs and exports without manual recaps.' },
    { group: 'Faculties & programs', desc: 'Propose agreements and report activities on one page, with status always visible.' },
    { group: 'Approvers', desc: 'Deans up to the Rector open only the documents waiting for them, and can request revisions instead of rejecting.' },
    { group: 'Mobility team', desc: 'Verify participants with automatic student-number lookup and recorded duplicate decisions.' },
    { group: 'Leadership', desc: 'Partnership KPIs and RENSTRA indicators ready to use, with drill-down to each activity.' },
    { group: 'Partner institutions', desc: 'Complete evaluations through an official PCU link, without creating an account.' },
  ],
  metrics: [
    { measure: 'Documents completed in under a month', before: 'Not measured', after: 'Measured and reported' },
    { measure: 'Domestic vs international MoU/MoA', before: 'Manual recap', after: 'Any time' },
    { measure: 'Approvals taking more than 4 working days', before: 'Unknown', after: 'Visible per approver' },
    { measure: 'Renewals with a complete evaluation', before: 'Unknown', after: 'The default path' },
    { measure: 'Duplicate partner records', before: 'Piling up', after: 'Detected and mergeable' },
    { measure: 'Structured partnership evaluation data', before: 'None', after: 'Every renewed partnership' },
    { measure: 'Agreements actually carried out (RENSTRA 1.19.24)', before: 'Not linked', after: 'Counted per renewal chain' },
  ],
}

export const simRealisasi = {
  tagline: 'From agreements on paper to real activities',
  mission:
    'Collect, verify, store and report every activity carried out under PCU MoUs and MoAs.',
  outcomes: [
    { title: 'RENSTRA indicators', desc: 'Calculated from verified data, with drill-down to every activity.' },
    { title: 'Semester reports', desc: 'Built from frozen, reproducible snapshots.' },
    { title: 'Dormant partnerships', desc: 'Made visible, with that information fed back to SIM Kerjasama.' },
  ],
  included: 'Activities that implement a PCU MoU or MoA recorded in SIM Kerjasama.',
  excluded: 'IISMA, free movers, government scholarships, and imports of historical data.',
  menus: [
    { name: 'Dashboard', desc: 'RENSTRA indicators and activity overview' },
    { name: 'Activities', desc: 'Every reported activity and its status' },
    { name: 'New Activity', desc: 'Report an activity on a single page' },
    { name: 'Mobility Verification', desc: 'Participant checks with duplicate handling' },
    { name: 'Reports & Export', desc: 'Semester snapshots and downloads' },
    { name: 'Settings', desc: 'Periods and reference data' },
    { name: 'Documents', desc: 'Browse SIM Kerjasama agreements with their activity summary' },
  ],
  formSteps: ['Details', 'Participants', 'Files', 'Submit'],
  integration: {
    inKerjasama: [
      { title: 'Implementation tab', desc: 'Verified activities across the whole renewal chain, IA and IR downloads, and anonymous participant counts.' },
      { title: '"No activity yet" flag', desc: 'Shown on active agreements with no activity this year, unless they are in a grace period.' },
      { title: 'Evidence for evaluation', desc: 'An activity summary appears when a renewal is assessed.' },
    ],
    inRealisasi: [
      { title: 'Agreement picker', desc: 'Only SIM Kerjasama documents valid on the activity date, with partner and country.' },
      { title: 'Documents menu', desc: 'Browse SIM Kerjasama documents with their activity and evaluation summaries.' },
      { title: 'Chains follow renewals', desc: 'Each activity links to its agreement and every renewal of it.' },
    ],
  },
}

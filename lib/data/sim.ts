// Content for the SIM Kerjasama and SIM Realisasi project pages, taken from
// the "SIM Kerja Sama & SIM Realisasi" briefing deck and translated to English.

export const simKerjasama = {
  demoUrl: 'https://sim-kerja-sama-petra.vercel.app/login',
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
  demoUrl: 'https://sim-realisasi.vercel.app/',
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

// ---------------------------------------------------------------------------
// Background, objectives, benefits and business process. Process steps follow
// the "SIM-KS Business Process" and "SIM Realisasi Process Map" BPMN models.

export type LaneStep = {
  lane: number
  col: number
  title: string
  kind?: 'start' | 'task' | 'system' | 'gateway' | 'end'
  /** Document status the step sets, as the app labels it. */
  status?: string
  /** Branch labels for a gateway. */
  branches?: string[]
}

export type Process = { key: string; label: string; summary: string; lanes: string[]; steps: LaneStep[] }

export const simKerjasamaDetail = {
  background: {
    problem: [
      'Proposals travelled by email and paper, so nobody could say where a document was or who was holding it.',
      'Approvals had no clock: a draft could sit with one office for weeks without anyone noticing.',
      'Renewals were noticed late, usually after the agreement had already expired, and decided without evidence.',
      'The same partner was recorded under several spellings, so counts of partners and countries were unreliable.',
    ],
    change: [
      'Every MoU and MoA has one record, one status and one owner, from the first draft to the archive.',
      'The approval order is enforced by the software, tier by tier, with an SLA clock per approver.',
      'Renewal reminders start six months ahead and require evaluations from both the faculty and the partner.',
      'Partner and country master data can be merged, so the dataset stays clean enough for other systems to use.',
    ],
  },
  objectives: [
    { theme: 'Governance', text: 'Approvals follow the official hierarchy, and every delay is visible.', goals: [0, 1, 2, 3] },
    { theme: 'Data quality', text: 'One clean, evidence-based partnership dataset that other systems can rely on.', goals: [4, 5, 7] },
    { theme: 'Visibility', text: 'Active partnerships open to the whole university, and to partners as PCU.', goals: [6, 8] },
  ],
  institutionalBenefits: [
    { title: 'Accreditation evidence', text: 'Valid agreements and their documents are ready for BAN-PT and LAM assessors.' },
    { title: 'RENSTRA reporting', text: 'Domestic and international MoU/MoA counts are available at any time, without a manual recap.' },
    { title: 'Ranking data', text: 'A dependable count of international partners and countries for QS and THE submissions.' },
    { title: 'Institutional memory', text: 'Every decision, revision and renewal stays on record when staff change.' },
  ],
  statuses: ['Draft', 'Diajukan', 'Diproses', 'Disposisi Tier 1·2·3', 'Disetujui', 'Siap TTD', 'Aktif'],
  sideStatuses: ['Pending', 'Ditolak'],
  renewalStatuses: ['Aktif', 'Akan Berakhir', 'Diarsipkan'],
  archiveReasons: ['superseded_by_renewal', 'expired_without_renewal', 'terminated_early'],
  tiers: [
    { tier: 'Tier 1', who: 'Head of the International Office, Head of the Rector\'s Secretariat' },
    { tier: 'Tier 2', who: 'Deans, heads of study programs, programs and units' },
    { tier: 'Tier 3', who: 'Vice Rectors and the Rector, in parallel' },
  ],
  approvalRules: [
    { title: 'Tier gating', text: 'A tier opens only when no lower tier in the current round is still waiting. Empty tiers are skipped.' },
    { title: 'Four decisions', text: 'Approve opens the next tier. Revise asks for a new draft while the SLA keeps running. Pending freezes the document and its clock. Reject archives it.' },
    { title: 'SLA per approver', text: 'Counted in business days from when the approver\'s tier opens, excluding weekends, holidays and time in Pending. Yellow at 2 days, red at 4.' },
    { title: 'Already signed?', text: 'The office can record a document signed outside the system directly, so the dataset is complete from day one.' },
  ],
  renewalRules: [
    { title: 'Reminders', text: 'Monthly from six months before the end date, then weekly for the last two months. The expiry sweep runs daily at 05:15 WIB.' },
    { title: 'Two evaluations', text: 'The owning unit evaluates in the app; the lead partner evaluates through a secure link, without an account.' },
    { title: 'Renewal gate', text: 'Renewal opens only when both evaluations agree, or when the office overrides with a recorded reason.' },
    { title: 'Hand-over', text: 'Activating the renewal links it to the old agreement and archives the old one in a single transaction.' },
  ],
  processes: [
    {
      key: 'approval',
      label: 'Proposal & approval',
      summary: 'A unit proposes, the International Office routes it, approvers decide tier by tier, and the signed document is activated.',
      lanes: ['Proposing unit', 'International Office', 'Approvers (Tier 1–3)', 'SIM Kerjasama'],
      steps: [
        { lane: 0, col: 0, kind: 'start', title: 'Partnership need' },
        { lane: 0, col: 1, title: 'Fill in the proposal form', status: 'Draft' },
        { lane: 0, col: 2, title: 'Submit proposal', status: 'Diajukan' },
        { lane: 1, col: 3, title: 'Choose approvers and route', status: 'Diproses' },
        { lane: 3, col: 4, kind: 'system', title: 'Open the lowest pending tier and notify' },
        { lane: 2, col: 5, title: 'Review the proposal', status: 'Disposisi' },
        { lane: 2, col: 6, kind: 'gateway', title: 'Decision?', branches: ['Approve', 'Revise', 'Pending', 'Reject'] },
        { lane: 3, col: 7, kind: 'gateway', title: 'Higher tier left?', branches: ['Yes: next tier', 'No'] },
        { lane: 1, col: 8, title: 'Print and mark ready to sign', status: 'Siap TTD' },
        { lane: 1, col: 9, title: 'Sign offline, upload the signed file' },
        { lane: 3, col: 10, kind: 'end', title: 'Agreement active', status: 'Aktif' },
      ],
    },
    {
      key: 'renewal',
      label: 'Renewal & evaluation',
      summary: 'As an agreement nears its end date, the unit and the partner each evaluate it, and renewal opens only on evidence.',
      lanes: ['SIM Kerjasama', 'International Office', 'Owning unit', 'Partner institution'],
      steps: [
        { lane: 0, col: 0, kind: 'start', title: 'Daily expiry sweep, 05:15 WIB' },
        { lane: 0, col: 1, kind: 'system', title: 'Flag "ending soon" and send reminders', status: 'Akan Berakhir' },
        { lane: 1, col: 2, title: 'Send evaluation requests' },
        { lane: 2, col: 3, title: 'Faculty evaluation' },
        { lane: 3, col: 3, title: 'Partner evaluation by secure link' },
        { lane: 1, col: 4, kind: 'gateway', title: 'Both recommend?', branches: ['Both continue', 'Differ: override with reason', 'Both stop'] },
        { lane: 1, col: 5, title: 'Start the renewal process' },
        { lane: 2, col: 6, title: 'Upload draft, create renewal proposal' },
        { lane: 1, col: 7, title: 'Approval flow (Process 1)' },
        { lane: 0, col: 8, kind: 'system', title: 'Link to the old agreement and archive it', status: 'superseded_by_renewal' },
        { lane: 0, col: 9, kind: 'end', title: 'Partnership renewed' },
      ],
    },
  ] as Process[],
}

export const simRealisasiDetail = {
  background: {
    problem: [
      'Realisations reached the International Office through scattered reports, emails and spreadsheets.',
      'Counting inbound and outbound students meant manual reconciliation every semester.',
      'The same student could be reported by two units and counted twice.',
      'Last semester\'s numbers shifted whenever a late report arrived.',
    ],
    change: [
      'Each academic unit reports its own activities on one page, with the IA, IR and participants attached.',
      'Student and employee numbers are checked against BAAK and HR, and duplicates are decided once.',
      'Indicators are computed by the database from verified data only.',
      'Each semester is frozen into a snapshot on its cutoff date, so reported numbers never change.',
    ],
  },
  objectives: [
    { title: 'Every activity on record', text: 'Collect each activity carried out under a PCU MoU or MoA, linked to that exact agreement.' },
    { title: 'Verified before counted', text: 'Mobility activities are checked by the IO Mobility team; only verified data reaches the numbers.' },
    { title: 'Indicators without recaps', text: 'RENSTRA 1.1, 1.19.S1 and 1.19.S4 and the International Awards come straight from the data.' },
    { title: 'Reports that stay put', text: 'Frozen semester snapshots make every report reproducible.' },
    { title: 'Show which agreements are used', text: 'Feed activity back to SIM Kerjasama so dormant partnerships surface.' },
  ],
  benefits: [
    { group: 'Academic units', desc: 'One page per activity, the status always visible, and reminders before the reporting deadline.' },
    { group: 'IO Mobility team', desc: 'A verification queue with student lookups and duplicate handling, instead of spreadsheets.' },
    { group: 'IO Admin', desc: 'Settings, calendar and freeze controls, and Excel exports of every list.' },
    { group: 'Leadership', desc: 'RENSTRA indicators and award rankings ready to use, each drilling down to its activities.' },
    { group: 'Partnerships office', desc: 'Realisation evidence on every agreement, ready for renewal decisions.' },
    { group: 'Quality assurance', desc: 'Frozen, reproducible semester figures for accreditation and audits.' },
  ],
  concepts: [
    { term: 'Kegiatan', text: 'One activity under one agreement, documented by one Implementation Arrangement (IA) and one Implementation Report (IR).' },
    { term: 'Kerja sama', text: 'The single MoU or MoA from SIM Kerjasama the activity implements, picked from documents valid on the activity dates.' },
    { term: 'Renewal chain', text: 'An agreement plus all its renewals. Realisation of agreements (1.19.S4) counts chains, so a mid-year renewal counts once.' },
    { term: 'Jenis Kegiatan', text: 'The activity type list. IO decides per type whether it is mobility and whether it counts for 1.19.S1.' },
    { term: 'Mobility activity', text: 'Needs a participant list and one combined PDF, and is verified by the IO Mobility team. Others are verified on submit.' },
    { term: 'Snapshot', text: 'A semester\'s frozen indicator values, with the IDs of every record behind them and the settings used.' },
  ],
  demoFigures: [
    { value: '133', label: 'Activities in the demo' },
    { value: '297', label: 'RENSTRA 1.1 students, 2025/26' },
    { value: '165', label: 'Odd semester (Ganjil)' },
    { value: '132', label: 'Even semester (Genap)' },
    { value: '5', label: 'Indicators reported' },
  ],
  statuses: ['Draf', 'Diajukan', 'Menunggu verifikasi', 'Terverifikasi', 'Terhitung'],
  sideStatuses: ['Perlu revisi', 'Terlambat'],
  submissionRules: [
    { title: 'Reporting deadline', text: 'Semester and academic year come from the start date; the deadline is the end date plus 30 days. Late submissions are flagged, not refused.' },
    { title: 'Nothing is rejected', text: 'A wrong submission always comes back as a revision with a note, and returns as participant version n+1.' },
    { title: 'Duplicate students', text: 'If two units report the same student, the Mobility team picks the activity that keeps them. Approval waits until it is decided.' },
    { title: 'Drafts only', text: 'Drafts can be deleted by their creator or IO Admin. A submitted activity is never deleted.' },
  ],
  closeRules: [
    { title: 'Daily reminders', text: 'Drafts close to their deadline, and revisions open seven days or more, get an in-app and email reminder.' },
    { title: 'Semester freeze', text: 'On the cutoff date the daily job freezes the semester\'s indicators into a snapshot with every record ID behind them. IO Admin can only re-freeze, with a reason.' },
    { title: 'Late changes', text: 'An activity verified or edited inside a frozen window is logged as a post-freeze change, not merged silently.' },
    { title: 'Reports', text: 'Leadership reads snapshots and live year-to-date figures side by side, and downloads them as Excel.' },
  ],
  processes: [
    {
      key: 'submit',
      label: 'Submit & verify',
      summary: 'One activity, from the unit that ran it to the indicators it counts toward.',
      lanes: ['Academic unit', 'IO Mobility team', 'SIM Realisasi'],
      steps: [
        { lane: 0, col: 0, kind: 'start', title: 'Activity completed' },
        { lane: 0, col: 1, title: 'Fill in details, pick the agreement' },
        { lane: 2, col: 2, kind: 'system', title: 'Save draft; set semester and deadline', status: 'Draf' },
        { lane: 0, col: 3, kind: 'gateway', title: 'Mobility activity?', branches: ['No: upload IA & IR', 'Yes: add participants'] },
        { lane: 2, col: 4, kind: 'system', title: 'Look up student and staff numbers (BAAK & HR)' },
        { lane: 0, col: 5, title: 'Submit the activity', status: 'Diajukan' },
        { lane: 2, col: 6, kind: 'system', title: 'Validate, flag late, detect duplicates', status: 'Menunggu verifikasi' },
        { lane: 1, col: 7, title: 'Review participants and the mobility PDF' },
        { lane: 1, col: 8, kind: 'gateway', title: 'In order?', branches: ['No: request revision', 'Yes: approve'] },
        { lane: 2, col: 9, kind: 'system', title: 'Mark verified, notify the unit', status: 'Terverifikasi' },
        { lane: 2, col: 10, kind: 'end', title: 'Counted toward RENSTRA and Awards', status: 'Terhitung' },
      ],
    },
    {
      key: 'close',
      label: 'Reminders & semester close',
      summary: 'What the system does on its own schedule, and what leadership receives.',
      lanes: ['Academic unit', 'SIM Realisasi', 'IO Admin', 'Leadership'],
      steps: [
        { lane: 1, col: 0, kind: 'start', title: 'Every day' },
        { lane: 1, col: 1, kind: 'system', title: 'Check drafts near deadline and open revisions' },
        { lane: 1, col: 2, kind: 'gateway', title: 'Anything due?', branches: ['Yes: remind', 'No: nothing'] },
        { lane: 0, col: 3, title: 'Complete or resubmit the activity' },
        { lane: 1, col: 4, kind: 'start', title: 'Semester cutoff date' },
        { lane: 1, col: 5, kind: 'system', title: 'Compute indicators from verified data' },
        { lane: 1, col: 6, kind: 'system', title: 'Freeze the snapshot with record IDs' },
        { lane: 2, col: 7, title: 'Re-freeze with a reason (only if needed)' },
        { lane: 3, col: 8, title: 'Read the dashboard and download reports' },
        { lane: 3, col: 9, kind: 'end', title: 'Semester reported' },
      ],
    },
  ] as Process[],
  roles: {
    columns: ['Academic unit', 'IO Mobility', 'IO Admin', 'Leadership'],
    rows: [
      { action: 'Create, submit and revise activities', cells: ['Own unit', false, 'On behalf of a unit', false] },
      { action: 'See activities', cells: ['Own and co-unit', 'All', 'All', 'Verified only'] },
      { action: 'See participant names and mobility PDFs', cells: ['Own', true, true, false] },
      { action: 'Verify mobility, decide duplicate students', cells: [false, true, true, false] },
      { action: 'Edit a verified activity (logged)', cells: [false, 'Participants', true, false] },
      { action: 'Settings, calendar, activity-type rules, freeze', cells: [false, false, true, false] },
      { action: 'Dashboard, awards, non-personal Excel', cells: ['Own unit', true, true, true] },
      { action: 'Excel with student data (logged)', cells: ['Own unit', true, true, false] },
    ] as { action: string; cells: (string | boolean)[] }[],
  },
}

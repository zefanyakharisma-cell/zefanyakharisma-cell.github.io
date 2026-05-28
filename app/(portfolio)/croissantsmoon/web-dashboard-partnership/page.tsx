import WebProjectDetail, { WebProject } from '@/components/cm/WebProjectDetail'

const project: WebProject = {
  title:   'International Partnership Dashboard',
  tagline: 'A data dashboard for visualising and managing international partnership networks.',
  year:    '2025',
  status:  'Live',
  github:  'https://github.com/zefanyakharisma-cell/Dashboard-Partnership',
  live:    'https://dashboard-partnership.vercel.app/',
  tech:    ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Tailwind CSS'],
  background: `International offices at universities manage dozens — sometimes hundreds — of institutional partnerships. At Petra Christian University, much of this data lived in spreadsheets: partner universities, agreement types, expiry dates, geographic regions, and activity status. There was no quick way to see the overall health of the network, identify which regions were underrepresented, or track which agreements were approaching expiry. This dashboard was built to transform that raw data into an interactive, at-a-glance overview that anyone in the team could use without opening a single spreadsheet.`,
  purpose: `To give an international office — and its leadership — a single, real-time view of the institution's entire partnership network. The dashboard replaces a set of fragmented spreadsheets with a searchable, filterable, chart-driven interface that answers the most common operational questions in seconds: how many active agreements do we have, where are they concentrated, and which ones are approaching expiry?`,
  features: [
    { icon: 'bar-chart-2', title: '2,289 Agreements at a Glance', desc: 'Real institutional dataset — 2,289 agreements across 1,201 institutions and 38 departments, normalised from raw spreadsheets into a fast, searchable JSON store.' },
    { icon: 'workflow',    title: '8-Stage Workflow Engine',       desc: 'Every agreement moves through Drafting → Internal Review → Legal Review → Partner Review → Waiting Signature → Signed → Completed → Archived, with progress tracking and status history.' },
    { icon: 'archive',     title: 'Public Archive Library',        desc: 'Signed and active agreements are auto-archived and made available in a public-facing library with advanced search, filter, and CSV export — no sign-in required.' },
    { icon: 'pie-chart',   title: 'Executive Analytics',           desc: 'Status distribution, agreements by department, monthly activity trends, and expiration timeline — all rendered with Chart.js and updated live as filters change.' },
    { icon: 'users',       title: 'Role-Based Admin System',       desc: 'Four roles (Admin, Manager, Staff, Viewer) with Supabase Auth. Admins manage users, workflows, and document attachments; viewers get read-only access.' },
    { icon: 'moon',        title: 'Dark Mode & CSV Export',        desc: 'Persistent dark/light mode toggle, keyboard shortcuts, confirmation modals on all destructive actions, and one-click data export to JSON or CSV from the Settings page.' },
  ],
  problems: [
    { icon: 'table',    title: 'Data Locked in Spreadsheets', tag: 'Data Accessibility', desc: "Partnership data was maintained in multiple spreadsheet files, making it impossible to get a real-time, consolidated picture of the institution's partner network." },
    { icon: 'map-pin',  title: 'No Geographic Overview',      tag: 'Visualisation',      desc: 'Without a map or regional breakdown, it was difficult to identify geographic gaps in the partnership network or report distribution to senior leadership.' },
    { icon: 'clock',    title: 'Agreement Expiry Blind Spots', tag: 'Monitoring',         desc: 'MoU and MoA agreements have fixed terms — but there was no system to surface agreements nearing expiry before they lapsed unnoticed.' },
    { icon: 'filter',   title: 'No Filtering or Segmentation', tag: 'User Experience',   desc: 'With 30+ partners across multiple agreement types and regions, there was no way to quickly answer "show me all active partners in Europe" without manual sorting.' },
  ],
  solutions: [
    { icon: 'bar-chart-2',  title: 'Interactive Summary Charts',   tag: 'Visualisation',   desc: 'Chart.js-powered bar and doughnut charts break down partnerships by region, agreement type, and activity status — updating live when filters change.' },
    { icon: 'map',          title: 'Regional Distribution View',   tag: 'Visualisation',   desc: 'A regional breakdown panel gives an immediate sense of geographic coverage, making it easy to identify gaps and report distribution data.' },
    { icon: 'alert-circle', title: 'Expiry Status Indicators',     tag: 'Monitoring',      desc: 'Each partnership card displays agreement status — active, expiring soon, or expired — with colour-coded badges so renewals never slip through.' },
    { icon: 'search',       title: 'Search and Filter Controls',   tag: 'User Experience', desc: 'Compound filters by country, region, agreement type, and status let any team member answer specific questions about the network in seconds.' },
  ],
  uiux: {
    desc: 'Dashboard design requires a different visual logic than a marketing site. Information density is high, so the design relies on structured whitespace, strong typographic hierarchy, and colour-coded status indicators to reduce cognitive load. Dark mode is the default — long sessions demand it.',
    points: [
      { icon: 'grid',     title: 'Card-Based Data Layout',    desc: 'Partnership records are presented as cards with status badges, country flags, and agreement-type indicators — scannable at a glance without opening individual records.' },
      { icon: 'moon',     title: 'Dark-First Design',         desc: 'Dark mode is the default with a toggle to light mode — optimised for extended use in office environments and presentations to leadership.' },
      { icon: 'filter',   title: 'Compound Filter Panel',     desc: 'Region, country, agreement type, department, and status filters can be combined — giving any team member the ability to answer specific network questions without SQL knowledge.' },
      { icon: 'workflow', title: '8-Stage Workflow Kanban',   desc: "A visual pipeline shows every active agreement's stage — from Drafting to Archived — so bottlenecks and pending approvals are immediately visible." },
    ],
  },
  frontend: {
    desc: 'Vanilla JavaScript handles all interactivity, with Chart.js for data visualisation and Tailwind CSS for layout. The dataset — 2,289 agreements — is loaded from a normalised JSON file at runtime, giving instant filtering and charting without any API call latency.',
    points: [
      { icon: 'bar-chart-2', title: 'Chart.js Visualisations', desc: 'Bar charts, doughnut charts, and line charts break down partnerships by region, agreement type, status, and monthly activity — all updating live when filters change.' },
      { icon: 'zap',         title: 'JSON Data Layer',          desc: '2,289 agreements pre-normalised into a single JSON file — loaded once at page init and queried in-memory. No API call required for filtering, searching, or charting.' },
      { icon: 'download',    title: 'CSV & JSON Export',        desc: 'The current filtered view can be exported as CSV or JSON from the Settings page — one click to get board-ready data without opening a spreadsheet.' },
      { icon: 'keyboard',    title: 'Keyboard Shortcuts',       desc: 'Power users can toggle dark mode, open search, and navigate sections via keyboard — improving efficiency for team members who use the dashboard daily.' },
    ],
  },
  backend: {
    desc: 'The public-facing archive and workflow engine are backed by Supabase, while the core partnership dataset lives in a normalised JSON file for instant client-side querying. Supabase Auth manages role-based access across four admin tiers.',
    points: [
      { icon: 'database',     title: 'Supabase Postgres',       desc: 'Workflow state, document attachments, user activity logs, and audit trails are stored in Supabase — keeping mutable state off the static JSON layer.' },
      { icon: 'shield',       title: 'Supabase Auth & RLS',     desc: 'Four roles (Admin, Manager, Staff, Viewer) with scoped permissions via Row Level Security — Viewers get read-only; Admins can create, edit, delete, and attach documents.' },
      { icon: 'file-text',    title: 'Normalised JSON Dataset', desc: '2,289 partnership records cleaned, deduplicated, and normalised from raw spreadsheets into a structured JSON schema — the canonical data source for all client-side queries.' },
      { icon: 'upload-cloud', title: 'Supabase Storage',        desc: 'Document attachments (MoU/MoA PDFs, signed copies) are uploaded and stored in Supabase Storage, with admin-controlled access per agreement record.' },
    ],
  },
}

export default function WebDashboardPartnershipPage() {
  return <WebProjectDetail project={project} />
}

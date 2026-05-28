import WebProjectDetail, { WebProject } from '@/components/cm/WebProjectDetail'

const project: WebProject = {
  title:   'International Grants Dashboard',
  tagline: 'Centralising international grant tracking from application through to outcome.',
  year:    '2025',
  status:  'Live',
  github:  'https://github.com/zefanyakharisma-cell/Dashboard-International-Grants',
  live:    'https://dashboard-international-grants.vercel.app/',
  tech:    ['HTML', 'CSS', 'JavaScript', 'Chart.js', 'Tailwind CSS', 'Supabase'],
  background: `International grant programmes — from government scholarships to university-funded exchanges — require careful tracking across multiple stages: awareness, application, selection, placement, and completion. At the International Office, managing these journeys across multiple grant types and dozens of applicants per cycle created a coordination overhead that was hard to manage without a dedicated tool. This dashboard was built to centralise that information: one place to see every active grant, every applicant's stage, every upcoming deadline, and every outcome — without chasing status updates across emails and spreadsheets.`,
  purpose: `International grant programmes span multiple stages — from awareness and application through to placement and completion — and require precise deadline tracking across concurrent cycles. The dashboard exists to give international office staff and prospective applicants a single place to discover relevant grants, track application stages, and never miss a submission deadline.`,
  features: [
    { icon: 'zap',          title: 'Realtime Updates',          desc: 'Supabase Realtime subscriptions push INSERT/UPDATE/DELETE events from the grants table to every connected client instantly — no polling, no page refresh required.' },
    { icon: 'calendar',     title: 'Deadline Calendar',         desc: 'A dedicated calendar view surfaces every grant deadline across active programmes, sorted by urgency so no submission window is missed.' },
    { icon: 'bookmark',     title: 'Local & Remote Bookmarks',  desc: 'Public users can bookmark grants locally; authenticated users get their bookmarks synced across devices via Supabase, persisting across sessions.' },
    { icon: 'cpu',          title: 'Grant Matching Engine',     desc: "A matching view cross-references a user's faculty and programme against grant eligibility criteria, surfacing the most relevant opportunities automatically." },
    { icon: 'shield',       title: 'Row Level Security Throughout', desc: 'Every table is protected by Supabase RLS — public read, admin write. The anon key is safely exposed in the client bundle; the service_role key is never used in frontend code.' },
    { icon: 'upload-cloud', title: 'Admin File Attachments',    desc: 'Admins can upload supporting documents (PDFs, forms) directly to Supabase Storage from the grant form — drag-and-drop or file picker, with a full audit trail in the activity log.' },
  ],
  problems: [
    { icon: 'inbox',       title: 'Scattered Grant Information',  tag: 'Data Management',       desc: 'Grant details, applicant lists, deadlines, and outcomes were distributed across emails, shared drives, and spreadsheets — creating a fragmented and unreliable record.' },
    { icon: 'calendar',    title: 'Deadline Management',          tag: 'Time-Critical Tracking', desc: 'Grant cycles have hard deadlines at multiple stages. Missing a submission window meant losing funding for the entire cohort — yet there was no centralised deadline view.' },
    { icon: 'trending-up', title: 'No Outcome Visibility',        tag: 'Reporting',              desc: 'Leadership needed to report on grant performance — acceptance rates, funding secured, placement outcomes — but producing those figures required manual data aggregation.' },
    { icon: 'user-check',  title: 'Applicant Stage Tracking',     tag: 'Pipeline Management',   desc: 'With multiple applicants per grant and multiple stages per applicant, tracking who was at which stage across several concurrent grant cycles was error-prone.' },
  ],
  solutions: [
    { icon: 'layout',    title: 'Centralised Grant Overview',  tag: 'Data Management',       desc: 'All active and completed grants in one dashboard — each with type, funding body, cycle dates, applicant count, and current status visible at a glance.' },
    { icon: 'calendar',  title: 'Deadline Timeline View',      tag: 'Time-Critical Tracking', desc: 'A timeline panel surfaces upcoming deadlines across all active grants, sorted by urgency — ensuring no submission window is missed.' },
    { icon: 'pie-chart', title: 'Outcome Analytics',           tag: 'Reporting',              desc: 'Acceptance rates, funding totals, and placement outcomes are calculated automatically from the data and presented in charts ready for leadership reporting.' },
    { icon: 'git-merge', title: 'Stage-Based Pipeline View',   tag: 'Pipeline Management',   desc: "A Kanban-style pipeline shows every applicant's current stage across active grants — making it easy to see where the bottlenecks are and who needs follow-up." },
  ],
  uiux: {
    desc: 'The design prioritises time-critical information: deadline proximity, application stage, and grant relevance are the three data points that determine what a user needs to see first. Urgency indicators and a persistent deadline calendar ensure that no grant window closes unnoticed.',
    points: [
      { icon: 'clock',    title: 'Deadline-First Priority',      desc: 'Grants are sorted by deadline urgency by default. Colour-coded countdown badges (green / amber / red) communicate time pressure at a glance.' },
      { icon: 'calendar', title: 'Persistent Deadline Calendar', desc: 'A monthly calendar view marks every active grant deadline — users can switch between list and calendar views depending on their planning horizon.' },
      { icon: 'cpu',      title: 'Matching Engine UI',           desc: "A faculty/programme selector surfaces the most relevant grants for the user's profile — reducing the time spent reading eligibility criteria manually." },
      { icon: 'bookmark', title: 'Bookmark System',              desc: 'Public users get local bookmarks; authenticated users get cross-device sync via Supabase — building a personal grant shortlist without requiring sign-up.' },
    ],
  },
  frontend: {
    desc: "Vanilla JavaScript with Chart.js for analytics and Tailwind CSS for layout. Supabase's JavaScript client handles Realtime subscriptions, auth, and storage — all without a frontend framework. The matching engine is a pure client-side algorithm that cross-references user input against grant eligibility rules stored in the database.",
    points: [
      { icon: 'zap',         title: 'Supabase Realtime Client',          desc: 'The JS SDK subscribes to INSERT/UPDATE/DELETE events on the grants table — live updates propagate to all connected clients without a page refresh.' },
      { icon: 'bar-chart-2', title: 'Chart.js Analytics',                desc: 'Acceptance rate trends, grant type distribution, and funding body breakdowns are rendered with Chart.js — updating automatically as data changes.' },
      { icon: 'cpu',         title: 'Client-Side Matching Algorithm',    desc: 'The grant matching engine runs entirely in the browser: it filters grants by faculty, programme, nationality, and GPA threshold in milliseconds with no server round-trip.' },
      { icon: 'wind',        title: 'Tailwind CSS',                      desc: 'Utility-first styling with a custom dark-mode palette. All components — cards, modals, calendar, table — share a consistent design token system defined in the Tailwind config.' },
    ],
  },
  backend: {
    desc: 'Supabase provides the complete backend stack: Postgres for grant and applicant data, Realtime for live updates, Auth for authenticated admin and student roles, and Storage for grant document attachments — all protected by Row Level Security.',
    points: [
      { icon: 'database',     title: 'Supabase Postgres',     desc: 'Tables for grants, applications, stages, bookmarks, and activity logs — all with RLS policies. Public users can read published grants; admins can write across all tables.' },
      { icon: 'radio',        title: 'Supabase Realtime',     desc: 'Postgres Changes subscriptions push live INSERT/UPDATE/DELETE events to the frontend — no polling, no websocket management, no extra infrastructure.' },
      { icon: 'shield',       title: 'Row Level Security',    desc: 'Every table has RLS enabled. The anon key is safely used in the frontend bundle; no service_role key is ever exposed to the client.' },
      { icon: 'upload-cloud', title: 'Storage & File Uploads', desc: 'Admins can upload grant-related documents (application forms, guidelines, results) directly from the dashboard — drag-and-drop with a full audit trail.' },
    ],
  },
}

export default function WebDashboardGrantsPage() {
  return <WebProjectDetail project={project} />
}

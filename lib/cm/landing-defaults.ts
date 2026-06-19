import type { CMLandingContent, CMLandingSeo } from '@/types'

// ─────────────────────────────────────────────────────────────────
// Fallback content for the public /croissantsmoon landing page.
// This is the single source of truth when the cm_landing row is empty
// or only partially filled (getLandingContent deep-merges DB over this).
// Keep in sync with the page's intended default copy.
// ─────────────────────────────────────────────────────────────────

export const LANDING_DEFAULTS: CMLandingContent = {
  sections: [
    { key: 'services', visible: true },
    { key: 'work', visible: true },
    { key: 'proof', visible: true },
    { key: 'process', visible: true },
    { key: 'pricing', visible: true },
    { key: 'demos', visible: true },
    { key: 'designs', visible: true },
    { key: 'quote', visible: true },
    { key: 'finalCta', visible: true },
  ],
  meta: {
    proposalHref: '/croissantsmoon/proposal',
    email: 'mailto:zefanya.kharisma@gmail.com',
    githubUrl: 'https://github.com/croissantsmoon',
    linkedinUrl: 'https://www.linkedin.com/in/zefanyakharisma',
    siteUrl: 'https://zefanyakharisma.com',
    logoSrc: '/croissantsmoon/cm-logo-circle.png',
  },

  hero: {
    eyebrow: 'Celestial Studio · Digital Presence Crafted with Intention',
    titleLine1: 'Digital presence,',
    titleLine2: 'crafted with intention.',
    subtitle:
      'Web development, dashboard systems, and visual identity for organizations that mean something.',
    primaryCta: { label: 'Request a Proposal', href: '/croissantsmoon/proposal' },
    ghostCta: { label: 'View Our Work', href: '#work' },
    trust: 'Based in Surabaya · Working across Indonesia',
    wordmark: 'CroissantsMoon',
  },

  services: {
    label: 'What We Build',
    heading: 'Three ways we craft your presence.',
    items: [
      {
        id: 'svc-1', num: '01', name: 'Web Development', icon: 'Monitor',
        desc: 'Landing pages, institutional websites, and web applications — built with Next.js, Tailwind, and Supabase.',
        price: 'From Rp 2.5jt',
      },
      {
        id: 'svc-2', num: '02', name: 'Dashboard & Data', icon: 'BarChart3',
        desc: 'Operational dashboards and internal platforms for organizations that need clarity in their data.',
        price: 'From Rp 8jt',
      },
      {
        id: 'svc-3', num: '03', name: 'Visual Identity', icon: 'Palette',
        desc: 'Branding systems, institutional materials, and communication design for organizations that want to be remembered.',
        price: 'On request',
      },
    ],
  },

  projects: {
    label: 'Selected Work',
    heading: 'Featured projects.',
    viewAll: { label: 'View All Projects', href: '/croissantsmoon/websites' },
    items: [
      {
        id: 'prj-1', cat: 'Institutional · Web App',
        name: 'PCU Global — International Office Platform',
        desc: 'Full international office platform with news CMS, partnership directory, inbound & outbound programs. Mobile-first.',
        stack: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
        github: 'https://github.com/zefanyakharisma-cell/International-Office-Website',
        live: 'https://international-office-website.vercel.app/',
      },
      {
        id: 'prj-2', cat: 'Data · Dashboard',
        name: 'Partnership Dashboard',
        desc: 'Interactive dashboard visualising institutional partnerships — workflow engine, analytics, archive.',
        stack: ['JavaScript', 'Chart.js', 'Tailwind'],
        github: 'https://github.com/zefanyakharisma-cell/Dashboard-Partnership',
        live: 'https://dashboard-partnership.vercel.app/',
      },
      {
        id: 'prj-3', cat: 'Portfolio · SPA',
        name: 'Personal Portfolio System',
        desc: 'Premium editorial-style single-page portfolio — vanilla JS, Tailwind, Supabase, and Formspree.',
        stack: ['HTML/CSS', 'JavaScript', 'Tailwind', 'Supabase'],
        github: 'https://github.com/zefanyakharisma-cell/zefanyakharisma-cell.github.io',
        live: 'https://zefanyakharisma.com/',
      },
      {
        id: 'prj-4', cat: 'Data · Dashboard',
        name: 'International Grants Dashboard',
        desc: 'Grants discovery and management platform — deadline timeline, realtime updates, admin suite.',
        stack: ['JavaScript', 'Chart.js', 'Supabase'],
        github: 'https://github.com/zefanyakharisma-cell/Dashboard-International-Grants',
        live: 'https://dashboard-international-grants.vercel.app/',
      },
    ],
  },

  proof: {
    label: 'Trusted Work',
    heading: 'What clients say.',
    items: [
      {
        id: 'tst-1',
        quote: 'The dashboard they built transformed how we manage our partnership data. What took us hours in spreadsheets now takes minutes.',
        who: 'International Office Staff, Petra Christian University',
      },
      {
        id: 'tst-2',
        quote: 'CroissantsMoon delivered exactly what we needed — a site that looks world-class but was built for our actual audience.',
        who: 'Client, Educational Institution',
      },
    ],
    stats: [
      { id: 'stat-1', value: '12+', label: 'Projects Delivered' },
      { id: 'stat-2', value: '5+', label: 'Institutional Clients' },
      { id: 'stat-3', value: '3', label: 'Service Verticals' },
      { id: 'stat-4', value: '2026', label: 'Studio Founded' },
    ],
  },

  process: {
    label: 'How It Works',
    heading: 'From first audit to long-term care.',
    items: [
      { id: 'prc-1', num: '01', name: 'Discover', text: "We audit your digital presence and identify exactly what's holding you back." },
      { id: 'prc-2', num: '02', name: 'Propose', text: 'You receive a tailored prototype and a transparent proposal — before any commitment.' },
      { id: 'prc-3', num: '03', name: 'Align', text: 'We agree on scope, timeline, and payment. No surprises, ever.' },
      { id: 'prc-4', num: '04', name: 'Build', text: 'Design, development, QA, and deployment — handled end to end.' },
      { id: 'prc-5', num: '05', name: 'Maintain', text: "Choose a retainer or handoff with full documentation. You're never left stranded." },
    ],
  },

  pricing: {
    label: 'Pricing',
    heading: 'Transparent tiers. No surprises.',
    foundingNote: 'available to the first 10 clients. Lock in 50% off the standard rate for your first project.',
    foundingCta: { label: 'Check Availability', href: '/croissantsmoon/proposal' },
    paymentTerms: 'Payment terms: 50% upfront · 25% mid-delivery · 25% on launch',
    items: [
      {
        id: 'tier-1', name: 'Landing — Basic', timeline: '2–3 days',
        price: 'Rp 2.5jt', note: 'Founding Rate · Rp 5jt standard', featured: false,
        features: ['Clean, modern 1-page layout', 'Mobile + desktop responsive', 'Contact form (email submission)', 'Domain setup + SSL', 'Vercel deployment', '1 round of revisions'],
      },
      {
        id: 'tier-2', name: 'Landing — Pro', timeline: '4–6 days',
        price: 'Rp 3.5jt', note: 'Founding Rate · Rp 7jt standard', featured: false,
        features: ['Multi-section landing page', 'Custom animations & interactions', 'CMS integration (blog/news)', 'SEO optimisation', 'Analytics setup', '2 rounds of revisions'],
      },
      {
        id: 'tier-3', name: 'Org Website', timeline: '2–3 weeks',
        price: 'Rp 6jt', note: 'Founding Rate · Rp 12jt standard', featured: true,
        features: ['Full multi-page website', 'Admin dashboard', 'Supabase backend + auth', 'Partnership/program directory', 'Mobile-first, WCAG-aware', '3 rounds of revisions'],
      },
      {
        id: 'tier-4', name: 'Dashboard System', timeline: '3–4 weeks',
        price: 'Rp 9jt', note: 'Founding Rate · Rp 18jt standard', featured: false,
        features: ['Data dashboard + analytics', 'Role-based access control', 'Real-time data (Supabase)', 'Export + reporting features', 'Admin interface', 'Ongoing maintenance option'],
      },
    ],
  },

  demos: {
    label: 'Demo Experiences',
    heading: 'Feel the quality before you commit.',
    discussLabel: 'Discuss This Project',
    items: [
      {
        id: 'demo-1', num: '01', cat: 'Personal · Portfolio', title: 'Premium Portfolio System',
        desc: 'A narrative-driven digital identity platform for creatives and international professionals. Every element — from typography to motion — tells your story.',
        tags: ['Editorial Design', 'Portfolio CMS', 'Personal Branding', 'Motion'],
        links: [{ label: 'View Live Demo', href: '/croissantsmoon/web-portfolio' }],
      },
      {
        id: 'demo-2', num: '02', cat: 'Institutional · International', title: 'International Office Platform',
        desc: 'A sophisticated digital platform for universities. Features partnership directories, student onboarding systems, and global announcement boards.',
        tags: ['Partnership Directory', 'Student Onboarding', 'Mobility Programs'],
        links: [{ label: 'View Live Demo', href: '/croissantsmoon/websites' }],
      },
      {
        id: 'demo-3', num: '03', cat: 'Data · Operations', title: 'Modern Dashboard System',
        desc: 'A premium internal platform for organizations that need clarity in complexity. Analytics, workflow management, and admin interfaces.',
        tags: ['Analytics Dashboard', 'Workflow Engine', 'Admin Interface'],
        links: [
          { label: 'Partnership Dashboard Demo', href: '/croissantsmoon/web-dashboard-partnership' },
          { label: 'Grants Dashboard Demo', href: '/croissantsmoon/web-dashboard-grants' },
        ],
      },
    ],
  },

  designs: {
    label: 'Visual Identity',
    heading: 'Design work, beyond the screen.',
    imageBase: '/assets/images/graphic-designs',
    viewAll: { label: 'View All Design Work', href: '/croissantsmoon/designs' },
    items: [
      { id: 'dsn-1', title: 'AERO 2025 Presentation', cat: 'Event Materials', inst: 'Universitas Airlangga', folder: 'aero-2025-unair', href: '/croissantsmoon/designs' },
      { id: 'dsn-2', title: 'Airlangga Accommodation Guide', cat: 'Print & Digital', inst: 'Universitas Airlangga', folder: 'accommodation-guidebook-unair', href: '/croissantsmoon/designs' },
      { id: 'dsn-3', title: 'Airlangga International Students Guide', cat: 'Social Media Kits', inst: 'Universitas Airlangga', folder: 'international-students-guidebook-unair', href: '/croissantsmoon/designs' },
    ],
  },

  finalCta: {
    label: "Let's Work Together",
    heading: "Let's build something that lasts.",
    subtitle:
      'Whether you need a website, a dashboard, or a brand identity — CroissantsMoon is open for new projects.',
    primaryCta: { label: 'Request a Proposal', href: '/croissantsmoon/proposal' },
    ghostLabel: 'Start a Conversation',
  },

  footer: {
    brand: 'CroissantsMoon',
    links: [
      { label: 'GitHub', href: 'https://github.com/croissantsmoon' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/zefanyakharisma' },
      { label: 'zefanyakharisma.com', href: 'https://zefanyakharisma.com' },
    ],
    copyright: '© 2026 Zefanya Kharisma Nugroho',
    location: 'Surabaya, Indonesia',
  },
}

export const SEO_DEFAULTS: CMLandingSeo = {
  title: 'CroissantsMoon — Web Development & Design Studio, Surabaya',
  description:
    'CroissantsMoon is a boutique web development and graphic design studio crafting digital presence for institutions and organizations across Indonesia. Web · Dashboard · Visual Identity.',
  ogTitle: 'CroissantsMoon — Celestial Studio',
  ogDescription:
    'Web development, dashboard systems, and visual identity for organizations that mean something. Based in Surabaya, Indonesia.',
  ogImage: '/croissantsmoon/og-image.png',
  keywords: [
    'web development Surabaya',
    'jasa web design Indonesia',
    'dashboard development',
    'visual identity Indonesia',
    'CroissantsMoon',
    'boutique web studio',
    'Next.js developer Surabaya',
    'web developer universitas Indonesia',
    'Petra Christian University',
  ],
}

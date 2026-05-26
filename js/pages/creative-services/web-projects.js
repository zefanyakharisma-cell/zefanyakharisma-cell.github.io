// ── Web Project Detail Pages ─────────────────────────────────────────────────
// Celestial Midnight Luxury colour tokens
const WP = {
  cream:   '#D9E6FF',
  espresso:'#071126',
  gold:    '#D4B15A',
  blush:   '#0B1E3A',
  muted:   '#8FA8D6',
  border:  'rgba(111,168,255,0.14)',
};

const WP_PROJECTS = {
  'web-portfolio': {
    title:   'Website Portfolio',
    tagline: 'A dual-identity SPA for international education and creative technology.',
    year:    '2025',
    status:  'Live',
    github:  'https://github.com/zefanyakharisma-cell/zefanyakharisma-cell.github.io',
    live:    'https://zefanyakharisma.com/',
    tech:    ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Supabase', 'Quill.js'],
    background: `This portfolio started as a personal challenge: how do you present two very different professional identities — international education professional and creative technologist — without splitting them into two separate sites or burying one under the other? The answer was a single-page application designed to feel like a native mobile app on phone and a polished editorial site on desktop. Every architectural decision, from the hash-based routing to the iOS-style bottom tab bar, was made in service of that dual narrative.`,
    purpose: `Built to solve a specific identity problem: two distinct professional worlds — international education and creative technology — needed to coexist under a single domain without either diminishing the other. The portfolio is both a professional asset and a technical showcase, demonstrating that thoughtful architecture and considered design can carry more weight than a framework or a complex stack.`,
    features: [
      { icon: 'layout-dashboard', title: 'Five Canonical Sections',    desc: 'About, Projects, International Education, Creative, and Contact — each with its own visual language, sub-pages, and navigation state.' },
      { icon: 'smartphone',       title: 'iOS-Style Navigation Shell',  desc: 'Bottom tab bar, Dynamic Island pill, and smooth page transitions replicate a native app feel using only vanilla CSS and a custom hash-router.' },
      { icon: 'edit-3',           title: 'Admin CMS with Quill Editor', desc: 'An authenticated admin mode lets the owner write and publish articles via a Quill 2.x WYSIWYG editor, manage calendar events, and edit any heading or paragraph inline — no code push required.' },
      { icon: 'git-branch',       title: '20+ Pages, One HTML File',   desc: 'A custom 60-line hash-router handles dynamic meta titles, OG tags, browser history, scroll-to-top, and nav state across more than twenty distinct pages without any framework.' },
      { icon: 'filter',           title: 'Skill Discovery Entry Point', desc: 'Home page hosts a filterable work grid where visitors can filter projects and work by skill area, surfacing relevant experience instantly.' },
      { icon: 'calendar',         title: 'Calendar Widget',            desc: 'A calendar on the home page shows published articles and upcoming events, all managed by the admin and stored in Supabase.' },
    ],
    problems: [
      { icon: 'split',      title: 'Two Identities, One Domain',   tag: 'Identity Architecture', desc: 'International education work and creative studio work felt mismatched under a single brand. Visitors from one world expected a very different site than those from the other.' },
      { icon: 'smartphone', title: 'Native Feel on Mobile',         tag: 'Mobile UX',            desc: 'Traditional portfolio sites feel clunky on phones — too much scrolling, no clear hierarchy. The site needed to feel like an iOS app, not a web page on a small screen.' },
      { icon: 'edit-3',     title: 'Content Without Code',          tag: 'Content Management',   desc: 'Updating a paragraph or image should not require a code push. A non-technical edit workflow was essential for long-term maintenance.' },
      { icon: 'git-branch', title: 'Scale Across 20+ Pages',        tag: 'Routing Complexity',   desc: 'Over twenty distinct pages with their own titles, meta descriptions, and nav states — all living inside one HTML file without a framework.' },
    ],
    solutions: [
      { icon: 'layers',      title: 'Section-Based Design System',  tag: 'Architecture',   desc: 'Each section of the portfolio — About, Projects, Intl. Ed, Creative — has its own visual language and colour palette, giving each professional identity room to breathe.' },
      { icon: 'smartphone',  title: 'iOS-Inspired Navigation Shell', tag: 'Mobile UX',     desc: 'Bottom tab bar, Dynamic Island pill, and smooth page transitions replicate a native app feel using only vanilla CSS transitions and a custom hash-router.' },
      { icon: 'database',    title: 'Supabase Inline Editing',       tag: 'CMS Layer',     desc: 'An admin mode powered by Supabase and Quill.js lets any data-edit-key element be edited in place — no code, no deploy, just click and type.' },
      { icon: 'hash',        title: 'Custom Hash Router',            tag: 'SPA Routing',   desc: 'A 60-line router in main.js handles 20+ pages: dynamic meta titles, OG tags, back/forward history, scroll-to-top, and nav state — all without a framework.' },
    ],
    uiux: {
      desc: 'The interface draws from editorial design and iOS native apps — a pairing that creates a distinctly premium, readable feel. Every visual decision, from typeface selection to motion timing, was made to reduce friction for two primary audiences: academic institutions assessing international education credentials, and creative clients evaluating web and design work.',
      points: [
        { icon: 'smartphone',  title: 'iOS-Inspired Shell',            desc: 'Bottom tab bar, Dynamic Island pill, and smooth slide transitions replicate a native mobile app experience — built entirely with CSS and a custom JS router.' },
        { icon: 'type',        title: 'Editorial Typography',          desc: 'Cormorant Garamond (serif, for headings) paired with Outfit (sans-serif, for body) creates a luxury editorial hierarchy that is readable at every viewport.' },
        { icon: 'sun-moon',    title: 'Dark Mode Throughout',          desc: 'A deep midnight palette reduces eye strain during extended reading and positions the portfolio as premium and contemporary.' },
        { icon: 'layers',      title: 'Section-Level Visual Languages', desc: 'Each of the five sections has its own accent palette — About uses warm cream tones, Creative uses celestial midnight blues — giving each identity its own design space.' },
      ],
    },
    frontend: {
      desc: 'The frontend is intentionally framework-free. Every feature — routing, animations, admin mode, calendar, skill filters — is implemented in vanilla JavaScript. This was a deliberate choice: the project needed to demonstrate front-end engineering depth without leaning on a framework\'s abstractions.',
      points: [
        { icon: 'hash',   title: 'Custom 60-Line Hash Router',    desc: 'Handles 20+ pages with dynamic <title>, Open Graph tags, back/forward history, scroll-to-top, and nav highlighting — all without a framework or build step.' },
        { icon: 'zap',    title: 'IntersectionObserver Animations', desc: 'Scroll-reveal, card entrance, and section transitions are driven by native IntersectionObserver — zero animation libraries in the dependency chain.' },
        { icon: 'edit-3', title: 'Quill 2.x WYSIWYG Editor',     desc: 'Integrated for admin article authoring with custom Tailwind-styled toolbar, image upload, and Supabase Storage integration.' },
        { icon: 'wind',   title: 'Tailwind CSS (CDN)',            desc: 'Tailwind is loaded via CDN with a custom config for brand tokens — no build pipeline required, keeping the deployment a single HTML + JS drop.' },
      ],
    },
    backend: {
      desc: 'Supabase serves as the entire backend: authentication, database, storage, and inline content editing. The anon key is safely exposed in the frontend; Row Level Security policies ensure public users can only read published content.',
      points: [
        { icon: 'database', title: 'Supabase Postgres', desc: 'Tables for articles, calendar events, and inline content edits — all with RLS policies that allow public reads and restrict writes to authenticated admins.' },
        { icon: 'lock',     title: 'Supabase Auth',     desc: 'Email/password auth gates the admin mode. On login, the UI unlocks inline editing, article management, and calendar event controls.' },
        { icon: 'image',    title: 'Supabase Storage',  desc: 'Article cover images and inline image uploads are stored in a Supabase Storage bucket with signed URLs for private assets.' },
        { icon: 'send',     title: 'Formspree Contact', desc: 'The contact form submits via Formspree — keeping the submission pipeline serverless and requiring no custom backend endpoint.' },
      ],
    },
  },

  'web-pcu-global-intl': {
    title:   'PCU Global — International Office Website',
    tagline: "Rebuilding an institutional web presence for a university's international office.",
    year:    '2026',
    status:  'In Progress',
    github:  'https://github.com/zefanyakharisma-cell/International-Office-Website',
    live:    'https://international-office-website.vercel.app/',
    tech:    ['HTML', 'CSS', 'JavaScript', 'Tailwind CSS', 'Supabase'],
    background: `Petra Christian University's International Office had a digital presence that had not kept pace with its growing partnerships and ambitions. The old site was a static collection of pages with no content management, inconsistent design, and poor information architecture that made it hard for prospective partner universities and exchange students to find what they needed. The brief was clear: rebuild from scratch, with a content system that staff could maintain themselves, a design that reflected PCU's positioning as an internationally recognised institution, and a structure that served both inbound and outbound audiences.`,
    purpose: `PCU's International Office manages relationships with partner universities worldwide, coordinates inbound and outbound student mobility, and serves as the primary touchpoint for international institutional enquiries. The site needed to communicate institutional credibility to global partners while simultaneously guiding prospective exchange students through program options — two very different audiences requiring a carefully structured information architecture.`,
    features: [
      { icon: 'globe',       title: 'Inbound & Outbound Programs',      desc: 'Dedicated pages for every academic program — semester exchange, international degree, ICOP, Indonesian SPECTRUM, joint/double degree, and internship — structured around two distinct audience journeys.' },
      { icon: 'users',       title: 'Role-Based Admin News CMS',         desc: 'Four admin roles (Inbound, Outbound, Partnership, Head) can publish, edit, and delete news articles from a rich-text editor. Articles are stored in Supabase and merged with static seed data at runtime.' },
      { icon: 'mail',        title: 'Meeting Request Form',             desc: 'A multi-step modal form captures institution details, meeting preferences, and guest lists, writes directly to Supabase, and fires a Deno Edge Function to send email notifications via Resend.' },
      { icon: 'map',         title: 'Interactive Partnership Directory', desc: 'A drill-down modal — continent → country → partner details — lets visitors explore PCU\'s global network. Domestic partners have a separate categorised modal with toggleable sections.' },
      { icon: 'play-circle', title: 'Animated Hero Carousel',           desc: 'Auto-advancing hero slides with navigation arrows, dot indicators, and scroll-reveal animations built using IntersectionObserver — no animation library required.' },
      { icon: 'database',    title: 'OSE & Internship CMS',             desc: 'Admins can add custom university entries to the Outbound Semester Exchange page and manage internship opportunity listings via dedicated Supabase-backed modals.' },
    ],
    problems: [
      { icon: 'file-x',    title: 'Static Site, No CMS',          tag: 'Content Management',      desc: 'Updating news, partner information, or program details required technical access to the codebase — a bottleneck for a busy international office team.' },
      { icon: 'users',     title: 'Two Audiences, One Navigation', tag: 'Information Architecture', desc: 'Prospective partner universities and exchange students have completely different information needs. The old site did not separate these journeys at all.' },
      { icon: 'globe',     title: 'No Partnership Directory',      tag: 'Data Presentation',       desc: "PCU's network of international partners had no visual representation — no searchable directory, no map, no snapshot of the institution's global reach." },
      { icon: 'smartphone',title: 'Desktop-Only Layout',           tag: 'Responsive Design',       desc: 'The existing site broke on mobile devices, alienating a large share of prospective students who browse primarily on their phones.' },
    ],
    solutions: [
      { icon: 'edit-3',    title: 'Supabase-Powered News CMS',    tag: 'Content Management',       desc: 'A rich-text editor connected to Supabase lets staff publish and edit news articles, announcements, and program updates without touching code.' },
      { icon: 'layout',    title: 'Audience-First Architecture',  tag: 'Information Architecture',  desc: 'Navigation and content structure were redesigned around two primary journeys — partner institutions and prospective exchange students — reducing cognitive load for each.' },
      { icon: 'map',       title: 'Partnership Directory',        tag: 'Data Presentation',         desc: "A searchable, filterable directory of partner universities with country, region, and agreement-type filters gives the institution's global network a proper visual home." },
      { icon: 'smartphone',title: 'Mobile-First Rebuild',         tag: 'Responsive Design',         desc: 'Every layout was designed mobile-first using Tailwind CSS, with progressive enhancement for tablet and desktop — ensuring a consistent experience across all devices.' },
    ],
    uiux: {
      desc: 'The design language reflects institutional gravitas: a deep navy and gold palette, clean typographic hierarchy, and generous white space — without sacrificing warmth. Every page follows an audience-first layout principle: partner institutions land on programme overviews and the partnership directory; students find orientation guides and mobility options.',
      points: [
        { icon: 'layout',      title: 'Audience-Split Navigation',     desc: 'Primary navigation is structured around two journeys — Inbound and Outbound — so each audience type reaches relevant content within one click from any page.' },
        { icon: 'play-circle', title: 'Animated Hero Carousel',        desc: 'Auto-advancing hero slides with dot indicators and keyboard navigation create immediate visual energy without relying on a carousel library.' },
        { icon: 'map',         title: 'Drill-Down Partnership Modal',  desc: 'Continent → country → partner details: a three-level modal hierarchy presents a complex partner network without overwhelming the user with a flat list.' },
        { icon: 'mail',        title: 'Multi-Step Meeting Request',    desc: 'A guided modal form captures institution details, contact info, meeting preferences, and guest lists — reducing drop-off by presenting one step at a time.' },
      ],
    },
    frontend: {
      desc: 'The frontend is built with semantic HTML, Tailwind CSS for layout and styling, and vanilla JavaScript for all interactive components. IntersectionObserver drives all scroll animations — no GSAP, no AOS, no animation library.',
      points: [
        { icon: 'wind',   title: 'Tailwind CSS',                      desc: 'Utility-first CSS handles responsive layouts, spacing, and typography. A custom Tailwind config defines the institutional colour palette and type scale.' },
        { icon: 'eye',    title: 'IntersectionObserver Scroll Reveals', desc: 'Cards, sections, and image panels animate in as they enter the viewport — driven by native browser APIs with a single reusable observer class.' },
        { icon: 'layers', title: 'Component Architecture',             desc: 'Each page section — hero, programs, news feed, partnership directory, footer — is an independently rendered JS function, making the codebase easy to extend.' },
        { icon: 'globe',  title: 'No Framework, No Build Step',       desc: 'The site is a single HTML file with modular JS — deployable to any static host with no CI pipeline, no package.json, and no bundler.' },
      ],
    },
    backend: {
      desc: 'Supabase provides the full backend: a Postgres database for news and CMS content, Supabase Auth for role-based admin access, and a Deno Edge Function that handles email notifications via Resend when a meeting request is submitted.',
      points: [
        { icon: 'database', title: 'Supabase Postgres',          desc: 'Tables for news articles, OSE university listings, internship opportunities, and meeting requests — all protected by RLS policies.' },
        { icon: 'users',    title: 'Role-Based Auth (4 Roles)',  desc: 'Inbound, Outbound, Partnership, and Head admin roles — each with scoped write permissions. Managed via Supabase Auth and a profiles table.' },
        { icon: 'cpu',      title: 'Deno Edge Function',         desc: 'A serverless Edge Function fires on new meeting request inserts and sends a formatted email to the international office via the Resend API.' },
        { icon: 'send',     title: 'Resend Email API',           desc: 'Meeting request notifications are delivered via Resend — a transactional email service — with a template that includes all submitted form data.' },
      ],
    },
  },

  'web-dashboard-partnership': {
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
        { icon: 'workflow', title: '8-Stage Workflow Kanban',   desc: 'A visual pipeline shows every active agreement\'s stage — from Drafting to Archived — so bottlenecks and pending approvals are immediately visible.' },
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
  },

  'cm-portfolio-demo': {
    title:   'Portfolio Website — Demo',
    tagline: 'Open-source editorial SPA portfolio template — vanilla JS, Tailwind CSS, Supabase admin CMS.',
    year:    '2025',
    status:  'Live',
    github:  'https://github.com/croissantsmoon/Portfolio-Demo',
    live:    'https://portfolio-demo-pearl-six.vercel.app',
    tech:    ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'Supabase', 'Quill.js'],
    background: `A demo build of the portfolio website template powering zefanyakharisma.com. All names, institutions, programs, and contact details are fictional placeholders — backends (Supabase, Formspree) are intentionally unconfigured so you can fork it and fill in your own details. The codebase is the complete production source, structured into five canonical sections that mirror the real portfolio: About, Projects, Intl. Ed, Creative, and Contact.`,
    purpose: `To give anyone building a personal portfolio a battle-tested, framework-free starting point. The demo shows the full visual system — hero, about sections, project pages, international education, creative studio identity, writing, and contact — without exposing any personal data. Fork it, configure your Supabase project, and go live.`,
    features: [
      { icon: 'layout-dashboard', title: 'Five Canonical Sections',    desc: 'About, Projects, Intl. Ed, Creative (CroissantsMoon), and Contact — each with its own visual language, sub-pages, and navigation state.' },
      { icon: 'edit-3',           title: 'Admin CMS with Quill Editor', desc: 'Authenticated admin mode lets you write and publish articles via Quill 2.x WYSIWYG, manage calendar events, and edit any heading or paragraph inline — no code push required.' },
      { icon: 'smartphone',       title: 'iOS-Style Navigation Shell',  desc: 'Bottom tab bar, Dynamic Island pill, and smooth page transitions replicate a native app feel using only vanilla CSS and a custom hash-router.' },
      { icon: 'git-branch',       title: '20+ Pages, One HTML File',   desc: 'Custom hash-router handles dynamic meta titles, OG tags, browser history, scroll-to-top, and nav state across 20+ pages without a framework.' },
      { icon: 'filter',           title: 'Skill Discovery Entry Point', desc: 'Home page hosts a filterable work grid where visitors filter projects by skill area, surfacing relevant experience instantly.' },
      { icon: 'calendar',         title: 'Calendar Widget',            desc: 'Calendar shows published articles and upcoming events managed by the admin and stored in Supabase.' },
    ],
    problems: [
      { icon: 'user',       title: 'Two Professional Identities',    tag: 'Identity Architecture', desc: 'Presenting international education work and creative studio work under a single brand without one overshadowing the other.' },
      { icon: 'smartphone', title: 'Native Feel on Mobile',          tag: 'Mobile UX',            desc: 'Traditional portfolio sites feel clunky on phones — too much scrolling, no clear hierarchy. This needed to feel like an iOS app.' },
      { icon: 'edit-3',     title: 'Content Without Code Pushes',    tag: 'Content Management',   desc: 'Updating a heading or publishing an article should not require touching the codebase or a deployment pipeline.' },
      { icon: 'git-branch', title: 'Scale Across 20+ Pages',         tag: 'Routing Complexity',   desc: 'Twenty-plus distinct pages with their own titles, meta descriptions, and nav states — all inside one HTML file without a framework.' },
    ],
    solutions: [
      { icon: 'layers',     title: 'Section-Based Design System',   tag: 'Architecture', desc: 'Each section has its own visual language and accent palette, giving each professional identity room to breathe within a unified brand.' },
      { icon: 'smartphone', title: 'iOS-Inspired Navigation Shell', tag: 'Mobile UX',     desc: 'Bottom tab bar, Dynamic Island pill, and smooth transitions replicate native app feel using only vanilla CSS and a custom router.' },
      { icon: 'database',   title: 'Supabase Inline Editing',       tag: 'CMS Layer',     desc: 'Admin mode powered by Supabase and Quill.js lets any data-edit-key element be edited in place — no code, no deploy, just click and type.' },
      { icon: 'hash',       title: 'Custom Hash Router',            tag: 'SPA Routing',   desc: '60-line router handles 20+ pages: dynamic meta titles, OG tags, back/forward history, scroll-to-top, and nav state — no framework.' },
    ],
    uiux: {
      desc: 'The interface draws from editorial design and iOS native apps — a pairing that creates a distinctly premium, readable feel. Every visual decision was made to reduce friction for two primary audiences: institutional contacts assessing credentials, and creative clients evaluating web and design work.',
      points: [
        { icon: 'smartphone', title: 'iOS-Inspired Shell',             desc: 'Bottom tab bar, Dynamic Island pill, and smooth slide transitions replicate a native mobile app experience — built entirely with CSS and a custom JS router.' },
        { icon: 'type',       title: 'Editorial Typography',          desc: 'Cormorant Garamond (serif, headings) paired with Outfit/DM Sans (sans-serif, body) creates a luxury editorial hierarchy readable at every viewport.' },
        { icon: 'layers',     title: 'Section-Level Visual Languages', desc: 'Each of the five sections has its own accent palette — About uses warm cream tones, Creative uses celestial midnight blues — giving each identity its own space.' },
        { icon: 'sun-moon',   title: 'Light & Dark Modes',            desc: 'The site adapts cleanly to system preference, maintaining contrast and readability across both modes.' },
      ],
    },
    frontend: {
      desc: 'The frontend is intentionally framework-free. Every feature — routing, animations, admin mode, calendar, skill filters — is implemented in vanilla JavaScript. No bundler, no build step, no framework.',
      points: [
        { icon: 'hash',   title: 'Custom 60-Line Hash Router',      desc: 'Handles 20+ pages with dynamic title, Open Graph tags, back/forward history, scroll-to-top, and nav highlighting — without a framework or build step.' },
        { icon: 'zap',    title: 'IntersectionObserver Animations', desc: 'Scroll-reveal, card entrance, and section transitions are driven by native IntersectionObserver — zero animation libraries.' },
        { icon: 'edit-3', title: 'Quill 2.x WYSIWYG Editor',       desc: 'Integrated for admin article authoring with custom Tailwind-styled toolbar, image upload, and Supabase Storage integration.' },
        { icon: 'wind',   title: 'Tailwind CSS (CDN)',              desc: 'Loaded via CDN with custom config for brand tokens — no build pipeline required, keeping deployment a single HTML + JS drop.' },
      ],
    },
    backend: {
      desc: 'Supabase serves as the entire backend: authentication, database, storage, and inline content editing. The anon key is safely exposed in the frontend; Row Level Security policies ensure public users can only read published content.',
      points: [
        { icon: 'database', title: 'Supabase Postgres', desc: 'Tables for articles, calendar events, and inline content edits — all with RLS policies allowing public reads and restricting writes to authenticated admins.' },
        { icon: 'lock',     title: 'Supabase Auth',     desc: 'Email/password auth gates the admin mode. On login, the UI unlocks inline editing, article management, and calendar event controls.' },
        { icon: 'image',    title: 'Supabase Storage',  desc: 'Article cover images and inline image uploads stored in a Supabase Storage bucket.' },
        { icon: 'send',     title: 'Formspree Contact', desc: 'Contact form submits via Formspree — keeping the submission pipeline serverless with no custom backend endpoint.' },
      ],
    },
  },

  'cm-intl-office-demo': {
    title:   'International Office Website — Demo',
    tagline: 'Open-source university international office SPA — inbound/outbound programs, role-based CMS, partnership directory, meeting requests.',
    year:    '2025–2026',
    status:  'Live',
    github:  'https://github.com/croissantsmoon/Website-International-Office-Demo',
    live:    'https://website-demo-liard.vercel.app',
    tech:    ['HTML5', 'Tailwind CSS', 'JavaScript', 'Supabase', 'Lucide Icons', 'Resend'],
    background: `Demo version of the PCU Global International Office Website — a full-featured SPA built for Petra Christian University's international office. This open-source build uses placeholder content and unconfigured backends so anyone can fork it and adapt it for their own institution. The architecture covers every core function: inbound and outbound academic programs, a meeting request form, a news CMS with four admin roles, a partnership directory, and an arrival guide for incoming students.`,
    purpose: `To give universities and international offices a production-grade starting point for their digital presence. The demo shows the full system — 20+ pages, admin CMS, Supabase backend, and Resend email integration — without any institution-specific data. Fork it, configure your Supabase project, and adapt the content for your office.`,
    features: [
      { icon: 'globe',       title: 'Inbound & Outbound Programs',      desc: 'Dedicated pages for semester exchange, international degree, ICOP, Indonesian SPECTRUM, joint/double degree, and internship — structured around two distinct audience journeys.' },
      { icon: 'users',       title: 'Role-Based Admin News CMS',         desc: 'Four admin roles (Inbound, Outbound, Partnership, Head) can publish, edit, and delete news articles from a rich-text editor backed by Supabase.' },
      { icon: 'mail',        title: 'Meeting Request Form',             desc: 'Multi-step modal captures institution details, meeting preferences, and guest lists — writes to Supabase and fires a Deno Edge Function to send email notifications via Resend.' },
      { icon: 'map',         title: 'Interactive Partnership Directory', desc: 'Drill-down modal — continent → country → partner details — lets visitors explore the institution\'s global network. Domestic partners have a separate categorised modal.' },
      { icon: 'play-circle', title: 'Animated Hero Carousel',           desc: 'Auto-advancing hero slides with navigation arrows, dot indicators, and scroll-reveal animations built using IntersectionObserver — no animation library.' },
      { icon: 'database',    title: 'OSE & Internship CMS',             desc: 'Admins can add custom university entries to the Outbound Semester Exchange page and manage internship opportunity listings via Supabase-backed modals.' },
    ],
    problems: [
      { icon: 'file-x',     title: 'No CMS for Content Teams',         tag: 'Content Management',       desc: 'University staff need to update news and program details without touching code. Static sites create a bottleneck between content and publication.' },
      { icon: 'users',      title: 'Two Audiences, One Navigation',    tag: 'Information Architecture', desc: 'Prospective partners and exchange students have completely different information needs — the site must serve both without confusing either.' },
      { icon: 'globe',      title: 'No Partnership Directory',         tag: 'Data Presentation',        desc: 'An institution\'s network of international partners had no visual representation — no searchable directory, no map, no snapshot of global reach.' },
      { icon: 'smartphone', title: 'Desktop-Only Legacy Sites',        tag: 'Responsive Design',        desc: 'Many institutional sites break on mobile, alienating prospective students who browse primarily on phones.' },
    ],
    solutions: [
      { icon: 'edit-3',     title: 'Role-Based News CMS',         tag: 'Content Management',       desc: 'Four admin roles with scoped write permissions. Each role publishes to their own section tag — no code deployment needed for content updates.' },
      { icon: 'layout',     title: 'Audience-First Architecture', tag: 'Information Architecture', desc: 'Navigation and content structure redesigned around two primary journeys — partner institutions and prospective exchange students.' },
      { icon: 'map',        title: 'Partnership Directory',       tag: 'Data Presentation',        desc: 'Drill-down modal lets visitors explore the global network continent by continent, country by country — with full partner details at each level.' },
      { icon: 'smartphone', title: 'Mobile-First Rebuild',        tag: 'Responsive Design',        desc: 'Every layout designed mobile-first using Tailwind CSS, with progressive enhancement for tablet and desktop.' },
    ],
    uiux: {
      desc: 'The design language reflects institutional gravitas: navy and gold palette, clean typographic hierarchy, and generous white space. Every page follows an audience-first layout principle: partners find programme overviews and the partnership directory; students find orientation guides and mobility options.',
      points: [
        { icon: 'layout',      title: 'Audience-Split Navigation',    desc: 'Primary navigation structured around two journeys — Inbound and Outbound — so each audience type reaches relevant content within one click.' },
        { icon: 'play-circle', title: 'Animated Hero Carousel',       desc: 'Auto-advancing hero slides with dot indicators and keyboard navigation create immediate visual energy without a carousel library.' },
        { icon: 'map',         title: 'Drill-Down Partnership Modal', desc: 'Continent → country → partner details: three-level modal hierarchy presents a complex partner network without overwhelming the user.' },
        { icon: 'mail',        title: 'Multi-Step Meeting Request',   desc: 'Guided modal form captures institution details, contact info, meeting preferences, and guest lists — reducing drop-off by presenting one step at a time.' },
      ],
    },
    frontend: {
      desc: 'Built with semantic HTML, Tailwind CSS, and vanilla JavaScript. IntersectionObserver drives all scroll animations. Each page section lives in its own render function file — no framework, no build step needed for development.',
      points: [
        { icon: 'wind',   title: 'Tailwind CSS',                       desc: 'Utility-first CSS with custom config for institutional colour palette and type scale. Compiled locally and committed for production.' },
        { icon: 'eye',    title: 'IntersectionObserver Scroll Reveals', desc: 'Cards, sections, and panels animate in as they enter the viewport — driven by native browser APIs with a single reusable observer class.' },
        { icon: 'layers', title: 'Modular Page Architecture',          desc: 'Each page section is an independently rendered JS function under JS/pages/ — making the codebase easy to extend or adapt.' },
        { icon: 'globe',  title: 'No Framework, No Build Step',       desc: 'A single HTML file with modular JS — deployable to any static host with no CI pipeline, no package.json, and no bundler.' },
      ],
    },
    backend: {
      desc: 'Supabase provides the full backend: Postgres for news and CMS content, Auth for role-based admin access, and a Deno Edge Function that handles email notifications via Resend when a meeting request is submitted.',
      points: [
        { icon: 'database', title: 'Supabase Postgres',         desc: 'Tables for news articles, OSE university listings, internship opportunities, and meeting requests — all protected by RLS policies.' },
        { icon: 'users',    title: 'Role-Based Auth (4 Roles)', desc: 'Inbound, Outbound, Partnership, and Head admin roles — each with scoped write permissions managed via Supabase Auth and a profiles table.' },
        { icon: 'cpu',      title: 'Deno Edge Function',        desc: 'Serverless Edge Function fires on new meeting request inserts and sends a formatted email to the international office via the Resend API.' },
        { icon: 'send',     title: 'Resend Email API',          desc: 'Meeting request notifications delivered via Resend with a template that includes all submitted form data.' },
      ],
    },
  },

  'cm-partnership-demo': {
    title:   'Partnership Dashboard — Demo',
    tagline: 'Open-source dashboard for institutional partnership portfolios — 2,289 agreements, 8-stage workflow, analytics, public archive.',
    year:    '2025–2026',
    status:  'Live',
    github:  'https://github.com/croissantsmoon/Partnership-Dashboard-Demo',
    live:    'https://partnership-dashboard-demo-three.vercel.app',
    tech:    ['Vanilla JS', 'Tailwind CSS', 'Chart.js', 'Supabase', 'Lucide Icons'],
    background: `A responsive, open-source dashboard for managing a university or organisation's MoU, MoA, and IA agreement portfolio. Ships with a real institutional dataset of 2,289 agreements across 1,201 institutions and 38 departments, normalised from raw spreadsheets into a fast, queryable JSON store. Built as a single-page application using Vanilla JavaScript, Tailwind CSS, Chart.js, and Supabase — the architecture also serves as a blueprint for lifting into a Next.js + Supabase production stack.`,
    purpose: `To replace fragmented spreadsheets with a single, real-time view of an institution's entire partnership network. The dashboard answers the most common operational questions in seconds: how many active agreements, where are they concentrated, and which ones are approaching expiry — without opening a single spreadsheet.`,
    features: [
      { icon: 'bar-chart-2', title: '2,289 Agreements at a Glance', desc: 'Real institutional dataset — 2,289 agreements across 1,201 institutions and 38 departments, normalised from raw spreadsheets into a fast searchable JSON store.' },
      { icon: 'workflow',    title: '8-Stage Workflow Engine',       desc: 'Every agreement moves through Drafting → Internal Review → Legal Review → Partner Review → Waiting Signature → Signed → Completed → Archived, with full status history.' },
      { icon: 'archive',     title: 'Public Archive Library',        desc: 'Signed and active agreements are auto-archived and made available in a public-facing library with advanced search, filter, and CSV export — no sign-in required.' },
      { icon: 'pie-chart',   title: 'Executive Analytics',           desc: 'Status distribution, agreements by department, monthly activity trends, and expiration timeline — all rendered with Chart.js and updated live as filters change.' },
      { icon: 'users',       title: 'Role-Based Admin System',       desc: 'Four roles (Admin, Manager, Staff, Viewer) with Supabase Auth. Admins manage users, workflows, and document attachments; Viewers get read-only access.' },
      { icon: 'moon',        title: 'Dark Mode & CSV Export',        desc: 'Persistent dark/light mode toggle, keyboard shortcuts, confirmation modals on all destructive actions, and one-click data export to JSON or CSV.' },
    ],
    problems: [
      { icon: 'table',   title: 'Data Locked in Spreadsheets', tag: 'Data Accessibility', desc: 'Partnership data maintained in multiple spreadsheet files — impossible to get a real-time, consolidated picture of the institution\'s partner network.' },
      { icon: 'map-pin', title: 'No Geographic Overview',      tag: 'Visualisation',      desc: 'Without a regional breakdown, it was difficult to identify geographic gaps or report distribution to senior leadership.' },
      { icon: 'clock',   title: 'Agreement Expiry Blind Spots', tag: 'Monitoring',        desc: 'MoU and MoA agreements have fixed terms — but no system surfaced agreements nearing expiry before they lapsed unnoticed.' },
      { icon: 'filter',  title: 'No Filtering or Segmentation', tag: 'User Experience',   desc: 'With hundreds of partners across multiple agreement types and regions, no way to quickly answer "show me all active partners in Europe" without manual sorting.' },
    ],
    solutions: [
      { icon: 'bar-chart-2',  title: 'Interactive Summary Charts', tag: 'Visualisation',   desc: 'Chart.js-powered bar and doughnut charts break down partnerships by region, agreement type, and status — updating live when filters change.' },
      { icon: 'map',          title: 'Regional Distribution View', tag: 'Visualisation',   desc: 'Regional breakdown panel gives an immediate sense of geographic coverage, making it easy to identify gaps and report distribution data.' },
      { icon: 'alert-circle', title: 'Expiry Status Indicators',   tag: 'Monitoring',      desc: 'Each partnership card displays agreement status — active, expiring soon, or expired — with colour-coded badges so renewals never slip through.' },
      { icon: 'search',       title: 'Search and Filter Controls', tag: 'User Experience', desc: 'Compound filters by country, region, agreement type, and status let any team member answer specific questions about the network in seconds.' },
    ],
    uiux: {
      desc: 'Dashboard design requires different visual logic than a marketing site. Information density is high, so the design relies on structured whitespace, strong typographic hierarchy, and colour-coded status indicators to reduce cognitive load. Dark mode is the default — long sessions demand it.',
      points: [
        { icon: 'grid',     title: 'Card-Based Data Layout',   desc: 'Partnership records presented as cards with status badges, country flags, and agreement-type indicators — scannable at a glance without opening individual records.' },
        { icon: 'moon',     title: 'Dark-First Design',        desc: 'Dark mode is the default with a toggle to light mode — optimised for extended use in office environments and presentations to leadership.' },
        { icon: 'filter',   title: 'Compound Filter Panel',    desc: 'Region, country, agreement type, department, and status filters can be combined — giving any team member the ability to answer specific network questions.' },
        { icon: 'workflow', title: '8-Stage Workflow Kanban',  desc: 'A visual pipeline shows every active agreement\'s stage — from Drafting to Archived — so bottlenecks and pending approvals are immediately visible.' },
      ],
    },
    frontend: {
      desc: 'Vanilla JavaScript handles all interactivity, with Chart.js for data visualisation and Tailwind CSS for layout. The dataset — 2,289 agreements — is loaded from a normalised JSON file at runtime, giving instant filtering and charting without any API call latency.',
      points: [
        { icon: 'bar-chart-2', title: 'Chart.js Visualisations', desc: 'Bar charts, doughnut charts, and line charts break down partnerships by region, agreement type, status, and monthly activity — updating live when filters change.' },
        { icon: 'zap',         title: 'JSON Data Layer',          desc: '2,289 agreements pre-normalised into a single JSON file — loaded once at page init and queried in-memory. No API call required for filtering, searching, or charting.' },
        { icon: 'download',    title: 'CSV & JSON Export',        desc: 'Current filtered view can be exported as CSV or JSON from the Settings page — one click to get board-ready data without opening a spreadsheet.' },
        { icon: 'keyboard',    title: 'Keyboard Shortcuts',       desc: 'Power users can toggle dark mode, open search, and navigate sections via keyboard — improving efficiency for daily dashboard users.' },
      ],
    },
    backend: {
      desc: 'The public archive and workflow engine are backed by Supabase, while the core partnership dataset lives in a normalised JSON file for instant client-side querying. Supabase Auth manages role-based access across four admin tiers.',
      points: [
        { icon: 'database',     title: 'Supabase Postgres',       desc: 'Workflow state, document attachments, user activity logs, and audit trails stored in Supabase — keeping mutable state off the static JSON layer.' },
        { icon: 'shield',       title: 'Supabase Auth & RLS',     desc: 'Four roles (Admin, Manager, Staff, Viewer) with scoped permissions via RLS — Viewers get read-only; Admins can create, edit, delete, and attach documents.' },
        { icon: 'file-text',    title: 'Normalised JSON Dataset', desc: '2,289 partnership records cleaned, deduplicated, and normalised from raw spreadsheets into a structured JSON schema — canonical data source for all client-side queries.' },
        { icon: 'upload-cloud', title: 'Supabase Storage',        desc: 'Document attachments (MoU/MoA PDFs, signed copies) uploaded and stored in Supabase Storage, with admin-controlled access per agreement record.' },
      ],
    },
  },

  'cm-grants-demo': {
    title:   'International Grants Dashboard — Demo',
    tagline: 'Open-source grant discovery and management platform — realtime updates, deadline calendar, grant matching engine.',
    year:    '2025–2026',
    status:  'Live',
    github:  'https://github.com/croissantsmoon/Grants-Dashboard',
    live:    'https://grants-dashboard-eta.vercel.app',
    tech:    ['HTML', 'Tailwind CSS', 'JavaScript', 'Chart.js', 'Supabase', 'Lucide Icons'],
    background: `Open-source grant discovery and management platform for educational institutions. Public users browse opportunities; administrators from the International Office manage the catalog with realtime updates pushed to every connected client. Built with vanilla JavaScript as ES modules, Tailwind CSS, Chart.js, and Supabase (Postgres + RLS + Realtime + Storage) — no build step required for local development.`,
    purpose: `International grant programmes span multiple stages — from awareness and application through to placement and completion — and require precise deadline tracking across concurrent cycles. The dashboard gives staff and prospective applicants a single place to discover relevant grants, track application stages, and never miss a submission deadline.`,
    features: [
      { icon: 'zap',          title: 'Realtime Updates',           desc: 'Supabase Realtime subscriptions push INSERT/UPDATE/DELETE events from the grants table to every connected client instantly — no polling, no page refresh.' },
      { icon: 'calendar',     title: 'Deadline Calendar',          desc: 'Dedicated calendar view surfaces every grant deadline across active programmes, sorted by urgency so no submission window is missed.' },
      { icon: 'bookmark',     title: 'Local & Remote Bookmarks',   desc: 'Public users can bookmark grants locally; authenticated users get bookmarks synced across devices via Supabase, persisting across sessions.' },
      { icon: 'cpu',          title: 'Grant Matching Engine',      desc: 'Matching view cross-references a user\'s faculty and programme against grant eligibility criteria, surfacing the most relevant opportunities automatically.' },
      { icon: 'shield',       title: 'Row Level Security Throughout', desc: 'Every table protected by Supabase RLS — public read, admin write. The anon key is safely exposed in the client bundle; service_role key is never used in frontend code.' },
      { icon: 'upload-cloud', title: 'Admin File Attachments',     desc: 'Admins can upload supporting documents (PDFs, forms) directly to Supabase Storage — drag-and-drop or file picker, with a full audit trail in the activity log.' },
    ],
    problems: [
      { icon: 'inbox',       title: 'Scattered Grant Information', tag: 'Data Management',       desc: 'Grant details, deadlines, and outcomes distributed across emails, shared drives, and spreadsheets — creating a fragmented and unreliable record.' },
      { icon: 'calendar',    title: 'Deadline Management',         tag: 'Time-Critical Tracking', desc: 'Grant cycles have hard deadlines at multiple stages. Missing a submission window means losing funding for the entire cohort.' },
      { icon: 'trending-up', title: 'No Outcome Visibility',       tag: 'Reporting',              desc: 'Leadership needed to report on grant performance — acceptance rates, funding secured, placement outcomes — but producing those figures required manual aggregation.' },
      { icon: 'user-check',  title: 'Applicant Stage Tracking',   tag: 'Pipeline Management',   desc: 'With multiple applicants per grant and multiple stages per applicant, tracking who was at which stage across concurrent grant cycles was error-prone.' },
    ],
    solutions: [
      { icon: 'layout',    title: 'Centralised Grant Overview', tag: 'Data Management',        desc: 'All active and completed grants in one dashboard — each with type, funding body, cycle dates, applicant count, and current status visible at a glance.' },
      { icon: 'calendar',  title: 'Deadline Timeline View',     tag: 'Time-Critical Tracking', desc: 'Timeline panel surfaces upcoming deadlines across all active grants, sorted by urgency — ensuring no submission window is missed.' },
      { icon: 'pie-chart', title: 'Outcome Analytics',          tag: 'Reporting',              desc: 'Acceptance rates, funding totals, and placement outcomes calculated automatically and presented in charts ready for leadership reporting.' },
      { icon: 'git-merge', title: 'Stage-Based Pipeline View',  tag: 'Pipeline Management',    desc: 'Kanban-style pipeline shows every applicant\'s current stage across active grants — making it easy to see where bottlenecks are and who needs follow-up.' },
    ],
    uiux: {
      desc: 'The design prioritises time-critical information: deadline proximity, application stage, and grant relevance are the three data points that determine what a user needs to see first. Urgency indicators and a persistent deadline calendar ensure no grant window closes unnoticed.',
      points: [
        { icon: 'clock',    title: 'Deadline-First Priority',       desc: 'Grants sorted by deadline urgency by default. Colour-coded countdown badges (green / amber / red) communicate time pressure at a glance.' },
        { icon: 'calendar', title: 'Persistent Deadline Calendar',  desc: 'Monthly calendar view marks every active grant deadline — users can switch between list and calendar views depending on their planning horizon.' },
        { icon: 'cpu',      title: 'Matching Engine UI',            desc: 'Faculty/programme selector surfaces the most relevant grants for the user\'s profile — reducing time spent reading eligibility criteria manually.' },
        { icon: 'bookmark', title: 'Bookmark System',               desc: 'Public users get local bookmarks; authenticated users get cross-device sync via Supabase — building a personal grant shortlist without requiring sign-up.' },
      ],
    },
    frontend: {
      desc: "Vanilla JavaScript with Chart.js for analytics and Tailwind CSS for layout. Supabase's JS client handles Realtime subscriptions, auth, and storage — all without a frontend framework. The matching engine is a pure client-side algorithm.",
      points: [
        { icon: 'zap',         title: 'Supabase Realtime Client',         desc: 'JS SDK subscribes to INSERT/UPDATE/DELETE events on the grants table — live updates propagate to all connected clients without a page refresh.' },
        { icon: 'bar-chart-2', title: 'Chart.js Analytics',               desc: 'Acceptance rate trends, grant type distribution, and funding body breakdowns rendered with Chart.js — updating automatically as data changes.' },
        { icon: 'cpu',         title: 'Client-Side Matching Algorithm',   desc: 'Grant matching engine runs entirely in the browser: filters grants by faculty, programme, nationality, and GPA threshold in milliseconds with no server round-trip.' },
        { icon: 'wind',        title: 'Tailwind CSS',                     desc: 'Utility-first styling with custom dark-mode palette. All components — cards, modals, calendar, table — share a consistent design token system.' },
      ],
    },
    backend: {
      desc: 'Supabase provides the complete backend stack: Postgres for grant and applicant data, Realtime for live updates, Auth for authenticated admin and student roles, and Storage for grant document attachments — all protected by Row Level Security.',
      points: [
        { icon: 'database',     title: 'Supabase Postgres',      desc: 'Tables for grants, applications, stages, bookmarks, and activity logs — all with RLS policies. Public users can read published grants; admins can write across all tables.' },
        { icon: 'radio',        title: 'Supabase Realtime',      desc: 'Postgres Changes subscriptions push live INSERT/UPDATE/DELETE events to the frontend — no polling, no manual websocket management.' },
        { icon: 'shield',       title: 'Row Level Security',     desc: 'Every table has RLS enabled. The anon key is safely used in the frontend bundle; no service_role key is ever exposed to the client.' },
        { icon: 'upload-cloud', title: 'Storage & File Uploads', desc: 'Admins can upload grant-related documents (application forms, guidelines, results) directly from the dashboard — drag-and-drop with a full audit trail.' },
      ],
    },
  },

  'web-dashboard-grants': {
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
      { icon: 'inbox',      title: 'Scattered Grant Information',  tag: 'Data Management',       desc: 'Grant details, applicant lists, deadlines, and outcomes were distributed across emails, shared drives, and spreadsheets — creating a fragmented and unreliable record.' },
      { icon: 'calendar',   title: 'Deadline Management',          tag: 'Time-Critical Tracking', desc: 'Grant cycles have hard deadlines at multiple stages. Missing a submission window meant losing funding for the entire cohort — yet there was no centralised deadline view.' },
      { icon: 'trending-up',title: 'No Outcome Visibility',        tag: 'Reporting',              desc: 'Leadership needed to report on grant performance — acceptance rates, funding secured, placement outcomes — but producing those figures required manual data aggregation.' },
      { icon: 'user-check', title: 'Applicant Stage Tracking',     tag: 'Pipeline Management',   desc: 'With multiple applicants per grant and multiple stages per applicant, tracking who was at which stage across several concurrent grant cycles was error-prone.' },
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
        { icon: 'clock',    title: 'Deadline-First Priority',    desc: 'Grants are sorted by deadline urgency by default. Colour-coded countdown badges (green / amber / red) communicate time pressure at a glance.' },
        { icon: 'calendar', title: 'Persistent Deadline Calendar', desc: 'A monthly calendar view marks every active grant deadline — users can switch between list and calendar views depending on their planning horizon.' },
        { icon: 'cpu',      title: 'Matching Engine UI',         desc: "A faculty/programme selector surfaces the most relevant grants for the user's profile — reducing the time spent reading eligibility criteria manually." },
        { icon: 'bookmark', title: 'Bookmark System',            desc: 'Public users get local bookmarks; authenticated users get cross-device sync via Supabase — building a personal grant shortlist without requiring sign-up.' },
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
  },
};

// ── Star field helper ─────────────────────────────────────────────────────────
function wpStars(n) {
  return Array.from({length:n},(_,i)=>{
    const x=(Math.random()*100).toFixed(1),y=(Math.random()*100).toFixed(1),s=(Math.random()*2+0.5).toFixed(1),d=(Math.random()*4).toFixed(1),op=(Math.random()*0.5+0.2).toFixed(2);
    return `<span style="position:absolute;left:${x}%;top:${y}%;width:${s}px;height:${s}px;border-radius:50%;background:#fff;opacity:${op};pointer-events:none;animation:wpTwinkle ${(Math.random()*3+1.5).toFixed(1)}s ${d}s ease-in-out infinite"></span>`;
  }).join('');
}

// ── Section helpers ───────────────────────────────────────────────────────────

function wpSectionLabel(text, color) {
  return `<div style="display:flex;align-items:center;gap:10px;margin-bottom:1.5rem">
    <span style="width:3px;height:22px;border-radius:2px;background:${color};flex-shrink:0;display:block"></span>
    <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
      letter-spacing:.2em;text-transform:uppercase;color:${color};margin:0">${text}</p>
  </div>`;
}

function wpDivider() {
  return `<hr style="border:none;border-top:1px solid rgba(111,168,255,0.08);margin:clamp(2rem,5vh,3.5rem) 0">`;
}

function wpPointsGrid(points, accentColor, iconBg, iconBorder) {
  const cards = points.map(pt => `
    <div class="wp-card" style="
      background:rgba(11,30,58,0.7);border-radius:14px;padding:22px;
      border:1px solid rgba(111,168,255,0.14);backdrop-filter:blur(12px);
      box-shadow:0 2px 12px rgba(3,7,18,0.3);
      display:flex;gap:14px;align-items:flex-start
    ">
      <div style="
        width:36px;height:36px;border-radius:10px;flex-shrink:0;
        background:${iconBg};border:1px solid ${iconBorder};
        display:flex;align-items:center;justify-content:center;margin-top:2px
      ">
        <i data-lucide="${pt.icon}" style="width:16px;height:16px;color:${accentColor}"></i>
      </div>
      <div>
        <h4 style="font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1rem;font-weight:600;color:#D9E6FF;
          line-height:1.25;margin-bottom:6px">${pt.title}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.83rem;
          line-height:1.65;color:#8FA8D6">${pt.desc}</p>
      </div>
    </div>`).join('');
  return `<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px;margin-top:1.5rem">${cards}</div>`;
}

// ── Page builder ──────────────────────────────────────────────────────────────

function wpBuildPage(projectId) {
  const p = WP_PROJECTS[projectId];
  if (!p) return '';

  const uid = 'wp' + projectId.replace(/[^a-z0-9]/gi, '');

  const techBadges = p.tech.map(t => `
    <span style="
      font-family:'Outfit',sans-serif;font-size:.72rem;font-weight:500;
      padding:4px 12px;border-radius:999px;
      background:rgba(212,177,90,0.1);color:#8FA8D6;
      border:1px solid rgba(212,177,90,0.2)
    ">${t}</span>`).join('');

  const statusColor  = p.status === 'Live' ? '#4CAF87' : '#D4B15A';
  const statusBg     = p.status === 'Live' ? 'rgba(45,180,79,0.15)' : 'rgba(212,177,90,0.15)';
  const statusBorder = p.status === 'Live' ? 'rgba(45,180,79,0.25)' : 'rgba(212,177,90,0.25)';

  const featureCards = p.features.map(f => `
    <div class="wp-card" style="
      background:rgba(11,30,58,0.7);border-radius:14px;padding:22px;
      border:1px solid rgba(111,168,255,0.14);backdrop-filter:blur(12px);
      box-shadow:0 2px 12px rgba(3,7,18,0.3);
      display:flex;gap:14px;align-items:flex-start
    ">
      <div style="
        width:36px;height:36px;border-radius:10px;flex-shrink:0;
        background:rgba(111,168,255,0.1);border:1px solid rgba(111,168,255,0.2);
        display:flex;align-items:center;justify-content:center;margin-top:2px
      ">
        <i data-lucide="${f.icon}" style="width:16px;height:16px;color:#6FA8FF"></i>
      </div>
      <div>
        <h4 style="font-family:'Cormorant Garamond',Georgia,serif;
          font-size:1rem;font-weight:600;color:#D9E6FF;
          line-height:1.25;margin-bottom:6px">${f.title}</h4>
        <p style="font-family:'Outfit',sans-serif;font-size:.83rem;
          line-height:1.65;color:#8FA8D6">${f.desc}</p>
      </div>
    </div>`).join('');

  const problemCards = p.problems.map(pr => `
    <div class="wp-card" style="
      background:rgba(11,30,58,0.7);border-radius:14px;padding:24px;
      border:1px solid rgba(111,168,255,0.14);backdrop-filter:blur(12px);
      box-shadow:0 2px 12px rgba(3,7,18,0.3)
    ">
      <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:12px">
        <div style="
          width:36px;height:36px;border-radius:10px;flex-shrink:0;
          background:rgba(255,80,60,0.1);border:1px solid rgba(255,80,60,0.2);
          display:flex;align-items:center;justify-content:center
        ">
          <i data-lucide="${pr.icon}" style="width:16px;height:16px;color:#FF6B6B"></i>
        </div>
        <div>
          <span style="font-family:'Outfit',sans-serif;font-size:.67rem;font-weight:600;
            letter-spacing:.08em;text-transform:uppercase;color:#FF6B6B;
            display:block;margin-bottom:4px">${pr.tag}</span>
          <h4 style="font-family:'Cormorant Garamond',Georgia,serif;
            font-size:1.05rem;font-weight:600;color:#D9E6FF;line-height:1.25">${pr.title}</h4>
        </div>
      </div>
      <p style="font-family:'Outfit',sans-serif;font-size:.84rem;
        line-height:1.65;color:#8FA8D6">${pr.desc}</p>
    </div>`).join('');

  const solutionCards = p.solutions.map(s => `
    <div class="wp-card" style="
      background:rgba(11,30,58,0.7);border-radius:14px;padding:24px;
      border:1px solid rgba(111,168,255,0.14);backdrop-filter:blur(12px);
      box-shadow:0 2px 12px rgba(3,7,18,0.3)
    ">
      <div style="display:flex;align-items:flex-start;gap:14px;margin-bottom:12px">
        <div style="
          width:36px;height:36px;border-radius:10px;flex-shrink:0;
          background:rgba(212,177,90,0.1);border:1px solid rgba(212,177,90,0.2);
          display:flex;align-items:center;justify-content:center
        ">
          <i data-lucide="${s.icon}" style="width:16px;height:16px;color:#D4B15A"></i>
        </div>
        <div>
          <span style="font-family:'Outfit',sans-serif;font-size:.67rem;font-weight:600;
            letter-spacing:.08em;text-transform:uppercase;color:#D4B15A;
            display:block;margin-bottom:4px">${s.tag}</span>
          <h4 style="font-family:'Cormorant Garamond',Georgia,serif;
            font-size:1.05rem;font-weight:600;color:#D9E6FF;line-height:1.25">${s.title}</h4>
        </div>
      </div>
      <p style="font-family:'Outfit',sans-serif;font-size:.84rem;
        line-height:1.65;color:#8FA8D6">${s.desc}</p>
    </div>`).join('');

  return `
    <style>
      @keyframes wpTwinkle { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.15;transform:scale(.5)} }
      .wp-card { transition: box-shadow .2s, transform .2s; }
      .wp-card:hover { box-shadow: 0 12px 40px rgba(3,7,18,0.5) !important; transform: translateY(-3px); }
      @media (prefers-reduced-motion: reduce) { .wp-card:hover { transform: none; } }
    </style>

    <!-- Hero -->
    <div class="page-hero-banner" style="
      background:linear-gradient(160deg,#030712 0%,#071126 50%,#0B1E3A 100%);
      padding: clamp(5rem,10vh,7rem) 0 0;
      position:relative;overflow:hidden
    ">
      ${wpStars(90)}
      ${cmBuildAstronauts([
        { img: 3, right: '8%',  top: '12%',    size: 130, dur: 26, del: 0,   rot: 14,  x1: 12, y1: -20, x2: -10, y2: 16 },
        { img: 5, left: '3%',   top: '25%',    size: 105, dur: 33, del: -10, rot: -10, x1: -12, y1: 14, x2: 10, y2: -10 },
        { img: 4, left: '6%',   bottom: '12%', size: 88,  dur: 28, del: -18, rot: 8,   x1: 10, y1: -12, x2: -8, y2: 10  },
        { img: 3, right: '5%',  bottom: '15%', size: 95,  dur: 38, del: -6,  rot: -16, x1: -10, y1: 16, x2: 8, y2: -12  },
        { img: 5, right: '18%', top: '8%',     size: 72,  dur: 22, del: -14, rot: 5,   x1: 8, y1: -10,  x2: -6, y2: 8   },
      ])}

      <div style="
        position:absolute;inset:0;pointer-events:none;
        background:radial-gradient(ellipse at 80% 20%,rgba(212,177,90,0.07),transparent 55%),
                   radial-gradient(ellipse at 5%  80%,rgba(111,168,255,0.06),transparent 50%)
      "></div>

      <div style="position:absolute;right:clamp(1rem,6vw,5rem);top:clamp(2rem,8vh,5rem);opacity:0.13;pointer-events:none">
        <svg width="140" height="140" viewBox="0 0 140 140" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="70" cy="70" r="60" fill="#D9E6FF"/>
          <circle cx="95" cy="50" r="55" fill="#071126"/>
        </svg>
      </div>

      <div style="max-width:760px;margin:0 auto;padding:0 clamp(1.25rem,5vw,3rem);position:relative;z-index:1">
        <button onclick="goToPage('croissantsmoon')" style="
          display:inline-flex;align-items:center;gap:7px;
          font-family:'Outfit',sans-serif;font-size:.78rem;font-weight:500;
          color:rgba(143,168,214,0.5);background:none;border:none;cursor:pointer;
          padding:0;margin-bottom:clamp(1.5rem,4vh,2.5rem);transition:color .18s
        " onmouseover="this.style.color='rgba(143,168,214,0.85)'"
           onmouseout="this.style.color='rgba(143,168,214,0.5)'">
          <i data-lucide="arrow-left" style="width:14px;height:14px"></i>
          CroissantsMoon
        </button>

        <div style="display:flex;align-items:center;gap:10px;margin-bottom:18px">
          <span style="
            font-family:'Outfit',sans-serif;font-size:.68rem;font-weight:600;
            letter-spacing:.1em;text-transform:uppercase;
            padding:3px 11px;border-radius:999px;
            background:${statusBg};color:${statusColor};border:1px solid ${statusBorder}
          ">${p.status}</span>
          <span style="font-family:'Outfit',sans-serif;font-size:.68rem;
            color:rgba(217,230,255,0.35);letter-spacing:.06em">${p.year}</span>
        </div>

        <h1 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(2.2rem,5.5vw,3.5rem);font-weight:600;
          color:#D9E6FF;letter-spacing:-.02em;line-height:1.1;
          margin-bottom:16px;text-shadow:0 0 60px rgba(111,168,255,0.18)
        ">${p.title}</h1>

        <p style="
          font-family:'Outfit',sans-serif;font-size:clamp(.9rem,2vw,1.05rem);
          color:rgba(217,230,255,0.6);line-height:1.6;
          margin-bottom:clamp(1.5rem,4vh,2.5rem);max-width:520px
        ">${p.tagline}</p>

        <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:clamp(1.75rem,4vh,2.75rem)">
          ${techBadges}
        </div>

        <div style="display:flex;flex-wrap:wrap;gap:12px;padding-bottom:clamp(2rem,6vh,4rem)">
          <a href="${p.live}" target="_blank" rel="noopener noreferrer" style="
            display:inline-flex;align-items:center;gap:8px;
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            padding:11px 24px;border-radius:999px;
            background:#D4B15A;color:#071126;text-decoration:none;border:none;
            box-shadow:0 0 18px rgba(212,177,90,0.3);transition:opacity .18s,transform .18s
          " onmouseover="this.style.opacity='.85';this.style.transform='translateY(-1px)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)'">
            <i data-lucide="external-link" style="width:14px;height:14px"></i>
            Open Live Site
          </a>
          <a href="${p.github}" target="_blank" rel="noopener noreferrer" style="
            display:inline-flex;align-items:center;gap:8px;
            font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
            padding:10px 22px;border-radius:999px;
            background:transparent;color:#D9E6FF;text-decoration:none;
            border:1px solid rgba(217,230,255,0.2);transition:border-color .18s,background .18s
          " onmouseover="this.style.borderColor='rgba(217,230,255,0.4)';this.style.background='rgba(217,230,255,0.06)'"
             onmouseout="this.style.borderColor='rgba(217,230,255,0.2)';this.style.background='transparent'">
            <i data-lucide="github" style="width:14px;height:14px"></i>
            View on GitHub
          </a>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="background:#071126;padding-bottom:0">
      <div style="max-width:760px;margin:0 auto;padding:0 clamp(1.25rem,5vw,3rem)">

        <!-- Background -->
        <section style="padding:clamp(2.5rem,6vh,4rem) 0 0">
          ${wpSectionLabel('Background', '#D4B15A')}
          <p style="font-family:'Outfit',sans-serif;font-size:.9375rem;line-height:1.75;color:#8FA8D6">${p.background}</p>
        </section>

        ${wpDivider()}

        <!-- Purpose -->
        <section>
          ${wpSectionLabel('Purpose', '#6FA8FF')}
          <p style="font-family:'Outfit',sans-serif;font-size:.9375rem;line-height:1.75;color:#8FA8D6">${p.purpose}</p>
        </section>

        ${wpDivider()}

        <!-- Problem -->
        <section>
          ${wpSectionLabel('Problems It Solves', '#FF6B6B')}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
            ${problemCards}
          </div>
        </section>

        ${wpDivider()}

        <!-- Features -->
        <section>
          ${wpSectionLabel('Features Available', '#6FA8FF')}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
            ${featureCards}
          </div>
        </section>

        ${wpDivider()}

        <!-- Solutions -->
        <section>
          ${wpSectionLabel('How It Was Handled', '#D4B15A')}
          <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px">
            ${solutionCards}
          </div>
        </section>

        ${wpDivider()}

        <!-- UI/UX -->
        <section>
          ${wpSectionLabel('UI / UX Design', '#A0C4FF')}
          <p style="font-family:'Outfit',sans-serif;font-size:.9375rem;line-height:1.75;color:#8FA8D6;margin-bottom:0">${p.uiux.desc}</p>
          ${wpPointsGrid(p.uiux.points, '#A0C4FF', 'rgba(160,196,255,0.1)', 'rgba(160,196,255,0.2)')}
        </section>

        ${wpDivider()}

        <!-- Frontend -->
        <section>
          ${wpSectionLabel('Frontend', '#6FA8FF')}
          <p style="font-family:'Outfit',sans-serif;font-size:.9375rem;line-height:1.75;color:#8FA8D6;margin-bottom:0">${p.frontend.desc}</p>
          ${wpPointsGrid(p.frontend.points, '#6FA8FF', 'rgba(111,168,255,0.1)', 'rgba(111,168,255,0.2)')}
        </section>

        ${wpDivider()}

        <!-- Backend & Database -->
        <section>
          ${wpSectionLabel('Backend & Database', '#4CAF87')}
          <p style="font-family:'Outfit',sans-serif;font-size:.9375rem;line-height:1.75;color:#8FA8D6;margin-bottom:0">${p.backend.desc}</p>
          ${wpPointsGrid(p.backend.points, '#4CAF87', 'rgba(76,175,135,0.1)', 'rgba(76,175,135,0.2)')}
        </section>

        ${wpDivider()}

        <!-- Live Preview -->
        <section>
          ${wpSectionLabel('Live Preview', '#8FA8D6')}
          <div style="
            border-radius:16px;overflow:hidden;
            border:1px solid rgba(111,168,255,0.14);
            box-shadow:0 8px 40px rgba(3,7,18,0.4)
          ">
            <div style="
              background:rgba(11,30,58,0.8);padding:9px 14px;
              border-bottom:1px solid rgba(111,168,255,0.12);
              display:flex;align-items:center;gap:8px
            ">
              <div style="display:flex;gap:5px;flex-shrink:0">
                <span style="width:9px;height:9px;border-radius:50%;background:#FF5F57;display:block"></span>
                <span style="width:9px;height:9px;border-radius:50%;background:#FEBC2E;display:block"></span>
                <span style="width:9px;height:9px;border-radius:50%;background:#28C840;display:block"></span>
              </div>
              <div style="
                flex:1;background:rgba(7,17,38,0.6);border-radius:5px;padding:4px 10px;
                font-family:'Outfit',sans-serif;font-size:.66rem;color:#8FA8D6;
                border:1px solid rgba(111,168,255,0.1);white-space:nowrap;overflow:hidden;text-overflow:ellipsis
              ">${p.live}</div>
              <a href="${p.live}" target="_blank" rel="noopener noreferrer" style="
                flex-shrink:0;display:flex;align-items:center;justify-content:center;
                width:26px;height:26px;border-radius:6px;
                background:rgba(212,177,90,0.12);color:#D4B15A;text-decoration:none;
                transition:background .18s
              " title="Open in new tab"
                 onmouseover="this.style.background='rgba(212,177,90,0.25)'"
                 onmouseout="this.style.background='rgba(212,177,90,0.12)'">
                <i data-lucide="external-link" style="width:12px;height:12px"></i>
              </a>
            </div>
            <div style="position:relative;height:520px;background:#0B1E3A">
              <div id="wp-preview-placeholder-${projectId}" style="
                position:absolute;inset:0;z-index:2;
                display:flex;flex-direction:column;align-items:center;justify-content:center;
                gap:18px;background:#071126;
                font-family:'Outfit',sans-serif;text-align:center;padding:32px
              ">
                <i data-lucide="monitor" style="width:32px;height:32px;color:#8FA8D6;opacity:.4"></i>
                <p style="font-size:.875rem;color:#8FA8D6;line-height:1.6;max-width:300px;margin:0">
                  Preview of <strong style="color:#D9E6FF">${p.title}</strong>
                </p>
                <div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center">
                  <button onclick="wpLoadPreview('${projectId}')" style="
                    display:inline-flex;align-items:center;gap:8px;
                    font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
                    padding:11px 24px;border-radius:999px;
                    background:#D4B15A;color:#071126;
                    border:none;cursor:pointer;transition:opacity .18s
                  " onmouseover="this.style.opacity='.8'" onmouseout="this.style.opacity='1'">
                    <i data-lucide="play" style="width:14px;height:14px"></i>
                    Load Preview
                  </button>
                  <a href="${p.live}" target="_blank" rel="noopener noreferrer" style="
                    display:inline-flex;align-items:center;gap:8px;
                    font-family:'Outfit',sans-serif;font-size:.85rem;font-weight:600;
                    padding:10px 22px;border-radius:999px;
                    background:transparent;color:#D9E6FF;text-decoration:none;
                    border:1px solid rgba(217,230,255,0.2);transition:border-color .18s,background .18s
                  " onmouseover="this.style.borderColor='rgba(217,230,255,0.4)';this.style.background='rgba(217,230,255,0.06)'"
                     onmouseout="this.style.borderColor='rgba(217,230,255,0.2)';this.style.background='transparent'">
                    <i data-lucide="external-link" style="width:14px;height:14px"></i>
                    Open Live Site
                  </a>
                </div>
              </div>
              <iframe
                id="wp-iframe-${projectId}"
                data-src="${p.live}"
                src=""
                title="${p.title} — live preview"
                style="width:100%;height:100%;border:none;display:block"
              ></iframe>
            </div>
          </div>
        </section>

      </div>
    </div>

    <!-- CTA -->
    <div style="
      background:linear-gradient(160deg,#071126 0%,#0B1E3A 60%,#071126 100%);
      padding:clamp(4rem,8vh,6rem) 24px;
      position:relative;overflow:hidden;margin-top:clamp(3rem,6vh,5rem)
    ">
      ${wpStars(35)}
      <div style="
        position:absolute;inset:0;pointer-events:none;
        background:radial-gradient(ellipse at 50% 50%,rgba(212,177,90,0.06),transparent 60%)
      "></div>
      <div style="max-width:520px;margin:0 auto;text-align:center;position:relative;z-index:1">
        <p style="font-family:'Outfit',sans-serif;font-size:.62rem;font-weight:600;
          letter-spacing:.22em;text-transform:uppercase;color:#D4B15A;margin-bottom:1rem">Work Together</p>
        <h2 style="
          font-family:'Cormorant Garamond',Georgia,serif;
          font-size:clamp(1.8rem,4.5vw,2.8rem);font-weight:400;font-style:italic;
          color:#D9E6FF;line-height:1.1;margin-bottom:1rem
        ">Want something like this built?</h2>
        <p style="font-family:'Outfit',sans-serif;font-size:.9rem;line-height:1.72;
          color:#8FA8D6;margin-bottom:2rem">
          CroissantsMoon builds premium digital presences — portfolios, institutional platforms, and dashboards — with the same level of craft you see here.
        </p>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center">
          <button onclick="goToPage('contact')" style="
            display:inline-flex;align-items:center;gap:8px;
            font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
            padding:13px 28px;border-radius:999px;
            background:#D4B15A;color:#071126;border:none;cursor:pointer;
            box-shadow:0 0 22px rgba(212,177,90,0.35);
            transition:opacity .18s,transform .18s
          " onmouseover="this.style.opacity='.86';this.style.transform='translateY(-2px)'"
             onmouseout="this.style.opacity='1';this.style.transform='translateY(0)'">
            Start a Project
            <i data-lucide="arrow-right" style="width:14px;height:14px"></i>
          </button>
          <button onclick="goToPage('croissantsmoon')" style="
            display:inline-flex;align-items:center;gap:8px;
            font-family:'Outfit',sans-serif;font-size:.875rem;font-weight:600;
            padding:12px 26px;border-radius:999px;
            background:transparent;color:#D9E6FF;border:1px solid rgba(217,230,255,0.2);
            cursor:pointer;transition:border-color .18s,background .18s
          " onmouseover="this.style.borderColor='rgba(217,230,255,0.4)';this.style.background='rgba(217,230,255,0.06)'"
             onmouseout="this.style.borderColor='rgba(217,230,255,0.2)';this.style.background='transparent'">
            <i data-lucide="arrow-left" style="width:14px;height:14px"></i>
            Back to CroissantsMoon
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── Live preview loader ───────────────────────────────────────────────────────
window.wpLoadPreview = function(projectId) {
  var placeholder = document.getElementById('wp-preview-placeholder-' + projectId);
  var iframe      = document.getElementById('wp-iframe-' + projectId);
  if (!iframe || !placeholder) return;
  iframe.src = iframe.dataset.src;
  iframe.onload = function() { placeholder.style.display = 'none'; };
};

// ── Initialise each page ─────────────────────────────────────────────────────
(function wpInit() {
  ['web-portfolio', 'web-pcu-global-intl', 'web-dashboard-partnership', 'web-dashboard-grants',
   'cm-portfolio-demo', 'cm-intl-office-demo', 'cm-partnership-demo', 'cm-grants-demo']
    .forEach(function(id) {
      var el = document.getElementById('page-' + id);
      if (!el) return;
      el.style.background = '#071126';
      el.innerHTML = wpBuildPage(id);
    });
})();

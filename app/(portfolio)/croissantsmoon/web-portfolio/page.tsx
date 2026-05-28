import WebProjectDetail, { WebProject } from '@/components/cm/WebProjectDetail'

const project: WebProject = {
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
    desc: "The frontend is intentionally framework-free. Every feature — routing, animations, admin mode, calendar, skill filters — is implemented in vanilla JavaScript. This was a deliberate choice: the project needed to demonstrate front-end engineering depth without leaning on a framework's abstractions.",
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
}

export default function WebPortfolioPage() {
  return <WebProjectDetail project={project} />
}

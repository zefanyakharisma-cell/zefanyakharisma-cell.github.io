# Portfolio Website — Zefanya Kharisma Nugroho

Personal portfolio website for Zefanya Kharisma Nugroho, International Education Professional & Creative Technologist based in Surabaya. Live at [zefanyakharisma.com](https://zefanyakharisma.com).

## Overview

The repository contains two coexisting portfolio implementations with distinct layouts, designs, and feature sets (not a migration):

- **Next.js app** (`app/`) — the current deployed version on Vercel; React 19, TypeScript, Server Components, Supabase SSR.
- **Vanilla JS portfolio** (`index.html`, `js/`, `css/`) — the original static build; HTML5, Tailwind CDN, hash-based SPA routing, Supabase JS client.

It also hosts **CroissantsMoon** (`/croissantsmoon`) — a full-stack agency OS built on a separate Next.js app, served at the same domain via Vercel rewrites.

### Portfolio sections

- **About** — overview, education, international exposure, professional values, expertise, experience, skillset
- **Projects** — AMERTA (Exchange Program), ACI (Cultural Immersion), AERO (Exhibition), PCU Global (Web Project)
- **Intl. Ed** — student onboarding & support, student engagement, partnership development, MoU/MoA coordination, international grants
- **Creative** — CroissantsMoon studio, writing, web development, graphic design
- **Contact** — contact information

The home page hosts a Skill Discovery entry point (filter work by skill) and a calendar widget showing published articles and upcoming events.

## CroissantsMoon

A boutique agency OS at `/croissantsmoon` with:

- **Dashboard** — activity feed and analytics
- **Leads / CRM** — track potential clients
- **Proposals** — create, manage, and publish client proposals
- **Token-gated portals** — shareable proposal links (`/croissantsmoon/proposal/[slug]`) secured by one-time access tokens, with `noindex` headers
- **Templates** — reusable proposal building blocks
- **Archive** — closed/won/lost proposals

CroissantsMoon lives in `croissantsmoon/` as a standalone Next.js app and is deployed to Vercel separately. See [croissantsmoon/DEPLOYMENT.md](croissantsmoon/DEPLOYMENT.md) for setup instructions.

## Tech Stack

### Next.js portfolio (current)

- [Next.js](https://nextjs.org/) 15 with App Router
- React 19, TypeScript
- [Tailwind CSS](https://tailwindcss.com/) v3.4
- [Framer Motion](https://www.framer.com/motion/) — page transitions and animations
- [Lucide React](https://lucide.dev/) — icons
- [Recharts](https://recharts.org/) — analytics charts (CroissantsMoon)
- [TanStack Query](https://tanstack.com/query) v5 — server state
- [Supabase](https://supabase.com/) (`@supabase/ssr`) — auth, Postgres, storage, RLS
- Google Fonts: Plus Jakarta Sans, DM Sans, Cormorant Garamond, Outfit
- Deployed on [Vercel](https://vercel.com/)

### Vanilla JS portfolio (legacy)

- HTML5, CSS3
- [Tailwind CSS](https://tailwindcss.com/) v3.4 (CDN)
- [Lucide Icons](https://lucide.dev/) v0.263 (CDN)
- [Quill](https://quilljs.com/) v2.0.2 (CDN) — WYSIWYG article editor
- [Supabase JS](https://supabase.com/docs/reference/javascript) — auth, Postgres, storage
- Vanilla JavaScript (no framework, no build step)

## Project Structure

```
├── app/                        # Next.js App Router (deployed)
│   ├── layout.tsx              # Root layout (fonts, metadata, JSON-LD)
│   ├── globals.css
│   ├── (portfolio)/            # Portfolio route group
│   │   ├── layout.tsx
│   │   ├── page.tsx            # Home
│   │   ├── about-overview/
│   │   ├── education/ … skillset/
│   │   ├── contact/
│   │   ├── writing/
│   │   └── … (all portfolio sections)
│   └── croissantsmoon/         # CroissantsMoon routes (proxied)
│       ├── (admin)/
│       │   ├── dashboard/
│       │   ├── leads/
│       │   ├── proposals/
│       │   ├── templates/
│       │   └── archive/
│       ├── proposal/           # Token-gated public portals
│       ├── login/
│       └── api/
├── components/                 # Shared React components
│   ├── about/                  # ExperienceTimeline, SkillEcosystem
│   ├── admin/
│   ├── cm/                     # CroissantsMoon UI
│   ├── home/
│   ├── layout/
│   ├── projects/
│   ├── proposal/
│   └── ui/                     # Badge, Button, Card, Input, Modal, EmptyState
├── lib/                        # Server utilities
│   ├── supabase/               # Supabase clients (browser, server, middleware)
│   ├── actions/                # Server Actions
│   ├── analytics/
│   ├── tokens/
│   └── utils.ts
├── types/                      # Shared TypeScript types
├── public/
│   └── assets/                 # Images, graphics, data files
│
│   ── Vanilla JS (legacy) ─────────────────────────────────────────────────
├── index.html                  # Entry point and nav
├── css/styles.css
├── js/
│   ├── main.js                 # Hash-based SPA routing
│   ├── auth.js
│   ├── supabase-client.js
│   ├── inline-edit.js
│   ├── components/
│   └── pages/                  # One module per section
│   ── Shared ────────────────────────────────────────────────────────────
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql   # Tables, RLS policies, storage bucket
├── croissantsmoon/             # Standalone CroissantsMoon Next.js app
│   ├── app/
│   ├── components/
│   ├── supabase/
│   └── DEPLOYMENT.md
├── next.config.ts
├── tailwind.config.ts
└── vercel.json
```

## Running Locally

### Next.js app

```bash
cp .env.example .env.local     # fill in Supabase credentials
npm install
npm run dev                    # http://localhost:3000
```

```bash
npm run build        # production build
npm run type-check   # TypeScript check
npm run lint
```

### Vanilla JS portfolio

No build step. Open `index.html` directly or serve with:

```bash
npx serve .
# or
python3 -m http.server 8080
```

To use admin features locally, configure Supabase — see [SETUP.md](SETUP.md).

## Admin Backend

Both implementations share the same Supabase project. The admin role is fully optional — the site renders read-only without it.

To enable writing:

1. Create a free Supabase project.
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL Editor.
3. For the vanilla JS app: copy `js/config.example.js` → `js/config.js` and fill in your project URL, anon key, and admin email.
4. For the Next.js app: set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`.

Admin capabilities:

- Write, edit, and publish articles via WYSIWYG editor (stored as Delta JSON + rendered HTML).
- Add, edit, and delete calendar events shown on the home and MoU/MoA pages.
- Inline-edit headings, paragraphs, and CTAs across the site.

Sign-in: footer **Admin** link or `Ctrl/Cmd + Shift + A`.

Full step-by-step instructions, RLS verification, and troubleshooting are in [SETUP.md](SETUP.md).

> `js/config.js` and `.env.local` are gitignored. The Supabase anon key is safe to ship in frontend code; the `service_role` key is not — never put it in client-side code.

## Architecture

### Routing (Next.js)

App Router with route groups. The `(portfolio)` group wraps all portfolio pages under a shared layout with nav and footer. The `croissantsmoon/(admin)` group wraps the agency OS behind auth middleware. Public proposal portals at `/croissantsmoon/proposal/[slug]` are token-gated and served with `noindex` headers.

### Routing (Vanilla JS)

Hash-based SPA. Every route is `#/<pageId>` (e.g. `#/about-overview`). `goToPage()` in `js/main.js` pushes to history and renders the matching `#page-<pageId>` element. Inactive pages use `display: none`.

### Inline editing (Vanilla JS)

`js/inline-edit.js` fetches `page_content` rows on load and applies stored content to every `[data-edit-key]` element. In admin mode, clicking any such element makes it `contenteditable`; blur upserts the change back to Supabase.

## Deployment

The site deploys to Vercel from the repo root (framework: Next.js). Push to `main` → Vercel builds and deploys automatically.

CroissantsMoon is deployed as a separate Vercel project from the `croissantsmoon/` subdirectory. See [croissantsmoon/DEPLOYMENT.md](croissantsmoon/DEPLOYMENT.md).

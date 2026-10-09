# zefanyakharisma.com

Portfolio of Zefanya Kharisma Nugroho, International Partnership Specialist at Petra Christian University, Surabaya.

A Next.js 15 site (App Router, React 19, TypeScript, Tailwind CSS 3), deployed on Vercel. Every portfolio page is static; only the Writing section reads from a database (Supabase), and the site still builds and runs without it.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit   # type-check
npm run build      # every route is prerendered as static HTML
```

`NEXT_PUBLIC_SITE_URL` is optional; it defaults to `https://zefanyakharisma.com` and is used for canonical URLs, the sitemap and structured data.

For the Writing section, put these in `.env.local` (and in Vercel → Settings → Environment Variables):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable/anon key>
```

Without them `/writing` shows an empty state and `/admin` explains what is missing.

## Where things live

| Path | What |
|---|---|
| `app/(portfolio)/*/page.tsx` | One folder per page. Copy is written directly in the page. |
| `lib/data/profile.ts` | Contact details and the headline numbers (students per semester, partners…) used across pages. |
| `lib/data/experience.ts` | Career history for the About page and `/experience`. |
| `lib/data/amerta.ts`, `aci.ts`, `aero.ts` | Program statistics, budgets, rundown. Text uses `**bold**` markers. |
| `lib/data/sim.ts` | Content for the SIM Kerjasama and SIM Realisasi pages. |
| `lib/data/discovery.ts` | Items and skill tags for the skill explorer. |
| `lib/data/countries.ts` | Country → ISO code, shown as chips (the site uses no emoji flags). |
| `lib/nav.ts` | Main navigation, the Intl. Ed sub-navigation, and the sitemap route list. Add new pages here. |
| `app/(portfolio)/writing/` | Public Writing pages: index, `[slug]` (English), `[slug]/id` (Indonesian), share images, RSS (`rss.xml`, `rss-id.xml`). |
| `app/admin/` | Writing admin: login, post list, editor, preview. Server actions in `actions.ts`. |
| `lib/writing/` | Streams, types and related pages (`config.ts`), public queries (`posts.ts`), editor schema and HTML generation. |
| `components/writing/` | Article, post card, index filters, “Writing about this”, and the admin editor (`admin/`). |
| `supabase/migrations/` | Database schema, row-level security and the image bucket for Writing. |
| `components/pcu/` | Design-system components: Button, Tag, Card, Shape, IconBadge, Stat, PageHero, charts (BarList, StackedBar, Donut), Timeline, SkillExplorer… |
| `components/projects/` | Page-specific interactive pieces: batch statistics, gallery, partner directory, student activities, AERO rundown. |
| `public/assets/images/` | Photos. `public/assets/data/` holds only `profile.pdf` (the CV); everything else there is gitignored. |

## Design system

The look comes from the **PCU Design System** (Brand Guideline Petra 2026, DRAFT 3), published as a Claude artifact, and the approved "Portfolio Redesign — PCU" mockup. The PETRA logo is intentionally never used.

- `app/styles/pcu.css` is the system's brand layer (`.pcu-*` classes and tokens), copied from its `components/bundle.css`.
- `app/fonts/` holds the self-hosted Inter variable font from the system.
- `app/globals.css` holds the page chrome from the mockup (header, sections, stats, photo cards, footer).
- `tailwind.config.ts` maps the tokens: `midnight`, `smoke`, `amber`, `teal`, `blue`, `cerise`, `emerald`, `ink-secondary`, `ink-muted`, `line`, radii `sm/md/panel/lg/pill`, `shadow-card`.

Section gradients: each part of the site has one of the system's four gradients, set by `data-theme` on the route (`themeFor()` in `lib/nav.ts`, applied by `components/pcu/ThemeScope.tsx`). Home, About, Writing and Contact use midnight; AMERTA, ACI, AERO and the projects overview use sunrise; the SIM pages use aqua; the International Education pages use dusk. The `--theme-*` variables in `app/styles/pcu.css` drive the page opening (`PageHero`), the closing band (`ThemeBand`), `Card tone="theme"`, icon badges, the header strip, stat rules, the current tab, glows and hover tints. White text fails on the light ends of sunrise and aqua, so sunrise surfaces stay midnight (the gradient goes on the half ring) and aqua and dusk surfaces carry a midnight scrim.

Rules worth keeping:

- Text on light backgrounds is midnight or black (secondary `#46505c`, muted `#5f6b78`); accents (amber, teal, blue, cerise) are for shapes and charts only.
- Charts use the validated series order in `lib/chart.ts` and always print their values as text.
- Focus is a 3px amber ring. No emoji.

## Images

- File names: lowercase, kebab-case, no spaces.
- Resize to at most 2000px on the long edge and keep files under ~500 KB.
- Render with `next/image` and a meaningful `alt`.
- Never put spreadsheets or other personal data in `public/`: everything there is downloadable by anyone.

## Writing

Essays, reflections, field notes and explainers in three streams (Global, People, Systems), each post in English and Bahasa Indonesia.

- **Write:** sign in at `/admin`, press “New post”. Drafts save themselves every few seconds. Each language has its own title, excerpt, body and a “ready” switch; a post can go live with one language ready and the other follows later.
- **Publish:** leave the date empty to publish now, or pick a future date to schedule it (it appears within about five minutes of that time). “Unpublish” takes it back to drafts.
- **Link to work:** “Related page” puts the post under “Writing about this” on that project or Intl. Ed page.
- **Images** are resized to 2000px WebP in the browser and stored in the `post-images` bucket.

Database (`supabase/migrations/`): `posts` (slug, streams, type, status, published_at, cover, related page, featured) and `post_translations` (one row per language with the editor JSON and the generated HTML). Row-level security lets anyone read only published posts whose date has passed and ready translations; only users listed in `admins` can write. To add the admin: create the user in Supabase → Authentication, then run `insert into public.admins (user_id) select id from auth.users where email = '<email>';`. Turn off public sign-ups in Supabase → Authentication.

A daily Vercel cron calls `/api/keepalive` so the free Supabase project is not paused for inactivity.

## Deployment

Push to the default branch and Vercel builds and deploys it. The Writing section needs the two Supabase environment variables above.

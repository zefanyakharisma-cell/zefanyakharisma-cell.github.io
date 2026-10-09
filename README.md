# zefanyakharisma.com

Portfolio of Zefanya Kharisma Nugroho, International Partnership Specialist at Petra Christian University, Surabaya.

A fully static Next.js 15 site (App Router, React 19, TypeScript, Tailwind CSS 3), deployed on Vercel. There is no database, no server code and no environment variable is required.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint       # ESLint (flat config, next/core-web-vitals + next/typescript)
npx tsc --noEmit   # type-check
npm run build      # every route is prerendered as static HTML
```

`NEXT_PUBLIC_SITE_URL` is optional; it defaults to `https://zefanyakharisma.com` and is used for canonical URLs, the sitemap and structured data.

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
| `components/pcu/` | Design-system components: Button, Tag, Card, Shape, IconBadge, Stat, PageHero, charts (BarList, StackedBar, Donut), Timeline, SkillExplorer… |
| `components/projects/` | Page-specific interactive pieces: batch statistics, gallery, partner directory, student activities, AERO rundown. |
| `public/assets/images/` | Photos. `public/assets/data/` holds only `profile.pdf` (the CV); everything else there is gitignored. |

## Design system

The look comes from the **PCU Design System** (Brand Guideline Petra 2026, DRAFT 3), published as a Claude artifact, and the approved "Portfolio Redesign — PCU" mockup. The PETRA logo is intentionally never used.

- `app/styles/pcu.css` is the system's brand layer (`.pcu-*` classes and tokens), copied from its `components/bundle.css`.
- `app/fonts/` holds the self-hosted Inter variable font from the system.
- `app/globals.css` holds the page chrome from the mockup (header, sections, stats, photo cards, footer).
- `tailwind.config.ts` maps the tokens: `midnight`, `smoke`, `amber`, `teal`, `blue`, `cerise`, `emerald`, `ink-secondary`, `ink-muted`, `line`, radii `sm/md/panel/lg/pill`, `shadow-card`.

Section gradients: each part of the site has one of the system's four gradients, set by `data-theme` on the route (`themeFor()` in `lib/nav.ts`, applied by `components/pcu/ThemeScope.tsx`). Home, About and Contact use midnight; AMERTA, ACI, AERO and the projects overview use sunrise; the SIM pages use aqua; the International Education pages use dusk. The `--theme-*` variables in `app/styles/pcu.css` drive the page opening (`PageHero`), the closing band (`ThemeBand`), `Card tone="theme"`, icon badges, the header strip, stat rules, the current tab, glows and hover tints. White text fails on the light ends of sunrise and aqua, so sunrise surfaces stay midnight (the gradient goes on the half ring) and aqua and dusk surfaces carry a midnight scrim.

Rules worth keeping:

- Text on light backgrounds is midnight or black (secondary `#46505c`, muted `#5f6b78`); accents (amber, teal, blue, cerise) are for shapes and charts only.
- Charts use the validated series order in `lib/chart.ts` and always print their values as text.
- Focus is a 3px amber ring. No emoji.

## Images

- File names: lowercase, kebab-case, no spaces.
- Resize to at most 2000px on the long edge and keep files under ~500 KB.
- Render with `next/image` and a meaningful `alt`.
- Never put spreadsheets or other personal data in `public/`: everything there is downloadable by anyone.

## Deployment

Push to the default branch and Vercel builds and deploys it. No environment variables are needed.

# Plan: pages that don't load on first visit, blank gaps, and mobile layout

Repo: `zefanyakharisma-cell.github.io`. Branch: `claude/nifty-allen-x8h7nx`. Live on Vercel project `website-portfolio`. The `zefanyakharisma-cell-github-io` project fails every build, but it isn't the live site.

## Context
The user reports this on every device. On a first visit, the page's components and animations don't appear: the "Loading page" screen stays up, and there are blank gaps and hero problems. A refresh fixes it. The user also wants the layout fixed, especially on mobile.

I reproduced this on a local production build (`next build` + `next start`, headless Chromium, cold cache, throttled network). These are the causes I found:

1. **Every portfolio page's HTML starts with the loader, not the content.** `app/(portfolio)/loading.tsx` wraps every page in a Suspense boundary. Even fully static pages are therefore served as: loader → `<div hidden id="S:0">` holding the real page → an inline `$RC` script that swaps it in. The swap can only happen once the hidden chunk has fully arrived, so on a slow first visit the loader stays up. With JavaScript off, the page shows only the loader, which also hurts SEO. On a refresh the connection and assets are warm, so the swap happens almost at once.
2. **The pages are very large, which makes (1) slow.** The HTML for `/` is 673 KB, `/partnerships` 524 KB and `/amerta` 463 KB. Other pages are 20–140 KB. The world map's base land outline (`WorldMapData.base` / `BubbleMapData.base` in `lib/geo.ts`, about 200 KB per map) is passed as a prop to the client components `WorldMap` and `BubbleMap`. It therefore appears twice: once in the SVG markup and once in the RSC/hydration payload. The homepage draws two maps. On a client-side navigation, that same payload has to download while the loader shows.
3. **Blank gaps near the bottom of the screen.** In `components/pcu/MotionObserver.tsx`, `prepare()` treats an element as already on screen only if its top is above 92% of the viewport height. Otherwise it hides the element (`.rv` → opacity 0) and waits for the IntersectionObserver, which uses `threshold: 0.12` and `rootMargin -8%` at the bottom. An element that starts in the bottom 8% of the screen stays invisible until you scroll. This was reproduced at 390px width: `DIV.stat` on `/projects-overview` and `DIV.section-head` on `/writing` were still invisible after 9 s.
4. **Mobile header takes two rows.** At 375px the nav wraps ("Contact" drops to a second line), so the sticky header is about 140px tall, which is about 18% of the screen. This happens because both `.site-header .wrap` and `.site-nav` have `flex-wrap: wrap` (`app/globals.css:28-32`). There is no horizontal overflow on any page at 375px (checked across all 16 portfolio routes).

## Changes

### 1. Serve real content first (main fix)
- Delete `app/(portfolio)/loading.tsx`. Every portfolio route is static or ISR, so there is nothing for it to wait on.
  - Feedback during navigation is already handled by `components/pcu/RouteProgress.tsx`, the top progress bar. The previous page stays visible until the next one is ready, instead of flashing the loader.
  - `template.tsx` keeps the `.page-enter` fade.
- Check whether `components/pcu/Loader.tsx` is still used anywhere else (e.g. admin). Remove it only if nothing else uses it.
- Keep `app/admin` loading behaviour as it is.

### 2. Stop inlining the base map twice
- Add a static route that serves each base outline as a cached SVG file, reusing the existing geometry in `lib/geo.ts`.
  - Example: `app/maps/[name]/route.ts` with `dynamic = 'force-static'` and `generateStaticParams` for `world` and `indonesia`.
  - Export the base-path builders from `lib/geo.ts`: the `BASE` constant, and the Indonesia base built inside `buildIndonesiaMap`.
- In `components/viz/WorldMap.tsx:50` and `components/viz/BubbleMap.tsx:30`, replace `<path d={map.base} …/>` with `<image href="/maps/<name>.svg" width={map.width} height={map.height} />`. Fill and stroke move into the SVG file.
- Replace `base: string` in `WorldMapData` and `BubbleMapData` with a short map key or URL.
  - Update the builders and the callers: `app/(portfolio)/page.tsx`, `amerta`, `partnerships`, `aci`, `onboarding`, and `components/projects/PartnerExplorer.tsx` / `MapSwitch.tsx`.
- Country shapes that carry data (`countries[].d`) stay inline, since they are interactive. There are only a few of them.
- **Target:** `/` under about 150 KB of HTML. Check the remaining weight once the maps are moved, and only tackle it if something else is still large.

### 3. Fix the reveal gaps
In `MotionObserver.tsx`:
- In `prepare()`, treat anything whose top is above the bottom of the viewport (`< window.innerHeight`) as already shown. Nothing that is painted on screen is ever hidden.
- Change the IntersectionObserver to `threshold: 0` with a small bottom `rootMargin`, so tall elements and elements at the edge fade in as soon as they appear.

### 4. Mobile header on one row
In `app/globals.css` (header block, lines 27–34), below about 640px:
- Put the wordmark on its own line and the nav on one row: `flex-wrap: nowrap`, smaller link padding (`0 10px`) and gap. The five links fit in 375px.
- Add `overflow-x: auto` (scrollbar hidden) as a fallback for screens under 360px.
- Keep 44px tap targets.

The header's height is already written to `--header-h` (`components/pcu/Header.tsx`), so sticky tab bars adjust automatically.

### 5. Re-check the layouts after 1–4
- Take screenshots of every portfolio route at 375, 768 and 1280px.
- Fix only the hero and spacing problems those screenshots actually show. I'll list them in the PR, not guess them now.

## Verification
- `npm run lint`, `npm run type-check` and `npm run build` all pass, and the routes stay `○`/`●` (static) in the build output.
- `curl` each route on `next start`:
  - There is no `Loading page`, no `hidden id="S:` and no `$RC` in the HTML.
  - With JavaScript disabled, the full content shows.
  - Record HTML sizes before and after (before: `/` 673 KB, `/partnerships` 524 KB, `/amerta` 463 KB).
- Headless Chromium probe on a cold, throttled first visit at 390px and 1280px, on `/`, `/about-overview`, `/amerta`, `/partnerships`, `/projects-overview` and `/writing`:
  - Content is visible without a loader.
  - No on-screen element stays at opacity 0 after 3 s.
  - Hero images fade in.
  - Repeat on client-side navigation through the header links, and on a reload.
- Maps: the base outline loads from `/maps/*.svg` (a single cached request shared across pages). Tooltips, selection and the country highlight still work on `/` and `/partnerships`.
- At 375px the header is a single row of nav under the wordmark, there is no horizontal scroll, and the sticky tab bars sit right under the header.
- After merge, confirm the `website-portfolio` production deployment is READY and spot-check the live pages.

## Result (implemented)
- **Loader removed:** `app/(portfolio)/loading.tsx` and the now-unused `Loader` component and its CSS are gone. Static HTML now contains the page itself: no loader, no hidden `S:0` chunk, no `$RC` swap. Pages render with JavaScript off.
- **Map outlines served as files:** `/maps/world.svg`, `/maps/indonesia.svg` and `/maps/east-central-java.svg` (`app/maps/[file]/route.ts`, prerendered). The map components draw them with `<image>`. `buildIndonesiaMap` now takes a named frame instead of bounds. Map coordinates are rounded to one decimal place.
- **HTML size before → after (raw / gzip after):**

  | Page | Before | After |
  |---|---|---|
  | `/` | 673 KB | 193 KB / 46 KB |
  | `/onboarding` | 643 KB | 185 KB |
  | `/partnerships` | 524 KB | 191 KB |
  | `/aci` | 490 KB | 174 KB |
  | `/amerta` | 463 KB | 153 KB |

  The remaining weight on `/` is the interactive country shapes and the page's own content.
- **Reveal gaps:** anything already on screen, even partly, is never hidden, and the observer reveals at the first visible pixel. No element stays invisible after hydration (at 390px, cold and throttled).
- **Mobile header:** one row of nav under the wordmark. The header is 92px at 375px, down from about 140px. On screens under 360px the nav scrolls sideways.
- **Verified** on a production build with headless Chromium:
  - Cold, throttled first visits at 390px. The homepage hydrates in about 3.3 s, down from 6.3 s.
  - Client-side navigation and reload.
  - JavaScript off.
  - Maps on `/`, `/partnerships` and `/aci`.
  - Full-page screenshots of every route at 375px: no horizontal overflow and no other layout issues found.
  - Lint, tsc and build are clean.

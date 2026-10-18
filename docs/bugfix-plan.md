# Implementation Plan: Website bug fixes (October 2026 audit)

## Overview
Four ECC (Everything Claude Code) reviewers went through the site: `security-reviewer`, `database-reviewer`, `react-reviewer`, `typescript-reviewer` and `silent-failure-hunter`. ECC's `planner` format was used for this plan.

- **Baseline:** `npm run lint`, `tsc --noEmit` and `npm run build` are all clean, so every bug below is a runtime or logic bug.
- **Security:** no critical issues. Admin sign-in, the database's row-level security (RLS) rules and the image storage rules hold up.
- **Verification:**
  - Items marked ✅ were confirmed by reading the code and/or running it (scripts, or a headless browser against `next start`).
  - Items marked 🔶 were confirmed in the code and build output but not yet observed on Vercel.

## Requirements
- Fix what visitors and the admin actually hit, most damaging first.
- Keep the README guarantee: the site builds and runs with no Supabase environment variables.
- Each phase can ship as its own PR and is checked with lint, tsc and build, plus the specific check listed.

## Architecture changes
- `lib/writing/posts.ts`: tell "database error" apart from "not found".
- `lib/writing/content.ts`: replace chart slots by index, not by position.
- `components/og/OgCard.tsx`, `next.config.ts`: include the share-card font files in the serverless bundle.
- `components/writing/admin/PostEditor.tsx`: track a revision number and save one request at a time.
- A new CSS variable `--header-h`, set from the measured header height, replaces the hard-coded `72px`/`138px` offsets.

---

## Phase 1: Visible breakage (high)

1. **Post share images fail for posts with a cover** ✅
   - **Where:** `components/writing/postOgImage.tsx`, `components/writing/admin/uploadImage.ts:18`
   - **Problem:** covers are uploaded as WebP. Satori, the share-image renderer, can't decode WebP, so it throws and `/writing/<slug>/opengraph-image` returns 500.
   - **Action:**
     - Request covers through Supabase's image render endpoint as PNG/JPEG, or fetch the cover and convert it.
     - Wrap the render so that on any error it falls back to the text-only card.
   - **Risk:** Low.

2. **Post share images likely can't find their fonts on Vercel** 🔶
   - **Where:** `components/og/OgCard.tsx:28`, `next.config.ts`
   - **Problem:** the build's file-trace list for this route has no `app/fonts/og/*.ttf`, so `readFile` should fail at runtime.
   - **Action:** add `outputFileTracingIncludes: { '/writing/**': ['./app/fonts/og/**'] }`, or load the fonts with `new URL(..., import.meta.url)`.
   - **Check:** the `.nft.json` lists the fonts; after deploying, open a post's `/opengraph-image` on the preview URL.
   - **Risk:** Low.

3. **A `>` in a chart title or caption drops that chart and shifts every later one** ✅
   - **Where:** `lib/writing/content.ts:63-68`
   - **Action:**
     - Write the chart index into the slot (`data-chart-slot="3"`) when the chart node is output.
     - Match `/<div data-chart-slot="(\d+)"[^>]*?><\/div>/` and look the chart up by that index.
     - Re-save any published post that has charts so its stored HTML is rebuilt.
   - **Check:** a doc with two charts where chart 1 is titled `A > B` renders both, in order.
   - **Risk:** Medium, because stored post HTML has to be regenerated.

4. **Editor drops text typed while a save is in progress** ✅
   - **Where:** `components/writing/admin/PostEditor.tsx:42-60`
   - **Action:**
     - Add a `rev` ref that every edit increments. Clear `dirty` only if `rev` hasn't changed since the snapshot was sent.
     - Allow one save at a time; if a save is requested while one is running, run it once afterwards.
     - Wrap `persist` in try/catch so a thrown error shows a message.
   - **Check:** type during a throttled-network autosave. "Unsaved changes" stays on and a second save goes out.
   - **Risk:** Low.

## Phase 2: Silent failures in the Writing backend (medium)

5. **A database outage overwrites cached posts with 404s and empties the sitemap and RSS** ✅
   - **Where:** `lib/writing/posts.ts:47,65`, `app/sitemap.ts`, `lib/writing/rss.ts`, `[slug]/shared.tsx:71`
   - **Action:**
     - `getPost` re-throws database errors and keeps `null` only for "no row".
     - The sitemap and RSS throw when the database fails, and return empty only when Supabase is not configured. A failed revalidation then keeps the last good cached version.
   - **Risk:** Medium. Confirm the writing index still shows its "can't reach the database" message.

6. **`deletePost` ignores every error and deletes images before the post** ✅
   - **Where:** `app/admin/actions.ts:117-124`
   - **Action:**
     - Delete the post row first and check its error.
     - Then delete images, paging through the list (`{ limit: 100, offset }`), and log failures.

7. **`savePost` swallows two write errors and doesn't validate its input**
   - **Where:** `app/admin/actions.ts:54,70,105`
   - **Problem:** a failed un-feature leaves two posts featured, and the admin still sees "Saved".
   - **Action:**
     - Check both errors.
     - Validate the parsed JSON's shape and return `{ ok:false }` instead of throwing.

8. **`createPost` can leave a post without translations**
   - **Where:** `app/admin/actions.ts:29-32`
   - **Action:** delete the post row if inserting its translations fails.

9. **`requireAdmin` reports an outage as "not an admin"**
   - **Where:** `lib/supabase/server.ts:36`
   - **Action:** check the RPC error and show a separate "database unavailable" message.

10. **Every draft autosave clears the whole `/writing` cache**
    - **Where:** `app/admin/actions.ts:108`
    - **Action:** revalidate only if the post was or is published, or its slug, featured flag or related page changed.

## Phase 3: Front-end and mobile UX (medium/low)

11. **Sticky tab bars slide under the header on phones** ✅
    - **Problem:** the header measures 144px at 375px wide, but the offsets assume 72px.
    - **Where:** `Tabs.tsx:11`, `PovSwitch.tsx:36`, `SimDev.tsx:10`, `sim-kerjasama/page.tsx:137`, `sim-realisasi/page.tsx:193`
    - **Action:** a small ResizeObserver in `Header` writes `--header-h`; use `top: var(--header-h)` and `scroll-margin-top` everywhere. An alternative is a single-row mobile header (scrolling nav).
    - **Check:** in the browser at 375px, scroll About and SIM; the tab bars stay visible below the header.

12. **The route progress bar never shows for `<Link>` clicks** ✅
    - **Where:** `components/pcu/RouteProgress.tsx:15,22`
    - **Problem:** Next's `Link` has already called `preventDefault()` when this listener runs.
    - **Action:** listen with `{ capture: true }` and drop the `defaultPrevented` check (keep the modifier-key, target and same-path checks).
    - **Check:** in the browser, the bar turns on when a header link is clicked.

13. **Chart tooltips are offset after a chart is scrolled sideways, and spill off-screen at the edges**
    - **Where:** `components/viz/useTooltip.tsx`, `Sankey.tsx:34`, `HeatGrid.tsx:27`
    - **Action:** add `scrollLeft`/`scrollTop` to the position, and keep the tooltip inside the container width.

14. **The data diagram keeps an old highlight after "Next step"**
    - **Where:** `ProcessToData.tsx:71`
    - **Action:** `<Erd key={active} …>`.

15. **Partner directory: search overrides the map filter while the chip still shows it**
    - **Where:** `PartnerDirectory.tsx:35-38`
    - **Action:** apply both filters together, or clear the search when a country is picked on the map.

16. **`?tab=` / `?pov=` links show the default tab first, then jump**
    - **Where:** `Tabs.tsx:14`, `PovSwitch.tsx:16`
    - **Action:** read `useSearchParams()` for the starting state, inside a Suspense boundary.

17. **Tab accessibility: editor language tabs and partner directory tabs**
    - **Where:** `PostEditor.tsx:88-97`, `PartnerDirectory.tsx:54-78`
    - **Action:** reuse the keyboard and ARIA pattern from `Tabs.tsx`.

## Phase 4: Data and hardening (low)

18. **Student numbers disagree between pages**
    - **Where:** `lib/data/students.ts:12-18` and `lib/data/aci.ts:82`
    - **Problem:**
      - `students.ts` says 193 AMERTA students, 15 countries, Malaysia 87, Philippines 49.
      - The AMERTA batch data says 207 students, 14 countries, Malaysia 114, Philippines 29.
      - The ACI gender total M53/F79 doesn't match the per-batch sum, M55/F99.
    - **Action:** calculate these totals from the batch data. **You need to confirm which figures are correct.**
19. **Link check accepts `/\evil.com`**
    - **Where:** `lib/writing/content.ts:8`
    - **Action:** change the regex to `\/(?![\/\\])`.
20. **Trailing slash in `NEXT_PUBLIC_SITE_URL` gives `//` in URLs**
    - **Where:** `lib/seo.ts:3`
    - **Action:** strip trailing slashes.
21. **`/api/keepalive` is open to anyone**
    - **Action:** require `Authorization: Bearer $CRON_SECRET`; Vercel cron sends it automatically.

---

## Testing strategy
- The repo has no test runner. Per phase, run `npm run lint`, `npx tsc --noEmit` and `npm run build`, plus:
  - **Phase 1:** a script that runs `docToHtml` on documents with `>` in chart attributes; a local share-image render with a WebP cover; a check of the font entries in the build's trace file.
  - **Phase 2:** point `NEXT_PUBLIC_SUPABASE_URL` at an unreachable host and confirm post pages stay cached rather than turning into 404s.
  - **Phase 3:** headless-browser checks at 375px and 1280px: sticky offsets, the progress bar, tooltip position after scrolling.
- Consider adding Vitest for `lib/writing/content.ts` (`docToHtml`, `safeHref`), the logic most worth keeping under test.

## Risks and mitigations
- **Regenerating stored HTML (item 3):** do it from the admin by re-saving the affected posts. List posts whose `body_html` contains `data-chart` first.
- **Throwing during ISR (item 5):** pages built at deploy time with no database must still build. Throw only when Supabase is configured.
- **Header height variable (item 11):** set a sensible fallback (`--header-h: 72px`) so there's no layout jump before the script runs.

## Success criteria
- [ ] Share images render for posts with and without covers on a Vercel preview
- [ ] Charts with `>` in their title render correctly and in order
- [ ] No text lost when typing during an autosave
- [ ] A Supabase outage never turns a live post into a 404 or empties the sitemap/RSS
- [ ] Admin actions report failures instead of "Saved" or a silent redirect
- [ ] Tab bars visible below the header at 375px; progress bar shows on link clicks
- [ ] Lint, tsc and build clean on every PR

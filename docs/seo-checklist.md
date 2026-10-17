# SEO checklist: the steps only the site owner can take

These tasks happen outside the codebase. The site already outputs a sitemap, canonical URLs, structured data (Person, ProfilePage, WebSite, BlogPosting, breadcrumbs) and verification meta tags. Each of those needs an account or a setting that only you can reach.

Canonical host: **https://zefanyakharisma.com** (apex, no www).

---

## 1. Google Search Console (week 1)

Choose **one** way to verify:

- [ ] **Option A: Domain property (recommended, covers www and every subdomain)**
  1. Go to https://search.google.com/search-console, then Add property, then **Domain**, and enter `zefanyakharisma.com`.
  2. Copy the `google-site-verification=...` TXT record.
  3. Add it at your DNS provider (or in Vercel, under Domains, then `zefanyakharisma.com`, then DNS Records, if Vercel manages DNS): type `TXT`, name `@`, value as copied.
  4. Wait a few minutes, then press **Verify**.
- [ ] **Option B: URL-prefix property with the HTML tag**
  1. Add property, then **URL prefix**, then `https://zefanyakharisma.com/`, then choose **HTML tag**.
  2. Copy only the `content` value from `<meta name="google-site-verification" content="XXXX">`.
  3. In Vercel, open the project, then Settings, then Environment Variables, and add `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = `XXXX` (Production, plus Preview if you like).
  4. Go to Deployments, then the latest production deployment, then **Redeploy**. `NEXT_PUBLIC_*` values are baked in at build time, so a redeploy is required.
  5. Check the page source of the home page for the meta tag, then press **Verify**.

Then:

- [ ] Sitemaps, then submit `https://zefanyakharisma.com/sitemap.xml`. Status should read "Success".
- [ ] URL Inspection, then **Request indexing**, one at a time:
  - [ ] `https://zefanyakharisma.com/`
  - [ ] `https://zefanyakharisma.com/about-overview`
  - [ ] `https://zefanyakharisma.com/sim-kerjasama`
  - [ ] `https://zefanyakharisma.com/sim-realisasi`
  - [ ] `https://zefanyakharisma.com/signing`
  - [ ] `https://zefanyakharisma.com/amerta`
  - [ ] `https://zefanyakharisma.com/partnerships`
  - [ ] `https://zefanyakharisma.com/writing`
- [ ] Settings, then Users and permissions: add a second owner email as a backup (optional).

## 2. Bing Webmaster Tools (week 1, about 10 minutes)

Also feeds DuckDuckGo, Ecosia and Copilot results.

- [ ] **Fastest:** go to https://www.bing.com/webmasters, then **Import from Google Search Console**. This imports the verified site and its sitemap. Done.
- [ ] **Or** add the site manually, choose the **HTML meta tag** method, copy the `content` value of `<meta name="msvalidate.01" ...>`, add it in Vercel as `NEXT_PUBLIC_BING_SITE_VERIFICATION`, redeploy, then press Verify.
- [ ] Sitemaps, then submit `https://zefanyakharisma.com/sitemap.xml`.
- [ ] URL Submission: submit the home page and `/about-overview`.

## 3. Vercel domain and performance settings (week 1)

- [ ] Project, then Settings, then **Domains**: both `zefanyakharisma.com` and `www.zefanyakharisma.com` are listed.
  - [ ] `zefanyakharisma.com` is the primary (production) domain.
  - [ ] `www.zefanyakharisma.com` is set to **Redirect to** `zefanyakharisma.com` with **308 Permanent Redirect**.
- [ ] Test it: `curl -sI https://www.zefanyakharisma.com/about-overview` should return `308` with `location: https://zefanyakharisma.com/about-overview`.
- [ ] Test `http://zefanyakharisma.com`: it should redirect to `https://`.
- [ ] Old `*.vercel.app` and `zefanyakharisma-cell.github.io` URLs: confirm they redirect or show the canonical tag pointing at the apex. [CONFIRM: whether the GitHub Pages site is still published; if so, unpublish it or redirect it]
- [ ] Project, then **Speed Insights**, then **Enable**. The component is already in the code, so data appears after the next deployment and some real visits.
- [ ] (Optional) Project, then **Analytics**, then Enable, for page views without cookies.

## 4. Entity and backlinks: one consistent name everywhere

Use exactly **Zefanya Kharisma Nugroho** on every profile. Use the same headline wording as the site, for example "International Partnership Specialist, Petra Christian University (PETRA)".

- [ ] **LinkedIn** (`linkedin.com/in/zefanyakharisma`)
  - [ ] Contact info, then Website: add `https://zefanyakharisma.com` (type: Portfolio).
  - [ ] **Featured** section: add the home page, the SIM Kerjasama case study and, once published, the first Writing post.
  - [ ] Headline and About match the site's role and wording.
  - [ ] Experience entries (PETRA, Airlangga Global Engagement / UNAIR) match the dates on the Experience tab of `/about-overview`.
  - [ ] Share each new Writing post with a one-paragraph summary and the link.
- [ ] **PETRA:** ask the International Office or web team for a staff or unit page listing your name and role, with a link to the site if policy allows.
- [ ] **UNAIR / Airlangga Global Engagement:** ask whether an alumni, staff-story or news page (for example AMERTA or AERO coverage) can mention you by full name and link to the site.
- [ ] **Google Scholar profile** (https://scholar.google.com/citations): create it with your full name and a verified institutional email, then add the three publications listed on `/about-overview`:
  - [ ] *Kebijakan Luar Negeri Pro-Israel Amerika Serikat di Pemerintahan Obama*
  - [ ] *Menelaah Interdependensi Korea Selatan-Tiongkok Akibat THAAD dalam Analisis Neoliberalisme*
  - [ ] *Israel dan Perjanjian Abraham: Upaya Peningkatan Status Israel dalam Sistem Internasional*
  - [ ] Set the profile to public and add the homepage URL.
- [ ] **ORCID** (https://orcid.org/register): register, add the same three works, employment (PETRA, UNAIR) and the website URL under "Websites & social links".
- [ ] **Conference and speaker bios** (for example the ICoCSPA paper, AERO, partner events): use the same name and headline, and include the site URL.
- [ ] Once Scholar and ORCID exist, send the two URLs to whoever maintains the code, or add them yourself to `contact` in `lib/data/profile.ts` and to the Person `sameAs` list in `app/layout.tsx` (currently `[contact.linkedin]`). Redeploy.

## 5. Publishing the Writing drafts

Drafts are in `docs/writing-drafts/` (six posts, English and Indonesian).

- [ ] First resolve every `[CONFIRM: ...]` placeholder in a draft, or delete the sentence.
- [ ] Publish through `/admin`, then **New post**, **one post every 1–2 weeks**. Suggested order: 01 signing, 06 partner guide, 02 SIM Kerjasama, 03 SIM Realisasi, 05 AMERTA, 04 student support.
- [ ] For each post, fill in from the draft's header:
  - [ ] URL slug (set it before publishing; avoid changing it afterwards)
  - [ ] Streams and Type
  - [ ] **Related page** (puts the post under "Writing about this" on that page)
  - [ ] **Cover image**: upload the suggested file and write the alt text
  - [ ] Featured, for posts 01, 05 and 06
- [ ] Paste **both languages**: title, excerpt and body. Keep the H2 and H3 headings, since they build the table of contents.
- [ ] Turn on "ready" for both languages, preview each, then Publish (or set a date to schedule).
- [ ] After publishing, open the live post, check that the internal links work, then share it on LinkedIn.
- [ ] Optionally submit the new post URL in GSC URL Inspection, then Request indexing.

## 6. Measurement cadence

**4–6 weeks after verification, then monthly:**

- [ ] GSC, then **Performance**, then Search results, last 28 days, **Queries** tab, with Impressions and CTR switched on.
  - [ ] Sort by Impressions. For queries with high impressions and low CTR (for example under 2%) where you rank on page 1 or 2, rewrite that page's or post's title and excerpt to match the query wording. For Writing posts, edit the title and excerpt in `/admin`. For portfolio pages, ask for the `title` and `description` in `pageMeta` to be changed.
  - [ ] Check the **Pages** tab for pages with zero impressions, and request indexing again.
  - [ ] Filter by Country = Indonesia to see how the Indonesian posts perform.
- [ ] GSC, then **Core Web Vitals** (mobile and desktop): all URLs "Good". Investigate any "Needs improvement" group. Cross-check in Vercel Speed Insights.
- [ ] GSC, then **Pages** (indexing): review "Crawled, currently not indexed" and "Duplicate without user-selected canonical".
- [ ] **Rich Results Test** (https://search.google.com/test/rich-results), one URL at a time, with no errors expected:
  - [ ] Home `https://zefanyakharisma.com/` (Person / WebSite)
  - [ ] `https://zefanyakharisma.com/about-overview` (Person / ProfilePage)
  - [ ] One Writing post, for example `https://zefanyakharisma.com/writing/mou-moa-signing-workflow` (BlogPosting)
  - [ ] One sub-page, for example `https://zefanyakharisma.com/sim-kerjasama` (BreadcrumbList)
- [ ] Bing Webmaster Tools, then Search Performance: a quick check of the same queries.

## 7. Optional follow-up

- [ ] Indonesian versions of `/signing`, `/mou`, `/sim-kerjasama` and `/sim-realisasi`, targeting "alur penandatanganan MoU", "sistem informasi kerjasama perguruan tinggi" and "laporan realisasi kerjasama". This needs code work (an `/id` route with `hreflang` links), so raise it as a task.
- [ ] Once Scholar and ORCID are live, add them to the site footer or contact page as well as to `sameAs`.

import { intlNav, mainNav, sectionFor } from '@/lib/nav'

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'

export const PERSON_ID = `${SITE_URL}/#person`
export const WEBSITE_ID = `${SITE_URL}/#website`

/** Absolute URL for a site path ('/' → SITE_URL). */
export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//.test(path)) return path
  return path === '/' ? SITE_URL : `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`
}

/** Page names for breadcrumbs, where the nav has none (or a short one). */
const pageTitles: Record<string, string> = {
  '/amerta': 'AMERTA',
  '/aci': 'ACI',
  '/aero': 'AERO',
  '/sim-kerjasama': 'SIM Kerjasama',
  '/sim-realisasi': 'SIM Realisasi',
}

export function pageLabel(path: string): string {
  return pageTitles[path] ?? intlNav.find(item => item.href === path)?.label ?? mainNav.find(item => item.href === path)?.label ?? path
}

/** Home → section overview → page, skipping the page when it is the overview. */
export function breadcrumbTrail(path: string, title?: string): { name: string; url: string }[] {
  const trail = [{ name: 'Home', url: absoluteUrl('/') }]
  if (path === '/') return trail
  const section = sectionFor(path)
  const overview = mainNav.find(item => item.section === section)
  if (overview) trail.push({ name: overview.label, url: absoluteUrl(overview.href) })
  if (!overview || overview.href !== path) trail.push({ name: title ?? pageLabel(path), url: absoluteUrl(path) })
  return trail
}

export function breadcrumbList(path: string, title?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbTrail(path, title).map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  }
}

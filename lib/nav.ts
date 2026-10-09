export type Section = 'about' | 'projects' | 'intl' | 'writing' | 'contact'

export const mainNav: { href: string; label: string; section: Section }[] = [
  { href: '/about-overview', label: 'About', section: 'about' },
  { href: '/projects-overview', label: 'Projects', section: 'projects' },
  { href: '/engagement', label: 'Intl. Ed', section: 'intl' },
  { href: '/writing', label: 'Writing', section: 'writing' },
  { href: '/contact', label: 'Contact', section: 'contact' },
]

const sectionByRoute: Record<string, Section> = {
  '/about-overview': 'about',
  '/projects-overview': 'projects',
  '/amerta': 'projects',
  '/aci': 'projects',
  '/aero': 'projects',
  '/sim-kerjasama': 'projects',
  '/sim-realisasi': 'projects',
  '/engagement': 'intl',
  '/onboarding': 'intl',
  '/partnerships': 'intl',
  '/strategic-meetings': 'intl',
  '/signing': 'intl',
  '/mou': 'intl',
  '/university-support': 'intl',
  '/intl-grants': 'intl',
  '/writing': 'writing',
  '/contact': 'contact',
}

export function sectionFor(pathname: string): Section | null {
  if (pathname.startsWith('/writing/')) return 'writing'
  return sectionByRoute[pathname] ?? null
}

/** Brand gradient per part of the site (PCU Design System: midnight for brand
 *  surfaces, sunrise for campaigns and events, aqua for tech, dusk for Intl. Ed). */
export type Theme = 'midnight' | 'sunrise' | 'aqua' | 'dusk'

const themeBySection: Record<Section, Theme> = { about: 'midnight', projects: 'sunrise', intl: 'dusk', writing: 'midnight', contact: 'midnight' }

export function themeFor(pathname: string): Theme {
  if (pathname.startsWith('/sim-')) return 'aqua'
  const section = sectionFor(pathname)
  return section ? themeBySection[section] : 'midnight'
}

export function sectionLabel(pathname: string): string {
  if (pathname === '/') return 'Home'
  const section = sectionFor(pathname)
  return mainNav.find(item => item.section === section)?.label ?? 'ZKN'
}

export const intlNav = [
  { href: '/engagement', label: 'Overview' },
  { href: '/onboarding', label: 'Student Support' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/strategic-meetings', label: 'Meetings' },
  { href: '/signing', label: 'Signing' },
  { href: '/mou', label: 'MoU / MoA' },
  { href: '/university-support', label: 'Univ. Support' },
  { href: '/intl-grants', label: 'Grants' },
]

/** Every public route, for the sitemap. */
export const allRoutes = ['/', ...Object.keys(sectionByRoute)]

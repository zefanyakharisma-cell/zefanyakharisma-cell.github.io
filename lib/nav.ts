export type Section = 'about' | 'projects' | 'intl' | 'contact'

export const mainNav: { href: string; label: string; section: Section }[] = [
  { href: '/about-overview', label: 'About', section: 'about' },
  { href: '/projects-overview', label: 'Projects', section: 'projects' },
  { href: '/engagement', label: 'Intl. Ed', section: 'intl' },
  { href: '/contact', label: 'Contact', section: 'contact' },
]

const sectionByRoute: Record<string, Section> = {
  '/about-overview': 'about',
  '/education': 'about',
  '/experience': 'about',
  '/expertise': 'about',
  '/skillset': 'about',
  '/values': 'about',
  '/projects-overview': 'projects',
  '/amerta': 'projects',
  '/aci': 'projects',
  '/aero': 'projects',
  '/sim-kerjasama': 'projects',
  '/sim-realisasi': 'projects',
  '/engagement': 'intl',
  '/onboarding': 'intl',
  '/partnerships': 'intl',
  '/mou': 'intl',
  '/intl-grants': 'intl',
  '/contact': 'contact',
}

export function sectionFor(pathname: string): Section | null {
  return sectionByRoute[pathname] ?? null
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
  { href: '/mou', label: 'MoU / MoA' },
  { href: '/intl-grants', label: 'Grants' },
]

/** Every public route, for the sitemap. */
export const allRoutes = ['/', ...Object.keys(sectionByRoute)]

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { href: '/about-overview', label: 'About', tab: 'about' },
  { href: '/projects-overview', label: 'Projects', tab: 'projects' },
  { href: '/engagement', label: 'Intl. Ed', tab: 'intl' },
  { href: '/croissantsmoon', label: 'Creative', tab: 'creative' },
]

const tabMap: Record<string, string> = {
  '/about-overview': 'about', '/education': 'about', '/experience': 'about',
  '/expertise': 'about', '/skillset': 'about', '/values': 'about', '/international': 'about',
  '/projects-overview': 'projects', '/amerta': 'projects', '/aci': 'projects', '/aero': 'projects', '/pcu-global': 'projects',
  '/engagement': 'intl', '/onboarding': 'intl', '/engagement-detail': 'intl',
  '/partnerships': 'intl', '/mou': 'intl', '/intl-grants': 'intl',
  '/partnership-detail': 'intl', '/mou-detail': 'intl',
  '/croissantsmoon': 'creative', '/contact': 'contact',
}

const islandLabels: Record<string, string> = {
  '/': 'Home',
  '/about-overview': 'About', '/education': 'About', '/experience': 'About',
  '/expertise': 'About', '/skillset': 'About', '/values': 'About', '/international': 'About',
  '/projects-overview': 'Projects', '/amerta': 'Projects', '/aci': 'Projects', '/aero': 'Projects', '/pcu-global': 'Projects',
  '/engagement': 'Intl. Ed', '/onboarding': 'Intl. Ed', '/partnerships': 'Intl. Ed',
  '/mou': 'Intl. Ed', '/intl-grants': 'Intl. Ed',
  '/croissantsmoon': 'Creative',
  '/contact': 'Contact',
  '/skill-discovery': 'Discover',
}

export default function TopBar() {
  const pathname = usePathname()
  const activeTab = tabMap[pathname] ?? (pathname.startsWith('/croissantsmoon') ? 'creative' : null)
  const islandLabel = islandLabels[pathname] ?? 'ZKN'

  return (
    <div id="ios-top-bar" role="banner">
      <Link href="/" id="nav-name">ZKN</Link>

      <div id="dynamic-island" aria-live="polite" aria-atomic="true">
        <span id="dynamic-island-label">{islandLabel}</span>
      </div>

      <nav id="desktop-nav" aria-label="Main navigation">
        {navLinks.map(link => (
          <Link
            key={link.tab}
            href={link.href}
            className={`desktop-nav-link${activeTab === link.tab ? ' active' : ''}`}
            data-tab={link.tab}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div id="top-bar-actions">
        <Link
          href="/contact"
          id="desktop-contact-btn"
          className={`desktop-nav-link${activeTab === 'contact' ? ' active' : ''}`}
          data-tab="contact"
        >
          Contact
        </Link>
        <Link href="/croissantsmoon/login" id="open-admin-login" aria-label="Admin sign-in">···</Link>
      </div>
    </div>
  )
}

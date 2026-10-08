'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, sectionFor, sectionLabel } from '@/lib/nav'

export default function TopBar() {
  const pathname = usePathname()
  const active = sectionFor(pathname)

  return (
    <div id="ios-top-bar" role="banner">
      <Link href="/" id="nav-name">ZKN</Link>

      <div id="dynamic-island" aria-live="polite" aria-atomic="true">
        <span id="dynamic-island-label">{sectionLabel(pathname)}</span>
      </div>

      <nav id="desktop-nav" aria-label="Main navigation">
        {mainNav.map(link => (
          <Link
            key={link.section}
            href={link.href}
            className={`desktop-nav-link${active === link.section ? ' active' : ''}`}
            aria-current={active === link.section ? 'page' : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { mainNav, sectionFor } from '@/lib/nav'

export function Header() {
  const active = sectionFor(usePathname())
  return (
    <header className="site-header">
      <div className="wrap">
        <Link href="/" className="wordmark">Zefanya Kharisma <span>Nugroho</span></Link>
        <nav className="site-nav" aria-label="Main navigation">
          {mainNav.map(item => (
            <Link key={item.section} href={item.href} aria-current={active === item.section ? 'page' : undefined}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}

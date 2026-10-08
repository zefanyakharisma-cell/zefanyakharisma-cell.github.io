'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { intlNav } from '@/lib/nav'

/** Underline tabs between the International Education pages. */
export function SubNav() {
  const pathname = usePathname()
  return (
    <div className="wrap">
      <nav className="tabs" aria-label="International education sections">
        {intlNav.map(item => (
          <Link key={item.href} href={item.href} aria-current={pathname === item.href ? 'page' : undefined}>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Briefcase, Globe, Mail } from 'lucide-react'
import { mainNav, sectionFor, type Section } from '@/lib/nav'

const icons: Record<Section, typeof User> = { about: User, projects: Briefcase, intl: Globe, contact: Mail }

export default function TabBar() {
  const pathname = usePathname()
  const active = sectionFor(pathname)

  return (
    <nav id="ios-tab-bar" aria-label="Main navigation">
      {mainNav.map(({ href, label, section }) => {
        const Icon = icons[section]
        return (
          <Link
            key={section}
            href={href}
            className={`tab-item${active === section ? ' active' : ''}`}
            aria-current={active === section ? 'page' : undefined}
          >
            <div className="tab-icon">
              <Icon style={{ width: 22, height: 22 }} aria-hidden />
            </div>
            <span>{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}

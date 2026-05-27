'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { User, Briefcase, Globe, Sparkles, Mail } from 'lucide-react'

const tabs = [
  { href: '/about-overview', id: 'tab-about', tab: 'about', label: 'About', Icon: User },
  { href: '/projects-overview', id: 'tab-projects', tab: 'projects', label: 'Projects', Icon: Briefcase },
  { href: '/engagement', id: 'tab-intl', tab: 'intl', label: 'Intl. Ed', Icon: Globe },
  { href: '/croissantsmoon', id: 'tab-creative', tab: 'creative', label: 'Creative', Icon: Sparkles },
  { href: '/contact', id: 'tab-contact', tab: 'contact', label: 'Contact', Icon: Mail },
]

const tabMap: Record<string, string> = {
  '/about-overview': 'about', '/education': 'about', '/experience': 'about',
  '/expertise': 'about', '/skillset': 'about', '/values': 'about', '/international': 'about',
  '/projects-overview': 'projects', '/amerta': 'projects', '/aci': 'projects', '/aero': 'projects', '/pcu-global': 'projects',
  '/engagement': 'intl', '/onboarding': 'intl', '/engagement-detail': 'intl',
  '/partnerships': 'intl', '/mou': 'intl', '/intl-grants': 'intl',
  '/partnership-detail': 'intl', '/mou-detail': 'intl',
  '/contact': 'contact',
}

export default function TabBar() {
  const pathname = usePathname()
  const activeTab = tabMap[pathname] ?? (pathname.startsWith('/croissantsmoon') ? 'creative' : null)

  return (
    <nav id="ios-tab-bar" aria-label="Main navigation">
      {tabs.map(({ href, id, tab, label, Icon }) => (
        <Link
          key={tab}
          href={href}
          className={`tab-item${activeTab === tab ? ' active' : ''}`}
          id={id}
          data-tab={tab}
        >
          <div className="tab-icon">
            <Icon style={{ width: 22, height: 22 }} />
          </div>
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}

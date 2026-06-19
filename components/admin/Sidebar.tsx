'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, FileText, LayoutTemplate,
  Archive, LogOut, Sparkles, Menu, X, Globe, Boxes
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/croissantsmoon/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/croissantsmoon/landing', label: 'Landing Page', icon: Globe },
  { href: '/croissantsmoon/projects', label: 'Projects', icon: Boxes },
  { href: '/croissantsmoon/leads', label: 'Leads', icon: Users },
  { href: '/croissantsmoon/proposals', label: 'Proposals', icon: FileText },
  { href: '/croissantsmoon/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/croissantsmoon/archive', label: 'Archive', icon: Archive },
]

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <Image
        src="/croissantsmoon/cm-logo-circle.png"
        alt="CroissantsMoon"
        width={32}
        height={32}
        className="w-8 h-8 rounded-lg border border-cm-gold/20"
      />
      <div>
        <span className="text-sm font-semibold text-cm-white">CroissantsMoon</span>
        <div className="flex items-center gap-1 mt-0.5">
          <Sparkles size={9} className="text-cm-gold" />
          <span className="text-[10px] text-cm-gold font-medium uppercase tracking-widest">Studio OS</span>
        </div>
      </div>
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Close the mobile drawer whenever the route changes.
  useEffect(() => { setOpen(false) }, [pathname])

  // Lock background scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/croissantsmoon/login')
    router.refresh()
  }

  return (
    <>
      {/* Mobile top bar with hamburger — hidden on md+ */}
      <div className="md:hidden fixed top-0 inset-x-0 h-14 z-30 flex items-center gap-3 px-4 bg-cm-surface/95 backdrop-blur border-b border-cm-border">
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Open navigation menu"
          aria-expanded={open}
          aria-controls="admin-sidebar"
          className="p-2 -ml-2 rounded-lg text-cm-subtle hover:text-cm-text hover:bg-cm-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cm-muted"
        >
          <Menu size={18} />
        </button>
        <Brand />
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm animate-cm-fade-in"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        id="admin-sidebar"
        className={cn(
          'fixed md:static inset-y-0 left-0 z-50 w-60 flex-shrink-0 flex flex-col h-full bg-cm-surface border-r border-cm-border',
          'transform transition-transform duration-300 ease-out md:transform-none',
          open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <div className="px-5 py-6 border-b border-cm-border flex items-center justify-between">
          <Brand />
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation menu"
            className="md:hidden p-1.5 -mr-1.5 rounded-lg text-cm-subtle hover:text-cm-text hover:bg-cm-elevated transition-colors focus:outline-none focus:ring-2 focus:ring-cm-muted"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto" aria-label="Admin">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-150',
                  active
                    ? 'bg-cm-elevated text-cm-white font-medium'
                    : 'text-cm-subtle hover:text-cm-text hover:bg-cm-elevated/60'
                )}
              >
                <Icon size={15} className={active ? 'text-cm-accent' : 'text-current'} />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="px-3 py-4 border-t border-cm-border">
          <button
            onClick={signOut}
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-cm-subtle hover:text-red-400 hover:bg-red-400/5 transition-all w-full focus:outline-none focus:ring-2 focus:ring-cm-muted"
          >
            <LogOut size={15} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

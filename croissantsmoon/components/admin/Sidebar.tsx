'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Users, FileText, LayoutTemplate,
  Archive, LogOut, Moon, Sparkles
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const NAV = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/leads', label: 'Leads', icon: Users },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/templates', label: 'Templates', icon: LayoutTemplate },
  { href: '/archive', label: 'Archive', icon: Archive },
]

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()

  async function signOut() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="w-60 flex-shrink-0 flex flex-col h-full bg-cm-surface border-r border-cm-border">
      <div className="px-5 py-6 border-b border-cm-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-cm-gold/10 border border-cm-gold/20 flex items-center justify-center">
            <Moon size={15} className="text-cm-gold" />
          </div>
          <div>
            <span className="text-sm font-semibold text-cm-white">CroissantsMoon</span>
            <div className="flex items-center gap-1 mt-0.5">
              <Sparkles size={9} className="text-cm-gold" />
              <span className="text-[10px] text-cm-gold font-medium uppercase tracking-widest">Studio OS</span>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
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
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-cm-subtle hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

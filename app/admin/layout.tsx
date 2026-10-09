import type { Metadata } from 'next'
import Link from 'next/link'
import { sessionClient } from '@/lib/supabase/server'
import { supabaseConfigured } from '@/lib/supabase/config'
import { signOut } from './actions'
import './admin.css'

export const metadata: Metadata = {
  title: 'Writing admin',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = supabaseConfigured ? (await (await sessionClient()).auth.getUser()).data.user : null
  return (
    <>
      <header className="admin-bar">
        <div className="wrap">
          <Link href="/admin" className="font-bold no-underline">Writing admin</Link>
          <div className="flex items-center gap-4">
            <Link href="/writing">View Writing</Link>
            {user && (
              <form action={signOut}>
                <button type="submit" className="pcu-btn pcu-btn--ghost">Sign out</button>
              </form>
            )}
          </div>
        </div>
      </header>
      <main className="wrap py-10">{children}</main>
    </>
  )
}

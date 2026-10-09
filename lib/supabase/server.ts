import 'server-only'
import { createClient as createAnonClient } from '@supabase/supabase-js'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { supabaseAnonKey, supabaseConfigured, supabaseUrl } from './config'

/** Cookie-free anon client for public pages, so they stay statically rendered (ISR). */
export function publicClient() {
  return createAnonClient(supabaseUrl, supabaseAnonKey, { auth: { persistSession: false, autoRefreshToken: false } })
}

/** Session-aware client for the admin: server components, server actions and route handlers. */
export async function sessionClient() {
  const store = await cookies()
  return createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => store.getAll(),
      setAll: list => {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options))
        } catch {
          // Called from a server component: cookies are read-only there; middleware refreshes them.
        }
      },
    },
  })
}

/** Signed-in admin or a redirect to the login page. Row-level security enforces the same rule in the database. */
export async function requireAdmin() {
  if (!supabaseConfigured) redirect('/admin/login')
  const supabase = await sessionClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')
  const { data: isAdmin } = await supabase.rpc('is_admin')
  if (!isAdmin) redirect('/admin/login?error=not-admin')
  return { supabase, user }
}

import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'
import { supabaseAnonKey, supabaseConfigured, supabaseUrl } from '@/lib/supabase/config'

/** Keeps the admin session fresh and sends signed-out visitors to the login page. */
export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request })
  if (!supabaseConfigured) return response

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll: list => {
        list.forEach(({ name, value }) => request.cookies.set(name, value))
        response = NextResponse.next({ request })
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options))
      },
    },
  })
  const { data: { user } } = await supabase.auth.getUser()

  if (!user && request.nextUrl.pathname !== '/admin/login') {
    const url = request.nextUrl.clone()
    url.pathname = '/admin/login'
    url.search = ''
    return NextResponse.redirect(url)
  }
  return response
}

export const config = { matcher: ['/admin/:path*'] }

import { publicClient } from '@/lib/supabase/server'
import { supabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

/** Vercel cron sends `Authorization: Bearer $CRON_SECRET` once the secret is set. Until then the route stays open
 *  (it only runs a harmless ping), so the cron keeps the database awake. */
function authorized(req: Request): boolean {
  const secret = process.env.CRON_SECRET
  if (secret) return req.headers.get('authorization') === `Bearer ${secret}`
  if (process.env.VERCEL_ENV === 'production') console.warn('[keepalive] CRON_SECRET is not set; the route is open')
  return true
}

/** Daily Vercel cron (vercel.json): one tiny query so the free Supabase project is never paused for inactivity. */
export async function GET(req: Request) {
  if (!authorized(req)) return Response.json({ ok: false }, { status: 401 })
  if (!supabaseConfigured) return Response.json({ ok: false, reason: 'not configured' }, { status: 503 })
  const { error } = await publicClient().rpc('ping')
  if (error) console.error('[keepalive] ping failed', error)
  return Response.json({ ok: !error }, { status: error ? 502 : 200 })
}

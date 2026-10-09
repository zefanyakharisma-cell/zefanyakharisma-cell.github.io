import { publicClient } from '@/lib/supabase/server'
import { supabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

/** Daily Vercel cron (vercel.json): one tiny query so the free Supabase project is never paused for inactivity. */
export async function GET() {
  if (!supabaseConfigured) return Response.json({ ok: false, reason: 'not configured' }, { status: 503 })
  const { error } = await publicClient().rpc('ping')
  return Response.json({ ok: !error }, { status: error ? 502 : 200 })
}

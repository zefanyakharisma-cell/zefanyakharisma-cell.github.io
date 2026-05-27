import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const { proposal_id, event_type, session_id, metadata } = await request.json()
    if (!proposal_id || !event_type) {
      return NextResponse.json({ error: 'missing fields' }, { status: 400 })
    }

    const supabase = await createClient()
    await supabase.from('analytics_events').insert({
      proposal_id,
      event_type,
      session_id: session_id ?? crypto.randomUUID(),
      user_agent: request.headers.get('user-agent')?.slice(0, 200),
      metadata: metadata ?? {},
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: 'server_error' }, { status: 500 })
  }
}

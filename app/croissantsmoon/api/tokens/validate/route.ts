import { NextRequest, NextResponse } from 'next/server'
import { validateProposalToken } from '@/lib/actions/proposals'
import { createServiceClient } from '@/lib/supabase/server'

const rateLimitMap = new Map<string, { count: number; resetAt: number }>()

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 })
    return true
  }
  if (entry.count >= 10) return false
  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ valid: false, reason: 'rate_limited' }, { status: 429 })
  }

  try {
    const { slug, token } = await request.json()
    if (!slug || !token) {
      return NextResponse.json({ valid: false, reason: 'missing_params' }, { status: 400 })
    }

    const result = await validateProposalToken(slug, token)

    if (result.valid && result.proposalId) {
      const supabase = await createServiceClient()

      await supabase.rpc('increment_proposal_views', { proposal_id: result.proposalId })

      await supabase.from('analytics_events').insert({
        proposal_id: result.proposalId,
        event_type: 'token_entry',
        session_id: crypto.randomUUID(),
        metadata: { ip_hash: ip.slice(-4) },
      })

      const response = NextResponse.json({ valid: true })
      response.cookies.set(`cm_access_${slug}`, 'granted', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24,
        path: `/croissantsmoon/proposal/${slug}`,
      })
      return response
    }

    return NextResponse.json({ valid: false, reason: result.reason })
  } catch {
    return NextResponse.json({ valid: false, reason: 'server_error' }, { status: 500 })
  }
}

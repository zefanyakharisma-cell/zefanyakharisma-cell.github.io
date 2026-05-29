import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { to, subject, body, proposalId, leadId } = await req.json()

    const from = process.env.RESEND_FROM_EMAIL ?? 'Zefanya @ CroissantsMoon <hello@croissantsmoon.studio>'

    function escapeHtml(s: string) {
      return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
    }
    const html = body.split('\n').map((line: string) =>
      line ? `<p style="margin:0 0 12px;font-family:sans-serif;font-size:14px;color:#333">${escapeHtml(line)}</p>` : '<br>'
    ).join('')

    const { error } = await resend.emails.send({ from, to, subject, text: body, html })

    if (error) throw new Error(error.message)

    const supabase = await createClient()
    await supabase.from('followups').insert({
      lead_id: leadId,
      proposal_id: proposalId,
      type: 'email',
      content: `Subject: ${subject}\n\n${body}`,
      created_by: 'admin',
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[email/send]', err)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

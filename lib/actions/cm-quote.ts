'use server'

import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'

// Server-side validation mirrors the client form. Optional fields accept ''.
const QuoteSchema = z.object({
  name: z.string().trim().min(1, 'name').max(200),
  email: z.string().trim().email('email').max(300),
  company: z.string().trim().max(200).optional(),
  building: z.array(z.string().max(80)).max(8).optional(),
  stage: z.string().trim().max(120).optional(),
  budget: z.string().trim().max(120).optional(),
  timeline: z.string().trim().max(120).optional(),
  message: z.string().trim().max(8000).optional(),
  locale: z.enum(['en', 'id']).default('en'),
})

export type QuoteInput = z.infer<typeof QuoteSchema>

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'zefanya.kharisma@croissantsmoon.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <contact@croissantsmoon.studio>'

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function submitQuoteRequest(input: QuoteInput) {
  const parsed = QuoteSchema.safeParse(input)
  if (!parsed.success) {
    // 'name' | 'email' for field-level client display, else generic.
    const field = parsed.error.issues[0]?.message
    return { ok: false as const, error: field === 'name' || field === 'email' ? field : 'generic' }
  }
  const d = parsed.data
  const building = d.building ?? []

  // Save first so a lead is never lost even if email delivery fails.
  try {
    const supabase = await createServiceClient()
    const { error } = await supabase.from('cm_quote_requests').insert({
      name: d.name,
      email: d.email,
      company: d.company || null,
      building,
      stage: d.stage || null,
      budget: d.budget || null,
      timeline: d.timeline || null,
      message: d.message || null,
      locale: d.locale,
    })
    if (error) console.error('[cm-quote] supabase insert failed:', error.message)
  } catch (err) {
    console.error('[cm-quote] supabase insert threw:', err)
  }

  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY)
      const rows: [string, string][] = [
        ['Name', d.name],
        ['Email', d.email],
        ['Company', d.company || '—'],
        ['Building', building.length ? building.join(', ') : '—'],
        ['Stage', d.stage || '—'],
        ['Budget', d.budget || '—'],
        ['Timeline', d.timeline || '—'],
        ['Locale', d.locale.toUpperCase()],
      ]
      const html = `
        <table style="font-family:sans-serif;font-size:14px;color:#333;border-collapse:collapse">
          ${rows.map(([k, v]) => `<tr><td style="padding:4px 14px 4px 0;color:#888">${k}</td><td style="padding:4px 0">${esc(v)}</td></tr>`).join('')}
        </table>
        ${d.message ? `<p style="font-family:sans-serif;font-size:14px;color:#333;margin-top:16px;white-space:pre-wrap">${esc(d.message)}</p>` : ''}
      `
      const { error } = await resend.emails.send({
        from: FROM_EMAIL,
        to: TO_EMAIL,
        replyTo: `${d.name} <${d.email}>`,
        subject: `[Quote] ${d.name}${d.company ? ` · ${d.company}` : ''}`,
        text: rows.map(([k, v]) => `${k}: ${v}`).join('\n') + (d.message ? `\n\n${d.message}` : ''),
        html,
      })
      if (error) console.error('[cm-quote] resend send failed:', error.message)
    } catch (err) {
      console.error('[cm-quote] resend send threw:', err)
    }
  } else {
    console.error('[cm-quote] RESEND_API_KEY not set — request saved but email not sent')
  }

  return { ok: true as const }
}

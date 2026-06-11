'use server'

import { Resend } from 'resend'
import { createServiceClient } from '@/lib/supabase/server'
import { z } from 'zod'

const ContactSchema = z.object({
  name: z.string().trim().min(1, 'Please enter your name.').max(200),
  email: z.string().trim().email('Please enter a valid email address.'),
  subject: z.string().trim().min(1, 'Please enter a subject.').max(300),
  message: z.string().trim().min(1, 'Please enter a message.').max(10000),
})

const TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? 'zefanya.kharisma@croissantsmoon.com'
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'Portfolio Contact <contact@croissantsmoon.studio>'

function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export async function sendContactMessage(input: z.infer<typeof ContactSchema>) {
  const parsed = ContactSchema.safeParse(input)
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.issues[0]?.message ?? 'Please check the form and try again.' }
  }
  const { name, email, subject, message } = parsed.data

  // Save first so a message is never lost even if email delivery fails.
  try {
    const supabase = await createServiceClient()
    const { error } = await supabase.from('contact_messages').insert({ name, email, subject, message })
    if (error) console.error('[contact] supabase insert failed:', error.message)
  } catch (err) {
    console.error('[contact] supabase insert threw:', err)
  }

  if (!process.env.RESEND_API_KEY) {
    console.error('[contact] RESEND_API_KEY not set — message saved but email not sent')
    return { ok: false as const, error: 'Message received, but email delivery is not configured yet.' }
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const html = message
      .split('\n')
      .map(line => (line ? `<p style="margin:0 0 12px;font-family:sans-serif;font-size:14px;color:#333">${escapeHtml(line)}</p>` : '<br>'))
      .join('')

    const { error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      replyTo: `${name} <${email}>`,
      subject: `[Portfolio] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p style="font-family:sans-serif;font-size:13px;color:#666">From: ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>${html}`,
    })
    if (error) throw new Error(error.message)
  } catch (err) {
    console.error('[contact] resend send failed:', err)
    return { ok: false as const, error: 'Something went wrong sending your message. Please try again or email me directly.' }
  }

  return { ok: true as const }
}

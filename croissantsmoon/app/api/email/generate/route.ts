import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import type { ProposalBlock } from '@/types'

const anthropic = new Anthropic()

export async function POST(req: Request) {
  try {
    const { proposal, lead } = await req.json()

    const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'
    const proposalUrl = `${BASE}/croissantsmoon/proposal/${proposal.slug}`

    const blocks: ProposalBlock[] = proposal.content?.sections ?? []
    const get = (type: string) => blocks.find(b => b.type === type)?.data as Record<string, string> | undefined

    const contentLines = [
      get('audit_findings')?.findings ? `Audit findings: ${get('audit_findings')!.findings}` : null,
      get('website_analysis')?.notes ? `Website analysis: ${get('website_analysis')!.notes}` : null,
      get('website_analysis')?.url ? `Their current site: ${get('website_analysis')!.url}` : null,
      get('features')?.features ? `Proposed features:\n${get('features')!.features}` : null,
      get('pricing')?.package ? `Package: ${get('pricing')!.package} — ${get('pricing')!.price}` : null,
    ].filter(Boolean).join('\n')

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      system: `You write outreach emails for Zefanya Kharisma, founder of CroissantsMoon Studio — a boutique digital agency specializing in premium institutional websites, university portals, and corporate digital transformations, based in Indonesia. Zefanya's approach is research-driven, detail-oriented, and treats each project as a long-term partnership. Write in first person as Zefanya.`,
      messages: [
        {
          role: 'user',
          content: `Write a personalized outreach email to introduce CroissantsMoon and share a proposal with a lead.

Lead:
- Name: ${lead.contact_person}
- Organization: ${lead.organization}
- Industry: ${lead.industry ?? 'not specified'}
- Current website: ${lead.website ?? 'not provided'}
- Notes: ${lead.notes ?? 'none'}

Proposal:
- Title: ${proposal.title}
- Proposal URL: ${proposalUrl}
- Access Token: ${proposal.token}
${contentLines ? `\nContent highlights:\n${contentLines}` : ''}

The email must include:
1. Brief personal intro (Zefanya, CroissantsMoon Studio)
2. Why you're reaching out — specific to their organization and industry context
3. 2–3 specific problems you've identified with their digital presence (draw from the notes and industry; be concrete, not generic)
4. How CroissantsMoon addresses those problems
5. The proposal URL and access token on their own clearly labeled lines
6. A CTA: invite them to reply or schedule a discovery call

Tone: professional, warm, confident, consultative. Not salesy. Under 280 words.

Return ONLY valid JSON with exactly two keys: {"subject": "...", "body": "..."}
The body uses plain text. Use \\n for line breaks. No HTML tags.`,
        },
      ],
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Could not parse Claude response')

    const { subject, body } = JSON.parse(jsonMatch[0])
    return NextResponse.json({ subject, body })
  } catch (err) {
    console.error('[email/generate]', err)
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 })
  }
}

import { NextResponse } from 'next/server'
import type { ProposalBlock } from '@/types'

export async function POST(req: Request) {
  try {
    const { proposal, lead } = await req.json()

    const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://zefanyakharisma.com'
    const proposalUrl = `${BASE}/croissantsmoon/proposal/${proposal.slug}`

    const blocks: ProposalBlock[] = proposal.content?.sections ?? []
    const get = (type: string) => blocks.find(b => b.type === type)?.data as Record<string, string> | undefined

    const findings = get('audit_findings')?.findings
    const websiteNotes = get('website_analysis')?.notes
    const problemsText = [findings, websiteNotes].filter(Boolean).join('\n\n')

    const subject = `A Proposal for ${lead.organization} — ${proposal.title}`

    const body = `Dear ${lead.contact_person},

My name is Zefanya Kharisma, founder of CroissantsMoon Studio — a boutique digital agency specializing in premium institutional websites, university portals, and corporate digital transformations.

I'm reaching out because ${lead.organization} caught my attention${lead.industry ? `, particularly within the ${lead.industry} space` : ''}. After reviewing your current digital presence${lead.website ? ` at ${lead.website}` : ''}, I identified a few areas where a stronger digital foundation could make a meaningful difference:

${problemsText || `Your organization deserves a digital presence that reflects the quality and credibility of your work. Many institutions in your space struggle with outdated design, slow performance, and limited functionality — gaps that quietly cost trust and opportunity.`}

At CroissantsMoon, we approach each project as a long-term partnership — combining strategic thinking with premium execution to deliver digital experiences that genuinely represent your organization's value.

I've prepared a detailed proposal specifically for ${lead.organization}:

  Proposal URL: ${proposalUrl}
  Access Token: ${proposal.token}

Visit the link above and enter the token to access your private proposal portal.

I'd love to walk you through it and hear your thoughts. Feel free to reply to this email or suggest a time for a brief discovery call — I'm happy to work around your schedule.

Looking forward to connecting,

Zefanya Kharisma
Founder, CroissantsMoon Studio
contact@croissantsmoon.studio`

    return NextResponse.json({ subject, body })
  } catch (err) {
    console.error('[email/generate]', err)
    return NextResponse.json({ error: 'Failed to generate email' }, { status: 500 })
  }
}

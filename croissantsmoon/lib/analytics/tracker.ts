'use client'

import { createClient } from '@/lib/supabase/client'
import { generateSessionId } from '@/lib/tokens/generator'
import type { AnalyticsEventType } from '@/types'

const SESSION_KEY = 'cm_session_id'

function getSessionId(): string {
  if (typeof window === 'undefined') return ''
  let id = sessionStorage.getItem(SESSION_KEY)
  if (!id) {
    id = generateSessionId()
    sessionStorage.setItem(SESSION_KEY, id)
  }
  return id
}

export async function trackEvent(
  proposalId: string,
  eventType: AnalyticsEventType,
  metadata: Record<string, unknown> = {}
): Promise<void> {
  try {
    const supabase = createClient()
    await supabase.from('analytics_events').insert({
      proposal_id: proposalId,
      event_type: eventType,
      session_id: getSessionId(),
      user_agent: navigator.userAgent.slice(0, 200),
      metadata,
    })
  } catch {}
}

export async function trackSectionView(proposalId: string, sectionType: string): Promise<void> {
  await trackEvent(proposalId, 'section_view', { section: sectionType })
  if (sectionType === 'pricing') {
    await trackEvent(proposalId, 'pricing_view', { section: 'pricing' })
  }
}

export function createIntersectionObserver(
  proposalId: string,
  sectionRef: HTMLElement,
  sectionType: string
): IntersectionObserver {
  let tracked = false
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !tracked) {
          tracked = true
          trackSectionView(proposalId, sectionType)
        }
      })
    },
    { threshold: 0.3 }
  )
  observer.observe(sectionRef)
  return observer
}

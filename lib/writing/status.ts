export type PostState = 'draft' | 'scheduled' | 'published'

/** Published posts with a future date are shown as scheduled. */
export function postState(status: 'draft' | 'published', publishedAt: string | null, now = Date.now()): PostState {
  if (status === 'draft') return 'draft'
  return publishedAt && new Date(publishedAt).getTime() > now ? 'scheduled' : 'published'
}

export const stateLabel: Record<PostState, string> = { draft: 'Draft', scheduled: 'Scheduled', published: 'Published' }

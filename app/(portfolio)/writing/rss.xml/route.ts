import { rssFeed } from '@/lib/writing/rss'

export const revalidate = 300

export function GET() {
  return rssFeed('en')
}

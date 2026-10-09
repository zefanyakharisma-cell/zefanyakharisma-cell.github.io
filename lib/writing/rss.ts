import 'server-only'
import { pick, postPath, type Lang } from './config'
import { listPosts } from './posts'

const SITE_URL = 'https://zefanyakharisma.com'

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** RSS 2.0 feed of the posts that exist in `lang`. */
export async function rssFeed(lang: Lang): Promise<Response> {
  const posts = ((await listPosts()) ?? []).filter(p => p.translations[lang])
  const self = `${SITE_URL}/writing/${lang === 'en' ? 'rss.xml' : 'rss-id.xml'}`
  const items = posts.map(p => {
    const t = pick(p.translations, lang)!.t
    const link = `${SITE_URL}${postPath(p.slug, lang)}`
    return `<item><title>${esc(t.title)}</title><link>${link}</link><guid isPermaLink="true">${link}</guid><pubDate>${new Date(p.published_at).toUTCString()}</pubDate><description>${esc(t.excerpt)}</description></item>`
  })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${lang === 'en' ? 'Writing — Zefanya Kharisma Nugroho' : 'Tulisan — Zefanya Kharisma Nugroho'}</title>
<link>${SITE_URL}/writing</link>
<atom:link href="${self}" rel="self" type="application/rss+xml"/>
<description>${lang === 'en' ? 'International relations, people in an international office, and the systems behind digitalisation.' : 'Hubungan internasional, manusia di kantor internasional, dan sistem di balik digitalisasi.'}</description>
<language>${lang === 'en' ? 'en' : 'id'}</language>
${items.join('\n')}
</channel></rss>`
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } })
}

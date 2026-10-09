import { ImageResponse } from 'next/og'
import { postTypes, streams, type Lang } from '@/lib/writing/config'
import { getPost } from '@/lib/writing/posts'

export const ogSize = { width: 1200, height: 630 }

/** Share image for a post: same brand surface as the site's default image, with the post title. */
export async function postOgImage(slug: string, lang: Lang) {
  const post = await getPost(slug)
  const t = post?.translations[lang] ?? post?.translations[lang === 'en' ? 'id' : 'en']
  const title = t?.title ?? 'Writing'
  const eyebrow = post ? [postTypes[post.type][lang], ...post.streams.map(s => streams[s][lang])].join(' · ') : 'Writing'
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #245484 0%, #133256 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 72,
            top: 0,
            width: 200,
            height: 100,
            borderBottomLeftRadius: 100,
            borderBottomRightRadius: 100,
            border: '36px solid #ffbc00',
            borderTop: 'none',
          }}
        />
        <div style={{ color: '#ffbc00', fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', fontWeight: 700 }}>
          {eyebrow}
        </div>
        <div style={{ display: 'flex', color: '#ffffff', fontSize: title.length > 70 ? 56 : 68, fontWeight: 700, lineHeight: 1.1, letterSpacing: -1, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f1f1f1', fontSize: 24 }}>
          <div>Zefanya Kharisma Nugroho</div>
          <div>zefanyakharisma.com/writing</div>
        </div>
      </div>
    ),
    { ...ogSize },
  )
}

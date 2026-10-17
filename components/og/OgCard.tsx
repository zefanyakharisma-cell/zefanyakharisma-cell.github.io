import { readFile } from 'node:fs/promises'
import { extname, join } from 'node:path'
import { ImageResponse } from 'next/og'
import { ogThemes, ogTokens, ringU, type OgTheme } from './tokens'

export const ogSize = { width: 1200, height: 630 }
export const ogContentType = 'image/png'

export type OgSpec = {
  theme: OgTheme
  eyebrow: string
  /** Light line above the title (the DS kicker), e.g. a programme's full name. */
  kicker?: string
  title: string
  /** One headline figure; without a value the label reads as a plain line. */
  stat?: { value?: string; label: string }
  /** A file under public/ or an absolute URL. Without one the card is text only. */
  photo?: string
  /** CSS object-position for the photo crop. */
  position?: string
  /** Shown bottom right, e.g. '/amerta'. */
  path: string
}

const PANEL = 720
const SEAM = 6

const fontFile = (name: string) => readFile(join(process.cwd(), 'app/fonts/og', name))

const mime: Record<string, string> = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' }

async function photoSrc(photo: string) {
  if (/^https?:\/\//.test(photo)) return photo
  const data = await readFile(join(process.cwd(), 'public', photo))
  return `data:${mime[extname(photo).toLowerCase()] ?? 'image/jpeg'};base64,${data.toString('base64')}`
}

function titleSize(title: string, photo: boolean) {
  if (title.length <= 12) return 112
  if (title.length <= 34) return photo ? 68 : 80
  return photo ? 56 : 64
}

/** The site's share card on the PCU Design System: midnight panel with Inter type,
 *  the section's half ring and seam as accent, and the page's hero photo. */
export async function ogCard(spec: OgSpec) {
  const theme = ogThemes[spec.theme]
  const [regular, semibold, bold, photo] = await Promise.all([
    fontFile('Inter-Regular.ttf'),
    fontFile('Inter-SemiBold.ttf'),
    fontFile('Inter-Bold.ttf'),
    spec.photo ? photoSrc(spec.photo).catch(() => null) : null,
  ])
  const panelWidth = photo ? PANEL : ogSize.width
  const ringWidth = photo ? 200 : 260
  const ringLeft = photo ? PANEL + SEAM / 2 - ringWidth / 2 : ogSize.width - 72 - ringWidth
  const size = titleSize(spec.title, !!photo)

  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', background: ogTokens.midnight, fontFamily: 'Inter' }}>
        <div
          style={{
            width: panelWidth,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '64px 64px 56px',
            background: theme.panel,
          }}
        >
          <div style={{ display: 'flex', maxWidth: photo ? 540 : 780, color: theme.stat, fontSize: 20, fontWeight: 600, letterSpacing: 3.6, textTransform: 'uppercase' }}>
            {spec.eyebrow}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {spec.kicker && (
              <div style={{ display: 'flex', marginBottom: 12, color: ogTokens.smoke, fontSize: 26, fontWeight: 400, lineHeight: 1.3 }}>
                {spec.kicker}
              </div>
            )}
            <div style={{ display: 'flex', color: ogTokens.white, fontSize: size, fontWeight: 700, lineHeight: 1.05, letterSpacing: -size * 0.02 }}>
              {spec.title}
            </div>
            {spec.stat && (
              <div style={{ display: 'flex', alignItems: 'center', marginTop: 28 }}>
                {spec.stat.value && (
                  <div style={{ display: 'flex', flexShrink: 0, marginRight: 16, color: theme.stat, fontSize: 64, fontWeight: 700, letterSpacing: -1.3, lineHeight: 1 }}>
                    {spec.stat.value}
                  </div>
                )}
                <div style={{ display: 'flex', color: ogTokens.smoke, fontSize: spec.stat.value ? 26 : 28, lineHeight: 1.3 }}>
                  {spec.stat.label}
                </div>
              </div>
            )}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', color: ogTokens.smoke }}>
            <div style={{ display: 'flex', fontSize: 16, fontWeight: 600, letterSpacing: 5, textTransform: 'uppercase' }}>Zefanya Kharisma Nugroho</div>
            <div style={{ display: 'flex', marginTop: 8, fontSize: 20 }}>zefanyakharisma.com{spec.path === '/' ? '' : spec.path}</div>
          </div>
        </div>
        {photo && (
          <div style={{ display: 'flex', width: SEAM, height: '100%', background: theme.accent }} />
        )}
        {photo && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt=""
            width={ogSize.width - PANEL - SEAM}
            height={ogSize.height}
            style={{ objectFit: 'cover', objectPosition: spec.position ?? 'center' }}
          />
        )}
        <svg
          width={ringWidth}
          height={ringWidth / 2}
          viewBox="0 0 200 100"
          style={{ position: 'absolute', top: 0, left: ringLeft }}
        >
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="1" y2="0">
              {theme.stops.map(([offset, color]) => <stop key={offset} offset={offset} stopColor={color} />)}
            </linearGradient>
          </defs>
          <path d={ringU} fill="url(#ring)" />
        </svg>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
        { name: 'Inter', data: bold, weight: 700, style: 'normal' },
      ],
    },
  )
}

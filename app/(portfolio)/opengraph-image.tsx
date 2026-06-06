import { ImageResponse } from 'next/og'

export const alt = 'Zefanya Kharisma Nugroho — International Education & Creative Technologist'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
          background: 'linear-gradient(135deg, #1C1C1E 0%, #2C2C2E 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: '#0A84FF',
            }}
          />
          <div
            style={{
              color: 'rgba(255,255,255,0.55)',
              fontSize: 26,
              letterSpacing: 6,
              textTransform: 'uppercase',
              fontWeight: 600,
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Zefanya Kharisma
            <br />
            Nugroho
          </div>
          <div
            style={{
              marginTop: 28,
              color: '#0A84FF',
              fontSize: 36,
              fontWeight: 600,
            }}
          >
            International Education & Creative Technologist
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'rgba(255,255,255,0.55)',
            fontSize: 26,
          }}
        >
          <div>Surabaya, Indonesia</div>
          <div>zefanyakharisma.com</div>
        </div>
      </div>
    ),
    { ...size },
  )
}

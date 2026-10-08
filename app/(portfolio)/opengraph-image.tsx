import { ImageResponse } from 'next/og'

export const alt = 'Zefanya Kharisma Nugroho — International Education Professional'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// PCU brand surface: midnight gradient, amber eyebrow, half-ring accent. No logo.
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
          background: 'linear-gradient(135deg, #245484 0%, #133256 100%)',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: 72,
            top: 0,
            width: 260,
            height: 130,
            borderBottomLeftRadius: 130,
            borderBottomRightRadius: 130,
            border: '46px solid #ffbc00',
            borderTop: 'none',
          }}
        />
        <div style={{ color: '#ffbc00', fontSize: 24, letterSpacing: 6, textTransform: 'uppercase', fontWeight: 700 }}>
          International Education · Surabaya
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', flexDirection: 'column', color: '#ffffff', fontSize: 88, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            <div>Zefanya Kharisma</div>
            <div>Nugroho</div>
          </div>
          <div style={{ marginTop: 24, color: '#f1f1f1', fontSize: 34 }}>
            Global partnerships, student mobility and the systems behind them.
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f1f1f1', fontSize: 24 }}>
          <div>International Partnership Specialist</div>
          <div>zefanyakharisma.com</div>
        </div>
      </div>
    ),
    { ...size },
  )
}

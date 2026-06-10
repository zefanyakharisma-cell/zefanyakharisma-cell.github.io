import { ImageResponse } from 'next/og'

export const alt = 'CroissantsMoon — Celestial Studio, Surabaya'
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
          background: 'radial-gradient(ellipse 90% 70% at 50% 10%, #0B1E3A 0%, #071126 45%, #030712 100%)',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -120,
            top: 120,
            width: 540,
            height: 540,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212,177,90,0.22), transparent 65%)',
          }}
        />
        <div style={{ display: 'flex', color: '#D4B15A', fontSize: 26, letterSpacing: 6, fontWeight: 600 }}>
          CELESTIAL STUDIO
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ color: '#FFFFFF', fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            Digital presence,
          </div>
          <div style={{ color: '#FFFFFF', fontSize: 78, fontWeight: 800, lineHeight: 1.05 }}>
            crafted with intention.
          </div>
          <div style={{ color: '#94A3B8', fontSize: 30, marginTop: 28 }}>
            Web · Dashboard · Visual Identity
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#94A3B8', fontSize: 24 }}>
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>CroissantsMoon</span>
          <span>Surabaya, Indonesia</span>
        </div>
      </div>
    ),
    { ...size },
  )
}

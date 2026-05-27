import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function NotFound() {
  return (
    <div style={{ background: '#F2F2F7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: '6rem', fontWeight: 700, color: 'rgba(28,28,30,0.06)', lineHeight: 1, marginBottom: -16, userSelect: 'none' }}>404</div>
        <h1 className="font-heading font-bold" style={{ fontSize: '2rem', color: '#1C1C1E', letterSpacing: '-.02em', marginBottom: 12 }}>Page not found</h1>
        <p className="text-sm" style={{ color: '#767676', lineHeight: 1.7, marginBottom: 32 }}>The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            Go Home <ArrowRight style={{ width: 15, height: 15 }} />
          </Link>
          <Link href="/projects-overview" className="btn-outline inline-flex items-center gap-2">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  )
}

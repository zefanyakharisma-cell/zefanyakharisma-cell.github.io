import type { Metadata } from 'next'
import { Mail, Linkedin, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
  description: 'Open to international partnerships, collaborations, and meaningful conversations about global education.',
}

const EMAIL = 'zefanya.kharisma@gmail.com'
const LINKEDIN = 'https://www.linkedin.com/in/zefanyakharisma'

export default function Contact() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="label-small mb-4">Contact</p>
      <h1 className="font-heading font-bold mb-4" style={{ fontSize: 'clamp(2rem,5vw,3rem)', letterSpacing: '-.02em', color: '#19304b' }}>
        Let&apos;s talk about global education
      </h1>
      <p className="mb-10" style={{ color: '#46505c', lineHeight: 1.6, maxWidth: '60ch' }}>
        Open to international partnerships, collaborations, and conversations. Email is the fastest way to reach me.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        <a href={`mailto:${EMAIL}`} className="card p-6 flex items-center gap-4" style={{ textDecoration: 'none' }}>
          <Mail aria-hidden style={{ width: 22, height: 22, color: '#19304b' }} />
          <span>
            <span className="block font-semibold" style={{ color: '#19304b' }}>Email</span>
            <span className="block text-sm" style={{ color: '#46505c' }}>{EMAIL}</span>
          </span>
        </a>
        <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="card p-6 flex items-center gap-4" style={{ textDecoration: 'none' }}>
          <Linkedin aria-hidden style={{ width: 22, height: 22, color: '#19304b' }} />
          <span>
            <span className="block font-semibold" style={{ color: '#19304b' }}>LinkedIn</span>
            <span className="block text-sm" style={{ color: '#46505c' }}>in/zefanyakharisma</span>
          </span>
        </a>
      </div>
      <p className="mt-8 flex items-center gap-2 text-sm" style={{ color: '#46505c' }}>
        <MapPin aria-hidden style={{ width: 16, height: 16 }} /> Surabaya, East Java, Indonesia
      </p>
    </div>
  )
}

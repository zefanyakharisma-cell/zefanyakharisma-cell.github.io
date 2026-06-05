'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Mail, Linkedin, MessageCircle, MapPin, Clock } from 'lucide-react'

function buildStars(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    sz: (Math.random() * 1.8 + 0.5).toFixed(1),
    dur: (Math.random() * 3 + 1.8).toFixed(1),
    del: (Math.random() * 4).toFixed(1),
    op: (Math.random() * 0.5 + 0.25).toFixed(2),
  }))
}

const stars = buildStars(70)
const cardStars = buildStars(12)

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [msg, setMsg] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const formRef = useRef<HTMLFormElement>(null)
  const revealRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          setTimeout(() => e.target.classList.add('ct-visible'), i * 80)
          obs.unobserve(e.target)
        }
      })
    }, { threshold: 0.06 })
    revealRefs.current.forEach(el => { if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const addRevealRef = (el: HTMLDivElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const errs: Record<string, string> = {}
    if (!data.name?.trim()) errs.name = 'Please enter your name.'
    if (!data.email?.trim()) errs.email = 'Please enter your email address.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errs.email = 'Please enter a valid email address.'
    if (!data.subject?.trim()) errs.subject = 'Please enter a subject.'
    if (!data.message?.trim()) errs.message = 'Please enter a message.'
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    const mailto = `mailto:zefanya.kharisma@gmail.com?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(`From: ${data.name} <${data.email}>\n\n${data.message}`)}`
    window.open(mailto)
    setMsg('Opening your email client…')
    setStatus('idle')
    form.reset()
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', background: '#071126' }}>
      {/* Star field */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        {stars.map(s => (
          <span key={s.id} className="ct-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.sz}px`, height: `${s.sz}px`, opacity: parseFloat(s.op), ['--dur' as string]: `${s.dur}s`, ['--delay' as string]: `${s.del}s` }} />
        ))}
      </div>
      {/* Nebula blobs */}
      <div style={{ position: 'fixed', left: '-20%', top: '10%', width: '60%', height: '60%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(111,168,255,0.04) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'fixed', right: '-15%', bottom: '5%', width: '50%', height: '50%', borderRadius: '50%', background: 'radial-gradient(circle,rgba(212,177,90,0.04) 0%,transparent 65%)', pointerEvents: 'none', zIndex: 0 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: 680, margin: '0 auto', padding: 'clamp(2.5rem,6vh,5rem) 20px clamp(4rem,8vh,7rem)' }}>
        {/* Header */}
        <div ref={addRevealRef} className="ct-reveal" style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.62rem', fontWeight: 600, letterSpacing: '.22em', textTransform: 'uppercase', color: '#D4B15A', marginBottom: '1rem', opacity: .9 }}>Let&apos;s Work Together</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: 'clamp(2.2rem,6vw,3.5rem)', fontWeight: 400, fontStyle: 'italic', color: '#D9E6FF', lineHeight: 1.05, marginBottom: '1rem' }}>Begin your project.</h1>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.9rem', lineHeight: 1.76, color: '#8FA8D6', maxWidth: 440, margin: '0 auto' }}>Share your vision and I&apos;ll get back to you within 24–48 hours.</p>
        </div>

        {/* Form card */}
        <div ref={addRevealRef} className="ct-reveal" style={{ background: 'rgba(11,30,58,0.55)', backdropFilter: 'blur(20px) saturate(1.4)', border: '1px solid rgba(111,168,255,0.16)', borderRadius: 24, padding: 'clamp(1.75rem,5vw,2.75rem)', boxShadow: '0 8px 48px rgba(3,7,18,0.5)', position: 'relative', overflow: 'hidden', marginBottom: '2rem' }}>
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .3 }}>
            {cardStars.map(s => <span key={s.id} className="ct-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: `${s.sz}px`, height: `${s.sz}px`, opacity: parseFloat(s.op), ['--dur' as string]: `${s.dur}s`, ['--delay' as string]: `${s.del}s` }} />)}
          </div>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(to right,#6FA8FF44,#6FA8FF,#6FA8FF44)' }} />
          <form ref={formRef} onSubmit={handleSubmit} noValidate style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: 16, marginBottom: 18 }}>
              <div>
                <label htmlFor="cf-name" className="ct-label">Full Name</label>
                <input id="cf-name" name="name" type="text" required aria-required="true" aria-invalid={errors.name ? true : undefined} aria-describedby={errors.name ? 'cf-name-error' : undefined} className={`ct-input${errors.name ? ' input-error' : ''}`} placeholder="Your name" />
                {errors.name && <p id="cf-name-error" role="alert" style={{ color: 'rgba(220,80,80,0.85)', fontSize: '.72rem', marginTop: 5 }}>{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="cf-email" className="ct-label">Email Address</label>
                <input id="cf-email" name="email" type="email" required aria-required="true" aria-invalid={errors.email ? true : undefined} aria-describedby={errors.email ? 'cf-email-error' : undefined} className={`ct-input${errors.email ? ' input-error' : ''}`} placeholder="your@email.com" />
                {errors.email && <p id="cf-email-error" role="alert" style={{ color: 'rgba(220,80,80,0.85)', fontSize: '.72rem', marginTop: 5 }}>{errors.email}</p>}
              </div>
            </div>
            <div style={{ marginBottom: 18 }}>
              <label htmlFor="cf-subject" className="ct-label">Subject</label>
              <input id="cf-subject" name="subject" type="text" required aria-required="true" aria-invalid={errors.subject ? true : undefined} aria-describedby={errors.subject ? 'cf-subject-error' : undefined} className={`ct-input${errors.subject ? ' input-error' : ''}`} placeholder="What would you like to build?" />
              {errors.subject && <p id="cf-subject-error" role="alert" style={{ color: 'rgba(220,80,80,0.85)', fontSize: '.72rem', marginTop: 5 }}>{errors.subject}</p>}
            </div>
            <div style={{ marginBottom: 24 }}>
              <label htmlFor="cf-msg" className="ct-label">Message</label>
              <textarea id="cf-msg" name="message" rows={5} required aria-required="true" aria-invalid={errors.message ? true : undefined} aria-describedby={errors.message ? 'cf-msg-error' : undefined} className={`ct-input${errors.message ? ' input-error' : ''}`} style={{ resize: 'none' }} placeholder="Tell me about your project, goals, and timeline..." />
              {errors.message && <p id="cf-msg-error" role="alert" style={{ color: 'rgba(220,80,80,0.85)', fontSize: '.72rem', marginTop: 5 }}>{errors.message}</p>}
            </div>
            <button type="submit" disabled={status === 'loading'} style={{ width: '100%', fontFamily: "'Outfit',sans-serif", fontSize: '.88rem', fontWeight: 700, background: '#D4B15A', color: '#071126', padding: '15px 28px', borderRadius: 999, border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9, letterSpacing: '.04em', boxShadow: '0 0 28px rgba(212,177,90,0.35),0 4px 18px rgba(212,177,90,0.2)', animation: 'ctGlowPulse 2.8s ease-in-out infinite' }}>
              <Send style={{ width: 16, height: 16 }} />
              {status === 'loading' ? 'Sending…' : 'Send Message'}
            </button>
            {msg && <p role="status" aria-live="polite" style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.8rem', textAlign: 'center', marginTop: '1rem', fontWeight: 500, color: '#8FA8D6' }}>{msg}</p>}
          </form>
        </div>

        {/* Direct contact links */}
        <div ref={addRevealRef} className="ct-reveal" style={{ marginBottom: '2rem' }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.6rem', fontWeight: 600, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(143,168,214,0.45)', textAlign: 'center', marginBottom: '1.25rem' }}>Or reach me directly through</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="mailto:zefanya.kharisma@gmail.com" className="ct-link-card">
              <div className="ct-link-icon"><Mail style={{ width: 20, height: 20, color: '#6FA8FF' }} /></div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 500, color: '#8FA8D6' }}>Email</span>
            </a>
            <a href="https://www.linkedin.com/in/zefanyakharisma" target="_blank" rel="noopener noreferrer" className="ct-link-card">
              <div className="ct-link-icon" style={{ background: 'rgba(212,177,90,0.08)', borderColor: 'rgba(212,177,90,0.2)' }}><Linkedin style={{ width: 20, height: 20, color: '#D4B15A' }} /></div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 500, color: '#8FA8D6' }}>LinkedIn</span>
            </a>
            <a href="https://wa.me/6282139619570" target="_blank" rel="noopener noreferrer" className="ct-link-card">
              <div className="ct-link-icon" style={{ background: 'rgba(111,255,140,0.07)', borderColor: 'rgba(111,255,140,0.18)' }}><MessageCircle style={{ width: 20, height: 20, color: '#6FD88A' }} /></div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.7rem', fontWeight: 500, color: '#8FA8D6' }}>WhatsApp</span>
            </a>
            <div className="ct-link-card" style={{ cursor: 'default' }}>
              <div className="ct-link-icon" style={{ background: 'rgba(217,230,255,0.06)', borderColor: 'rgba(217,230,255,0.12)' }}><MapPin style={{ width: 20, height: 20, color: '#8FA8D6' }} /></div>
              <span style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.68rem', fontWeight: 500, color: '#8FA8D6', textAlign: 'center', lineHeight: 1.4 }}>Surabaya<br />East Java, ID</span>
            </div>
          </div>
        </div>

        {/* Response time */}
        <div ref={addRevealRef} className="ct-reveal" style={{ textAlign: 'center', padding: '16px 24px', borderRadius: 14, background: 'rgba(212,177,90,0.06)', border: '1px solid rgba(212,177,90,0.14)' }}>
          <p style={{ fontFamily: "'Outfit',sans-serif", fontSize: '.82rem', color: '#8FA8D6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
            <Clock style={{ width: 14, height: 14, color: '#D4B15A', flexShrink: 0 }} />
            I typically respond within 24–48 hours.
          </p>
        </div>
      </div>
    </div>
  )
}

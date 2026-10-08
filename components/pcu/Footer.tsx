import { contact } from '@/lib/data/profile'

export function Footer() {
  return (
    <footer className="site-footer pcu-arch-band">
      <div className="wrap">
        <div className="flex flex-wrap justify-between items-end gap-6">
          <div className="flex flex-col gap-3 max-w-[560px]">
            <span className="pcu-eyebrow text-amber">Get in touch</span>
            <h2 className="h-section">Let&apos;s build partnerships that last.</h2>
          </div>
          <a className="pcu-btn pcu-btn--accent" href="/contact">Contact me</a>
        </div>
        <div className="foot-row">
          <span>© 2026 Zefanya Kharisma Nugroho · Surabaya, Indonesia</span>
          <span>
            <a href={`mailto:${contact.email}`}>Email</a> · <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </span>
        </div>
      </div>
    </footer>
  )
}

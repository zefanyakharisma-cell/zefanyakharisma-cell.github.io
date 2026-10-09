import type { Metadata } from 'next'
import Image from 'next/image'
import { Linkedin, Mail, MapPin } from 'lucide-react'
import { Card, IconBadge, Shape } from '@/components/pcu'
import { contact } from '@/lib/data/profile'

export const metadata: Metadata = {
  title: 'Contact',
  alternates: { canonical: '/contact' },
  description: 'Open to international partnerships, collaborations and conversations about global education.',
}

export default function Contact() {
  return (
    <section className="pcu-surface-brand footer-overlap relative overflow-hidden pt-[clamp(56px,8vw,112px)]">
      <Image src="/assets/images/student-services/tailor-made/griffith-unair-2.jpg" alt="" aria-hidden fill priority sizes="100vw" className="hero-photo" />
      <div aria-hidden className="hero-glow" />
      <div data-theme="sunrise" className="contents">
        <Shape kind="ring-u" color="theme" className="w-[clamp(100px,24vw,320px)] right-[6%] !bottom-[clamp(48px,10vw,140px)]" />
      </div>
      <Shape kind="quarter-bl" color="amber" className="right-0 top-0 w-[180px] hidden sm:block" />
      <Shape kind="circle" color="cerise" className="right-[200px] top-10 w-12 hidden sm:block" />
      <div className="wrap relative !max-w-[920px] flex flex-col gap-5">
        <span className="pcu-eyebrow text-amber">Contact</span>
        <h1 className="h-page text-white">Let&apos;s talk about global education.</h1>
        <p className="lead max-w-[52ch] !text-smoke">
          I&apos;m open to international partnerships, collaborations and good conversations. Email is the fastest way to reach me.
        </p>
        <div className="grid-2 !gap-4 mt-4">
          <Card href={`mailto:${contact.email}`} bodyClassName="!flex-row items-center !gap-5">
            <IconBadge icon={Mail} />
            <span className="flex flex-col min-w-0">
              <b className="text-lg">Email</b>
              <span className="muted break-all">{contact.email}</span>
            </span>
          </Card>
          <Card href={contact.linkedin} bodyClassName="!flex-row items-center !gap-5">
            <IconBadge icon={Linkedin} />
            <span className="flex flex-col min-w-0">
              <b className="text-lg">LinkedIn</b>
              <span className="muted">{contact.linkedinHandle}</span>
            </span>
          </Card>
        </div>
        <p className="m-0 mt-2 flex items-center gap-2 text-smoke">
          <MapPin aria-hidden size={18} /> {contact.location}
        </p>
      </div>
    </section>
  )
}

import type { Metadata } from 'next'
import ContactForm from '@/components/contact/ContactForm'

export const metadata: Metadata = {
  title: 'Contact — Zefanya Kharisma Nugroho',
  description: 'Open to international partnerships, collaborations, and meaningful conversations about global education.',
}

export default function Contact() {
  return <ContactForm />
}

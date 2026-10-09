/** Taxonomy and options for the Writing section (shared by public pages and the admin). */

export const streams = {
  global: { en: 'Global', id: 'Global', blurb: 'International relations and the internationalisation of higher education.' },
  people: { en: 'People', id: 'Manusia', blurb: 'Leading and supporting people in an international office.' },
  systems: { en: 'Systems', id: 'Sistem', blurb: 'System and database design behind digitalisation.' },
} as const

export const postTypes = {
  essay: { en: 'Essay', id: 'Esai' },
  reflection: { en: 'Reflection', id: 'Refleksi' },
  field_note: { en: 'Field Note', id: 'Catatan Lapangan' },
  explainer: { en: 'Explainer', id: 'Penjelasan' },
} as const

export type Stream = keyof typeof streams
export type PostType = keyof typeof postTypes
export type Lang = 'en' | 'id'
export const langs: Lang[] = ['en', 'id']
export const streamKeys = Object.keys(streams) as Stream[]
export const typeKeys = Object.keys(postTypes) as PostType[]

/** Pages a post can be linked to; each shows "Writing about this" when a post points at it. */
export const relatedPages: { href: string; label: string }[] = [
  { href: '/amerta', label: 'AMERTA' },
  { href: '/aci', label: 'ACI' },
  { href: '/aero', label: 'AERO' },
  { href: '/sim-kerjasama', label: 'SIM Kerjasama' },
  { href: '/sim-realisasi', label: 'SIM Realisasi' },
  { href: '/onboarding', label: 'Student Support' },
  { href: '/partnerships', label: 'Partnerships' },
  { href: '/strategic-meetings', label: 'Strategic Meetings' },
  { href: '/signing', label: 'MoU & MoA Signing' },
  { href: '/mou', label: 'MoU / MoA' },
  { href: '/university-support', label: 'University Support' },
  { href: '/intl-grants', label: 'International Grants' },
]

export function relatedPageLabel(href: string | null): string | null {
  return relatedPages.find(p => p.href === href)?.label ?? null
}

export function postPath(slug: string, lang: Lang): string {
  return lang === 'en' ? `/writing/${slug}` : `/writing/${slug}/id`
}

export function formatDate(iso: string, lang: Lang): string {
  return new Date(iso).toLocaleDateString(lang === 'en' ? 'en-GB' : 'id-ID', {
    day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta',
  })
}

export const ui = {
  en: { minRead: 'min read', translationPending: 'Bahasa Indonesia: segera hadir', readIn: 'Baca dalam Bahasa Indonesia', contents: 'Contents', related: 'Related writing', share: 'Share', about: 'Related work', back: 'All writing' },
  id: { minRead: 'menit baca', translationPending: 'English version coming soon', readIn: 'Read in English', contents: 'Daftar isi', related: 'Tulisan terkait', share: 'Bagikan', about: 'Karya terkait', back: 'Semua tulisan' },
} as const

/** The title to show for a post in a given language, falling back to the other one. */
export function pick<T>(translations: Partial<Record<Lang, T>>, lang: Lang): { t: T; lang: Lang } | null {
  const own = translations[lang]
  if (own) return { t: own, lang }
  const other: Lang = lang === 'en' ? 'id' : 'en'
  const fallback = translations[other]
  return fallback ? { t: fallback, lang: other } : null
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80).replace(/-$/, '')
}

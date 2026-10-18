import type { Metadata } from 'next'
import type { OgSpec } from '@/components/og/OgCard'
import { DATA as aci } from '@/lib/data/aci'
import { DATA as amerta } from '@/lib/data/amerta'
import { stats } from '@/lib/data/profile'
import { themeFor } from '@/lib/nav'

export const SITE_NAME = 'Zefanya Kharisma Nugroho'

type Route = keyof typeof specs

// Share card per page: hero photo, the page's own title and one headline figure.
const specs = {
  '/': {
    eyebrow: 'International Education',
    title: 'Zefanya Kharisma Nugroho',
    stat: { value: stats.years, label: 'years in international higher education' },
    photo: '/assets/images/self-portrait/profile-pic-1.png',
    position: 'center top',
  },
  '/about-overview': {
    eyebrow: 'About',
    kicker: 'International Partnership',
    title: 'Partnerships, mobility and the systems behind them',
    stat: { value: stats.studentsPerSemester, label: 'international students a semester' },
    photo: '/assets/images/student-services/monev-tias/img-7095.jpg',
  },
  '/projects-overview': {
    eyebrow: 'Projects',
    title: 'Programs run, systems built',
    stat: { value: '5', label: 'three programs at UNAIR, two systems at PETRA' },
    photo: '/assets/images/amerta/amerta-1.jpg',
  },
  '/amerta': {
    eyebrow: 'Universitas Airlangga',
    kicker: 'Airlangga Mobility, Exchange, Research & Transfer Academic',
    title: 'AMERTA',
    stat: { value: String(amerta.all.students), label: `students from ${amerta.all.countries} countries` },
    photo: '/assets/images/amerta/img-3867.jpg',
  },
  '/aci': {
    eyebrow: 'Universitas Airlangga',
    kicker: 'Airlangga Cultural Immersion',
    title: 'ACI',
    stat: { value: String(aci.all.participants), label: `participants, ${aci.all.locations} cities in Java` },
    photo: '/assets/images/aci/aci-1.jpg',
  },
  '/aero': {
    eyebrow: 'Universitas Airlangga',
    kicker: 'Airlangga Expanding Reach & Opportunities',
    title: 'AERO 2025',
    stat: { value: '19', label: 'booths on one boulevard' },
    photo: '/assets/images/aero/aero-10.jpg',
  },
  '/sim-kerjasama': {
    eyebrow: 'Partnership system · PETRA',
    title: 'SIM Kerjasama',
    stat: { label: 'The system of record for every MoU and MoA' },
    photo: '/assets/images/partnerships/signings/talenta-karya-sentosa-1.jpg',
  },
  '/sim-realisasi': {
    eyebrow: 'Partnership system · PETRA',
    title: 'SIM Realisasi',
    stat: { label: 'Partnership activities, reported as strategic plan indicators' },
    photo: '/assets/images/partnerships/meetings/de-la-salle-1.jpg',
  },
  '/engagement': {
    eyebrow: 'International Education',
    title: 'One student at a time',
    stat: { value: stats.studentsPerSemester, label: 'international students a semester' },
    photo: '/assets/images/student-services/monev-tias/img-7092.jpg',
  },
  '/onboarding': {
    eyebrow: 'Student welfare & mobility',
    title: 'International student support',
    stat: { value: stats.studentsPerSemester, label: 'students a semester, arrival to departure' },
    photo: '/assets/images/student-services/arrival-tias-2025/arrival-tias-2025-1.jpg',
  },
  '/partnerships': {
    eyebrow: 'Global partnerships',
    title: 'Partnership development',
    stat: { value: '505+', label: 'partners across 32 countries' },
    photo: '/assets/images/student-services/tailor-made/ljmu-unair-2.jpg',
  },
  '/strategic-meetings': {
    eyebrow: 'Partnerships · PETRA',
    title: 'Strategic meeting arrangements',
    stat: { value: stats.meetingsPerMonth, label: 'partner meetings a month' },
    photo: '/assets/images/partnerships/meetings/formosa-2.jpg',
  },
  '/signing': {
    eyebrow: 'Partnerships · PETRA',
    title: 'MoU & MoA signing process',
    stat: { value: stats.agreementsPerMonth, label: 'agreements a month, final text to signed' },
    photo: '/assets/images/partnerships/signings/pgpi-2.jpg',
  },
  '/mou': {
    eyebrow: 'Agreement management',
    title: 'MoU / MoA coordination',
    stat: { value: stats.agreementsPerMonth, label: 'agreements reviewed a month' },
    photo: '/assets/images/student-services/monev-tias/img-4590.jpg',
  },
  '/university-support': {
    eyebrow: 'Partnerships · PETRA',
    title: 'University support on partnership',
    stat: { value: stats.partners, label: "partners supported across PETRA's faculties" },
    photo: '/assets/images/partnerships/support/drone-academy-2.jpg',
  },
  '/writing': {
    eyebrow: 'Writing',
    title: 'Where diplomacy, people and systems meet.',
    stat: { label: 'Essays, reflections and field notes' },
  },
  '/contact': {
    eyebrow: 'Contact',
    title: "Let's talk partnerships",
    stat: { label: 'Collaborations and conversations about global education' },
    photo: '/assets/images/student-services/tailor-made/griffith-unair-2.jpg',
  },
} satisfies Record<string, Omit<OgSpec, 'theme' | 'path'>>

export function ogSpec(route: Route): OgSpec {
  return { ...specs[route], theme: themeFor(route), path: route }
}

export function ogAlt(route: Route) {
  const { title, eyebrow } = specs[route]
  return `${title} — ${eyebrow}`
}

/** Page metadata whose Open Graph and Twitter text match the page, not the site default.
 *  `absolute` uses the title as given, without the "— name" suffix (the home page). */
export function pageMeta(
  route: Route,
  { title, description, absolute = false }: { title?: string; description: string; absolute?: boolean },
): Metadata {
  const full = title ? (absolute ? title : `${title} — ${SITE_NAME}`) : `${SITE_NAME} — International Education Professional`
  return {
    ...(title && { title: absolute ? { absolute: title } : title }),
    description,
    alternates: { canonical: route },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', url: route, title: full, description },
    twitter: { card: 'summary_large_image', title: full, description },
  }
}

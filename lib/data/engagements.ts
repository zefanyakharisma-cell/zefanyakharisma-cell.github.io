// Documented partnership engagements at PETRA, one entry per event, newest first.
// Facts here come from the event documentation only: partner, place, date and kind.

export type EngagementKind = 'meeting' | 'signing' | 'support'

export type Engagement = {
  id: string
  kind: EngagementKind
  partner: string
  /** What happened, in a few words. */
  title: string
  country: string
  /** ISO date, shown as e.g. "6 Oct 2026". */
  date: string
  photos: { src: string; alt: string }[]
}

const img = (path: string) => `/assets/images/partnerships/${path}`

export const engagements: Engagement[] = [
  {
    id: 'hketo',
    kind: 'meeting',
    partner: 'Hong Kong Economic and Trade Office',
    title: 'Visit to PETRA',
    country: 'Hong Kong',
    date: '2026-10-06',
    photos: [
      { src: img('meetings/hketo-1.jpg'), alt: 'Hong Kong Economic and Trade Office presentation on Hong Kong as an international post-secondary education hub' },
      { src: img('meetings/hketo-2.jpg'), alt: 'Souvenir exchange in front of the PETRA international collaboration wall' },
    ],
  },
  {
    id: 'formosa',
    kind: 'meeting',
    partner: 'National Formosa University',
    title: 'Partnership discussion',
    country: 'Taiwan',
    date: '2026-10-01',
    photos: [
      { src: img('meetings/formosa-2.jpg'), alt: 'National Formosa University and PETRA delegates at the partnership discussion table' },
      { src: img('meetings/formosa-1.jpg'), alt: 'PETRA students attending the National Formosa University session' },
    ],
  },
  {
    id: 'pgpi',
    kind: 'signing',
    partner: 'PGPI',
    title: 'MoU signing',
    country: 'Indonesia',
    date: '2026-09-04',
    photos: [
      { src: img('signings/pgpi-2.jpg'), alt: 'MoU signing between PETRA and PGPI in the PETRA boardroom' },
      { src: img('signings/pgpi-1.jpg'), alt: 'PETRA and PGPI delegations in discussion before the signing' },
    ],
  },
  {
    id: 'rs-surabaya',
    kind: 'signing',
    partner: 'RS Eka Candrarini & RS Bhayangkara',
    title: 'Cooperation agreement signing',
    country: 'Indonesia',
    date: '2026-08-12',
    photos: [
      { src: img('signings/rs-eka-candrarini-bhayangkara-1.jpg'), alt: 'Representatives holding the signed cooperation agreement on stage' },
    ],
  },
  {
    id: 'drone-academy',
    kind: 'support',
    partner: 'PETRA Drone Academy',
    title: 'Program launch and agreement signing',
    country: 'Indonesia',
    date: '2026-07-13',
    photos: [
      { src: img('support/drone-academy-2.jpg'), alt: 'PETRA Drone Academy launch, signed agreements presented on stage' },
      { src: img('support/drone-academy-1.jpg'), alt: 'Partners and PETRA leaders on stage at the PETRA Drone Academy launch' },
    ],
  },
  {
    id: 'de-la-salle',
    kind: 'meeting',
    partner: 'De La Salle University',
    title: 'Visit to PETRA',
    country: 'Philippines',
    date: '2026-07-08',
    photos: [
      { src: img('meetings/de-la-salle-1.jpg'), alt: 'De La Salle University and PETRA delegations in a meeting room' },
      { src: img('meetings/de-la-salle-2.jpg'), alt: 'Group photo of the De La Salle University and PETRA delegations' },
    ],
  },
]

export const engagementsOf = (kind: EngagementKind) => engagements.filter(e => e.kind === kind)

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })

import type { Metadata } from 'next'
import Image from 'next/image'
import { ClipboardList, Handshake, MapPin, MountainSnow, Star, Users } from 'lucide-react'
import { PageHero, PhotoWall, Reveal, SectionHead, Shape, Stat } from '@/components/pcu'
import AciStats from '@/components/projects/AciStats'
import { BubbleMap } from '@/components/viz/BubbleMap'
import { HeatGrid } from '@/components/viz/HeatGrid'
import { Lifecycle } from '@/components/viz/Lifecycle'
import { Treemap } from '@/components/viz/Treemap'
import { Waffle } from '@/components/viz/Waffle'
import { WorldMap } from '@/components/viz/WorldMap'
import { DATA, type Sat } from '@/lib/data/aci'
import { buildIndonesiaMap, buildWorldMap } from '@/lib/geo'

export const metadata: Metadata = {
  title: 'ACI',
  alternates: { canonical: '/aci' },
  description: 'Airlangga Cultural Immersion: 191 participants, 4 batches and 3 cities in Java, mapped and charted.',
}

const GALLERY_IMAGES = [
  '/assets/images/aci/aci-1.jpg',
  '/assets/images/aci/aci-2.jpg',
  '/assets/images/aci/aci-3.jpg',
  '/assets/images/aci/aci-4.jpg',
  '/assets/images/aci/aci-5.jpg',
  '/assets/images/aci/aci-6.jpg',
  '/assets/images/aci/aci-7.jpg',
  '/assets/images/aci/aci-8.jpg',
  '/assets/images/aci/aci-9.jpg',
  '/assets/images/aci/aci-10.jpg',
  '/assets/images/aci/aci-11.jpg',
  '/assets/images/aci/aci-12.jpg',
  '/assets/images/aci/aci-13.jpg',
  '/assets/images/aci/aci-14.jpg',
  '/assets/images/aci/aci-15.jpg',
]

const steps = [
  { icon: <MapPin size={20} aria-hidden />, title: 'Destinations', text: 'Malang, Solo and Mojokerto, each with its own cultural story.' },
  { icon: <Handshake size={20} aria-hidden />, title: 'Vendors', text: 'Hotels, transport, catering and cultural operators, under agreement.' },
  { icon: <Users size={20} aria-hidden />, title: 'Registration', text: 'Diets, emergency contacts, rooms and travel documents.' },
  { icon: <ClipboardList size={20} aria-hidden />, title: 'Budget', text: 'Planned per batch, tracked live, reconciled after.' },
  { icon: <MountainSnow size={20} aria-hidden />, title: 'On site', text: 'Schedules, briefings, logistics and participant safety.' },
  { icon: <Star size={20} aria-hidden />, title: 'Report', text: 'Attendance, spend, vendors and satisfaction, with lessons learned.' },
]

const BATCHES = [
  { key: 'b1_2024', short: '2024 Malang' },
  { key: 'b1_2025', short: '2025 Malang' },
  { key: 'b21_2025', short: '2025 Solo' },
  { key: 'b22_2025', short: '2025 Mojokerto' },
] as const

const CITIES: Record<string, [number, number]> = {
  Malang: [112.63, -7.98],
  Solo: [110.82, -7.57],
  Mojokerto: [112.43, -7.47],
}

const idr = (n: number) => `IDR ${Math.round(n / 1_000_000)}M`

export default function Aci() {
  const all = DATA.all
  const cities = buildIndonesiaMap(
    {
      Malang: (DATA.b1_2024.participants ?? 0) + (DATA.b1_2025.participants ?? 0),
      Solo: (DATA.b21_2025.participants ?? 0),
      Mojokerto: (DATA.b22_2025.participants ?? 0),
    },
    CITIES,
    { bounds: [[110.1, -6.75], [113.3, -8.35]], height: 480 },
  )
  const world = buildWorldMap(Object.fromEntries(all.nationalities.filter(n => n.country !== 'Others').map(n => [n.country, n.count])))

  const sats = BATCHES.map(b => DATA[b.key].satisfaction as NonNullable<Sat>)
  const criteria = sats[0].criteria.map(c => c.label)

  return (
    <>
      <PageHero
        back={{ href: '/projects-overview', label: 'All projects' }}
        tags={['Cultural immersion', 'Universitas Airlangga']}
        kicker="Airlangga Cultural Immersion"
        title="ACI"
        lead="Weekend cultural trips across Java, from planning to report."
      />

      <div className="wrap">
        <div className="relative h-[clamp(260px,36vw,480px)] rounded-md overflow-hidden">
          <Image src="/assets/images/aci/aci-4.jpg" alt="ACI participants on a cultural trip" fill priority sizes="(min-width: 1200px) 1100px, 100vw" className="object-cover" />
        </div>
      </div>

      <section className="section !pb-10">
        <div className="wrap grid-4 !gap-8">
          <Stat value={String(all.participants ?? 191)} label="Participants" />
          <Stat value="4" label="Batches" />
          <Stat value="25+" label="Nationalities" />
          <Stat value={idr(all.budgetTotal)} label="Total budget" />
        </div>
      </section>

      <section className="section !pt-6">
        <div className="wrap grid gap-12 lg:grid-cols-2 items-start">
          <div>
            <SectionHead eyebrow="Route" title="Three cities in Java" size="sub" />
            <Reveal><BubbleMap map={cities} unit="participants" label="ACI participants by destination city" labelTop={3} maxRadius={64} fontSize={30} labelBeside /></Reveal>
          </div>
          <div>
            <SectionHead eyebrow="Reach" title="25+ nationalities" size="sub" />
            <Reveal><WorldMap map={world} unit="participants" label="ACI participants by country" /></Reveal>
          </div>
        </div>
      </section>

      <section className="section section--smoke">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-start">
          <div className="pcu-card">
            <h3 className="!text-xl mb-5">Where the budget went</h3>
            <Treemap
              label="ACI budget by category, all batches"
              items={all.budgetCategories.map(c => ({ label: c.name, value: c.amount, display: idr(c.amount) }))}
            />
          </div>
          <div className="pcu-card">
            <h3 className="!text-xl mb-5">Who joined</h3>
            {all.gender && (
              <Waffle label="ACI participants by gender" parts={[{ label: 'Female', value: all.gender.F }, { label: 'Male', value: all.gender.M }]} />
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Feedback" title="Satisfaction, every batch" lead="Darker means closer to the top score." />
          <div className="pcu-card">
            <HeatGrid
              label="ACI satisfaction by criterion and batch"
              rows={criteria}
              cols={BATCHES.map(b => b.short)}
              values={criteria.map(c => sats.map(s => s.criteria.find(x => x.label === c)?.score ?? null))}
              max={sats.map(s => s.max)}
            />
          </div>
        </div>
      </section>

      <section className="section section--smoke relative overflow-hidden">
        <Shape kind="quarter-bl" color="teal" className="w-[120px] right-0 top-0 hidden md:block" />
        <div className="wrap">
          <SectionHead eyebrow="Process" title="Six steps per trip" />
          <Lifecycle steps={steps} label="ACI delivery process" />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Gallery" title="Moments" />
          <PhotoWall images={GALLERY_IMAGES} alt="ACI cultural immersion activity" />
        </div>
      </section>

      <AciStats />
    </>
  )
}

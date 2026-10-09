import Image from 'next/image'
import { Flag, Reveal, Tag } from '@/components/pcu'
import { type Engagement, formatDate } from '@/lib/data/engagements'

/** Documented partner events: lead photo, partner, what happened, where and when. */
export function EngagementCards({ items }: { items: Engagement[] }) {
  return (
    <ol className="m-0 p-0 list-none grid gap-6 [grid-template-columns:repeat(auto-fill,minmax(min(100%,320px),1fr))]">
      {items.map((e, i) => (
        <li key={e.id}>
          <Reveal delay={i * 60} className="pcu-card !p-0 flex flex-col h-full">
            <div className="relative aspect-[4/3] bg-smoke">
              <Image src={e.photos[0].src} alt={e.photos[0].alt} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3 p-6">
              <Tag>{e.title}</Tag>
              <h3 className="!text-xl m-0">{e.partner}</h3>
              <p className="m-0 flex items-center gap-2 text-ink-secondary text-sm">
                <Flag country={e.country} />
                <span>{e.country}</span>
                <span aria-hidden>·</span>
                <time dateTime={e.date}>{formatDate(e.date)}</time>
              </p>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  )
}

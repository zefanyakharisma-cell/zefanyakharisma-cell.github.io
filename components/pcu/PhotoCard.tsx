import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { Tag } from './Tag'

type Props = {
  href: string
  src: string
  alt: string
  tag: string
  title: string
  text?: string
  className?: string
  imagePosition?: string
  sizes?: string
  priority?: boolean
}

/** Full-bleed photo card with a midnight scrim, as on the mockup's work grid. */
export function PhotoCard({ href, src, alt, tag, title, text, className, imagePosition, sizes = '(min-width: 1024px) 33vw, 100vw', priority }: Props) {
  return (
    <Link href={href} className={cn('photo-card', className)}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} style={{ objectPosition: imagePosition }} />
      <div className="scrim" />
      <div className="body">
        <Tag outline>{tag}</Tag>
        <h3>{title}</h3>
        {text && <p>{text}</p>}
      </div>
    </Link>
  )
}

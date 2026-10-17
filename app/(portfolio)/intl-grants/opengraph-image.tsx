import { ogCard, ogContentType, ogSize } from '@/components/og/OgCard'
import { ogAlt, ogSpec } from '@/lib/og'

export const alt = ogAlt('/intl-grants')
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogCard(ogSpec('/intl-grants'))
}

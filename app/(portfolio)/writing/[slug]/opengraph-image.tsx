import { ogSize, postOgImage } from '@/components/writing/postOgImage'

export const alt = 'Writing by Zefanya Kharisma Nugroho'
export const size = ogSize
export const contentType = 'image/png'
export const revalidate = 300

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  return postOgImage((await params).slug, 'en')
}

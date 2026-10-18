import { BASE_MAPS, baseMapSvg } from '@/lib/geo'

// The map outlines are built once at build time and served as cached static files.
export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return BASE_MAPS.map(name => ({ file: `${name}.svg` }))
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params
  const svg = file.endsWith('.svg') ? baseMapSvg(file.slice(0, -4)) : null
  if (!svg) return new Response('Not found', { status: 404 })
  return new Response(svg, { headers: { 'Content-Type': 'image/svg+xml' } })
}

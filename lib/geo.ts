import 'server-only'
import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'
import world50 from 'world-atlas/countries-50m.json'

/** Site country names that differ from the atlas's names. */
const ALIASES: Record<string, string> = {
  UK: 'United Kingdom',
  USA: 'United States of America',
  'United States': 'United States of America',
  Korea: 'South Korea',
  'Timor Leste': 'Timor-Leste',
  Türkiye: 'Turkey',
}

/** Countries too small for the 110m atlas, drawn as dots. [lon, lat] */
const POINTS: Record<string, [number, number]> = {
  Singapore: [103.82, 1.35],
  'Hong Kong': [114.17, 22.32],
  Macau: [113.54, 22.2],
}

export const MAP_W = 960
export const MAP_H = 420

export type MapCountry = {
  name: string
  value: number
  /** SVG path for a country shape, or null when drawn as a dot. */
  d: string | null
  cx: number
  cy: number
}

export type WorldMapData = {
  width: number
  height: number
  /** URL of the grey land outline, drawn under the data (see baseMapSvg). */
  base: string
  countries: MapCountry[]
}

type Props = { name: string }

function featuresOf(t: Topology) {
  const topo = t as Topology<{ countries: GeometryCollection<Props> }>
  return (feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>).features
    .filter(f => f.properties.name !== 'Antarctica')
}

const all = featuresOf(world as unknown as Topology)

// Full longitude range; latitudes cropped to roughly 78°N–60°S so land fills the frame.
const projection = geoEquirectangular()
  .scale(MAP_W / (2 * Math.PI))
  .translate([MAP_W / 2, 210])
// One decimal is a tenth of a map unit: invisible at any size, and a third less path data.
const path = geoPath(projection).digits(1)

const WORLD_BASE = all.map(f => path(f) ?? '').join('')

/** Map frames for buildIndonesiaMap: [[west, north], [east, south]] bounds to zoom in (finer 50m atlas, clipped). */
const INDONESIA_FRAMES = {
  indonesia: { height: 400 },
  'east-central-java': { bounds: [[110.1, -6.75], [113.3, -8.35]], height: 480 },
} satisfies Record<string, { bounds?: [[number, number], [number, number]]; height: number }>

export type IndonesiaFrame = keyof typeof INDONESIA_FRAMES

function indonesiaFrame(name: IndonesiaFrame) {
  const { height, ...rest } = INDONESIA_FRAMES[name]
  const bounds = 'bounds' in rest ? rest.bounds : undefined
  const W = 960
  const frame: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'MultiPoint', coordinates: bounds ?? [[94.5, 6.5], [141.5, -11.5]] },
  }
  const proj = geoEquirectangular().fitExtent([[10, 10], [W - 10, height - 10]], frame)
  if (bounds) proj.clipExtent([[0, 0], [W, height]])
  return { W, H: height, proj, source: bounds ? featuresOf(world50 as unknown as Topology) : all }
}

const baseHref = (name: string) => `/maps/${name}.svg`

/** Names of the base outlines served by app/maps/[file]/route.ts. */
export const BASE_MAPS = ['world', ...Object.keys(INDONESIA_FRAMES)]

/**
 * The grey land outline of a map as a standalone SVG. Served as a static file so the
 * ~200 KB of path data isn't inlined into every page twice (HTML and hydration payload).
 */
export function baseMapSvg(name: string): string | null {
  const outline = (W: number, H: number, d: string, strokeWidth: number) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}"><path d="${d}" fill="#e2e5e9" stroke="#ffffff" stroke-width="${strokeWidth}"/></svg>`
  if (name === 'world') return outline(MAP_W, MAP_H, WORLD_BASE, 0.5)
  if (!(name in INDONESIA_FRAMES)) return null
  const { W, H, proj, source } = indonesiaFrame(name as IndonesiaFrame)
  const p = geoPath(proj).digits(1)
  const d = source
    .filter(f => ['Indonesia', 'Malaysia', 'Timor-Leste', 'Papua New Guinea', 'Brunei', 'Philippines'].includes(f.properties.name))
    .map(f => p(f) ?? '')
    .join('')
  return outline(W, H, d, 0.6)
}

/** Project counts keyed by country name into SVG-ready shapes. Runs on the server only. */
export function buildWorldMap(counts: Record<string, number>): WorldMapData {
  const countries: MapCountry[] = []
  for (const [raw, value] of Object.entries(counts)) {
    if (!value) continue
    const name = ALIASES[raw] ?? raw
    const f = all.find(x => x.properties.name === name) as Feature<Geometry, Props> | undefined
    if (f) {
      const [cx, cy] = path.centroid(f)
      countries.push({ name: raw, value, d: path(f), cx, cy })
    } else if (POINTS[raw]) {
      const [cx, cy] = projection(POINTS[raw]) ?? [0, 0]
      countries.push({ name: raw, value, d: null, cx, cy })
    } else {
      console.warn(`[geo] No map shape for "${raw}"; add it to ALIASES or POINTS.`)
    }
  }
  countries.sort((a, b) => b.value - a.value)
  return { width: MAP_W, height: MAP_H, base: baseHref('world'), countries }
}

/** Sum counts from several sources into one map input. */
export function mergeCounts(...sources: Record<string, number>[]): Record<string, number> {
  const out: Record<string, number> = {}
  for (const s of sources) for (const [k, v] of Object.entries(s)) out[k] = (out[k] ?? 0) + v
  return out
}

export type BubbleMapData = {
  width: number
  height: number
  /** URL of the grey land outline, drawn under the bubbles (see baseMapSvg). */
  base: string
  bubbles: { name: string; value: number; cx: number; cy: number }[]
}

/** Indonesia (with neighbours as context), or a zoomed frame of it, and one bubble per city. Runs on the server only. */
export function buildIndonesiaMap(
  counts: Record<string, number>,
  coords: Record<string, [number, number]>,
  frame: IndonesiaFrame = 'indonesia',
): BubbleMapData {
  const { W, H, proj } = indonesiaFrame(frame)
  const bubbles = Object.entries(counts)
    .filter(([name]) => coords[name])
    .map(([name, value]) => {
      const [cx, cy] = proj(coords[name]) ?? [0, 0]
      return { name, value, cx, cy }
    })
    .sort((a, b) => b.value - a.value)
  return { width: W, height: H, base: baseHref(frame), bubbles }
}

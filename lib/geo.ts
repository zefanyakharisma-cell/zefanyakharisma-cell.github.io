import 'server-only'
import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import type { GeometryCollection, Topology } from 'topojson-specification'
import world from 'world-atlas/countries-110m.json'

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
  base: string
  countries: MapCountry[]
}

type Props = { name: string }

const topo = world as unknown as Topology<{ countries: GeometryCollection<Props> }>
const all = (feature(topo, topo.objects.countries) as FeatureCollection<Geometry, Props>).features
  .filter(f => f.properties.name !== 'Antarctica')

// Full longitude range; latitudes cropped to roughly 78°N–60°S so land fills the frame.
const projection = geoEquirectangular()
  .scale(MAP_W / (2 * Math.PI))
  .translate([MAP_W / 2, 210])
const path = geoPath(projection)

const BASE = all.map(f => path(f) ?? '').join('')

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
    }
  }
  countries.sort((a, b) => b.value - a.value)
  return { width: MAP_W, height: MAP_H, base: BASE, countries }
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
  base: string
  bubbles: { name: string; value: number; cx: number; cy: number }[]
}

/** Indonesia (with neighbours as context) and one bubble per city. Runs on the server only. */
export function buildIndonesiaMap(counts: Record<string, number>, coords: Record<string, [number, number]>): BubbleMapData {
  const W = 960
  const H = 400
  const frame: GeoJSON.Feature = {
    type: 'Feature',
    properties: {},
    geometry: { type: 'MultiPoint', coordinates: [[94.5, 6.5], [141.5, -11.5]] },
  }
  const proj = geoEquirectangular().fitExtent([[10, 10], [W - 10, H - 10]], frame)
  const p = geoPath(proj)
  const base = all
    .filter(f => ['Indonesia', 'Malaysia', 'Timor-Leste', 'Papua New Guinea', 'Brunei', 'Philippines'].includes(f.properties.name))
    .map(f => p(f) ?? '')
    .join('')
  const bubbles = Object.entries(counts)
    .filter(([name]) => coords[name])
    .map(([name, value]) => {
      const [cx, cy] = proj(coords[name]) ?? [0, 0]
      return { name, value, cx, cy }
    })
    .sort((a, b) => b.value - a.value)
  return { width: W, height: H, base, bubbles }
}

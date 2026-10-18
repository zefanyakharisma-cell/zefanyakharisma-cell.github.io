import type { JSONContent } from '@tiptap/core'
import { SERIES, SINGLE } from '@/lib/chart'

// Charts drawn from a table in a post. Pure string output so the editor (live
// preview) and the server (stored body_html) render exactly the same markup.

export const chartTypes = ['column', 'stacked', 'bar', 'line', 'pie', 'donut'] as const
export type ChartType = (typeof chartTypes)[number]
export const seriesModes = ['columns', 'rows'] as const
export type SeriesMode = (typeof seriesModes)[number]

export type ChartAttrs = { tableId: string; type: ChartType; title: string; caption: string; seriesIn: SeriesMode }
export const chartDefaults: ChartAttrs = { tableId: '', type: 'column', title: '', caption: '', seriesIn: 'columns' }
export type ChartData = { categories: string[]; series: { label: string; values: (number | null)[]; unit: string }[] }

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, Math.max(1, n - 1))}…` : s)

function textOf(node: JSONContent): string {
  if (node.type === 'text') return node.text ?? ''
  return (node.content ?? []).map(textOf).join(' ').replace(/\s+/g, ' ').trim()
}

/** Reads "1,234.5", "1.234,5" (Indonesian), "Rp 2.000.000", "45%" or "-3" as numbers. */
export function parseNumber(raw: string): number | null {
  const neg = /^\s*[-−(]/.test(raw)
  let s = raw.replace(/[^\d.,]/g, '')
  if (!/\d/.test(s)) return null
  const dots = s.split('.').length - 1
  const commas = s.split(',').length - 1
  if (dots && commas) {
    const dec = s.lastIndexOf('.') > s.lastIndexOf(',') ? '.' : ','
    s = s.replace(dec === '.' ? /,/g : /\./g, '').replace(',', '.')
  } else if (dots + commas > 1 || /^\d{1,3}[.,]\d{3}$/.test(s)) {
    s = s.replace(/[.,]/g, '')
  } else {
    s = s.replace(',', '.')
  }
  const n = Number(s)
  if (!Number.isFinite(n)) return null
  return neg ? -n : n
}

/** Cell text of a table node as rows of strings; merged cells repeat as empty cells. */
export function tableGrid(table: JSONContent): string[][] {
  return (table.content ?? []).map(row =>
    (row.content ?? []).flatMap(cell => {
      const span = Math.max(1, Number(cell.attrs?.colspan ?? 1))
      return [textOf(cell), ...Array<string>(span - 1).fill('')]
    }),
  )
}

/** First row names the series, first column names the categories. */
export function tableData(table: JSONContent, seriesIn: SeriesMode = 'columns'): ChartData {
  let grid = tableGrid(table)
  if (seriesIn === 'rows') {
    const width = Math.max(0, ...grid.map(r => r.length))
    grid = Array.from({ length: width }, (_, c) => grid.map(r => r[c] ?? ''))
  }
  const [head = [], ...body] = grid
  const width = Math.max(head.length, ...body.map(r => r.length))
  const series = []
  for (let c = 1; c < width; c++) {
    let percent = false
    const values = body.map(r => {
      const v = parseNumber(r[c] ?? '')
      if (v !== null && (r[c] ?? '').includes('%')) percent = true
      return v
    })
    if (values.some(v => v !== null)) series.push({ label: head[c]?.trim() || `Series ${c}`, values, unit: percent ? '%' : '' })
  }
  return { categories: body.map((r, i) => r[0]?.trim() || `${i + 1}`), series }
}

function niceTicks(lo: number, hi: number): number[] {
  if (hi === lo) hi = lo + 1
  const raw = (hi - lo) / 4
  const mag = 10 ** Math.floor(Math.log10(raw))
  const f = raw / mag
  const step = (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * mag
  const ticks: number[] = []
  for (let v = Math.floor(lo / step) * step; v <= Math.ceil(hi / step) * step + step / 2; v += step) ticks.push(Number(v.toFixed(10)))
  return ticks
}

function formatter(lang: string, values: number[], unit: string) {
  const max = Math.max(0, ...values.map(Math.abs))
  const nf = new Intl.NumberFormat(lang === 'id' ? 'id-ID' : 'en-US', max >= 100000 ? { notation: 'compact', maximumFractionDigits: 1 } : { maximumFractionDigits: 2 })
  return (v: number) => `${nf.format(v)}${unit}`
}

const AXIS = '#5f6b78'
const GRID = '#e2e5e9'
const INK = '#19304b'
const LABEL = '#46505c'

/** `fmt` formats axis ticks; `val(s)` formats values of series s with its own unit. */
type Ctx = { d: ChartData; fmt: (v: number) => string; val: (s: number) => (v: number) => string; color: (i: number) => string }

const svgOpen = (w: number, h: number, label: string) =>
  `<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">`

/** Shows every k-th category label so long axes stay readable. */
const every = (n: number, max: number) => Math.max(1, Math.ceil(n / max))

function columnSvg({ d, fmt, val: vf, color }: Ctx, stacked: boolean, label: string): string {
  const W = 640, H = 340, pad = { l: 68, r: 12, t: 28, b: 44 }
  const n = d.categories.length, S = d.series.length
  const val = (s: number, i: number) => d.series[s].values[i] ?? 0
  let lo = 0, hi = 0
  for (let i = 0; i < n; i++) {
    let pos = 0, neg = 0
    for (let s = 0; s < S; s++) {
      const v = val(s, i)
      if (stacked) { if (v > 0) pos += v; else neg += v } else { hi = Math.max(hi, v); lo = Math.min(lo, v) }
    }
    if (stacked) { hi = Math.max(hi, pos); lo = Math.min(lo, neg) }
  }
  const ticks = niceTicks(lo, hi)
  const y0 = ticks[0], y1 = ticks[ticks.length - 1]
  const y = (v: number) => pad.t + (1 - (v - y0) / (y1 - y0)) * (H - pad.t - pad.b)
  const band = (W - pad.l - pad.r) / n
  const groupW = band * 0.72
  const barW = stacked ? groupW : groupW / S
  const showValues = stacked ? groupW >= 40 : barW >= 36
  const k = every(n, 12)
  let out = svgOpen(W, H, label)
  for (const t of ticks) {
    out += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="${t === 0 ? '#9aa4b0' : GRID}"/>`
    out += `<text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${AXIS}">${esc(fmt(t))}</text>`
  }
  for (let i = 0; i < n; i++) {
    const gx = pad.l + band * i + (band - groupW) / 2
    if (i % k === 0) {
      out += `<text x="${pad.l + band * (i + 0.5)}" y="${H - pad.b + 20}" text-anchor="middle" font-size="13" fill="${LABEL}">${esc(clip(d.categories[i], Math.floor((band * k) / 10)))}</text>`
    }
    let pos = 0, neg = 0
    for (let s = 0; s < S; s++) {
      const raw = d.series[s].values[i]
      if (raw === null) continue
      let top: number, bottom: number
      if (stacked) {
        if (raw >= 0) { bottom = pos; top = pos += raw } else { top = neg; bottom = neg += raw }
      } else { top = Math.max(raw, 0); bottom = Math.min(raw, 0) }
      const x = stacked ? gx : gx + s * barW
      const tip = `${d.series[s].label} · ${d.categories[i]}: ${vf(s)(raw)}`
      out += `<rect x="${x}" y="${y(top)}" width="${Math.max(barW - (S > 1 && !stacked ? 2 : 0), 1)}" height="${Math.max(y(bottom) - y(top), 0.5)}" rx="2" fill="${color(s)}"><title>${esc(tip)}</title></rect>`
      if (showValues && !stacked) {
        const ly = raw >= 0 ? y(top) - 6 : y(bottom) + 15
        out += `<text x="${x + barW / 2}" y="${ly}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(vf(s)(raw))}</text>`
      }
    }
    if (showValues && stacked && S > 0) {
      out += `<text x="${gx + groupW / 2}" y="${y(pos) - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(fmt(pos + neg))}</text>`
    }
  }
  return `${out}</svg>`
}

function barSvg({ d, fmt, val: vf, color }: Ctx, label: string): string {
  const W = 640
  const n = d.categories.length, S = d.series.length
  const longest = Math.max(...d.categories.map(c => c.length))
  const labelW = Math.min(200, Math.max(60, longest * 7.2 + 14))
  const pad = { l: labelW, r: 70, t: 8, b: 28 }
  const barH = S === 1 ? 22 : 14
  const groupH = S * barH + (S - 1) * 3
  const rowH = groupH + 16
  const H = pad.t + n * rowH + pad.b
  const values = d.series.flatMap(s => s.values.filter((v): v is number => v !== null))
  const ticks = niceTicks(Math.min(0, ...values), Math.max(0, ...values))
  const x0 = ticks[0], x1 = ticks[ticks.length - 1]
  const x = (v: number) => pad.l + ((v - x0) / (x1 - x0)) * (W - pad.l - pad.r)
  let out = svgOpen(W, H, label)
  for (const t of ticks) {
    out += `<line x1="${x(t)}" x2="${x(t)}" y1="${pad.t}" y2="${H - pad.b}" stroke="${t === 0 ? '#9aa4b0' : GRID}"/>`
    out += `<text x="${x(t)}" y="${H - 8}" text-anchor="middle" font-size="12" fill="${AXIS}">${esc(fmt(t))}</text>`
  }
  for (let i = 0; i < n; i++) {
    const gy = pad.t + i * rowH + 8
    out += `<text x="${pad.l - 10}" y="${gy + groupH / 2 + 4}" text-anchor="end" font-size="13" fill="${LABEL}">${esc(clip(d.categories[i], Math.floor((labelW - 14) / 7.2)))}</text>`
    for (let s = 0; s < S; s++) {
      const v = d.series[s].values[i]
      if (v === null) continue
      const by = gy + s * (barH + 3)
      const left = x(Math.min(v, 0)), right = x(Math.max(v, 0))
      out += `<rect x="${left}" y="${by}" width="${Math.max(right - left, 0.5)}" height="${barH}" rx="2" fill="${color(s)}"><title>${esc(`${d.series[s].label} · ${d.categories[i]}: ${vf(s)(v)}`)}</title></rect>`
      out += v >= 0
        ? `<text x="${right + 6}" y="${by + barH / 2 + 4}" font-size="12" font-weight="700" fill="${INK}">${esc(vf(s)(v))}</text>`
        : `<text x="${left - 6}" y="${by + barH / 2 + 4}" text-anchor="end" font-size="12" font-weight="700" fill="${INK}">${esc(vf(s)(v))}</text>`
    }
  }
  return `${out}</svg>`
}

function lineSvg({ d, fmt, val: vf, color }: Ctx, label: string): string {
  const W = 640, H = 320, pad = { l: 68, r: 24, t: 28, b: 40 }
  const n = d.categories.length, S = d.series.length
  const values = d.series.flatMap(s => s.values.filter((v): v is number => v !== null))
  const ticks = niceTicks(Math.min(0, ...values), Math.max(0, ...values))
  const y0 = ticks[0], y1 = ticks[ticks.length - 1]
  const innerW = W - pad.l - pad.r
  const x = (i: number) => (n === 1 ? pad.l + innerW / 2 : pad.l + (i * innerW) / (n - 1))
  const y = (v: number) => pad.t + (1 - (v - y0) / (y1 - y0)) * (H - pad.t - pad.b)
  const showValues = n * S <= 16
  const k = every(n, 12)
  let out = svgOpen(W, H, label)
  for (const t of ticks) {
    out += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(t)}" y2="${y(t)}" stroke="${t === 0 ? '#9aa4b0' : GRID}"/>`
    out += `<text x="${pad.l - 8}" y="${y(t) + 4}" text-anchor="end" font-size="12" fill="${AXIS}">${esc(fmt(t))}</text>`
  }
  d.categories.forEach((c, i) => {
    if (i % k === 0) out += `<text x="${x(i)}" y="${H - 14}" text-anchor="middle" font-size="13" fill="${LABEL}">${esc(clip(c, Math.floor(((innerW / Math.max(n - 1, 1)) * k) / 10)))}</text>`
  })
  d.series.forEach((s, si) => {
    let seg: string[] = []
    const lines: string[][] = []
    s.values.forEach((v, i) => {
      if (v === null) { if (seg.length) lines.push(seg); seg = [] } else seg.push(`${x(i)},${y(v)}`)
    })
    if (seg.length) lines.push(seg)
    for (const l of lines) out += `<polyline fill="none" stroke="${color(si)}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" points="${l.join(' ')}"/>`
    s.values.forEach((v, i) => {
      if (v === null) return
      out += `<circle cx="${x(i)}" cy="${y(v)}" r="5" fill="#ffffff" stroke="${color(si)}" stroke-width="2.5"><title>${esc(`${s.label} · ${d.categories[i]}: ${vf(si)(v)}`)}</title></circle>`
      if (showValues) out += `<text x="${x(i)}" y="${y(v) - 11}" text-anchor="middle" font-size="12" font-weight="700" fill="${INK}">${esc(vf(si)(v))}</text>`
    })
  })
  return `${out}</svg>`
}

function pieSvg(items: { label: string; v: number }[], fmt: (v: number) => string, donut: boolean, label: string): string {
  const W = 640, H = 300, cx = W / 2, cy = H / 2, r = 136, ri = donut ? 82 : 0
  const total = items.reduce((a, b) => a + b.v, 0)
  const pt = (a: number, rad: number) => `${cx + rad * Math.cos(a)} ${cy + rad * Math.sin(a)}`
  let a0 = -Math.PI / 2
  let out = svgOpen(W, H, label)
  items.forEach((it, i) => {
    const share = it.v / total
    const a1 = a0 + share * Math.PI * 2
    const tip = `<title>${esc(`${it.label}: ${fmt(it.v)} (${Math.round(share * 100)}%)`)}</title>`
    const fill = SERIES[i % SERIES.length]
    if (share >= 0.9999) {
      out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}">${tip}</circle>`
      if (ri) out += `<circle cx="${cx}" cy="${cy}" r="${ri}" fill="#ffffff"/>`
    } else {
      const large = a1 - a0 > Math.PI ? 1 : 0
      const path = ri
        ? `M ${pt(a0, r)} A ${r} ${r} 0 ${large} 1 ${pt(a1, r)} L ${pt(a1, ri)} A ${ri} ${ri} 0 ${large} 0 ${pt(a0, ri)} Z`
        : `M ${cx} ${cy} L ${pt(a0, r)} A ${r} ${r} 0 ${large} 1 ${pt(a1, r)} Z`
      out += `<path d="${path}" fill="${fill}" stroke="#ffffff" stroke-width="2">${tip}</path>`
    }
    a0 = a1
  })
  if (donut) {
    out += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="26" font-weight="700" fill="${INK}">${esc(fmt(total))}</text>`
    out += `<text x="${cx}" y="${cy + 26}" text-anchor="middle" font-size="13" fill="${AXIS}">Total</text>`
  }
  return `${out}</svg>`
}

const legend = (rows: { color: string; label: string; value?: string }[]) =>
  `<ul class="article-chart__legend">${rows.map(r => `<li><span class="article-chart__swatch" style="background:${r.color}"></span>${esc(r.label)}${r.value ? ` <span class="article-chart__value">${esc(r.value)}</span>` : ''}</li>`).join('')}</ul>`

/**
 * The full chart figure. Returns '' when the table has nothing to plot, unless
 * `placeholder` is set (the editor shows a hint instead).
 */
export function chartHtml(attrs: ChartAttrs, data: ChartData | null, lang: string, placeholder = false): string {
  const title = attrs.title.trim()
  const caption = attrs.caption.trim()
  const pie = attrs.type === 'pie' || attrs.type === 'donut'
  const items = pie && data?.series[0]
    ? data.categories.map((label, i) => ({ label, v: data.series[0].values[i] ?? 0 })).filter(it => it.v > 0)
    : []
  const empty = !data || !data.categories.length || !data.series.length || (pie && !items.length)
  if (empty) {
    return placeholder
      ? `<figure class="article-chart article-chart--empty"><p>${lang === 'id' ? 'Isi tabel tertaut dengan angka untuk menggambar grafik ini.' : 'Add numbers to the linked table to draw this chart.'}</p></figure>`
      : ''
  }
  const all = data.series.flatMap(s => s.values.filter((v): v is number => v !== null))
  const shared = data.series.every(s => s.unit === data.series[0].unit) ? data.series[0].unit : ''
  const fmt = formatter(lang, all, shared)
  const perSeries = data.series.map(s => formatter(lang, all, s.unit))
  const single = data.series.length === 1
  const ctx: Ctx = { d: data, fmt, val: s => perSeries[s], color: i => (single ? SINGLE : SERIES[i % SERIES.length]) }

  const summary = pie
    ? items.map(it => `${it.label} ${perSeries[0](it.v)}`).join(', ')
    : data.series.map((s, si) => `${s.label}: ${data.categories.map((c, i) => `${c} ${s.values[i] === null ? '–' : perSeries[si](s.values[i]!)}`).join(', ')}`).join('. ')
  const label = clip(`${title || 'Chart'}. ${summary}`, 1200)

  let svg: string
  let key = ''
  if (pie) {
    svg = pieSvg(items, perSeries[0], attrs.type === 'donut', label)
    const total = items.reduce((a, b) => a + b.v, 0)
    key = legend(items.map((it, i) => ({ color: SERIES[i % SERIES.length], label: it.label, value: `${perSeries[0](it.v)} · ${Math.round((it.v / total) * 100)}%` })))
  } else {
    svg = attrs.type === 'bar' ? barSvg(ctx, label) : attrs.type === 'line' ? lineSvg(ctx, label) : columnSvg(ctx, attrs.type === 'stacked', label)
    if (!single) key = legend(data.series.map((s, i) => ({ color: ctx.color(i), label: s.label })))
  }

  return `<figure class="article-chart article-chart--${attrs.type}">${title ? `<p class="article-chart__title">${esc(title)}</p>` : ''}${svg}${key}${caption ? `<figcaption>${esc(caption)}</figcaption>` : ''}</figure>`
}

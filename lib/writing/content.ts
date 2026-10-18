import 'server-only'
import { generateHTML } from '@tiptap/html/server'
import type { JSONContent } from '@tiptap/core'
import { editorExtensions, textAligns, textColors } from './extensions'
import { chartDefaults, chartHtml, chartTypes, seriesModes, tableData, type ChartAttrs } from './chart'
import { calloutTones, imageSizes } from './nodes'

const safeHref = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i
const safeSrc = /^(https:\/\/|\/(?!\/))/i
const safeId = /^[a-z0-9]{1,24}$/
const colors = new Set<string>(textColors.map(c => c.value))

/** Allowed values per node attribute; anything else falls back to the first entry. */
const enums: Record<string, Record<string, readonly (string | null)[]>> = {
  paragraph: { textAlign: [null, ...textAligns] },
  heading: { textAlign: [null, ...textAligns] },
  callout: { tone: calloutTones },
  image: { size: [...imageSizes].reverse() },
  chart: { type: chartTypes, seriesIn: seriesModes },
}
const texts = ['caption', 'title', 'alt']

/** Drops unsafe links and images and coerces node attributes to known values. */
export function sanitizeDoc(node: JSONContent): JSONContent {
  const out: JSONContent = { ...node }
  if (out.type === 'image' && !safeSrc.test(String(out.attrs?.src ?? ''))) return { type: 'paragraph' }
  if (out.attrs) {
    const attrs = { ...out.attrs }
    for (const [key, allowed] of Object.entries(enums[out.type ?? ''] ?? {})) {
      if (!allowed.includes(attrs[key] ?? null)) attrs[key] = allowed[0]
    }
    for (const key of texts) if (typeof attrs[key] === 'string') attrs[key] = attrs[key].slice(0, 300)
    if (out.type === 'table') {
      attrs.id = safeId.test(String(attrs.id ?? '')) ? attrs.id : null
      attrs.hideOnPage = attrs.hideOnPage === true
    }
    if (out.type === 'chart' && !safeId.test(String(attrs.tableId ?? ''))) attrs.tableId = ''
    out.attrs = attrs
  }
  if (out.marks) {
    out.marks = out.marks
      .filter(m => m.type !== 'link' || safeHref.test(String(m.attrs?.href ?? '')))
      .map(m => (m.type === 'textStyle' ? { type: 'textStyle', attrs: { color: colors.has(String(m.attrs?.color)) ? m.attrs!.color : null } } : m))
      .filter(m => m.type !== 'textStyle' || m.attrs?.color)
  }
  if (out.content) out.content = out.content.map(sanitizeDoc)
  return out
}

function walk(node: JSONContent, visit: (n: JSONContent) => void) {
  visit(node)
  node.content?.forEach(c => walk(c, visit))
}

export function docToHtml(doc: JSONContent, lang = 'en'): string {
  const tables = new Map<string, JSONContent>()
  const charts: ChartAttrs[] = []
  walk(doc, n => {
    if (n.type === 'table' && n.attrs?.id && !tables.has(n.attrs.id)) tables.set(n.attrs.id, n)
    if (n.type === 'chart') charts.push({ ...chartDefaults, ...n.attrs } as ChartAttrs)
  })
  let i = 0
  return generateHTML(doc, editorExtensions)
    .replace(/<div data-chart-slot=""[^>]*><\/div>/g, () => {
      const attrs = charts[i++]
      const table = attrs && tables.get(attrs.tableId)
      return table ? chartHtml(attrs, tableData(table, attrs.seriesIn), lang) : ''
    })
    .replace(
      /<div class="table-scroll" data-hide-on-page="true">([\s\S]*?<\/table>)<\/div>/g,
      `<details class="article-data"><summary>${lang === 'id' ? 'Lihat data grafik' : 'Show the chart data'}</summary><div class="table-scroll">$1</div></details>`,
    )
    .replace(/<input type="checkbox"/g, '<input type="checkbox" disabled')
}

export function docText(doc: JSONContent): string {
  if (doc.type === 'text') return doc.text ?? ''
  const own = ['caption', 'title'].map(k => doc.attrs?.[k]).filter(Boolean).join(' ')
  return [own, ...(doc.content ?? []).map(docText)].join(' ')
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

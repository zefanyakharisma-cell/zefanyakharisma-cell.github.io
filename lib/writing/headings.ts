function slugifyHeading(text: string): string {
  return text.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'section'
}

const decode = (s: string) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'")

/** Adds ids to h2/h3 in the stored HTML and returns the table of contents. */
export function withHeadingIds(html: string): { html: string; toc: { id: string; text: string; level: 2 | 3 }[] } {
  const toc: { id: string; text: string; level: 2 | 3 }[] = []
  const used = new Map<string, number>()
  const out = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_, level: string, inner: string) => {
    const text = decode(inner).trim()
    let id = slugifyHeading(text)
    const n = used.get(id) ?? 0
    used.set(id, n + 1)
    if (n) id = `${id}-${n + 1}`
    toc.push({ id, text, level: level === '2' ? 2 : 3 })
    return `<h${level} id="${id}">${inner}</h${level}>`
  })
  return { html: out, toc }
}

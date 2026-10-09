import 'server-only'
import { generateHTML } from '@tiptap/html/server'
import type { JSONContent } from '@tiptap/core'
import { editorExtensions } from './extensions'

const safeHref = /^(https?:\/\/|mailto:|\/(?!\/)|#)/i
const safeSrc = /^(https:\/\/|\/(?!\/))/i

/** Drops links and images whose URL is not http(s), mailto, a site path or an anchor. */
export function sanitizeDoc(node: JSONContent): JSONContent {
  const out: JSONContent = { ...node }
  if (out.type === 'image' && !safeSrc.test(String(out.attrs?.src ?? ''))) return { type: 'paragraph' }
  if (out.marks) {
    out.marks = out.marks.filter(m => m.type !== 'link' || safeHref.test(String(m.attrs?.href ?? '')))
  }
  if (out.content) out.content = out.content.map(sanitizeDoc)
  return out
}

export function docToHtml(doc: JSONContent): string {
  return generateHTML(doc, editorExtensions)
}

export function docText(doc: JSONContent): string {
  if (doc.type === 'text') return doc.text ?? ''
  return (doc.content ?? []).map(docText).join(' ')
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 220))
}

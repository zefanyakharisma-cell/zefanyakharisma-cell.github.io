import { mergeAttributes, Node } from '@tiptap/core'
import Image from '@tiptap/extension-image'
import { Table, TableCell, TableHeader } from '@tiptap/extension-table'
import { Plugin } from '@tiptap/pm/state'
import { chartTypes, seriesModes } from './chart'

// Custom nodes for the post editor. Each renders the same HTML in the editor
// and on save; charts render as a slot that docToHtml fills with the SVG.

export const calloutTones = ['note', 'tip', 'warning'] as const
export type CalloutTone = (typeof calloutTones)[number]
export const imageSizes = ['small', 'medium', 'full'] as const
export type ImageSize = (typeof imageSizes)[number]

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    callout: { toggleCallout: (tone: CalloutTone) => ReturnType }
  }
}

export const newId = () => Math.random().toString(36).slice(2, 10)

const dataAttr = (name: string, fallback: string) => ({
  default: fallback,
  parseHTML: (el: HTMLElement) => el.getAttribute(`data-${name}`) ?? fallback,
  renderHTML: (attrs: Record<string, unknown>) => ({ [`data-${name}`]: attrs[name.replace(/-(\w)/g, (_, c: string) => c.toUpperCase())] }),
})

/** Highlighted note / tip / warning box. */
export const Callout = Node.create({
  name: 'callout',
  group: 'block',
  content: '(paragraph | bulletList | orderedList | taskList)+',
  defining: true,
  addAttributes() {
    return { tone: dataAttr('tone', 'note') }
  },
  parseHTML() {
    return [{ tag: 'aside[data-tone]' }]
  },
  renderHTML({ node, HTMLAttributes }) {
    return ['aside', mergeAttributes(HTMLAttributes, { class: `callout callout--${node.attrs.tone}`, role: 'note' }), 0]
  },
  addCommands() {
    return {
      toggleCallout: tone => ({ editor, commands }) => {
        if (editor.isActive(this.name, { tone })) return commands.lift(this.name)
        if (editor.isActive(this.name)) return commands.updateAttributes(this.name, { tone })
        return commands.wrapIn(this.name, { tone })
      },
    }
  },
})

/** A chart linked to a table in the same post by the table's id. */
export const Chart = Node.create({
  name: 'chart',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
  addAttributes() {
    return {
      tableId: dataAttr('table-id', ''),
      type: dataAttr('type', chartTypes[0]),
      title: dataAttr('title', ''),
      caption: dataAttr('caption', ''),
      seriesIn: dataAttr('series-in', seriesModes[0]),
    }
  },
  parseHTML() {
    return [{ tag: 'div[data-chart-slot]' }]
  },
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes({ 'data-chart-slot': '' }, HTMLAttributes)]
  },
})

/** Tables carry a stable id (for charts), a caption and a "data only" flag. */
export const PostTable = Table.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      id: { default: null, parseHTML: el => el.getAttribute('data-table-id'), renderHTML: a => (a.id ? { 'data-table-id': a.id } : {}) },
      caption: { default: '', rendered: false },
      hideOnPage: { default: false, rendered: false },
    }
  },
  renderHTML(props) {
    const [tag, attrs, ...rest] = this.parent!(props) as [string, Record<string, string>, ...unknown[]]
    const { caption, hideOnPage } = props.node.attrs
    const table = [tag, attrs, ...(caption ? [['caption', caption]] : []), ...rest]
    return ['div', hideOnPage ? { class: 'table-scroll', 'data-hide-on-page': 'true' } : { class: 'table-scroll' }, table] as never
  },
  addProseMirrorPlugins() {
    return [
      ...(this.parent?.() ?? []),
      // Copy-pasted tables would share an id; give each copy its own.
      new Plugin({
        appendTransaction: (trs, _old, state) => {
          if (!trs.some(t => t.docChanged)) return null
          const seen = new Set<string>()
          const tr = state.tr
          state.doc.descendants((node, pos) => {
            if (node.type.name !== this.name) return
            const id = node.attrs.id as string | null
            if (id && seen.has(id)) tr.setNodeMarkup(pos, undefined, { ...node.attrs, id: newId() })
            if (id) seen.add(id)
            return false
          })
          return tr.docChanged ? tr : null
        },
      }),
    ]
  },
})

const cellContent = '(paragraph | bulletList | orderedList)+'
export const PostTableCell = TableCell.extend({ content: cellContent })
export const PostTableHeader = TableHeader.extend({ content: cellContent })

/** Images with an optional caption and display width. */
export const PostImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: { default: '', rendered: false },
      size: { default: 'full', rendered: false },
    }
  },
  renderHTML({ node, HTMLAttributes }) {
    const img = ['img', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)]
    const { caption, size } = node.attrs
    if (!caption && size === 'full') return img as never
    return ['figure', { class: `article-figure article-figure--${size}` }, img, ...(caption ? [['figcaption', caption]] : [])] as never
  },
})

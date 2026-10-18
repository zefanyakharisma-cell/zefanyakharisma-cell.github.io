'use client'

import type { Editor } from '@tiptap/react'
import { NodeSelection } from '@tiptap/pm/state'
import {
  ArrowRightLeft, BetweenHorizontalEnd, BetweenHorizontalStart, BetweenVerticalEnd, BetweenVerticalStart,
  ChartBar as ChartBarIcon, ChartColumn, ChartColumnStacked, ChartLine, ChartPie, Columns2, Donut, Rows2, Table2,
  TableCellsMerge, TableCellsSplit, Trash2, type LucideIcon,
} from 'lucide-react'
import type { ChartAttrs, ChartType } from '@/lib/writing/chart'
import { newId, type ImageSize } from '@/lib/writing/nodes'

const chip = (label: string, Icon: LucideIcon | null, run: () => void, opts: { pressed?: boolean; disabled?: boolean } = {}) => (
  <button
    key={label} type="button" className="admin-chip" aria-pressed={opts.pressed} disabled={opts.disabled}
    onMouseDown={e => e.preventDefault()} onClick={run}
  >
    {Icon && <Icon aria-hidden size={16} />}{label}
  </button>
)

/** Inserts a chart linked to the table around the cursor, right after that table. */
export function insertChartFromTable(editor: Editor) {
  const { $from } = editor.state.selection
  for (let d = $from.depth; d > 0; d--) {
    const node = $from.node(d)
    if (node.type.name !== 'table') continue
    const tr = editor.state.tr
    let id = node.attrs.id as string | null
    if (!id) {
      id = newId()
      tr.setNodeMarkup($from.before(d), undefined, { ...node.attrs, id })
    }
    const at = $from.after(d)
    tr.insert(at, editor.schema.nodes.chart.create({ tableId: id }))
    tr.setSelection(NodeSelection.create(tr.doc, at))
    editor.view.dispatch(tr.scrollIntoView())
    editor.commands.focus()
    return
  }
}

/** Inserts a small sample table with a chart drawn from it. */
export function insertSampleChart(editor: Editor, lang: string) {
  const id = newId()
  const rows = lang === 'id'
    ? [['Kategori', 'Seri 1', 'Seri 2'], ['A', '4', '6'], ['B', '7', '5'], ['C', '9', '8']]
    : [['Category', 'Series 1', 'Series 2'], ['A', '4', '6'], ['B', '7', '5'], ['C', '9', '8']]
  editor.chain().focus().insertContent([
    {
      type: 'table',
      attrs: { id },
      content: rows.map((r, ri) => ({
        type: 'tableRow',
        content: r.map(text => ({ type: ri === 0 ? 'tableHeader' : 'tableCell', content: [{ type: 'paragraph', content: [{ type: 'text', text }] }] })),
      })),
    },
    { type: 'chart', attrs: { tableId: id } },
  ]).run()
}

type TableState = { caption: string; hideOnPage: boolean; canMerge: boolean; canSplit: boolean }

export function TableBar({ editor, table }: { editor: Editor; table: TableState }) {
  const chain = () => editor.chain().focus()
  const setAttr = (attrs: Record<string, unknown>) => editor.chain().updateAttributes('table', attrs).run()
  return (
    <div className="admin-contextbar" role="toolbar" aria-label="Table tools">
      <span className="admin-contextbar__label"><Table2 aria-hidden size={16} /> Table</span>
      {chip('Row above', BetweenHorizontalStart, () => chain().addRowBefore().run())}
      {chip('Row below', BetweenHorizontalEnd, () => chain().addRowAfter().run())}
      {chip('Delete row', Rows2, () => chain().deleteRow().run())}
      {chip('Column left', BetweenVerticalStart, () => chain().addColumnBefore().run())}
      {chip('Column right', BetweenVerticalEnd, () => chain().addColumnAfter().run())}
      {chip('Delete column', Columns2, () => chain().deleteColumn().run())}
      {chip('Merge cells', TableCellsMerge, () => chain().mergeCells().run(), { disabled: !table.canMerge })}
      {chip('Split cell', TableCellsSplit, () => chain().splitCell().run(), { disabled: !table.canSplit })}
      {chip('Header row', null, () => chain().toggleHeaderRow().run())}
      {chip('Header column', null, () => chain().toggleHeaderColumn().run())}
      <label className="admin-contextbar__field">
        Caption
        <input className="admin-input admin-input--sm" value={table.caption} maxLength={300} placeholder="Optional" onChange={e => setAttr({ caption: e.target.value })} />
      </label>
      <label className="admin-check admin-check--sm">
        <input type="checkbox" checked={table.hideOnPage} onChange={e => setAttr({ hideOnPage: e.target.checked })} />
        Data only (readers see the chart; the table folds away)
      </label>
      {chip('Make chart from this table', ChartColumn, () => insertChartFromTable(editor))}
      {chip('Delete table', Trash2, () => chain().deleteTable().run())}
    </div>
  )
}

const chartOptions: { type: ChartType; label: string; Icon: LucideIcon }[] = [
  { type: 'column', label: 'Column', Icon: ChartColumn },
  { type: 'stacked', label: 'Stacked', Icon: ChartColumnStacked },
  { type: 'bar', label: 'Bar', Icon: ChartBarIcon },
  { type: 'line', label: 'Line', Icon: ChartLine },
  { type: 'pie', label: 'Pie', Icon: ChartPie },
  { type: 'donut', label: 'Donut', Icon: Donut },
]

export function ChartBar({ editor, chart }: { editor: Editor; chart: ChartAttrs }) {
  const setAttr = (attrs: Partial<ChartAttrs>) => editor.chain().updateAttributes('chart', attrs).run()
  const goToTable = () => {
    let at = -1
    editor.state.doc.descendants((n, pos) => {
      if (at < 0 && n.type.name === 'table' && n.attrs.id === chart.tableId) at = pos
      return at < 0
    })
    if (at >= 0) editor.chain().focus().setTextSelection(at + 4).scrollIntoView().run()
  }
  return (
    <div className="admin-contextbar" role="toolbar" aria-label="Chart tools">
      <span className="admin-contextbar__label"><ChartColumn aria-hidden size={16} /> Chart</span>
      {chartOptions.map(o => chip(o.label, o.Icon, () => setAttr({ type: o.type }), { pressed: chart.type === o.type }))}
      {chip(chart.seriesIn === 'columns' ? 'Series: columns' : 'Series: rows', ArrowRightLeft, () => setAttr({ seriesIn: chart.seriesIn === 'columns' ? 'rows' : 'columns' }))}
      <label className="admin-contextbar__field">
        Title
        <input className="admin-input admin-input--sm" value={chart.title} maxLength={300} placeholder="Optional" onChange={e => setAttr({ title: e.target.value })} />
      </label>
      <label className="admin-contextbar__field">
        Caption / source
        <input className="admin-input admin-input--sm" value={chart.caption} maxLength={300} placeholder="Optional" onChange={e => setAttr({ caption: e.target.value })} />
      </label>
      {chip('Edit data in table', Table2, goToTable)}
      {chip('Delete chart', Trash2, () => editor.chain().focus().deleteSelection().run())}
    </div>
  )
}

export function ImageBar({ editor, image }: { editor: Editor; image: { alt: string; caption: string; size: ImageSize } }) {
  const setAttr = (attrs: Record<string, unknown>) => editor.chain().updateAttributes('image', attrs).run()
  return (
    <div className="admin-contextbar" role="toolbar" aria-label="Image tools">
      <span className="admin-contextbar__label">Image</span>
      {(['small', 'medium', 'full'] as const).map(size => chip(size === 'full' ? 'Full width' : size === 'medium' ? 'Medium' : 'Small', null, () => setAttr({ size }), { pressed: image.size === size }))}
      <label className="admin-contextbar__field">
        Caption
        <input className="admin-input admin-input--sm" value={image.caption} maxLength={300} placeholder="Optional" onChange={e => setAttr({ caption: e.target.value })} />
      </label>
      <label className="admin-contextbar__field">
        Alt text
        <input className="admin-input admin-input--sm" value={image.alt} maxLength={300} placeholder="Describe the image" onChange={e => setAttr({ alt: e.target.value })} />
      </label>
      {chip('Delete image', Trash2, () => editor.chain().focus().deleteSelection().run())}
    </div>
  )
}

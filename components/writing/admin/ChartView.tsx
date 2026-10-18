'use client'

import { NodeViewWrapper, useEditorState, type NodeViewProps } from '@tiptap/react'
import { chartDefaults, chartHtml, tableData, type ChartAttrs } from '@/lib/writing/chart'

/** Live chart inside the editor: redraws whenever its linked table changes. */
export function ChartView({ editor, node, selected }: NodeViewProps) {
  const attrs = { ...chartDefaults, ...node.attrs } as ChartAttrs
  const attributes = editor.options.editorProps.attributes
  const lang = (typeof attributes === 'object' && attributes?.lang) || 'en'
  const data = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      let found: string | null = null
      e.state.doc.descendants(n => {
        if (found !== null) return false
        if (n.type.name === 'table' && attrs.tableId && n.attrs.id === attrs.tableId) found = JSON.stringify(tableData(n.toJSON(), attrs.seriesIn))
        return n.type.name !== 'table'
      })
      return found
    },
  })

  return (
    <NodeViewWrapper className={`chart-node${selected ? ' is-selected' : ''}`} data-drag-handle>
      {data === null ? (
        <p className="chart-node__missing">{lang === 'id' ? 'Tabel untuk grafik ini sudah dihapus. Hapus grafik ini atau buat ulang dari sebuah tabel.' : 'The table this chart uses was deleted. Remove this chart or make a new one from a table.'}</p>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: chartHtml(attrs, JSON.parse(data), lang, true) }} />
      )}
    </NodeViewWrapper>
  )
}

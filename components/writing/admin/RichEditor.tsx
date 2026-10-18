'use client'

import { useRef } from 'react'
import type { JSONContent } from '@tiptap/core'
import { NodeSelection, TextSelection } from '@tiptap/pm/state'
import { EditorContent, ReactNodeViewRenderer, useEditor, useEditorState } from '@tiptap/react'
import { Placeholder } from '@tiptap/extensions'
import {
  AlignCenter, AlignJustify, AlignLeft, AlignRight, Baseline, Bold, ChartColumn, Heading2, Heading3, Highlighter, ImagePlus, Info,
  Italic, Lightbulb, Link2, List, ListChecks, ListOrdered, Minus, Pilcrow, Quote, Redo2, SquareCode, Strikethrough, Subscript,
  Superscript, Table, TriangleAlert, Underline, Undo2,
} from 'lucide-react'
import { editorExtensions, textAligns, textColors } from '@/lib/writing/extensions'
import { Chart, type CalloutTone } from '@/lib/writing/nodes'
import { chartDefaults, type ChartAttrs } from '@/lib/writing/chart'
import { ChartView } from './ChartView'
import { ChartBar, ImageBar, insertChartFromTable, insertSampleChart, TableBar } from './ContextBars'
import { TableSizePicker, ToolbarMenu } from './ToolbarMenu'

type Props = {
  content: JSONContent
  onChange: (doc: JSONContent) => void
  onUploadImage: (file: File) => Promise<string>
  onError: (message: string) => void
  label: string
  lang: string
}

const LiveChart = Chart.extend({ addNodeView: () => ReactNodeViewRenderer(ChartView) })
const extensions = editorExtensions.map(e => (e.name === 'chart' ? LiveChart : e))

const alignIcons = { left: AlignLeft, center: AlignCenter, right: AlignRight, justify: AlignJustify }
const callouts: { tone: CalloutTone; label: string; Icon: typeof Info }[] = [
  { tone: 'note', label: 'Note box', Icon: Info },
  { tone: 'tip', label: 'Tip box', Icon: Lightbulb },
  { tone: 'warning', label: 'Warning box', Icon: TriangleAlert },
]

/** Tiptap editor with a toolbar; the schema matches the HTML generated on save. */
export function RichEditor({ content, onChange, onUploadImage, onError, label, lang }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const editor = useEditor({
    extensions: [...extensions, Placeholder.configure({ placeholder: lang === 'id' ? 'Mulai menulis…' : 'Start writing…' })],
    content,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: 'article-body', 'aria-label': label, lang },
      // After typing in a chart or image field the chart/image stays selected even when
      // the next click lands in text; move the cursor there so typing can't replace it.
      handleClick: (view, pos) => {
        if (!(view.state.selection instanceof NodeSelection) || !view.state.doc.resolve(pos).parent.inlineContent) return false
        view.dispatch(view.state.tr.setSelection(TextSelection.create(view.state.doc, pos)))
        return true
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => {
      if (!e) return null
      const sel = e.state.selection
      const selected = sel instanceof NodeSelection ? sel.node : null
      const inTable = e.isActive('table')
      const table = inTable ? e.getAttributes('table') : null
      return {
        p: e.isActive('paragraph'),
        h2: e.isActive('heading', { level: 2 }),
        h3: e.isActive('heading', { level: 3 }),
        bold: e.isActive('bold'),
        italic: e.isActive('italic'),
        underline: e.isActive('underline'),
        strike: e.isActive('strike'),
        sup: e.isActive('superscript'),
        sub: e.isActive('subscript'),
        highlight: e.isActive('highlight'),
        color: (e.getAttributes('textStyle').color as string | undefined) ?? null,
        align: textAligns.find(a => a !== 'left' && e.isActive({ textAlign: a })) ?? 'left',
        link: e.isActive('link'),
        bullet: e.isActive('bulletList'),
        ordered: e.isActive('orderedList'),
        task: e.isActive('taskList'),
        quote: e.isActive('blockquote'),
        code: e.isActive('codeBlock'),
        callout: e.isActive('callout') ? (e.getAttributes('callout').tone as CalloutTone) : null,
        table: table && {
          caption: String(table.caption ?? ''),
          hideOnPage: Boolean(table.hideOnPage),
          canMerge: e.can().mergeCells(),
          canSplit: e.can().splitCell(),
        },
        chart: selected?.type.name === 'chart' ? ({ ...chartDefaults, ...selected.attrs } as ChartAttrs) : null,
        image: selected?.type.name === 'image'
          ? { alt: String(selected.attrs.alt ?? ''), caption: String(selected.attrs.caption ?? ''), size: selected.attrs.size }
          : null,
      }
    },
  })
  if (!editor) return <div className="admin-editor"><div className="ProseMirror" /></div>

  const chain = () => editor.chain().focus()
  const setLink = () => {
    const previous = editor.getAttributes('link').href as string | undefined
    const href = window.prompt('Link URL (leave empty to remove)', previous ?? 'https://')
    if (href === null) return
    if (href.trim() === '' || href === 'https://') chain().extendMarkRange('link').unsetLink().run()
    else chain().extendMarkRange('link').setLink({ href: href.trim() }).run()
  }
  const addImage = async (file: File | undefined) => {
    if (!file) return
    try {
      const src = await onUploadImage(file)
      const alt = window.prompt('Describe the image for screen readers (alt text)', '') ?? ''
      chain().setImage({ src, alt }).run()
    } catch (e) {
      onError(e instanceof Error ? e.message : 'Upload failed.')
    }
  }
  const addChart = () => (editor.isActive('table') ? insertChartFromTable(editor) : insertSampleChart(editor, lang))

  const btn = (title: string, active: boolean | undefined, run: () => void, Icon: typeof Bold) => (
    <button type="button" title={title} aria-label={title} aria-pressed={active ?? false} onMouseDown={e => e.preventDefault()} onClick={run}>
      <Icon aria-hidden size={18} />
    </button>
  )
  const item = (text: string, active: boolean, run: () => void, close: () => void, Icon?: typeof Bold) => (
    <button key={text} type="button" className="admin-menu__item" aria-pressed={active} onMouseDown={e => e.preventDefault()} onClick={() => { run(); close() }}>
      {Icon && <Icon aria-hidden size={16} />}{text}
    </button>
  )
  const AlignIcon = alignIcons[state?.align ?? 'left']

  return (
    <div className="admin-editor">
      <div className="admin-toolbar-wrap">
        <div className="admin-toolbar" role="toolbar" aria-label={`${label} formatting`}>
          {btn('Paragraph', state?.p, () => chain().setParagraph().run(), Pilcrow)}
          {btn('Heading', state?.h2, () => chain().toggleHeading({ level: 2 }).run(), Heading2)}
          {btn('Subheading', state?.h3, () => chain().toggleHeading({ level: 3 }).run(), Heading3)}
          <span className="sep" aria-hidden />
          {btn('Bold', state?.bold, () => chain().toggleBold().run(), Bold)}
          {btn('Italic', state?.italic, () => chain().toggleItalic().run(), Italic)}
          {btn('Underline', state?.underline, () => chain().toggleUnderline().run(), Underline)}
          {btn('Strikethrough', state?.strike, () => chain().toggleStrike().run(), Strikethrough)}
          {btn('Superscript', state?.sup, () => chain().toggleSuperscript().run(), Superscript)}
          {btn('Subscript', state?.sub, () => chain().toggleSubscript().run(), Subscript)}
          {btn('Highlight', state?.highlight, () => chain().toggleHighlight().run(), Highlighter)}
          <ToolbarMenu title="Text colour" icon={Baseline} active={Boolean(state?.color)}>
            {close => (
              <div className="admin-swatches">
                {textColors.map(c => (
                  <button
                    key={c.value} type="button" title={c.name} aria-label={c.name} aria-pressed={state?.color === c.value} style={{ background: c.value }}
                    onMouseDown={e => e.preventDefault()} onClick={() => { chain().setColor(c.value).run(); close() }}
                  />
                ))}
                {item('Default colour', !state?.color, () => chain().unsetColor().run(), close)}
              </div>
            )}
          </ToolbarMenu>
          {btn('Link', state?.link, setLink, Link2)}
          <span className="sep" aria-hidden />
          <ToolbarMenu title="Alignment" icon={AlignIcon} active={state?.align !== 'left'}>
            {close => textAligns.map(a => item(a[0].toUpperCase() + a.slice(1), state?.align === a, () => chain().setTextAlign(a).run(), close, alignIcons[a]))}
          </ToolbarMenu>
          {btn('Bulleted list', state?.bullet, () => chain().toggleBulletList().run(), List)}
          {btn('Numbered list', state?.ordered, () => chain().toggleOrderedList().run(), ListOrdered)}
          {btn('Checklist', state?.task, () => chain().toggleTaskList().run(), ListChecks)}
          {btn('Quote', state?.quote, () => chain().toggleBlockquote().run(), Quote)}
          <ToolbarMenu title="Callout box" icon={Info} active={Boolean(state?.callout)}>
            {close => callouts.map(c => item(c.label, state?.callout === c.tone, () => chain().toggleCallout(c.tone).run(), close, c.Icon))}
          </ToolbarMenu>
          {btn('Code block', state?.code, () => chain().toggleCodeBlock().run(), SquareCode)}
          {btn('Divider', false, () => chain().setHorizontalRule().run(), Minus)}
          <span className="sep" aria-hidden />
          {btn('Image', false, () => fileRef.current?.click(), ImagePlus)}
          <ToolbarMenu title="Table" icon={Table}>
            {close => <TableSizePicker onPick={(rows, cols) => { chain().insertTable({ rows, cols, withHeaderRow: true }).run(); close() }} />}
          </ToolbarMenu>
          {btn(state?.table ? 'Chart from this table' : 'Chart (adds a data table)', false, addChart, ChartColumn)}
          <span className="sep" aria-hidden />
          {btn('Undo', false, () => chain().undo().run(), Undo2)}
          {btn('Redo', false, () => chain().redo().run(), Redo2)}
          <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { void addImage(e.target.files?.[0]); e.target.value = '' }} />
        </div>
        {state?.chart ? <ChartBar editor={editor} chart={state.chart} />
          : state?.image ? <ImageBar editor={editor} image={state.image} />
          : state?.table ? <TableBar editor={editor} table={state.table} />
          : null}
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

'use client'

import { useRef } from 'react'
import type { JSONContent } from '@tiptap/core'
import { EditorContent, useEditor, useEditorState } from '@tiptap/react'
import { Placeholder } from '@tiptap/extensions'
import {
  Bold, Heading2, Heading3, ImagePlus, Italic, Link2, List, ListOrdered, Minus, Pilcrow, Quote, Redo2, Underline, Undo2,
} from 'lucide-react'
import { editorExtensions } from '@/lib/writing/extensions'

type Props = {
  content: JSONContent
  onChange: (doc: JSONContent) => void
  onUploadImage: (file: File) => Promise<string>
  onError: (message: string) => void
  label: string
  lang: string
}

/** Tiptap editor with a toolbar; the schema matches the HTML generated on save. */
export function RichEditor({ content, onChange, onUploadImage, onError, label, lang }: Props) {
  const fileRef = useRef<HTMLInputElement>(null)
  const editor = useEditor({
    extensions: [...editorExtensions, Placeholder.configure({ placeholder: lang === 'id' ? 'Mulai menulis…' : 'Start writing…' })],
    content,
    immediatelyRender: false,
    editorProps: { attributes: { class: 'article-body', 'aria-label': label, lang } },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
  })
  const state = useEditorState({
    editor,
    selector: ({ editor: e }) => e && ({
      p: e.isActive('paragraph'),
      h2: e.isActive('heading', { level: 2 }),
      h3: e.isActive('heading', { level: 3 }),
      bold: e.isActive('bold'),
      italic: e.isActive('italic'),
      underline: e.isActive('underline'),
      link: e.isActive('link'),
      bullet: e.isActive('bulletList'),
      ordered: e.isActive('orderedList'),
      quote: e.isActive('blockquote'),
    }),
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

  const btn = (title: string, active: boolean | undefined, run: () => void, Icon: typeof Bold) => (
    <button type="button" title={title} aria-label={title} aria-pressed={active ?? false} onMouseDown={e => e.preventDefault()} onClick={run}>
      <Icon aria-hidden size={18} />
    </button>
  )

  return (
    <div className="admin-editor">
      <div className="admin-toolbar" role="toolbar" aria-label={`${label} formatting`}>
        {btn('Paragraph', state?.p, () => chain().setParagraph().run(), Pilcrow)}
        {btn('Heading', state?.h2, () => chain().toggleHeading({ level: 2 }).run(), Heading2)}
        {btn('Subheading', state?.h3, () => chain().toggleHeading({ level: 3 }).run(), Heading3)}
        <span className="sep" aria-hidden />
        {btn('Bold', state?.bold, () => chain().toggleBold().run(), Bold)}
        {btn('Italic', state?.italic, () => chain().toggleItalic().run(), Italic)}
        {btn('Underline', state?.underline, () => chain().toggleUnderline().run(), Underline)}
        {btn('Link', state?.link, setLink, Link2)}
        <span className="sep" aria-hidden />
        {btn('Bulleted list', state?.bullet, () => chain().toggleBulletList().run(), List)}
        {btn('Numbered list', state?.ordered, () => chain().toggleOrderedList().run(), ListOrdered)}
        {btn('Quote', state?.quote, () => chain().toggleBlockquote().run(), Quote)}
        {btn('Divider', false, () => chain().setHorizontalRule().run(), Minus)}
        {btn('Image', false, () => fileRef.current?.click(), ImagePlus)}
        <span className="sep" aria-hidden />
        {btn('Undo', false, () => chain().undo().run(), Undo2)}
        {btn('Redo', false, () => chain().redo().run(), Redo2)}
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => { void addImage(e.target.files?.[0]); e.target.value = '' }} />
      </div>
      <EditorContent editor={editor} />
    </div>
  )
}

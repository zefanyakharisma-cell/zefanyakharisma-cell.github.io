import StarterKit from '@tiptap/starter-kit'
import { TableRow } from '@tiptap/extension-table'
import { TaskItem, TaskList } from '@tiptap/extension-list'
import TextAlign from '@tiptap/extension-text-align'
import Highlight from '@tiptap/extension-highlight'
import { Color, TextStyle } from '@tiptap/extension-text-style'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import { Callout, Chart, PostImage, PostTable, PostTableCell, PostTableHeader } from './nodes'

/** Text colours: darker brand hues that all pass WCAG AA on white and on the highlight. */
export const textColors = [
  { name: 'Midnight', value: '#19304b' },
  { name: 'Blue', value: '#2a6bb3' },
  { name: 'Teal', value: '#23787b' },
  { name: 'Green', value: '#3f7a24' },
  { name: 'Orange', value: '#b8500f' },
  { name: 'Cerise', value: '#c2007a' },
] as const

export const textAligns = ['left', 'center', 'right', 'justify'] as const

/** One schema for the editor and for the HTML generated on save, so both always agree. */
export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    codeBlock: { HTMLAttributes: { class: 'article-code' } },
    link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
  }),
  PostImage.configure({ inline: false }),
  PostTable.configure({ resizable: false, View: null }),
  TableRow,
  PostTableHeader,
  PostTableCell,
  TaskList,
  TaskItem.configure({ nested: true }),
  TextAlign.configure({ types: ['heading', 'paragraph'], alignments: [...textAligns] }),
  Highlight,
  TextStyle,
  Color,
  Subscript,
  Superscript,
  Callout,
  Chart,
]

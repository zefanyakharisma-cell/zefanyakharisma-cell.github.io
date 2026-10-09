import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

/** One schema for the editor and for the HTML generated on save, so both always agree. */
export const editorExtensions = [
  StarterKit.configure({
    heading: { levels: [2, 3] },
    codeBlock: false,
    link: { openOnClick: false, autolink: true, defaultProtocol: 'https' },
  }),
  Image.configure({ inline: false }),
]

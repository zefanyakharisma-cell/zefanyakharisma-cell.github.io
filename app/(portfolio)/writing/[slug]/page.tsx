import { PostPage, postMetadata, type SlugProps } from './shared'

export const revalidate = 300

export function generateStaticParams() {
  return []
}

export const generateMetadata = (props: SlugProps) => postMetadata(props, 'en')

export default function WritingPostEn(props: SlugProps) {
  return PostPage(props, 'en')
}

import { PostPage, postMetadata, type SlugProps } from '../shared'

export const revalidate = 300

export function generateStaticParams() {
  return []
}

export const generateMetadata = (props: SlugProps) => postMetadata(props, 'id')

export default function WritingPostId(props: SlugProps) {
  return PostPage(props, 'id')
}

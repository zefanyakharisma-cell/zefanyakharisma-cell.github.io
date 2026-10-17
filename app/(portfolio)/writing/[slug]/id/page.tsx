import { PostPage, postMetadata, type SlugProps } from '../shared'
import { HtmlLang } from './HtmlLang'

export const revalidate = 300

export function generateStaticParams() {
  return []
}

export const generateMetadata = (props: SlugProps) => postMetadata(props, 'id')

export default async function WritingPostId(props: SlugProps) {
  return (
    <>
      <HtmlLang lang="id" />
      {await PostPage(props, 'id')}
    </>
  )
}

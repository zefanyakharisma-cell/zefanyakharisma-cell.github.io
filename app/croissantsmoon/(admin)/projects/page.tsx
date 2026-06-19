import type { Metadata } from 'next'
import { getAllProjects } from '@/lib/actions/cm-projects'
import ProjectsManager from '@/components/admin/ProjectsManager'

export const metadata: Metadata = { title: 'Projects' }

export default async function ProjectsAdminPage() {
  const projects = await getAllProjects()
  return <ProjectsManager initial={projects} />
}

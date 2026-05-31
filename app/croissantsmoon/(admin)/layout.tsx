import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar } from '@/components/admin/Sidebar'
import StarField from '@/components/cm/StarField'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/croissantsmoon/login')

  return (
    <div
      className="relative flex h-screen overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #030712 0%, #071126 55%, #0a1a35 100%)' }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <StarField count={70} />
      </div>
      <div className="relative z-10 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="relative z-10 flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}

import { supabaseConfigured } from '@/lib/supabase/config'
import { LoginForm } from './LoginForm'

export default async function LoginPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <div className="max-w-[420px] mx-auto flex flex-col gap-6">
      <h1 className="h-sub m-0">Sign in</h1>
      {!supabaseConfigured ? (
        <p className="admin-error">Supabase is not configured: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.</p>
      ) : (
        <>
          {error === 'not-admin' && <p className="admin-error">This account is signed in but is not allowed to write.</p>}
          <LoginForm />
        </>
      )}
    </div>
  )
}

'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { AlertCircle } from 'lucide-react'

export function LoginForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()

  // Only allow internal CroissantsMoon paths (prevents open-redirect abuse).
  const nextParam = searchParams.get('next')
  const destination = nextParam && nextParam.startsWith('/croissantsmoon/')
    ? nextParam
    : '/croissantsmoon/dashboard'

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const form = new FormData(e.currentTarget)

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: form.get('email') as string,
        password: form.get('password') as string,
      })

      if (authError) {
        setError('Invalid credentials. Please try again.')
        return
      }

      router.push(destination)
      router.refresh()
    } catch {
      setError('Connection error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="admin@croissantsmoon.studio"
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="••••••••••••"
        autoComplete="current-password"
        required
      />

      {error && (
        <div className="flex items-center gap-2 text-sm text-red-400 bg-red-400/5 border border-red-400/10 rounded-lg px-3 py-2.5">
          <AlertCircle size={13} className="flex-shrink-0" />
          {error}
        </div>
      )}

      <Button type="submit" variant="gold" loading={loading} className="w-full" size="lg">
        Sign In
      </Button>
    </form>
  )
}

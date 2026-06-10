import type { Metadata } from 'next'
import Image from 'next/image'
import { Suspense } from 'react'
import { LoginForm } from '@/components/admin/LoginForm'

export const metadata: Metadata = { title: 'Login — CroissantsMoon' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cm-black grid-bg flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm animate-cm-slide-up">
        <div className="text-center mb-10">
          <Image
            src="/croissantsmoon/cm-logo-circle.png"
            alt="CroissantsMoon"
            width={56}
            height={56}
            className="inline-block w-14 h-14 rounded-2xl border border-cm-gold/20 mb-6"
            priority
          />
          <h1 className="text-2xl font-serif font-light text-cm-white mb-2">CroissantsMoon</h1>
          <p className="text-sm text-cm-subtle">Studio Operating System</p>
        </div>

        <div className="bg-cm-surface border border-cm-border rounded-2xl p-8">
          <p className="text-xs text-cm-subtle uppercase tracking-widest mb-6">Admin Access</p>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs text-cm-muted mt-6">
          Authorized personnel only.
        </p>
      </div>
    </div>
  )
}

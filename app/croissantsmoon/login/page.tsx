import type { Metadata } from 'next'
import { LoginForm } from '@/components/admin/LoginForm'
import { Moon } from 'lucide-react'

export const metadata: Metadata = { title: 'Login — CroissantsMoon' }

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-cm-black grid-bg flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-sm animate-cm-slide-up">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-cm-gold/10 border border-cm-gold/20 mb-6">
            <Moon size={22} className="text-cm-gold" />
          </div>
          <h1 className="text-2xl font-serif font-light text-cm-white mb-2">CroissantsMoon</h1>
          <p className="text-sm text-cm-subtle">Studio Operating System</p>
        </div>

        <div className="bg-cm-surface border border-cm-border rounded-2xl p-8">
          <p className="text-xs text-cm-subtle uppercase tracking-widest mb-6">Admin Access</p>
          <LoginForm />
        </div>

        <p className="text-center text-xs text-cm-muted mt-6">
          Authorized personnel only.
        </p>
      </div>
    </div>
  )
}

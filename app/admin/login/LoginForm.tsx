'use client'

import { useActionState } from 'react'
import { signIn } from '../actions'

export function LoginForm() {
  const [state, action, pending] = useActionState(signIn, undefined)
  return (
    <form action={action} className="flex flex-col gap-5">
      <label className="admin-field">
        Email
        <input className="admin-input" type="email" name="email" autoComplete="username" required />
      </label>
      <label className="admin-field">
        Password
        <input className="admin-input" type="password" name="password" autoComplete="current-password" required />
      </label>
      {state?.error && <p className="admin-error m-0" role="alert">{state.error}</p>}
      <button type="submit" className="pcu-btn self-start" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    </form>
  )
}

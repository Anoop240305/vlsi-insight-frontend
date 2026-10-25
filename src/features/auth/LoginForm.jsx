import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useAuth } from './AuthContext.jsx'
import { DEMO_MODE } from '../../lib/api.js'

const INPUT =
  'w-full rounded-md border border-line bg-card px-3 py-2.5 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent focus:ring-2 focus:ring-accent/20'

export default function LoginForm() {
  const { login, status, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'
  const busy = status === 'authenticating'

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login(username, password, email)
    if (ok) navigate(from, { replace: true })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-ink">Username</label>
        <input id="username" type="text" autoComplete="username" required value={username}
          onChange={(e) => setUsername(e.target.value)} placeholder="engineer.id" className={INPUT} />
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">Email address</label>
        <input id="email" type="email" autoComplete="email" required value={email}
          onChange={(e) => setEmail(e.target.value)} placeholder="engineer@example.com" className={INPUT} />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">Password</label>
        <input id="password" type="password" autoComplete="current-password" required value={password}
          onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className={INPUT} />
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-fail/10 px-3 py-2 text-sm text-fail">{error}</p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="flex w-full items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? 'Signing in…' : 'Sign in'}
        {!busy && <ArrowRight size={16} />}
      </button>

      <p className="text-center text-xs text-muted">
        {DEMO_MODE ? 'Demo mode: any username, email and password signs in.' : 'Sign in with your Django account. Your email is saved to your profile.'}
      </p>
    </form>
  )
}

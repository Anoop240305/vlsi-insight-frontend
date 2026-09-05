import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock, User, ArrowRight } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { DEMO_MODE } from '../lib/api.js'
import CircuitBackground from '../components/ui/CircuitBackground.jsx'
import ChipFrame from '../components/ui/ChipFrame.jsx'

export default function Login() {
  const { login, status, error } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const from = location.state?.from?.pathname || '/dashboard'

  async function handleSubmit(e) {
    e.preventDefault()
    const ok = await login(username, password)
    if (ok) navigate(from, { replace: true })
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-substrate-950">
      <CircuitBackground />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-substrate-950/40 via-transparent to-substrate-950" />

      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="mb-8 text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-signal-400">
            Silicon Insight
          </p>
          <h1 className="mt-2 text-xl font-semibold text-ink-100">
            Vivado Report &amp; AI Insight Platform
          </h1>
          <p className="mt-1 text-sm text-ink-500">
            Sign in to reach your design's timing, power, and utilization analysis.
          </p>
        </div>

        <ChipFrame designator="U1 · AUTH">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="mb-1.5 block font-mono text-[11px] text-ink-500">
                username
              </label>
              <div className="flex items-center gap-2 rounded border border-trace bg-substrate-900 px-3 py-2.5 focus-within:border-signal-500">
                <User size={16} className="text-ink-500" />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="engineer.id"
                  className="w-full bg-transparent font-mono text-sm text-ink-100 outline-none placeholder:text-ink-500/60"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block font-mono text-[11px] text-ink-500">
                password
              </label>
              <div className="flex items-center gap-2 rounded border border-trace bg-substrate-900 px-3 py-2.5 focus-within:border-signal-500">
                <Lock size={16} className="text-ink-500" />
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent font-mono text-sm text-ink-100 outline-none placeholder:text-ink-500/60"
                />
              </div>
            </div>

            {error && (
              <p className="rounded border border-fail/30 bg-fail/10 px-3 py-2 font-mono text-xs text-fail">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={status === 'authenticating'}
              className="flex w-full items-center justify-center gap-2 rounded bg-copper-500 px-4 py-2.5 text-sm font-medium text-substrate-950 transition-colors hover:bg-copper-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === 'authenticating' ? 'Authenticating…' : 'Sign in'}
              {status !== 'authenticating' && <ArrowRight size={16} />}
            </button>

            <p className="text-center font-mono text-[11px] text-ink-500">
              {DEMO_MODE
                ? 'Demo mode — any username/password signs in'
                : 'JWT session · token issued by /api/token/'}
            </p>
          </form>
        </ChipFrame>
      </div>
    </div>
  )
}

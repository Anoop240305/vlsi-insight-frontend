import React from 'react'
import { LoginForm } from '../features/auth/index.js'
import ThemeToggle from '../components/ui/ThemeToggle.jsx'

export default function Login() {
  return (
    <div className="grid min-h-screen bg-bg lg:grid-cols-2">
      <aside className="hidden flex-col justify-between border-r border-line bg-sidebar p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-md bg-accent font-display text-base font-semibold text-accent-ink">S</div>
          <span className="font-display text-[17px] font-semibold text-ink">Silicon Insight</span>
        </div>
        <div className="max-w-md">
          <h2 className="font-display text-3xl font-semibold leading-tight text-ink">
            Find what is slowing your design down, faster.
          </h2>
          <p className="mt-4 text-muted">
            Upload Vivado timing, power and utilization reports. See the failing paths, track every version and read plain-English explanations.
          </p>
        </div>
        <p className="text-sm text-muted">Vivado report analysis</p>
      </aside>

      <main className="relative flex items-center justify-center p-6">
        <div className="absolute right-4 top-4"><ThemeToggle /></div>
        <div className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold text-ink">Sign in</h1>
          <p className="mb-8 mt-1 text-sm text-muted">Use your account to open your design's analysis.</p>
          <LoginForm />
        </div>
      </main>
    </div>
  )
}

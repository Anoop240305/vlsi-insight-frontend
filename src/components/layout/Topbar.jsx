import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../features/auth/index.js'
import { designSummary } from '../../data/mockData.js'
import StatusPill from '../ui/StatusPill.jsx'

export default function Topbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-line bg-bg px-5">
      <div className="flex min-w-0 items-center gap-3 text-sm">
        <span className="truncate font-medium text-ink">{designSummary.designName}</span>
        <span className="text-muted">{designSummary.version}</span>
        <StatusPill status={designSummary.status} />
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <span className="hidden text-sm text-muted sm:inline">{user?.username || 'engineer'}</span>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-1.5 rounded-md border border-line px-3 py-1.5 text-sm text-muted transition-colors hover:border-fail/50 hover:text-fail"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </header>
  )
}

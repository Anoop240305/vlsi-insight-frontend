import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { designSummary } from '../../data/mockData.js'
import StatusPill from '../ui/StatusPill.jsx'

export default function Topbar() {
  const { user, logout } = useAuth()

  return (
    <header className="flex h-14 items-center justify-between border-b border-trace bg-substrate-900/80 px-5 backdrop-blur-sm">
      <div className="flex items-center gap-3 font-mono text-xs text-ink-500">
        <span className="text-ink-300">{designSummary.designName}</span>
        <span>/</span>
        <span>{designSummary.version}</span>
        <StatusPill status={designSummary.status} />
      </div>

      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-ink-500">{user?.username || 'engineer'}</span>
        <button
          onClick={logout}
          className="flex items-center gap-1.5 rounded border border-trace px-2.5 py-1.5 text-xs text-ink-300 transition-colors hover:border-fail/40 hover:text-fail"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </div>
    </header>
  )
}

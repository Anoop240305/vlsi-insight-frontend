import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  CircuitBoard, UploadCloud, Activity, Zap, Grid3x3, Sparkles,
  GitCompareArrows, AlertTriangle, ChevronsLeft, ChevronsRight,
} from 'lucide-react'

const NAV = [
  { to: '/dashboard', label: 'Overview', icon: CircuitBoard, end: true },
  { to: '/dashboard/upload', label: 'Upload reports', icon: UploadCloud },
  { to: '/dashboard/timing', label: 'Timing paths', icon: Activity },
  { to: '/dashboard/power', label: 'Power breakdown', icon: Zap },
  { to: '/dashboard/utilization', label: 'Utilization', icon: Grid3x3 },
  { to: '/dashboard/anomalies', label: 'Anomalies', icon: AlertTriangle },
  { to: '/dashboard/insights', label: 'AI insights', icon: Sparkles },
  { to: '/dashboard/versions', label: 'Version compare', icon: GitCompareArrows },
]

export default function Sidebar({ collapsed, onToggle }) {
  return (
    <aside
      className={`relative flex h-full flex-col border-r border-trace bg-substrate-900 transition-[width] duration-300 ease-in-out ${
        collapsed ? 'w-[68px]' : 'w-[248px]'
      }`}
    >
      <div className="flex h-14 items-center gap-2 border-b border-trace px-4">
        <div className="h-2 w-2 shrink-0 rounded-full bg-signal-400 shadow-[0_0_8px_2px_rgba(110,231,221,0.5)]" />
        {!collapsed && (
          <span className="truncate font-mono text-xs tracking-wide text-ink-300">
            NET&nbsp;/&nbsp;silicon-insight
          </span>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto py-3">
        <ul className="space-y-0.5 px-2">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                title={collapsed ? label : undefined}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded px-2.5 py-2 text-sm transition-colors ${
                    isActive
                      ? 'bg-copper-500/10 text-copper-400'
                      : 'text-ink-300 hover:bg-substrate-700/70 hover:text-ink-100'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`h-4 w-0.5 shrink-0 rounded ${isActive ? 'bg-copper-400' : 'bg-transparent'}`}
                    />
                    <Icon size={17} className="shrink-0" />
                    {!collapsed && <span className="truncate">{label}</span>}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <button
        onClick={onToggle}
        className="flex h-11 items-center justify-center gap-2 border-t border-trace text-ink-500 transition-colors hover:bg-substrate-700/70 hover:text-ink-100"
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronsRight size={16} /> : <ChevronsLeft size={16} />}
        {!collapsed && <span className="font-mono text-[11px]">Collapse</span>}
      </button>
    </aside>
  )
}

import React, { useEffect, useRef, useState } from 'react'
import { LogOut, Menu } from 'lucide-react'
import { useAuth } from '../../features/auth/index.js'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'

function accountInitials(user) {
  const name = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim()
  if (name) return name.split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return (user?.username || 'U').slice(0, 2).toUpperCase()
}

export default function Topbar({ mobile = false, onMenuToggle }) {
  const { user, logout } = useAuth()
  const { data, activeProjectId, setActiveProjectId, activeRunId, setActiveRunId } = useDashboardData()
  const [accountOpen, setAccountOpen] = useState(false)
  const accountRef = useRef(null)
  const projectOptions = [
    ...data.projects.filter((project) => String(project.id) !== 'demo'),
    { id: 'demo', name: 'Demo project' },
  ]
  const displayName = [user?.first_name, user?.last_name].filter(Boolean).join(' ').trim() || user?.username || 'Engineer'

  useEffect(() => {
    if (!accountOpen) return undefined
    const dismiss = (event) => {
      if (!accountRef.current?.contains(event.target)) setAccountOpen(false)
    }
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setAccountOpen(false)
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [accountOpen])

  function changeProject(event) {
    setActiveProjectId(event.target.value || null)
  }

  return (
    <header className="grid shrink-0 grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-2 gap-y-2 border-b border-line bg-bg px-3 py-2 sm:flex sm:h-14 sm:justify-between sm:gap-4 sm:px-5 sm:py-0">
      {mobile && <button type="button" onClick={onMenuToggle} aria-label="Open navigation menu"
        className="grid h-9 w-9 place-items-center rounded-md border border-line bg-card text-muted focus:outline-none focus:ring-2 focus:ring-accent/30"><Menu size={18} /></button>}
      <div className="contents sm:flex sm:min-w-0 sm:items-center sm:gap-3 sm:text-sm">
        <select aria-label="Active design project" value={activeProjectId || data.project?.id || ''} onChange={changeProject}
          className={`${mobile ? 'col-start-2 row-start-1' : ''} min-w-0 w-full max-w-[11rem] rounded-md border border-line bg-card px-2 py-1.5 text-xs text-ink sm:w-auto sm:max-w-56 sm:py-1 sm:text-sm`}>
          <option value="">Latest real design / none</option>
          {projectOptions.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
        </select>
        <select aria-label="Active analysis run" value={activeRunId || data.active_run_id || ''}
          onChange={(event) => setActiveRunId(event.target.value || null)} disabled={data.runs?.length === 0}
          className={`${mobile ? 'col-span-3 row-start-2 w-full' : ''} min-w-0 max-w-full rounded-md border border-line bg-card px-2 py-1.5 text-xs text-ink disabled:opacity-60 sm:w-auto sm:max-w-64 sm:py-1 sm:text-sm`}>
          {data.runs?.length === 0 ? <option value="">No analysis runs</option> : data.runs?.map((run) => (
            <option key={run.id} value={run.id}>{new Date(run.uploaded_at).toLocaleString()} · {run.report_types?.join(', ') || 'run'}</option>
          ))}
        </select>
      </div>

      <div ref={accountRef} className={`relative shrink-0 ${mobile ? 'col-start-3 row-start-1' : ''}`}>
        <button type="button" onClick={() => setAccountOpen((open) => !open)}
          aria-label="Open account menu" aria-haspopup="dialog" aria-expanded={accountOpen}
          title={`${displayName} account`}
          className="grid h-9 w-9 place-items-center rounded-md border border-accent bg-card text-xs font-semibold tracking-wide text-accent focus:outline-none focus:ring-2 focus:ring-accent/30">
          {accountInitials(user)}
        </button>
        {accountOpen && <section role="dialog" aria-label="Account details"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-line bg-card p-4 shadow-lg">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">Signed in as</p>
          <p className="mt-1 truncate text-sm font-semibold text-ink">{displayName}</p>
          <p className="mt-1 break-all text-sm text-muted">{user?.email || 'Email not available'}</p>
          <div className="mt-4 border-t border-line pt-3">
            <button type="button" onClick={logout}
              className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm text-muted transition-colors hover:bg-track hover:text-fail">
              <LogOut size={15} /> Sign out
            </button>
          </div>
        </section>}
      </div>
    </header>
  )
}

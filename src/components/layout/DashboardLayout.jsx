import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar.jsx'
import Topbar from './Topbar.jsx'

export default function DashboardLayout() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches)
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(max-width: 767px)')
    const update = () => {
      setIsMobile(query.matches)
      if (!query.matches) setMobileOpen(false)
    }
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return (
    <div className="dashboard-shell">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)}
        mobile={isMobile} mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar mobile={isMobile} onMenuToggle={() => setMobileOpen((open) => !open)} />
        <main className="dashboard-main px-3 py-4 sm:p-5 lg:p-8">
          <div className="dashboard-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

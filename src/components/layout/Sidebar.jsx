import React from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronsLeft, ChevronsRight } from 'lucide-react'
import ThemeToggle from '../ui/ThemeToggle.jsx'
import { NAV_ITEMS } from './navItems.js'

export default function Sidebar({ collapsed, onToggle, mobile = false, mobileOpen = false, onMobileClose }) {
  if (mobile && !mobileOpen) return null

  return (
    <>
      {mobile && <button type="button" aria-label="Close navigation menu" onClick={onMobileClose}
        className="fixed inset-0 z-40 cursor-default bg-black/40" />}
      <aside className={`flex h-full shrink-0 flex-col border-r border-line bg-sidebar transition-[width] duration-200 ease-in-out ${
        mobile ? 'fixed inset-y-0 left-0 z-50 w-60 shadow-xl' : collapsed ? 'w-[68px]' : 'w-60'
      }`}>
        <div className={`flex h-14 items-center border-b border-line ${collapsed && !mobile ? 'justify-center' : 'gap-3 px-4'}`}>
          {collapsed && !mobile
            ? <span className="font-display text-base font-semibold text-accent" aria-label="VeriSight">V</span>
            : <span className="truncate font-display text-[17px] font-semibold text-ink">VeriSight</span>}
        </div>

        <nav aria-label="Main" className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-0.5">
            {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
              <li key={to}>
                <NavLink to={to} end={end} title={collapsed && !mobile ? label : undefined}
                  aria-label={collapsed && !mobile ? label : undefined}
                  onClick={mobile ? onMobileClose : undefined}
                  className={({ isActive }) => `flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive ? 'bg-accent/10 font-medium text-accent' : 'text-muted hover:bg-track hover:text-ink'
                  }`}>
                  <Icon size={17} className="shrink-0" />
                  {(!collapsed || mobile) && <span className="truncate">{label}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-0.5 border-t border-line p-2">
          <ThemeToggle showLabel={!collapsed || mobile} className="w-full" />
          {!mobile && <button type="button" onClick={onToggle}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-track hover:text-ink">
            {collapsed ? <ChevronsRight size={17} className="shrink-0" /> : <ChevronsLeft size={17} className="shrink-0" />}
            {!collapsed && <span>Collapse</span>}
          </button>}
        </div>
      </aside>
    </>
  )
}

import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../theme/ThemeProvider.jsx'

export default function ThemeToggle({ showLabel = false, className = '' }) {
  const { theme, toggleTheme } = useTheme()
  const dark = theme === 'dark'
  const label = dark ? 'Switch to light theme' : 'Switch to dark theme'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted transition-colors hover:bg-track hover:text-ink ${className}`}
    >
      {dark ? <Sun size={17} className="shrink-0" /> : <Moon size={17} className="shrink-0" />}
      {showLabel && <span className="truncate">{dark ? 'Light theme' : 'Dark theme'}</span>}
    </button>
  )
}

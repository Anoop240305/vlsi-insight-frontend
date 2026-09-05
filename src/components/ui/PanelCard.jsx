import React from 'react'

export default function PanelCard({ title, eyebrow, action, children, className = '' }) {
  return (
    <div className={`rounded-md border border-trace bg-substrate-800/70 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between border-b border-trace px-4 py-3">
          <div>
            {eyebrow && <p className="font-mono text-[11px] text-ink-500">{eyebrow}</p>}
            {title && <h3 className="text-sm font-medium text-ink-100">{title}</h3>}
          </div>
          {action}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  )
}

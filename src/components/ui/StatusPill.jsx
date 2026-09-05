import React from 'react'

const STYLES = {
  pass: 'bg-pass/10 text-pass border-pass/30',
  warn: 'bg-warn/10 text-warn border-warn/30',
  fail: 'bg-fail/10 text-fail border-fail/30',
}

const LABELS = { pass: 'MET', warn: 'MARGINAL', fail: 'VIOLATED' }

export default function StatusPill({ status = 'warn', label }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 font-mono text-[11px] ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label || LABELS[status]}
    </span>
  )
}

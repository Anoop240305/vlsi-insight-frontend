import React from 'react'

const STYLES = {
  pass: 'bg-pass/10 text-pass',
  warn: 'bg-warn/10 text-warn',
  fail: 'bg-fail/10 text-fail',
}
const LABELS = { pass: 'Met', warn: 'Marginal', fail: 'Violated' }

export default function StatusPill({ status = 'warn', label }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label || LABELS[status]}
    </span>
  )
}

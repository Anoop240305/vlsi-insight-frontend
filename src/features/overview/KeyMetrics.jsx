import React from 'react'
import Card from '../../components/ui/Card.jsx'

const sign = (n) => (n < 0 ? '−' : '') + Math.abs(n)
const pct = (used, total) => `${Math.round((used / total) * 100)}%`

function Metric({ label, value, unit, tone = '' }) {
  return (
    <div className="rounded-md bg-bg px-3.5 py-3">
      <p className="text-sm text-muted">{label}</p>
      <p className={`mt-0.5 text-xl font-medium tabular-nums ${tone || 'text-ink'}`}>
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-muted">{unit}</span>}
      </p>
    </div>
  )
}

export default function KeyMetrics({ summary: s, className = '' }) {
  return (
    <Card title="Key metrics" className={className}>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Metric label="WNS" value={sign(s.wnsNs)} unit="ns" tone={s.wnsNs < 0 ? 'text-fail' : ''} />
        <Metric label="TNS" value={sign(s.tnsNs)} unit="ns" tone={s.tnsNs < 0 ? 'text-fail' : ''} />
        <Metric label="WHS" value={sign(s.whsNs)} unit="ns" />
        <Metric label="Power" value={s.powerWatts} unit="W" />
        <Metric label="LUT" value={pct(s.lutUsed, s.lutTotal)} />
        <Metric label="FF" value={pct(s.ffUsed, s.ffTotal)} />
        <Metric label="LUT used" value={s.lutUsed.toLocaleString()} />
        <Metric label="FF used" value={s.ffUsed.toLocaleString()} />
      </div>
    </Card>
  )
}

import React from 'react'
import Card from '../../components/ui/Card.jsx'
import { displayCount, displayMetric } from '../reports/useDashboardData.jsx'

const signedMetric = (value) => {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return 'NA'
  const number = Number(value)
  return `${number < 0 ? '−' : ''}${Math.abs(number).toFixed(4)}`
}
const pct = (used, total) => used !== null && used !== undefined && total > 0
  ? `${((used / total) * 100).toFixed(2)}%`
  : 'NA'

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
        <Metric label="WNS" value={signedMetric(s.wnsNs)} unit="ns" tone={s.wnsNs < 0 ? 'text-fail' : ''} />
        <Metric label="TNS" value={signedMetric(s.tnsNs)} unit="ns" tone={s.tnsNs < 0 ? 'text-fail' : ''} />
        <Metric label="WHS" value={signedMetric(s.whsNs)} unit="ns" />
        <Metric label="Power" value={displayMetric(s.powerWatts, 3)} unit="W" />
        <Metric label="LUT" value={pct(s.lutUsed, s.lutTotal)} />
        <Metric label="FF" value={pct(s.ffUsed, s.ffTotal)} />
        <Metric label="LUT used" value={displayCount(s.lutUsed)} />
        <Metric label="FF used" value={displayCount(s.ffUsed)} />
      </div>
    </Card>
  )
}

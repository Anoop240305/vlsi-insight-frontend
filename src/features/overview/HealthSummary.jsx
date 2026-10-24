import React from 'react'
import Card from '../../components/ui/Card.jsx'
import HealthGauge from '../../components/ui/HealthGauge.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'

export default function HealthSummary({ summary, reviewCount = 0, className = '' }) {
  const label =
    reviewCount > 0
      ? `${summary.status === 'fail' ? 'Violated' : 'Marginal'}: ${reviewCount} path${reviewCount === 1 ? '' : 's'} to review`
      : undefined

  return (
    <Card title="Design health" className={className}>
      <div className="flex items-center gap-5">
        <HealthGauge score={summary.healthScore} status={summary.status} />
        <div className="space-y-2">
          <StatusPill status={summary.status} label={label} />
          <p className="text-sm text-muted">
            Weighted across timing, power and utilization. Last run {new Date(summary.lastRun).toLocaleString()}.
          </p>
        </div>
      </div>
    </Card>
  )
}

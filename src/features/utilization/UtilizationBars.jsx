import React from 'react'
import Card from '../../components/ui/Card.jsx'

function barColor(pct) {
  if (pct > 90) return 'bg-fail'
  if (pct > 70) return 'bg-warn'
  return 'bg-accent'
}

export default function UtilizationBars({ items }) {
  return (
    <Card title="By resource type" hint="From utilization.rpt. Bars turn amber above 70% and red above 90%.">
      <div className="space-y-5">
        {items.map((u) => {
          const pct = (u.used / u.total) * 100
          return (
            <div key={u.name}>
              <div className="mb-1.5 flex items-baseline justify-between text-sm">
                <span className="font-medium text-ink">{u.name}</span>
                <span className="tabular-nums text-muted">
                  {u.used.toLocaleString()} / {u.total.toLocaleString()} ({pct.toFixed(0)}%)
                </span>
              </div>
              <div
                className="h-2 w-full rounded-full bg-track"
                role="progressbar"
                aria-label={u.name}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(pct)}
              >
                <div className={`h-2 rounded-full ${barColor(pct)} transition-all duration-500`} style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}

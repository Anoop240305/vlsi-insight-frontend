import React from 'react'
import PanelCard from '../../components/ui/PanelCard.jsx'
import { utilization } from '../../data/mockData.js'

function barColor(pct) {
  if (pct > 90) return 'bg-fail'
  if (pct > 70) return 'bg-warn'
  return 'bg-signal-500'
}

export default function Utilization() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Utilization</h1>
        <p className="text-sm text-ink-500">Resource usage against device totals.</p>
      </div>

      <PanelCard eyebrow="utilization.rpt" title="By resource type">
        <div className="space-y-5">
          {utilization.map((u) => {
            const pct = (u.used / u.total) * 100
            return (
              <div key={u.name}>
                <div className="mb-1.5 flex items-baseline justify-between font-mono text-xs">
                  <span className="text-ink-300">{u.name}</span>
                  <span className="text-ink-500">
                    {u.used.toLocaleString()} / {u.total.toLocaleString()} ({pct.toFixed(0)}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-substrate-900">
                  <div
                    className={`h-2 rounded-full ${barColor(pct)} transition-all duration-500`}
                    style={{ width: `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </PanelCard>
    </div>
  )
}

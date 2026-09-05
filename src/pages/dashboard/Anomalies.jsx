import React from 'react'
import { AlertTriangle } from 'lucide-react'
import PanelCard from '../../components/ui/PanelCard.jsx'
import { anomalies } from '../../data/mockData.js'

const SEVERITY_STYLE = {
  high: 'border-fail/30 text-fail',
  medium: 'border-warn/30 text-warn',
  low: 'border-signal-500/30 text-signal-400',
}

export default function Anomalies() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Anomalies</h1>
        <p className="text-sm text-ink-500">
          Flagged by the analytics engine's Isolation Forest / One-Class SVM models.
        </p>
      </div>

      <div className="space-y-3">
        {anomalies.map((a) => (
          <PanelCard key={a.id}>
            <div className="flex items-start gap-3">
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded border ${SEVERITY_STYLE[a.severity]}`}
              >
                <AlertTriangle size={14} />
              </span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-ink-500">
                    {a.id} · {a.metric}
                  </p>
                  <span className="font-mono text-[11px] text-ink-500">{a.model}</span>
                </div>
                <p className="mt-1 text-sm text-ink-100">{a.detail}</p>
              </div>
            </div>
          </PanelCard>
        ))}
      </div>
    </div>
  )
}

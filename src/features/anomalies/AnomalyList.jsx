import React from 'react'
import { AlertTriangle } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

const SEVERITY = {
  high: { chip: 'bg-fail/10 text-fail', label: 'High' },
  medium: { chip: 'bg-warn/10 text-warn', label: 'Medium' },
  low: { chip: 'bg-accent/10 text-accent', label: 'Low' },
}

export default function AnomalyList({ items }) {
  if (items.length === 0) return <Card><p className="text-sm text-muted">No anomaly results are available for the saved reports.</p></Card>
  return (
    <div className="space-y-3">
      {items.map((a) => {
        const sev = SEVERITY[a.severity]
        return (
          <Card key={a.id}>
            <div className="flex items-start gap-3">
              <span className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md ${sev.chip}`}>
                <AlertTriangle size={15} />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <p className="text-sm text-muted">
                    <span className="font-medium text-ink">{a.metric}</span> · {a.id} · {sev.label} severity
                  </p>
                  <span className="text-sm text-muted">{a.model}</span>
                </div>
                <p className="mt-1 text-sm text-ink">{a.detail}</p>
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

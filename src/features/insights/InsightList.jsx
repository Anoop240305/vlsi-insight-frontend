import React from 'react'
import Card from '../../components/ui/Card.jsx'

const TAG = {
  Timing: 'bg-fail/10 text-fail',
  Power: 'bg-warn/10 text-warn',
  Utilization: 'bg-accent/10 text-accent',
}

export default function InsightList({ items }) {
  if (items.length === 0) return <Card><p className="text-sm text-muted">No AI insight results are available for the saved reports.</p></Card>
  return (
    <div className="space-y-3">
      {items.map((i) => (
        <Card key={i.id}>
          <div className="flex items-start justify-between gap-3">
            <h2 className="text-[15px] font-medium text-ink">{i.title}</h2>
            <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${TAG[i.tag] || 'bg-track text-muted'}`}>{i.tag}</span>
          </div>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{i.body}</p>
          <p className="mt-3 font-mono text-xs text-muted">{i.reportRef}</p>
        </Card>
      ))}
    </div>
  )
}

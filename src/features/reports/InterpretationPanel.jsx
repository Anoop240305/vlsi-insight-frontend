import React from 'react'
import Card from '../../components/ui/Card.jsx'

const severityStyle = {
  critical: 'bg-fail/10 text-fail',
  warning: 'bg-warn/10 text-warn',
  informational: 'bg-accent/10 text-accent',
  healthy: 'bg-pass/10 text-pass',
}

export default function InterpretationPanel({ findings = [] }) {
  return <Card title="Engineering interpretation">
    {findings.length === 0 ? <p className="text-sm text-muted">No interpretation is available because the report contains no measured values for this analysis.</p> :
      <div className="space-y-4">
        {findings.map((finding, index) => <article key={`${finding.title}-${index}`} className="border-b border-line pb-4 last:border-0 last:pb-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-sm font-medium text-ink">{finding.title}</h3>
            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium capitalize ${severityStyle[finding.severity] || 'bg-bg text-muted'}`}>{finding.severity}</span>
          </div>
          <dl className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
            <div><dt className="text-xs font-medium text-muted">Observation</dt><dd className="mt-0.5 text-ink">{finding.observation}</dd></div>
            <div><dt className="text-xs font-medium text-muted">Engineering interpretation</dt><dd className="mt-0.5 text-muted">{finding.engineering_interpretation}</dd></div>
            <div><dt className="text-xs font-medium text-muted">Why it matters</dt><dd className="mt-0.5 text-muted">{finding.why_it_matters}</dd></div>
            <div><dt className="text-xs font-medium text-muted">Recommended next step</dt><dd className="mt-0.5 text-ink">{finding.recommended_next_step}</dd></div>
          </dl>
          {finding.confidence_or_limitations && <p className="mt-2 text-xs text-muted">Limitations: {finding.confidence_or_limitations}</p>}
          {finding.evidence?.source_report && <p className="mt-1 text-xs text-muted">Source: {finding.evidence.source_report}{finding.evidence.stage ? ` · ${finding.evidence.stage}` : ''}</p>}
        </article>)}
      </div>}
  </Card>
}

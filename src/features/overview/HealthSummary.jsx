import React from 'react'
import Card from '../../components/ui/Card.jsx'

const DOMAIN_LABELS = { timing: 'Timing', utilization: 'Utilization', power: 'Power' }

function Evidence({ evidence }) {
  if (!evidence || typeof evidence !== 'object') return <p className="mt-2 text-xs text-muted">Evidence: {evidence ?? 'NA'}</p>
  const entries = Object.entries(evidence).filter(([, value]) => value !== null && value !== undefined)
  if (entries.length === 0) return <p className="mt-2 text-xs text-muted">Evidence: NA</p>
  return <p className="mt-2 text-xs text-muted">{entries.map(([key, value]) => `${key.replaceAll('_', ' ')} ${value}`).join(' · ')}</p>
}

export default function HealthSummary({ health, coverage, stages = {}, isDemo = false }) {
  const finding = health?.findings?.[0]
  const timingState = coverage?.timing_readiness

  return (
      <Card title="Design health" hint={isDemo ? 'Demo project' : undefined}>
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-warn/10 px-3 py-1 text-sm font-medium text-warn">
            {health?.assessment || 'Insufficient evidence'}
          </span>
          <span className="text-sm text-muted">{finding?.title || 'No findings from available reports'}</span>
        </div>
        {finding && <details className="mt-3 text-sm">
          <summary className="cursor-pointer text-accent">Finding details</summary>
          <div className="pt-2">
            <Evidence evidence={finding.measured_evidence} />
            <p className="mt-2 text-muted">{finding.explanation}</p>
            {finding.likely_causes?.length > 0 && <p className="mt-2 text-xs text-muted">Possible factors: {finding.likely_causes.join(' ')}</p>}
            <p className="mt-2 text-ink"><span className="font-medium">Next:</span> {finding.recommended_next_step}</p>
            <p className="mt-1 text-xs text-muted"><span className="font-medium">Verify:</span> {finding.verification_criteria}</p>
          </div>
        </details>}
        <div className="mt-4 border-t border-line pt-3">
          <p className="mb-2 text-xs font-medium text-muted">Analysis coverage</p>
          <div className="flex flex-wrap gap-2">
            {Object.entries(health?.domain_states || {}).map(([domain, state]) => (
              <span key={domain} className="rounded-md bg-bg px-2.5 py-1 text-xs text-muted">
                {DOMAIN_LABELS[domain] || domain}{stages[domain] ? ` · ${stages[domain]}` : ''}: {domain === 'timing' ? (timingState?.state || state) : state}
              </span>
            ))}
          </div>
          {timingState?.explanation && <p className="mt-2 text-xs text-muted">{timingState.explanation}</p>}
          {timingState?.next_action && <p className="mt-1 text-xs text-ink">Next: {timingState.next_action}</p>}
        </div>
      </Card>
  )
}

import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import { PathsTable } from '../../features/index.js'
import TimingSlackChart from '../../features/timing/TimingSlackChart.jsx'
import InterpretationPanel from '../../features/reports/InterpretationPanel.jsx'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'

export default function Timing() {
  const { data, loading, error } = useDashboardData()
  const report = data.latest?.timing
  const readiness = data.analysis_coverage?.timing_readiness
  const clockCoverage = report?.analysis_coverage || {}
  const clockNames = clockCoverage.clock_names || report?.metrics?.clock_names || []
  const clockPeriods = clockCoverage.clock_periods_ns || report?.metrics?.clock_periods_ns || {}
  const paths = data.reports
    .filter((item) => item.report_type === 'timing' && item.status === 'completed')
    .filter((item) => item.run_id === data.active_run_id)
    .filter((item) => Number.isFinite(item.metrics?.slack_ns))
    .map((item) => ({
      id: item.id,
      startpoint: item.metrics.startpoint || 'NA',
      endpoint: item.metrics.endpoint || 'NA',
      group: item.metrics.path_group || item.metrics.path_type || 'NA',
      slackNs: item.metrics.slack_ns,
    }))

  return (
    <div className="dashboard-page">
      <PageHeader title="Timing paths" description="Slack summary and path details from the selected Vivado report." />
      {loading && <p role="status" className="text-sm text-muted">Loading saved report data…</p>}
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      {report && <p className="text-xs text-muted">Source: {report.source_report} · stage {report.stage} · device {report.device_part || 'Not available'} · run {report.run_id}</p>}
      <p className="text-xs font-medium text-muted">Timing readiness: {readiness?.state || 'NOT_ANALYZED'}</p>
      {clockNames.length > 0 && <div className="flex flex-wrap gap-2" aria-label="Detected clocks">
        {clockNames.map((name) => {
          const period = clockPeriods[name]
          const frequency = Number.isFinite(period) && period > 0 ? (1000 / period).toFixed(3) : null
          return <span key={name} className="rounded-md bg-card px-2.5 py-1 text-xs text-muted">
            {name}{Number.isFinite(period) && period > 0 ? ` · ${period} ns${frequency ? ` (${frequency} MHz)` : ''}` : ''}
          </span>
        })}
      </div>}
      <TimingSlackChart metrics={report?.metrics || {}} />
      <InterpretationPanel findings={report?.interpretations || data.interpretations?.timing || []} />
      {paths.length > 0 ? <PathsTable paths={paths} /> : (
        <Card title="Critical path list">
          <p className="text-sm text-muted">
            {report?.metrics?.timing_status === 'unconstrained'
              ? 'Vivado reported no timing constraints, so no path slack is available.'
              : 'No detailed timing path with an explicit slack value is available for this run.'}
          </p>
        </Card>
      )}
    </div>
  )
}

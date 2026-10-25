import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { UtilizationBars } from '../../features/index.js'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'
import InterpretationPanel from '../../features/reports/InterpretationPanel.jsx'
import { utilizationChartRows } from '../../features/reports/chartData.js'

export default function Utilization() {
  const { data, loading, error } = useDashboardData()
  const metrics = data.latest?.utilization?.metrics || {}
  const report = data.latest?.utilization
  const items = utilizationChartRows(metrics)

  return (
    <div className="dashboard-page">
      <PageHeader title="Utilization" description="Device resource usage from the selected Vivado report." />
      {loading && <p role="status" className="text-sm text-muted">Loading saved report data…</p>}
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      {report && <p className="text-xs text-muted">Source: {report.source_report} · stage {report.stage} · device {report.device_part || 'NA'} · run {report.run_id}</p>}
      <UtilizationBars items={items} />
      <InterpretationPanel findings={report?.interpretations || data.interpretations?.utilization || []} />
    </div>
  )
}

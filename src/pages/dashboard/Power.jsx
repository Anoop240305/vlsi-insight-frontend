import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import { PowerBreakdown } from '../../features/index.js'
import { displayMetric, useDashboardData } from '../../features/reports/useDashboardData.jsx'
import InterpretationPanel from '../../features/reports/InterpretationPanel.jsx'
import { powerChartRows } from '../../features/reports/chartData.js'

export default function Power() {
  const { data, loading, error } = useDashboardData()
  const metrics = data.latest?.power?.metrics || {}
  const report = data.latest?.power
  const breakdown = powerChartRows(metrics)

  return (
    <div className="dashboard-page">
      <PageHeader title="Power breakdown" description="Power readings from the selected Vivado report." />
      {loading && <p role="status" className="text-sm text-muted">Loading saved report data…</p>}
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      {report && <p className="text-xs text-muted">Source: {report.source_report} · stage {report.stage} · device {report.device_part || 'NA'} · run {report.run_id}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card title="Total on-chip power"><p className="text-2xl font-medium text-ink">{displayMetric(metrics.total_on_chip_power_w)} <span className="text-sm text-muted">W</span></p></Card>
        <Card title="Dynamic power"><p className="text-2xl font-medium text-ink">{displayMetric(metrics.dynamic_power_w)} <span className="text-sm text-muted">W</span></p></Card>
        <Card title="Device static power"><p className="text-2xl font-medium text-ink">{displayMetric(metrics.static_power_w)} <span className="text-sm text-muted">W</span></p></Card>
      </div>
      <PowerBreakdown data={breakdown} total={metrics.total_on_chip_power_w} />
      <InterpretationPanel findings={report?.interpretations || data.interpretations?.power || []} />
    </div>
  )
}

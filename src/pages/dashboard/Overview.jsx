import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { HealthSummary, KeyMetrics, TimingTrend } from '../../features/index.js'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'
import { Link } from 'react-router-dom'
import UtilizationBars from '../../features/utilization/UtilizationBars.jsx'
import PowerBreakdown from '../../features/power/PowerBreakdown.jsx'
import TimingSlackChart from '../../features/timing/TimingSlackChart.jsx'
import { powerChartRows, utilizationChartRows } from '../../features/reports/chartData.js'

export default function Overview() {
  const { data, loading, error } = useDashboardData()
  const timingReport = data.latest?.timing
  const powerReport = data.latest?.power
  const utilizationReport = data.latest?.utilization
  const timing = timingReport?.metrics || {}
  const power = powerReport?.metrics || {}
  const utilization = utilizationReport?.metrics || {}
  const lut = utilization.slice_luts || {}
  const registers = utilization.slice_registers || {}

  const summary = {
    designName: data.project?.name || 'No parsed design',
    healthScore: null,
    status: null,
    timingStatus: timing.timing_status,
    wnsNs: timing.wns_ns,
    tnsNs: timing.tns_ns,
    whsNs: timing.whs_ns,
    powerWatts: power.total_on_chip_power_w,
    lutUsed: lut.used,
    lutTotal: lut.available,
    ffUsed: registers.used,
    ffTotal: registers.available,
    lastRun: [timingReport, powerReport, utilizationReport]
      .filter(Boolean)
      .map((report) => report.uploaded_at)
      .sort()
      .at(-1),
  }
  const timingTrend = data.reports
    .filter((report) => report.report_type === 'timing' && report.status === 'completed')
    .map((report) => ({
      version: new Date(report.uploaded_at).toLocaleDateString(),
      wns: report.metrics?.wns_ns ?? null,
      tns: report.metrics?.tns_ns ?? null,
    }))
    .filter((row) => row.wns !== null || row.tns !== null)
    .reverse()
  const summaryStatus = data.design_health?.domain_states || {}
  const previewLink = 'block rounded-lg transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-accent'

  return (
    <div className="dashboard-page">
      <PageHeader title="Overview" description={`Project health and latest report metrics for ${summary.designName}.`} />
      {loading && <p role="status" className="text-sm text-muted">Loading saved report data…</p>}
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      {!loading && !data.project && !error && <p className="rounded-md border border-line px-4 py-3 text-sm text-muted">No successfully parsed reports yet. Upload and parse a Vivado report to populate the dashboard.</p>}
      {data.stage_compatibility?.compatible === false && <p role="status" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{data.stage_compatibility.reason}</p>}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <HealthSummary
          health={data.design_health}
          coverage={data.analysis_coverage}
          stages={{
            timing: data.latest?.timing?.stage,
            power: data.latest?.power?.stage,
            utilization: data.latest?.utilization?.stage,
          }}
          isDemo={data.is_demo}
        />
        <KeyMetrics summary={summary} className="lg:col-span-2" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Link to="/dashboard/utilization" className={previewLink} aria-label="Open utilization analysis">
          <UtilizationBars compact items={utilizationChartRows(utilization)} title={`Utilization · ${summaryStatus.utilization || 'NOT_ANALYZED'}`} />
        </Link>
        <Link to="/dashboard/power" className={previewLink} aria-label="Open power analysis">
          <PowerBreakdown compact data={powerChartRows(power)} total={power.total_on_chip_power_w} title={`Power · ${summaryStatus.power || 'NOT_ANALYZED'}`} />
        </Link>
        <Link to="/dashboard/timing" className={previewLink} aria-label="Open timing analysis">
          <TimingSlackChart compact metrics={timing} title={`Timing · ${summaryStatus.timing || data.analysis_coverage?.timing_readiness?.state || 'NOT_ANALYZED'}`} />
        </Link>
      </div>
      <TimingTrend data={timingTrend} />
    </div>
  )
}

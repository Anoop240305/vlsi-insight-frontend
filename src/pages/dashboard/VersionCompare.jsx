import React, { useMemo, useState } from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import Card from '../../components/ui/Card.jsx'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'
import { compareReports, formatComparisonChange, formatComparisonValue } from '../../features/versions/comparison.js'

const STATUS_STYLE = {
  Improved: 'text-pass', Regressed: 'text-fail', Unchanged: 'text-muted',
  Changed: 'text-accent', Incomparable: 'text-warn',
}

function reportLabel(report) {
  const date = new Date(report.uploaded_at).toLocaleString()
  return `${date} · ${report.source_design || 'design unknown'} · ${report.stage || 'unknown stage'} · ${report.device_part || 'device unknown'}`
}

export default function VersionCompare() {
  const { data, loading, error } = useDashboardData()
  const reports = useMemo(() => data.reports.filter((report) => report.status === 'completed'), [data.reports])
  const [reportType, setReportType] = useState('timing')
  const versions = reports.filter((report) => report.report_type === reportType)
  const [olderId, setOlderId] = useState('')
  const [newerId, setNewerId] = useState('')
  const newer = versions.find((report) => String(report.id) === newerId) || versions[0] || null
  const older = versions.find((report) => String(report.id) === olderId) || versions[1] || null
  const comparison = useMemo(() => compareReports(older, newer, reportType), [older, newer, reportType])

  return (
    <div className="dashboard-page">
      <PageHeader title="Version compare" description="Compare timing and resource usage across saved runs for the active project." />
      {loading && <p role="status" className="text-sm text-muted">Loading saved report data…</p>}
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      <Card title="Choose versions">
        <div className="grid gap-3 md:grid-cols-3">
          <label className="text-sm text-muted">Analysis
            <select value={reportType} onChange={(event) => { setReportType(event.target.value); setOlderId(''); setNewerId('') }} className="mt-1 block w-full rounded-md border border-line bg-card px-3 py-2 text-ink">
              <option value="timing">Timing</option><option value="utilization">Utilization</option><option value="power">Power (optional)</option>
            </select>
          </label>
          <label className="text-sm text-muted">Older run
            <select value={older?.id || ''} onChange={(event) => setOlderId(event.target.value)} className="mt-1 block w-full rounded-md border border-line bg-card px-3 py-2 text-ink">
              <option value="">Select a report</option>{versions.map((item) => <option key={item.id} value={item.id}>{item.name} · {reportLabel(item)}</option>)}
            </select>
          </label>
          <label className="text-sm text-muted">Newer run
            <select value={newer?.id || ''} onChange={(event) => setNewerId(event.target.value)} className="mt-1 block w-full rounded-md border border-line bg-card px-3 py-2 text-ink">
              <option value="">Select a report</option>{versions.map((item) => <option key={item.id} value={item.id}>{item.name} · {reportLabel(item)}</option>)}
            </select>
          </label>
        </div>
      </Card>
      {versions.length < 2 ? <Card><p className="text-sm text-muted">Upload at least two successfully parsed {reportType} reports for this project.</p></Card> : (
        <>
          {comparison.compatibility.length > 0 && <div role="status" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">
            Comparison limitation: {comparison.compatibility.join(' ')} Values are shown where available; changes are marked incomparable unless the runs can be compared safely.
          </div>}
          <Card title={`${reportType === 'power' ? 'Power' : reportType === 'timing' ? 'Timing slack' : 'Resource utilization'} comparison`}>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[780px] table-fixed border-collapse text-sm">
                <colgroup><col className="w-[28%]" /><col className="w-[20%]" /><col className="w-[20%]" /><col className="w-[17%]" /><col className="w-[15%]" /></colgroup>
                <thead><tr className="border-b border-line text-left text-muted">
                  <th className="py-2 pr-3">Parameter</th><th className="py-2 px-3 text-right">Older</th><th className="py-2 px-3 text-right">Newer</th><th className="py-2 px-3 text-right">Change</th><th className="py-2 pl-3 text-right">Status</th>
                </tr></thead>
                <tbody>{comparison.rows.map((row) => <tr key={row.key} className="border-b border-line last:border-0">
                  <th scope="row" className="py-3 pr-3 text-left font-medium text-ink">{row.label}</th>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-muted">{formatComparisonValue(row.oldValue, row.unit)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-muted">{formatComparisonValue(row.newValue, row.unit)}</td>
                  <td className="whitespace-nowrap px-3 py-3 text-right tabular-nums text-ink">{formatComparisonChange(row.delta, row.unit)}</td>
                  <td className={`whitespace-nowrap py-3 pl-3 text-right font-medium ${STATUS_STYLE[row.status]}`}>{row.status}</td>
                </tr>)}</tbody>
              </table>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}

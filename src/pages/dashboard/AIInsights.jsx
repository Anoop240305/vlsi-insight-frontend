import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { InsightList } from '../../features/index.js'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'

export default function AIInsights() {
  const { data, error } = useDashboardData()
  return (
    <div className="dashboard-page">
      <PageHeader
        title="AI insights"
        description="AI summaries are shown only when an analysis service has generated them from saved reports."
      />
      {error && <p role="alert" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">{error}</p>}
      <InsightList items={data.is_demo ? data.ai_insights || [] : []} />
    </div>
  )
}

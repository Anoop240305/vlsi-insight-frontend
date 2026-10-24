import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { HealthSummary, KeyMetrics, TimingTrend } from '../../features/index.js'
import { designSummary, timingPaths, timingTrend } from '../../data/mockData.js'

export default function Overview() {
  const reviewCount = timingPaths.filter((p) => p.slackNs < 0).length
  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description={`Pass/fail status at a glance for ${designSummary.designName} (${designSummary.version}).`}
      />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <HealthSummary summary={designSummary} reviewCount={reviewCount} className="lg:col-span-1" />
        <KeyMetrics summary={designSummary} className="lg:col-span-2" />
      </div>
      <TimingTrend data={timingTrend} />
    </div>
  )
}

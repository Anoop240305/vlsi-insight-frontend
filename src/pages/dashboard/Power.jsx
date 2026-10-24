import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { PowerBreakdown } from '../../features/index.js'
import { powerBreakdown, designSummary } from '../../data/mockData.js'

export default function Power() {
  return (
    <div className="space-y-6">
      <PageHeader title="Power breakdown" description="Where the design's power goes, by category." />
      <PowerBreakdown data={powerBreakdown} total={designSummary.powerWatts} />
    </div>
  )
}

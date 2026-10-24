import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { InsightList } from '../../features/index.js'
import { aiInsights } from '../../data/mockData.js'

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI insights"
        description="Plain-English summaries from the Qwen / LLaMA layer, with the exact report line behind each one."
      />
      <InsightList items={aiInsights} />
    </div>
  )
}

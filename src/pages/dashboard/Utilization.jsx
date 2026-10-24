import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { UtilizationBars } from '../../features/index.js'
import { utilization } from '../../data/mockData.js'

export default function Utilization() {
  return (
    <div className="space-y-6">
      <PageHeader title="Utilization" description="Resource usage against device totals." />
      <UtilizationBars items={utilization} />
    </div>
  )
}

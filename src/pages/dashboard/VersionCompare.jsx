import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { HealthTrend, VersionLog } from '../../features/index.js'
import { versionHistory } from '../../data/mockData.js'

export default function VersionCompare() {
  return (
    <div className="space-y-6">
      <PageHeader title="Version compare" description="Design health score tracked across successive report versions." />
      <HealthTrend data={versionHistory} />
      <VersionLog data={versionHistory} />
    </div>
  )
}

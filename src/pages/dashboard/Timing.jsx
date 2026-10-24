import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { PathsTable } from '../../features/index.js'
import { timingPaths } from '../../data/mockData.js'

export default function Timing() {
  return (
    <div className="space-y-6">
      <PageHeader title="Timing paths" description="Worst paths by slack, grouped by clock domain." />
      <PathsTable paths={timingPaths} />
    </div>
  )
}

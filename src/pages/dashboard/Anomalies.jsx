import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { AnomalyList } from '../../features/index.js'
import { anomalies } from '../../data/mockData.js'

export default function Anomalies() {
  return (
    <div className="space-y-6">
      <PageHeader title="Anomalies" description="Flagged by the analytics engine's Isolation Forest and One-Class SVM models." />
      <AnomalyList items={anomalies} />
    </div>
  )
}

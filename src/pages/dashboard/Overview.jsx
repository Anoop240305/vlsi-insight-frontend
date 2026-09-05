import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import PanelCard from '../../components/ui/PanelCard.jsx'
import HealthGauge from '../../components/ui/HealthGauge.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { designSummary, timingTrend } from '../../data/mockData.js'

function Metric({ label, value, unit }) {
  return (
    <div className="rounded border border-trace bg-substrate-900/60 px-3 py-2.5">
      <p className="font-mono text-[11px] text-ink-500">{label}</p>
      <p className="mt-0.5 font-mono text-lg text-ink-100">
        {value}
        {unit && <span className="ml-1 text-xs text-ink-500">{unit}</span>}
      </p>
    </div>
  )
}

export default function Overview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Overview</h1>
        <p className="text-sm text-ink-500">
          Pass/fail status at a glance for {designSummary.designName} ({designSummary.version}).
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <PanelCard eyebrow="Design health score" className="lg:col-span-1">
          <div className="flex items-center gap-5">
            <HealthGauge score={designSummary.healthScore} status={designSummary.status} />
            <div className="space-y-2">
              <StatusPill status={designSummary.status} label="Marginal — 2 paths to review" />
              <p className="text-xs text-ink-500">
                Weighted across timing, power, and utilization. Last run{' '}
                {new Date(designSummary.lastRun).toLocaleString()}.
              </p>
            </div>
          </div>
        </PanelCard>

        <PanelCard eyebrow="Key metrics" className="lg:col-span-2">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Metric label="WNS" value={designSummary.wnsNs} unit="ns" />
            <Metric label="TNS" value={designSummary.tnsNs} unit="ns" />
            <Metric label="LUT" value={`${((designSummary.lutUsed / designSummary.lutTotal) * 100).toFixed(0)}%`} />
            <Metric label="FF" value={`${((designSummary.ffUsed / designSummary.ffTotal) * 100).toFixed(0)}%`} />
            <Metric label="Power" value={designSummary.powerWatts} unit="W" />
            <Metric label="WHS" value={designSummary.whsNs} unit="ns" />
            <Metric label="LUT used" value={designSummary.lutUsed.toLocaleString()} />
            <Metric label="FF used" value={designSummary.ffUsed.toLocaleString()} />
          </div>
        </PanelCard>
      </div>

      <PanelCard title="Timing trend across versions" eyebrow="Drill-down">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timingTrend}>
              <CartesianGrid stroke="#232E3D" strokeDasharray="3 3" />
              <XAxis dataKey="version" stroke="#7E8FA1" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <YAxis stroke="#7E8FA1" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <Tooltip
                contentStyle={{ background: '#131A23', border: '1px solid #2B3646', fontSize: 12 }}
                labelStyle={{ color: '#EAF0F6' }}
              />
              <Line type="monotone" dataKey="wns" name="WNS (ns)" stroke="#E1636B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="tns" name="TNS (ns)" stroke="#3FBDB2" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </PanelCard>
    </div>
  )
}

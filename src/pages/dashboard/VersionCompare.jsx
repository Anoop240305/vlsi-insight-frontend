import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import PanelCard from '../../components/ui/PanelCard.jsx'
import { versionHistory } from '../../data/mockData.js'

export default function VersionCompare() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Version compare</h1>
        <p className="text-sm text-ink-500">Design health score tracked across successive report versions.</p>
      </div>

      <PanelCard eyebrow="Trend" title="Health score over time">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={versionHistory}>
              <defs>
                <linearGradient id="healthFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C6813F" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#C6813F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#232E3D" strokeDasharray="3 3" />
              <XAxis dataKey="version" stroke="#7E8FA1" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <YAxis domain={[0, 100]} stroke="#7E8FA1" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <Tooltip
                contentStyle={{ background: '#131A23', border: '1px solid #2B3646', fontSize: 12 }}
                labelStyle={{ color: '#EAF0F6' }}
              />
              <Area type="monotone" dataKey="health" stroke="#C6813F" strokeWidth={2} fill="url(#healthFill)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </PanelCard>

      <PanelCard title="Version log">
        <table className="w-full border-collapse font-mono text-sm">
          <thead>
            <tr className="border-b border-trace text-left text-[11px] uppercase text-ink-500">
              <th className="py-2 pr-4">Version</th>
              <th className="py-2 pr-4">Date</th>
              <th className="py-2">Health</th>
            </tr>
          </thead>
          <tbody>
            {versionHistory.map((v) => (
              <tr key={v.version} className="border-b border-trace/60 last:border-0">
                <td className="py-2.5 pr-4 text-ink-100">{v.version}</td>
                <td className="py-2.5 pr-4 text-ink-300">{v.date}</td>
                <td className="py-2.5 text-ink-100">{v.health}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </PanelCard>
    </div>
  )
}

import React from 'react'
import PanelCard from '../../components/ui/PanelCard.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'
import { timingPaths } from '../../data/mockData.js'

function slackStatus(slackNs) {
  if (slackNs < 0) return 'fail'
  if (slackNs < 0.05) return 'warn'
  return 'pass'
}

export default function Timing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Timing paths</h1>
        <p className="text-sm text-ink-500">Worst paths by slack, grouped by clock domain.</p>
      </div>

      <PanelCard eyebrow="timing.rpt" title="Critical path list">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="border-b border-trace text-left font-mono text-[11px] uppercase text-ink-500">
                <th className="py-2 pr-4">Path</th>
                <th className="py-2 pr-4">Startpoint</th>
                <th className="py-2 pr-4">Endpoint</th>
                <th className="py-2 pr-4">Clock</th>
                <th className="py-2 pr-4">Slack</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono text-sm">
              {timingPaths.map((p) => (
                <tr key={p.id} className="border-b border-trace/60 last:border-0">
                  <td className="py-2.5 pr-4 text-ink-500">{p.id}</td>
                  <td className="py-2.5 pr-4 text-ink-100">{p.startpoint}</td>
                  <td className="py-2.5 pr-4 text-ink-100">{p.endpoint}</td>
                  <td className="py-2.5 pr-4 text-ink-300">{p.group}</td>
                  <td className={`py-2.5 pr-4 ${p.slackNs < 0 ? 'text-fail' : 'text-ink-100'}`}>
                    {p.slackNs.toFixed(3)} ns
                  </td>
                  <td className="py-2.5">
                    <StatusPill status={slackStatus(p.slackNs)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PanelCard>
    </div>
  )
}

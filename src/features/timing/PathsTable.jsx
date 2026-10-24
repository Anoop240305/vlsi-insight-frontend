import React from 'react'
import Card from '../../components/ui/Card.jsx'
import StatusPill from '../../components/ui/StatusPill.jsx'

export function slackStatus(slackNs) {
  if (slackNs < 0) return 'fail'
  if (slackNs < 0.05) return 'warn'
  return 'pass'
}

const TH = 'py-2 pr-4 text-left text-sm font-medium text-muted'

export default function PathsTable({ paths }) {
  return (
    <Card title="Critical path list" hint="From timing.rpt">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-line">
              <th className={TH}>Path</th>
              <th className={TH}>Startpoint</th>
              <th className={TH}>Endpoint</th>
              <th className={TH}>Clock</th>
              <th className={`${TH} text-right`}>Slack</th>
              <th className="py-2 pl-4 text-left text-sm font-medium text-muted">Status</th>
            </tr>
          </thead>
          <tbody>
            {paths.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <td className="py-2.5 pr-4 text-muted">{p.id}</td>
                <td className="py-2.5 pr-4 font-mono text-[13px] text-ink">{p.startpoint}</td>
                <td className="py-2.5 pr-4 font-mono text-[13px] text-ink">{p.endpoint}</td>
                <td className="py-2.5 pr-4 text-muted">{p.group}</td>
                <td className={`py-2.5 pr-4 text-right tabular-nums ${p.slackNs < 0 ? 'text-fail' : 'text-ink'}`}>
                  {p.slackNs < 0 ? '−' : ''}{Math.abs(p.slackNs).toFixed(3)} ns
                </td>
                <td className="py-2.5 pl-4"><StatusPill status={slackStatus(p.slackNs)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

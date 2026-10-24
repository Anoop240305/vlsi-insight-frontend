import React from 'react'
import Card from '../../components/ui/Card.jsx'

const TH = 'py-2 pr-4 text-left text-sm font-medium text-muted'

export default function VersionLog({ data }) {
  return (
    <Card title="Version log">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-line">
            <th className={TH}>Version</th>
            <th className={TH}>Date</th>
            <th className={`${TH} text-right`}>Health</th>
          </tr>
        </thead>
        <tbody>
          {data.map((v) => (
            <tr key={v.version} className="border-b border-line last:border-0">
              <td className="py-2.5 pr-4 font-medium text-ink">{v.version}</td>
              <td className="py-2.5 pr-4 text-muted">{v.date}</td>
              <td className="py-2.5 text-right tabular-nums text-ink">{v.health}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  )
}

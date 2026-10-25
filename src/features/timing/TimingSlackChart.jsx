import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { axisTick, chartColors, tooltipProps } from '../../theme/chartTheme.js'
import { timingSlackRows } from '../reports/chartData.js'

export default function TimingSlackChart({ metrics, compact = false, title = 'Timing slack' }) {
  const rows = timingSlackRows(metrics)
  const max = Math.max(0.1, ...rows.map((row) => Math.abs(row.slack))) * 1.15
  return <Card title={title} hint="Slack (ns)">
    {rows.length === 0 ? <p className="text-sm text-muted">No timing slack values are available to plot.</p> :
      <div className={compact ? 'h-40' : 'h-80'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={rows} layout="vertical" margin={{ top: 4, right: 18, bottom: 4, left: 4 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" domain={[-max, max]} stroke={chartColors.axis} tick={axisTick} />
            <YAxis type="category" dataKey="name" stroke={chartColors.axis} tick={axisTick} width={compact ? 48 : 62} />
            <ReferenceLine x={0} stroke={chartColors.ink} strokeWidth={1.5} />
            <Tooltip {...tooltipProps} formatter={(value, _name, item) => [`${value} ns`, `${item.payload.group} slack`]} cursor={{ fill: chartColors.track, opacity: 0.4 }} />
            <Bar dataKey="slack" name="Slack" radius={[0, 4, 4, 0]} barSize={compact ? 10 : 18}>
              {rows.map((row) => <Cell key={row.key} fill={row.slack < 0 ? chartColors.fail : chartColors.accent} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>}
  </Card>
}

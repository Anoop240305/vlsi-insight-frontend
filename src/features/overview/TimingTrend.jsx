import React from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { chartColors, axisTick, tooltipProps } from '../../theme/chartTheme.js'

export default function TimingTrend({ data }) {
  if (data.length === 0) {
    return <Card title="Timing trend across versions" hint="WNS and TNS values explicitly reported by Vivado">
      <p className="text-sm text-muted">No constrained timing summary values are available for this design.</p>
    </Card>
  }
  return (
    <Card title="Timing trend across versions" hint="Worst and total negative slack, in ns">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="version" stroke={chartColors.grid} tick={axisTick} />
            <YAxis stroke={chartColors.grid} tick={axisTick} />
            <Tooltip {...tooltipProps} />
            <Legend iconType="plainline" wrapperStyle={{ fontSize: 12, color: chartColors.axis }} />
            <Line type="monotone" dataKey="wns" name="WNS (ns)" stroke={chartColors.fail} strokeWidth={2} dot={{ r: 3 }} />
            <Line type="monotone" dataKey="tns" name="TNS (ns)" stroke={chartColors.accent} strokeWidth={2} dot={{ r: 3 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

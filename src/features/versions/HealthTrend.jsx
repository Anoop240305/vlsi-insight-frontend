import React from 'react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { chartColors, axisTick, tooltipProps } from '../../theme/chartTheme.js'

export default function HealthTrend({ data }) {
  return (
    <Card title="Health score over time">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="version" stroke={chartColors.grid} tick={axisTick} />
            <YAxis domain={[0, 100]} stroke={chartColors.grid} tick={axisTick} />
            <Tooltip {...tooltipProps} />
            <Area type="monotone" dataKey="health" name="Health" stroke={chartColors.accent} strokeWidth={2} fill={chartColors.accent} fillOpacity={0.12} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

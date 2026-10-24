import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { chartColors, axisTick, tooltipProps } from '../../theme/chartTheme.js'

export default function PowerBreakdown({ data, total }) {
  return (
    <Card title="By category" hint={`Total estimated power ${total} W, from power.rpt`}>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke={chartColors.grid} tick={axisTick} unit=" W" />
            <YAxis type="category" dataKey="name" stroke={chartColors.grid} tick={axisTick} width={64} />
            <Tooltip {...tooltipProps} cursor={{ fill: chartColors.track, opacity: 0.5 }} />
            <Bar dataKey="watts" name="Watts" fill={chartColors.accent} radius={[0, 4, 4, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}

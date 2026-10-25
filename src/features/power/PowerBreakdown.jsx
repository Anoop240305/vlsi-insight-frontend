import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { chartColors, axisTick, tooltipProps } from '../../theme/chartTheme.js'

export default function PowerBreakdown({ data, total, compact = false, title = 'Power components' }) {
  const totalLabel = total === null || total === undefined ? 'NA' : Number(total).toFixed(3)
  return (
    <Card title={title} hint={`Total on-chip: ${totalLabel} W`}>
      {data.length === 0 ? <p className="text-sm text-muted">No power components are reported in the saved power report.</p> : <div className={compact ? 'h-40' : 'h-72'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 8 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke={chartColors.grid} tick={axisTick} unit=" W" />
            <YAxis type="category" dataKey="name" stroke={chartColors.grid} tick={axisTick} width={compact ? 64 : 84} />
            <Tooltip {...tooltipProps} formatter={(value) => [`${value} W`, 'Reported power']} cursor={{ fill: chartColors.track, opacity: 0.5 }} />
            <Bar dataKey="watts" name="Watts" fill={chartColors.accent} radius={[0, 4, 4, 0]} barSize={18} />
          </BarChart>
        </ResponsiveContainer>
      </div>}
    </Card>
  )
}

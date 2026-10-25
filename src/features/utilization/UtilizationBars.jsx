import React, { useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import Card from '../../components/ui/Card.jsx'
import { axisTick, chartColors, tooltipProps } from '../../theme/chartTheme.js'

function rowsFor(items, mode) {
  return items.flatMap((item) => {
    const count = Number.isFinite(item.used) ? item.used : null
    const capacity = Number.isFinite(item.total) && item.total > 0 ? item.total : null
    const percent = Number.isFinite(item.numericPercent)
      ? item.numericPercent
      : count !== null && capacity !== null ? count / capacity * 100 : null
    const value = mode === 'percent' ? percent : count
    return value === null ? [] : [{ ...item, count, capacity, percent, value }]
  })
}

function percentLabel(item) {
  if (item.percent === null) return 'Not available'
  if (!item.displayPercent) return `${item.percent.toFixed(2)}%`
  const display = String(item.displayPercent)
  return display.endsWith('%') ? display : `${display}%`
}

function UtilizationTooltip({ active, payload, mode }) {
  if (!active || !payload?.length) return null
  const item = payload[0].payload
  return <div className="rounded-md border border-line bg-card p-3 text-xs text-ink shadow-lg">
    <p className="font-medium">{item.name}</p>
    <p>Used: {item.count === null ? 'Not available' : item.count.toLocaleString()}</p>
    <p>Available: {item.capacity === null ? 'Not available' : item.capacity.toLocaleString()}</p>
    <p>Utilization: {percentLabel(item)}</p>
    <p className="mt-1">Chart value: {mode === 'percent' ? `${item.value.toFixed(2)}%` : item.value.toLocaleString()}</p>
  </div>
}

export default function UtilizationBars({ items, compact = false, title = 'Resource utilization' }) {
  const [mode, setMode] = useState('percent')
  const percentRows = useMemo(() => rowsFor(items, 'percent'), [items])
  const countRows = useMemo(() => rowsFor(items, 'count'), [items])
  const supportsBoth = percentRows.length > 0 && countRows.length > 0
  const effectiveMode = mode === 'percent' && percentRows.length === 0 ? 'count' : mode
  const chartRows = effectiveMode === 'percent' ? percentRows : countRows
  const hasAnyCapacity = items.some((item) => Number.isFinite(item.total) && item.total > 0)

  return <Card title={title} hint={effectiveMode === 'percent' ? 'Utilization (%)' : 'Used resource count'}
    action={!compact && supportsBoth ? <label className="text-xs text-muted">View{' '}
      <select value={mode} onChange={(event) => setMode(event.target.value)} className="rounded border border-line bg-card px-2 py-1 text-ink">
        <option value="percent">Percentage</option><option value="count">Count</option>
      </select>
    </label> : null}>
    {chartRows.length === 0 ? <p className="text-sm text-muted">No utilization readings are available for this report.</p> :
      <div className={compact ? 'h-40' : 'h-80'}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartRows} layout="vertical" margin={{ top: 4, right: 18, bottom: 4, left: compact ? 0 : 8 }}>
            <CartesianGrid stroke={chartColors.grid} strokeDasharray="3 3" horizontal={false} />
            <XAxis type="number" stroke={chartColors.axis} tick={axisTick} unit={effectiveMode === 'percent' ? '%' : ''} domain={effectiveMode === 'percent' ? [0, 'auto'] : [0, 'auto']} />
            <YAxis type="category" dataKey="name" stroke={chartColors.axis} tick={axisTick} width={compact ? 88 : 128} />
            <Tooltip {...tooltipProps} content={<UtilizationTooltip mode={effectiveMode} />} cursor={{ fill: chartColors.track, opacity: 0.4 }} />
            <Bar dataKey="value" name={effectiveMode === 'percent' ? 'Utilization' : 'Used'} radius={[0, 4, 4, 0]} barSize={compact ? 12 : 20}>
              {chartRows.map((row) => <Cell key={row.name} fill={effectiveMode === 'percent' && row.percent > 100 ? chartColors.fail : chartColors.accent} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>}
    {!compact && !hasAnyCapacity && chartRows.length > 0 && <p className="mt-2 text-xs text-muted">Device capacities are missing, so percentages and remaining capacity are unavailable.</p>}
  </Card>
}

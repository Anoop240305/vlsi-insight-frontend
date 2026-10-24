export const chartColors = {
  accent: 'rgb(var(--accent))',
  fail: 'rgb(var(--fail))',
  grid: 'rgb(var(--line))',
  axis: 'rgb(var(--muted))',
  ink: 'rgb(var(--ink))',
  track: 'rgb(var(--track))',
}

export const axisTick = { fontSize: 12, fill: chartColors.axis }

export const tooltipProps = {
  contentStyle: {
    background: 'rgb(var(--card))',
    border: '1px solid rgb(var(--line))',
    borderRadius: 8,
    fontSize: 12,
    color: chartColors.ink,
  },
  labelStyle: { color: chartColors.ink },
  itemStyle: { color: chartColors.ink },
}

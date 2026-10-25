import test from 'node:test'
import assert from 'node:assert/strict'
import { powerChartRows, timingSlackRows, utilizationChartRows } from './chartData.js'

test('timing graph rows omit missing values and retain negative and zero slack', () => {
  const rows = timingSlackRows({ wns_ns: -0.125, tns_ns: 0, whs_ns: null, tpws_ns: 0.25 })
  assert.deepEqual(rows.map((row) => [row.name, row.slack]), [['WNS', -0.125], ['TNS', 0], ['TPWS', 0.25]])
})

test('utilization chart derives percentage only from valid capacity and keeps count-only rows', () => {
  const rows = utilizationChartRows({ slice_luts: { used: 10, available: 100 }, dsp_blocks: { used: 2, available: 0 }, clock_buffers_bufgctrl_used: 1 })
  assert.equal(rows.find((row) => row.name === 'LUT').numericPercent, 10)
  assert.equal(rows.find((row) => row.name === 'DSP').numericPercent, null)
  assert.equal(rows.find((row) => row.name === 'BUFG').used, 1)
})

test('power chart plots only components and never includes the on-chip total as a component', () => {
  const rows = powerChartRows({ logic_power_w: 0.1, io_power_w: 0.2, total_on_chip_power_w: 0.5 })
  assert.deepEqual(rows.map((row) => row.name), ['Logic', 'I/O'])
})

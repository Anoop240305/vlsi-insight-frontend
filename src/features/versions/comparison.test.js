import test from 'node:test'
import assert from 'node:assert/strict'
import { compareReports, formatComparisonChange, formatComparisonValue } from './comparison.js'

const base = {
  project_id: 4, stage: 'route_design', device_part: 'xc7z010',
  run_id: 'older', id: 1,
}

test('timing deltas are absolute and favorable positive slack is improved', () => {
  const newer = { ...base, id: 2, run_id: 'newer', metrics: { wns_ns: 0.25, tns_ns: 0, whs_ns: -0.1, ths_ns: -0.2 } }
  const older = { ...base, metrics: { wns_ns: -0.25, tns_ns: -2, whs_ns: 0.1, ths_ns: 0 } }
  const rows = compareReports(older, newer, 'timing').rows
  assert.equal(rows.find((row) => row.key === 'wns_ns').delta, 0.5)
  assert.equal(rows.find((row) => row.key === 'wns_ns').status, 'Improved')
  assert.equal(rows.find((row) => row.key === 'whs_ns').status, 'Regressed')
  assert.equal(rows.find((row) => row.key === 'tns_ns').status, 'Improved')
})

test('utilization uses valid capacity and reports change without claiming improvement', () => {
  const older = { ...base, metrics: { slice_luts: { used: 50, available: 100 } } }
  const newer = { ...base, id: 2, run_id: 'newer', metrics: { slice_luts: { used: 40, available: 100 }, dsp_blocks: { used: 2 } } }
  const result = compareReports(older, newer, 'utilization')
  const row = result.rows.find((item) => item.key === 'slice_luts')
  assert.equal(row.oldValue, 50)
  assert.equal(row.newValue, 40)
  assert.equal(row.delta, -10)
  assert.equal(row.status, 'Changed')
  assert.ok(!result.rows.some((item) => item.key === 'dsp_blocks'))
  assert.equal(formatComparisonChange(row.delta, '%'), '-10.00 pp')
})

test('incompatible stages and missing metrics remain incomparable', () => {
  const older = { ...base, source_design: 'alu', metrics: { wns_ns: 0.2 } }
  const newer = { ...base, id: 2, run_id: 'newer', stage: 'synthesis', source_design: 'bd_0_wrapper', metrics: { wns_ns: 0.4 } }
  const result = compareReports(older, newer, 'timing')
  assert.equal(result.compatible, false)
  assert.equal(result.rows[0].status, 'Incomparable')
  assert.ok(result.compatibility.some((reason) => reason.includes('Source designs differ')))
  const missing = compareReports(older, { ...older, id: 2, run_id: 'newer' }, 'timing')
  assert.equal(missing.rows[1].oldValue, null)
  assert.equal(missing.rows[1].delta, null)
  assert.equal(formatComparisonValue(null, 'ns'), 'N/A')
})

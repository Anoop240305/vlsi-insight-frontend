const TIMING_METRICS = [
  ['WNS', 'wns_ns', 'ns'], ['TNS', 'tns_ns', 'ns'],
  ['WHS', 'whs_ns', 'ns'], ['THS', 'ths_ns', 'ns'],
]
const UTILIZATION_METRICS = [
  ['LUT utilization', 'slice_luts'], ['FF utilization', 'slice_registers'],
  ['BRAM utilization', 'block_ram_tiles'], ['DSP utilization', 'dsp_blocks'],
  ['I/O utilization', 'bonded_iobs'],
]
const POWER_METRICS = [
  ['Total on-chip power', 'total_on_chip_power_w', 'W'],
  ['Dynamic power', 'dynamic_power_w', 'W'], ['Static power', 'static_power_w', 'W'],
]

function numeric(value) {
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function resourcePercent(resource) {
  if (!resource || typeof resource !== 'object') return null
  const used = numeric(resource.used)
  const available = numeric(resource.available)
  if (available === null || available <= 0) return null
  return numeric(resource.utilization_percent_numeric) ?? (used === null ? null : used / available * 100)
}

function compatibilityReasons(older, newer) {
  const reasons = []
  if (!older || !newer) return ['Select both reports to compare.']
  if (String(older.id) === String(newer.id)) reasons.push('Select two different reports.')
  if (older.run_id && newer.run_id && older.run_id === newer.run_id) reasons.push('Both reports belong to the same analysis run.')
  if (!older.stage || !newer.stage || older.stage === 'unknown' || newer.stage === 'unknown') reasons.push('Report stage is missing or unknown.')
  else if (older.stage !== newer.stage) reasons.push(`Stages differ (${older.stage} vs ${newer.stage}).`)
  if (older.source_design && newer.source_design && older.source_design !== newer.source_design) {
    reasons.push(`Source designs differ (${older.source_design} vs ${newer.source_design}).`)
  }
  if (!older.device_part || !newer.device_part) reasons.push('Device part is missing, so hardware compatibility cannot be verified.')
  else if (older.device_part !== newer.device_part) reasons.push(`Devices differ (${older.device_part} vs ${newer.device_part}).`)
  return reasons
}

function metricValue(report, type, key) {
  if (!report) return null
  const metrics = report.metrics || {}
  if (type === 'utilization') return resourcePercent(metrics[key])
  return numeric(metrics[key])
}

export function compareReports(older, newer, type) {
  const compatibility = compatibilityReasons(older, newer)
  const specs = type === 'timing' ? TIMING_METRICS : type === 'utilization' ? UTILIZATION_METRICS : POWER_METRICS
  const rows = specs.map(([label, key, unit]) => {
    const oldValue = metricValue(older, type, key)
    const newValue = metricValue(newer, type, key)
    const delta = oldValue !== null && newValue !== null ? newValue - oldValue : null
    let status = 'Incomparable'
    if (compatibility.length === 0 && delta !== null) {
      if (Math.abs(delta) < 1e-9) status = 'Unchanged'
      else if (type === 'timing') status = delta > 0 ? 'Improved' : 'Regressed'
      else status = 'Changed'
    }
    if (compatibility.length === 0 && delta === null) status = 'Incomparable'
    return {
      key, label, unit: type === 'utilization' ? '%' : unit,
      oldValue, newValue, delta, status,
      missing: oldValue === null || newValue === null,
    }
  }).filter((row) => type !== 'utilization' || row.oldValue !== null || row.newValue !== null)
    .filter((row) => type !== 'power' || row.oldValue !== null || row.newValue !== null)
  return { compatible: compatibility.length === 0, compatibility, rows }
}

export function formatComparisonValue(value, unit) {
  if (value === null || value === undefined) return 'N/A'
  const digits = unit === '%' ? 2 : unit === 'ns' ? 4 : 3
  return `${Number(value).toFixed(digits)} ${unit}`
}

export function formatComparisonChange(value, unit) {
  if (value === null || value === undefined) return 'N/A'
  const digits = unit === '%' ? 2 : unit === 'ns' ? 4 : 3
  const number = Number(value)
  return `${number > 0 ? '+' : ''}${number.toFixed(digits)}${unit === '%' ? ' pp' : ` ${unit}`}`
}

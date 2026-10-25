export function utilizationChartRows(metrics = {}) {
  return [
    ['LUT', metrics.slice_luts], ['FF', metrics.slice_registers],
    ['BRAM', metrics.block_ram_tiles], ['DSP', metrics.dsp_blocks],
    ['I/O', metrics.bonded_iobs], ['BUFG', { used: metrics.clock_buffers_bufgctrl_used }],
    ['LUT as Logic', { used: metrics.lut_as_logic_used }], ['LUT as Memory', { used: metrics.lut_as_memory_used }],
    ['FF as Flip-Flop', { used: metrics.register_as_flip_flop_used }], ['Register as Latch', { used: metrics.register_as_latch_used }],
    ['F7 Muxes', { used: metrics.f7_muxes_used }], ['F8 Muxes', { used: metrics.f8_muxes_used }],
  ].filter(([, resource]) => resource && typeof resource === 'object')
    .map(([name, resource]) => {
      const used = Number.isFinite(resource.used) ? resource.used : null
      const total = Number.isFinite(resource.available) && resource.available > 0 ? resource.available : null
      return {
        name,
        used,
        total,
        displayPercent: resource.utilization_percent ?? null,
        numericPercent: Number.isFinite(resource.utilization_percent_numeric)
          ? resource.utilization_percent_numeric
          : used !== null && total !== null ? used / total * 100 : null,
      }
    })
}

export function powerChartRows(metrics = {}) {
  return [
    ['Logic', metrics.logic_power_w], ['Signals', metrics.signal_power_w],
    ['Clocks', metrics.clock_power_w], ['I/O', metrics.io_power_w],
  ].filter(([, watts]) => Number.isFinite(watts))
    .map(([name, watts]) => ({ name, watts }))
}

const TIMING_SLACKS = [
  ['WNS', 'wns_ns', 'Setup'], ['TNS', 'tns_ns', 'Setup'],
  ['WHS', 'whs_ns', 'Hold'], ['THS', 'ths_ns', 'Hold'],
  ['WPWS', 'wpws_ns', 'Pulse width'], ['TPWS', 'tpws_ns', 'Pulse width'],
  ['Path slack', 'slack_ns', 'Path'],
]

export function timingSlackRows(metrics = {}) {
  return TIMING_SLACKS.flatMap(([name, key, group]) => Number.isFinite(metrics[key])
    ? [{ name, key, group, slack: metrics[key] }]
    : [])
}

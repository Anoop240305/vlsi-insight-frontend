// Illustrative fixtures used only when the explicit Demo project is selected.
// They are labelled as demo data and never serve as a fallback for uploads.

export const designSummary = {
  designName: 'axi_dma_top',
  version: 'v0.14',
  healthScore: 78, // 0-100, from the weighted timing/power/utilization formula
  status: 'warn', // 'pass' | 'warn' | 'fail'
  wnsNs: -0.084,
  tnsNs: -1.32,
  whsNs: 0.021,
  lutUsed: 18240,
  lutTotal: 53200,
  ffUsed: 24110,
  ffTotal: 106400,
  powerWatts: 1.86,
  lastRun: '2026-09-04T21:12:00Z',
}

export const timingPaths = [
  { id: 'P1', startpoint: 'u_fifo/rd_ptr_reg[4]', endpoint: 'u_ctrl/state_reg[2]', slackNs: -0.084, group: 'clk_200m' },
  { id: 'P2', startpoint: 'u_axi/araddr_reg[11]', endpoint: 'u_dec/sel_reg[3]', slackNs: -0.041, group: 'clk_200m' },
  { id: 'P3', startpoint: 'u_dma/len_cnt_reg[7]', endpoint: 'u_dma/len_cnt_reg[8]', slackNs: 0.112, group: 'clk_200m' },
  { id: 'P4', startpoint: 'u_ctrl/state_reg[0]', endpoint: 'u_fifo/wr_en', slackNs: 0.256, group: 'clk_100m' },
  { id: 'P5', startpoint: 'u_axi/rdata_reg[31]', endpoint: 'u_out/reg_out[31]', slackNs: 0.033, group: 'clk_200m' },
]

export const timingTrend = [
  { version: 'v0.10', wns: -0.31, tns: -4.8 },
  { version: 'v0.11', wns: -0.22, tns: -3.6 },
  { version: 'v0.12', wns: -0.19, tns: -2.9 },
  { version: 'v0.13', wns: -0.11, tns: -1.9 },
  { version: 'v0.14', wns: -0.084, tns: -1.32 },
]

export const powerBreakdown = [
  { name: 'Clocks', watts: 0.52 },
  { name: 'Logic', watts: 0.41 },
  { name: 'Signals', watts: 0.29 },
  { name: 'BRAM', watts: 0.34 },
  { name: 'I/O', watts: 0.18 },
  { name: 'DSP', watts: 0.12 },
]

export const utilization = [
  { name: 'LUT', used: 18240, total: 53200 },
  { name: 'FF', used: 24110, total: 106400 },
  { name: 'BRAM', used: 62, total: 140 },
  { name: 'DSP', used: 48, total: 220 },
  { name: 'IO', used: 96, total: 200 },
]

export const anomalies = [
  {
    id: 'AN-104',
    severity: 'high',
    metric: 'WNS (clk_200m)',
    detail: 'Slack regressed 3.4x versus the 5-version rolling median.',
    model: 'Isolation Forest',
  },
  {
    id: 'AN-101',
    severity: 'medium',
    metric: 'BRAM utilization',
    detail: 'Usage jumped 22% with no corresponding RTL change flagged.',
    model: 'One-Class SVM',
  },
  {
    id: 'AN-097',
    severity: 'low',
    metric: 'Dynamic power',
    detail: 'Clock-tree power trending upward over last 3 versions.',
    model: 'Isolation Forest',
  },
]

export const aiInsights = [
  {
    id: 'IN-1',
    title: 'Negative slack traced to a wide comparator on clk_200m',
    body:
      'The critical path from u_fifo/rd_ptr_reg[4] to u_ctrl/state_reg[2] crosses a 12-bit equality comparator ' +
      'with no pipeline register. Retiming one stage into the comparator recovers an estimated 0.09 ns.',
    tag: 'Timing',
    reportRef: 'timing.rpt: SLACK (VIOLATED) — line 214',
  },
  {
    id: 'IN-2',
    title: 'BRAM growth from an unshared FIFO template',
    body:
      'Three FIFOs instantiate independent 36-Kb BRAMs where usage patterns suggest a single shared, arbitrated ' +
      'FIFO would fit within one block, freeing roughly 33% of BRAM headroom.',
    tag: 'Utilization',
    reportRef: 'utilization.rpt: BRAM Summary — line 58',
  },
  {
    id: 'IN-3',
    title: 'Clock-tree power creeping up across versions',
    body:
      'Clock power rose in each of the last three versions without a matching frequency or fanout change, ' +
      'consistent with clock-gating being disabled on the DMA control block.',
    tag: 'Power',
    reportRef: 'power.rpt: Clocks — line 12',
  },
]

export const versionHistory = [
  { version: 'v0.11', date: '2026-08-18', health: 61 },
  { version: 'v0.12', date: '2026-08-24', health: 67 },
  { version: 'v0.13', date: '2026-08-30', health: 71 },
  { version: 'v0.14', date: '2026-09-04', health: 78 },
]

// This fixture is deliberately reachable only through the explicit Demo
// project option in the active-design selector. It is never a fallback for a
// real project or a failed backend request.
export function createDemoDashboard() {
  const runId = 'demo-run-v0.14'
  const timingReports = timingTrend.map((point, index) => {
    const current = index === timingTrend.length - 1
    return {
      id: `demo-timing-${point.version}`,
      project_id: 'demo',
      run_id: `demo-run-${point.version}`,
      stage: 'route_design',
      device_part: 'Demo FPGA part',
      name: `timing-${point.version}.rpt`,
      source_report: `timing-${point.version}.rpt`,
      report_type: 'timing',
      status: 'completed',
      extraction_status: 'completed',
      uploaded_at: `${point.version === 'v0.14' ? '2026-09-04' : '2026-08-18'}T12:00:00Z`,
      analysis_coverage: { clock_count: 2, clock_names: ['clk_200m', 'clk_100m'] },
      metrics: {
        wns_ns: point.wns,
        tns_ns: point.tns,
        whs_ns: current ? designSummary.whsNs : null,
        ths_ns: null,
        slack_ns: current ? point.wns : null,
        startpoint: current ? timingPaths[0].startpoint : null,
        endpoint: current ? timingPaths[0].endpoint : null,
        path_group: current ? timingPaths[0].group : null,
        timing_constraints_detected: true,
        timing_status: 'timing_reported',
      },
      interpretations: [{
        title: 'Demo setup slack', severity: point.wns < 0 ? 'critical' : 'informational',
        observed_metric: 'WNS / TNS', observed_value: { WNS: point.wns, TNS: point.tns }, unit: 'ns',
        observation: `WNS ${point.wns} ns; TNS ${point.tns} ns.`,
        engineering_interpretation: point.wns < 0 ? 'The demo values include negative setup slack.' : 'The demo setup slack is non-negative for the shown values.',
        why_it_matters: 'Slack indicates margin between required and arrival times for the reported timing data.',
        recommended_next_step: 'Inspect the displayed demo critical path and timing constraints.',
        evidence: { source_report: `timing-${point.version}.rpt`, stage: 'route_design' },
        confidence_or_limitations: 'Illustrative demo values only; not a Vivado measurement.',
      }],
    }
  })
  const powerReport = {
    id: 'demo-power-v0.14', project_id: 'demo', run_id: runId,
    stage: 'route_design', device_part: 'Demo FPGA part', name: 'power.rpt',
    source_report: 'power.rpt', report_type: 'power', status: 'completed',
    extraction_status: 'completed', uploaded_at: '2026-09-04T12:00:01Z',
    metrics: {
      total_on_chip_power_w: designSummary.powerWatts,
      dynamic_power_w: null, static_power_w: null, design_power_budget_w: null,
      clock_power_w: 0.52, logic_power_w: 0.41, signal_power_w: 0.29,
      io_power_w: 0.18, confidence: 'Demo',
    },
    interpretations: [{
      title: 'Demo power estimate', severity: 'informational', observed_metric: 'Total on-chip power',
      observed_value: designSummary.powerWatts, unit: 'W',
      observation: `Demo total on-chip estimate: ${designSummary.powerWatts} W.`,
      engineering_interpretation: 'The displayed component values are illustrative and are kept separate from the total.',
      why_it_matters: 'Power estimates help compare activity and budget scenarios.',
      recommended_next_step: 'Upload a Vivado power report to replace demo readings.',
      evidence: { source_report: 'power.rpt', stage: 'route_design' },
      confidence_or_limitations: 'Illustrative demo values only; not a Vivado measurement.',
    }],
  }
  const resources = [
    ['slice_luts', 18240, 53200], ['slice_registers', 24110, 106400],
    ['block_ram_tiles', 62, 140], ['dsp_blocks', 48, 220], ['bonded_iobs', 96, 200],
  ]
  const utilizationMetrics = Object.fromEntries(resources.map(([key, used, available]) => [key, {
    used, available, utilization_percent: `${((used / available) * 100).toFixed(2)}`,
    utilization_percent_numeric: (used / available) * 100,
  }]))
  const utilizationReport = {
    id: 'demo-utilization-v0.14', project_id: 'demo', run_id: runId,
    stage: 'route_design', device_part: 'Demo FPGA part', name: 'utilization.rpt',
    source_report: 'utilization.rpt', report_type: 'utilization', status: 'completed',
    extraction_status: 'completed', uploaded_at: '2026-09-04T12:00:02Z',
    metrics: utilizationMetrics,
    interpretations: [{
      title: 'Demo resource utilization', severity: 'informational', observed_metric: 'LUT / FF utilization',
      observed_value: { LUT: utilizationMetrics.slice_luts.utilization_percent, FF: utilizationMetrics.slice_registers.utilization_percent },
      unit: '%', observation: `Demo LUT usage ${utilizationMetrics.slice_luts.utilization_percent}%; FF usage ${utilizationMetrics.slice_registers.utilization_percent}%.`,
      engineering_interpretation: 'These sample percentages are based on the illustrative device capacities listed in the demo fixture.',
      why_it_matters: 'Resource counts indicate the portion of the sample device assigned to this design.',
      recommended_next_step: 'Upload a Vivado utilization report for actual device readings.',
      evidence: { source_report: 'utilization.rpt', stage: 'route_design' },
      confidence_or_limitations: 'Illustrative demo values only; not a Vivado measurement.',
    }],
  }
  const findings = [{
    severity: 'critical', category: 'timing', code: 'NEGATIVE_SLACK',
    title: 'Negative setup slack reported', metric: 'wns_ns',
    measured_evidence: { value: designSummary.wnsNs, unit: 'ns', source_report: 'timing-v0.14.rpt' },
    explanation: 'The demo timing report contains a negative WNS value.',
    likely_causes: ['A reported path may exceed its required time.'],
    recommended_next_step: 'Inspect the demo critical path and its constraints.',
    verification_criteria: 'A later demo run reports non-negative setup slack.',
  }]
  const latestTiming = timingReports[timingReports.length - 1]
  return {
    is_demo: true,
    project: { id: 'demo', name: `${designSummary.designName} · Demo` },
    projects: [{ id: 'demo', name: `${designSummary.designName} · Demo` }],
    runs: [{ id: runId, uploaded_at: '2026-09-04T12:00:02Z', report_count: 3, report_types: ['timing', 'power', 'utilization'] }],
    active_run_id: runId,
    latest: { timing: latestTiming, power: powerReport, utilization: utilizationReport },
    design_health: {
      score: null, assessment: 'Demo',
      domain_states: { timing: 'ANALYZED_FAIL', utilization: 'MEASURED', power: 'REPORTED' },
      findings,
    },
    analysis_coverage: {
      timing_readiness: { state: 'ANALYZED_FAIL', explanation: 'Demo timing data includes negative WNS.', next_action: 'Inspect the demo critical path.' },
      timing: { clock_count: 2, clock_names: ['clk_200m', 'clk_100m'], setup_total_endpoints: 128, unconstrained_internal_endpoints: 0 },
      power: { reported_fields: ['total_on_chip_power_w', 'clock_power_w', 'logic_power_w', 'signal_power_w', 'io_power_w'], power_budget_available: false, confidence: 'Demo' },
      utilization: { resources_with_used_and_available: resources.map(([key]) => key) },
    },
    stage_compatibility: { compatible: true, stages: { timing: 'route_design', power: 'route_design', utilization: 'route_design' }, devices: { timing: 'Demo FPGA part', power: 'Demo FPGA part', utilization: 'Demo FPGA part' }, reason: 'Demo values use one illustrative stage and device.' },
    reports: [...timingReports, powerReport, utilizationReport],
    anomalies,
    ai_insights: aiInsights,
  }
}

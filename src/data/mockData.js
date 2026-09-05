// Placeholder data shaped like what the Django REST API is expected to
// return once the parsing → analytics → AI layers are wired up. Replace
// each of these with an apiFetch() call against the matching endpoint.

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

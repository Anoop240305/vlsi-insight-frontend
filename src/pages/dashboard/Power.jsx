import React from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts'
import PanelCard from '../../components/ui/PanelCard.jsx'
import { powerBreakdown, designSummary } from '../../data/mockData.js'

const COLORS = ['#C6813F', '#3FBDB2', '#5FB98A', '#E0B84B', '#7E8FA1', '#E1636B']

export default function Power() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Power breakdown</h1>
        <p className="text-sm text-ink-500">
          Total estimated power: <span className="font-mono text-ink-100">{designSummary.powerWatts} W</span>
        </p>
      </div>

      <PanelCard eyebrow="power.rpt" title="By category">
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={powerBreakdown} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid stroke="#232E3D" strokeDasharray="3 3" horizontal={false} />
              <XAxis type="number" stroke="#7E8FA1" tick={{ fontSize: 11, fontFamily: 'IBM Plex Mono' }} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#7E8FA1"
                tick={{ fontSize: 12, fontFamily: 'IBM Plex Mono' }}
                width={70}
              />
              <Tooltip
                contentStyle={{ background: '#131A23', border: '1px solid #2B3646', fontSize: 12 }}
                labelStyle={{ color: '#EAF0F6' }}
              />
              <Bar dataKey="watts" name="Watts" radius={[0, 3, 3, 0]}>
                {powerBreakdown.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </PanelCard>
    </div>
  )
}

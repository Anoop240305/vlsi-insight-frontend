import React from 'react'
import { Sparkles } from 'lucide-react'
import PanelCard from '../../components/ui/PanelCard.jsx'
import { aiInsights } from '../../data/mockData.js'

const TAG_STYLE = {
  Timing: 'text-fail border-fail/30',
  Power: 'text-warn border-warn/30',
  Utilization: 'text-signal-400 border-signal-500/30',
}

export default function AIInsights() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="text-copper-400" />
        <div>
          <h1 className="text-lg font-semibold text-ink-100">AI insights</h1>
          <p className="text-sm text-ink-500">
            Plain-English summaries from the Qwen / LLaMA layer, with the exact report line behind each one.
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {aiInsights.map((i) => (
          <PanelCard key={i.id}>
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-medium text-ink-100">{i.title}</h3>
              <span className={`shrink-0 rounded border px-2 py-0.5 font-mono text-[11px] ${TAG_STYLE[i.tag]}`}>
                {i.tag}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink-300">{i.body}</p>
            <p className="mt-3 font-mono text-[11px] text-ink-500">↳ {i.reportRef}</p>
          </PanelCard>
        ))}
      </div>
    </div>
  )
}

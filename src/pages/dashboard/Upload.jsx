import React, { useCallback, useState } from 'react'
import { UploadCloud, FileText, CheckCircle2, Loader2 } from 'lucide-react'
import PanelCard from '../../components/ui/PanelCard.jsx'

// TODO: replace this local queue with a real upload to your Django endpoint,
// e.g. POST /api/reports/upload/ (multipart/form-data), one request per file
// or batched — then poll /api/reports/{id}/status/ for parser progress.

export default function Upload() {
  const [files, setFiles] = useState([])
  const [dragOver, setDragOver] = useState(false)

  const addFiles = useCallback((fileList) => {
    const next = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      status: 'queued', // queued | parsing | done
    }))
    setFiles((prev) => [...prev, ...next])
    // Simulate the pipeline moving from queued -> parsing -> done.
    next.forEach((_, i) => {
      const idx = files.length + i
      setTimeout(() => setStatusAt(idx, 'parsing'), 400 + i * 200)
      setTimeout(() => setStatusAt(idx, 'done'), 1600 + i * 200)
    })
  }, [files.length])

  function setStatusAt(idx, status) {
    setFiles((prev) => prev.map((f, i) => (i === idx ? { ...f, status } : f)))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-ink-100">Upload reports</h1>
        <p className="text-sm text-ink-500">
          Bring in Vivado timing, power, and utilization <span className="font-mono">.rpt</span> files for parsing.
        </p>
      </div>

      <PanelCard>
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); addFiles(e.dataTransfer.files) }}
          className={`flex flex-col items-center justify-center gap-3 rounded border-2 border-dashed px-6 py-14 text-center transition-colors ${
            dragOver ? 'border-signal-500 bg-signal-500/5' : 'border-trace'
          }`}
        >
          <UploadCloud size={30} className="text-copper-400" />
          <p className="text-sm text-ink-300">Drag and drop .rpt files here</p>
          <label className="cursor-pointer rounded border border-trace px-3 py-1.5 font-mono text-xs text-ink-300 hover:border-copper-500 hover:text-copper-400">
            Browse files
            <input
              type="file"
              multiple
              accept=".rpt,.txt"
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
          </label>
          <p className="font-mono text-[11px] text-ink-500">timing.rpt · power.rpt · utilization.rpt</p>
        </div>
      </PanelCard>

      {files.length > 0 && (
        <PanelCard title="Parsing queue" eyebrow="Step 1 → 2">
          <ul className="divide-y divide-trace">
            {files.map((f, i) => (
              <li key={i} className="flex items-center justify-between py-2.5">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-ink-500" />
                  <span className="font-mono text-sm text-ink-100">{f.name}</span>
                  <span className="font-mono text-xs text-ink-500">{(f.size / 1024).toFixed(1)} KB</span>
                </div>
                {f.status === 'done' ? (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-pass">
                    <CheckCircle2 size={14} /> parsed
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5 font-mono text-xs text-signal-400">
                    <Loader2 size={14} className="animate-spin" /> {f.status}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </PanelCard>
      )}
    </div>
  )
}

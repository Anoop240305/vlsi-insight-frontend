import React from 'react'
import { FileText, CheckCircle2, Loader2 } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

export default function ParsingQueue({ files }) {
  if (files.length === 0) return null
  return (
    <Card title="Parsing queue">
      <ul className="divide-y divide-line">
        {files.map((f) => (
          <li key={f.id} className="flex items-center justify-between gap-3 py-2.5">
            <div className="flex min-w-0 items-center gap-2.5">
              <FileText size={16} className="shrink-0 text-muted" />
              <span className="truncate font-mono text-[13px] text-ink">{f.name}</span>
              <span className="shrink-0 text-xs text-muted">{(f.size / 1024).toFixed(1)} KB</span>
            </div>
            {f.status === 'done' ? (
              <span className="flex shrink-0 items-center gap-1.5 text-sm text-pass">
                <CheckCircle2 size={14} /> Parsed
              </span>
            ) : (
              <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted">
                <Loader2 size={14} className="animate-spin" /> {f.status === 'parsing' ? 'Parsing' : 'Queued'}
              </span>
            )}
          </li>
        ))}
      </ul>
    </Card>
  )
}

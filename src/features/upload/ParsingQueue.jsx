import React from 'react'
import { CheckCircle2, FileText, Loader2, XCircle, X } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

const STATUS_LABELS = {
  selected: 'Ready to parse',
  parsing: 'Uploading and parsing',
  completed: 'Parsed successfully',
  failed: 'Failed',
}

export default function ParsingQueue({ files, onRemove, isParsing }) {
  if (files.length === 0) return null
  return (
    <Card title={`Selected reports (${files.length}/3)`}>
      <ul className="divide-y divide-line">
        {files.map((file) => (
          <li key={file.id} className="flex items-center justify-between gap-3 py-3">
            <div className="flex min-w-0 items-start gap-2.5">
              <FileText size={16} className="mt-0.5 shrink-0 text-muted" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2">
                  <span className="truncate font-mono text-[13px] text-ink">{file.name}</span>
                  <span className="shrink-0 text-xs text-muted">{(file.size / 1024).toFixed(1)} KB</span>
                </div>
                <p className={`mt-0.5 text-xs ${file.status === 'failed' ? 'text-fail' : 'text-muted'}`}>
                  {file.error || STATUS_LABELS[file.status]}
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              {file.status === 'completed' && <CheckCircle2 size={16} className="text-pass" aria-label="Parsed" />}
              {file.status === 'failed' && <XCircle size={16} className="text-fail" aria-label="Failed" />}
              {file.status === 'parsing' && <Loader2 size={16} className="animate-spin text-accent" aria-label="Parsing" />}
              {file.status !== 'parsing' && (
                <button type="button" onClick={() => onRemove(file.id)} disabled={isParsing}
                  aria-label={`Remove ${file.name}`} title="Remove from list" className="rounded p-1 text-muted hover:bg-track hover:text-ink disabled:opacity-50">
                  <X size={16} />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  )
}

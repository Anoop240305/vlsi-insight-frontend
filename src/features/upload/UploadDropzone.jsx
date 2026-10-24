import React, { useState } from 'react'
import { UploadCloud } from 'lucide-react'
import Card from '../../components/ui/Card.jsx'

export default function UploadDropzone({ onFiles }) {
  const [dragOver, setDragOver] = useState(false)

  return (
    <Card>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); onFiles(e.dataTransfer.files) }}
        className={`flex flex-col items-center justify-center gap-3 rounded-md border-2 border-dashed px-6 py-14 text-center transition-colors ${
          dragOver ? 'border-accent bg-accent/5' : 'border-line'
        }`}
      >
        <UploadCloud size={28} className="text-accent" />
        <p className="text-sm text-ink">Drag and drop .rpt files here</p>
        <label className="cursor-pointer rounded-md bg-accent px-4 py-2 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
          Browse files
          <input
            type="file"
            multiple
            accept=".rpt,.txt"
            className="sr-only"
            onChange={(e) => e.target.files && onFiles(e.target.files)}
          />
        </label>
        <p className="text-sm text-muted">timing.rpt, power.rpt, utilization.rpt</p>
      </div>
    </Card>
  )
}

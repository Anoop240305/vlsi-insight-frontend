import React from 'react'
import { Loader2 } from 'lucide-react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { UploadDropzone, ParsingQueue, useUploadQueue } from '../../features/index.js'
import { DEMO_MODE } from '../../lib/api.js'
import { useDashboardData } from '../../features/reports/useDashboardData.jsx'

export default function Upload() {
  const { data, activeProjectId } = useDashboardData()
  const { files, addFiles, removeFile, parseSelected, isParsing, selectionError } = useUploadQueue()
  const targetProjectId = activeProjectId && activeProjectId !== 'demo'
    ? activeProjectId
    : !activeProjectId && data.project?.id && String(data.project.id) !== 'demo'
      ? data.project.id
      : null
  return (
    <div className="dashboard-page">
      <PageHeader title="Upload reports" description="Reports are saved to the project selected in the top bar." />
      {DEMO_MODE && <p role="status" className="rounded-md bg-warn/10 px-4 py-3 text-sm text-warn">
        Backend uploads are disabled in demo mode. Set VITE_API_BASE_URL to your local Django API to enable parsing.
      </p>}
      <UploadDropzone onFiles={addFiles} disabled={isParsing || files.length >= 3} />
      {selectionError && <p role="alert" className="text-sm text-fail">{selectionError}</p>}
      <ParsingQueue files={files} onRemove={removeFile} isParsing={isParsing} />
      {files.length > 0 && <div className="flex justify-end">
        <button type="button" onClick={() => parseSelected(targetProjectId)} disabled={isParsing || DEMO_MODE || !files.some((file) => file.status === 'selected')}
          className="flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-accent-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50">
          {isParsing && <Loader2 size={16} className="animate-spin" />}
          {isParsing ? 'Parsing reports…' : 'Parse selected reports'}
        </button>
      </div>}
    </div>
  )
}

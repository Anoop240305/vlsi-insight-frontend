import React from 'react'
import PageHeader from '../../components/ui/PageHeader.jsx'
import { UploadDropzone, ParsingQueue, useUploadQueue } from '../../features/index.js'

export default function Upload() {
  const { files, addFiles } = useUploadQueue()
  return (
    <div className="space-y-6">
      <PageHeader title="Upload reports" description="Bring in Vivado timing, power and utilization .rpt files for parsing." />
      <UploadDropzone onFiles={addFiles} />
      <ParsingQueue files={files} />
    </div>
  )
}

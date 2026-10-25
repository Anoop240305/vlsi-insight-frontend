import { useCallback, useState } from 'react'
import { uploadReportFiles } from '../../lib/api.js'

const MAX_FILES = 3

export function useUploadQueue() {
  const [files, setFiles] = useState([])
  const [isParsing, setIsParsing] = useState(false)
  const [selectionError, setSelectionError] = useState('')

  const addFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList || [])
    const slots = MAX_FILES - files.length
    if (incoming.length > slots) {
      setSelectionError(`You can select up to ${MAX_FILES} reports. Remove a file before adding another.`)
    } else {
      setSelectionError('')
    }
    const accepted = incoming.slice(0, Math.max(0, slots)).map((file, index) => ({
        id: `${Date.now()}-${files.length + index}-${file.name}`,
        file,
        name: file.name,
        size: file.size,
        status: 'selected',
        error: null,
    }))
    setFiles((current) => [...current, ...accepted])
  }, [files.length])

  const removeFile = useCallback((id) => {
    if (!isParsing) setFiles((current) => current.filter((item) => item.id !== id))
  }, [isParsing])

  const parseSelected = useCallback(async (projectId = null) => {
    const selected = files.filter((item) => item.status === 'selected')
    if (isParsing || selected.length === 0) return
    setSelectionError('')
    setIsParsing(true)
    const selectedIds = new Set(selected.map((item) => item.id))
    setFiles((current) => current.map((item) => selectedIds.has(item.id)
      ? { ...item, status: 'parsing', error: null }
      : item))
    try {
      const result = await uploadReportFiles(selected.map((item) => item.file), projectId)
      const reports = result.reports || []
      const firstCompleted = reports.find((report) => report?.status === 'completed')
      const firstSaved = reports.find((report) => report?.id)
      if (firstSaved) {
        window.dispatchEvent(new CustomEvent('verisight:reports-updated', {
          detail: {
            projectId: firstCompleted?.project_id || firstSaved.project_id || null,
            runId: firstCompleted?.run_id || firstSaved.run_id || null,
          },
        }))
      }
      setFiles((current) => current.map((item) => {
        if (!selectedIds.has(item.id)) return item
        const report = reports[selected.findIndex((candidate) => candidate.id === item.id)]
        return {
          ...item,
          status: report?.status === 'completed' ? 'completed' : 'failed',
          error: report?.error || (report ? null : 'The API did not return a result for this file.'),
          reportId: report?.id,
        }
      }))
    } catch (error) {
      setFiles((current) => current.map((item) => selectedIds.has(item.id) ? ({
        ...item,
        status: 'failed',
        error: error.message || 'The report could not be submitted.',
      }) : item))
    } finally {
      setIsParsing(false)
    }
  }, [files, isParsing])

  return { files, addFiles, removeFile, parseSelected, isParsing, selectionError }
}

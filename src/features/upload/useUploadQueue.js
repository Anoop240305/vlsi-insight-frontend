import { useCallback, useEffect, useRef, useState } from 'react'

// TODO: replace the simulated progress below with a real upload to your Django
// endpoint, e.g. POST /api/reports/upload/ (multipart/form-data), then poll
// /api/reports/{id}/status/ for parser progress. Keep the returned shape
// ({ files, addFiles }) and the UI needs no changes.
export function useUploadQueue() {
  const [files, setFiles] = useState([])
  const nextId = useRef(0)
  const timers = useRef([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const setStatus = (id, status) =>
    setFiles((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)))

  const addFiles = useCallback((fileList) => {
    const items = Array.from(fileList).map((f) => ({
      id: ++nextId.current,
      name: f.name,
      size: f.size,
      status: 'queued', // queued | parsing | done
    }))
    setFiles((prev) => [...prev, ...items])
    items.forEach((item, i) => {
      timers.current.push(setTimeout(() => setStatus(item.id, 'parsing'), 400 + i * 200))
      timers.current.push(setTimeout(() => setStatus(item.id, 'done'), 1600 + i * 200))
    })
  }, [])

  return { files, addFiles }
}

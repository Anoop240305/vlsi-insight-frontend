import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { DEMO_MODE, fetchDashboard } from '../../lib/api.js'
import { createDemoDashboard } from '../../data/mockData.js'

const EMPTY_DASHBOARD = {
  project: null,
  projects: [],
  runs: [],
  active_run_id: null,
  latest: { timing: null, power: null, utilization: null },
  analysis_coverage: {},
  stage_compatibility: { compatible: null, stages: {}, reason: 'No report stages are available to compare.' },
  design_health: { score: null, assessment: 'Insufficient evidence', domain_states: {}, findings: [] },
  reports: [],
}

const DesignDataContext = createContext(null)

export function DesignDataProvider({ children }) {
  const [activeProjectId, setActiveProjectIdState] = useState(() => (
    typeof localStorage === 'undefined' ? null : localStorage.getItem('verisight_project_id')
  ))
  const [activeRunId, setActiveRunIdState] = useState(() => (
    typeof localStorage === 'undefined' ? null : localStorage.getItem('verisight_run_id')
  ))
  const [data, setData] = useState(EMPTY_DASHBOARD)
  const [loading, setLoading] = useState(!DEMO_MODE)
  const [error, setError] = useState(DEMO_MODE ? 'Connect the Django API to load saved project data.' : '')

  const setActiveProjectId = useCallback((projectId, runId = null) => {
    const normalized = projectId ? String(projectId) : null
    const projectChanged = normalized !== activeProjectId
    if (projectChanged) setData(EMPTY_DASHBOARD)
    setActiveProjectIdState(normalized)
    const selectedRun = runId ? String(runId) : projectChanged ? null : activeRunId
    setActiveRunIdState(selectedRun)
    if (selectedRun) localStorage.setItem('verisight_run_id', selectedRun)
    else localStorage.removeItem('verisight_run_id')
    if (normalized) localStorage.setItem('verisight_project_id', normalized)
    else localStorage.removeItem('verisight_project_id')
  }, [activeProjectId, activeRunId])

  const setActiveRunId = useCallback((runId) => {
    const normalized = runId ? String(runId) : null
    setActiveRunIdState(normalized)
    if (normalized) localStorage.setItem('verisight_run_id', normalized)
    else localStorage.removeItem('verisight_run_id')
  }, [])

  const refresh = useCallback(async () => {
    if (activeProjectId === 'demo') {
      const demo = createDemoDashboard()
      setData(demo)
      if (activeRunId !== demo.active_run_id) setActiveRunId(demo.active_run_id)
      setLoading(false)
      setError('')
      return
    }
    if (DEMO_MODE) {
      setData(EMPTY_DASHBOARD)
      setLoading(false)
      setError('Select the Demo project or configure VITE_API_BASE_URL to load saved projects from Django.')
      if (activeProjectId) setActiveProjectId(null)
      return
    }
    setLoading(true)
    setError('')
    try {
      const next = await fetchDashboard(activeProjectId, activeRunId)
      setData(next)
      // Once the API picks its default project, keep that same project active
      // after page navigation and a browser refresh.
      if (!activeProjectId && next.project?.id) setActiveProjectId(next.project.id)
      if (next.active_run_id && next.active_run_id !== activeRunId) setActiveRunId(next.active_run_id)
    } catch (fetchError) {
      setError(fetchError.message || 'Could not load saved project data.')
    } finally {
      setLoading(false)
    }
  }, [activeProjectId, activeRunId, setActiveProjectId, setActiveRunId])

  useEffect(() => { refresh() }, [refresh])

  useEffect(() => {
    const projectChanged = (event) => setActiveProjectId(event.detail?.projectId || null)
    const reportsUpdated = (event) => {
      if (!event.detail?.projectId) {
        refresh()
        return
      }
      if (String(event.detail.projectId) === String(activeProjectId)) {
        if (event.detail.runId) setActiveRunId(event.detail.runId)
        else refresh()
      } else setActiveProjectId(event.detail.projectId, event.detail.runId)
    }
    window.addEventListener('verisight:project-change', projectChanged)
    window.addEventListener('verisight:reports-updated', reportsUpdated)
    return () => {
      window.removeEventListener('verisight:project-change', projectChanged)
      window.removeEventListener('verisight:reports-updated', reportsUpdated)
    }
  }, [activeProjectId, refresh, setActiveProjectId, setActiveRunId])

  return (
    <DesignDataContext.Provider value={{ data, loading, error, refresh, activeProjectId, setActiveProjectId, activeRunId, setActiveRunId }}>
      {children}
    </DesignDataContext.Provider>
  )
}

export function useDashboardData() {
  const context = useContext(DesignDataContext)
  if (!context) throw new Error('useDashboardData must be used within DesignDataProvider')
  return context
}

export function displayMetric(value, digits = 3) {
  if (value === null || value === undefined || value === '' || !Number.isFinite(Number(value))) return 'NA'
  return Number(value).toFixed(digits)
}

export function displayCount(value) {
  if (value === null || value === undefined || !Number.isFinite(Number(value))) return 'NA'
  return Number(value).toLocaleString()
}

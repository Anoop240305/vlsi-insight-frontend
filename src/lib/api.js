const BASE_URL = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api').replace(/\/$/, '')

export const DEMO_MODE = !import.meta.env.VITE_API_BASE_URL

function getAccessToken() {
  return localStorage.getItem('si_access_token')
}

export function setTokens({ access }) {
  if (access) localStorage.setItem('si_access_token', access)
}

export function clearTokens() {
  localStorage.removeItem('si_access_token')
  localStorage.removeItem('si_refresh_token')
}

export async function loginRequest(username, password, email = '') {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    if (!username || !password) throw new Error('Username and password are required.')
    return { access: 'mock.demo.token', user: { username, email, first_name: '', last_name: '' } }
  }

  let response
  try {
    response = await fetch(`${BASE_URL}/token/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, email }),
    })
  } catch {
    throw new Error(`Can't reach the API at ${BASE_URL}. Check VITE_API_BASE_URL and that Django is running.`)
  }
  const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.detail || 'Invalid username or password.')
  return { access: body.token, user: body.user }
}

export async function fetchProfile() {
  return readResponse(await apiFetch('/profile/'))
}

export async function apiFetch(path, options = {}) {
  const token = getAccessToken()
  const headers = { ...(options.headers || {}) }
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData
  if (!isFormData && options.body && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  if (token && !token.startsWith('mock.')) headers.Authorization = `Token ${token}`

  let response
  try {
    response = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  } catch {
    throw new Error(`Can't reach the API at ${BASE_URL}. Check that Django is running and CORS is configured.`)
  }

  if (response.status === 401) {
    clearTokens()
    window.location.href = '/login'
    throw new Error('Your session expired. Please sign in again.')
  }
  return response
}

async function readResponse(response) {
  const body = await response.json().catch(() => ({}))
  if (!response.ok) {
    const message = body.error || body.detail || 'The API request failed.'
    throw new Error(message)
  }
  return body
}

export async function uploadReportFiles(files, projectId = null) {
  if (DEMO_MODE) {
    throw new Error('Configure VITE_API_BASE_URL to connect uploads to Django.')
  }
  const form = new FormData()
  files.forEach((file) => form.append('files', file))
  if (projectId) form.append('project_id', String(projectId))
  return readResponse(await apiFetch('/reports/upload/', { method: 'POST', body: form }))
}

export async function fetchDashboard(projectId, runId) {
  const query = new URLSearchParams()
  if (projectId) query.set('project_id', projectId)
  if (runId) query.set('run_id', runId)
  const suffix = query.size ? `?${query.toString()}` : ''
  return readResponse(await apiFetch(`/dashboard/${suffix}`))
}

// -----------------------------------------------------------------------------
// Thin API client. Swap BASE_URL for your Django backend and wire up the two
// TODOs below — everything else in the app calls through here, so that's the
// only file that needs to change when you connect real endpoints.
// -----------------------------------------------------------------------------

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'

function getAccessToken() {
  return localStorage.getItem('si_access_token')
}

function getRefreshToken() {
  return localStorage.getItem('si_refresh_token')
}

export function setTokens({ access, refresh }) {
  if (access) localStorage.setItem('si_access_token', access)
  if (refresh) localStorage.setItem('si_refresh_token', refresh)
}

export function clearTokens() {
  localStorage.removeItem('si_access_token')
  localStorage.removeItem('si_refresh_token')
}

// TODO: point this at your real login endpoint, e.g. POST /api/token/
// Expected response shape: { access: string, refresh: string }
export async function loginRequest(username, password) {
  // --- Mock implementation so the UI is usable before the backend exists ---
  if (import.meta.env.DEV && !import.meta.env.VITE_API_BASE_URL) {
    await new Promise((r) => setTimeout(r, 550))
    if (!username || !password) throw new Error('Username and password are required.')
    return { access: 'mock.jwt.access', refresh: 'mock.jwt.refresh' }
  }
  const res = await fetch(`${BASE_URL}/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!res.ok) throw new Error('Invalid credentials.')
  return res.json()
}

// TODO: point this at your refresh endpoint, e.g. POST /api/token/refresh/
export async function refreshRequest() {
  const refresh = getRefreshToken()
  if (!refresh) throw new Error('No refresh token available.')
  const res = await fetch(`${BASE_URL}/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!res.ok) throw new Error('Session expired.')
  return res.json()
}

// Generic authenticated fetch wrapper. Attaches the JWT and retries once
// after a refresh if the access token has expired (401).
export async function apiFetch(path, options = {}) {
  const access = getAccessToken()
  const doFetch = (token) =>
    fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...options.headers,
      },
    })

  let res = await doFetch(access)
  if (res.status === 401) {
    try {
      const { access: newAccess, refresh } = await refreshRequest()
      setTokens({ access: newAccess, refresh })
      res = await doFetch(newAccess)
    } catch {
      clearTokens()
      window.location.href = '/login'
      throw new Error('Session expired, please sign in again.')
    }
  }
  return res
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { loginRequest, setTokens, clearTokens } from '../lib/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [status, setStatus] = useState('idle') // idle | authenticating | error
  const [error, setError] = useState(null)

  useEffect(() => {
    // Rehydrate a "logged in" UI state from a stored token on refresh.
    // Real validation of the token's expiry should happen server-side on
    // the first authenticated request (see apiFetch's 401 handling).
    const access = localStorage.getItem('si_access_token')
    const storedUser = localStorage.getItem('si_user')
    if (access && storedUser) setUser(JSON.parse(storedUser))
  }, [])

  async function login(username, password) {
    setStatus('authenticating')
    setError(null)
    try {
      const { access, refresh } = await loginRequest(username, password)
      setTokens({ access, refresh })
      const nextUser = { username }
      localStorage.setItem('si_user', JSON.stringify(nextUser))
      setUser(nextUser)
      setStatus('idle')
      return true
    } catch (e) {
      setError(e.message || 'Sign-in failed.')
      setStatus('error')
      return false
    }
  }

  function logout() {
    clearTokens()
    localStorage.removeItem('si_user')
    setUser(null)
  }

  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, status, error, login, logout }),
    [user, status, error],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}

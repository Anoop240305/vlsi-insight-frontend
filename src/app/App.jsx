import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '../theme/ThemeProvider.jsx'
import { AuthProvider, ProtectedRoute } from '../features/auth/index.js'
import DashboardLayout from '../components/layout/DashboardLayout.jsx'

import Login from '../pages/Login.jsx'
import Overview from '../pages/dashboard/Overview.jsx'
import Upload from '../pages/dashboard/Upload.jsx'
import Timing from '../pages/dashboard/Timing.jsx'
import Power from '../pages/dashboard/Power.jsx'
import Utilization from '../pages/dashboard/Utilization.jsx'
import Anomalies from '../pages/dashboard/Anomalies.jsx'
import AIInsights from '../pages/dashboard/AIInsights.jsx'
import VersionCompare from '../pages/dashboard/VersionCompare.jsx'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/login" element={<Login />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Overview />} />
              <Route path="upload" element={<Upload />} />
              <Route path="timing" element={<Timing />} />
              <Route path="power" element={<Power />} />
              <Route path="utilization" element={<Utilization />} />
              <Route path="anomalies" element={<Anomalies />} />
              <Route path="insights" element={<AIInsights />} />
              <Route path="versions" element={<VersionCompare />} />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

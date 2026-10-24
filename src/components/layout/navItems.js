import {
  LayoutDashboard, UploadCloud, Activity, Zap, Grid3x3, Sparkles, GitCompareArrows, AlertTriangle,
} from 'lucide-react'

// One place to add, rename or reorder sections.
export const NAV_ITEMS = [
  { to: '/dashboard', label: 'Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/upload', label: 'Upload reports', icon: UploadCloud },
  { to: '/dashboard/timing', label: 'Timing paths', icon: Activity },
  { to: '/dashboard/power', label: 'Power breakdown', icon: Zap },
  { to: '/dashboard/utilization', label: 'Utilization', icon: Grid3x3 },
  { to: '/dashboard/anomalies', label: 'Anomalies', icon: AlertTriangle },
  { to: '/dashboard/insights', label: 'AI insights', icon: Sparkles },
  { to: '/dashboard/versions', label: 'Version compare', icon: GitCompareArrows },
]

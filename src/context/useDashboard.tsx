import { useContext } from 'react'
import { DashboardContext } from './DashboardContextValue'
import type { DashboardData } from './DashboardContext'

export const useDashboard = (): DashboardData => {
  const context = useContext(DashboardContext)
  if (!context) {
    throw new Error('useDashboard must be used within DashboardProvider')
  }
  return context
}
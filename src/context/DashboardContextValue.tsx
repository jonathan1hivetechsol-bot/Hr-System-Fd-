import { createContext } from 'react'
import type { DashboardData } from './DashboardContext'

export const DashboardContext = createContext<DashboardData | undefined>(undefined)
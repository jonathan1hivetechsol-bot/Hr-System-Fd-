import { createContext } from 'react'
import type { NotificationContextType } from './useNotificationContext'

export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)
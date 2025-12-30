import { NotificationProvider } from '@/context/useNotificationContext'
import { DashboardProvider } from '@/context/DashboardContext'
import { FirebaseProvider } from '@/firebase'
import type { ChildrenType } from '@/types/component-props'
import Aos from 'aos'
import { useEffect } from 'react'

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  useEffect(() => {
    Aos.init()
  }, [])

  return (
    <FirebaseProvider>
      <NotificationProvider>
        <DashboardProvider>
          {children}
        </DashboardProvider>
      </NotificationProvider>
    </FirebaseProvider>
  )
}
export default AppProvidersWrapper

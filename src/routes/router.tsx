import DashboardLayout from '@/layout/DashboardLayout'
import DefaultLayout from '@/layout/DefaultLayout'
import AuthGuard from '@/components/guards/AuthGuard'
import { Route, Routes, type RouteProps } from 'react-router-dom'
import { appRoutes, dashboardPages } from './index'

const AppRouter = (props: RouteProps) => {
  return (
    <Routes>
      {(appRoutes || []).map((route, idx) => {
        // Don't wrap auth routes in DefaultLayout since they have their own full-page layout
        const isAuthRoute = route.path?.startsWith('/auth')
        const element = isAuthRoute ? route.element : <DefaultLayout {...props}>{route.element}</DefaultLayout>
        return (
          <Route key={idx + route.name} path={route.path} element={element} />
        )
      })}

      {(dashboardPages || []).map((route, idx) => (
        <Route
          key={idx + route.name}
          path={route.path}
          element={
            <AuthGuard>
              <DashboardLayout {...props}>{route.element}</DashboardLayout>
            </AuthGuard>
          }
        />
      ))}
    </Routes>
  )
}

export default AppRouter

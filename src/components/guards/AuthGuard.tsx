import { useFirebase } from '@/firebase'
import { Navigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'

interface AuthGuardProps {
  children: ReactNode
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { user, loading, userProfile } = useFirebase()
  const location = useLocation()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  if (!user) {
    // Redirect to employee login page (default) with return url
    return <Navigate to="/auth/employee-login" state={{ from: location }} replace />
  }

  // For employees, check if profile is complete
  if (userProfile?.role === 'employee' && !userProfile.profileComplete) {
    return <Navigate to="/auth/employee-profile-complete" state={{ from: location }} replace />
  }

  // Role-based access control
  // Employees cannot access admin pages (HR, Admin dashboard)
  if (userProfile?.role === 'employee') {
    const restrictedPaths = [
      '/dashboards/hr',
      '/dashboards/admin',
      '/dashboards/dashboard' // Main dashboard is admin only
    ]
    
    if (restrictedPaths.some(path => location.pathname.startsWith(path))) {
      // Redirect employee to their own dashboard
      return <Navigate to="/dashboards/dashboard/employee" replace />
    }
  }

  return <>{children}</>
}

export default AuthGuard
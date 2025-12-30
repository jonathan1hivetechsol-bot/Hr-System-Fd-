import { Navigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'

interface EmployeeProfileGuardProps {
  children: React.ReactNode
}

export const EmployeeProfileGuard = ({ children }: EmployeeProfileGuardProps) => {
  const { userRole, userProfile, loading } = useFirebase()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  // If not an employee, redirect to login
  if (!userRole || userRole !== 'employee') {
    return <Navigate to="/auth/employee-login" replace />
  }

  // If profile is not complete, redirect to profile completion
  if (userProfile && !userProfile.profileComplete) {
    return <Navigate to="/auth/employee-profile-complete" replace />
  }

  return <>{children}</>
}

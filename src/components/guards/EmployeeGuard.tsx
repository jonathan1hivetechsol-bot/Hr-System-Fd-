import { Navigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'

interface EmployeeGuardProps {
  children: React.ReactNode
}

export const EmployeeGuard = ({ children }: EmployeeGuardProps) => {
  const { userRole, loading } = useFirebase()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!userRole || userRole !== 'employee') {
    return <Navigate to="/auth/employee-login" replace />
  }

  return <>{children}</>
}

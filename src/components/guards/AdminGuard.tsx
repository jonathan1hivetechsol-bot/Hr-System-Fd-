import { Navigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'

interface AdminGuardProps {
  children: React.ReactNode
}

export const AdminGuard = ({ children }: AdminGuardProps) => {
  const { userRole, loading } = useFirebase()

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  if (!userRole || userRole !== 'admin') {
    return <Navigate to="/auth/admin-login" replace />
  }

  return <>{children}</>
}

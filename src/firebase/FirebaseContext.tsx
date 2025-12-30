import { createContext, useEffect, useState, type ReactNode } from 'react'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { requestForToken, loginUser, logoutUser, getUserRole, registerAdmin, registerEmployee } from './firebaseUtils'
import { auth, db, messaging } from './config'
import type { UserRole } from '@/types/auth'

interface FirebaseResult {
  success: boolean
  error?: string
  data?: unknown
}

interface UserProfile {
  id: string
  email: string
  name: string
  role: UserRole
  profileComplete?: boolean
  [key: string]: unknown
}

interface FirebaseContextType {
  user: User | null
  userProfile: UserProfile | null
  userRole: UserRole | null
  loading: boolean
  auth: typeof auth
  db: typeof db
  messaging: typeof messaging
  signIn: (email: string, password: string) => Promise<FirebaseResult>
  signOut: () => Promise<FirebaseResult>
  registerAdminUser: (email: string, password: string, displayName: string) => Promise<FirebaseResult>
  registerEmployeeUser: (email: string, password: string, displayName: string) => Promise<FirebaseResult>
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined)

export { FirebaseContext }

interface FirebaseProviderProps {
  children: ReactNode
}

export const FirebaseProvider = ({ children }: FirebaseProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [userRole, setUserRole] = useState<UserRole | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)

      if (user) {
        try {
          // Get user role and profile
          const roleResult = await getUserRole(user.uid)
          if (roleResult.success && roleResult.data) {
            const profileData = roleResult.data as UserProfile
            const role = profileData.role as UserRole
            setUserRole(role)
            setUserProfile({
              ...profileData,
              id: user.uid,
              email: user.email || '',
              name: user.displayName || '',
              role
            })
          }

          // Request notification permission and get token
          try {
            const tokenResult = await requestForToken()
            if (tokenResult.success && tokenResult.data) {
              console.log('Notification token obtained:', tokenResult.data)
            }
          } catch (error) {
            console.error('Failed to get notification token:', error)
          }
        } catch (error) {
          console.error('Failed to get user role:', error)
        }
      } else {
        setUserRole(null)
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signIn = async (email: string, password: string): Promise<FirebaseResult> => {
    return await loginUser(email, password)
  }

  const signOutUser = async (): Promise<FirebaseResult> => {
    setUserRole(null)
    setUserProfile(null)
    return await logoutUser()
  }

  const registerAdminUser = async (email: string, password: string, displayName: string): Promise<FirebaseResult> => {
    return await registerAdmin(email, password, displayName)
  }

  const registerEmployeeUser = async (email: string, password: string, displayName: string): Promise<FirebaseResult> => {
    return await registerEmployee(email, password, displayName)
  }

  const value = {
    user,
    userProfile,
    userRole,
    loading,
    auth,
    db,
    messaging,
    signIn,
    signOut: signOutUser,
    registerAdminUser,
    registerEmployeeUser
  }

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  )
}
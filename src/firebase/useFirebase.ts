import { useContext } from 'react'
import { FirebaseContext } from './FirebaseContext'

// Hook to use Firebase context throughout the application
export const useFirebase = () => {
  const context = useContext(FirebaseContext)
  if (!context) {
    throw new Error('useFirebase must be used within FirebaseProvider')
  }
  return context
}
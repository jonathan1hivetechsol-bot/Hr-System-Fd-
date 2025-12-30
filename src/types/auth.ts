export type UserRole = 'admin' | 'employee'

export type UserType = {
  id: string
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
  role: UserRole
  token: string
}

export interface AuthUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

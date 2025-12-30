export interface Employee {
  id: string
  name: string
  email: string
  position: string
  department: string
  salary: number
  hireDate: string
  status: 'active' | 'inactive'
  avatar?: string
  phone?: string
  address?: string
  userId?: string
  role: 'admin' | 'employee'
  createdAt?: Date
  updatedAt?: Date
  profileComplete?: boolean
  profileImage?: string
  dateOfBirth?: string
  designations?: string
}
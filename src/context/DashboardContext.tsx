import { useState, useEffect, type ReactNode } from 'react'
import type { Employee } from '@/types/employee'
import { DashboardContext } from './DashboardContextValue'
import { useFirebase, getEmployees, saveEmployee, updateEmployee, deleteEmployee } from '@/firebase'

interface AttendanceRecord {
  id: number
  employeeId: number
  date: string
  checkIn: string
  checkOut: string
  totalHours: number
}

interface LeaveRecord {
  id: number
  employeeId: number
  type: 'annual' | 'sick' | 'personal'
  startDate: string
  endDate: string
  status: 'pending' | 'approved' | 'rejected'
  reason: string
}

export type NotificationItem = {
  id: number
  title: string
  message: string
  time: string
  type: 'info' | 'warning' | 'success'
}

export type MeetingItem = {
  id: number
  title: string
  time: string
  type: string
}

export interface DashboardData {
  employees: Employee[]
  attendance: AttendanceRecord[]
  leaves: LeaveRecord[]
  notifications: NotificationItem[]
  meetings: MeetingItem[]
  refreshData: () => void
  addEmployee: (employee: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>
  updateEmployee: (id: string, employee: Partial<Employee>) => Promise<void>
  deleteEmployee: (id: string) => Promise<void>
  canEditEmployee: (targetEmployeeId: string) => boolean
  canDeleteEmployee: () => boolean
}

interface DashboardProviderProps {
  children: ReactNode
}

export const DashboardProvider = ({ children }: DashboardProviderProps) => {
  const [employees, setEmployees] = useState<Employee[]>([])
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [leaves, setLeaves] = useState<LeaveRecord[]>([])
  const [notifications, setNotifications] = useState<NotificationItem[]>([])
  const [meetings, setMeetings] = useState<MeetingItem[]>([])

  const loadData = async () => {
    try {
      // Load employees from Firestore
      const employeesResult = await getEmployees()
      if (employeesResult.success && employeesResult.data) {
        setEmployees(employeesResult.data as Employee[])
      } else {
        // Start with empty list - no mock data
        setEmployees([])
      }

      // Load attendance (from localStorage until Firestore is integrated)
      const storedAttendance = JSON.parse(localStorage.getItem('attendance') || '[]')
      setAttendance(storedAttendance)

      // Load leaves (from localStorage until Firestore is integrated)
      const storedLeaves = JSON.parse(localStorage.getItem('leaves') || '[]')
      setLeaves(storedLeaves)

      // Initialize notifications if empty
      const storedNotifications = JSON.parse(localStorage.getItem('notifications') || '[]')
      if (storedNotifications.length === 0) {
        const defaultNotifications: NotificationItem[] = [
          {
            id: 1,
            title: 'System Notification',
            message: 'Welcome to HR Payroll System',
            time: new Date().toLocaleTimeString(),
            type: 'info'
          }
        ]
        localStorage.setItem('notifications', JSON.stringify(defaultNotifications))
        setNotifications(defaultNotifications)
      } else {
        setNotifications(storedNotifications)
      }

      // Initialize meetings if empty
      const storedMeetings = JSON.parse(localStorage.getItem('meetings') || '[]')
      if (storedMeetings.length === 0) {
        const defaultMeetings: MeetingItem[] = []
        localStorage.setItem('meetings', JSON.stringify(defaultMeetings))
        setMeetings(defaultMeetings)
      } else {
        setMeetings(storedMeetings)
      }
    } catch (error) {
      console.error('Error loading data:', error)
      // Continue with empty data if loading fails
      setEmployees([])
      setAttendance([])
      setLeaves([])
      setNotifications([])
      setMeetings([])
    }
  }

  const addEmployee = async (employeeData: Omit<Employee, 'id' | 'createdAt' | 'updatedAt'>) => {
    const result = await saveEmployee(employeeData)
    if (result.success) {
      await loadData() // Reload data after adding
    } else {
      throw new Error(result.error || 'Failed to add employee')
    }
  }

  const updateEmployeeData = async (id: string, employeeData: Partial<Employee>) => {
    const result = await updateEmployee(id, employeeData)
    if (result.success) {
      await loadData() // Reload data after updating
    } else {
      throw new Error(result.error || 'Failed to update employee')
    }
  }

  const deleteEmployeeData = async (id: string) => {
    const result = await deleteEmployee(id)
    if (result.success) {
      await loadData() // Reload data after deleting
    } else {
      throw new Error(result.error || 'Failed to delete employee')
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const refreshData = async () => {
    await loadData()
  }

  const { user } = useFirebase()

  const canEditEmployee = (targetEmployeeId: string) => {
    if (!user) return false
    const currentEmp = employees.find(e => e.userId === user.uid)
    const target = employees.find(e => e.id === targetEmployeeId)
    if (!target) return false
    // Admins can edit everyone
    if (currentEmp?.role === 'admin') return true
    // Managers can edit (business rule: allow managers to edit non-admins)
    if (currentEmp?.role === 'manager') return true
    // Users can edit their own profile
    if (user.uid === target.userId) return true
    return false
  }

  const canDeleteEmployee = () => {
    if (!user) return false
    const currentEmp = employees.find(e => e.userId === user.uid)
    // Only admins may delete
    return currentEmp?.role === 'admin'
  }

  const value: DashboardData = {
    employees,
    attendance,
    leaves,
    notifications,
    meetings,
    refreshData,
    addEmployee,
    updateEmployee: updateEmployeeData,
    deleteEmployee: deleteEmployeeData,
    canEditEmployee,
    canDeleteEmployee
  }

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  )
}
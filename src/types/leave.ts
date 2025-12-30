export interface Leave {
  id: number
  employeeId: number
  employeeName: string
  type: 'sick' | 'vacation' | 'personal'
  startDate: string
  endDate: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
}
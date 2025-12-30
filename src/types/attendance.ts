export interface AttendanceRecord {
  id: number
  employeeId: number
  employeeName: string
  date: string
  checkIn: string
  checkOut: string | null
  status: 'present' | 'absent' | 'late'
}
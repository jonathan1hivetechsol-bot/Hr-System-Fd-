export interface PayrollRecord {
  id: number
  employeeId: number
  employeeName: string
  month: string
  year: number
  basicSalary: number
  allowances: number
  deductions: number
  netSalary: number
  status: 'pending' | 'paid'
}
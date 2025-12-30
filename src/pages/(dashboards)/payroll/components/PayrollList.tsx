import { useState, useEffect } from 'react'
import { Table, Button, Badge, Spinner, Alert } from 'react-bootstrap'
import type { PayrollRecord } from '@/types/payroll'

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('payrolls')
      if (stored) {
        setPayrolls(JSON.parse(stored))
      }
      // No mock data - start with empty list
    } catch (err) {
      console.error('Failed to load payroll data:', err)
      setError('Failed to load payroll data')
    } finally {
      setLoading(false)
    }
  }, [])

  const handleMarkPaid = (id: number) => {
    const updated = payrolls.map(payroll =>
      payroll.id === id ? { ...payroll, status: 'paid' as const } : payroll
    )
    setPayrolls(updated)
    localStorage.setItem('payrolls', JSON.stringify(updated))
  }

  return (
    <div className="card">
      {error && <Alert variant="danger" className="m-3">{error}</Alert>}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center p-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <div className="card-body p-0">
          <div className="table-responsive">
            <Table striped hover className="mb-0">
              <thead className="table-light">
                <tr>
                  <th>Employee</th>
                  <th>Month/Year</th>
                  <th>Basic Salary</th>
                  <th>Allowances</th>
                  <th>Deductions</th>
                  <th>Net Salary</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {payrolls.length > 0 ? (
                  payrolls.map(payroll => (
                    <tr key={payroll.id}>
                      <td>{payroll.employeeName}</td>
                      <td>{payroll.month} {payroll.year}</td>
                      <td>${payroll.basicSalary.toLocaleString()}</td>
                      <td>${payroll.allowances.toLocaleString()}</td>
                      <td>${payroll.deductions.toLocaleString()}</td>
                      <td>${payroll.netSalary.toLocaleString()}</td>
                      <td>
                        <Badge bg={payroll.status === 'paid' ? 'success' : 'warning'}>
                          {payroll.status}
                        </Badge>
                      </td>
                      <td>
                        {payroll.status === 'pending' && (
                          <Button variant="success" size="sm" onClick={() => handleMarkPaid(payroll.id)}>
                            Mark Paid
                          </Button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="text-center py-4">
                      No payroll records. Generate payroll to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  )
}

export default PayrollList
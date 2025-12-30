import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import type { PayrollRecord } from '@/types/payroll'
import type { Employee } from '@/types/employee'

interface GeneratePayrollModalProps {
  show: boolean
  onHide: () => void
}

const GeneratePayrollModal = ({ show, onHide }: GeneratePayrollModalProps) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    month: '',
    year: '',
    basicSalary: '',
    allowances: '',
    deductions: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const payrolls = JSON.parse(localStorage.getItem('payrolls') || '[]')
    const employees = JSON.parse(localStorage.getItem('employees') || '[]')
    const employee = employees.find((emp: Employee) => emp.id === formData.employeeId)

    const basicSalary = parseFloat(formData.basicSalary)
    const allowances = parseFloat(formData.allowances)
    const deductions = parseFloat(formData.deductions)
    const netSalary = basicSalary + allowances - deductions

    const newPayroll: PayrollRecord = {
      id: Date.now(),
      employeeId: parseInt(formData.employeeId),
      employeeName: employee?.name || 'Unknown',
      month: formData.month,
      year: parseInt(formData.year),
      basicSalary,
      allowances,
      deductions,
      netSalary,
      status: 'pending'
    }
    payrolls.push(newPayroll)
    localStorage.setItem('payrolls', JSON.stringify(payrolls))
    onHide()
    // Reset form
    setFormData({
      employeeId: '',
      month: '',
      year: '',
      basicSalary: '',
      allowances: '',
      deductions: ''
    })
    // Trigger reload
    window.location.reload()
  }

  const employees = JSON.parse(localStorage.getItem('employees') || '[]')

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Generate Payroll</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Employee</Form.Label>
            <Form.Select
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              required
            >
              <option value="">Select Employee</option>
              {employees.map((emp: Employee) => (
                <option key={emp.id} value={emp.id}>{emp.name}</option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Month</Form.Label>
            <Form.Select
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
            >
              <option value="">Select Month</option>
              <option value="January">January</option>
              <option value="February">February</option>
              <option value="March">March</option>
              <option value="April">April</option>
              <option value="May">May</option>
              <option value="June">June</option>
              <option value="July">July</option>
              <option value="August">August</option>
              <option value="September">September</option>
              <option value="October">October</option>
              <option value="November">November</option>
              <option value="December">December</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Basic Salary</Form.Label>
            <Form.Control
              type="number"
              name="basicSalary"
              value={formData.basicSalary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Allowances</Form.Label>
            <Form.Control
              type="number"
              name="allowances"
              value={formData.allowances}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Deductions</Form.Label>
            <Form.Control
              type="number"
              name="deductions"
              value={formData.deductions}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Generate
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default GeneratePayrollModal
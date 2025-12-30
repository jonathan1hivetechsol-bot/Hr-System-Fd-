import { useState, useEffect } from 'react'
import { Table, Button, Badge, Modal, Form, Spinner, Alert } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'
import { DEPARTMENTS } from '@/assets/data/constants'
import type { Employee } from '@/types/employee'

const EmployeeList = () => {
  const { employees, deleteEmployee, updateEmployee } = useDashboard()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    hireDate: '',
    status: 'active' as 'active' | 'inactive'
  })

  useEffect(() => {
    // Data is loaded from context
    if (employees.length > 0 || employees.length === 0) {
      setLoading(false)
    }
  }, [employees])

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        setError(null)
        await deleteEmployee(id)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to delete employee')
      }
    }
  }

  const handleEditClick = (employee: Employee) => {
    setEditingEmployee(employee)
    setFormData({
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary.toString(),
      hireDate: employee.hireDate,
      status: employee.status
    })
    setShowEditModal(true)
  }

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editingEmployee) {
      try {
        setError(null)
        await updateEmployee(editingEmployee.id, {
          name: formData.name,
          email: formData.email,
          position: formData.position,
          department: formData.department,
          salary: parseFloat(formData.salary),
          hireDate: formData.hireDate,
          status: formData.status
        })
        setShowEditModal(false)
        setEditingEmployee(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to update employee')
      }
    }
  }

  return (
    <>
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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Hire Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.length > 0 ? (
                    employees.map(employee => (
                      <tr key={employee.id}>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.position}</td>
                        <td>{employee.department}</td>
                        <td>${employee.salary.toLocaleString()}</td>
                        <td>{employee.hireDate}</td>
                        <td>
                          <Badge bg={employee.status === 'active' ? 'success' : 'secondary'}>
                            {employee.status}
                          </Badge>
                        </td>
                        <td>
                          <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEditClick(employee)}>
                            Edit
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDelete(employee.id)}>
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={8} className="text-center py-4">
                        No employees found. Add one to get started.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Employee</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleEditSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Position</Form.Label>
              <Form.Control
                type="text"
                name="position"
                value={formData.position}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Select
                name="department"
                value={formData.department}
                onChange={handleEditChange}
                required
              >
                <option value="">Select Department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control
                type="number"
                name="salary"
                value={formData.salary}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hire Date</Form.Label>
              <Form.Control
                type="date"
                name="hireDate"
                value={formData.hireDate}
                onChange={handleEditChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="status"
                value={formData.status}
                onChange={handleEditChange}
                required
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  )
}

export default EmployeeList
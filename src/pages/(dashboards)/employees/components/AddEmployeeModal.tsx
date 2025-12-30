import { useState } from 'react'
import { Modal, Button, Form, Image } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'
import logo from '@/assets/images/logo.png'

interface AddEmployeeModalProps {
  show: boolean
  onHide: () => void
}

const AddEmployeeModal = ({ show, onHide }: AddEmployeeModalProps) => {
  const { addEmployee } = useDashboard()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    salary: '',
    hireDate: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const newEmployee = {
        name: formData.name,
        email: formData.email,
        position: formData.position,
        department: formData.department,
        hireDate: formData.hireDate,
        salary: parseFloat(formData.salary),
        status: 'active' as const
      }
      await addEmployee(newEmployee)
      onHide()
      // Reset form
      setFormData({
        name: '',
        email: '',
        position: '',
        department: '',
        salary: '',
        hireDate: ''
      })
    } catch (error) {
      console.error('Failed to add employee:', error)
      // You might want to show an error message to the user here
    }
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <div className="d-flex align-items-center">
          <Image src={logo} alt="logo" height={30} className="me-2" />
          <Modal.Title>Add Employee</Modal.Title>
        </div>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Position</Form.Label>
            <Form.Control
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="">Select Department</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Salary</Form.Label>
            <Form.Control
              type="number"
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
              type="date"
              name="hireDate"
              value={formData.hireDate}
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
            Add Employee
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default AddEmployeeModal
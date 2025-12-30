import { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import type { Leave } from '@/types/leave'

interface ApplyLeaveModalProps {
  show: boolean
  onHide: () => void
}

const ApplyLeaveModal = ({ show, onHide }: ApplyLeaveModalProps) => {
  const [formData, setFormData] = useState({
    type: 'vacation' as Leave['type'],
    startDate: '',
    endDate: '',
    reason: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const leaves = JSON.parse(localStorage.getItem('leaves') || '[]')
    const newLeave: Leave = {
      id: Date.now(),
      employeeId: 1, // Current user
      employeeName: 'John Doe', // Current user
      ...formData,
      status: 'pending'
    }
    leaves.push(newLeave)
    localStorage.setItem('leaves', JSON.stringify(leaves))
    onHide()
    // Reset form
    setFormData({
      type: 'vacation',
      startDate: '',
      endDate: '',
      reason: ''
    })
    // Trigger reload
    window.location.reload()
  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Apply for Leave</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Leave Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="vacation">Vacation</option>
              <option value="sick">Sick Leave</option>
              <option value="personal">Personal Leave</option>
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Reason</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="reason"
              value={formData.reason}
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
            Apply
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default ApplyLeaveModal
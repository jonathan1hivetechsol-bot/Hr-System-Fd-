import { Modal, Button, Form, Image, ProgressBar } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import type { Employee } from '@/types/employee'

interface Props {
  show: boolean
  onHide: () => void
  employee: Employee
  onSave: (id: string, data: Partial<Employee>, file?: File | null, onProgress?: (p: number) => void) => Promise<void>
}

const EditEmployeeModal = ({ show, onHide, employee, onSave }: Props) => {
  const [form, setForm] = useState({
    name: employee.name || '',
    phone: employee.phone || '',
    address: employee.address || '',
    position: employee.position || '',
    department: employee.department || ''
  })
  const [file, setFile] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [progress, setProgress] = useState<number>(0)

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreview(null)
    }
  }, [file])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFile(e.target.files[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await onSave(employee.id, { ...form }, file, (p: number) => {
        setProgress(p)
      })
      onHide()
    } catch (err) {
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Profile</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <div className="text-center mb-3">
            <Image src={preview || employee.avatar} roundedCircle height={80} width={80} />
          </div>
          <Form.Group className="mb-2">
            <Form.Label>Full Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Phone</Form.Label>
            <Form.Control name="phone" value={form.phone} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Address</Form.Label>
            <Form.Control name="address" value={form.address} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Position</Form.Label>
            <Form.Control name="position" value={form.position} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Department</Form.Label>
            <Form.Control name="department" value={form.department} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Label>Avatar</Form.Label>
            <Form.Control type="file" accept="image/*" onChange={handleFile} />
            {file && (
              <div className="mt-2">
                <small className="text-muted d-block mb-1">Preview</small>
                <div className="mb-2">
                  <Image src={preview!} rounded height={60} width={60} />
                </div>
                <ProgressBar now={progress} label={`${progress}%`} />
              </div>
            )}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={saving}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save'}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditEmployeeModal

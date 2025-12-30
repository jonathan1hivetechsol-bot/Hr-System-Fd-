import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Button, Image, Badge } from 'react-bootstrap'
import { getDocument, uploadAvatar, updateEmployee as updateEmployeeFn } from '@/firebase'
import EditEmployeeModal from '../dashboard/components/EditEmployeeModal'
import { useDashboard } from '@/context/useDashboard'
import type { Employee } from '@/types/employee'

const EmployeeProfile = () => {
  const { id } = useParams<{ id: string }>()
  const { canEditEmployee } = useDashboard()
  const [employee, setEmployee] = useState<Employee | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    if (!id) return
    const load = async () => {
      setLoading(true)
      const res = await getDocument('employees', id)
      if (res.success && res.data) {
        setEmployee(res.data as Employee)
      } else {
        setEmployee(null)
      }
      setLoading(false)
    }
    load()
  }, [id])

  if (loading) return <Container>Loading...</Container>
  if (!employee) return <Container>Employee not found. <Link to="/employees">Back to list</Link></Container>

  return (
    <section className="py-3">
      <Container>
        <Row className="mb-3">
          <Col xs={12} className="d-flex justify-content-between align-items-center">
            <h4 className="mb-0">{employee.name}</h4>
            <div>
              <Link to="/employees" className="btn btn-light me-2">Back</Link>
              {canEditEmployee(employee.id) && (
                <Button onClick={() => setShowEdit(true)} variant="primary">Edit Profile</Button>
              )}
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={4} className="text-center">
            <Image src={employee.avatar} roundedCircle height={140} width={140} />
            <h5 className="mt-2">{employee.position}</h5>
            <Badge bg="secondary">{employee.department}</Badge>
          </Col>
          <Col md={8}>
            <Row className="mb-2">
              <Col sm={4}><strong>Email</strong></Col>
              <Col sm={8}>{employee.email}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}><strong>Phone</strong></Col>
              <Col sm={8}>{employee.phone || 'Not provided'}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}><strong>Address</strong></Col>
              <Col sm={8}>{employee.address || 'Not provided'}</Col>
            </Row>
            <Row className="mb-2">
              <Col sm={4}><strong>Joined</strong></Col>
              <Col sm={8}>{employee.hireDate}</Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <EditEmployeeModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        employee={employee}
        onSave={async (empId, data, file, onProgress) => {
          try {
            let avatarUrl: string | undefined = undefined
            if (file) {
              const res = await uploadAvatar(empId, file, onProgress)
              if (res.success) avatarUrl = res.data as string
            }
            const updateData: Partial<Employee> = { ...data }
            if (avatarUrl) updateData.avatar = avatarUrl
            await updateEmployeeFn(empId, updateData)
            const refreshed = await getDocument('employees', empId)
            if (refreshed.success && refreshed.data) setEmployee(refreshed.data as Employee)
          } catch (err) {
            console.error(err)
            throw err
          }
        }}
      />
    </section>
  )
}

export default EmployeeProfile

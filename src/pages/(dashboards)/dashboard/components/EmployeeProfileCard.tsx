import { Card, CardBody, Row, Col, Button, Badge } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useFirebase, uploadAvatar } from '@/firebase'
import { useDashboard } from '@/context/useDashboard'
import { useState, useEffect } from 'react'
import type { Employee } from '@/types/employee'
import EditEmployeeModal from './EditEmployeeModal'

const EmployeeProfileCard = () => {
  const firebaseContext = useFirebase()
  const { employees, updateEmployee, canEditEmployee } = useDashboard()
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null)
  const [showEdit, setShowEdit] = useState(false)

  useEffect(() => {
    if (firebaseContext.user && employees.length > 0) {
      // Find the employee profile for the current user
      const userEmployee = employees.find(emp => emp.userId === firebaseContext.user?.uid)
      if (userEmployee) {
        setCurrentEmployee(userEmployee)
      } else {
        // If no employee profile found, create a default one based on user data
        setCurrentEmployee({
          id: firebaseContext.user.uid,
          name: firebaseContext.user.displayName || firebaseContext.user.email?.split('@')[0] || 'Unknown User',
          email: firebaseContext.user.email || '',
          position: 'Employee',
          department: 'General',
          salary: 0,
          hireDate: new Date().toISOString().split('T')[0],
          status: 'active',
          userId: firebaseContext.user.uid,
          role: 'employee',
          avatar: firebaseContext.user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(firebaseContext.user.displayName || firebaseContext.user.email || 'User')}&background=random&color=fff&size=120`
        })
      }
    }
  }, [firebaseContext.user, employees])

  if (!currentEmployee) {
    return (
      <Card className="employee-profile-card shadow-sm border-0 bg-white">
        <CardBody className="p-4 text-center">
          <p>Loading employee profile...</p>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="employee-profile-card shadow-sm border-0 bg-white">
      <CardBody className="p-4">
        <Row className="align-items-center">
          <Col md={4} className="text-center mb-3 mb-md-0">
            <img
              src={currentEmployee.avatar}
              alt={currentEmployee.name}
              className="rounded-circle border border-3 border-light shadow-sm"
              style={{ width: '120px', height: '120px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={8}>
            <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-3">
              <div>
                <h4 className="mb-1 fw-bold text-dark">{currentEmployee.name}</h4>
                <p className="text-muted mb-2">{currentEmployee.position}</p>
                <Badge bg="primary" className="mb-2">
                  {currentEmployee.department}
                </Badge>
              </div>
              {canEditEmployee(currentEmployee.id) && (
                <Button onClick={() => setShowEdit(true)} variant="outline-primary" size="sm" className="mt-2 mt-md-0">
                  <IconifyIcon icon="lucide:edit-2" width={16} height={16} className="me-1" />
                  Edit
                </Button>
              )}
            </div>
            
            <Row className="g-3">
              <Col sm={6}>
                <div className="d-flex align-items-center">
                  <IconifyIcon icon="lucide:phone" width={16} height={16} className="text-muted me-2" />
                  <div>
                    <small className="text-muted d-block">Phone</small>
                    <span className="fw-medium">{currentEmployee.phone || 'Not provided'}</span>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center">
                  <IconifyIcon icon="lucide:mail" width={16} height={16} className="text-muted me-2" />
                  <div>
                    <small className="text-muted d-block">Email</small>
                    <span className="fw-medium">{currentEmployee.email}</span>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center">
                  <IconifyIcon icon="lucide:user-check" width={16} height={16} className="text-muted me-2" />
                  <div>
                    <small className="text-muted d-block">Reports to</small>
                    <span className="fw-medium">Manager</span>
                  </div>
                </div>
              </Col>
              <Col sm={6}>
                <div className="d-flex align-items-center">
                  <IconifyIcon icon="lucide:calendar" width={16} height={16} className="text-muted me-2" />
                  <div>
                    <small className="text-muted d-block">Joined</small>
                    <span className="fw-medium">{currentEmployee.hireDate}</span>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </CardBody>
      <EditEmployeeModal
        show={showEdit}
        onHide={() => setShowEdit(false)}
        employee={currentEmployee}
        onSave={async (id, data, file, onProgress) => {
          try {
            let avatarUrl = undefined
            if (file) {
              const res = await uploadAvatar(id, file, onProgress)
              if (res.success) avatarUrl = res.data as string
            }
            const updateData: Partial<Employee> = {
              ...data,
            }
            if (avatarUrl) updateData.avatar = avatarUrl
            await updateEmployee(id, updateData)
          } catch (err) {
            console.error('Failed to save employee:', err)
            throw err
          }
        }}
      />
    </Card>
  )
}

export default EmployeeProfileCard


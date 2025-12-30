import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const EmployeeByDepartment = () => {
  const { employees = [] } = useDashboard() || {}
  
  // Group employees by department
  const deptMap = new Map<string, number>()
  employees.forEach(emp => {
    const dept = emp.department || 'Unassigned'
    deptMap.set(dept, (deptMap.get(dept) || 0) + 1)
  })
  
  const departments = Array.from(deptMap.entries()).map(([name, count]) => ({
    name,
    count,
    color: '#FF6B35',
  }))
  
  const maxCount = departments.length > 0 ? Math.max(...departments.map(d => d.count)) : 0

  if (departments.length === 0) {
    return (
      <Card className="shadow-sm">
        <CardBody className="p-3">
          <h6 className="mb-3">Employees By Department</h6>
          <div className="text-center text-muted py-4">
            <p>No employees added yet</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card className="shadow-sm">
      <CardBody className="p-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h6 className="mb-0 fs-15 fs-sm-16 fw-bold">Employees By Department</h6>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary" className="fs-11">This Week</Badge>
          </Col>
        </Row>
        <div>
          {departments.map((dept, idx) => (
            <div key={idx} className="mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <p className="mb-0 fs-12 fs-sm-13 fw-medium">{dept.name}</p>
                <p className="mb-0 fs-12 fs-sm-13 text-muted">{dept.count}</p>
              </div>
              <div className="progress" style={{ height: '6px' }}>
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: `${(dept.count / maxCount) * 100}%`, backgroundColor: dept.color }}
                />
              </div>
            </div>
          ))}
        </div>
        <p className="text-muted fs-12 mt-3 mb-0">
          <IconifyIcon icon="lucide:info" height={14} width={14} className="me-1" />
          No of Employees increased by <span className="text-success fw-bold">+20%</span> from last Week
        </p>
      </CardBody>
    </Card>
  )
}

export default EmployeeByDepartment
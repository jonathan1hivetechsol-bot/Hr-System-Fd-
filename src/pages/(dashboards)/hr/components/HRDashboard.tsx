import { Card, CardBody, Col, Container, Row, Badge, Button, Table } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useDashboard } from '@/context/useDashboard'

const HRDashboard = () => {
  const { employees = [] } = useDashboard() || {}

  // Calculate HR metrics
  const totalEmployees = employees.length
  const activeEmployees = employees.filter(e => e.status === 'active').length
  const inactiveEmployees = employees.filter(e => e.status === 'inactive').length

  // Group employees by department
  const deptMap = new Map<string, number>()
  employees.forEach(emp => {
    const dept = emp.department || 'Unassigned'
    deptMap.set(dept, (deptMap.get(dept) || 0) + 1)
  })

  const departments = Array.from(deptMap.entries()).map(([name, count]) => ({
    name,
    count,
  }))

  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        {/* HR Metrics */}
        <Row className="mb-3">
          <Col lg={3} md={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <Row>
                  <Col xs="auto">
                    <div className="avatar-md rounded-circle bg-primary bg-opacity-10 d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="lucide:users" className="text-primary" height={24} width={24} />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="mb-1 text-muted fw-normal fs-12">Total Employees</h6>
                    <h5 className="mb-0 fw-bold">{totalEmployees}</h5>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3} md={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <Row>
                  <Col xs="auto">
                    <div className="avatar-md rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="lucide:check-circle" className="text-success" height={24} width={24} />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="mb-1 text-muted fw-normal fs-12">Active</h6>
                    <h5 className="mb-0 fw-bold">{activeEmployees}</h5>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3} md={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <Row>
                  <Col xs="auto">
                    <div className="avatar-md rounded-circle bg-danger bg-opacity-10 d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="lucide:x-circle" className="text-danger" height={24} width={24} />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="mb-1 text-muted fw-normal fs-12">Inactive</h6>
                    <h5 className="mb-0 fw-bold">{inactiveEmployees}</h5>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>

          <Col lg={3} md={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <Row>
                  <Col xs="auto">
                    <div className="avatar-md rounded-circle bg-warning bg-opacity-10 d-flex align-items-center justify-content-center">
                      <IconifyIcon icon="lucide:building2" className="text-warning" height={24} width={24} />
                    </div>
                  </Col>
                  <Col>
                    <h6 className="mb-1 text-muted fw-normal fs-12">Departments</h6>
                    <h5 className="mb-0 fw-bold">{departments.length}</h5>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Departments Overview */}
        <Row className="mb-3">
          <Col lg={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <h5 className="mb-4">Employees by Department</h5>
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Department</th>
                        <th>Count</th>
                      </tr>
                    </thead>
                    <tbody>
                      {departments.length > 0 ? (
                        departments.map((dept, idx) => (
                          <tr key={idx}>
                            <td className="fw-medium">{dept.name}</td>
                            <td>
                              <Badge bg="primary">{dept.count}</Badge>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={2} className="text-center text-muted py-4">
                            No departments added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>

          <Col lg={6} xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <h5 className="mb-4">Employee Status Distribution</h5>
                <div className="d-flex justify-content-around">
                  <div className="text-center">
                    <div className="display-6 fw-bold text-success">{activeEmployees}</div>
                    <p className="text-muted mb-0">Active Employees</p>
                  </div>
                  <div className="text-center">
                    <div className="display-6 fw-bold text-danger">{inactiveEmployees}</div>
                    <p className="text-muted mb-0">Inactive Employees</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        {/* Recent Employees */}
        <Row>
          <Col xs={12} className="mb-3">
            <Card className="shadow-sm">
              <CardBody className="p-4">
                <h5 className="mb-4">Recent Employees</h5>
                <div className="table-responsive">
                  <Table hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Position</th>
                        <th>Department</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.length > 0 ? (
                        employees.slice(0, 10).map((emp) => (
                          <tr key={emp.id}>
                            <td className="fw-medium">{emp.name}</td>
                            <td>{emp.email}</td>
                            <td>{emp.position}</td>
                            <td>{emp.department}</td>
                            <td>
                              <Badge bg={emp.status === 'active' ? 'success' : 'secondary'}>
                                {emp.status}
                              </Badge>
                            </td>
                            <td>
                              <Button variant="sm" size="sm" className="btn-sm">
                                View
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="text-center text-muted py-4">
                            No employees added yet
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default HRDashboard

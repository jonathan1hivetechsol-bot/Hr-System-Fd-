import { Badge, Button, Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const ClockInOut = () => {
  const { attendance = [] } = useDashboard() || {}
  
  // Get today's attendance
  const today = new Date().toLocaleDateString()
  const clockData = attendance
    .filter(a => a.date === today)
    .slice(0, 4)
    .map((att, idx) => ({
      name: `Employee ${idx + 1}`,
      checkIn: att.checkIn || '--:-- AM',
      status: att.checkIn ? 'On Time' : 'Not Checked In',
      avatar: ['👨', '👩'][idx % 2],
    })) || []

  return (
    <Card className="shadow-sm">
      <CardBody className="p-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h6 className="mb-0 fs-15 fs-sm-16 fw-bold">Clock-In/Out</h6>
          </Col>
          <Col xs="auto">
            <Dropdown>
              <DropdownToggle as="a" className="text-muted text-decoration-none cursor-pointer fs-13">
                All Departments
              </DropdownToggle>
              <DropdownMenu align="end">
                <DropdownItem>All Departments</DropdownItem>
                <DropdownItem>HR</DropdownItem>
                <DropdownItem>Development</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Badge bg="secondary" className="fs-11 ms-2">Today</Badge>
          </Col>
        </Row>
        <div className="table-responsive">
          <table className="table table-sm mb-0 fs-13">
            <thead className="d-none d-sm-table-header-group">
              <tr>
                <th className="border-0 fs-12 fw-bold">Name</th>
                <th className="border-0 fs-12 fw-bold">Check In</th>
                <th className="border-0 fs-12 fw-bold">Status</th>
              </tr>
            </thead>
            <tbody>
              {clockData.map((item, idx) => (
                <tr key={idx} className="d-flex flex-column flex-sm-table-row border-bottom d-sm-table-row mb-2 p-2 p-sm-0 bg-light bg-sm-transparent rounded">
                  <td className="fs-13 mb-2 mb-sm-0 d-flex justify-content-between">
                    <span className="d-sm-none fw-bold text-muted">Name:</span> {item.avatar} {item.name}
                  </td>
                  <td className="fs-13 mb-2 mb-sm-0 d-flex justify-content-between">
                    <span className="d-sm-none fw-bold text-muted">Check In:</span> {item.checkIn}
                  </td>
                  <td className="fs-13 d-flex justify-content-between">
                    <span className="d-sm-none fw-bold text-muted">Status:</span>
                    <Badge bg={item.status === 'On Time' ? 'success' : 'warning'} className="fs-11">
                      {item.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Button variant="outline-primary" size="sm" className="mt-3 w-100">
          View All Check-Ins
        </Button>
      </CardBody>
    </Card>
  )
}

export default ClockInOut
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const QuickActions = () => {
  return (
    <Card>
      <CardBody>
        <h4 className="mb-3 mt-0 fs-16">Quick Actions</h4>
        <Row>
          <Col xs={6} className="mb-3">
            <Link to="/employees" className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
              <IconifyIcon icon="lucide:user-plus" className="me-2" height={18} width={18} />
              Add Employee
            </Link>
          </Col>
          <Col xs={6} className="mb-3">
            <Link to="/leave" className="btn btn-outline-success w-100 d-flex align-items-center justify-content-center">
              <IconifyIcon icon="lucide:calendar-check" className="me-2" height={18} width={18} />
              Approve Leave
            </Link>
          </Col>
          <Col xs={6}>
            <Link to="/attendance" className="btn btn-outline-info w-100 d-flex align-items-center justify-content-center">
              <IconifyIcon icon="lucide:clock" className="me-2" height={18} width={18} />
              Mark Attendance
            </Link>
          </Col>
          <Col xs={6}>
            <Link to="/payroll" className="btn btn-outline-warning w-100 d-flex align-items-center justify-content-center">
              <IconifyIcon icon="lucide:dollar-sign" className="me-2" height={18} width={18} />
              Process Payroll
            </Link>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default QuickActions
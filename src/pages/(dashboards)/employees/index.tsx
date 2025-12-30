import { Col, Container, Row } from 'react-bootstrap'
import MetricCard from '../dashboard/components/MetricCard'
import EmployeeByDepartment from '../dashboard/components/EmployeeByDepartment'
import EmployeeStatus from '../dashboard/components/EmployeeStatus'
import AttendanceOverview from '../dashboard/components/AttendanceOverview'
import ClockInOut from '../dashboard/components/ClockInOut'
import EmployeesList from './components/EmployeesList'

const Employees = () => {
  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        {/* Metric Cards Grid - Responsive: 2 cols on mobile, 4 on desktop */}
        <Row className="mb-3">
          <Col lg={3} md={6} sm={6} xs={12} className="mb-3">
            <MetricCard
              icon="lucide:clock"
              title="Attendance"
              value="92/99"
              percentage={2.1}
              percentageType="positive"
              bgVariant="danger"
              iconVariant="danger"
            />
          </Col>
        </Row>

        {/* Employee By Department & Employee Status - Stack on mobile */}
        <Row className="mb-3">
          <Col lg={8} md={12} xs={12} className="mb-3">
            <EmployeeByDepartment />
          </Col>
          <Col lg={4} md={12} xs={12} className="mb-3">
            <EmployeeStatus />
          </Col>
        </Row>

        {/* Bottom Section - Attendance, Clock-In/Out - Stack on mobile */}
        <Row>
          <Col lg={6} md={12} xs={12} className="mb-3">
            <AttendanceOverview />
          </Col>
          <Col lg={6} md={12} xs={12}>
            <ClockInOut />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <EmployeesList />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Employees
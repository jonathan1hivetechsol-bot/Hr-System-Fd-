import { Col, Container, Row } from 'react-bootstrap'
import AttendanceTracker from './components/AttendanceTracker'
import AttendanceRecords from './components/AttendanceRecords'

const Attendance = () => {
  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        <Row className="mb-3">
          <Col xs={12}>
            <div className="text-center">
              <h5 className="mb-0 text-primary fs-5 fs-sm-4">Attendance Tracking</h5>
              <p className="mt-1 fw-medium text-muted mb-0">Monitor employee attendance</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={4} md={6} xs={12} className="mb-3">
            <AttendanceTracker />
          </Col>
          <Col lg={8} md={12} xs={12}>
            <AttendanceRecords />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Attendance
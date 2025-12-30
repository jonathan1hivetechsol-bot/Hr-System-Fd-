import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const AttendanceSummary = () => {
  return (
    <Card>
      <CardBody>
        <h4 className="mb-3 mt-0 fs-16">Today's Attendance</h4>
        <Row>
          <Col xs={6} className="mb-3">
            <div className="d-flex align-items-center">
              <div className="bg-soft-success avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:check-circle" className="icon-dual-success" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">22</h3>
                <p className="text-muted mb-0 fs-13">Present</p>
              </div>
            </div>
          </Col>
          <Col xs={6} className="mb-3">
            <div className="d-flex align-items-center">
              <div className="bg-soft-danger avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:x-circle" className="icon-dual-danger" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">2</h3>
                <p className="text-muted mb-0 fs-13">Absent</p>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-soft-warning avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:clock" className="icon-dual-warning" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">1</h3>
                <p className="text-muted mb-0 fs-13">Late</p>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-soft-info avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:user-check" className="icon-dual-info" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">25</h3>
                <p className="text-muted mb-0 fs-13">Total</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default AttendanceSummary
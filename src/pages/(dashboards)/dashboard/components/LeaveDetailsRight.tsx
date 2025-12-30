import { Card, CardBody, Row, Col, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const LeaveDetailsRight = () => {
  const leaveData = {
    totalLeaves: 16,
    taken: 10,
    absent: 2,
    request: 0,
    workedDays: 240,
    lossOfPay: 2,
  }

  return (
    <Card className="leave-details-right-card shadow-sm border-0">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Leave Details</h5>
          <Button variant="light" size="sm" className="p-2">
            <IconifyIcon icon="lucide:settings" width={16} height={16} />
          </Button>
        </div>

        <Row className="g-3 mb-4">
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Total Leaves</p>
              <h5 className="mb-0 fw-bold">{leaveData.totalLeaves}</h5>
            </div>
          </Col>
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Taken</p>
              <h5 className="mb-0 fw-bold">{leaveData.taken}</h5>
            </div>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Absent</p>
              <h5 className="mb-0 fw-bold">{leaveData.absent}</h5>
            </div>
          </Col>
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Request</p>
              <h5 className="mb-0 fw-bold">{leaveData.request}</h5>
            </div>
          </Col>
        </Row>

        <Row className="g-3 mb-4">
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Worked Days</p>
              <h5 className="mb-0 fw-bold">{leaveData.workedDays}</h5>
            </div>
          </Col>
          <Col xs={6}>
            <div className="leave-stat">
              <p className="mb-1 text-muted small">Loss of Pay</p>
              <h5 className="mb-0 fw-bold">{leaveData.lossOfPay}</h5>
            </div>
          </Col>
        </Row>

        <Button variant="dark" className="w-100 py-2 fw-semibold">
          Apply New Leave
        </Button>
      </CardBody>
    </Card>
  )
}

export default LeaveDetailsRight

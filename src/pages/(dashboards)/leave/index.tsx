import { Button, Col, Container, Row } from 'react-bootstrap'
import LeaveRequests from './components/LeaveRequests'
import ApplyLeaveModal from './components/ApplyLeaveModal'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState } from 'react'

const Leave = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        <Row className="mb-3">
          <Col xs={12} className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-sm-items-center gap-3">
            <div>
              <h5 className="mb-0 text-primary fs-5 fs-sm-4">Leave Management</h5>
              <p className="mt-1 fw-medium text-muted mb-0">Handle leave requests</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)} className="d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0 justify-content-center">
              <IconifyIcon icon="lucide:calendar-plus" height={16} width={16} />
              Apply Leave
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <LeaveRequests />
          </Col>
        </Row>
      </Container>
      <ApplyLeaveModal show={showModal} onHide={() => setShowModal(false)} />
    </section>
  )
}

export default Leave
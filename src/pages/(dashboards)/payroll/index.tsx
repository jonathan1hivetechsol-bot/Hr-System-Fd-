import { Button, Col, Container, Row } from 'react-bootstrap'
import PayrollList from './components/PayrollList'
import GeneratePayrollModal from './components/GeneratePayrollModal'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useState } from 'react'

const Payroll = () => {
  const [showModal, setShowModal] = useState(false)

  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        <Row className="mb-3">
          <Col xs={12} className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-sm-items-center gap-3">
            <div>
              <h5 className="mb-0 text-primary fs-5 fs-sm-4">Payroll Management</h5>
              <p className="mt-1 fw-medium text-muted mb-0">Process employee salaries</p>
            </div>
            <Button variant="primary" size="sm" onClick={() => setShowModal(true)} className="d-flex align-items-center gap-2 flex-grow-1 flex-sm-grow-0 justify-content-center">
              <IconifyIcon icon="lucide:dollar-sign" height={16} width={16} />
              Generate Payroll
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PayrollList />
          </Col>
        </Row>
      </Container>
      <GeneratePayrollModal show={showModal} onHide={() => setShowModal(false)} />
    </section>
  )
}

export default Payroll
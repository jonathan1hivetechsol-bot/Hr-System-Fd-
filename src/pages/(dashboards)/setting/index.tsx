import { Col, Container, Row } from 'react-bootstrap'
import AllSettings from './components/AllSettings'

const Setting = () => {
  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        <Row className="mb-3">
          <Col xs={12}>
            <div className="text-center">
              <h5 className="mb-0 text-primary fs-5 fs-sm-4">HR Settings</h5>
              <p className="mt-1 fw-medium text-muted mb-0">Configure your HR system</p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <AllSettings />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Setting

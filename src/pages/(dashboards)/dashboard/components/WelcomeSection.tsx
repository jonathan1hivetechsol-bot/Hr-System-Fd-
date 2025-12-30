import { Card, CardBody, Col, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'

const WelcomeSection = () => {
  return (
    <Card className="mb-3 shadow-sm">
      <CardBody>
        <Row className="align-items-center flex-column flex-sm-row">
          <Col xs="auto" className="mb-3 mb-sm-0">
            <Image
              src="/src/assets/images/avatars/img-1.jpg"
              alt="Admin"
              roundedCircle
              width={70}
              height={70}
              className="img-fluid"
            />
          </Col>
          <Col xs={12} sm className="mb-3 mb-sm-0 text-center text-sm-start">
            <h5 className="mb-1">Welcome Back, Adrian</h5>
            <p className="text-muted mb-0 fs-13 fs-sm-14">
              You have <span className="fw-bold text-primary">21 Pending Approvals</span> & <span className="fw-bold text-danger">14 Leave Requests</span>
            </p>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default WelcomeSection
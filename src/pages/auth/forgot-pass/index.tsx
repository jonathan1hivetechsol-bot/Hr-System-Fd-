import logo from '@/assets/images/logo.png'
import { Card, CardBody, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ForgotPassForm from './components/ForgotPassForm'

const ForgotPassword = () => {
  return (
    <div className="bg-gradient2 min-vh-100 align-items-center d-flex justify-content-center pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={8} xl={6}>
            <Card>
              <CardBody className="p-0">
                <div className="p-xl-5 p-3">
                  <div className="mx-auto mb-5">
                    <Link to="/" className="d-flex">
                      <Image src={logo} className="align-self-center" alt="logo-img" height={30} />
                    </Link>
                  </div>
                  <h6 className="h5 mb-0 mt-3">Reset Password</h6>
                  <p className="text-muted mt-1 mb-4">
                    Enter your email address and we&apos;ll send you an email with instructions to reset your password.
                  </p>
                  <ForgotPassForm />
                </div>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs={12} className="text-center">
                <p className="text-muted">
                  Back to{' '}
                  <Link to="/auth/login" className="text-primary fw-semibold ms-1">
                    Log In
                  </Link>
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
export default ForgotPassword

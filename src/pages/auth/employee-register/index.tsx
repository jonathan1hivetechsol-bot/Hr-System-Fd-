import AuthSwiper from '@/components/common/AuthSwiper'
import { Card, CardBody, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import EmployeeRegisterForm from './components/EmployeeRegisterForm'

const EmployeeRegister = () => {
  return (
    <div className="bg-gradient2 min-vh-100 align-items-center d-flex justify-content-center pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={12}>
            <Card>
              <CardBody className="p-0">
                <Row className="g-0">
                  <Col md={5} className="shadow">
                    <div className="p-xl-5 p-3">
                      <div className="mx-auto mb-5">
                        <Link to="/" className="d-flex">
                          <Image src={logo} className="align-self-center" alt="logo-img" height={30} />
                        </Link>
                      </div>
                      <h6 className="h5 mb-0 mt-3">Create Account</h6>
                      <p className="text-muted mt-1 mb-4">Sign up to get started with your employee account.</p>
                      <EmployeeRegisterForm />
                    </div>
                  </Col>
                  <Col md={5} className="offset-md-1 d-none d-md-inline-block">
                    <div className="position-relative mt-5 pt-5">
                      <AuthSwiper />
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Row className="mt-3">
              <Col xs={12} className="text-center">
                <p className="text-muted">
                  Already have an account?{' '}
                  <Link to="/auth/employee-login" className="text-primary fw-semibold ms-1">
                    Sign In
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

export default EmployeeRegister

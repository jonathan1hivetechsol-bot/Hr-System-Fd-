import logo from '@/assets/images/logo.png'
import AuthSwiper from '@/components/common/AuthSwiper'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'

const Register = () => {
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
                      <h6 className="h5 mb-0 mt-3">Create Your Account</h6>
                      <p className="text-muted mt-1 mb-4">Don&apos;t have an account? Create your account, it takes less than a minute.</p>
                      <RegisterForm />
                      <div className="py-3 text-center">
                        <span className="fs-13 fw-bold">OR</span>
                      </div>
                      <Row>
                        <Col xs={12} className="text-center">
                          <Link to="" className="btn btn-white w-100">
                            <IconifyIcon style={{ height: 20, width: 20 }} icon="lucide:github" className="icon icon-xs me-2" />
                            Sign Up with Github
                          </Link>
                        </Col>
                      </Row>
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
export default Register

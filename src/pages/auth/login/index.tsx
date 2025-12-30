import AuthSwiper from '@/components/common/AuthSwiper'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import LoginForm from './components/LoginForm'

const Login = () => {
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
                      <h6 className="h5 mb-0 mt-3">Welcome back!</h6>
                      <p className="text-muted mt-1 mb-4">Enter your email address and password to access admin panel.</p>
                      <LoginForm />
                      <div className="py-3 text-center">
                        <span className="fs-13 fw-bold">OR</span>
                      </div>
                      <div className="row">
                        <Col xs={12} className="text-center">
                          <Link to="" className="btn btn-white w-100">
                            <IconifyIcon icon="lucide:github" style={{ height: 20, width: 20 }} className="icon-xs me-2" />
                            Github
                          </Link>
                        </Col>
                      </div>
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
                  Don&apos;t have an account?{' '}
                  <Link to="/auth/register" className="text-primary fw-semibold ms-1">
                    Sign Up
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

export default Login

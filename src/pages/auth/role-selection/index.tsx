import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const AuthRoleSelection = () => {
  const navigate = useNavigate()

  return (
    <Container fluid className="d-flex align-items-center justify-content-center min-vh-100 bg-light py-5">
      <Row className="w-100">
        <Col lg={8} className="mx-auto">
          <div className="text-center mb-5">
            <h1 className="fw-bold mb-2">Future Designz HR Panel</h1>
            <p className="text-muted fs-5">Choose your role to continue</p>
          </div>

          <Row className="g-4">
            {/* Admin Role Card */}
            <Col md={6}>
              <Card className="border-0 shadow-lg h-100 hover-card" style={{ cursor: 'pointer' }}>
                <Card.Body className="p-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                  <div className="mb-4">
                    <div className="bg-danger bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                      <IconifyIcon icon="lucide:shield-admin" width={48} height={48} className="text-danger" />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-2">Admin</h3>
                  <p className="text-muted mb-4">
                    Manage employees, HR operations, payroll, and system settings
                  </p>
                  <div className="d-grid gap-2 w-100 mt-auto">
                    <Button
                      variant="danger"
                      size="lg"
                      onClick={() => navigate('/auth/admin-login')}
                      className="fw-semibold"
                    >
                      Admin Login
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="lg"
                      onClick={() => navigate('/auth/admin-register')}
                      className="fw-semibold"
                    >
                      Admin Sign Up
                    </Button>
                  </div>
                  <small className="text-danger mt-3 d-block">
                    <IconifyIcon icon="lucide:lock" width={14} height={14} className="me-1" />
                    Requires admin password to register
                  </small>
                </Card.Body>
              </Card>
            </Col>

            {/* Employee Role Card */}
            <Col md={6}>
              <Card className="border-0 shadow-lg h-100 hover-card" style={{ cursor: 'pointer' }}>
                <Card.Body className="p-5 text-center d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '400px' }}>
                  <div className="mb-4">
                    <div className="bg-primary bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center mx-auto" style={{ width: '80px', height: '80px' }}>
                      <IconifyIcon icon="lucide:users" width={48} height={48} className="text-primary" />
                    </div>
                  </div>
                  <h3 className="fw-bold mb-2">Employee</h3>
                  <p className="text-muted mb-4">
                    View your dashboard, attendance, leave requests, and team chat
                  </p>
                  <div className="d-grid gap-2 w-100 mt-auto">
                    <Button
                      variant="primary"
                      size="lg"
                      onClick={() => navigate('/auth/employee-login')}
                      className="fw-semibold"
                    >
                      Employee Login
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="lg"
                      onClick={() => navigate('/auth/employee-register')}
                      className="fw-semibold"
                    >
                      Employee Sign Up
                    </Button>
                  </div>
                  <small className="text-primary mt-3 d-block">
                    <IconifyIcon icon="lucide:user-check" width={14} height={14} className="me-1" />
                    No password required
                  </small>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="mt-5 text-center">
            <p className="text-muted">
              <IconifyIcon icon="lucide:info" width={16} height={16} className="me-2" />
              Each role has different access levels and features
            </p>
          </div>
        </Col>
      </Row>

      <style>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.15) !important;
        }
      `}</style>
    </Container>
  )
}

export default AuthRoleSelection

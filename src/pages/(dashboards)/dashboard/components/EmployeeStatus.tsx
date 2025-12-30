import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const EmployeeStatus = () => {
  const { employees = [] } = useDashboard() || {}
  const statuses = [
    { label: 'Active', count: employees.filter(e => e.status === 'active').length || 0, color: 'success', icon: 'lucide:check-circle' },
    { label: 'On Leave', count: 0, color: 'warning', icon: 'lucide:clock' },
    { label: 'Inactive', count: employees.filter(e => e.status !== 'active').length || 0, color: 'secondary', icon: 'lucide:x-circle' },
  ]

  return (
    <Card className="shadow-sm">
      <CardBody className="p-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h6 className="mb-0 fs-15 fs-sm-16 fw-bold">Employee Status</h6>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary" className="fs-11">This Week</Badge>
          </Col>
        </Row>
        <Row>
          {statuses.map((status, idx) => (
            <Col xs={12} key={idx} className="mb-2">
              <div className="d-flex align-items-center p-2 p-sm-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <div className={`avatar-sm icon icon-xs icon-with-bg rounded-circle me-3 bg-soft-${status.color}`} style={{ minWidth: '40px' }}>
                  <IconifyIcon icon={status.icon} className={`icon-dual-${status.color}`} height={18} width={18} />
                </div>
                <div className="flex-grow-1">
                  <p className="mb-0 fw-medium fs-13">{status.label}</p>
                </div>
                <h5 className="mb-0">{status.count}</h5>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default EmployeeStatus
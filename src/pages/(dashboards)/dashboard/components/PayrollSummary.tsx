import { currency } from '@/assets/data/constants'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Row } from 'react-bootstrap'

const PayrollSummary = () => {
  return (
    <Card>
      <CardBody>
        <h4 className="mb-3 mt-0 fs-16">Payroll Summary</h4>
        <Row>
          <Col xs={6} className="mb-3">
            <div className="d-flex align-items-center">
              <div className="bg-soft-primary avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:dollar-sign" className="icon-dual-primary" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">{currency}45,000</h3>
                <p className="text-muted mb-0 fs-13">Total Salary</p>
              </div>
            </div>
          </Col>
          <Col xs={6} className="mb-3">
            <div className="d-flex align-items-center">
              <div className="bg-soft-success avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:check-circle" className="icon-dual-success" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">{currency}42,000</h3>
                <p className="text-muted mb-0 fs-13">Paid</p>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-soft-warning avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:clock" className="icon-dual-warning" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">{currency}3,000</h3>
                <p className="text-muted mb-0 fs-13">Pending</p>
              </div>
            </div>
          </Col>
          <Col xs={6}>
            <div className="d-flex align-items-center">
              <div className="bg-soft-info avatar-sm icon icon-xs icon-with-bg rounded-sm me-3">
                <IconifyIcon icon="lucide:calendar" className="icon-dual-info" height={20} width={20} />
              </div>
              <div>
                <h3 className="mt-0 mb-0">15</h3>
                <p className="text-muted mb-0 fs-13">Payroll Days</p>
              </div>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default PayrollSummary
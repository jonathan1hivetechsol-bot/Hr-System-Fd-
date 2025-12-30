import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import logo from '@/assets/images/logo.png'

const PayrollSettings = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Image src={logo} alt="logo" height={30} className="me-2" />
        <h4 className="mb-0">Payroll Settings</h4>
      </div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Payroll Cycle</Form.Label>
              <Form.Select defaultValue="monthly">
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-Weekly</option>
                <option value="monthly">Monthly</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Currency</Form.Label>
              <Form.Select defaultValue="USD">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Tax Rate (%)</Form.Label>
              <Form.Control type="number" placeholder="Enter tax rate" defaultValue="20" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Overtime Rate (per hour)</Form.Label>
              <Form.Control type="number" placeholder="Enter overtime rate" defaultValue="1.5" step="0.1" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Auto-generate payroll on cycle end" defaultChecked />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Send payroll notifications to employees" defaultChecked />
        </Form.Group>
        <Button variant="primary">Save Settings</Button>
      </Form>
    </div>
  )
}

export default PayrollSettings
import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import logo from '@/assets/images/logo.png'

const SystemSettings = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Image src={logo} alt="logo" height={30} className="me-2" />
        <h4 className="mb-0">System Settings</h4>
      </div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Timezone</Form.Label>
              <Form.Select defaultValue="UTC">
                <option value="UTC">UTC</option>
                <option value="EST">Eastern Time</option>
                <option value="PST">Pacific Time</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date Format</Form.Label>
              <Form.Select defaultValue="MM/DD/YYYY">
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Enable email notifications" defaultChecked />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Enable two-factor authentication" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Auto-backup data daily" defaultChecked />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Session Timeout (minutes)</Form.Label>
          <Form.Control type="number" placeholder="Enter timeout" defaultValue="30" />
        </Form.Group>
        <Button variant="primary">Save Settings</Button>
      </Form>
    </div>
  )
}

export default SystemSettings
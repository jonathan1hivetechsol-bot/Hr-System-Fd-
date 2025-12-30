import { Button, Col, Form, Row, Image } from 'react-bootstrap'
import logo from '@/assets/images/logo.png'

const CompanyInformation = () => {
  return (
    <div>
      <div className="d-flex align-items-center mb-4">
        <Image src={logo} alt="logo" height={30} className="me-2" />
        <h4 className="mb-0">Company Information</h4>
      </div>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" defaultValue="Future Designz" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Control type="text" placeholder="Enter industry" defaultValue="Technology" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" defaultValue="hr@future.com" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control type="tel" placeholder="Enter phone" defaultValue="+1 234 567 890" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter address" defaultValue="123 Business St, City, State 12345" />
        </Form.Group>
        <Button variant="primary">Save Changes</Button>
      </Form>
    </div>
  )
}

export default CompanyInformation
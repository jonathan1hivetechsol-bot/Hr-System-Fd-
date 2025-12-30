import { currency } from '@/assets/data/constants'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap'

const RevenueWidget = () => {
  return (
    <Col lg={4}>
      <Card>
        <CardBody>
          <Row>
            <Col>
              <h4 className="mb-1 mt-0 fs-16">Revenue</h4>
            </Col>
            <Col xs="auto">
              <Dropdown align="end">
                <DropdownToggle as={'a'} id="dropdownMenuLink-1" className="btn-link text-muted p-0 arrow-none">
                  <IconifyIcon icon="lucide:more-horizontal" className="icon-xs" />
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem>
                    <IconifyIcon icon="lucide:edit" className="icon-xxs me-2" /> Edit
                  </DropdownItem>
                  <DropdownItem>
                    <IconifyIcon icon="lucide:refresh-cw" className="icon-xxs me-2" /> Refresh
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>

          <h1>{currency}2,100.00</h1>
          <p className="text-muted">Last Week</p>

          <hr className="mb-1" />

          <Row>
            <Col lg={6}>
              <div className="d-flex align-items-center mt-2">
                <div className="me-3 flex-shrink-0">
                  <IconifyIcon icon="lucide:trending-up" className="text-success" height={24} width={24} />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mt-0 mb-0">15%</h5>
                  <p className="text-muted mb-0 fs-13">Prev Week</p>
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="d-flex align-items-center mt-2">
                <div className="me-3 flex-shrink-0">
                  <IconifyIcon icon="lucide:trending-down" className="text-danger" height={24} width={24} />
                </div>
                <div className="flex-grow-1">
                  <h5 className="mt-0 mb-0">10%</h5>
                  <p className="text-muted mb-0 fs-13">Prev Month</p>
                </div>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  )
}

export default RevenueWidget

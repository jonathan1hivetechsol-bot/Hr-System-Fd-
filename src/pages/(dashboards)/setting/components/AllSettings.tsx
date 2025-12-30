import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContainer, TabContent, TabPane } from 'react-bootstrap'
import CompanyInformation from './CompanyInformation'
import PayrollSettings from './PayrollSettings'
import SystemSettings from './SystemSettings'

const AllSettings = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <TabContainer defaultActiveKey={'company'}>
            <Col lg={3}>
              <Nav className="navtab-bg nav-pills flex-column">
                <NavItem>
                  <NavLink eventKey="company">
                    <span>Company Info</span>
                  </NavLink>
                </NavItem>
                <NavItem className="my-2">
                  <NavLink eventKey="payroll">
                    <span>Payroll Settings</span>
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink eventKey="system">
                    <span>System Settings</span>
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col lg={9}>
              <TabContent className="p-0">
                <TabPane eventKey="company" className="fade px-3">
                  <CompanyInformation />
                </TabPane>
                <TabPane eventKey="payroll" className="fade px-3" style={{ minHeight: 600 }}>
                  <PayrollSettings />
                </TabPane>
                <TabPane eventKey="system" className="fade px-3" style={{ minHeight: 600 }}>
                  <SystemSettings />
                </TabPane>
              </TabContent>
            </Col>
          </TabContainer>
        </Row>
      </CardBody>
    </Card>
  )
}
export default AllSettings

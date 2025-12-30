import avatar8 from '@/assets/images/avatars/img-8.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { Card, CardBody, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap'

const ProfileCard = () => {
  return (
    <Card>
      <CardBody>
        <Row>
          <Col>
            <div className="d-flex">
              <Image src={avatar8} className="img-fluid avatar-sm rounded-sm me-3" alt="..." />
              <div className="flex-grow-1">
                <h4 className="mb-1 mt-0 fs-16">Ms. Greeva Navadiya</h4>
                <p className="text-muted pb-0 fs-14">Web &amp; Graphic Designer</p>
              </div>
            </div>
          </Col>
          <Col xs="auto" className="text-end">
            <Dropdown>
              <DropdownToggle
                as="a"
                className="btn-link text-muted dropdown-toggle arrow-none"
                href="#"
                role="button"
                id="dropdownMenuLink-1"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <IconifyIcon className="icon-xs" icon="lucide:more-horizontal" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end" aria-labelledby="dropdownMenuLink-1">
                <DropdownItem>
                  <IconifyIcon className="icon-xxs  me-2" icon="lucide:edit" />
                  Edit
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon className="icon-xxs  me-2" icon="lucide:refresh-cw" />
                  Refresh
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem className="text-danger">
                  <IconifyIcon className="icon-xxs me-2" icon="lucide:trash-2" />
                  Deactivate
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>
        <ul className="list-inline py-3 border-bottom">
          <li className="list-inline-item mb-sm-0 mb-2 me-sm-2">
            <Link to="" className="text-muted fs-14">
              <IconifyIcon className="icon-xs  me-1" icon="lucide:mail" />
              greeva@coderthemes.com
            </Link>
          </li>
          <li className="list-inline-item mb-sm-0 mb-2">
            <Link to="" className="text-muted fs-14">
              <IconifyIcon className="icon-xxs  me-2" icon="lucide:phone" />
              +00 123-456-789
            </Link>
          </li>
        </ul>
        <Row className="align-items-center pt-1">
          <Col md={6}>
            <p className="float-end mb-0">85%</p>
            <h6 className="fw-medium my-0">Project Completion</h6>
            <ProgressBar variant="primary" now={85} className="mt-3" style={{ height: 6 }} />
          </Col>
          <Col md={6} className="mt-sm-0 mt-4">
            <p className="float-end mb-0">7.5</p>
            <h6 className="fw-medium my-0">Overall Rating</h6>
            <ProgressBar variant="orange" now={75} className="mt-3" style={{ height: 6 }} />
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}
export default ProfileCard

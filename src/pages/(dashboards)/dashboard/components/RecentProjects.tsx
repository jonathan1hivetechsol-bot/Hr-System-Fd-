import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { Badge, Card, CardBody, Col, Dropdown, DropdownDivider, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import type { Project } from './data'

type RecentProjectsProps = {
  projects: Project[]
}

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <Card>
      <CardBody>
        <Row className="align-items-center">
          <Col>
            <p className="text-muted fs-13 fw-medium mb-0">{project.time}</p>
          </Col>
          <Col xs="auto" className="text-end">
            <Dropdown align="end">
              <DropdownToggle as={'a'} id="dropdownMenuLink-1" className="btn-link text-muted p-0">
                <IconifyIcon icon="lucide:more-horizontal" className="icon-xs" />
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>
                  <IconifyIcon icon="lucide:eye" className="icon-xxs  me-2" /> View
                </DropdownItem>
                <DropdownItem>
                  <IconifyIcon icon="lucide:edit-3" className="icon-xxs  me-2" /> Edit
                </DropdownItem>
                <DropdownDivider as="div" />
                <DropdownItem className="text-danger">
                  <IconifyIcon icon="lucide:trash-2" className="icon-xxs  me-2" /> Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>

        <div className="mt-3">
          <h4 className="mt-0 mb-1">
            <Link to="">{project.title}</Link>
          </h4>
          <Badge bg="" className={clsx('mb-1', 'badge-soft-' + project.state.variant)}>
            {project.state.name}
          </Badge>
          <p className="text-muted fs-14 mt-3">{project.description}</p>
        </div>

        <div className="mt-4">
          <Row>
            <Col>
              <h6 className="mt-0">Progress</h6>
            </Col>
            <Col className="text-end">
              <small className="fw-semibold">{project.progress.value}%</small>
            </Col>
          </Row>
          <ProgressBar now={project.progress.value} variant={project.progress.variant} style={{ height: '6px' }} />
        </div>

        <Row className="mt-3">
          <Col>
            <div className="avatar-group">
              {(project.member || []).map((member, idx) => {
                return (
                  <Link to="" className="avatar-group-item mb-0" key={idx}>
                    <Image src={member} alt="member" className="img-fluid avatar-xs rounded rounded-circle avatar-border" />
                  </Link>
                )
              })}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

const RecentProjects = ({ projects }: RecentProjectsProps) => {
  return (
    <Row>
      <Col lg={12}>
        <Row>
          <Col>
            <h4 className="mb-3 mt-0 fs-16">Recent Projects</h4>
          </Col>
          <Col xs="auto" className="text-end">
            <Link to="#" className="fw-semibold text-primary fs-13">
              View All
              <IconifyIcon icon="arrow-right" className="ms-1 icon-xxs" />
            </Link>
          </Col>
        </Row>
        <Row className="my-2">
          {(projects || []).map((project, idx) => {
            return (
              <Col lg={4} key={idx}>
                <ProjectCard project={project} />
              </Col>
            )
          })}
        </Row>
      </Col>
    </Row>
  )
}

export default RecentProjects

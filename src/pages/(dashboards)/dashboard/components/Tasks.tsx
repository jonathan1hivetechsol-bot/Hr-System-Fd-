import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { Badge, Button, Card, CardBody, Col, Form, FormCheck, Row, Spinner } from 'react-bootstrap'
import type { Task } from './data'

type TasksProps = {
  tasks: Task[]
}

const Tasks = ({ tasks }: TasksProps) => {
  return (
    <Row>
      <Col lg={12}>
        <Row>
          <Col>
            <h4 className="mb-3 mt-0 fs-16">Tasks</h4>
          </Col>
          <Col xs="auto">
            <Link to="" className="fw-semibold text-primary fs-13">
              View All
              <IconifyIcon icon="lucide:arrow-right" className="ms-1 icon-xxs" />
            </Link>
          </Col>
        </Row>

        {(tasks || []).map((task, idx) => {
          return (
            <Row className="mb-2" key={idx}>
              <Col>
                <Card className="mb-0">
                  <CardBody>
                    <Row className="align-items-center justify-content-sm-between">
                      <Col lg={6}>
                        <Form>
                          <FormCheck type="checkbox" label={task.title} id={`task${task.id}`} />
                        </Form>
                      </Col>
                      <Col lg={3}>
                        <Badge pill bg="" className={clsx('badge-soft-' + task.variant)}>
                          {task.time}
                        </Badge>
                      </Col>
                      <Col lg={3}>
                        <ul className="list-inline text-sm-end mb-0">
                          <li className="list-inline-item pe-3">
                            <span className="icon icon-xxs text-normal">
                              <IconifyIcon icon="lucide:list" className="icon-dual-dark me-1" />
                            </span>
                            {task.taskRatio.completedTask}/{task.taskRatio.totalTask}
                          </li>
                          <li className="list-inline-item pe-3">
                            <span className="icon icon-xxs text-normal me-1">
                              <svg
                                width="24px"
                                height="24px"
                                viewBox="0 0 24 24"
                                version="1.1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                              >
                                <title>Stockholm-icons / Communication / Mail-opened</title>
                                <desc>Created with Sketch.</desc>
                                <g id="Stockholm-icons-/-Communication-/-Mail-opened" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                                  <rect id="bound" x={0} y={0} width={24} height={24} />
                                  <path
                                    d="M6,2 L18,2 C18.5522847,2 19,2.44771525 19,3 L19,12 C19,12.5522847 18.5522847,13 18,13 L6,13 C5.44771525,13 5,12.5522847 5,12 L5,3 C5,2.44771525 5.44771525,2 6,2 Z M7.5,5 C7.22385763,5 7,5.22385763 7,5.5 C7,5.77614237 7.22385763,6 7.5,6 L13.5,6 C13.7761424,6 14,5.77614237 14,5.5 C14,5.22385763 13.7761424,5 13.5,5 L7.5,5 Z M7.5,7 C7.22385763,7 7,7.22385763 7,7.5 C7,7.77614237 7.22385763,8 7.5,8 L10.5,8 C10.7761424,8 11,7.77614237 11,7.5 C11,7.22385763 10.7761424,7 10.5,7 L7.5,7 Z"
                                    id="Combined-Shape"
                                    fill="#335EEA"
                                    opacity="0.3"
                                  />
                                  <path
                                    d="M3.79274528,6.57253826 L12,12.5 L20.2072547,6.57253826 C20.4311176,6.4108595 20.7436609,6.46126971 20.9053396,6.68513259 C20.9668779,6.77033951 21,6.87277228 21,6.97787787 L21,17 C21,18.1045695 20.1045695,19 19,19 L5,19 C3.8954305,19 3,18.1045695 3,17 L3,6.97787787 C3,6.70173549 3.22385763,6.47787787 3.5,6.47787787 C3.60510559,6.47787787 3.70753836,6.51099993 3.79274528,6.57253826 Z"
                                    id="Combined-Shape"
                                    fill="#335EEA"
                                  />
                                </g>
                              </svg>
                            </span>
                            {task.comment}
                          </li>
                          <li className="list-inline-item">
                            <Badge
                              bg=""
                              className={clsx(
                                { 'badge-soft-danger': task.priority === 'High' },
                                { 'badge-soft-orange': task.priority === 'Medium' },
                                { 'badge-soft-success': task.priority === 'Low' },
                                'p-1',
                              )}
                            >
                              {task.priority}
                            </Badge>
                          </li>
                        </ul>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )
        })}

        <Row className="mb-3 mt-4">
          <Col>
            <div className="text-center">
              <Button variant="outline-primary" size="sm">
                <Spinner animation="border" size="sm" className="me-1" />
                Load More
              </Button>
            </div>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Tasks

import { Col, Container, Row, Breadcrumb, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import TeamMembers from './components/TeamMembers'
import NotificationsBoard from './components/NotificationsBoard'
import MeetingsSchedule from './components/MeetingsSchedule'
import EmployeeProfileCard from './components/EmployeeProfileCard'
import LeaveDetails from './components/LeaveDetails'
import LeaveDetailsRight from './components/LeaveDetailsRight'
import AttendanceStatus from './components/AttendanceStatus'
import HourMetrics from './components/HourMetrics'
import './styles/EmployeeDashboard.css'

const EmployeeDashboard = () => {
  return (
    <section className="position-relative overflow-hidden bg-gradient2 py-2 px-2">
      <Container fluid className="px-2 px-md-3 px-lg-4">
        {/* Breadcrumb */}
        <Row className="mb-3">
          <Col xs={12}>
            <div className="d-flex justify-content-between align-items-center">
              <Breadcrumb className="mb-0">
                <Breadcrumb.Item href="/dashboard">
                  <IconifyIcon icon="lucide:home" width={16} height={16} /> Dashboard
                </Breadcrumb.Item>
                <Breadcrumb.Item active>Employee Dashboard</Breadcrumb.Item>
              </Breadcrumb>
              <div className="d-flex gap-2">
                <Button variant="light" size="sm" className="d-flex align-items-center gap-2">
                  <IconifyIcon icon="lucide:download" width={16} height={16} />
                  Export
                </Button>
                <Button variant="light" size="sm" className="d-flex align-items-center gap-2">
                  <IconifyIcon icon="lucide:calendar" width={16} height={16} />
                  2024
                </Button>
                <Button variant="light" size="sm" className="p-2">
                  <IconifyIcon icon="lucide:sort-ascending" width={16} height={16} />
                </Button>
              </div>
            </div>
          </Col>
        </Row>

        {/* Employee Profile Card */}
        <Row className="mb-3">
          <Col xs={12} className="mb-3">
            <EmployeeProfileCard />
          </Col>
        </Row>

        {/* Leave Details (Left), Leave Details (Right) */}
        <Row className="mb-3">
          <Col lg={6} md={12} xs={12} className="mb-3">
            <LeaveDetails />
          </Col>
          <Col lg={6} md={12} xs={12} className="mb-3">
            <LeaveDetailsRight />
          </Col>
        </Row>

        {/* Attendance Status and Hour Metrics */}
        <Row className="mb-3">
          <Col lg={4} md={12} xs={12} className="mb-3">
            <AttendanceStatus />
          </Col>
          <Col lg={8} md={12} xs={12}>
            <HourMetrics />
          </Col>
        </Row>

        {/* Top 3 Columns - Team Members, Notifications, Meetings */}
        <Row className="mb-3">
          <Col lg={4} md={12} xs={12} className="mb-3">
            <TeamMembers />
          </Col>
          <Col lg={4} md={12} xs={12} className="mb-3">
            <NotificationsBoard />
          </Col>
          <Col lg={4} md={12} xs={12} className="mb-3">
            <MeetingsSchedule />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default EmployeeDashboard

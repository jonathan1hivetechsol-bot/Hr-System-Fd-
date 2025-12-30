import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Badge, Card, CardBody, Col, Row } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const AttendanceOverview = () => {
  const { attendance = [] } = useDashboard() || {}
  
  // Calculate attendance stats from real data
  const attendanceStats = [
    { label: 'Present', count: attendance.filter(a => a.status === 'present').length || 0, color: 'success', icon: 'lucide:check-circle' },
    { label: 'Absent', count: attendance.filter(a => a.status === 'absent').length || 0, color: 'danger', icon: 'lucide:x-circle' },
    { label: 'Late', count: attendance.filter(a => a.status === 'late').length || 0, color: 'warning', icon: 'lucide:clock' },
  ]

  return (
    <Card className="shadow-sm">
      <CardBody className="p-3">
        <Row className="align-items-center mb-3">
          <Col>
            <h6 className="mb-0 fs-15 fs-sm-16 fw-bold">Attendance Overview</h6>
          </Col>
          <Col xs="auto">
            <Badge bg="secondary" className="fs-11">Today</Badge>
          </Col>
        </Row>
        <Row>
          {attendanceStats.map((item, idx) => (
            <Col xs={4} sm={4} key={idx} className="text-center">
              <div className={`avatar-lg icon icon-with-bg rounded-circle mx-auto mb-2 bg-soft-${item.color}`} style={{ width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconifyIcon icon={item.icon} className={`icon-dual-${item.color}`} height={24} width={24} />
              </div>
              <p className="text-muted fs-11 fs-sm-12 mb-1">{item.label}</p>
              <h5 className="mb-0">{item.count}</h5>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  )
}

export default AttendanceOverview
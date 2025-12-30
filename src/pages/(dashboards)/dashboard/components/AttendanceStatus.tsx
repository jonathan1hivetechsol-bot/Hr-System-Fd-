import { Card, CardBody, Row, Col, ProgressBar } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const AttendanceStatus = () => {
  const { attendance } = useDashboard()
  
  // Calculate today's attendance
  const today = new Date().toLocaleDateString()
  const todayAttendance = attendance.filter(a => a.date === today)
  const totalHours = todayAttendance.reduce((sum, a) => sum + a.totalHours, 0)
  const dailyTarget = 9

  const attendanceData = {
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    totalHours,
    totalHoursDisplay: totalHours.toFixed(2),
    dailyTarget,
    weekProgress: 70, // Static for now
    monthProgress: 76, // Static for now
  }

  return (
    <Card className="attendance-status-card shadow-sm border-0">
      <CardBody className="p-4">
        <h5 className="mb-3 fw-bold">Attendance</h5>

        <div className="attendance-header mb-4 text-center pb-3 border-bottom">
          <h6 className="mb-0 fw-bold">{attendanceData.time}</h6>
        </div>

        <div className="attendance-chart mb-4">
          <div style={{ position: 'relative', width: '150px', height: '150px', margin: '0 auto' }}>
            <svg width="150" height="150" style={{ margin: '0 auto', display: 'block' }}>
              {/* Outer circle */}
              <circle cx="75" cy="75" r="70" fill="none" stroke="#e9ecef" strokeWidth="8" />
              {/* Progress circle */}
              <circle
                cx="75"
                cy="75"
                r="70"
                fill="none"
                stroke="#22c55e"
                strokeWidth="8"
                strokeDasharray={`${(attendanceData.totalHours / attendanceData.dailyTarget) * 440} 440`}
                strokeLinecap="round"
                style={{ transform: 'rotate(-90deg)', transformOrigin: '75px 75px' }}
              />
              {/* Center text */}
              <text x="75" y="70" textAnchor="middle" fontSize="20" fontWeight="bold" fill="#1f2937">
                {attendanceData.totalHoursDisplay}
              </text>
              <text x="75" y="90" textAnchor="middle" fontSize="12" fill="#6b7280">
                / {attendanceData.dailyTarget}
              </text>
            </svg>
          </div>
          <p className="text-center text-muted small mt-2">Total Hours</p>
        </div>

        {/* Stats */}
        <div className="attendance-stats">
          <Row className="g-3">
            <Col xs={6}>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">This Week</small>
                  <small className="fw-semibold text-muted">{attendanceData.weekProgress}%</small>
                </div>
                <ProgressBar now={attendanceData.weekProgress} className="attendance-progress-bar" />
              </div>
            </Col>
            <Col xs={6}>
              <div>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <small className="text-muted">This Month</small>
                  <small className="fw-semibold text-muted">{attendanceData.monthProgress}%</small>
                </div>
                <ProgressBar now={attendanceData.monthProgress} className="attendance-progress-bar" />
              </div>
            </Col>
          </Row>
        </div>
      </CardBody>
    </Card>
  )
}

export default AttendanceStatus

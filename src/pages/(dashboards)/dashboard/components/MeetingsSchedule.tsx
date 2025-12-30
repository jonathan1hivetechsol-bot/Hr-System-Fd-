import { Card, CardBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useDashboard } from '@/context/useDashboard'
import '../styles/EmployeeDashboard.css'

const MeetingsSchedule = () => {
  const { meetings } = useDashboard()

  return (
    <Card className="meetings-schedule-card shadow-sm border-0">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Meetings Schedule</h5>
          <Button variant="light" size="sm" className="d-flex align-items-center gap-2 px-3">
            <IconifyIcon icon="lucide:calendar" width={16} height={16} />
            <span>Today</span>
          </Button>
        </div>

        <div className="meetings-list">
          {meetings.map((meeting) => (
            <div key={meeting.id} className="meeting-item mb-3 pb-3 border-bottom d-flex gap-3">
              <div className="flex-shrink-0">
                <div className={`meeting-time text-muted`}>
                  <small className="fw-semibold">{meeting.time}</small>
                  <div className="meeting-dot mt-1"></div>
                </div>
              </div>
              <div className="flex-grow-1">
                <p className="mb-1 fw-semibold">{meeting.title}</p>
                <small className="text-muted">{meeting.type}</small>
              </div>
              <div className="flex-shrink-0">
                <Button variant="light" size="sm" className="p-2">
                  <IconifyIcon icon="lucide:settings" width={16} height={16} className="text-danger" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default MeetingsSchedule

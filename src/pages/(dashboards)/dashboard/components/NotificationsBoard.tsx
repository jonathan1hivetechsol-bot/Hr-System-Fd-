import { useState } from 'react'
import { Card, CardBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useDashboard } from '@/context/useDashboard'
import '../styles/EmployeeDashboard.css'

const NotificationsBoard = () => {
  const { notifications } = useDashboard()

  const [approvedNotifications, setApprovedNotifications] = useState<number[]>([])

  const handleApprove = (id: number) => {
    setApprovedNotifications([...approvedNotifications, id])
    console.log('Notification approved:', id)
  }

  const handleDecline = (id: number) => {
    setApprovedNotifications(approvedNotifications.filter(item => item !== id))
    console.log('Notification declined:', id)
  }

  const handleViewAll = () => {
    console.log('View all notifications clicked')
  }

  return (
    <Card className="notifications-card shadow-sm border-0">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Notifications</h5>
          <Button variant="link" size="sm" className="p-0 text-primary" onClick={handleViewAll}>
            View All
          </Button>
        </div>

        <div className="notifications-list">
          {notifications.map((notification) => (
            <div key={notification.id} className="notification-item mb-3 pb-3 border-bottom">
              <div className="d-flex gap-3">
                <img
                  src="https://ui-avatars.com/api/?name=Admin&background=random&color=fff"
                  alt="Notification"
                  className="rounded-circle flex-shrink-0"
                  style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                />
                <div className="flex-grow-1">
                  <p className="mb-1">
                    <strong>Admin</strong> {notification.message}
                  </p>
                  <small className="text-muted d-block mb-2">{notification.time}</small>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <IconifyIcon icon="lucide:bell" width={16} height={16} className="text-info" />
                    <small className="text-muted">{notification.type}</small>
                  </div>
                  {notification.type === 'warning' && (
                    <div className="d-flex gap-2">
                      <Button
                        variant="danger"
                        size="sm"
                        className="px-3"
                        onClick={() => handleApprove(notification.id)}
                        disabled={approvedNotifications.includes(notification.id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        className="px-3"
                        onClick={() => handleDecline(notification.id)}
                      >
                        Decline
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default NotificationsBoard

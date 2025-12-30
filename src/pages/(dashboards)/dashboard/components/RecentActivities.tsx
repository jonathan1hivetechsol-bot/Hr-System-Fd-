import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Card, CardBody } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const RecentActivities = () => {
  const { employees = [] } = useDashboard() || {}
  
  // Show only recent employees as activities
  const activities = employees.slice(0, 5).map((emp, idx) => ({
    id: idx + 1,
    action: 'Employee added',
    user: emp.name,
    time: emp.hireDate || 'Recently',
    icon: 'lucide:user-plus',
    variant: ['success', 'info', 'primary', 'warning', 'secondary'][idx % 5] || 'secondary',
  })) || []

  if (activities.length === 0) {
    return (
      <Card>
        <CardBody>
          <h4 className="mb-3 mt-0 fs-16">Recent Activities</h4>
          <div className="text-center text-muted py-4">
            <p>No activities yet</p>
          </div>
        </CardBody>
      </Card>
    )
  }

  return (
    <Card>
      <CardBody>
        <h4 className="mb-3 mt-0 fs-16">Recent Activities</h4>
        <div className="activity-feed">
          {activities.map((activity) => (
            <div key={activity.id} className="d-flex align-items-start mb-3">
              <div className={`bg-soft-${activity.variant} avatar-sm icon icon-xs icon-with-bg rounded-circle me-3 flex-shrink-0`}>
                <IconifyIcon icon={activity.icon} className={`icon-dual-${activity.variant}`} height={16} width={16} />
              </div>
              <div className="flex-grow-1">
                <p className="mb-0 fw-medium">{activity.action}</p>
                <p className="text-muted mb-0 fs-13">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

export default RecentActivities
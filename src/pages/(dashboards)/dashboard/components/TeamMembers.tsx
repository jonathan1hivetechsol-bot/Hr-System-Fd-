import { Card, CardBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useDashboard } from '@/context/useDashboard'
import { Link } from 'react-router-dom'
import '../styles/EmployeeDashboard.css'

const TeamMembers = () => {
  const { employees } = useDashboard()
  
  const teamMembers = employees.slice(0, 6).map(emp => ({
    id: emp.id,
    name: emp.name,
    role: emp.position,
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random&color=fff`,
    canCall: true,
    canEmail: true,
    canMessage: true,
  }))

  return (
    <Card className="team-members-card shadow-sm border-0">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Team Members</h5>
          <Button variant="link" size="sm" className="p-0 text-primary">
            View All
          </Button>
        </div>

        <div className="team-list">
          {teamMembers.map((member) => (
            <div key={member.id} className="team-member-item mb-3 pb-3 border-bottom">
              <div className="d-flex align-items-center gap-3">
                <Link to={`/employees/${member.id}`} className="d-flex align-items-center text-decoration-none text-body">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="rounded-circle"
                    style={{ width: '48px', height: '48px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1 ms-2">
                    <p className="mb-0 fw-semibold">{member.name}</p>
                    <small className="text-muted">{member.role}</small>
                  </div>
                </Link>
                <div className="d-flex gap-2">
                  {member.canCall && (
                    <Button variant="light" size="sm" className="p-2">
                      <IconifyIcon icon="lucide:phone" width={16} height={16} />
                    </Button>
                  )}
                  {member.canEmail && (
                    <Button variant="light" size="sm" className="p-2">
                      <IconifyIcon icon="lucide:mail" width={16} height={16} />
                    </Button>
                  )}
                  {member.canMessage && (
                    <Button variant="light" size="sm" className="p-2">
                      <IconifyIcon icon="lucide:message-square" width={16} height={16} />
                    </Button>
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

export default TeamMembers

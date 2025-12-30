import { Card } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const RecentEmployees = () => {
  const { employees = [] } = useDashboard() || {}
  const recentEmployees = employees.slice(0, 5)

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Recent Employees</h5>
      </Card.Header>
      <Card.Body>
        {recentEmployees.length === 0 ? (
          <div className="text-center text-muted py-4">
            <p>No employees added yet</p>
          </div>
        ) : (
          <div className="list-group list-group-flush">
            {recentEmployees.map(employee => (
            <div key={employee.id} className="list-group-item px-0">
              <div className="d-flex align-items-center">
                <div className="avatar avatar-xs rounded-circle bg-primary text-white me-3">
                  {employee.name.charAt(0)}
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0">{employee.name}</h6>
                  <small className="text-muted">{employee.position}</small>
                </div>
                <small className="text-muted">{employee.hireDate}</small>
              </div>
            </div>
          ))}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default RecentEmployees
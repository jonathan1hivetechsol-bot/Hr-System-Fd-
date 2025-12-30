import { Card, Button } from 'react-bootstrap'
import { useDashboard } from '@/context/useDashboard'

const PendingLeaves = () => {
  const { leaves = [] } = useDashboard() || {}
  const pendingLeaves = leaves.filter(leave => leave.status === 'pending')

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Pending Leave Requests</h5>
      </Card.Header>
      <Card.Body>
        <div className="list-group list-group-flush">
          {pendingLeaves.map(leave => (
            <div key={leave.id} className="list-group-item px-0">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h6 className="mb-0">Employee {leave.employeeId}</h6>
                  <small className="text-muted">{leave.type} - {leave.startDate} to {leave.endDate}</small>
                </div>
                <div>
                  <Button variant="success" size="sm" className="me-2">
                    Approve
                  </Button>
                  <Button variant="danger" size="sm">
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  )
}

export default PendingLeaves
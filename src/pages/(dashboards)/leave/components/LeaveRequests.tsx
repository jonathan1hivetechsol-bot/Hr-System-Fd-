import { useState, useEffect } from 'react'
import { Table, Button, Badge } from 'react-bootstrap'
import type { Leave } from '@/types/leave'

const LeaveRequests = () => {
  const [leaves, setLeaves] = useState<Leave[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('leaves')
    if (stored) {
      try {
        const leaves = JSON.parse(stored)
        if (Array.isArray(leaves) && leaves.length > 0) {
          setLeaves(leaves)
        }
      } catch (error) {
        console.error('Error loading leaves:', error)
      }
    }
  }, [])

  const handleApprove = (id: number) => {
    const updated = leaves.map(leave =>
      leave.id === id ? { ...leave, status: 'approved' as const } : leave
    )
    setLeaves(updated)
    localStorage.setItem('leaves', JSON.stringify(updated))
  }

  const handleReject = (id: number) => {
    const updated = leaves.map(leave =>
      leave.id === id ? { ...leave, status: 'rejected' as const } : leave
    )
    setLeaves(updated)
    localStorage.setItem('leaves', JSON.stringify(updated))
  }

  return (
    <div className="card">
      <div className="card-body p-0">
        <div className="table-responsive">
          <Table striped hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Type</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaves.map(leave => (
                <tr key={leave.id}>
                  <td>{leave.employeeName}</td>
                  <td>{leave.type}</td>
                  <td>{leave.startDate}</td>
                  <td>{leave.endDate}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <Badge bg={
                      leave.status === 'approved' ? 'success' :
                      leave.status === 'rejected' ? 'danger' : 'warning'
                    }>
                      {leave.status}
                    </Badge>
                  </td>
                  <td>
                    {leave.status === 'pending' && (
                      <>
                        <Button variant="success" size="sm" className="me-1" onClick={() => handleApprove(leave.id)}>
                          Approve
                        </Button>
                        <Button variant="danger" size="sm" onClick={() => handleReject(leave.id)}>
                          Reject
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  )
}

export default LeaveRequests
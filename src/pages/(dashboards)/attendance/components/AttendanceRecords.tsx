import { useState, useEffect } from 'react'
import { Card, Table } from 'react-bootstrap'
import type { AttendanceRecord } from '@/types/attendance'

const AttendanceRecords = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('attendance')
    if (stored) {
      setRecords(JSON.parse(stored))
    }
  }, [])

  return (
    <Card>
      <Card.Header>
        <h6 className="mb-0">Attendance Records</h6>
      </Card.Header>
      <Card.Body className="p-0">
        <div className="table-responsive">
          <Table striped hover className="mb-0">
            <thead className="table-light">
              <tr>
                <th>Employee</th>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {records.map(record => (
                <tr key={record.id}>
                  <td>{record.employeeName}</td>
                  <td>{record.date}</td>
                  <td>{record.checkIn}</td>
                  <td>{record.checkOut || '-'}</td>
                  <td>
                    <span className={`badge bg-${record.status === 'present' ? 'success' : record.status === 'late' ? 'warning' : 'danger'}`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card.Body>
    </Card>
  )
}

export default AttendanceRecords
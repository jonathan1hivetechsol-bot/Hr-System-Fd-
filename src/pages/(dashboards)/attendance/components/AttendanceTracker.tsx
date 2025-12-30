import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import type { AttendanceRecord } from '@/types/attendance'

const AttendanceTracker = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false)
  const [checkInTime, setCheckInTime] = useState<string | null>(null)

  const handleCheckIn = () => {
    const now = new Date().toLocaleTimeString()
    setCheckInTime(now)
    setIsCheckedIn(true)

    // Save to localStorage
    const records = JSON.parse(localStorage.getItem('attendance') || '[]')
    const newRecord: AttendanceRecord = {
      id: Date.now(),
      employeeId: 1, // Current user
      employeeName: 'John Doe', // Current user
      date: new Date().toISOString().split('T')[0],
      checkIn: now,
      checkOut: null,
      status: 'present'
    }
    records.push(newRecord)
    localStorage.setItem('attendance', JSON.stringify(records))
  }

  const handleCheckOut = () => {
    const now = new Date().toLocaleTimeString()
    setIsCheckedIn(false)

    // Update record
    const records = JSON.parse(localStorage.getItem('attendance') || '[]')
    const today = new Date().toISOString().split('T')[0]
    const record = records.find((r: AttendanceRecord) => r.date === today && r.employeeId === 1)
    if (record) {
      record.checkOut = now
    }
    localStorage.setItem('attendance', JSON.stringify(records))
  }

  return (
    <Card>
      <Card.Header>
        <h5 className="mb-0">Clock In/Out</h5>
      </Card.Header>
      <Card.Body className="text-center">
        <div className="mb-3">
          <h3>{new Date().toLocaleTimeString()}</h3>
          <p className="text-muted">{new Date().toLocaleDateString()}</p>
        </div>
        {isCheckedIn ? (
          <div>
            <p>Checked in at: {checkInTime}</p>
            <Button variant="danger" onClick={handleCheckOut}>
              Check Out
            </Button>
          </div>
        ) : (
          <Button variant="success" onClick={handleCheckIn}>
            Check In
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default AttendanceTracker
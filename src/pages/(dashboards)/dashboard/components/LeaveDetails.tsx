import { useEffect, useRef } from 'react'
import { Card, CardBody, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

interface LeaveChartProps {
  data: {
    onTime: number
    lateAttendance: number
    workFromHome: number
    absent: number
    sickLeave: number
  }
}

const LeaveDetailsChart = ({ data }: LeaveChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const ctx = canvasRef.current.getContext('2d')
    if (!ctx) return

    const width = canvasRef.current.clientWidth
    const height = canvasRef.current.clientHeight
    canvasRef.current.width = width
    canvasRef.current.height = height

    const centerX = width / 2
    const centerY = height / 2
    const radius = Math.min(width, height) / 2 - 20

    // Colors
    const colors = ['#0f5b4c', '#ff6b42', '#ffb82e', '#e85d44', '#7fb069']

    // Data
    const values = [data.onTime, data.lateAttendance, data.workFromHome, data.absent, data.sickLeave]
    const total = values.reduce((a, b) => a + b, 0)

    let currentAngle = -Math.PI / 2

    values.forEach((value, index) => {
      const sliceAngle = (value / total) * 2 * Math.PI

      // Draw slice
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle)
      ctx.lineTo(centerX, centerY)
      ctx.fillStyle = colors[index]
      ctx.fill()

      currentAngle += sliceAngle
    })

    // Draw inner circle for donut effect
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.6, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
  }, [data])

  return <canvas ref={canvasRef} style={{ width: '100%', height: '200px' }} />
}

const LeaveDetails = () => {
  const data = {
    onTime: 1254,
    lateAttendance: 32,
    workFromHome: 658,
    absent: 14,
    sickLeave: 68,
  }

  const items = [
    { label: 'On time', value: data.onTime, color: '#0f5b4c' },
    { label: 'Late Attendance', value: data.lateAttendance, color: '#ff6b42' },
    { label: 'Work From Home', value: data.workFromHome, color: '#ffb82e' },
    { label: 'Absent', value: data.absent, color: '#e85d44' },
    { label: 'Sick Leave', value: data.sickLeave, color: '#7fb069' },
  ]

  return (
    <Card className="leave-details-card shadow-sm border-0">
      <CardBody className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0 fw-bold">Leave Details</h5>
          <Button variant="light" size="sm" className="p-2">
            <IconifyIcon icon="lucide:calendar" width={16} height={16} />
          </Button>
        </div>

        <div className="chart-container mb-4" style={{ height: '200px' }}>
          <LeaveDetailsChart data={data} />
        </div>

        <div className="legend">
          {items.map((item, idx) => (
            <div key={idx} className="legend-item mb-2 d-flex align-items-center gap-2">
              <span
                className="legend-color"
                style={{ width: '10px', height: '10px', borderRadius: '2px', backgroundColor: item.color }}
              ></span>
              <span className="legend-label text-muted small">
                <strong>●</strong> {item.value} {item.label}
              </span>
            </div>
          ))}
        </div>

        <p className="text-muted small mt-3 mb-0">Better than 85% of Employees</p>
      </CardBody>
    </Card>
  )
}

export default LeaveDetails

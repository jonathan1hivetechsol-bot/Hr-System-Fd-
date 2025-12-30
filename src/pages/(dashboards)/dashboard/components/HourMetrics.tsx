import { Card, CardBody, Row, Col } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useDashboard } from '@/context/useDashboard'

const HourMetrics = () => {
  const { attendance } = useDashboard()
  
  // Calculate metrics
  const today = new Date().toLocaleDateString()
  const thisWeek = new Date()
  thisWeek.setDate(thisWeek.getDate() - 7)
  const thisMonth = new Date()
  thisMonth.setMonth(thisMonth.getMonth() - 1)
  
  const todayHours = attendance
    .filter(a => a.date === today)
    .reduce((sum, a) => sum + a.totalHours, 0)
    
  const weekHours = attendance
    .filter(a => new Date(a.date) >= thisWeek)
    .reduce((sum, a) => sum + a.totalHours, 0)
    
  const monthHours = attendance
    .filter(a => new Date(a.date) >= thisMonth)
    .reduce((sum, a) => sum + a.totalHours, 0)

  const metrics = [
    {
      icon: 'lucide:clock',
      label: 'Total Hours Today',
      value: todayHours.toFixed(2),
      target: '9',
      color: 'danger',
      bgColor: '#ff5722',
    },
    {
      icon: 'lucide:calendar',
      label: 'Total Hours Week',
      value: weekHours.toFixed(0),
      target: '40',
      color: 'dark',
      bgColor: '#1a1a1a',
    },
    {
      icon: 'lucide:trending-up',
      label: 'Total Hours Month',
      value: monthHours.toFixed(0),
      target: '160',
      color: 'primary',
      bgColor: '#0066ff',
    },
    {
      icon: 'lucide:gift',
      label: 'Overtime this Month',
      value: '16',
      target: '28',
      color: 'pink',
      bgColor: '#ff1493',
    },
  ]

  return (
    <Row className="g-3">
      {metrics.map((metric, idx) => (
        <Col lg={3} md={6} xs={12} key={idx}>
          <Card className="hour-metric-card shadow-sm border-0">
            <CardBody className="p-3">
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <div
                      className="rounded p-2 d-flex align-items-center justify-content-center"
                      style={{ backgroundColor: metric.bgColor, width: '40px', height: '40px' }}
                    >
                      <IconifyIcon icon={metric.icon} width={20} height={20} className="text-white" />
                    </div>
                  </div>
                  <p className="text-muted small mb-2">{metric.label}</p>
                  <h6 className="mb-0 fw-bold">
                    {metric.value} / {metric.target}
                  </h6>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default HourMetrics

import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { Card, CardBody } from 'react-bootstrap'

type MetricCardProps = {
  icon: string
  title: string
  value: string
  percentage: number
  percentageType: 'positive' | 'negative'
  bgVariant: string
  iconVariant: string
}

const MetricCard = ({ icon, title, value, percentage, percentageType, bgVariant, iconVariant }: MetricCardProps) => {
  return (
    <Card className="h-100 shadow-sm">
      <CardBody className="p-3">
        <div className="d-flex align-items-center mb-3">
          <div className={clsx('avatar-sm icon icon-xs icon-with-bg rounded me-3', `bg-soft-${bgVariant}`)}>
            <IconifyIcon icon={icon} className={`icon-dual-${iconVariant}`} height={20} width={20} />
          </div>
        </div>
        <h6 className="text-muted mb-2 fs-12 fs-sm-13">{title}</h6>
        <h4 className="mb-2 fs-20 fs-sm-24">{value}</h4>
        <p className={clsx('mb-0 fs-12', percentageType === 'positive' ? 'text-success' : 'text-danger')}>
          <IconifyIcon 
            icon={percentageType === 'positive' ? 'lucide:trending-up' : 'lucide:trending-down'} 
            height={14} 
            width={14}
            className="me-1"
          />
          {percentageType === 'positive' ? '+' : '-'}{Math.abs(percentage)}%
        </p>
        <p className="text-muted mb-0 fs-12 mt-2">
          <a href="#" className="text-primary text-decoration-none">View {title.includes('All') ? 'Details' : 'All'}</a>
        </p>
      </CardBody>
    </Card>
  )
}

export default MetricCard
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { Card, CardBody } from 'react-bootstrap'

type StatWidgetProps = {
  icon: string
  variant: string
  stats: number
  title: string
}

const StatWidget = ({ icon, variant, stats, title }: StatWidgetProps) => {
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div className={clsx('bg-soft-' + variant, 'avatar-sm', 'icon', 'icon-xs', 'icon-with-bg', 'rounded-sm', 'me-3')}>
            <IconifyIcon icon={icon} className={clsx('icon-dual-' + variant)} height={24} width={24} />
          </div>
          <div className="flex-grow-1">
            <h3 className="mt-0 mb-0">{stats}</h3>
            <p className="text-muted mb-0">{title}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default StatWidget

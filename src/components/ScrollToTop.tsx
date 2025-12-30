import useScrollEvent from '@/hooks/useScrollEvent'
import clsx from 'clsx'
import { Button } from 'react-bootstrap'
import IconifyIcon from './wrappers/IconifyIcon'

const ScrollToTop = () => {
  const { scrollY } = useScrollEvent()
  return (
    <Button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      variant="soft-primary"
      className={clsx('shadow-none btn-icon btn-back-to-top', { show: scrollY > 200 })}
    >
      <IconifyIcon style={{ height: 16, width: 16 }} className="icon-xxs" icon="lucide:arrow-up" />
    </Button>
  )
}
export default ScrollToTop

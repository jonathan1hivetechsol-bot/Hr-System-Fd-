import IconifyIcon from '@/components/wrappers/IconifyIcon'
import clsx from 'clsx'
import { useContext } from 'react'
import { Accordion, AccordionContext, useAccordionButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { features } from '../data'
type CustomToggleProps = {
  children: React.ReactNode
  eventKey: string
  containerClass: string
  linkClass: string
  callback?: (eventKey: string) => void
}

const CustomToggle = ({ children, eventKey, linkClass, callback }: CustomToggleProps) => {
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey))

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <span
      role="button"
      className={clsx(linkClass, {
        collapsed: !isCurrentEventKey,
      })}
      onClick={decoratedOnClick}
    >
      {children}
    </span>
  )
}
const FeaturesAccordion = () => {
  return (
    <Accordion defaultActiveKey={'0'} id="features-list" data-aos="fade-up" data-aos-duration={300}>
      {features.map((feature, idx) => (
        <div key={idx} className={clsx('d-flex border-bottom', idx === 0 ? 'pb-4' : 'py-4')}>
          <span
            className={`bg-soft-${feature.variant} avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-${feature.variant} me-3 flex-shrink-0`}
          >
            <IconifyIcon style={{ height: 24, width: 24 }} icon={feature.avatar} />
          </span>
          <div className="flex-grow-1 align-self-center">
            <CustomToggle eventKey={`${idx}`} containerClass="m-0" linkClass="text-dark h4">
              {feature.title}
            </CustomToggle>
            <Accordion.Collapse eventKey={`${idx}`}>
              <div>
                <p className="text-muted mt-1 mb-4">{feature.description}</p>
                <Link to="" className="h6 text-primary">
                  Learn more
                  <IconifyIcon className="ms-1 icon-xxs" style={{ height: 16, width: 16 }} icon="lucide:arrow-right" />
                </Link>
              </div>
            </Accordion.Collapse>
          </div>
        </div>
      ))}
    </Accordion>
  )
}
export default FeaturesAccordion

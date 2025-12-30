import clsx from 'clsx'
import { useContext } from 'react'
import { Accordion, AccordionCollapse, AccordionContext, Card, CardBody, CardHeader, Col, Container, Row, useAccordionButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import IconifyIcon from '../wrappers/IconifyIcon'
import { FAQContent } from './data'

type CustomToggleProps = {
  children: React.ReactNode
  eventKey: string
  callback?: (eventKey: string) => void
}

const CustomToggle = ({ children, eventKey, callback }: CustomToggleProps) => {
  const { activeEventKey } = useContext(AccordionContext)

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey))

  const isCurrentEventKey = activeEventKey === eventKey

  return (
    <div role="button" onClick={decoratedOnClick} className={clsx('text-dark', { collapsed: !isCurrentEventKey })}>
      <CardHeader id="headingOne">
        <h5 className="my-1 fw-medium">
          {children}
          <IconifyIcon className="icon-xs accordion-arrow" icon="lucide:chevron-down" />
        </h5>
      </CardHeader>
    </div>
  )
}
const FAQs = () => {
  return (
    <section className="section py-6 pt-sm-6 position-relative">
      <Container data-aos="fade-up" data-aos-duration={2000}>
        <Row>
          <Col className="text-center">
            <span className="badge rounded-pill badge-soft-primary px-2 py-1">FAQs</span>
            <h1 className="display-5 fw-medium">Frequently Asked Questions</h1>
            <p className="text-muted mx-auto">Here are some of the basic types of questions for our customers</p>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col md={10} lg={8}>
            <div id="faqContent">
              <Accordion defaultActiveKey={'0'} className="custom-accordionwitharrow" id="accordionExample">
                {FAQContent.map((faq, idx) => (
                  <Card className="mb-1 border rounded-sm" key={idx}>
                    <CustomToggle eventKey={`${idx}`}>{faq.title}</CustomToggle>
                    <AccordionCollapse eventKey={`${idx}`}>
                      <div>
                        <CardBody className="text-muted pt-1">
                          Yup, the marketplace license allows you to use this theme in any end products. For more information on licenses, please
                          refere license terms on marketplace.
                        </CardBody>
                      </div>
                    </AccordionCollapse>
                  </Card>
                ))}
              </Accordion>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={'auto'}>
            <div className="rounded d-inline-block py-2 px-3 alert bg-light">
              <div className="d-flex align-items-center">
                <div className="text-dark">
                  Still have unanswered questions? <Link to="">Contact Us</Link>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default FAQs

import sass1 from '@/assets/images/hero/saas1.jpg'
import saas2 from '@/assets/images/hero/saas2.jpg'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { Col, Container, Image, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import FeaturesAccordion from './FeaturesAccordion'

const Features = () => {
  return (
    <>
      <section className="position-relative overflow-hidden py-4 pb-lg-7">
        <Container>
          <Row className="justify-content-center">
            <Col className="text-center">
              <span className="badge rounded-pill badge-soft-primary px-2 py-1">Features</span>
              <h1 className="display-5 fw-medium">Better Management. Better Performance</h1>
              <p className="text-muted mx-auto">
                Start working with <span className="text-primary fw-bold">Prompt</span> to manage your workforce better
              </p>
            </Col>
          </Row>
          <Row className="pt-5 align-items-center features-3">
            <Col lg={6}>
              <div className="img-content position-relative">
                <div className="img-up mb-lg-0 mb-6">
                  <Image src={sass1} alt="app img" className="img-fluid d-block rounded" data-aos="fade-right" data-aos-duration={200} />
                </div>
              </div>
            </Col>
            <Col lg={5} className="offset-lg-1">
              <FeaturesAccordion />
            </Col>
          </Row>
        </Container>
      </section>

      <section className="position-relative overflow-hidden py-7 features-3">
        <Container>
          <Row className="align-items-center">
            <Col lg={5}>
              <div className="mb-5 mb-lg-0" data-aos="fade-up" data-aos-duration={200}>
                <span className="bg-soft-primary avatar avatar-sm rounded-lg icon icon-with-bg icon-xs text-primary me-3">
                  <svg
                    width="24px"
                    height="24px"
                    viewBox="0 0 24 24"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <title>Stockholm-icons / Shopping / MC</title>
                    <desc>Created with Sketch.</desc>
                    <g id="Stockholm-icons-/-Shopping-/-MC" stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                      <rect id="bound" x={0} y={0} width={24} height={24} />
                      <path
                        d="M10.8226874,8.36941377 L12.7324324,9.82298668 C13.4112512,8.93113547 14.4592942,8.4 15.6,8.4 C17.5882251,8.4 19.2,10.0117749 19.2,12 C19.2,13.9882251 17.5882251,15.6 15.6,15.6 C14.5814697,15.6 13.6363389,15.1780547 12.9574041,14.4447676 L11.1963369,16.075302 C12.2923051,17.2590082 13.8596186,18 15.6,18 C18.9137085,18 21.6,15.3137085 21.6,12 C21.6,8.6862915 18.9137085,6 15.6,6 C13.6507856,6 11.9186648,6.9294879 10.8226874,8.36941377 Z"
                        id="Combined-Shape"
                        fill="#335EEA"
                        opacity="0.3"
                      />
                      <path
                        d="M8.4,18 C5.0862915,18 2.4,15.3137085 2.4,12 C2.4,8.6862915 5.0862915,6 8.4,6 C11.7137085,6 14.4,8.6862915 14.4,12 C14.4,15.3137085 11.7137085,18 8.4,18 Z"
                        id="Oval-14-Copy"
                        fill="#335EEA"
                      />
                    </g>
                  </svg>
                </span>
                <h1 className="text-dark pt-3">Smart Payroll. Paying your people couldn&apos;t be easier</h1>
                <p className="text-muted my-4">
                  You can modify your pages with drag-dropping , can import demos with just ” One Click” and can modify theme setting easy-to-use
                  options panel.
                </p>
                <Link to="" className="h6 text-primary pt-3">
                  Learn more <IconifyIcon className="ms-1 icon-xxs" icon="lucide:arrow-right" />
                </Link>
              </div>
            </Col>
            <Col lg={6} className="offset-lg-1">
              <div className="img-content2 position-relative">
                <div className="img-up">
                  <Image src={saas2} alt="app img" className="img-fluid d-block rounded" data-aos="fade-left" data-aos-duration={300} />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="position-relative pb-6 pt-lg-6 pt-4 features-3">
        <Container data-aos="fade-up" data-aos-duration={200}>
          <Row className="justify-content-center">
            <Col className="text-center">
              <h3 className="fw-medium mb-5">Any many more powerful features</h3>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6}>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Hire and Retain Top Talent
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Team Management
              </h6>
            </Col>
            <Col lg={3} md={6}>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Stay Compliant
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Improve Productivity
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Improve Experience
              </h6>
            </Col>
            <Col lg={3} md={6}>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Self-service Time Tracking
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Performance Management
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Expert HR
              </h6>
            </Col>
            <Col lg={3} md={6}>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                New Hire Checklist
              </h6>
              <h6 className="fw-medium fs-16 mb-4">
                <IconifyIcon width="29" height="29" className="icon-dual-success me-2" icon="fe:check" />
                Tax Calculator
              </h6>
            </Col>
          </Row>
          <Row className="mt-5 justify-content-center">
            <Col xs="auto">
              <Link to="" className="btn btn-primary mb-2">
                Sign Up Now
                <IconifyIcon className="icon-xs ms-2" icon="lucide:arrow-right" />
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  )
}
export default Features

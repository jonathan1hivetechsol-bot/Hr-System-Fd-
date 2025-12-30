import { Col, Container, Row } from 'react-bootstrap'
import TestimonialSwiper from './TestimonialSwiper'

const Testimonial = () => {
  return (
    <section className="section pt-5 pb-6 py-sm-8 mb-5 mb-sm-0 bg-light position-relative" data-aos="fade-up" data-aos-duration={500}>
      <div className="divider top d-none d-sm-block" />
      <Container className="testimonials-1">
        <Row className="align-items-center">
          <Col>
            <span className="badge rounded-pill badge-soft-primary px-2 py-1">Testimonials</span>
            <h1 className="display-5 fw-semibold">What People Say</h1>
          </Col>
          <Col xs="auto" className="text-sm-right pt-2 pt-sm-0">
            <div className="navigations">
              <button className="btn btn-link text-normal p-0 swiper-custom-prev">
                <svg
                  className="bi bi-arrow-left"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
                    clipRule="evenodd"
                  />
                  <path fillRule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                </svg>
              </button>
              <button className="btn btn-link text-normal p-0 swiper-custom-next">
                <svg
                  className="bi bi-arrow-right"
                  width="1.75em"
                  height="1.75em"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.146 4.646a.5.5 0 01.708 0l3 3a.5.5 0 010 .708l-3 3a.5.5 0 01-.708-.708L12.793 8l-2.647-2.646a.5.5 0 010-.708z"
                    clipRule="evenodd"
                  />
                  <path fillRule="evenodd" d="M2 8a.5.5 0 01.5-.5H13a.5.5 0 010 1H2.5A.5.5 0 012 8z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </Col>
        </Row>
        <Row className="mt-3 mt-sm-5">
          <Col>
            <TestimonialSwiper />
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Testimonial

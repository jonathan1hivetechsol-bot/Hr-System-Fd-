import avatar1 from '@/assets/images/avatars/img-1.jpg'
import avatar2 from '@/assets/images/avatars/img-2.jpg'
import { Card, CardBody, Col, Container, Image, Row } from 'react-bootstrap'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export type Testimonials = {
  name: string
  position: string
  description: string
  image: string
}

const feedbackTestimonials: Testimonials[] = [
  {
    name: 'John Stark',
    position: 'Engineering Director',
    description:
      'It is one of the very convenient to use project manager ever! I have tried many project management apps for my daily tasks, but this one is far better than others. Simply loved it!',
    image: avatar1,
  },
  {
    name: 'Cersei Lannister',
    position: 'Senior Project Manager',
    description:
      'This app is a truly blessing for all professionals! A day to day project management was never easy for me. But with prompt, I can manage more than 100 projects easily.',
    image: avatar2,
  },
]

const FeedbackSlide = ({ description, image, name, position }: Testimonials) => {
  return (
    <Card className="mb-0 border rounded">
      <CardBody className="testimonial-body shadow">
        <p className="quotation-mark text-muted">“</p>
        <h4 className="fw-normal mb-3 mt-0">{description}</h4>
        <hr />
        <div className="d-flex pt-2">
          <Image className="me-2 rounded-circle" src={image} alt="image" height={36} />
          <div className="flex-grow-1">
            <h6 className="m-0">{name}</h6>
            <p className="my-0 text-muted fs-13">{position}</p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const FeedbackTestimonial = () => {
  return (
    <section className="section pt-5 pb-7 py-sm-9 position-relative features-4">
      <Container>
        <Row className="testimonials-2" data-aos="fade-up" data-aos-duration={200}>
          <Col lg={3}>
            <Row className="align-items-center">
              <Col>
                <span className="badge rounded-pill badge-soft-primary px-2 py-1">Feedback</span>
                <h1 className="display-5 fw-medium">What people say</h1>
                <p className="text-muted mx-auto">Few valuables words from our customers</p>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={'auto'} className="text-sm-right pt-2 pt-sm-0">
                <div className="navigations mb-4 mb-lg-0">
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
          </Col>
          <Col lg={8} className="offset-lg-1">
            <div className="slider">
              <Swiper
                loop
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                autoplay={{
                  delay: 5000,
                }}
                roundLengths
                slidesPerView={1}
                navigation={{ nextEl: '.swiper-custom-next', prevEl: '.swiper-custom-prev' }}
              >
                {feedbackTestimonials.map((feedback, idx) => (
                  <SwiperSlide key={idx}>
                    <FeedbackSlide {...feedback} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default FeedbackTestimonial

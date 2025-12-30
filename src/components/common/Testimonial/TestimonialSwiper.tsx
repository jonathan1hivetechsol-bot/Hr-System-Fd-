import { Card, CardBody, Image } from 'react-bootstrap'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import IconifyIcon from '../../wrappers/IconifyIcon'
import { testimonials } from '../data'

type TestimonialProps = {
  name: string
  position: string
  description: string
  image: string
}

const TestimonialCard = ({ description, image, name, position }: TestimonialProps) => {
  return (
    <Card className="mb-0">
      <CardBody className="p-md-5">
        <p className="fw-normal mb-4 mt-0">{description}</p>
        <div className="d-flex text-align-start">
          <Image className="me-2 rounded-circle" src={image} alt="avatar" height={36} />
          <div className="flex-grow-1">
            <h6 className="m-0">{name}</h6>
            <p className="my-0 text-muted fs-13">{position}</p>
          </div>
          <div className="align-self-center">
            {Array.from(new Array(Math.floor(5))).map((_val, idx) => (
              <IconifyIcon icon="fe:star" key={idx} style={{ height: 20, width: 20 }} className="icon icon-xxs icon-fill-warning text-warning" />
            ))}
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

const TestimonialSwiper = () => {
  return (
    <div className="slider">
      <div className="swiper-container" data-toggle="swiper">
        <Swiper
          modules={[Autoplay, Navigation]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          roundLengths
          slidesPerView={2}
          spaceBetween={24}
          breakpoints={{
            576: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
          }}
          loop
          navigation={{
            nextEl: '.swiper-custom-next',
            prevEl: '.swiper-custom-prev',
          }}
        >
          {testimonials.map((testimonial, idx) => (
            <SwiperSlide key={idx}>
              <TestimonialCard {...testimonial} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
export default TestimonialSwiper

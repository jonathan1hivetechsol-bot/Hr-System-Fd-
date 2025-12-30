import { Col, Image, Row } from 'react-bootstrap'
import { Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { authSwiperSlides } from './data'

const AuthSwiper = () => {
  return (
    <div className="slider">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop
        slidesPerView={1}
        spaceBetween={0}
        autoplay={{
          delay: 5000,
        }}
        breakpoints={{
          576: {
            slidesPerView: 1.2,
          },
          768: {
            slidesPerView: 1,
          },
        }}
        roundLengths
        pagination={{
          el: '.swiper-pagination',
          dynamicBullets: true,
        }}
      >
        {authSwiperSlides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="swiper-slide-content">
              <Row className="text-center">
                <Col>
                  <Image height={244} width={348} src={slide.image} alt="saas1" className="w-75" />
                </Col>
              </Row>
              <Row className="text-center my-4 pb-5">
                <Col>
                  <h5 className="fw-medium fs-16">{slide.title}</h5>
                  <p className="text-muted">{slide.description}</p>
                </Col>
              </Row>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="swiper-pagination" />
    </div>
  )
}
export default AuthSwiper

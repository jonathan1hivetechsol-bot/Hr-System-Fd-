import amazon from '@/assets/images/brands/amazon.svg'
import google from '@/assets/images/brands/google.svg'
import paypal from '@/assets/images/brands/paypal.svg'
import shopify from '@/assets/images/brands/shopify.svg'
import spotify from '@/assets/images/brands/spotify.svg'
import { Col, Container, Image, Row } from 'react-bootstrap'

const brands = [amazon, google, paypal, spotify, shopify]

const Clients = () => {
  return (
    <section className="section pt-8 pb-6 bg-gradient3 position-relative">
      <div className="divider top d-none d-sm-block" />
      <Container>
        <Row data-aos="fade-up" data-aos-duration={200}>
          <Col className="text-center">
            <span className="badge rounded-pill badge-soft-primary px-2 py-1">Clients</span>
            <h1 className="display-5 fw-medium">The smart people management you need</h1>
            <p className="text-muted mx-auto">
              21,000+ organizations trust <span className="text-primary fw-bold">Prompt</span> to drive perfomance &amp; engagement
            </p>
            <ul className="list-inline mt-5">
              {brands.map((brand, idx) => (
                <li className="list-inline-item mx-4 mx-xl-5 mb-3" key={idx}>
                  <Image src={brand} alt="" height={32} />
                </li>
              ))}
            </ul>
          </Col>
        </Row>
      </Container>
    </section>
  )
}
export default Clients

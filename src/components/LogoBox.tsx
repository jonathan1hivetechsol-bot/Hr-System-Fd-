import logoLight from '@/assets/images/logo-light.png'
import logo from '@/assets/images/logo.png'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const LogoBox = () => {
  return (
    <Link className="navbar-brand logo" to="/">
      <Image src={logo} height={30} className="align-top logo-dark" alt="logo" />
      <Image src={logoLight} height={30} className="align-top logo-light" alt="logo-light" />
    </Link>
  )
}
export default LogoBox

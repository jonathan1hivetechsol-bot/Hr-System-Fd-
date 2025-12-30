import { pagesMenu, servicesSection, webSection, type MenuItem, type MenuSection } from '@/assets/data/menu-items'
import useToggle from '@/hooks/useToggle'
import clsx from 'clsx'
import { Dropdown, DropdownToggle } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import IconifyIcon from '../wrappers/IconifyIcon'

const DropdownItem = ({ item }: { item: MenuItem }) => {
  const { isTrue: accountOpen, toggle: accountToggle } = useToggle()

  if (item.divider) {
    return (
      <li className="nav-item">
        <hr className="my-2" />
      </li>
    )
  }

  if (item.children) {
    return (
      <Dropdown as={'li'} className="nav-item">
        <DropdownToggle onClick={accountToggle} as={Link} className="nav-link" to="" data-bs-toggle="dropdown">
          {item.label}
          <div className="arrow ms-1" />
        </DropdownToggle>
        <div className={`dropdown-menu ${accountOpen ? 'show' : ''}`}>
          <ul className="nav">
            {item.children.map((child, idx) => (
              <DropdownItem key={idx} item={child} />
            ))}
          </ul>
        </div>
      </Dropdown>
    )
  }

  return (
    <li className="nav-item">
      <Link className="nav-link" to={item.href || ''}>
        {item.icon && <span className="me-2">{item.icon}</span>}
        {item.label}
      </Link>
    </li>
  )
}

const TopMenu = ({ centered }: { centered?: boolean }) => {
  const { pathname } = useLocation()
  const isActive = (url: string) => pathname === url || pathname.startsWith(url)

  const { isTrue: pagesOpen, toggle: pagesToggle } = useToggle()
  const { isTrue: landingsOpen, toggle: landingsToggle } = useToggle()

  const sections: MenuSection[] = [webSection, servicesSection]
  return (
    <>
      <ul className={clsx('navbar-nav align-items-lg-center', centered ? 'mx-auto' : 'ms-auto')}>
        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} to="/">
            Home
          </Link>
        </li>
        <Dropdown as={'li'} className="nav-item">
          <DropdownToggle
            as={Link}
            onClick={landingsToggle}
            className={`nav-link ${isActive('/landing') ? 'active ' : ''}`}
            to=""
            id="navbarLandings"
            role="button"
            data-bs-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Landings
            <IconifyIcon icon="fe:arrow-down" style={{ height: 16, width: 16 }} className="d-inline-block icon icon-xxs ms-1 mt-lg-0 mt-1" />
          </DropdownToggle>
          <div className={`dropdown-menu dropdown-menu-lg ${landingsOpen ? 'show' : ''}`} aria-labelledby="navbarLandings">
            <div className="row mx-0">
              {sections.map((section, idx) => (
                <div key={idx} className="col-md-6 p-lg-0">
                  <label className="nav-title fw-semibold fs-14 text-dark text-uppercase mb-3">{section.title}</label>
                  <ul className="nav">
                    {section.items.map((item, i) => (
                      <li key={i} className="nav-item">
                        {item.href && (
                          <Link
                            className={`nav-link mt-1 ${isActive(item.href ?? '') ? 'active' : ''}`}
                            to={item.href}
                            aria-labelledby="navbarLandings"
                          >
                            <div className="d-flex align-items-center">
                              {item.icon}
                              <div className="flex-grow-1">{item.label}</div>
                            </div>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </Dropdown>

        <Dropdown as="li" className="nav-item">
          <DropdownToggle className={`nav-link ${isActive('/pages') ? 'active ' : ''}`} as={Link} to="" onClick={pagesToggle}>
            Pages
            <IconifyIcon icon="fe:arrow-down" style={{ height: 16, width: 16 }} className="d-inline-block icon icon-xxs ms-1 mt-lg-0 mt-1" />
          </DropdownToggle>
          <div className={`dropdown-menu ${pagesOpen ? 'show' : ''}`} aria-labelledby="navbarPages">
            <ul className="nav">
              {pagesMenu.items.map((item, idx) => (
                <DropdownItem key={idx} item={item} />
              ))}
            </ul>
          </div>
        </Dropdown>
        <li className="nav-item">
          <Link className={`nav-link ${pathname === '/' ? 'active' : ''}`} to="/pages/contact">
            Contact
          </Link>
        </li>
      </ul>
    </>
  )
}

export default TopMenu

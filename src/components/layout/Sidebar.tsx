import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { Collapse } from 'react-bootstrap'
import IconifyIcon from '../wrappers/IconifyIcon'

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const Sidebar = ({ isOpen = true, onClose }: SidebarProps) => {
  const location = useLocation()
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['Dashboard'])

  const toggleMenu = (menu: string) => {
    setExpandedMenus((prev) =>
      prev.includes(menu) ? prev.filter((m) => m !== menu) : [...prev, menu]
    )
  }

  const isActive = (path: string) => location.pathname.includes(path)

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'lucide:home',
      path: '/dashboard',
      submenu: [
        { label: 'Admin Dashboard', path: '/dashboard' },
        { label: 'Employee Dashboard', path: '/dashboard/employee' },
      ],
    },
    {
      label: 'Employees',
      icon: 'lucide:users',
      path: '/employees',
      submenu: [],
    },
    {
      label: 'HR',
      icon: 'lucide:briefcase',
      path: '/hr',
      submenu: [],
    },
    {
      label: 'Attendance',
      icon: 'lucide:clock',
      path: '/attendance',
      submenu: [],
    },
    {
      label: 'Leave',
      icon: 'lucide:calendar',
      path: '/leave',
      submenu: [],
    },
    {
      label: 'Payroll',
      icon: 'lucide:dollar-sign',
      path: '/payroll',
      submenu: [],
    },
  ]

  return (
    <aside
      className="sidebar bg-white"
      style={{
        width: '280px',
        height: 'calc(100vh - 65px)',
        overflowY: 'auto',
        position: 'fixed',
        left: isOpen ? '0' : '-280px',
        top: '65px',
        boxShadow: '0 0 20px rgba(0,0,0,0.05)',
        transition: 'left 0.3s ease',
        zIndex: 1021
      }}
    >
      <style>{`
        @media (min-width: 992px) {
          .sidebar {
            position: fixed !important;
            left: 0 !important;
            top: 65px !important;
            height: calc(100vh - 65px) !important;
          }
        }
        }
      `}</style>
      {/* Logo Section */}
      <div className="p-4 border-bottom">
        <div className="d-flex align-items-center gap-2 text-decoration-none mb-3">
          <div className="bg-danger rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <IconifyIcon icon="lucide:radio" width={24} height={24} className="text-white" />
          </div>
          <div>
            <h6 className="mb-0 fw-bold">Future Designz</h6>
            <small className="text-muted">HR Panel</small>
          </div>
        </div>
      </div>

      {/* Main Menu */}
      <div className="p-3">
        <p className="text-muted fw-bold fs-12 text-uppercase mb-3">Main Menu</p>

        <nav className="nav flex-column">
          {menuItems.map((item) => (
            <div key={item.label}>
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center justify-content-between p-3 rounded-2 mb-2 ${
                  isActive(item.path) ? 'bg-light text-primary fw-semibold' : 'text-dark'
                }`}
                onClick={() => {
                  if (item.submenu.length > 0) toggleMenu(item.label)
                  if (onClose) onClose()
                }}
              >
                <span className="d-flex align-items-center gap-2">
                  <IconifyIcon icon={item.icon} width={20} height={20} />
                  {item.label}
                </span>
                {item.submenu.length > 0 && (
                  <IconifyIcon
                    icon={expandedMenus.includes(item.label) ? 'lucide:chevron-down' : 'lucide:chevron-right'}
                    width={16}
                    height={16}
                  />
                )}
              </Link>

              {/* Submenu */}
              {item.submenu.length > 0 && (
                <Collapse in={expandedMenus.includes(item.label)}>
                  <div className="ms-3 mb-2">
                    {item.submenu.map((sub) => (
                      <Link
                        key={sub.path}
                        to={sub.path}
                        className={`nav-link p-2 ms-3 fs-13 d-block text-decoration-none ${
                          isActive(sub.path) ? 'text-primary fw-bold border-start border-primary ps-3' : 'text-muted'
                        }`}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </Collapse>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Applications Section */}
      <div className="p-3 border-top mt-3">
        <p className="text-muted fw-bold fs-12 text-uppercase mb-3">Applications</p>
        <Link to="#" className="nav-link d-flex align-items-center gap-2 p-3 rounded-2 text-dark mb-2">
          <IconifyIcon icon="lucide:grid" width={20} height={20} />
          <span>Applications</span>
          <IconifyIcon icon="lucide:chevron-down" width={16} height={16} className="ms-auto" />
        </Link>
      </div>

      {/* Settings Section */}
      <div className="p-3 border-top mt-3">
        <p className="text-muted fw-bold fs-12 text-uppercase mb-3">Settings</p>
        <Link to="/settings" className="nav-link d-flex align-items-center gap-2 p-3 rounded-2 text-dark mb-2">
          <IconifyIcon icon="lucide:settings" width={20} height={20} />
          <span>Settings</span>
          <IconifyIcon icon="lucide:chevron-up" width={16} height={16} className="ms-auto" />
        </Link>
      </div>

      {/* User Profile Section */}
      <div className="p-3 border-top mt-auto">
        <Link to="#" className="nav-link d-flex align-items-center gap-3 p-3 rounded-2 text-dark">
          <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '40px', height: '40px' }}>
            <IconifyIcon icon="lucide:user" width={20} height={20} className="text-white" />
          </div>
          <div className="flex-grow-1">
            <p className="mb-0 fw-semibold fs-13">Admin User</p>
            <small className="text-muted">Administrator</small>
          </div>
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar
import { Link, useLocation } from 'react-router-dom'
import IconifyIcon from '../wrappers/IconifyIcon'

interface EmployeeSidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

const EmployeeSidebar = ({ isOpen = true, onClose }: EmployeeSidebarProps) => {
  const location = useLocation()

  const isActive = (path: string) => location.pathname.includes(path)

  const menuItems = [
    {
      label: 'Dashboard',
      icon: 'lucide:home',
      path: '/dashboards/dashboard/employee',
    },
    {
      label: 'Attendance',
      icon: 'lucide:clock',
      path: '/dashboards/attendance',
      description: 'Check in/out daily'
    },
    {
      label: 'Leave Applications',
      icon: 'lucide:calendar-x',
      path: '/dashboards/leave',
      description: 'Apply for leave'
    },
    {
      label: 'Chat',
      icon: 'lucide:message-circle',
      path: '/dashboards/chat',
      description: 'Chat with others'
    },
    {
      label: 'My Profile',
      icon: 'lucide:user',
      path: '/dashboards/employees/me',
      description: 'View my profile'
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
      `}</style>

      {/* Logo Section */}
      <div className="p-4 border-bottom">
        <div className="d-flex align-items-center gap-2 text-decoration-none mb-3">
          <div className="bg-primary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <IconifyIcon icon="lucide:radio" width={24} height={24} className="text-white" />
          </div>
          <div>
            <h6 className="mb-0 fw-bold">Future Designz</h6>
            <small className="text-muted">Employee</small>
          </div>
        </div>
      </div>

      {/* Employee Menu */}
      <div className="p-3">
        <p className="text-muted fw-bold fs-12 text-uppercase mb-3">Menu</p>

        <nav className="nav flex-column">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link d-flex align-items-center gap-2 p-3 rounded-2 mb-2 text-decoration-none transition-all ${
                isActive(item.path)
                  ? 'bg-primary text-white fw-semibold shadow-sm'
                  : 'text-dark hover-bg-light'
              }`}
              onClick={() => {
                if (onClose) onClose()
              }}
              style={{
                transition: 'all 0.2s ease'
              }}
            >
              <IconifyIcon icon={item.icon} width={20} height={20} />
              <div className="flex-grow-1">
                <span className="d-block">{item.label}</span>
                {item.description && (
                  <small className={isActive(item.path) ? 'text-white-50' : 'text-muted'}>
                    {item.description}
                  </small>
                )}
              </div>
            </Link>
          ))}
        </nav>
      </div>

      {/* Quick Actions */}
      <div className="p-3 border-top mt-4">
        <p className="text-muted fw-bold fs-12 text-uppercase mb-3">Quick Actions</p>
        <div className="d-grid gap-2">
          <button className="btn btn-sm btn-outline-primary">
            <IconifyIcon icon="lucide:plus" width={16} height={16} className="me-2" />
            Request Leave
          </button>
          <button className="btn btn-sm btn-outline-primary">
            <IconifyIcon icon="lucide:download" width={16} height={16} className="me-2" />
            Download Payslip
          </button>
        </div>
      </div>
    </aside>
  )
}

export default EmployeeSidebar

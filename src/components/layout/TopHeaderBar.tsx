import { useState } from 'react'
import { Container, Row, Col, Form, Dropdown, Badge, Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { useFirebase, logoutUser } from '@/firebase'
import { useNavigate } from 'react-router-dom'
import { useDashboard } from '@/context/useDashboard'
import './TopHeaderBar.css'

import type { Employee } from '@/types/employee'

interface Notification {
  id: number
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  read: boolean
}

const TopHeaderBar = () => {
  const { user } = useFirebase()
  const navigate = useNavigate()
  const { employees = [] } = useDashboard() || {}
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Employee[]>([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, message: "Your Leave Request on '24th April 2024' has been Approved!!!", type: 'success', read: false },
    { id: 2, message: 'New payroll processed successfully', type: 'info', read: true },
  ])

  const unreadCount = notifications.filter(n => !n.read).length
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i)

  // Enhanced search functionality
  const handleSearch = (query: string) => {
    setSearchQuery(query)
    if (query.trim().length > 0) {
      const results = employees.filter(emp =>
        emp.name.toLowerCase().includes(query.toLowerCase()) ||
        emp.email.toLowerCase().includes(query.toLowerCase()) ||
        emp.department.toLowerCase().includes(query.toLowerCase()) ||
        emp.position.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(results)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }

  // Handle employee click from search
  const handleSearchResultClick = (employee: Employee) => {
    setSearchQuery('')
    setShowSearchResults(false)
    // Could navigate to employee detail page
    console.log('Selected employee:', employee)
  }

  const handleNotificationClick = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleClearAll = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const handleLogout = async () => {
    try {
      const result = await logoutUser()
      if (result.success) {
        navigate('/auth/login')
      } else {
        console.error('Logout failed:', result.error)
      }
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  // Export functionality
  const handleExportPDF = () => {
    // Generate CSV and convert to PDF
    const csvContent = generateCSV(employees)
    downloadCSV(csvContent, `employees-${selectedYear}.csv`)
  }

  const handleExportExcel = () => {
    const csvContent = generateCSV(employees)
    downloadExcel(csvContent, `employees-${selectedYear}.xlsx`)
  }

  const handleExportCSV = () => {
    const csvContent = generateCSV(employees)
    downloadCSV(csvContent, `employees-${selectedYear}.csv`)
  }

  // CSV generation
  const generateCSV = (data: Employee[]) => {
    if (data.length === 0) return 'No data available'
    
    const headers = ['Name', 'Email', 'Position', 'Department', 'Salary', 'Hire Date', 'Status']
    const rows = data.map(emp => [
      emp.name,
      emp.email,
      emp.position,
      emp.department,
      emp.salary,
      emp.hireDate,
      emp.status
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    return csvContent
  }

  // Download CSV
  const downloadCSV = (csvContent: string, filename: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Download Excel (simplified - using CSV format, can be enhanced with xlsx library)
  const downloadExcel = (csvContent: string, filename: string) => {
    const element = document.createElement('a')
    const excelContent = `data:application/vnd.ms-excel;charset=utf-8,${encodeURIComponent(csvContent)}`
    element.setAttribute('href', excelContent)
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <>
      {/* Main Header Bar */}
      <div className="top-header-bar">
        <Container fluid className="px-3 px-md-4">
          <Row className="align-items-center py-3">
            {/* Search Bar */}
            <Col xs={12} sm={6} md={4} className="mb-3 mb-sm-0">
              <div className="search-wrapper position-relative">
                <IconifyIcon icon="lucide:search" width={18} height={18} className="search-icon" />
                <Form.Control
                  type="text"
                  placeholder="Search employees, departments..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowSearchResults(true)}
                  className="search-input"
                />
                <kbd className="search-shortcut">CTRL + /</kbd>

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="search-results-dropdown position-absolute top-100 start-0 w-100 bg-white rounded shadow-lg border mt-2 z-50">
                    <div className="p-2" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {searchResults.map((emp) => (
                        <div
                          key={emp.id}
                          className="px-3 py-2 cursor-pointer hover:bg-light rounded d-flex justify-content-between align-items-center"
                          onClick={() => handleSearchResultClick(emp)}
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={(e) => e.currentTarget.classList.add('bg-light')}
                          onMouseLeave={(e) => e.currentTarget.classList.remove('bg-light')}
                        >
                          <div>
                            <p className="mb-1 fw-medium">{emp.name}</p>
                            <small className="text-muted">{emp.position} • {emp.department}</small>
                          </div>
                          <IconifyIcon icon="lucide:arrow-right" width={16} height={16} className="text-muted" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </Col>

            {/* Right Section */}
            <Col xs={12} sm={6} md={8}>
              <Row className="align-items-center justify-content-end gap-2 gap-md-3">
                {/* Grid Icon - Apps launcher */}
                <Col xs="auto">
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="header-btn"
                    title="Applications"
                    onClick={() => console.log('Apps launcher')}
                  >
                    <IconifyIcon icon="lucide:grid-3x3" width={20} height={20} />
                  </Button>
                </Col>

                {/* Settings Icon */}
                <Col xs="auto">
                  <Button 
                    variant="light" 
                    size="sm" 
                    className="header-btn"
                    title="System Settings"
                    onClick={() => navigate('/dashboards/setting')}
                  >
                    <IconifyIcon icon="lucide:settings" width={20} height={20} />
                  </Button>
                </Col>

                {/* Notifications Dropdown */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="header-btn position-relative" id="notifications">
                      <IconifyIcon icon="lucide:bell" width={20} height={20} />
                      {unreadCount > 0 && (
                        <Badge bg="danger" className="notification-badge">{unreadCount}</Badge>
                      )}
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="notifications-menu">
                      <Dropdown.Header>
                        <div className="d-flex justify-content-between align-items-center w-100">
                          <span>Notifications</span>
                          {unreadCount > 0 && (
                            <Button 
                              variant="link" 
                              size="sm" 
                              className="p-0 text-primary"
                              onClick={handleClearAll}
                            >
                              Mark all as read
                            </Button>
                          )}
                        </div>
                      </Dropdown.Header>
                      <Dropdown.Divider />
                      {notifications.length > 0 ? (
                        <>
                          {notifications.map((notification) => (
                            <Dropdown.Item
                              key={notification.id}
                              onClick={() => handleNotificationClick(notification.id)}
                              className={`notification-item ${!notification.read ? 'unread' : ''}`}
                            >
                              <div className="d-flex gap-2">
                                <IconifyIcon
                                  icon={notification.type === 'success' ? 'lucide:check-circle' : 'lucide:info'}
                                  width={16}
                                  height={16}
                                  className={notification.type === 'success' ? 'text-success' : 'text-info'}
                                />
                                <span className="notification-text">{notification.message}</span>
                              </div>
                            </Dropdown.Item>
                          ))}
                          <Dropdown.Divider />
                          <Dropdown.Item href="#" className="text-center text-primary small">
                            View All Notifications
                          </Dropdown.Item>
                        </>
                      ) : (
                        <Dropdown.Item disabled className="text-center text-muted small">
                          No new notifications
                        </Dropdown.Item>
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Export Dropdown */}
                <Col xs="auto" className="d-none d-md-block">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="header-btn d-flex align-items-center gap-2">
                      <IconifyIcon icon="lucide:download" width={16} height={16} />
                      <span>Export</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      <Dropdown.Item 
                        onClick={handleExportPDF}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:file-pdf" width={16} height={16} />
                        Export as PDF
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={handleExportExcel}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:file-spreadsheet" width={16} height={16} />
                        Export as Excel
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={handleExportCSV}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:file-csv" width={16} height={16} />
                        Export as CSV
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Year Selector */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="header-btn d-flex align-items-center gap-2">
                      <IconifyIcon icon="lucide:calendar" width={16} height={16} />
                      <span>{selectedYear}</span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end">
                      {years.map((year) => (
                        <Dropdown.Item
                          key={year}
                          onClick={() => setSelectedYear(year)}
                          className={selectedYear === year ? 'active' : ''}
                        >
                          {year}
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>

                {/* Profile Avatar Dropdown */}
                <Col xs="auto">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm" className="header-btn p-0" id="profile">
                      <div className="profile-avatar">
                        <img
                          src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || user?.email}&background=random&color=fff`}
                          alt="Profile"
                          className="avatar-img"
                        />
                      </div>
                    </Dropdown.Toggle>

                    <Dropdown.Menu align="end" className="profile-menu">
                      <Dropdown.Header>{user?.displayName || 'User'}</Dropdown.Header>
                      <Dropdown.Item disabled className="text-muted small">{user?.email}</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item 
                        onClick={() => navigate('/dashboards/employees')}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:user" width={16} height={16} />
                        My Profile
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={() => navigate('/dashboards/setting')}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:settings" width={16} height={16} />
                        Account Settings
                      </Dropdown.Item>
                      <Dropdown.Item 
                        onClick={() => window.open('https://support.example.com', '_blank')}
                        className="d-flex align-items-center gap-2"
                      >
                        <IconifyIcon icon="lucide:help-circle" width={16} height={16} />
                        Help & Support
                      </Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item 
                        onClick={handleLogout}
                        className="d-flex align-items-center gap-2 text-danger"
                      >
                        <IconifyIcon icon="lucide:log-out" width={16} height={16} />
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>

      {/* Notification Alert */}
      {notifications.some(n => !n.read) && (
        <div className="notification-alert">
          <Container fluid className="px-3 px-md-4 py-2">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center gap-2">
                <IconifyIcon icon="lucide:check-circle" width={20} height={20} className="text-success" />
                <span className="notification-alert-text">
                  {notifications.find(n => !n.read)?.message}
                </span>
              </div>
              <Button
                variant="link"
                size="sm"
                className="p-0"
                onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
              >
                <IconifyIcon icon="lucide:x" width={18} height={18} />
              </Button>
            </div>
          </Container>
        </div>
      )}
    </>
  )
}

export default TopHeaderBar

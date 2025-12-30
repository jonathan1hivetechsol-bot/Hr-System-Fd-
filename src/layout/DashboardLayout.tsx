import Sidebar from '@/components/layout/Sidebar'
import TopHeaderBar from '@/components/layout/TopHeaderBar'
import ScrollToTop from '@/components/ScrollToTop'
import { Suspense, type ReactNode, useState } from 'react'
import { Button } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import './DashboardLayout.css'

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleCloseSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <ErrorBoundary>
      <div className="dashboard-container">
        {/* Top Header Bar - Sticky at top */}
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1025 }}>
          <Suspense fallback={<div />}>
            <TopHeaderBar />
          </Suspense>
        </div>

        {/* Sidebar - Fixed on desktop, overlay on mobile */}
        <div
          className="dashboard-sidebar"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '280px',
            height: '100vh',
            transition: 'all 0.3s ease',
          }}
        >
          <Suspense fallback={<div />}>
            <Sidebar isOpen={sidebarOpen} onClose={handleCloseSidebar} />
          </Suspense>
        </div>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="dashboard-overlay d-lg-none"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1020,
            }}
            onClick={handleCloseSidebar}
          />
        )}

        {/* Main Content Area */}
        <main
          className="dashboard-main"
          style={{
            marginLeft: 0,
            marginTop: '65px',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            transition: 'margin-left 0.3s ease',
            width: '100%',
          }}
        >
          {/* Mobile Header for Sidebar Toggle */}
          <div className="mobile-header d-lg-none">
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="d-flex align-items-center flex-shrink-0"
              style={{ width: '36px', height: '36px', padding: 0 }}
            >
              <IconifyIcon icon={sidebarOpen ? 'lucide:x' : 'lucide:menu'} width={20} height={20} />
            </Button>
            <h6 className="mb-0 flex-grow-1 fs-6">Future Designz HR</h6>
          </div>

          {/* Page Content */}
          <div className="page-content flex-grow-1">
            <ErrorBoundary>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
            </ErrorBoundary>
          </div>

          {/* Scroll to Top Button */}
          <Suspense fallback={<div />}>
            <ScrollToTop />
          </Suspense>
        </main>

        {/* Desktop Sidebar Margin Adjustment */}
        <style>{`
          @media (min-width: 992px) {
            .dashboard-main {
              margin-left: 280px !important;
              width: calc(100% - 280px);
              margin-top: 65px;
            }

            .mobile-header {
              display: none !important;
            }

            .dashboard-sidebar {
              position: fixed !important;
              left: 0 !important;
              top: 65px !important;
              height: calc(100vh - 65px) !important;
              overflow-y: auto;
            }
          }

          @media (max-width: 991px) {
            .dashboard-sidebar {
              position: fixed !important;
              left: ${sidebarOpen ? '0' : '-280px'} !important;
              top: 65px !important;
              height: calc(100vh - 65px) !important;
              z-index: 1021 !important;
            }
          }
        `}</style>
      </div>
    </ErrorBoundary>
  )
}

export default DashboardLayout

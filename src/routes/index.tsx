import { lazy } from 'react'
import { Navigate, type RouteProps } from 'react-router-dom'

// Auth pages
const Login = lazy(() => import('@/pages/auth/login'))
const Register = lazy(() => import('@/pages/auth/register/page'))
const ForPass = lazy(() => import('@/pages/auth/forgot-pass'))
const ConfirmAcc = lazy(() => import('@/pages/auth/confirm-account'))

// New role-based auth pages
const AdminLogin = lazy(() => import('@/pages/auth/admin-login'))
const AdminRegister = lazy(() => import('@/pages/auth/admin-register'))
const EmployeeLogin = lazy(() => import('@/pages/auth/employee-login'))
const EmployeeRegister = lazy(() => import('@/pages/auth/employee-register'))
const EmployeeProfileComplete = lazy(() => import('@/pages/auth/employee-profile-complete'))

// Dashboard pages
const Dashboard = lazy(() => import('@/pages/(dashboards)/dashboard'))
const EmployeeDashboard = lazy(() => import('@/pages/(dashboards)/dashboard/EmployeeDashboard'))
const Setting = lazy(() => import('@/pages/(dashboards)/setting'))
const Employees = lazy(() => import('@/pages/(dashboards)/employees'))
const EmployeeProfile = lazy(() => import('@/pages/(dashboards)/employees/profile'))
const HR = lazy(() => import('@/pages/(dashboards)/hr'))
const Attendance = lazy(() => import('@/pages/(dashboards)/attendance'))
const Leave = lazy(() => import('@/pages/(dashboards)/leave'))
const Payroll = lazy(() => import('@/pages/(dashboards)/payroll'))
const Chat = lazy(() => import('@/pages/(dashboards)/chat'))

export type RoutesProps = {
  path: RouteProps['path']
  name: string
  element: RouteProps['element']
  exact?: boolean
}

const initialRoutes: RoutesProps[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/auth/employee-login" />,
  },
]

export const authRoutes: RoutesProps[] = [
  // Original auth routes
  {
    path: '/auth/login',
    name: 'Sign In',
    element: <Login />,
  },
  {
    path: '/auth/register',
    name: 'Sign Up',
    element: <Register />,
  },
  {
    path: '/auth/forgot-pass',
    name: 'Password Recovery',
    element: <ForPass />,
  },
  {
    path: '/auth/confirm-account',
    name: 'Sign In Up',
    element: <ConfirmAcc />,
  },
  
  // New role-based auth routes
  {
    path: '/auth/admin-login',
    name: 'Admin Login',
    element: <AdminLogin />,
  },
  {
    path: '/auth/admin-register',
    name: 'Admin Register',
    element: <AdminRegister />,
  },
  {
    path: '/auth/employee-login',
    name: 'Employee Login',
    element: <EmployeeLogin />,
  },
  {
    path: '/auth/employee-register',
    name: 'Employee Register',
    element: <EmployeeRegister />,
  },
  {
    path: '/auth/employee-profile-complete',
    name: 'Complete Profile',
    element: <EmployeeProfileComplete />,
  },
]

export const dashboardPages: RoutesProps[] = [
  {
    path: '/dashboards/dashboard',
    name: 'Dashboard',
    element: <Dashboard />,
  },
  {
    path: '/dashboards/dashboard/employee',
    name: 'Employee Dashboard',
    element: <EmployeeDashboard />,
  },
  {
    path: '/dashboards/employees',
    name: 'Employees',
    element: <Employees />,
  },
  {
    path: '/dashboards/employees/:id',
    name: 'Employee Profile',
    element: <EmployeeProfile />,
  },
  {
    path: '/dashboards/hr',
    name: 'HR',
    element: <HR />,
  },
  {
    path: '/dashboards/attendance',
    name: 'Attendance',
    element: <Attendance />,
  },
  {
    path: '/dashboards/leave',
    name: 'Leave',
    element: <Leave />,
  },
  {
    path: '/dashboards/payroll',
    name: 'Payroll',
    element: <Payroll />,
  },
  {
    path: '/dashboards/chat',
    name: 'Chat',
    element: <Chat />,
  },
  {
    path: '/dashboards/setting',
    name: 'Settings',
    element: <Setting />,
  },
]

export const appRoutes = [...initialRoutes, ...authRoutes]

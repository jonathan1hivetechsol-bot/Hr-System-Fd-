# Quick Start: Role-Based Authentication

## Setup in 5 Minutes

### Step 1: Start the Development Server
```bash
npm install
npm run dev
```

### Step 2: Access the Application
```
http://localhost:5173
```

### Step 3: Choose Your Path

#### For Admins
```
1. Go to: http://localhost:5173/auth/admin-register
2. Fill in your details
3. Create account
4. Access admin dashboard at /dashboards/dashboard
```

#### For Employees
```
1. Go to: http://localhost:5173/auth/employee-register
2. Complete basic registration
3. Fill in profile details (phone, position, etc.)
4. Upload profile picture
5. Access employee dashboard at /dashboards/dashboard
```

## Key Routes

### Public Routes (No Login Required)
```
/auth/admin-login          - Admin login
/auth/admin-register       - Admin registration
/auth/employee-login       - Employee login
/auth/employee-register    - Employee registration
```

### Protected Routes (Login Required)
```
/dashboards/dashboard              - Dashboard (role-based display)
/dashboards/employees              - Employee management (admin only)
/dashboards/attendance             - Attendance tracking (admin only)
/dashboards/leave                  - Leave management (admin only)
/dashboards/payroll                - Payroll management (admin only)
/dashboards/setting                - System settings (admin only)
```

## Default Test Accounts

### Admin Account
```
Email: admin@demo.com
Password: 123456
```

### Employee Account
```
Email: user@demo.com
Password: 123456
```

## Using the Hooks

### Check Current User Role
```typescript
import { useFirebase } from '@/firebase'

const MyComponent = () => {
  const { userRole, userProfile } = useFirebase()
  
  if (userRole === 'admin') {
    return <AdminPanel />
  }
  
  if (userRole === 'employee') {
    return <EmployeePanel />
  }
  
  return <LoginPage />
}
```

### Conditional Rendering by Role
```typescript
import { useFirebase } from '@/firebase'

const Component = () => {
  const { userRole } = useFirebase()
  
  return (
    <>
      {userRole === 'admin' && (
        <button>Delete Employee</button>
      )}
      {userRole === 'employee' && (
        <button>Edit My Profile</button>
      )}
    </>
  )
}
```

### Register Users
```typescript
import { useFirebase } from '@/firebase'

const RegisterForm = () => {
  const { registerAdminUser, registerEmployeeUser } = useFirebase()
  
  const handleAdminRegister = async () => {
    const result = await registerAdminUser(
      'admin@example.com',
      'password123',
      'John Admin'
    )
    if (result.success) {
      console.log('Admin registered!')
    }
  }
  
  const handleEmployeeRegister = async () => {
    const result = await registerEmployeeUser(
      'employee@example.com',
      'password123',
      'Jane Employee'
    )
    if (result.success) {
      console.log('Employee registered, redirect to profile completion')
    }
  }
}
```

## Protect Routes

### Using AdminGuard
```typescript
import { AdminGuard } from '@/components/guards/AdminGuard'
import AdminDashboard from './AdminDashboard'

export const Admin = () => (
  <AdminGuard>
    <AdminDashboard />
  </AdminGuard>
)
```

### Using EmployeeGuard
```typescript
import { EmployeeGuard } from '@/components/guards/EmployeeGuard'
import EmployeeDashboard from './EmployeeDashboard'

export const Employee = () => (
  <EmployeeGuard>
    <EmployeeDashboard />
  </EmployeeGuard>
)
```

## File Upload (Profile Pictures)

The profile picture upload is automatic during employee profile completion. The image is stored in Firebase Storage at:
```
gs://hr-system-f60dd.firebasestorage.app/employee-profiles/{userId}/profile-{userId}-{timestamp}
```

To use the profile image URL:
```typescript
const { userProfile } = useFirebase()

const ProfileImage = () => (
  <img 
    src={userProfile?.profileImage} 
    alt="Profile" 
    className="rounded-circle"
  />
)
```

## Common Tasks

### Check if User is Admin
```typescript
const { userRole } = useFirebase()
const isAdmin = userRole === 'admin'
```

### Check if User Profile is Complete
```typescript
const { userProfile } = useFirebase()
const isProfileComplete = userProfile?.profileComplete === true
```

### Get User Email
```typescript
const { userProfile, user } = useFirebase()
const email = user?.email
```

### Get User Name
```typescript
const { userProfile, user } = useFirebase()
const name = user?.displayName
```

### Logout
```typescript
import { useFirebase } from '@/firebase'
import { useNavigate } from 'react-router-dom'

const LogoutButton = () => {
  const { signOut } = useFirebase()
  const navigate = useNavigate()
  
  const handleLogout = async () => {
    await signOut()
    navigate('/auth/employee-login')
  }
  
  return <button onClick={handleLogout}>Logout</button>
}
```

## Troubleshooting

### Profile Image Not Showing?
```
1. Check Firebase Storage rules allow read access
2. Check image URL exists in Firestore
3. Check browser DevTools Network tab for 403 errors
4. Verify user ID matches storage path
```

### Can't Login?
```
1. Verify email and password are correct
2. Check that user document exists in Firestore
3. Verify role field is set ('admin' or 'employee')
4. Check browser console for error messages
```

### Redirect Not Working?
```
1. Check that AuthGuard is wrapping dashboard routes
2. Verify FirebaseProvider wraps entire app
3. Check userRole is set after login
4. Look for guard conditions that might conflict
```

### Profile Completion Page Not Showing?
```
1. Check profileComplete flag is false after registration
2. Verify employee document created in Firestore
3. Check EmployeeProfileGuard is in place
4. Clear localStorage and refresh
```

## Documentation

- 📖 [Full Implementation Guide](./ROLE_BASED_AUTH_GUIDE.md)
- 🧪 [Testing Guide](./TESTING_GUIDE.md)
- 🔐 [Firebase Setup Guide](./FIREBASE_SETUP_GUIDE.md)
- 📋 [Implementation Summary](./IMPLEMENTATION_SUMMARY.md)

## Next Steps

1. ✅ Test both admin and employee registration
2. ✅ Test login flows
3. ✅ Verify access controls work
4. ✅ Configure Firebase Security Rules
5. ✅ Set up profile picture uploads
6. ✅ Deploy to production

## Need Help?

- Check the [ROLE_BASED_AUTH_GUIDE.md](./ROLE_BASED_AUTH_GUIDE.md) for detailed docs
- Review the [TESTING_GUIDE.md](./TESTING_GUIDE.md) for test scenarios
- See [FIREBASE_SETUP_GUIDE.md](./FIREBASE_SETUP_GUIDE.md) for Firebase configuration

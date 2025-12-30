# Role-Based Authentication System - Implementation Guide

## Overview

This HR management system now includes a comprehensive role-based authentication system with two user types:
- **Admin**: Full system access, can manage employees, payroll, attendance, leaves, etc.
- **Employee**: Limited access to their own dashboard, profile, and team communication

## System Features

### 1. Separate Login/Registration Flows

#### Admin Flow
- **Login**: `/auth/admin-login`
- **Register**: `/auth/admin-register`
- Full access to all admin features immediately after login

#### Employee Flow
- **Login**: `/auth/employee-login`
- **Register**: `/auth/employee-register`
- **Profile Completion**: `/auth/employee-profile-complete` (mandatory after signup)
- Redirected to complete profile before accessing dashboard

### 2. Employee Profile Completion

After employee registration, users are directed to complete their profile with:
- Personal Information (phone, address, date of birth)
- Professional Information (position, department, designations)
- Profile Picture Upload (with preview and progress tracking)

Admin fills in:
- Salary/Wages
- Employment dates
- Other admin-specific data

### 3. Access Control

#### Admin Access
```
- Complete dashboard management
- Employee management (/dashboards/employees)
- Attendance tracking (/dashboards/attendance)
- Leave management (/dashboards/leave)
- Payroll management (/dashboards/payroll)
- System settings (/dashboards/setting)
```

#### Employee Access
```
- Personal dashboard (/dashboards/dashboard)
- Personal profile view only
- Limited to own data (not other employees)
- Team chat (future implementation)
```

## File Structure

### New Authentication Files

```
src/pages/auth/
├── admin-login/
│   ├── components/
│   │   ├── AdminLoginForm.tsx
│   │   └── useAdminSignIn.tsx
│   └── index.tsx
├── admin-register/
│   ├── components/
│   │   ├── AdminRegisterForm.tsx
│   │   └── useAdminRegister.tsx
│   └── index.tsx
├── employee-login/
│   ├── components/
│   │   ├── EmployeeLoginForm.tsx
│   │   └── useEmployeeSignIn.tsx
│   └── index.tsx
├── employee-register/
│   ├── components/
│   │   ├── EmployeeRegisterForm.tsx
│   │   └── useEmployeeRegister.tsx
│   └── index.tsx
└── employee-profile-complete/
    ├── useEmployeeProfileComplete.tsx
    └── index.tsx
```

### Updated Components

```
src/components/guards/
├── AdminGuard.tsx         (NEW)
├── EmployeeGuard.tsx      (NEW)
├── EmployeeProfileGuard.tsx (NEW)
└── AuthGuard.tsx          (UPDATED)
```

### Firebase Updates

```
src/firebase/
├── firebaseUtils.ts       (UPDATED with role-based functions)
└── FirebaseContext.tsx    (UPDATED with userRole & userProfile)
```

### Types

```
src/types/
├── auth.ts                (UPDATED with UserRole type)
└── employee.ts            (UPDATED with profile fields)
```

## Database Schema

### Firestore Collections

#### `users` collection (for admins)
```json
{
  "name": "string",
  "email": "string",
  "role": "admin",
  "userId": "string (Firebase Auth UID)",
  "profileComplete": true,
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

#### `employees` collection (for employees)
```json
{
  "name": "string",
  "email": "string",
  "role": "employee",
  "userId": "string (Firebase Auth UID)",
  "position": "string",
  "department": "string",
  "salary": "number",
  "hireDate": "string (YYYY-MM-DD)",
  "status": "active|inactive",
  "phone": "string",
  "address": "string",
  "dateOfBirth": "string",
  "designations": "string",
  "profileImage": "string (Firebase Storage URL)",
  "profileComplete": "boolean",
  "createdAt": "timestamp",
  "updatedAt": "timestamp"
}
```

## API Functions

### Firebase Utils Functions

#### Authentication
```typescript
// Admin Registration
registerAdmin(email: string, password: string, displayName: string): Promise<FirebaseResult>

// Employee Registration
registerEmployee(email: string, password: string, displayName: string): Promise<FirebaseResult>

// Get User Role
getUserRole(userId: string): Promise<FirebaseResult>

// Login (same for both roles)
loginUser(email: string, password: string): Promise<FirebaseResult>

// Logout
logoutUser(): Promise<FirebaseResult>
```

### Firebase Context Methods

```typescript
// New methods in useFirebase() hook
registerAdminUser(email, password, displayName)
registerEmployeeUser(email, password, displayName)

// Existing methods (updated)
signIn(email, password)
signOut()
```

## Usage Examples

### Using Admin Guard
```typescript
import { AdminGuard } from '@/components/guards/AdminGuard'

<AdminGuard>
  <AdminOnlyPage />
</AdminGuard>
```

### Using Employee Guard
```typescript
import { EmployeeGuard } from '@/components/guards/EmployeeGuard'

<EmployeeGuard>
  <EmployeeOnlyPage />
</EmployeeGuard>
```

### Using Firebase Context
```typescript
import { useFirebase } from '@/firebase'

const MyComponent = () => {
  const { userRole, userProfile, registerAdminUser, registerEmployeeUser } = useFirebase()

  // userRole: 'admin' | 'employee' | null
  // userProfile: UserProfile | null
}
```

## Route Configuration

All routes now have `/dashboards/` prefix for consistency:

```
Admin Routes:
- GET /dashboards/dashboard         (admin dashboard)
- GET /dashboards/employees         (employee list)
- GET /dashboards/employees/:id     (employee profile)
- GET /dashboards/attendance        (attendance tracking)
- GET /dashboards/leave            (leave management)
- GET /dashboards/payroll          (payroll management)
- GET /dashboards/setting          (system settings)

Employee Routes:
- GET /dashboards/dashboard        (personal dashboard)

Auth Routes:
- GET /auth/admin-login
- POST /auth/admin-login
- GET /auth/admin-register
- POST /auth/admin-register
- GET /auth/employee-login
- POST /auth/employee-login
- GET /auth/employee-register
- POST /auth/employee-register
- GET /auth/employee-profile-complete
- POST /auth/employee-profile-complete
```

## Environment Setup

1. **Firebase Storage Rules** - Allow image uploads for profile pictures:
```firestore
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /employee-profiles/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

2. **Firestore Rules** - Ensure proper role-based access:
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admins can read/write users and employees
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    match /employees/{docId} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## Migration from Old Auth

The old authentication routes still exist for backward compatibility:
- `/auth/login`
- `/auth/register`
- `/auth/forgot-pass`
- `/auth/confirm-account`

However, new users should use:
- Admin users → `/auth/admin-login`
- Employees → `/auth/employee-login`

## Testing Credentials

### For Development Testing

**Admin Account:**
- Email: `admin@demo.com`
- Password: `123456`

**Employee Account:**
- Email: `user@demo.com`
- Password: `123456`

## Future Enhancements

1. **Team Chat**: Implement real-time messaging between employees
2. **Notifications**: Email and in-app notifications for approvals
3. **Role-Based Middleware**: Implement dashboard-level permission checks
4. **Employee Visibility**: Configure which employees can see which employees' data
5. **Salary Privacy**: Ensure only admin can view payroll data
6. **Audit Logs**: Track all admin actions

## Troubleshooting

### Profile Not Completing
- Check Firebase Storage rules allow uploads for the user's UID
- Ensure `employee-profiles/{userId}` path exists in Storage
- Verify image file size < 5MB

### Role Not Loading
- Clear browser localStorage: `localStorage.clear()`
- Refresh the page to reload user context
- Check Firestore that user document has correct `role` field

### Can't Redirect After Registration
- Check that `FirebaseContext` is wrapping your app
- Verify async operations complete before redirect
- Check browser console for errors

## Support

For issues or questions about the role-based authentication system, refer to:
1. Firebase documentation: https://firebase.google.com/docs
2. React Router documentation: https://reactrouter.com
3. Project README: See FUNCTIONALITY_CHECKLIST.md

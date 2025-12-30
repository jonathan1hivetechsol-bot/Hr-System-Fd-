# Integration Testing Guide

## Quick Test Checklist

### 1. Admin Registration Flow
```
1. Navigate to: http://localhost:5173/auth/admin-register
2. Fill in:
   - First Name: "John"
   - Last Name: "Admin"
   - Email: "john.admin@test.com"
   - Password: "Test@1234"
   - Confirm Password: "Test@1234"
3. Click "Register as Admin"
4. Expected: Redirected to /dashboards/dashboard
5. Check: User should have admin role in context
```

### 2. Employee Registration & Profile Completion Flow
```
1. Navigate to: http://localhost:5173/auth/employee-register
2. Fill in basic info:
   - First Name: "Jane"
   - Last Name: "Employee"
   - Email: "jane.emp@test.com"
   - Password: "Test@1234"
   - Confirm Password: "Test@1234"
3. Click "Sign Up"
4. Expected: Redirected to /auth/employee-profile-complete
5. Fill in profile:
   - Phone: "+92 300 1234567"
   - Address: "123 Main St, City"
   - Date of Birth: "1990-01-15"
   - Position: "Software Developer"
   - Department: "Engineering"
   - Designations: "React Developer, TypeScript"
   - Upload Profile Picture
6. Click "Complete Profile & Continue"
7. Expected: Redirected to /dashboards/dashboard
8. Check: profileComplete should be true
```

### 3. Admin Login
```
1. Navigate to: http://localhost:5173/auth/admin-login
2. Login with:
   - Email: "john.admin@test.com"
   - Password: "Test@1234"
3. Click "Log In as Admin"
4. Expected: Redirected to /dashboards/dashboard
5. Check: userRole === 'admin' in context
```

### 4. Employee Login
```
1. Navigate to: http://localhost:5173/auth/employee-login
2. Login with:
   - Email: "jane.emp@test.com"
   - Password: "Test@1234"
3. Click "Log In"
4. Expected: If profileComplete = true, go to /dashboards/dashboard
           If profileComplete = false, go to /auth/employee-profile-complete
5. Check: userRole === 'employee' in context
```

### 5. Access Control Tests

#### Admin Access Tests
```
✓ Admin can access /dashboards/dashboard
✓ Admin can access /dashboards/employees
✓ Admin can access /dashboards/attendance
✓ Admin can access /dashboards/leave
✓ Admin can access /dashboards/payroll
✓ Admin can access /dashboards/setting
```

#### Employee Access Tests
```
✓ Employee can access /dashboards/dashboard
✓ Employee redirected from /dashboards/employees
✓ Employee redirected from /dashboards/attendance
✓ Employee redirected from /dashboards/leave
✓ Employee redirected from /dashboards/payroll
✓ Employee redirected from /dashboards/setting
```

### 6. Profile Picture Upload Test
```
1. Register as new employee
2. On profile completion page:
   - Click file input
   - Select an image (< 5MB)
   - Verify preview shows
   - Upload should show progress
   - Check Firestore: profileImage URL should be stored
   - Check Firebase Storage: Image should exist at
     /employee-profiles/{userId}/profile-{userId}-{timestamp}
```

### 7. Data Privacy Tests
```
Employee cannot access:
✓ Other employees' phone numbers
✓ Other employees' addresses
✓ Other employees' salary information
✓ Admin settings page
✓ Payroll data
✓ Attendance records (if restricted)

Admin can access:
✓ All employee information
✓ Salary/payroll data
✓ All settings
✓ System configuration
```

### 8. Context Tests
```
Check useFirebase() hook:
✓ user (Firebase Auth user)
✓ userRole ('admin' | 'employee' | null)
✓ userProfile (UserProfile | null)
✓ loading (boolean)
✓ registerAdminUser function exists
✓ registerEmployeeUser function exists
✓ signIn function exists
✓ signOut function exists
```

### 9. Firebase Console Checks
```
Firestore Collections:
✓ Check 'users' collection has admin documents
✓ Check 'employees' collection has employee documents
✓ Verify role field is set correctly
✓ Verify profileComplete field updates after profile completion

Firebase Storage:
✓ Check employee-profiles folder exists
✓ Verify profile images are stored with correct naming
✓ Verify URLs are accessible

Firebase Auth:
✓ Check both admin and employee accounts exist
✓ Verify UIDs match in Firestore documents
```

### 10. Error Handling Tests
```
✓ Invalid email format shows error
✓ Password < 6 characters shows error
✓ Passwords don't match shows error
✓ Duplicate email shows Firebase error
✓ Network errors handled gracefully
✓ Profile image > 5MB shows error
✓ Failed uploads handled properly
```

## Browser Console Checks
```
No errors on:
✓ /auth/admin-login
✓ /auth/admin-register
✓ /auth/employee-login
✓ /auth/employee-register
✓ /auth/employee-profile-complete
✓ /dashboards/dashboard (when logged in)
```

## Performance Tests
```
✓ Admin login completes within 2 seconds
✓ Employee registration completes within 2 seconds
✓ Profile picture upload shows progress
✓ Page transitions are smooth
✓ No memory leaks on logout and login
```

## Mobile Responsiveness
```
✓ Login forms work on mobile
✓ Registration forms work on mobile
✓ Profile completion form works on mobile
✓ Images upload properly on mobile
✓ Touch events work correctly
```

## Notes
- Clear localStorage between tests: `localStorage.clear()`
- Clear browser cache if having issues
- Check network tab in DevTools for requests
- Monitor Firestore for real-time document creation
- Check Storage tab for uploaded images

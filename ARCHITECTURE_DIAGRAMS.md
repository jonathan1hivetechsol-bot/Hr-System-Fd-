# System Architecture & Flow Diagrams

## 1. User Registration & Authentication Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOWS                        │
└─────────────────────────────────────────────────────────────┘

ADMIN FLOW:
─────────
┌──────────────┐
│ /auth/admin- │
│  register    │
└──────┬───────┘
       │ Fill details
       ▼
┌──────────────────┐
│ AdminRegisterForm│
│                  │
│ Name, Email, Pwd │
└──────┬───────────┘
       │ Submit
       ▼
┌─────────────────────┐
│ registerAdminUser() │ (Firebase)
│ - Create Auth User  │
│ - Create /users doc │
│ - Set role: 'admin' │
└──────┬──────────────┘
       │ Success
       ▼
┌──────────────────┐
│ /dashboards/     │
│  dashboard       │
│ (Admin Access)   │
└──────────────────┘

EMPLOYEE FLOW:
──────────────
┌──────────────┐
│ /auth/       │
│ employee-    │
│ register     │
└──────┬───────┘
       │ Fill basic info
       ▼
┌──────────────────────┐
│EmployeeRegisterForm  │
│                      │
│ Name, Email, Pwd     │
└──────┬───────────────┘
       │ Submit
       ▼
┌──────────────────────┐
│registerEmployeeUser()│ (Firebase)
│ - Create Auth User   │
│ - Create /employees  │
│ - Set profileComplete│
│   : false            │
└──────┬───────────────┘
       │ Success
       ▼
┌──────────────────────┐
│ /auth/employee-      │
│ profile-complete     │
│                      │
│ Fill profile details │
│ Upload photo         │
└──────┬───────────────┘
       │ Submit
       ▼
┌────────────────────┐
│ Firebase Storage   │
│ /employee-profiles/│
│ {userId}/photo.jpg │
└──────┬─────────────┘
       │ Success
       ▼
┌──────────────────┐
│ /dashboards/     │
│ dashboard        │
│ (Employee Access)│
└──────────────────┘
```

## 2. Login Flow (Both Roles)

```
┌──────────────────────────────────────────────┐
│            LOGIN FLOW (Both Roles)           │
└──────────────────────────────────────────────┘

START
  │
  ├─► /auth/admin-login ───┐
  │                         │
  └─► /auth/employee-login ─┤
                             │
                             ▼
                    ┌────────────────┐
                    │ Email & Password│
                    │ Entry           │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │ loginUser()     │ (Firebase Auth)
                    │ signInWithEmail │
                    └────────┬────────┘
                             │
                    ┌────────┴────────┐
                    │                 │
              Success             Fail
                    │                 │
                    ▼                 ▼
            ┌───────────────┐  ┌─────────────┐
            │ getUserRole() │  │Error Message│
            │ Query Firestore
            └───────┬───────┘  └─────────────┘
                    │
         ┌──────────┴──────────┐
         │                     │
     role='admin'         role='employee'
         │                     │
         ▼                     ▼
  ┌──────────────┐      ┌──────────────────┐
  │ Redirect to: │      │ profileComplete? │
  │/dashboards/  │      └────────┬─────────┘
  │ dashboard    │               │
  │(Full Admin   │      ┌────────┴─────────┐
  │ Access)      │      │                  │
  └──────────────┘    true              false
                       │                  │
                       ▼                  ▼
                  ┌──────────┐      ┌─────────────────┐
                  │Dashboard │      │/auth/employee-  │
                  │(Employee)│      │profile-complete │
                  └──────────┘      └─────────────────┘
```

## 3. Access Control & Route Protection

```
┌─────────────────────────────────────────────────────────┐
│           ROUTE PROTECTION & GUARDS                      │
└─────────────────────────────────────────────────────────┘

DASHBOARD ROUTES:
                    AuthGuard
                        │
        ┌───────────────┴───────────────┐
        │                               │
      Logged?                        No ─► /auth/employee-login
        │
      Yes
        │
        ▼
    Check Role
        │
    ┌───┴────┐
    │         │
  admin   employee
    │         │
    ▼         ▼
  Allow   profileComplete?
    │         │
    │     ┌───┴───┐
    │     │       │
    │   Yes     No
    │    │        │
    │    ▼        ▼
    │  Allow  /auth/employee-
    │         profile-complete
    │
    └─────────┬───────────┘
              │
              ▼
        ┌──────────────────┐
        │ Render Component │
        │ (Dashboard)      │
        └──────────────────┘

ADMIN-ONLY ROUTES:
                AdminGuard
                    │
        ┌───────────┴───────────┐
        │                       │
    Admin?                     No ─► /auth/admin-login
        │
      Yes
        │
        ▼
    Allow Access

EMPLOYEE-ONLY ROUTES:
              EmployeeGuard
                   │
        ┌──────────┴──────────┐
        │                     │
    Employee?               No ─► /auth/employee-login
        │
      Yes
        │
        ▼
    Allow Access
```

## 4. Data Model Architecture

```
┌──────────────────────────────────────────────────────┐
│            FIRESTORE DATA STRUCTURE                   │
└──────────────────────────────────────────────────────┘

FIREBASE AUTH:
  └─ {uid}
     ├─ email
     ├─ password (hashed)
     └─ displayName

FIRESTORE:

/users (ADMINS)
  └─ {uid}
     ├─ name
     ├─ email
     ├─ role: "admin"
     ├─ userId: {uid}
     ├─ profileComplete: true
     ├─ createdAt
     └─ updatedAt

/employees (EMPLOYEES)
  └─ {documentId}
     ├─ name
     ├─ email
     ├─ role: "employee"
     ├─ userId: {uid}
     ├─ position
     ├─ department
     ├─ salary: 0 (admin fills)
     ├─ phone (employee fills)
     ├─ address (employee fills)
     ├─ dateOfBirth (employee fills)
     ├─ designations (employee fills)
     ├─ profileImage: "gs://.../{image_url}"
     ├─ profileComplete: true/false
     ├─ createdAt
     └─ updatedAt

FIREBASE STORAGE:
  └─ employee-profiles/
     └─ {userId}/
        └─ profile-{userId}-{timestamp}.jpg
```

## 5. Context & State Management

```
┌────────────────────────────────────────┐
│      FIREBASE CONTEXT STATE            │
└────────────────────────────────────────┘

FirebaseContext
  │
  ├─ user: User | null
  │  └─ Firebase Auth User object
  │
  ├─ userRole: 'admin' | 'employee' | null
  │  └─ Fetched from Firestore on auth state change
  │
  ├─ userProfile: UserProfile | null
  │  ├─ id: string
  │  ├─ email: string
  │  ├─ name: string
  │  ├─ role: UserRole
  │  ├─ profileComplete?: boolean
  │  ├─ phone?: string
  │  ├─ address?: string
  │  ├─ dateOfBirth?: string
  │  ├─ position?: string
  │  ├─ department?: string
  │  ├─ salary?: number
  │  ├─ designations?: string
  │  ├─ profileImage?: string
  │  └─ [key]: unknown
  │
  ├─ loading: boolean
  │  └─ True during auth state check
  │
  └─ Methods:
     ├─ signIn(email, password)
     ├─ signOut()
     ├─ registerAdminUser(email, password, name)
     └─ registerEmployeeUser(email, password, name)
```

## 6. Component & Hook Hierarchy

```
┌────────────────────────────────────────┐
│       COMPONENT HIERARCHY              │
└────────────────────────────────────────┘

App
  │
  └─ FirebaseProvider
     │
     ├─ AppProvidersWrapper
     │  │
     │  ├─ Routes
     │  │  │
     │  │  ├─ Auth Routes (No Layout)
     │  │  │  ├─ /auth/admin-login
     │  │  │  │  └─ AdminLoginForm
     │  │  │  │     └─ useAdminSignIn()
     │  │  │  │
     │  │  │  ├─ /auth/admin-register
     │  │  │  │  └─ AdminRegisterForm
     │  │  │  │     └─ useAdminRegister()
     │  │  │  │
     │  │  │  ├─ /auth/employee-login
     │  │  │  │  └─ EmployeeLoginForm
     │  │  │  │     └─ useEmployeeSignIn()
     │  │  │  │
     │  │  │  ├─ /auth/employee-register
     │  │  │  │  └─ EmployeeRegisterForm
     │  │  │  │     └─ useEmployeeRegister()
     │  │  │  │
     │  │  │  └─ /auth/employee-profile-complete
     │  │  │     └─ useEmployeeProfileComplete()
     │  │  │
     │  │  └─ Dashboard Routes (With Layout)
     │  │     │
     │  │     ├─ AuthGuard
     │  │     │  │
     │  │     │  └─ DashboardLayout
     │  │     │     └─ Dashboard Components
     │  │     │
     │  │     ├─ AdminGuard
     │  │     │  └─ Admin-Only Components
     │  │     │
     │  │     └─ EmployeeGuard
     │  │        └─ Employee-Only Components
     │  │
     │  └─ useFirebase() [Available anywhere]
     │     └─ {user, userRole, userProfile, methods...}
```

## 7. Data Flow: Employee Registration to Profile Completion

```
┌──────────────────────────────────────────────────────────┐
│  DATA FLOW: Employee Registration & Profile Completion  │
└──────────────────────────────────────────────────────────┘

USER INPUT (Form)
       │
       ▼
┌─────────────────────┐
│ EmployeeRegisterForm│
│                     │
│ firstName           │
│ lastName            │
│ email               │
│ password            │
└──────┬──────────────┘
       │
       ▼
┌──────────────────────┐
│ useEmployeeRegister()│
│ - Validate form      │
│ - Call API           │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────┐
│registerEmployeeUser()│
│ (firebaseUtils.ts)   │
│                      │
│ - createUserWithEmail│
│ - updateProfile()    │
│ - addDocument()      │
└──────┬───────────────┘
       │
       ├─────────────────────────────────────┐
       │                                     │
       ▼                                     ▼
FIREBASE AUTH            FIRESTORE /employees
User created             {
  uid: "xxx"               name: "John Doe",
  email: "j@test.com"      email: "j@test.com",
  displayName: "John Doe"  role: "employee",
                           userId: "xxx",
                           profileComplete: false,
                           createdAt: timestamp
                         }
       │                                     │
       └──────────────────┬──────────────────┘
                          │
                          ▼
                  REDIRECT TO
           /auth/employee-profile-complete
                          │
                          ▼
                ┌─────────────────────┐
                │Profile Completion   │
                │Form                 │
                │                     │
                │ phone               │
                │ address             │
                │ dateOfBirth         │
                │ position            │
                │ department          │
                │ designations        │
                │ profileImage        │
                └──────┬──────────────┘
                       │
                       ▼
         ┌──────────────────────────┐
         │useEmployeeProfileComplete│
         │ - Validate               │
         │ - Upload image to Storage│
         │ - Update Firestore doc   │
         └──────┬───────────────────┘
                │
      ┌─────────┴─────────┐
      │                   │
      ▼                   ▼
STORAGE            FIRESTORE /employees
gs://...../         Updated:
{userId}/           - phone: "+92300..."
profile-xxx.jpg     - address: "..."
                    - dateOfBirth: "..."
                    - position: "..."
                    - department: "..."
                    - designations: "..."
                    - profileImage: "gs://..."
                    - profileComplete: true
                    - updatedAt: timestamp
                    │
                    ├─────────────────────────┐
                    │                         │
                    └────────────┬────────────┘
                                 │
                                 ▼
                         REDIRECT TO
                     /dashboards/dashboard
                    (Employee Dashboard)
```

## 8. Permission Matrix

```
┌────────────────────────────────────────────────────────┐
│              PERMISSION MATRIX                         │
└────────────────────────────────────────────────────────┘

ROUTE               │ ADMIN │ EMPLOYEE │ GUEST
────────────────────┼───────┼──────────┼──────
/auth/admin-login   │  ✓    │   ✓      │  ✓
/auth/admin-register│  ✓    │   ✓      │  ✓
/auth/employee-login│  ✓    │   ✓      │  ✓
/auth/employee-reg..│  ✓    │   ✓      │  ✓
/auth/employee-prof│  ✗    │   ✓      │  ✗
────────────────────┼───────┼──────────┼──────
/dashboards/        │  ✓    │   ✓      │  ✗
dashboard           │  (All)│  (Own)   │ Redir
/dashboards/        │  ✓    │   ✗      │  ✗
employees           │ (All) │ Redirect │ Redir
/dashboards/        │  ✓    │   ✗      │  ✗
attendance          │ (All) │ Redirect │ Redir
/dashboards/        │  ✓    │   ✗      │  ✗
leave               │ (All) │ Redirect │ Redir
/dashboards/        │  ✓    │   ✗      │  ✗
payroll             │ (All) │ Redirect │ Redir
/dashboards/        │  ✓    │   ✗      │  ✗
setting             │ (All) │ Redirect │ Redir

DATA ACCESS:
────────────────────┼───────┼──────────┼──────
All employees data  │  ✓    │   ✗      │  ✗
Own data only       │  ✓    │   ✓      │  ✗
Payroll/salary      │  ✓    │   ✗      │  ✗
Own profile pic     │  ✓    │   ✓      │  ✗
Other's profile pic │  ✓    │   ✗      │  ✗
System settings     │  ✓    │   ✗      │  ✗
```

## 9. Error Handling Flow

```
┌─────────────────────────────────────────┐
│       ERROR HANDLING FLOW               │
└─────────────────────────────────────────┘

USER ACTION
  │
  ▼
VALIDATION
  │
  ├─ Valid: Continue
  │
  └─ Invalid: Show error
     ├─ Email format error
     ├─ Password too short
     ├─ Fields required
     ├─ Passwords don't match
     └─ Image too large

API CALL
  │
  ├─ Success: Continue
  │
  └─ Error:
     ├─ Firebase Auth errors:
     │  ├─ auth/email-already-in-use
     │  ├─ auth/weak-password
     │  ├─ auth/invalid-email
     │  └─ auth/user-not-found
     │
     ├─ Firestore errors:
     │  ├─ permission-denied
     │  ├─ not-found
     │  └─ failed-precondition
     │
     ├─ Storage errors:
     │  ├─ unauthorized
     │  ├─ unknown (file too large)
     │  └─ invalid-argument
     │
     └─ Network errors:
        ├─ Connection timeout
        ├─ No internet
        └─ Service unavailable

ERROR HANDLING
  │
  ├─ Log to console
  ├─ Display user message
  ├─ Clear sensitive fields
  └─ Allow retry
```

## 10. File Upload & Storage Flow

```
┌────────────────────────────────────────┐
│  PROFILE PICTURE UPLOAD FLOW           │
└────────────────────────────────────────┘

USER ACTION: Select Image
       │
       ▼
┌──────────────────┐
│ Image selected   │
│ from file input  │
└──────┬───────────┘
       │
       ▼
┌──────────────────┐
│ Validation       │
│ - Type: image/*  │
│ - Size: < 5MB    │
└──────┬───────────┘
       │
    Success
       │
       ▼
┌──────────────────────┐
│ Show Preview         │
│ (FileReader API)     │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ User submits profile form        │
└──────┬─────────────────────────────┘
       │
       ▼
┌──────────────────────────────────┐
│ uploadImage() function           │
│ - Create storage ref:            │
│   employee-profiles/{userId}/... │
│ - uploadBytesResumable()         │
│ - Track progress                 │
└──────┬─────────────────────────────┘
       │
    ┌──┴──────────────┐
    │                 │
 Success           Progress
    │                 │
    ▼                 ▼
  Get URL    ┌──────────────┐
    │        │Progress Bar  │
    │        │ Updates UI   │
    │        └──────────────┘
    │
    ▼
┌──────────────────────────────────┐
│ updateDocument() in Firestore    │
│ /employees/{docId}               │
│ - profileImage: "gs://..." (URL) │
│ - profileComplete: true          │
│ - updatedAt: timestamp           │
└──────┬─────────────────────────────┘
       │
       ▼
   SUCCESS
       │
       ▼
┌──────────────────┐
│ Redirect to      │
│ /dashboards/     │
│ dashboard        │
└──────────────────┘
```

---

## Summary Diagram

```
┌─────────────────────────────────────────────────────────┐
│           COMPLETE SYSTEM ARCHITECTURE                  │
│                                                         │
│  ┌─────────────────────────────────────────────────┐  │
│  │ Frontend (React + TypeScript)                   │  │
│  │                                                  │  │
│  │ ┌──────────────────────────────────────────┐   │  │
│  │ │ Auth Pages (Login/Register/Profile)      │   │  │
│  │ │ - useSignIn, useRegister hooks          │   │  │
│  │ │ - Form components & validation          │   │  │
│  │ └──────────────────────────────────────────┘   │  │
│  │                   ↓                             │  │
│  │ ┌──────────────────────────────────────────┐   │  │
│  │ │ Route Guards (Admin/Employee)            │   │  │
│  │ │ - Check role & profile completion       │   │  │
│  │ │ - Redirect unauthorized users           │   │  │
│  │ └──────────────────────────────────────────┘   │  │
│  │                   ↓                             │  │
│  │ ┌──────────────────────────────────────────┐   │  │
│  │ │ Dashboard Components                     │   │  │
│  │ │ - Admin dashboard                        │   │  │
│  │ │ - Employee dashboard                    │   │  │
│  │ └──────────────────────────────────────────┘   │  │
│  └─────────────────────┬───────────────────────────┘  │
│                        │                              │
│                        ↓                              │
│  ┌─────────────────────────────────────────────────┐  │
│  │ FirebaseContext (State Management)              │  │
│  │ - user, userRole, userProfile, loading         │  │
│  │ - signIn, signOut, registerAdminUser,          │  │
│  │   registerEmployeeUser                         │  │
│  └─────────────────────┬───────────────────────────┘  │
│                        │                              │
│         ┌──────────────┼──────────────┐               │
│         ↓              ↓              ↓               │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐  │
│  │ Firebase Auth│ │ Firestore    │ │Cloud Storage │  │
│  │              │ │              │ │              │  │
│  │ - Users      │ │ - /users     │ │ - Images     │  │
│  │ - Password   │ │ - /employees │ │ - URLs       │  │
│  │   hashing    │ │ - Roles      │ │ - Access     │  │
│  └──────────────┘ └──────────────┘ └──────────────┘  │
│         └──────────────┬──────────────┘               │
│                        ↓                              │
│              GOOGLE CLOUD PLATFORM                   │
│                                                      │
└─────────────────────────────────────────────────────┘
```

---

These diagrams provide a visual representation of:
1. How users flow through registration
2. How login authentication works
3. How access control is managed
4. How data is structured
5. How components are organized
6. How role-based permissions work
7. How errors are handled
8. How files are uploaded
9. The complete system architecture

Use these diagrams as reference when implementing features or explaining the system to others.

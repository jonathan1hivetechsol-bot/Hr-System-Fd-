# Firebase Integration

This project now includes Firebase integration for authentication, Firestore database, and messaging services.

## Setup

Firebase has been configured with the following services:
- **Authentication**: User login, registration, and password reset
- **Firestore**: NoSQL database for storing application data
- **Messaging**: Push notifications (VAPID key configured)

## File Structure

```
src/firebase/
├── config.ts          # Firebase configuration and initialization
├── FirebaseContext.tsx # React context provider for Firebase services
├── useFirebase.ts     # Custom hook for accessing Firebase context
└── firebaseUtils.ts   # Utility functions for Firebase operations
```

## Usage

### Using Firebase Context

```tsx
import { useFirebase } from '@/firebase/useFirebase'

const MyComponent = () => {
  const { user, loading, auth, db, messaging } = useFirebase()

  if (loading) return <div>Loading...</div>

  return (
    <div>
      {user ? `Welcome ${user.displayName}` : 'Please login'}
    </div>
  )
}
```

### Authentication Functions

```tsx
import { loginUser, registerUser, logoutUser, resetPassword } from '@/firebase/firebaseUtils'

// Login
const result = await loginUser('email@example.com', 'password')
if (result.success) {
  console.log('Logged in:', result.user)
} else {
  console.error('Login failed:', result.error)
}

// Register
const result = await registerUser('email@example.com', 'password', 'Display Name')

// Logout
await logoutUser()

// Reset password
await resetPassword('email@example.com')
```

### Firestore Operations

```tsx
import { addDocument, getDocuments, updateDocument, deleteDocument } from '@/firebase/firebaseUtils'

// Add document
const result = await addDocument('employees', {
  name: 'John Doe',
  position: 'Developer',
  salary: 50000
})

// Get documents
const result = await getDocuments('employees')
if (result.success) {
  console.log('Employees:', result.data)
}

// Update document
await updateDocument('employees', 'docId', { salary: 55000 })

// Delete document
await deleteDocument('employees', 'docId')
```

### Real-time Listeners

```tsx
import { subscribeToCollection, subscribeToDocument } from '@/firebase/firebaseUtils'

// Subscribe to collection changes
const unsubscribe = subscribeToCollection('employees', (docs) => {
  console.log('Employees updated:', docs)
})

// Subscribe to document changes
const unsubscribe = subscribeToDocument('employees', 'docId', (doc) => {
  console.log('Employee updated:', doc)
})

// Don't forget to unsubscribe when component unmounts
useEffect(() => {
  return unsubscribe
}, [])
```

## Firebase Configuration

The Firebase project is configured with:
- **Project ID**: hr-system-f60dd
- **Auth Domain**: hr-system-f60dd.firebaseapp.com
- **Database**: Firestore
- **Storage**: Firebase Storage
- **Messaging**: Enabled with VAPID key

## Security Rules

Make sure to configure appropriate Firestore security rules and Firebase Authentication settings in your Firebase console.

## Next Steps

1. Set up Firestore security rules
2. Configure Firebase Authentication providers (Email/Password is enabled)
3. Set up Firebase Cloud Messaging for push notifications
4. Create data models for your application entities
5. Implement authentication guards for protected routes

## Authentication Implementation

### Login Page
The login page now uses Firebase authentication:
- Form validation with error handling
- Loading states during authentication
- Automatic redirect to dashboard on success
- Error messages for failed login attempts

### Register Page
The registration page creates new Firebase users:
- Email/password registration
- Display name setting
- Automatic redirect to login after successful registration
- Error handling for registration failures

### Protected Routes
Dashboard routes are now protected with authentication:
- `AuthGuard` component wraps all dashboard pages
- Automatic redirect to login for unauthenticated users
- Loading spinner during authentication check

### User Profile
The header now shows authenticated user information:
- Dynamic user avatar (generated from name/email)
- User display name and email
- Logout functionality

## Testing Authentication

To test the authentication:

1. Go to `/auth/register` to create a new account
2. Go to `/auth/login` to login with your credentials
3. Access dashboard pages (should redirect to login if not authenticated)
4. Use the logout button in the header to sign out

The authentication system is now fully integrated and ready for production use!
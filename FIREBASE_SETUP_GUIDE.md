# Firebase Security Rules & Configuration

## Firestore Security Rules

Add these rules to your Firestore to ensure proper access control:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin users collection
    match /users/{userId} {
      // Users can read/write their own admin profile
      allow read, write: if request.auth.uid == userId;
      // Admins can read all user profiles
      allow read: if hasRole('admin');
    }
    
    // Employees collection
    match /employees/{employeeId} {
      // Employees can read/write their own profile
      allow read, write: if request.auth.uid == resource.data.userId;
      // Admins can read/write all employee profiles
      allow read, write: if hasRole('admin');
    }
    
    // Helper functions
    function hasRole(role) {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == role ||
             get(/databases/$(database)/documents/employees/$(request.auth.uid)).data.role == role;
    }
    
    function isAdmin() {
      return hasRole('admin');
    }
    
    function isOwner(userId) {
      return request.auth.uid == userId;
    }
  }
}
```

## Firebase Storage Security Rules

Add these rules to your Firebase Storage to enable profile picture uploads:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Employee profile pictures
    match /employee-profiles/{userId}/{allPaths=**} {
      // Employees can upload/read/write their own profile pictures
      allow read, write: if request.auth.uid == userId;
      // Admins can read all profile pictures
      allow read: if isAdmin();
    }
    
    // Helper function
    function isAdmin() {
      return firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Firebase Authentication Configuration

### Email/Password Authentication
- Already configured by default
- No additional setup needed
- Users can sign up and log in with email/password

### Optional: Google Sign-In
To add Google authentication:

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "Google"
3. Add your app's OAuth 2.0 credentials
4. Update your .env file:
```env
VITE_FIREBASE_GOOGLE_CLIENT_ID=your_google_client_id
```

### Optional: GitHub Sign-In
To add GitHub authentication:

1. Go to Firebase Console → Authentication → Sign-in method
2. Enable "GitHub"
3. Create OAuth app on GitHub
4. Add credentials to Firebase

## Environment Variables

Create `.env` file in project root (if not exists):

```env
# Firebase Configuration (already set in firebase/config.ts)
VITE_FIREBASE_API_KEY=AIzaSyAsVP2ylJa8qR436hh9qsRIyeZDz4696nk
VITE_FIREBASE_AUTH_DOMAIN=hr-system-f60dd.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=hr-system-f60dd
VITE_FIREBASE_STORAGE_BUCKET=hr-system-f60dd.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=427655859826
VITE_FIREBASE_APP_ID=1:427655859826:web:a29728a21de56323f8bceb
VITE_FIREBASE_MEASUREMENT_ID=G-2K5KVH7M5J
VITE_FIREBASE_VAPID_KEY=BImVY9oocAJQA4lSTyrTGkPAbuU_7LQF9f37fHfwR5qYFdCPyey4JjY7xd-y-ZpAgLQRi7PXZe3BD6EgkRWeA70
```

## Database Indexes

For optimal performance, create these Firestore indexes:

### Employees Collection
1. **Index for role-based queries:**
   - Collection: `employees`
   - Fields: `role` (Ascending) + `createdAt` (Descending)

2. **Index for user-based queries:**
   - Collection: `employees`
   - Fields: `userId` (Ascending)

3. **Index for status queries:**
   - Collection: `employees`
   - Fields: `status` (Ascending) + `createdAt` (Descending)

### Users Collection
1. **Index for role-based queries:**
   - Collection: `users`
   - Fields: `role` (Ascending) + `createdAt` (Descending)

Firestore will prompt you to create these indexes automatically when needed.

## Initialization Checklist

- [ ] Firebase project created
- [ ] Firestore database created (Production or Test mode)
- [ ] Authentication enabled (Email/Password)
- [ ] Cloud Storage bucket created
- [ ] Firestore Security Rules deployed
- [ ] Storage Security Rules deployed
- [ ] API keys configured in `.env`
- [ ] Firebase console project verified
- [ ] Collections created (users, employees)
- [ ] Test documents created
- [ ] CORS headers configured if needed
- [ ] Firebase Emulator set up for development (optional)

## Testing Your Configuration

### Test Admin Registration
```javascript
// In browser console
const result = await firebase.auth().createUserWithEmailAndPassword(
  'test.admin@example.com', 
  'Test@123456'
);
console.log('Admin registered:', result.user.uid);
```

### Test Firestore Write
```javascript
// Add admin document
db.collection('users').doc(uid).set({
  email: 'test.admin@example.com',
  name: 'Test Admin',
  role: 'admin',
  userId: uid,
  createdAt: new Date()
});
```

### Test Storage Upload
```javascript
// Upload a test file
const file = // get file from input
const ref = firebase.storage().ref(`employee-profiles/${uid}/test.jpg`);
ref.put(file).on('state_changed', ...);
```

## Common Issues & Solutions

### Issue: Cannot find module '@/firebase'
**Solution:** 
- Check `tsconfig.app.json` has correct path alias
- Clear node_modules and reinstall: `npm install`
- Restart IDE/TypeScript server

### Issue: Firestore permission denied
**Solution:**
- Check Firestore Security Rules
- Ensure user document exists with correct role
- Verify request.auth.uid matches document userId

### Issue: Profile picture not uploading
**Solution:**
- Check Firebase Storage Rules
- Verify bucket exists: `gs://hr-system-f60dd.firebasestorage.app`
- Check file size < 5MB
- Verify user is authenticated

### Issue: Role not loading after login
**Solution:**
- Check that user document exists in Firestore
- Verify role field is spelled correctly
- Check getUserRole() function returns data
- Clear localStorage and refresh page

### Issue: Redirect loops
**Solution:**
- Check guards are not blocking each other
- Verify profile completion flag is set correctly
- Check routing configuration
- Review authStateChanged listener

## Monitoring & Analytics

### Enable Google Analytics
1. Go to Firebase Console → Project Settings → Integrations
2. Enable Google Analytics
3. This will help track user registrations and logins

### Enable Crash Reporting
1. Install Crashlytics: `npm install @firebase/crashlytics`
2. Initialize in your app
3. Monitor errors and crashes in real-time

### Monitor Firestore Usage
1. Go to Firebase Console → Firestore → Usage
2. Track read/write operations
3. Monitor storage usage
4. Set up billing alerts

## Production Deployment

### Before Going Live

- [ ] Update Firestore rules to production (restrictive)
- [ ] Enable reCAPTCHA for registration (optional)
- [ ] Set up email verification
- [ ] Configure CORS headers if using custom domain
- [ ] Test all authentication flows
- [ ] Test all access controls
- [ ] Set up database backups
- [ ] Configure monitoring and logging
- [ ] Review security practices
- [ ] Test on different devices/browsers

### Production Firestore Rules Example
```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Deny all by default
    match /{document=**} {
      allow read, write: if false;
    }
    
    // Specific rules for users
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
      allow read: if hasAdminRole();
    }
    
    // Specific rules for employees
    match /employees/{empId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow read, write: if hasAdminRole();
    }
    
    function hasAdminRole() {
      return get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Support & Resources

- Firebase Documentation: https://firebase.google.com/docs
- Firestore Security Rules: https://firebase.google.com/docs/firestore/security/get-started
- Storage Security Rules: https://firebase.google.com/docs/storage/security/start
- Authentication: https://firebase.google.com/docs/auth
- Community: https://stackoverflow.com/questions/tagged/firebase

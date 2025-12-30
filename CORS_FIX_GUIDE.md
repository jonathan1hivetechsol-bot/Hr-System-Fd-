# Firebase CORS Configuration Fix

## Problem
Getting CORS errors when uploading images:
```
Access to XMLHttpRequest at 'https://firebaseapis.com/...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

## Solution

### Method 1: Configure CORS via Google Cloud Console (Recommended)

1. **Open Google Cloud Console**
   - Go to: https://console.cloud.google.com/
   - Select project: `hr-system-f60dd`

2. **Enable Cloud Storage API**
   - Navigate to: APIs & Services → Library
   - Search for "Cloud Storage API"
   - Click Enable

3. **Configure CORS via gsutil**
   - Install Google Cloud SDK if not already installed
   - Run these commands in Command Prompt/PowerShell:

```bash
# Set up gcloud authentication
gcloud init
gcloud auth login

# Set your project
gcloud config set project hr-system-f60dd

# Copy CORS config file
# Make sure firebase-cors-config.json is in your project root

# Apply CORS configuration to your bucket
gsutil cors set firebase-cors-config.json gs://hr-system-f60dd.appspot.com
```

4. **Verify CORS Configuration**
```bash
gsutil cors get gs://hr-system-f60dd.appspot.com
```

Should output your CORS rules in JSON format.

### Method 2: Quick Fix - Use Firebase Emulator (Development Only)

If you don't want to set up CORS yet, you can use Firebase Local Emulator Suite for development:

```bash
# Install Firebase CLI if not already installed
npm install -g firebase-tools

# Start emulator
firebase emulators:start
```

Then in your `src/firebase/config.ts`, connect to emulator:

```typescript
import { connectStorageEmulator } from 'firebase/storage';

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

// Use emulator in development
if (import.meta.env.DEV && window.location.hostname === 'localhost') {
  connectStorageEmulator(storage, 'localhost', 9199);
}
```

### Method 3: Temporary Fix - Test Upload to Production

If CORS is not critical right now, the upload should still work on:
- Production (Vercel deployment): CORS already handled by Firebase
- Through Firebase REST API: Uses different endpoint that doesn't have CORS

## What's in firebase-cors-config.json

The file includes CORS rules for:

✅ **Development:**
- http://localhost:5173 (Vite dev server)
- http://localhost:3000 (Alternative port)
- http://localhost:4173 (Vite preview)

✅ **Production:**
- https://future-designz-hr-panel.vercel.app
- https://*.vercel.app (any Vercel deployment)

✅ **Allowed Methods:**
- GET, HEAD, DELETE (for reading/deleting)
- PUT, POST, OPTIONS (for uploading)

✅ **Response Headers:**
- Content-Type
- x-goog-meta-* (custom metadata)

✅ **Cache Duration:**
- 3600 seconds (1 hour)

## Recommended Steps

1. **For immediate testing on localhost:**
   ```bash
   npm install -g firebase-tools
   firebase emulators:start
   ```

2. **For production/Vercel:**
   - CORS is already configured in Firebase defaults
   - Your current production URL should work

3. **For proper development CORS:**
   - Install gcloud: https://cloud.google.com/sdk/docs/install
   - Run the gsutil command above
   - Restart your dev server

## Verify Fix

After applying CORS configuration:

1. Clear browser cache (Ctrl+Shift+Delete)
2. Restart dev server: `npm run dev`
3. Try uploading an image
4. Check browser console - errors should be gone

## Error Messages Explained

| Error | Cause | Solution |
|-------|-------|----------|
| `CORS policy blocked` | CORS not configured | Apply gsutil cors set command |
| `net::ERR_FAILED` | Connection issue | Check internet, clear cache |
| `auth/unauthenticated` | User not logged in | Login first |
| `storage/unauthenticated` | Firebase rules blocked | Check Firestore rules |

## Support

If CORS still fails after setup:

1. Check Firebase Console > Storage > Rules
2. Verify bucket name: `hr-system-f60dd.appspot.com`
3. Clear browser cache: Ctrl+Shift+Delete
4. Test on production (Vercel) - should work there
5. Check console logs for specific error codes

## Next: Update Firebase Rules

After CORS is fixed, ensure your Firebase Storage rules allow uploads:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow authenticated users to upload their own profile pictures
    match /employee-profiles/{userId}/{allPaths=**} {
      allow read: if request.auth.uid == userId || 
                     get(/databases/(default)/documents/users/$(request.auth.uid)).data.role == 'admin';
      allow write: if request.auth.uid == userId;
    }
  }
}
```

Set these in: Firebase Console > Storage > Rules

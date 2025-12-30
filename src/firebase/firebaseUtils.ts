import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth'
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot
} from 'firebase/firestore'
import { getToken, onMessage } from 'firebase/messaging'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { auth, db, messaging, VAPID_KEY, storage } from './config'

interface FirebaseResult {
  success: boolean
  error?: string
  data?: unknown
  id?: string
  user?: unknown
}

interface QueryCondition {
  field: string
  operator: string
  value: unknown
}

interface DocumentData {
  [key: string]: unknown
}

// Authentication Functions
export const loginUser = async (email: string, password: string): Promise<FirebaseResult> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return { success: true, user: userCredential.user }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

// Register Admin
export const registerAdmin = async (email: string, password: string, displayName: string): Promise<FirebaseResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })

    // Create admin profile in Firestore
    const adminData = {
      name: displayName,
      email: email,
      role: 'admin' as const,
      userId: userCredential.user.uid,
      profileComplete: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const adminResult = await addDocument('users', adminData)
    if (!adminResult.success) {
      console.warn('Admin created but user profile creation failed:', adminResult.error)
    }

    return { success: true, user: userCredential.user, data: adminData }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

// Register Employee
export const registerEmployee = async (email: string, password: string, displayName: string): Promise<FirebaseResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })

    // Create employee profile in Firestore with profileComplete: false
    const employeeData = {
      name: displayName,
      email: email,
      role: 'employee' as const,
      position: '', // To be filled in profile completion
      department: '', // To be filled in profile completion
      salary: 0,
      hireDate: new Date().toISOString().split('T')[0],
      status: 'active' as const,
      userId: userCredential.user.uid,
      profileComplete: false, // Flag to force profile completion
      profileImage: undefined,
      phone: '',
      address: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const employeeResult = await addDocument('employees', employeeData)
    if (!employeeResult.success) {
      console.warn('Employee created but profile creation failed:', employeeResult.error)
    }

    return { success: true, user: userCredential.user, data: { ...employeeData, id: employeeResult.id } }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

// Get user role
export const getUserRole = async (userId: string): Promise<FirebaseResult> => {
  try {
    // Check in users collection (admins)
    const userResult = await getDocument('users', userId)
    if (userResult.success) {
      return { success: true, data: { ...(userResult.data || {}), role: 'admin' } }
    }

    // Check in employees collection
    const employeeResult = await getDocuments('employees', [
      { field: 'userId', operator: '==', value: userId }
    ])
    
    if (employeeResult.success && Array.isArray(employeeResult.data) && employeeResult.data.length > 0) {
      const employee = (employeeResult.data[0] || {}) as Record<string, unknown>
      return { success: true, data: { ...employee, role: 'employee' } as unknown }
    }

    return { success: false, error: 'User not found' }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const registerUser = async (email: string, password: string, displayName: string): Promise<FirebaseResult> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(userCredential.user, { displayName })

    // Create employee profile in Firestore
    const employeeData = {
      name: displayName,
      email: email,
      position: 'Employee', // Default position
      department: 'General', // Default department
      salary: 0, // Default salary
      hireDate: new Date().toISOString().split('T')[0], // Today's date
      status: 'active' as const,
      userId: userCredential.user.uid,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random&color=fff&size=120`
    }

    const employeeResult = await addDocument('employees', employeeData)
    if (!employeeResult.success) {
      console.warn('User created but employee profile creation failed:', employeeResult.error)
    }

    return { success: true, user: userCredential.user }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const logoutUser = async (): Promise<FirebaseResult> => {
  try {
    await signOut(auth)
    return { success: true }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const resetPassword = async (email: string): Promise<FirebaseResult> => {
  try {
    await sendPasswordResetEmail(auth, email)
    return { success: true }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

// Firestore Functions
export const addDocument = async (collectionName: string, data: DocumentData): Promise<FirebaseResult> => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return { success: true, id: docRef.id }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const updateDocument = async (collectionName: string, docId: string, data: DocumentData): Promise<FirebaseResult> => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    })
    return { success: true }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const deleteDocument = async (collectionName: string, docId: string): Promise<FirebaseResult> => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
    return { success: true }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const getDocument = async (collectionName: string, docId: string): Promise<FirebaseResult> => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return { success: true, data: { id: docSnap.id, ...docSnap.data() } }
    } else {
      return { success: false, error: 'Document not found' }
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

export const getDocuments = async (collectionName: string, conditions?: QueryCondition[]): Promise<FirebaseResult> => {
  try {
    const collectionRef = collection(db, collectionName)

    if (conditions && conditions.length > 0) {
      const queryConstraints = conditions.map(condition => {
        const { field, operator, value } = condition
        // Type assertion for firestore operators
        const firebaseOp = operator as 'where' extends never ? never : string
        return where(field, firebaseOp as Parameters<typeof where>[1], value)
      })
      const q = query(collectionRef, ...queryConstraints)
      const querySnapshot = await getDocs(q)
      const documents = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      return { success: true, data: documents }
    }

    const querySnapshot = await getDocs(collectionRef)
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    return { success: true, data: documents }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}

// Real-time listeners
export const subscribeToCollection = (collectionName: string, callback: (docs: unknown[]) => void) => {
  const q = query(collection(db, collectionName), orderBy('createdAt', 'desc'))

  return onSnapshot(q, (querySnapshot) => {
    const documents = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(documents)
  })
}

export const subscribeToDocument = (collectionName: string, docId: string, callback: (doc: unknown) => void) => {
  const docRef = doc(db, collectionName, docId)

  return onSnapshot(docRef, (docSnap) => {
    if (docSnap.exists()) {
      callback({ id: docSnap.id, ...docSnap.data() })
    } else {
      callback(null)
    }
  })
}

// Messaging Functions
export const requestForToken = async (): Promise<FirebaseResult> => {
  try {
    const currentToken = await getToken(messaging, { vapidKey: VAPID_KEY })
    if (currentToken) {
      console.log("Device Token:", currentToken)
      return { success: true, data: currentToken }
    } else {
      console.log("Permission denied for notifications")
      return { success: false, error: "Permission denied for notifications" }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    console.log("An error occurred while retrieving token. ", err)
    return { success: false, error: errorMessage }
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })

export const saveEmployee = async (empData: DocumentData): Promise<FirebaseResult> => {
  return await addDocument('employees', empData)
}

export const getEmployees = async (): Promise<FirebaseResult> => {
  return await getDocuments('employees')
}

export const updateEmployee = async (empId: string, empData: DocumentData): Promise<FirebaseResult> => {
  return await updateDocument('employees', empId, empData)
}

export const deleteEmployee = async (empId: string): Promise<FirebaseResult> => {
  return await deleteDocument('employees', empId)
}

// Storage: upload avatar
export const uploadAvatar = async (
  empId: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<FirebaseResult> => {
  try {
    const fileRef = storageRef(storage, `avatars/${empId}/${Date.now()}_${file.name}`)
    const uploadTask = uploadBytesResumable(fileRef, file)

    const urlPromise = new Promise<string>((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const percent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
          if (onProgress) onProgress(percent)
        },
        (err) => reject(err),
        async () => {
          try {
            const url = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(url)
          } catch (e) {
            reject(e)
          }
        }
      )
    })

    const url = await urlPromise
    return { success: true, data: url }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { success: false, error: errorMessage }
  }
}
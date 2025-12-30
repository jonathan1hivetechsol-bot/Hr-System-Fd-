import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'
import { updateDocument } from '@/firebase/firebaseUtils'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase/config'
import { compressImages } from '@/utils/imageOptimizer'

export const useEmployeeProfileComplete = () => {
  const navigate = useNavigate()
  const { user, userProfile } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    dateOfBirth: '',
    position: '',
    department: '',
    designations: '',
    profileImages: [] as File[]
  })
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    
    // Limit to 2 images maximum
    const selectedFiles = files.slice(0, 2)
    const newPreviews: string[] = []
    const newFormImages: File[] = []
    let hasError = false

    for (const file of selectedFiles) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Each image size should be less than 5MB' }))
        hasError = true
        break
      }

      newFormImages.push(file)

      const reader = new FileReader()
      reader.onloadend = () => {
        newPreviews.push(reader.result as string)
        if (newPreviews.length === selectedFiles.length) {
          setImagePreviews(newPreviews)
        }
      }
      reader.readAsDataURL(file)
    }

    if (!hasError && newFormImages.length > 0) {
      setFormData(prev => ({
        ...prev,
        profileImages: newFormImages
      }))

      if (errors.profileImage) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.profileImage
          return newErrors
        })
      }
    }
  }

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    const newFiles = formData.profileImages.filter((_, i) => i !== index)
    setImagePreviews(newPreviews)
    setFormData(prev => ({
      ...prev,
      profileImages: newFiles
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required'
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required'
    }

    if (!formData.position.trim()) {
      newErrors.position = 'Position is required'
    }

    if (!formData.department.trim()) {
      newErrors.department = 'Department is required'
    }

    if (formData.profileImages.length === 0) {
      newErrors.profileImage = 'At least one profile image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImages = async (): Promise<string[] | null> => {
    if (formData.profileImages.length === 0 || !user) {
      return null
    }

    try {
      // Compress images before upload
      console.log('Compressing images...')
      const compressedFiles = await compressImages(formData.profileImages, {
        maxWidth: 1200,
        maxHeight: 1200,
        quality: 0.75,
        maxSizeKB: 400
      })

      const uploadedUrls: string[] = []
      
      for (let i = 0; i < compressedFiles.length; i++) {
        const file = compressedFiles[i]
        const fileName = `profile-${user.uid}-${i}-${Date.now()}`
        const fileRef = storageRef(storage, `employee-profiles/${user.uid}/${fileName}`)

        const uploadTask = uploadBytesResumable(fileRef, file)

        const url = await new Promise<string>((resolve, reject) => {
          // 60 second timeout for each image upload (reduced from 45s since files are smaller)
          const uploadTimeoutId = setTimeout(() => {
            reject(new Error('Image upload timeout - taking too long. Please check your connection.'))
          }, 60000)

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const totalBytes = compressedFiles.length * 100
              const progress = ((i * 100 + (snapshot.bytesTransferred / snapshot.totalBytes) * 100) / totalBytes) * 100
              setUploadProgress(progress)
              console.log(`Upload progress: ${Math.round(progress)}%`)
            },
            (error) => {
              clearTimeout(uploadTimeoutId)
              console.error('Upload error:', error)
              reject(new Error(`Image upload failed: ${error.message}`))
            },
            async () => {
              clearTimeout(uploadTimeoutId)
              try {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                resolve(downloadURL)
              } catch (error) {
                reject(new Error('Failed to get download URL'))
              }
            }
          )
        })

        uploadedUrls.push(url)
      }

      return uploadedUrls
    } catch (error) {
      console.error('Error uploading images:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})
    
    // Add timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.error('Profile completion timeout - taking too long')
      setLoading(false)
      setErrors({ submit: 'Profile completion is taking too long. Please check your connection and try again.' })
      setUploadProgress(0)
    }, 60000) // 60 second timeout for profile completion (includes image upload)

    try {
      console.log('Starting profile completion for user:', user?.uid)
      
      // Check if user is authenticated
      if (!user) {
        clearTimeout(timeoutId)
        setErrors({ submit: 'User not authenticated. Please login again.' })
        setLoading(false)
        return
      }

      // Upload images
      console.log('Uploading profile images...')
      const imageUrls = await uploadImages()
      if (!imageUrls || imageUrls.length === 0) {
        clearTimeout(timeoutId)
        setErrors({ submit: 'Failed to upload profile images. Please check file size (max 5MB each) and try again.' })
        setLoading(false)
        return
      }
      console.log('Images uploaded successfully:', imageUrls)

      // Update employee profile in Firestore
      const updateData = {
        phone: formData.phone,
        address: formData.address,
        dateOfBirth: formData.dateOfBirth,
        position: formData.position,
        department: formData.department,
        designations: formData.designations,
        profileImages: imageUrls,
        profileImage: imageUrls[0], // First image as primary
        profileComplete: true,
        updatedAt: new Date()
      }

      console.log('Updating employee document...')
      const result = await updateDocument('employees', user.uid, updateData)

      if (result.success) {
        console.log('Employee profile updated successfully')
        // Also update the 'users' collection to mark profile as complete
        await updateDocument('users', user.uid, { profileComplete: true, updatedAt: new Date() }).catch(err => {
          console.warn('Warning: Could not update user profile metadata:', err)
        })

        clearTimeout(timeoutId)
        console.log('Redirecting to employee dashboard...')
        setTimeout(() => {
          // Redirect employee to their own dashboard after profile completion
          navigate('/dashboards/dashboard/employee', { replace: true })
        }, 500)
      } else {
        clearTimeout(timeoutId)
        console.error('Profile update failed:', result.error)
        setErrors({ submit: result.error || 'Failed to update profile. Please try again.' })
        setLoading(false)
      }
    } catch (error) {
      clearTimeout(timeoutId)
      console.error('Profile completion error:', error)
      setErrors({ submit: error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.' })
      setLoading(false)
    } finally {
      setUploadProgress(0)
    }
  }

  return {
    formData,
    errors,
    loading,
    uploadProgress,
    imagePreviews,
    handleChange,
    handleImageChange,
    removeImage,
    handleSubmit
  }
}

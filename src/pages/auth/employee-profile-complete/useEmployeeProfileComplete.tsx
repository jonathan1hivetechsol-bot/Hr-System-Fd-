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
      // Check file size (10MB limit before compression)
      if (file.size > 10 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: `File "${file.name}" is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Max 10MB per file.` }))
        hasError = true
        break
      }

      // Check file type
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setErrors(prev => ({ ...prev, profileImage: `File "${file.name}" format not supported. Use JPG, PNG or WebP.` }))
        hasError = true
        break
      }

      newFormImages.push(file)

      const reader = new FileReader()
      reader.onloadend = (event) => {
        if (event.target?.result) {
          newPreviews.push(event.target.result as string)
          if (newPreviews.length === selectedFiles.length) {
            console.log(`Successfully loaded ${newPreviews.length} image previews`)
            setImagePreviews(newPreviews)
          }
        }
      }
      reader.onerror = () => {
        console.error(`Failed to read file: ${file.name}`)
        setErrors(prev => ({ ...prev, profileImage: `Failed to read file "${file.name}"` }))
        hasError = true
      }
      reader.readAsDataURL(file)
    }

    if (!hasError && newFormImages.length > 0) {
      console.log(`Image selection: ${newFormImages.length} files, ${newPreviews.length} previews`)
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
      console.log('Starting compression for', formData.profileImages.length, 'images')
      setUploadProgress(10)
      
      let compressedFiles: File[] = []
      try {
        compressedFiles = await compressImages(formData.profileImages, {
          maxWidth: 1200,
          maxHeight: 1200,
          quality: 0.75,
          maxSizeKB: 400
        })
      } catch (compressError) {
        console.warn('Compression failed, uploading original files:', compressError)
        // If compression fails, try with original files
        compressedFiles = formData.profileImages
      }
      
      console.log('Compression complete. Uploading', compressedFiles.length, 'files')
      setUploadProgress(20)

      const uploadedUrls: string[] = []
      
      for (let i = 0; i < compressedFiles.length; i++) {
        const file = compressedFiles[i]
        console.log(`Uploading image ${i + 1}/${compressedFiles.length}: ${(file.size / 1024).toFixed(2)}KB`)
        
        const fileName = `profile-${user.uid}-${i}-${Date.now()}`
        const fileRef = storageRef(storage, `employee-profiles/${user.uid}/${fileName}`)

        const uploadTask = uploadBytesResumable(fileRef, file)

        const url = await new Promise<string>((resolve, reject) => {
          let uploadTimeoutId: ReturnType<typeof setTimeout> | null = null
          let hasResolved = false
          
          // Timeout: 2 minutes for upload
          uploadTimeoutId = setTimeout(() => {
            if (!hasResolved) {
              console.error('Upload timeout for image', i)
              reject(new Error('Image upload took too long. Check internet and try again.'))
            }
          }, 120000)

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              const overallProgress = (20 + (i * 35 + progress * 0.35))
              setUploadProgress(Math.min(overallProgress, 95))
              console.log(`Image ${i + 1} progress: ${Math.round(progress)}%`)
            },
            (error) => {
              if (uploadTimeoutId) clearTimeout(uploadTimeoutId)
              if (!hasResolved) {
                hasResolved = true
                console.error('Firebase upload error for image', i, ':', error.code, error.message)
                const errorMsg = error.code === 'storage/unauthenticated' 
                  ? 'Authentication failed. Please login again.'
                  : error.code === 'storage/quota-exceeded'
                  ? 'Storage quota exceeded. Contact admin.'
                  : error.message || 'Upload failed'
                reject(new Error(errorMsg))
              }
            },
            async () => {
              if (uploadTimeoutId) clearTimeout(uploadTimeoutId)
              if (!hasResolved) {
                hasResolved = true
                try {
                  console.log(`Getting download URL for image ${i + 1}`)
                  const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
                  console.log(`Image ${i + 1} uploaded successfully`)
                  resolve(downloadURL)
                } catch (error) {
                  console.error('Failed to get download URL:', error)
                  reject(new Error('Failed to process uploaded file'))
                }
              }
            }
          )
        })

        uploadedUrls.push(url)
      }

      console.log('All images uploaded successfully:', uploadedUrls.length)
      setUploadProgress(95)
      return uploadedUrls
    } catch (error) {
      console.error('Error in uploadImages:', error instanceof Error ? error.message : error)
      setUploadProgress(0)
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
    
    // Add timeout to prevent infinite loading - 2 minutes for profile completion
    const timeoutId = setTimeout(() => {
      console.error('Profile completion timeout - taking too long')
      setLoading(false)
      setErrors({ submit: 'Profile completion took too long. Please check your connection and try again.' })
      setUploadProgress(0)
    }, 120000) // 2 minutes timeout

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
        setErrors({ submit: 'Failed to upload profile images. Please ensure your images are in JPG, PNG or WebP format and less than 10MB. Check your internet connection and try again.' })
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

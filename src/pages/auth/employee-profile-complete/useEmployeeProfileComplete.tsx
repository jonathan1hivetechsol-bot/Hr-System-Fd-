import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'
import { updateDocument } from '@/firebase/firebaseUtils'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/firebase/config'

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
    profileImage: null as File | null
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, profileImage: 'Image size should be less than 5MB' }))
        return
      }

      setFormData(prev => ({
        ...prev,
        profileImage: file
      }))

      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      if (errors.profileImage) {
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors.profileImage
          return newErrors
        })
      }
    }
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

    if (!formData.profileImage) {
      newErrors.profileImage = 'Profile image is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!formData.profileImage || !user) {
      return null
    }

    try {
      const fileName = `profile-${user.uid}-${Date.now()}`
      const fileRef = storageRef(storage, `employee-profiles/${user.uid}/${fileName}`)

      const uploadTask = uploadBytesResumable(fileRef, formData.profileImage)

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setUploadProgress(progress)
          },
          (error) => {
            console.error('Upload error:', error)
            reject(error)
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
            resolve(downloadURL)
          }
        )
      })
    } catch (error) {
      console.error('Error uploading image:', error)
      return null
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      // Upload image
      const imageUrl = await uploadImage()
      if (!imageUrl) {
        setErrors({ submit: 'Failed to upload profile image' })
        setLoading(false)
        return
      }

      // Update employee profile in Firestore
      if (userProfile && userProfile.id) {
        const updateData = {
          phone: formData.phone,
          address: formData.address,
          dateOfBirth: formData.dateOfBirth,
          position: formData.position,
          department: formData.department,
          designations: formData.designations,
          profileImage: imageUrl,
          profileComplete: true,
          updatedAt: new Date()
        }

        const result = await updateDocument('employees', userProfile.id, updateData)

        if (result.success) {
          setTimeout(() => {
            navigate('/dashboards/dashboard', { replace: true })
          }, 500)
        } else {
          setErrors({ submit: result.error || 'Failed to update profile' })
        }
      } else {
        setErrors({ submit: 'User profile not found' })
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred' })
    } finally {
      setLoading(false)
      setUploadProgress(0)
    }
  }

  return {
    formData,
    errors,
    loading,
    uploadProgress,
    imagePreview,
    handleChange,
    handleImageChange,
    handleSubmit
  }
}

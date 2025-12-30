import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'

export const useEmployeeRegister = () => {
  const navigate = useNavigate()
  const { registerEmployeeUser } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required'
    }

    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    setErrors({})
    
    try {
      const displayName = `${formData.firstName} ${formData.lastName}`
      console.log('Starting employee registration:', { email: formData.email, displayName })
      
      const result = await registerEmployeeUser(formData.email, formData.password, displayName)
      console.log('Registration result:', result)

      if (result.success) {
        console.log('Registration successful, redirecting to profile completion...')
        // Reset form on success
        setFormData({
          email: '',
          password: '',
          confirmPassword: '',
          firstName: '',
          lastName: ''
        })
        // Redirect to profile completion page
        setTimeout(() => {
          navigate('/auth/employee-profile-complete', { replace: true })
        }, 500)
      } else {
        console.error('Registration failed:', result.error)
        setErrors({ submit: result.error || 'Registration failed. Please try again.' })
        setLoading(false)
      }
    } catch (error) {
      console.error('Registration error:', error)
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during registration'
      setErrors({ submit: errorMessage })
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    handleChange,
    handleSubmit
  }
}

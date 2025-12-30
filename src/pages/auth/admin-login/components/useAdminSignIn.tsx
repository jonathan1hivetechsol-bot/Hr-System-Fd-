import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFirebase } from '@/firebase'

export const useAdminSignIn = () => {
  const navigate = useNavigate()
  const { signIn, userRole } = useFirebase()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: 'admin@demo.com',
    password: '123456',
    remember: false
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const result = await signIn(formData.email, formData.password)

      if (result.success) {
        if (formData.remember) {
          localStorage.setItem('rememberAdminEmail', formData.email)
        } else {
          localStorage.removeItem('rememberAdminEmail')
        }

        // Wait a moment for userRole to be set
        setTimeout(() => {
          if (userRole === 'admin') {
            navigate('/dashboards/dashboard', { replace: true })
          } else {
            setErrors({ submit: 'You are not authorized as an admin' })
          }
        }, 500)
      } else {
        setErrors({ submit: result.error || 'Login failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ submit: error instanceof Error ? error.message : 'An error occurred during login' })
    } finally {
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

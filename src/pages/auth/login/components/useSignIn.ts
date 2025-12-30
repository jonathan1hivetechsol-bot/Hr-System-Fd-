import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '@/firebase'

export const useSignIn = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: 'user@demo.com',
    password: '123456',
    remember: false,
  })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: { email?: string; password?: string } = {}
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.password) newErrors.password = 'Password is required'

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      setLoading(true)
      try {
        const result = await loginUser(formData.email, formData.password)
        if (result.success) {
          console.log("User Logged In:", result.user?.uid)
          navigate('/dashboards/dashboard')
        } else {
          setErrors({ email: result.error || 'Login failed' })
        }
      } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Login failed'
        setErrors({ email: errorMessage })
      } finally {
        setLoading(false)
      }
    }
  }

  return { formData, errors, loading, handleChange, handleSubmit }
}

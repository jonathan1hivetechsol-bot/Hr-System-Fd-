import PasswordFormInput from '@/components/form/PasswordFormInput'
import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '@/firebase'
import * as yup from 'yup'

const RegisterForm = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string>('')

  const registerSchema = yup.object().shape({
    fullname: yup.string().required('Please enter Fullname'),
    email: yup.string().required('Please enter Email').email('Please enter valid Email'),
    password: yup.string().required('Please enter Password'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullname: 'Prompt Next',
      email: 'user@demo.com',
      password: '123456',
    },
  })

  const onSubmit = async (data: { fullname: string; email: string; password: string }) => {
    setLoading(true)
    setError('')

    try {
      const result = await registerUser(data.email, data.password, data.fullname)
      if (result.success) {
        console.log("User Registered:", result.user?.uid)
        navigate('/auth/login')
      } else {
        setError(result.error || 'Registration failed')
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed'
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="authentication-form">
      <TextFormInput name="fullname" label="Your Name *" control={control} placeholder="Your Name" containerClassName="mb-3" />
      <TextFormInput name="email" type="email" label="Email *" control={control} placeholder="Email" containerClassName="mb-3" />
      <PasswordFormInput name="password" label="Password *" control={control} placeholder="Enter your password" containerClassName="mb-3" />
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-0 text-center d-grid">
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Creating Account...' : 'Register'}
        </Button>
      </div>
    </form>
  )
}
export default RegisterForm

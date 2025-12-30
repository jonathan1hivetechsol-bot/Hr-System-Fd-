import TextFormInput from '@/components/form/TextFormInput'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const ForgotPassForm = () => {
  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email('Please enter valid email').required('Please enter email'),
  })

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  })
  return (
    <form onSubmit={handleSubmit(() => {})} className="authentication-form">
      <TextFormInput name="email" label="Email *" control={control} placeholder="Email" containerClassName="mb-3" />
      <div className="mb-0 text-center pt-3 d-grid">
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </div>
    </form>
  )
}
export default ForgotPassForm

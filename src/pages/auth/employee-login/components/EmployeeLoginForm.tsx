import { Link } from 'react-router-dom'
import { useEmployeeSignIn } from './useEmployeeSignIn'

const EmployeeLoginForm = () => {
  const { formData, errors, loading, handleChange, handleSubmit } = useEmployeeSignIn()

  return (
    <form onSubmit={handleSubmit} className="authentication-form">
      <div className="mb-3">
        <label htmlFor="employeeEmail" className="form-label">
          Email <small>*</small>
        </label>
        <input
          type="email"
          className="form-control"
          id="employeeEmail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="employeePassword">
          Password <small>*</small>
        </label>
        <Link to="/auth/forgot-pass" className="float-end text-muted text-unline-dashed ms-1 fs-13">
          Forgot your password?
        </Link>
        <input
          type="password"
          className="form-control"
          id="employeePassword"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <div className="mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          id="employeeCheckboxSignin"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
        />
        <label className="form-check-label text-muted" htmlFor="employeeCheckboxSignin">
          Remember me
        </label>
      </div>

      {errors.submit && <div className="alert alert-danger alert-dismissible fade show" role="alert">{errors.submit}</div>}

      <div className="mb-0 text-center d-grid">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </div>
    </form>
  )
}

export default EmployeeLoginForm

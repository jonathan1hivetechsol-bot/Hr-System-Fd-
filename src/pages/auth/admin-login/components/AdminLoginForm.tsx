import { Link } from 'react-router-dom'
import { useAdminSignIn } from './useAdminSignIn'

const AdminLoginForm = () => {
  const { formData, errors, loading, handleChange, handleSubmit } = useAdminSignIn()

  return (
    <form onSubmit={handleSubmit} className="authentication-form">
      <div className="mb-3">
        <label htmlFor="adminEmail" className="form-label">
          Email <small>*</small>
        </label>
        <input
          type="email"
          className="form-control"
          id="adminEmail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label className="form-label" htmlFor="adminPassword">
          Password <small>*</small>
        </label>
        <Link to="/auth/forgot-pass" className="float-end text-muted text-unline-dashed ms-1 fs-13">
          Forgot your password?
        </Link>
        <input
          type="password"
          className="form-control"
          id="adminPassword"
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
          id="adminCheckboxSignin"
          name="remember"
          checked={formData.remember}
          onChange={handleChange}
        />
        <label className="form-check-label text-muted" htmlFor="adminCheckboxSignin">
          Remember me
        </label>
      </div>

      {errors.submit && <div className="alert alert-danger alert-dismissible fade show" role="alert">{errors.submit}</div>}

      <div className="mb-0 text-center d-grid">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Logging In...' : 'Log In as Admin'}
        </button>
      </div>
    </form>
  )
}

export default AdminLoginForm

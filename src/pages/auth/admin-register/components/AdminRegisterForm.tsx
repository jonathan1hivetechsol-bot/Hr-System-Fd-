import { useAdminRegister } from './useAdminRegister'
import { Alert } from 'react-bootstrap'

const AdminRegisterForm = () => {
  const { formData, errors, loading, handleChange, handleSubmit } = useAdminRegister()

  return (
    <form onSubmit={handleSubmit} className="authentication-form">
      {/* Admin Warning Alert */}
      <Alert variant="warning" className="mb-4">
        <strong>Admin Registration:</strong> This is a protected area. Only authorized personnel with the admin code can register as administrator.
      </Alert>

      <div className="mb-3">
        <label htmlFor="adminCode" className="form-label">
          Admin Code <small>*</small>
        </label>
        <input
          type="password"
          className={`form-control ${errors.adminCode ? 'is-invalid' : ''}`}
          id="adminCode"
          placeholder="Enter admin secret code"
          name="adminCode"
          value={formData.adminCode}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.adminCode && <small className="text-danger d-block mt-1">{errors.adminCode}</small>}
        <small className="text-muted d-block mt-1">You must have the admin code to proceed</small>
      </div>

      <div className="mb-3">
        <label htmlFor="adminFirstName" className="form-label">
          First Name <small>*</small>
        </label>
        <input
          type="text"
          className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
          id="adminFirstName"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.firstName && <small className="text-danger d-block mt-1">{errors.firstName}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="adminLastName" className="form-label">
          Last Name <small>*</small>
        </label>
        <input
          type="text"
          className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
          id="adminLastName"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.lastName && <small className="text-danger d-block mt-1">{errors.lastName}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="adminRegEmail" className="form-label">
          Email <small>*</small>
        </label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
          id="adminRegEmail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.email && <small className="text-danger d-block mt-1">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="adminRegPassword" className="form-label">
          Password <small>*</small>
        </label>
        <input
          type="password"
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
          id="adminRegPassword"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.password && <small className="text-danger d-block mt-1">{errors.password}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="adminRegConfirmPassword" className="form-label">
          Confirm Password <small>*</small>
        </label>
        <input
          type="password"
          className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
          id="adminRegConfirmPassword"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          disabled={loading}
        />
        {errors.confirmPassword && <small className="text-danger d-block mt-1">{errors.confirmPassword}</small>}
      </div>

      {errors.submit && <div className="alert alert-danger alert-dismissible fade show" role="alert">{errors.submit}</div>}

      <div className="mb-0 text-center d-grid">
        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading ? 'Registering Admin...' : 'Register as Admin'}
        </button>
      </div>
    </form>
  )
}

export default AdminRegisterForm

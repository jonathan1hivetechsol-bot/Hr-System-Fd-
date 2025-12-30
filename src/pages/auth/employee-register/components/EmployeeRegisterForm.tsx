import { useEmployeeRegister } from './useEmployeeRegister'

const EmployeeRegisterForm = () => {
  const { formData, errors, loading, handleChange, handleSubmit } = useEmployeeRegister()

  return (
    <form onSubmit={handleSubmit} className="authentication-form">
      <div className="mb-3">
        <label htmlFor="empFirstName" className="form-label">
          First Name <small>*</small>
        </label>
        <input
          type="text"
          className="form-control"
          id="empFirstName"
          placeholder="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="empLastName" className="form-label">
          Last Name <small>*</small>
        </label>
        <input
          type="text"
          className="form-control"
          id="empLastName"
          placeholder="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <small className="text-danger">{errors.lastName}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="empRegEmail" className="form-label">
          Email <small>*</small>
        </label>
        <input
          type="email"
          className="form-control"
          id="empRegEmail"
          placeholder="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="empRegPassword" className="form-label">
          Password <small>*</small>
        </label>
        <input
          type="password"
          className="form-control"
          id="empRegPassword"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        {errors.password && <small className="text-danger">{errors.password}</small>}
      </div>

      <div className="mb-3">
        <label htmlFor="empRegConfirmPassword" className="form-label">
          Confirm Password <small>*</small>
        </label>
        <input
          type="password"
          className="form-control"
          id="empRegConfirmPassword"
          placeholder="Confirm password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
      </div>

      {errors.submit && <div className="alert alert-danger alert-dismissible fade show" role="alert">{errors.submit}</div>}

      <div className="mb-0 text-center d-grid">
        <button 
          className="btn btn-primary" 
          type="submit" 
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? (
            <>
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
              Registering...
            </>
          ) : (
            'Sign Up'
          )}
        </button>
      </div>
    </form>
  )
}

export default EmployeeRegisterForm

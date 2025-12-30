import { useEmployeeProfileComplete } from './useEmployeeProfileComplete'
import { Card, CardBody, Col, Container, Row, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import { DEPARTMENTS } from '@/assets/data/constants'

const EmployeeProfileComplete = () => {
  const { formData, errors, loading, uploadProgress, imagePreviews, handleChange, handleImageChange, removeImage, handleSubmit } =
    useEmployeeProfileComplete()

  return (
    <div className="bg-gradient2 min-vh-100 align-items-center d-flex justify-content-center pt-2 pt-sm-5 pb-4 pb-sm-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <Card>
              <CardBody className="p-4 p-sm-5">
                <div className="mx-auto mb-4">
                  <Link to="/" className="d-flex">
                    <img src={logo} className="align-self-center" alt="logo-img" height={30} />
                  </Link>
                </div>

                <h4 className="h4 mb-1 mt-4">Complete Your Profile</h4>
                <p className="text-muted mb-4">Please fill in your profile information to get started.</p>

                <form onSubmit={handleSubmit}>
                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label htmlFor="phone" className="form-label">
                          Phone Number <small>*</small>
                        </label>
                        <input
                          type="tel"
                          className="form-control"
                          id="phone"
                          placeholder="Phone Number"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />
                        {errors.phone && <small className="text-danger">{errors.phone}</small>}
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="mb-3">
                        <label htmlFor="dateOfBirth" className="form-label">
                          Date of Birth <small>*</small>
                        </label>
                        <input
                          type="date"
                          className="form-control"
                          id="dateOfBirth"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                        />
                        {errors.dateOfBirth && <small className="text-danger">{errors.dateOfBirth}</small>}
                      </div>
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">
                      Address <small>*</small>
                    </label>
                    <textarea
                      className="form-control"
                      id="address"
                      placeholder="Enter your address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange as any}
                      rows={3}
                    />
                    {errors.address && <small className="text-danger">{errors.address}</small>}
                  </div>

                  <Row>
                    <Col md={6}>
                      <div className="mb-3">
                        <label htmlFor="position" className="form-label">
                          Position <small>*</small>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="position"
                          placeholder="Your Position"
                          name="position"
                          value={formData.position}
                          onChange={handleChange}
                        />
                        {errors.position && <small className="text-danger">{errors.position}</small>}
                      </div>
                    </Col>

                    <Col md={6}>
                      <div className="mb-3">
                        <label htmlFor="department" className="form-label">
                          Department <small>*</small>
                        </label>
                        <select
                          className="form-control"
                          id="department"
                          name="department"
                          value={formData.department}
                          onChange={handleChange}
                        >
                          <option value="">Select Department</option>
                          {DEPARTMENTS.map((dept) => (
                            <option key={dept} value={dept}>
                              {dept}
                            </option>
                          ))}
                        </select>
                        {errors.department && <small className="text-danger">{errors.department}</small>}
                      </div>
                    </Col>
                  </Row>

                  <div className="mb-3">
                    <label htmlFor="designations" className="form-label">
                      Designations / Skills
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="designations"
                      placeholder="e.g., Software Developer, Team Lead"
                      name="designations"
                      value={formData.designations}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">
                      Profile Pictures (Up to 2) <small>*</small>
                    </label>
                    <div className="border-2 border-dashed p-4 text-center rounded" style={{ cursor: 'pointer' }}>
                      {imagePreviews.length > 0 ? (
                        <div>
                          <div className="row g-3 mb-3">
                            {imagePreviews.map((preview, idx) => (
                              <div key={idx} className="col-md-6">
                                <div className="position-relative">
                                  <img src={preview} alt={`Preview ${idx + 1}`} className="img-fluid rounded" style={{ maxHeight: '150px', objectFit: 'cover', width: '100%' }} />
                                  <button
                                    type="button"
                                    className="btn btn-sm btn-danger position-absolute top-0 end-0 m-2"
                                    onClick={() => removeImage(idx)}
                                    title="Remove image"
                                  >
                                    ×
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                          <p className="text-muted small mb-2">
                            {imagePreviews.length} of 2 photos selected
                          </p>
                          <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                          />
                          {imagePreviews.length < 2 && (
                            <button 
                              type="button"
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => document.getElementById('profileImage')?.click()}
                            >
                              Add More Photos
                            </button>
                          )}
                          <button 
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => {
                              const input = document.getElementById('profileImage') as HTMLInputElement
                              if (input) input.value = ''
                              removeImage(0)
                            }}
                          >
                            Clear All
                          </button>
                        </div>
                      ) : (
                        <div onClick={() => document.getElementById('profileImage')?.click()}>
                          <svg className="mb-3" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <p className="text-muted mb-2">Click to upload profile pictures</p>
                          <p className="small text-muted mb-0">(JPG, PNG - Max 5MB per file, up to 2 photos)</p>
                          <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            style={{ display: 'none' }}
                          />
                        </div>
                      )}
                    </div>
                    {errors.profileImage && <small className="text-danger d-block mt-2">{errors.profileImage}</small>}
                  </div>

                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="mb-3">
                      <p className="text-muted mb-2">Uploading... {Math.round(uploadProgress)}%</p>
                      <ProgressBar now={uploadProgress} />
                    </div>
                  )}

                  {errors.submit && (
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                      {errors.submit}
                    </div>
                  )}

                  <div className="mb-0 text-center d-grid gap-2">
                    <button className="btn btn-primary" type="submit" disabled={loading || uploadProgress > 0}>
                      {loading ? 'Completing Profile...' : 'Complete Profile & Continue'}
                    </button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default EmployeeProfileComplete

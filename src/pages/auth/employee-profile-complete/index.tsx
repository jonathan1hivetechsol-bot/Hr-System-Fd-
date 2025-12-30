import { useEmployeeProfileComplete } from './useEmployeeProfileComplete'
import { Card, CardBody, Col, Container, Row, ProgressBar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '@/assets/images/logo.png'
import { DEPARTMENTS } from '@/assets/data/constants'

const EmployeeProfileComplete = () => {
  const { formData, errors, loading, uploadProgress, imagePreview, handleChange, handleImageChange, handleSubmit } =
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
                      Profile Picture <small>*</small>
                    </label>
                    <div className="border-2 border-dashed p-4 text-center rounded">
                      {imagePreview ? (
                        <div>
                          <img src={imagePreview} alt="Preview" className="img-fluid rounded mb-3" style={{ maxHeight: '200px' }} />
                          <div className="mt-2">
                            <input
                              type="file"
                              className="form-control"
                              id="profileImage"
                              accept="image/*"
                              onChange={handleImageChange}
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="file"
                            className="form-control"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                          />
                          <p className="text-muted mt-2 mb-0">Click to upload your profile picture</p>
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

import { useState } from 'react';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler';

function CreateJobPage() {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    description: '',
    responsibilities: [''],
    requirements: [''],
    location: '',
    salary: '',
    jobType: '',
    experienceLevel: '',
    tags: '',
    logoUrl: '',
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'Job title is required.';
    }
    if (!formData.company.trim()) {
      errors.company = 'Company name is required.';
    }
    if (!formData.description.trim()) {
      errors.description = 'Job description is required.';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required.';
    }
    if (!formData.salary.trim()) {
      errors.salary = 'Salary information is required.';
    }
    if (!formData.jobType.trim()) {
      errors.jobType = 'Job type is required.';
    }
    if (!formData.experienceLevel.trim()) {
      errors.experienceLevel = 'Experience level is required.';
    }

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: '',
    }));
  };

  const handleArrayChange = (index, field, value) => {
    const updatedArray = [...formData[field]];
    updatedArray[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: [...prevData[field], ''],
    }));
  };

  const removeArrayItem = (field, index) => {
    const updatedArray = [...formData[field]];
    updatedArray.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, success: null, error: null });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus({ submitting: false, success: null, error: null });
      return;
    }

    try {
      const response = await apiHandler(
        "job",
        "POST",
        "application/json",
        formData
      )

      if (response.ok) {
        setSubmitStatus({ submitting: false, success: true, error: null });
        // Optionally reset the form
        setFormData({
          title: '',
          company: '',
          description: '',
          responsibilities: [''],
          requirements: [''],
          location: '',
          salary: '',
          jobType: '',
          experienceLevel: '',
          tags: '',
          logoUrl: '',
        });
      } else {
        const errorData = await response.json();
        setSubmitStatus({ submitting: false, success: false, error: errorData.message });
      }
    } catch (error) {
      setSubmitStatus({ submitting: false, success: false, error: error.message });
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Create a Job Vacancy</h1>

        {submitStatus.success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            Job vacancy created successfully!
          </div>
        )}

        {submitStatus.error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
            {submitStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Job Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700">
              Job Title<span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className={`w-full mt-1 p-2 border rounded ${
                errors.title ? 'border-red-500' : ''
              }`}
              value={formData.title}
              onChange={handleChange}
              required
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          {/* Company Name */}
          <div className="mb-4">
            <label htmlFor="company" className="block text-gray-700">
              Company Name<span className="text-red-500">*</span>
            </label>
            <input
              id="company"
              type="text"
              name="company"
              className={`w-full mt-1 p-2 border rounded ${
                errors.company ? 'border-red-500' : ''
              }`}
              value={formData.company}
              onChange={handleChange}
              required
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">{errors.company}</p>
            )}
          </div>

          {/* Job Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700">
              Job Description<span className="text-red-500">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              className={`w-full mt-1 p-2 border rounded h-32 ${
                errors.description ? 'border-red-500' : ''
              }`}
              value={formData.description}
              onChange={handleChange}
              required
            />
            {errors.description && (
              <p className="text-red-500 text-sm mt-1">{errors.description}</p>
            )}
          </div>

          {/* Responsibilities */}
          <div className="mb-4">
            <label className="block text-gray-700">Responsibilities</label>
            {formData.responsibilities.map((item, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(index, 'responsibilities', e.target.value)
                  }
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removeArrayItem('responsibilities', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => addArrayItem('responsibilities')}
            >
              Add Responsibility
            </button>
          </div>

          {/* Requirements */}
          <div className="mb-4">
            <label className="block text-gray-700">Requirements</label>
            {formData.requirements.map((item, index) => (
              <div key={index} className="flex items-center mt-2">
                <input
                  type="text"
                  className="w-full p-2 border rounded"
                  value={item}
                  onChange={(e) =>
                    handleArrayChange(index, 'requirements', e.target.value)
                  }
                />
                <button
                  type="button"
                  className="ml-2 text-red-500"
                  onClick={() => removeArrayItem('requirements', index)}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={() => addArrayItem('requirements')}
            >
              Add Requirement
            </button>
          </div>

          {/* Location and Salary */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="location" className="block text-gray-700">
                Location<span className="text-red-500">*</span>
              </label>
              <input
                id="location"
                type="text"
                name="location"
                className={`w-full mt-1 p-2 border rounded ${
                  errors.location ? 'border-red-500' : ''
                }`}
                value={formData.location}
                onChange={handleChange}
                required
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">{errors.location}</p>
              )}
            </div>
            <div>
              <label htmlFor="salary" className="block text-gray-700">
                Salary<span className="text-red-500">*</span>
              </label>
              <input
                id="salary"
                type="text"
                name="salary"
                className={`w-full mt-1 p-2 border rounded ${
                  errors.salary ? 'border-red-500' : ''
                }`}
                value={formData.salary}
                onChange={handleChange}
                required
              />
              {errors.salary && (
                <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
              )}
            </div>
          </div>

          {/* Job Type and Experience Level */}
          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="jobType" className="block text-gray-700">
                Job Type<span className="text-red-500">*</span>
              </label>
              <select
                id="jobType"
                name="jobType"
                className={`w-full mt-1 p-2 border rounded ${
                  errors.jobType ? 'border-red-500' : ''
                }`}
                value={formData.jobType}
                onChange={handleChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-Time">Full-Time</option>
                <option value="Part-Time">Part-Time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Temporary">Temporary</option>
              </select>
              {errors.jobType && (
                <p className="text-red-500 text-sm mt-1">{errors.jobType}</p>
              )}
            </div>
            <div>
              <label htmlFor="experienceLevel" className="block text-gray-700">
                Experience Level<span className="text-red-500">*</span>
              </label>
              <select
                id="experienceLevel"
                name="experienceLevel"
                className={`w-full mt-1 p-2 border rounded ${
                  errors.experienceLevel ? 'border-red-500' : ''
                }`}
                value={formData.experienceLevel}
                onChange={handleChange}
                required
              >
                <option value="">Select Experience Level</option>
                <option value="Entry Level">Entry Level</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior Level">Senior Level</option>
                <option value="Manager">Manager</option>
                <option value="Director">Director</option>
              </select>
              {errors.experienceLevel && (
                <p className="text-red-500 text-sm mt-1">{errors.experienceLevel}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="mb-4">
            <label htmlFor="tags" className="block text-gray-700">
              Tags (comma-separated)
            </label>
            <input
              id="tags"
              type="text"
              name="tags"
              className="w-full mt-1 p-2 border rounded"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., Remote, JavaScript, Full Stack"
            />
          </div>

          {/* Company Logo URL */}
          <div className="mb-4">
            <label htmlFor="logoUrl" className="block text-gray-700">
              Company Logo URL
            </label>
            <input
              id="logoUrl"
              type="text"
              name="logoUrl"
              className="w-full mt-1 p-2 border rounded"
              value={formData.logoUrl}
              onChange={handleChange}
              placeholder="https://example.com/logo.png"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              submitStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitStatus.submitting}
          >
            {submitStatus.submitting ? 'Creating...' : 'Create Job Vacancy'}
          </button>
        </form>
      </div>
    </>
  );
}

export default CreateJobPage;

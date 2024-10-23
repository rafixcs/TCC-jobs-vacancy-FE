import { useState } from 'react';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler';

function RegisterPage() {
  const [formData, setFormData] = useState({
    accountType: 'individual', // Added accountType
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Company-specific fields
    companyName: '',
    companyEmail: '',
    companyAddress: '',
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errors = {};
    const emailRegex = /^\S+@\S+\.\S+$/;

    if (!formData.username.trim()) {
      errors.username = 'Username is required.';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Email is not valid.';
    }

    if (!formData.password) {
      errors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    // Additional validation for company accounts
    if (formData.accountType === 'company') {
      if (!formData.companyName.trim()) {
        errors.companyName = 'Company name is required.';
      }

      if (!formData.companyEmail.trim()) {
        errors.companyEmail = 'Company email is required.';
      } else if (!emailRegex.test(formData.companyEmail)) {
        errors.companyEmail = 'Company email is not valid.';
      }

      if (!formData.companyAddress.trim()) {
        errors.companyAddress = 'Company address is required.';
      }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, success: null, error: null });

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus({ submitting: false, success: null, error: null });
      return;
    }

    // Build the request body
    const bodyRequest = {
      name: formData.username,
      email: formData.email,
      password: formData.password,
      role_id: formData.accountType === 'company' ? 3 : 2, // Adjust role_id based on account type
    };

    // Include company data if account type is 'company'
    if (formData.accountType === 'company') {
      bodyRequest.company = {
        name: formData.companyName,
        email: formData.companyEmail,
        address: formData.companyAddress,
      };
    }

    try {
      apiHandler('user', 'POST', 'application/json', bodyRequest)
        .then((response) => {
          if (response.ok) {
            setSubmitStatus({ submitting: false, success: true, error: null });
            // Reset the form
            setFormData({
              accountType: 'individual',
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
              companyName: '',
              companyEmail: '',
              companyAddress: '',
            });
          } else {
            let errorMessage = '';
            if (response.status === 404) {
              errorMessage = 'Resource not available';
            } else if (response.status === 400) {
              errorMessage = 'User already exists';
            } else {
              errorMessage = 'Unknown error, please contact support';
            }

            setSubmitStatus({
              submitting: false,
              success: false,
              error: errorMessage,
            });
          }
        })
        .catch((reason) => {
          console.log(reason);
          setSubmitStatus({
            submitting: false,
            success: false,
            error: 'Failed to register new account',
          });
        });
    } catch (error) {
      setSubmitStatus({
        submitting: false,
        success: false,
        error: error.message,
      });
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6 text-center">Create an Account</h1>

        {submitStatus.success && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            Registration successful! You can now log in.
          </div>
        )}

        {submitStatus.error && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
            {submitStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {/* Account Type Selection */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Account Type<span className="text-red-500">*</span>
            </label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded"
              required
            >
              <option value="individual">Individual</option>
              <option value="company">Company</option>
            </select>
          </div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              className={`w-full mt-1 p-2 border rounded ${
                errors.username ? 'border-red-500' : ''
              }`}
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Email Address */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`w-full mt-1 p-2 border rounded ${
                errors.email ? 'border-red-500' : ''
              }`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              className={`w-full mt-1 p-2 border rounded ${
                errors.password ? 'border-red-500' : ''
              }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="mb-6">
            <label className="block text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full mt-1 p-2 border rounded ${
                errors.confirmPassword ? 'border-red-500' : ''
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Company Fields */}
          {formData.accountType === 'company' && (
            <>
              {/* Company Name */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Company Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyName"
                  className={`w-full mt-1 p-2 border rounded ${
                    errors.companyName ? 'border-red-500' : ''
                  }`}
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyName}
                  </p>
                )}
              </div>

              {/* Company Email */}
              <div className="mb-4">
                <label className="block text-gray-700">
                  Company Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="companyEmail"
                  className={`w-full mt-1 p-2 border rounded ${
                    errors.companyEmail ? 'border-red-500' : ''
                  }`}
                  value={formData.companyEmail}
                  onChange={handleChange}
                  required
                />
                {errors.companyEmail && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyEmail}
                  </p>
                )}
              </div>

              {/* Company Address */}
              <div className="mb-6">
                <label className="block text-gray-700">
                  Company Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="companyAddress"
                  className={`w-full mt-1 p-2 border rounded ${
                    errors.companyAddress ? 'border-red-500' : ''
                  }`}
                  value={formData.companyAddress}
                  onChange={handleChange}
                  required
                />
                {errors.companyAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.companyAddress}
                  </p>
                )}
              </div>
            </>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
              submitStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={submitStatus.submitting}
          >
            {submitStatus.submitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="text-gray-600 text-sm mt-4 text-center">
          Already have an account?{' '}
          <a href="/signup" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </>
  );
}

export default RegisterPage;

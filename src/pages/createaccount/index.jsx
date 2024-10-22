import { useState } from 'react';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler'

function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    const bodyRequest = {
      name: formData.username,
      password: formData.password,
      role_id: 2,
    }

    try {
      apiHandler(
        'user',
        'POST',
        'application/json',
        bodyRequest
        ).then((response) => {
          if (response.ok) {
            setSubmitStatus({ submitting: false, success: true, error: null });
            setFormData({
              username: '',
              email: '',
              password: '',
              confirmPassword: '',
            });
          } else {
            let errorMessage = ""
            if (response.status == 404) {
              errorMessage = "Resource not available"
            } else if (response == 400) {
              errorMessage = "User already exists"
            } else {
              errorMessage = "Unknown error please contact suport"
            }

            setSubmitStatus({ submitting: false, success: false, error: errorMessage });
          }
        }).catch((reason) => {
          console.log(reason)
          setSubmitStatus({ submitting: false, success: false, error: 'Failed to register new account' });
        })
    } catch (error) {
      setSubmitStatus({ submitting: false, success: false, error: error.message });
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
          <div className="mb-4">
            <label className="block text-gray-700">
              Username<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="username"
              className={`w-full mt-1 p-2 border rounded ${errors.username ? 'border-red-500' : ''
                }`}
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              className={`w-full mt-1 p-2 border rounded ${errors.email ? 'border-red-500' : ''
                }`}
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              className={`w-full mt-1 p-2 border rounded ${errors.password ? 'border-red-500' : ''
                }`}
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`w-full mt-1 p-2 border rounded ${errors.confirmPassword ? 'border-red-500' : ''
                }`}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${submitStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
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

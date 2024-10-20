import { useState } from 'react';
import Header from '../../components/header';

export default function ApplyPage({ job }) {

  job = {
    id: 1,
    title: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
  };

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resume: null,
  });

  const [submitStatus, setSubmitStatus] = useState({
    submitting: false,
    success: null,
    error: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      resume: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ submitting: true, success: null, error: null });

    try {
      // Create a FormData object to send form data including files
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('coverLetter', formData.coverLetter);
      data.append('resume', formData.resume);
      data.append('jobId', job.id);

      // Replace with your API endpoint
      const response = await fetch('https://api.example.com/apply', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setSubmitStatus({ submitting: false, success: true, error: null });
        // Optionally reset the form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          coverLetter: '',
          resume: null,
        });
      } else {
        throw new Error('Application submission failed.');
      }
    } catch (error) {
      setSubmitStatus({ submitting: false, success: false, error: error.message });
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4">Apply for {job.title}</h1>
        <p className="text-gray-600 text-xl mb-6">{job.company}</p>

        {submitStatus.success === true && (
          <div className="mb-6 p-4 bg-green-100 text-green-800 rounded">
            Your application has been submitted successfully!
          </div>
        )}

        {submitStatus.success === false && (
          <div className="mb-6 p-4 bg-red-100 text-red-800 rounded">
            {submitStatus.error}
          </div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="fullName"
              className="w-full mt-1 p-2 border rounded"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700">Email Address</label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 p-2 border rounded"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phone"
                className="w-full mt-1 p-2 border rounded"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Cover Letter</label>
            <textarea
              name="coverLetter"
              className="w-full mt-1 p-2 border rounded h-32"
              value={formData.coverLetter}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Resume/CV</label>
            <input
              type="file"
              name="resume"
              className="w-full mt-1"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
          </div>

          <button
            type="submit"
            className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${submitStatus.submitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            disabled={submitStatus.submitting}
          >
            {submitStatus.submitting ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>
    </>
  );
}

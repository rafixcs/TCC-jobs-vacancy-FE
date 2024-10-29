import { useEffect, useState, useContext } from 'react';
import Header from '../../components/header';
import { AuthContext } from '../../provider/authcontext';
import { useLocation, useParams } from 'react-router-dom';
import { apiHandler } from '../../utils/apihandler';

export default function ApplyPage() {

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const { jobId } = useParams()
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [job, setJob] = useState({
    id: 0,
    title: '',
    company: '',
  })

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

  const [ loading, setLoading ] = useState(true)
  useEffect(() => {
    const title = queryParams.get("title")
    const company = queryParams.get("company")
    
    setJob({
      id: jobId,
      title: title,
      company: company,
    })

    apiHandler("user", "GET").then(async (response) => {
      if(response.ok) {
        const data = await response.json()
        setFormData({
          email: data.email,
          phone: data.phone,
          fullName: data.name,
        })
        setLoading(false)
      } else {
        console.log(response)
        setLoading(false)
      }
    }).catch((reason) => {
      console.log(reason)
      setLoading(false)
    })
  }, [])

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
      const formDataRequest = new FormData();

      formDataRequest.append('full_name', formData.fullName);
      formDataRequest.append('email', formData.email);
      formDataRequest.append('phone', formData.phone);
      formDataRequest.append('cover_letter', formData.coverLetter);
      formDataRequest.append('job_id', jobId);

      if(formData.resume) {
        formDataRequest.append('resume', formData.resume);
      }

      const response = await apiHandler("job/apply", "POST", "multipart/form-data", formDataRequest, true)
      if (response.ok) {
        setSubmitStatus({ submitting: false, success: true, error: null });
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

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-[90vh]">
          <p className="text-gray-600 text-xl">Loading jobs...</p>
        </div>
      </>
    );
  }

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

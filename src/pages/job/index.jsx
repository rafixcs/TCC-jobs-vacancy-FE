import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header";
import { useEffect, useState } from "react";
import { apiHandler } from "../../utils/apihandler";

export default function JobDetails() {

  const navigate = useNavigate()
  const { jobId } = useParams()
  const [ job, setJob ] = useState(null)
  const [ loading, setLoading ] = useState(true)
  const [ error, setError ] = useState(null)


  function handleApply() {
    navigate(`/jobs/${jobId}/apply?title=${job.title}&company=${job.company}`)
  }

  useEffect(() => {
    apiHandler(`job/${jobId}`, "GET").then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setJob(data)
        setError(null)
        setLoading(false)
      } else {
        setError("Job vacancy may not exist")
        setLoading(false)
      }
    }).catch((reason) => {
      setError("Job vacancy may not exist")
      console.error(reason)
    })

  }, [])

  if (loading) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <svg
            className="animate-spin h-8 w-8 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            {/* SVG content for spinner */}
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-red-500 text-xl">No job vacancy found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-4xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-600 text-xl mb-6">{job.company}</p>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
          <p className="text-gray-700">{job.description}</p>
        </div>

        {job.responsibilities && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.responsibilities.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        {job.requirements && (
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
            <ul className="list-disc list-inside text-gray-700">
              {job.requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Job Type</h2>
            <p className="text-gray-700">{job.job_type}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Experience Level</h2>
            <p className="text-gray-700">{job.experience_level}</p>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Location</h2>
            <p className="text-gray-700">{job.location}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Salary</h2>
            <p className="text-gray-700">{job.salary}</p>
          </div>
        </div>

        <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => handleApply()}
        >
          Apply Now
        </button>
      </div>
    </>
  )
}

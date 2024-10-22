import { useEffect, useState } from "react";
import Header from "../../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { apiHandler } from "../../utils/apihandler";

export default function JobsList() {

  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const [ emptyResult, setEmptyResult ] = useState(true)

  const [ jobs, setJobs ] = useState([])

  function handleJob(job) {
    navigate(`/jobs/${job.job_id}`)
  }

  useEffect(() => {
    const searchTerm = queryParams.get("searchterm")
    apiHandler(
      `job/search?value=${searchTerm || ""}`,
      'GET'
    ).then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        if (data.JobVacancies) {
          setJobs(data.JobVacancies)
          setEmptyResult(false)
        } else {
          setEmptyResult(true)  
        }
      } else {
        setEmptyResult(true)
      }
    }).catch((reason) => {
      console.log("failed to fetch")
      console.log(reason)
    })
  }, [])

  if(emptyResult) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-screen">
          <div className="text-gray-500 text-xl">No job vacancy found</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Job Listings</h1>
        {jobs.length > 0 ? (
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li
                key={job.job_id}
                className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
                onClick={() => handleJob(job)}
              >
                <h2 className="text-2xl font-semibold">{job.title}</h2>
                <p className="text-gray-500 mt-2">{job.company}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No jobs found.</p>
        )}
      </div>
    </>
  )
}

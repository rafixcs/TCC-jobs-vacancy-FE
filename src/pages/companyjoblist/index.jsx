import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler';

function CompanyJobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiHandler("company/jobs", "GET").then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        setJobs(data.job_vacancies)
        setLoading(false)
      } else {
        console.log(response)
        setLoading(false)
      }
    }).catch((reason) => {
      console.log(reason)
      setLoading(false)
    })

  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-xl">Loading your job vacancies...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Your Job Vacancies</h1>
        {jobs.length > 0 ? (
          <ul className="space-y-6">
            {jobs.map((job) => (
              <li
                key={job.id}
                className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <Link to={`/company/jobs/${job.id}/applications?title=${job.title}`} className="block">
                  <h2 className="text-2xl font-semibold">{job.title}</h2>
                  <p className="text-gray-500 mt-2">{job.location}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Posted on {new Date(job.creation_date).toLocaleDateString()}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">You have not posted any job vacancies yet.</p>
        )}
      </div>
    </>
  );
}

export default CompanyJobList;

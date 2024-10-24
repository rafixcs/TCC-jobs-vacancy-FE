import { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler';

function JobApplicationsPage() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);

  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)

  useEffect(() => {
    const title = queryParams.get("title")
    setJobTitle(title)

    apiHandler(`job/applies?job_id=${jobId}`, "GET").then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setApplications(data.user_applies)
        setLoading(false)
      } else {
        console.log(response)
        setLoading(false)
      }
    }).catch((reason) => {
      console.log(reason)
      setLoading(false)
    })
  }, [jobId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-xl">Loading applications...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-4xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Applications for {jobTitle}
        </h1>
        {applications.length > 0 ? (
          <ul className="space-y-6">
            {applications.map((app) => (
              <li
                key={app.id}
                className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold">{app.full_name}</h2>
                    <p className="text-gray-500 mt-1">{app.email}</p>
                    <p className="text-gray-500 mt-1">{app.phone}</p>
                  </div>
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View Resume
                  </a>
                </div>
                {app.cover_letter && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">Cover Letter</h3>
                    <p className="text-gray-700 mt-2">{app.cover_letter}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">No applications received for this job yet.</p>
        )}
      </div>
    </>
  );
}

export default JobApplicationsPage;

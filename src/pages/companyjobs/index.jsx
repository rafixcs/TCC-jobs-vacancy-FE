import { useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from '../../components/header';
import { apiHandler } from '../../utils/apihandler';

const jobsData = {
  1: [
    { id: 1, title: 'Frontend Developer', location: 'New York' },
    { id: 2, title: 'Backend Developer', location: 'Remote' }
  ],
  2: [
    { id: 3, title: 'Solar Engineer', location: 'San Francisco' },
    { id: 4, title: 'Sustainability Analyst', location: 'Remote' }
  ],
  3: [
    { id: 5, title: 'Marketing Manager', location: 'Los Angeles' },
    { id: 6, title: 'Content Strategist', location: 'Remote' }
  ]
};

const companyData = {
  1: 'Tech Solutions',
  2: 'Green Energy Corp',
  3: 'Marketing World'
};

const CompanyJobs = () => {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [ companyName, setCompanyName ] = useState("")


  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)


  useEffect(() => {
    const name = queryParams.get("name")
    setCompanyName(name)

    apiHandler(`company/jobs?company=${name}`, "GET").then(async (response) => {
      if (response.ok) {
        const data = await response.json()
        console.log(data)
        setJobs(data.job_vacancies)
        setLoading(false)
        setError(null)
      } else {
        setError("could not get company jobs vacancy")
        setLoading(false)
      }
    }).catch((reason) => {
      setError(reason)
      setLoading(false)
    })

  }, [])

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

  if (error) {
    return (
      <>
        <Header />
        <div className="flex items-center justify-center h-[90vh]">
          <p className="text-gray-600 text-xl">Unable to get jobs list</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto mt-10 max-w-5xl">
        <h1 className="text-3xl font-bold mb-5">{companyName} - Job Vacancies</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.length > 0 ? (
            jobs.map(job => (
              <Link
                key={job.id}
                to={`/jobs/${job.id}`}
                className="block p-5 bg-white shadow-lg hover:shadow-xl transition duration-300 rounded-lg"
              >
                <h2 className="text-xl font-semibold">{job.title}</h2>
                <p className="text-gray-500">{job.location}</p>
              </Link>
            ))
          ) : (
            <p>No job vacancies available for this company.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CompanyJobs;

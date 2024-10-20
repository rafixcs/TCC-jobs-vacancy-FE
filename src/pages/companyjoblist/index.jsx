import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/header';

function CompanyJobList() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API endpoint and include authentication headers if necessary
    /*fetch('https://api.example.com/company/jobs', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`, // Include auth token if required
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching company jobs:', error);
        setLoading(false);
      });*/

      const jobs_sample = [
        { id: 1, company: 'TechCorp', title: 'Frontend Developer', location: "teste0", postedAt: "2024-10-12" },
        { id: 2, company: 'DataSoft', title: 'Backend Engineer', location: "teste1", postedAt: "2024-10-13" },
        { id: 3, company: 'WebSolutions', title: 'Full Stack Developer', location: "teste2", postedAt: "2024-10-14" },
        // Add more job listings as needed
      ];

      setJobs(jobs_sample)
      setLoading(false)


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
                <Link to={`/company/jobs/${job.id}/applications`} className="block">
                  <h2 className="text-2xl font-semibold">{job.title}</h2>
                  <p className="text-gray-500 mt-2">{job.location}</p>
                  <p className="text-gray-400 text-sm mt-1">
                    Posted on {new Date(job.postedAt).toLocaleDateString()}
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

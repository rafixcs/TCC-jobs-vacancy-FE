import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../../components/header';

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
  const { id } = useParams();
  const jobs = jobsData[1] || [];
  const companyName = companyData[1] || 'Unknown Company';

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

import Header from "../../components/header";
import { useNavigate } from "react-router-dom";

const jobs = [
  { id: 1, company: 'TechCorp', title: 'Frontend Developer' },
  { id: 2, company: 'DataSoft', title: 'Backend Engineer' },
  { id: 3, company: 'WebSolutions', title: 'Full Stack Developer' },
  // Add more job listings as needed
];

export default function JobsList() {

  const navigate = useNavigate()

  function handleJob(job) {
    navigate(`/jobs/${job.id}`)
  }


  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto my-10">
        <h1 className="text-4xl font-bold mb-8 text-center">Job Listings</h1>
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-6 border rounded-lg shadow hover:shadow-lg transition-shadow"
              onClick={() => handleJob(job)}
            >
              <h2 className="text-2xl font-semibold">{job.title}</h2>
              <p className="text-gray-500 mt-2">{job.company}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

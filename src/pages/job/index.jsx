import { useNavigate } from "react-router-dom";
import Header from "../../components/header";

const sampleJob = {
  title: 'Senior Frontend Developer',
  company: 'TechCorp Inc.',
  description:
    'We are looking for a Senior Frontend Developer to join our dynamic team. You will be responsible for building and maintaining web applications that deliver an exceptional user experience.',
  responsibilities: [
    'Develop new user-facing features using React.js',
    'Build reusable components and front-end libraries',
    'Optimize components for maximum performance across devices and browsers',
  ],
  requirements: [
    '5+ years of experience in frontend development',
    'Strong proficiency in JavaScript and React.js',
    'Experience with Tailwind CSS or other CSS frameworks',
    'Familiarity with RESTful APIs',
  ],
  location: 'New York, NY',
  salary: '$120,000 - $140,000 per year',
};

export default function Job({ job }) {

  job = sampleJob
  const navigate = useNavigate()

  function handleApply() {
    navigate("/jobs/123/apply")
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

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Responsibilities</h2>
          <ul className="list-disc list-inside text-gray-700">
            {job.responsibilities.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Requirements</h2>
          <ul className="list-disc list-inside text-gray-700">
            {job.requirements.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
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

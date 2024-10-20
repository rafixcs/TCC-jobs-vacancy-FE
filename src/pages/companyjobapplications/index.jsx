import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';

function JobApplicationsPage() {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the job details to get the job title
    /*fetch(`https://api.example.com/company/jobs/${jobId}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`, // Include auth token if required
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobTitle(data.title);
      })
      .catch((error) => {
        console.error('Error fetching job details:', error);
      });

    // Fetch the applications for the job
    fetch(`https://api.example.com/company/jobs/${jobId}/applications`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`, // Include auth token if required
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setApplications(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching applications:', error);
        setLoading(false);
      });*/

      const applications_sample = [
        {
          "id": 1,
          "fullName": "Alice Johnson",
          "email": "alice.johnson@example.com",
          "phone": "+1 123 456 7890",
          "coverLetter": "I am excited to apply for this position as I have 5 years of experience in software development, specifically in frontend technologies. I am confident that my skills align with the requirements of this role.",
          "resumeUrl": "https://example.com/resumes/alice_johnson_resume.pdf",
          "submittedAt": "2023-10-01T12:00:00Z",
          "status": "pending"
        },
        {
          "id": 2,
          "fullName": "Bob Smith",
          "email": "bob.smith@example.com",
          "phone": "+1 234 567 8901",
          "coverLetter": null,
          "resumeUrl": "https://example.com/resumes/bob_smith_resume.pdf",
          "submittedAt": "2023-10-02T08:30:00Z",
          "status": "under_review"
        },
        {
          "id": 3,
          "fullName": "Catherine Brown",
          "email": "catherine.brown@example.com",
          "phone": "+1 345 678 9012",
          "coverLetter": "I am very interested in this role and believe my background in UX/UI design and React.js development makes me a perfect fit. I am passionate about creating user-friendly and accessible web applications.",
          "resumeUrl": "https://example.com/resumes/catherine_brown_resume.pdf",
          "linkedInProfile": "https://linkedin.com/in/catherinebrown",
          "portfolioUrl": "https://catherinebrownportfolio.com",
          "submittedAt": "2023-10-03T14:45:00Z",
          "status": "pending"
        },
        {
          "id": 4,
          "fullName": "David Lee",
          "email": "david.lee@example.com",
          "phone": "+1 456 789 0123",
          "coverLetter": "I have extensive experience working with cloud infrastructure and distributed systems, making me an ideal candidate for this DevOps position. I am eager to bring my expertise to your team.",
          "resumeUrl": "https://example.com/resumes/david_lee_resume.pdf",
          "submittedAt": "2023-10-04T10:15:00Z",
          "status": "interview_scheduled",
          "interviewDetails": {
            "date": "2023-10-10T14:00:00Z",
            "location": "Online via Zoom",
            "contactPerson": "John Doe",
            "contactEmail": "john.doe@company.com"
          }
        },
        {
          "id": 5,
          "fullName": "Eve Martinez",
          "email": "eve.martinez@example.com",
          "phone": "+1 567 890 1234",
          "coverLetter": "As an experienced marketing manager, I have overseen multiple successful campaigns and led marketing teams to achieve record-breaking results. I am very interested in applying my skills to your marketing team.",
          "resumeUrl": "https://example.com/resumes/eve_martinez_resume.pdf",
          "submittedAt": "2023-10-05T16:00:00Z",
          "status": "rejected",
          "feedback": "We appreciate your interest in the position, but after careful consideration, we have decided to move forward with other candidates who have more specific experience in digital marketing strategies."
        },
      ]

      setApplications(applications_sample)

      setLoading(false)
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
                    <h2 className="text-2xl font-semibold">{app.fullName}</h2>
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
                {app.coverLetter && (
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold">Cover Letter</h3>
                    <p className="text-gray-700 mt-2">{app.coverLetter}</p>
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

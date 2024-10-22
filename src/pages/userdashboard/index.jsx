import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header';

const sampleUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  profilePicture: '/default-profile.png', // Use a default image path
};

// Sample applied jobs data
const sampleAppliedJobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'Tech Solutions',
    appliedAt: '2023-10-01T12:00:00Z',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'Innovatech',
    appliedAt: '2023-10-05T09:30:00Z',
  },
];

// Sample saved jobs data
const sampleSavedJobs = [
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Creative Labs',
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudCorp',
  },
];

function UserDashboard() {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (!sessionStorage.getItem("token") === "") {
      navigate('/login');
    } else {
      //fetchUserData();
      setAppliedJobs(sampleAppliedJobs)
      setSavedJobs(sampleSavedJobs)
      setUser(sampleUser)
      setLoading(false)
    }
  }, []);

  const fetchUserData = async () => {
    try {
      // Fetch applied jobs
      const appliedResponse = await fetch('https://api.example.com/user/applied-jobs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const appliedData = await appliedResponse.json();
      setAppliedJobs(appliedData);

      // Fetch saved jobs
      const savedResponse = await fetch('https://api.example.com/user/saved-jobs', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const savedData = await savedResponse.json();
      setSavedJobs(savedData);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-xl">Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-5xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        {/* User Profile */}
        <div className="flex items-center mb-8">
          <img
            src={user.profilePicture || '/default-profile.png'}
            alt="Profile"
            className="w-24 h-24 rounded-full mr-6"
          />
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* Applied Jobs */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
          {appliedJobs.length > 0 ? (
            <ul className="space-y-4">
              {appliedJobs.map((job) => (
                <li key={job.id} className="p-4 border rounded-lg shadow">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                  <p className="text-gray-400 text-sm">
                    Applied on {new Date(job.appliedAt).toLocaleDateString()}
                  </p>
                  {/* Link to job details */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have not applied to any jobs yet.</p>
          )}
        </div>

        {/* Saved Jobs */}
        {/* Future feature
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Saved Jobs</h2>
          {savedJobs.length > 0 ? (
            <ul className="space-y-4">
              {savedJobs.map((job) => (
                <li key={job.id} className="p-4 border rounded-lg shadow">
                  <h3 className="text-xl font-semibold">{job.title}</h3>
                  <p className="text-gray-500">{job.company}</p>
                  <button
                    className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    onClick={() => removeSavedJob(job.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">You have no saved jobs.</p>
          )}
        </div>
        */}

        {/* Account Settings */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Account Settings</h2>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigate('/user/account-settings')}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;

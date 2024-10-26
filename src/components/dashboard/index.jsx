import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CompanyJobListings from '../../components/companyjoblisting'
import { apiHandler } from '../../utils/apihandler';
import { AuthContext } from '../../provider/authcontext';

function UserDashboard() {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState([]);
  //const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userRoleId, user, isAuthenticated } = useContext(AuthContext);
  const isCompany = userRoleId === 1;

  useEffect(() => {
    console.log(isAuthenticated)
    console.log(user)
    console.log(userRoleId)

    if (!sessionStorage.getItem("token") === "") {
      navigate('/login');
    } else {
      fetchUserData();
      //setAppliedJobs(sampleAppliedJobs)
      //setSavedJobs(sampleSavedJobs)
      //setUser(sampleUser)
      //setLoading(false)
    }
  }, []);

  const fetchUserData = async () => {
    try {
      const appliedResponse = await apiHandler("job/user", "GET")
      const appliedData = await appliedResponse.json();
      console.log(appliedData)
      setAppliedJobs(appliedData.JobApplies);
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

  if (!user) {
    return (
        <div className="flex items-center justify-center h-screen">
          <p className="text-gray-600 text-xl">Couldn't load user info...</p>
        </div>
      );
  }

  return (
    <>
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

        {/* Company-Specific Section */}
        {isCompany && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Your Job Listings</h2>
            <CompanyJobListings isHideTitle={true} />
          </div>
        )}

        {/* Applied Jobs */}
        {!isCompany && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Applied Jobs</h2>
            {appliedJobs.length > 0 ? (
              <ul className="space-y-4">
                {appliedJobs.map((job) => (
                  <li key={job.id} className="p-4 border rounded-lg shadow">
                    <h3 className="text-xl font-semibold">{job.JobInfo.title}</h3>
                    <p className="text-gray-500">{job.JobInfo.company}</p>
                    <p className="text-gray-400 text-sm">
                      Applied on {new Date(job.JobInfo.creation_date).toLocaleDateString()}
                    </p>
                    {/* Link to job details */}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-600">You have not applied to any jobs yet.</p>
            )}
          </div>
        )}

        {/* Saved Jobs - NOT IMPLEMENTED*/}
        {!isCompany && false && (
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
        )}

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

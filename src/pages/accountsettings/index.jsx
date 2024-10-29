import { useState, useEffect, useContext } from 'react';
import Header from '../../components/header';
import { AuthContext } from '../../provider/authcontext';
import { apiHandler } from '../../utils/apihandler';

const sampleUser = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    profilePicture: '/default-profile.png', // Use a default image path
  };

function AccountSettings() {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    profilePicture: '',
    phone: '',
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [profileMessage, setProfileMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture || '',
        phone: user.phone,
      });
      
    }    
  }, [user]);

  // Handle profile form submission
  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!profileData.name || !profileData.email) {
      setProfileMessage('Name and email are required.');
      return;
    }

    try {
      // Send update request to the API
      const response = await apiHandler("user", "PUT", null, profileData)

      if (!response.ok) {
        throw new Error('Failed to update profile.');
      }

      setProfileMessage('Profile updated successfully.');
    } catch (error) {
      console.error('Error updating profile:', error);
      setProfileMessage('An error occurred while updating your profile.');
    }
  };

  // Handle password form submission
  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setPasswordMessage('All password fields are required.');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('New password and confirm password do not match.');
      return;
    }

    try {
      // Send password change request to the API
      const response = await apiHandler("user/password", "PUT", null, {
        old_password: passwordData.currentPassword,
        new_password: passwordData.newPassword,
      })

      if (!response.ok) {
        throw new Error('Failed to change password.');
      }

      setPasswordMessage('Password changed successfully.');
      // Clear password fields
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordMessage('An error occurred while changing your password.');
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-3xl mx-auto my-10 p-6 bg-white rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-6">Account Settings</h1>

        {/* Profile Update Form */}
        <form onSubmit={handleProfileSubmit} className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          {profileMessage && <p className="mb-4 text-red-500">{profileMessage}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="phone"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          {/* Profile Picture Upload (Optional) */}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Profile Picture URL</label>
            <input
              type="text"
              value={profileData.profilePicture}
              onChange={(e) => setProfileData({ ...profileData, profilePicture: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Update Profile
          </button>
        </form>

        {/* Password Change Form */}
        <form onSubmit={handlePasswordSubmit}>
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          {passwordMessage && <p className="mb-4 text-red-500">{passwordMessage}</p>}

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, currentPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, newPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Confirm New Password</label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                setPasswordData({ ...passwordData, confirmPassword: e.target.value })
              }
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </>
  );
}

export default AccountSettings;

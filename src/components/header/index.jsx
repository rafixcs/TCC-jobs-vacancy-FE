// Header.js
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../provider/authcontext';

const Header = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    // Optionally, redirect to home page or login page
  };

  console.log(`header user: ${user}`)

  return (
    <header className="bg-gradient-to-r from-slate-500 to-slate-200 shadow sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-6">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold">
          <Link to="/">JobFinder</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link to="/" className="text-gray-700 hover:text-blue-500">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="text-gray-700 hover:text-blue-500">
              Jobs
            </Link>
          </li>
          <li>
            <Link to="/companies" className="text-gray-700 hover:text-blue-500">
              Companies
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-gray-700 hover:text-blue-500">
              About
            </Link>
          </li>

          {isAuthenticated ? (
            <>
              <li>
                <Link to="/user/dashboard" className="text-gray-700 hover:text-blue-500">
                  Account
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-blue-500 focus:outline-none"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/signup" className="text-gray-700 hover:text-blue-500">
                Login
              </Link>
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {/* Implement mobile menu toggle if needed */}
        </div>
      </nav>
    </header>
  );
};

export default Header;

// src/components/Header.jsx
import { Link } from 'react-router-dom';
import "../../output.css"

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-slate-500 to-slate-200 shadow sticky top-0 z-50">
      <nav className="container mx-auto flex justify-between items-center p-6">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold">
          <Link to="/">JobFinder</Link>
        </div>

        {/* Navigation Links */}
        <ul className="hidden md:flex space-x-6">
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
          <li>
            <Link to="/contact" className="text-gray-700 hover:text-blue-500">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/signup" className="text-gray-700 hover:text-blue-500">
              Login
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
        </div>
      </nav>
    </header>
  );
};

export default Header;

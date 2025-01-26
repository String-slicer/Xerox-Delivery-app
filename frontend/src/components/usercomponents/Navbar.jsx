import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaReceipt, FaCog, FaSignOutAlt, FaBars, FaTimes, FaHome } from 'react-icons/fa';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="bg-[#1D2A36] text-[#F8F9FB] absolute z-[999] w-full border-b border-[#32415D]">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo section */}
        <Link to="/userHome" className="flex items-center space-x-3">
          <div className="size-6">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <span className="text-xl font-bold">Xerox</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8">
          <li>
            <Link to="/userHome" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link to="/userProfile" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
              <FaUser className="text-lg" />
              <span>Profile</span>
            </Link>
          </li>
          <li>
            <Link to="/userOrders" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
              <FaReceipt className="text-lg" />
              <span>Orders</span>
            </Link>
          </li>
          <li>
            <Link to="/userSettings" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
              <FaCog className="text-lg" />
              <span>Settings</span>
            </Link>
          </li>
          <li>
            <button 
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-lg font-medium hover:bg-[#f3bc3a] transition-colors"
            >
              <FaSignOutAlt className="text-lg" />
              <span>Logout</span>
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-2xl" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#29374C] border-t border-[#32415D]">
          <ul className="px-6 py-4 space-y-4">
            <li>
              <Link to="/userHome" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
                <FaHome className="text-lg" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/userProfile" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
                <FaUser className="text-lg" />
                <span>Profile</span>
              </Link>
            </li>
            <li>
              <Link to="/orders" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
                <FaReceipt className="text-lg" />
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/userSettings" className="flex items-center space-x-2 hover:text-[#F4C753] transition-colors">
                <FaCog className="text-lg" />
                <span>Settings</span>
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex w-full items-center space-x-2 bg-[#F4C753] text-[#141C24] px-4 py-2 rounded-lg font-medium hover:bg-[#f3bc3a] transition-colors"
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = ({ setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activePage, setActivePageState] = useState('dashboard');
  const navigate=useNavigate();

  const navItems = [
    { label: 'Dashboard', action: 'dashboard' },
    { label: 'New Orders', action: 'newOrders' },
    { label: 'Track Orders', action: 'trackOrders' },
    { label: 'Profile', action: 'profile' },
    {label:'Past Orders',action:'storeOrders'}
  ];

  const handleNavClick = (action) => {
    setActivePage(action);
    setActivePageState(action);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#1D2A36] border-b border-[#32415D] text-white shadow-lg w-full fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold flex items-center space-x-2">
          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14h-2v-4H6v-2h4V7h2v4h4v2h-4v4z"/>
          </svg>
          <Link to="/" className="hover:text-blue-100">Xerox Store</Link>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.action}>
              <button
                onClick={() => handleNavClick(item.action)}
                className={`px-3 py-2 rounded-lg transition-colors duration-200 text-[#F8F9FB] relative
                  ${activePage === item.action ? 'bg-[#29374C]' : 'hover:bg-[#29374C]'}`}
              >
                {item.label}
                {activePage === item.action && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F4C753]"></div>
                )}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/logout"
              className="bg-[#F4C753] hover:bg-[#f4c753ee] text-[#141C24] px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Logout
            </Link>
          </li>
        </ul>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "×" : "☰"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-[#1D2A36] border-t border-[#32415D] shadow-xl">
          <ul className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <li key={item.action}>
                <button
                  onClick={() => handleNavClick(item.action)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 text-[#F8F9FB] relative
                    ${activePage === item.action ? 'bg-[#29374C]' : 'hover:bg-[#29374C]'}`}
                >
                  {item.label}
                  {activePage === item.action && (
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F4C753]"></div>
                  )}
                </button>
              </li>
            ))}
            <li>
              <Link
                to="/logout"
                className="block px-3 py-2 text-[#F4C753] hover:bg-[#29374C] rounded-lg transition-colors duration-200"
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

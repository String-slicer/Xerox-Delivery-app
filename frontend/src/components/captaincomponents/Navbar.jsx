import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX, HiHome } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { BsBoxSeam } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { captainlogout } from "../../slices/captainSlice";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();
    
    // Dispatch logout action
    dispatch(captainlogout());
    
    // Navigate to landing page
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path 
      ? "text-[#F4C753] bg-[#29374C] rounded-lg" 
      : "text-[#F8F9FB] hover:bg-[#29374C] hover:rounded-lg";
  };

  return (
    <nav className="bg-[#131C24] border-b border-[#29374C] fixed w-full top-0 z-[9999]">
      <div className="container mx-auto px-2 sm:px-4 lg:px-8 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 sm:gap-3 text-[#F8F9FB]">
            <div className="size-4 sm:size-5">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-[#F8F9FB] text-sm sm:text-base lg:text-lg font-bold">Xerox</h2>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-2 lg:space-x-4 xl:space-x-6 items-center">
            <li>
              <Link to="/captainHome" className={`flex items-center gap-2 text-sm font-medium p-2 transition-all duration-200 ${isActive('/captainHome')}`}>
                <HiHome className="text-xl" />
                Home
              </Link>
            </li>
            <li>
              <Link to="/captainProfile" className={`flex items-center gap-2 text-sm font-medium p-2 transition-all duration-200 ${isActive('/captainProfile')}`}>
                <CgProfile className="text-xl" />
                Profile
              </Link>
            </li>
            <li>
              <Link to="/captainOrders" className={`flex items-center gap-2 text-sm font-medium p-2 transition-all duration-200 ${isActive('/captainOrders')}`}>
                <BsBoxSeam className="text-xl" />
                Orders
              </Link>
            </li>
            <li>
              <Link to="/captainSettings" className={`flex items-center gap-2 text-sm font-medium p-2 transition-all duration-200 ${isActive('/captainSettings')}`}>
                <IoSettingsOutline className="text-xl" />
                Settings
              </Link>
            </li>
            <li>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 min-w-[84px] cursor-pointer justify-center rounded-xl h-9 sm:h-10 px-3 sm:px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold hover:bg-[#f3be2c] transition-all duration-200"
              >
                <BiLogOut className="text-xl" />
                Logout
              </button>
            </li>
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="block md:hidden text-[#F8F9FB] p-1 hover:bg-[#29374C] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <HiX className="text-2xl" />
            ) : (
              <HiMenu className="text-2xl" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#1D2A36] border-t border-[#29374C] absolute left-0 right-0 mt-2 shadow-lg z-[9999]">
            <ul className="px-3 py-2 space-y-1">
              <li>
                <Link to="/captainHome" 
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/captainHome')}`}
                      onClick={() => setIsMenuOpen(false)}>
                  <HiHome className="text-xl" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/captainProfile" 
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/captainProfile')}`}
                      onClick={() => setIsMenuOpen(false)}>
                  <CgProfile className="text-xl" />
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/captainOrders"
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/captainOrders')}`}
                      onClick={() => setIsMenuOpen(false)}>
                  <BsBoxSeam className="text-xl" />
                  Orders
                </Link>
              </li>
              <li>
                <Link to="/captainSettings"
                      className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-200 rounded-lg ${isActive('/captainSettings')}`}
                      onClick={() => setIsMenuOpen(false)}>
                  <IoSettingsOutline className="text-xl" />
                  Settings
                </Link>
              </li>
              <li className="py-2">
                <button 
                  onClick={handleLogout}
                  className="w-full text-center py-2.5 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold rounded-lg hover:bg-[#f3be2c] transition-all duration-200 flex items-center justify-center gap-2">
                  <BiLogOut className="text-xl" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

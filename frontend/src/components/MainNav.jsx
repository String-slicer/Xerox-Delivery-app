import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function MainNav(){
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignIn = () => {
    navigate('/middle-login');
  };

  return (
    <header className="flex flex-col border-b border-solid border-b-[#29374C] bg-[#131C24] ">
      <div className="flex items-center justify-between px-4 py-3 lg:px-10">
        <div className="flex items-center gap-4 text-[#F8F9FB]">
          <div className="size-4">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
            </svg>
          </div>
          <h2 className="text-[#F8F9FB] text-lg font-bold leading-tight">Printify</h2>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="lg:hidden text-[#F8F9FB] hover:text-[#F4C753]"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop navigation */}
        <div className="hidden lg:flex flex-1 justify-end gap-8">
          <div className="flex items-center gap-9">
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="/delivery-steps">
              How it works
            </a>
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="#">
              Ecosystem
            </a>
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="#">
              FAQ
            </a>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleSignIn}
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold hover:bg-[#f5d47d]"
            >
              <span className="truncate">Sign In</span>
            </button>
            <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold hover:bg-[#364863]">
              <span className="truncate">Get started</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-[#29374C]">
          <div className="flex flex-col space-y-3 px-4 py-3">
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="/delivery-steps">
              How it works
            </a>
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="#">
              Ecosystem
            </a>
            <a className="text-[#F8F9FB] text-sm font-medium hover:text-[#F4C753]" href="#">
              FAQ
            </a>
            <div className="flex flex-col gap-2 pt-2">
              <button 
                onClick={handleSignIn}
                className="flex cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold hover:bg-[#f5d47d]"
              >
                <span className="truncate">Sign In</span>
              </button>
              <button className="flex cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold hover:bg-[#364863]">
                <span className="truncate">Get started</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default MainNav;

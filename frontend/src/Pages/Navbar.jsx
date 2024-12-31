import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
   <header className="flex items-center justify-between border-b border-solid border-b-[#29374C] px-10 py-3">
            <div className="flex items-center gap-4 text-[#F8F9FB]">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" fill="currentColor"></path>
                </svg>
              </div>
              <h2 className="text-[#F8F9FB] text-lg font-bold leading-tight">Xerox</h2>
            </div>
            <div className="flex flex-1 justify-end gap-8">
              <div className="flex items-center gap-9">
                <a className="text-[#F8F9FB] text-sm font-medium" href="#">How it works</a>
                <a className="text-[#F8F9FB] text-sm font-medium" href="#">Ecosystem</a>
                <a className="text-[#F8F9FB] text-sm font-medium" href="#">FAQ</a>
              </div>
              <div className="flex gap-2">
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#F4C753] text-[#141C24] text-sm font-bold">
                  <span className="truncate">Sign In</span>
                </button>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center rounded-xl h-10 px-4 bg-[#29374C] text-[#F8F9FB] text-sm font-bold">
                  <span className="truncate">Get started</span>
                </button>
              </div>
            </div>
          </header>
  
  );
};

export default Navbar;

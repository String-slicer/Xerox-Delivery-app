import React, { useState } from "react";
import { useNavigate } from "react-router";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white absolute z-[1000000] w-full ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <a href="/">MyApp</a>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8">
          <li>
            <a href="#home" className="hover:underline">
              Profile
            </a>
          </li>
          <li>
          <button onClick={()=>navigate("/captainOrders")} className="hover:underline">
              Orders
            </button>
          </li>
          <li>
            <a href="#services" className="hover:underline">
              settings
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
                Logout
            </a>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="block md:hidden text-2xl"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="md:hidden  space-y-4 px-4 py-3">
          <li>
            <a href="#home" className="block hover:underline">
            Profile
            </a>
          </li>
          <li>
            <a href="#about" className="block hover:underline">
            Orders
            </a>
          </li>
          <li>
            <a href="#services" className="block hover:underline">
            settings
            </a>
          </li>
          <li>
            <a href="#contact" className="block hover:underline">
            Logout
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

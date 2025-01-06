import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

const Navbar = ({ setActivePage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate=useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 text-white w-full">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <Link to="/">Xerox Store</Link>
        </div>

        <ul className="hidden md:flex space-x-8">
          <li>
            <button onClick={() => setActivePage('dashboard')} className="hover:underline">
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('newOrders')} className="hover:underline">
              New Orders
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('trackOrders')} className="hover:underline">
              Track Orders
            </button>
          </li>
          <li>
            <button onClick={()=>navigate("/storeOrders")} className="hover:underline">
              Past Orders
            </button>
          </li>
          <li>
            <Link to="/logout" className="hover:underline">
              Logout
            </Link>
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
        <ul className="md:hidden bg-blue-700 space-y-4 px-4 py-3">
          <li>
            <button onClick={() => setActivePage('dashboard')} className="block hover:underline">
              Dashboard
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('newOrders')} className="block hover:underline">
              New Orders
            </button>
          </li>
          <li>
            <button onClick={() => setActivePage('trackOrders')} className="block hover:underline">
              Track Orders
            </button>
          </li>
          <li>
            <Link to="/logout" className="block hover:underline">
              Logout
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;

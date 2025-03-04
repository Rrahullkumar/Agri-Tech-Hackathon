// Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavbarVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center bg-transparent transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"}`}>
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-green-600">Parali</span>
        <span className="text-yellow-400">Bazar</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-6">
          <Link to="/" className="nav-link">Home</Link>
          
          {/* Services Dropdown */}
          <div className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
            <button className="nav-link">Our Services</button>
            {isServicesDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/sell-stubble" className="dropdown-item">Sell Stubble</Link>
                <Link to="/buy-stubble" className="dropdown-item">Buy Stubble</Link>
              </div>
            )}
          </div>

          <Link to="/how-it-works" className="nav-link">How It Works</Link>
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/about-us" className="nav-link">About Us</Link>
        </div>

        {/* Login Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setLoginDropdownOpen(!isLoginDropdownOpen)}
            className="nav-link"
          >
            Login
          </button>
          {isLoginDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/seller-login" className="dropdown-item">Seller Login</Link>
              <Link to="/buyer-login" className="dropdown-item">Buyer Login</Link>
              <Link to="/logistics-login" className="dropdown-item">Logistics Login</Link>
            </div>
          )}
        </div>

        <Link to="/signup" className="green-button">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
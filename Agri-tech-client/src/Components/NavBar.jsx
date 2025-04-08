import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleTranslate from "./GoogleTranslate";

const Navbar = () => {
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Check for logged-in user on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("seller");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Handle scroll for navbar visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setNavbarVisible(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".services-dropdown") &&
        !e.target.closest(".login-dropdown") &&
        !e.target.closest(".profile-dropdown")
      ) {
        setServicesDropdownOpen(false);
        setLoginDropdownOpen(false);
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("seller");
    setUser(null);
    setProfileDropdownOpen(false);
    navigate("/");
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center backdrop-blur-md bg-white/30 transition-transform duration-300 ${isNavbarVisible ? "translate-y-0" : "-translate-y-full"
        }`}
    >
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold">
        <span className="text-green-600">Parali</span>
        <span className="text-yellow-400">Bazar</span>
      </Link>

      {/* Navigation Links */}
      <div className="flex items-center space-x-8">
        <div className="flex items-center space-x-6">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {/* Services Dropdown */}
          <div className="relative services-dropdown">
            <button
              onClick={() => setServicesDropdownOpen(!isServicesDropdownOpen)}
              className="nav-link flex items-center gap-1"
            >
              Our Services
              <svg
                className={`w-4 h-4 transition-transform ${isServicesDropdownOpen ? "rotate-180" : ""
                  }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isServicesDropdownOpen && (
              <div className="dropdown-menu absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <Link
                  to="/sell-stubble"
                  className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
                >
                  Sell Stubble
                </Link>
                <Link
                  to="/buy-stubble"
                  className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
                >
                  Buy Stubble
                </Link>
                <Link
                  to="/logistics"
                  className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
                >
                  Dashboard
                </Link>
              </div>
            )}
          </div>

          <Link to="/how-it-works" className="nav-link">
            How It Works
          </Link>
          <Link to="/blog" className="nav-link">
            Blog
          </Link>
          <Link to="/about-us" className="nav-link">
            About Us
          </Link>
          <Link to="/workshop-Demo" className="nav-link">
            Workshop and demo
          </Link>

        </div>

        <div className="hidden sm:block">
          <GoogleTranslate />
        </div>

        {/* Login Dropdown */}
        <div className="relative login-dropdown">
          <button
            onClick={() => setLoginDropdownOpen(!isLoginDropdownOpen)}
            className="nav-link flex items-center gap-1"
          >
            Login
            <svg
              className={`w-4 h-4 transition-transform ${isLoginDropdownOpen ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {isLoginDropdownOpen && (
            <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
              <Link
                to="/seller-login"
                className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Seller Login
              </Link>
              <Link
                to="/buyer-login"
                className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Buyer Login
              </Link>
              {/* <Link
                to="/logistics-login"
                className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Logistics Login
              </Link> */}
            </div>
          )}
        </div>

        {user ? (
          <div className="relative profile-dropdown inline-block text-left">
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents outside click handler from firing
                setProfileDropdownOpen(!isProfileDropdownOpen);
              }}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                <span className="font-medium">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              </div>
            </button>

            {isProfileDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl z-50 p-4 max-w-[90vw]"
                onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside dropdown
              >
                <div className="mb-4 space-y-2">
                  <h3 className="font-semibold text-gray-800 truncate">{user.name}</h3>
                  <p className="text-sm text-gray-600 truncate">{user.email}</p>
                  <p className="text-sm text-gray-600 truncate">{user.phone}</p>
                  <p className="text-sm text-gray-600 line-clamp-2">{user.address}</p>
                </div>
                <div className="border-t pt-3 space-y-2">
                  <Link
                    to="/edit-profile"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-green-50 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                    Edit Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signup" className="green-button">
            Signup
          </Link>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
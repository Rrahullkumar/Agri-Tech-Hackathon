import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [isLoginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [isNavbarVisible, setNavbarVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

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
        !e.target.closest(".login-dropdown")
      ) {
        setServicesDropdownOpen(false);
        setLoginDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  // useEffect(()=>{
  //   const script = document.createElement("script");
  //   script.src =  "https://cdn.jsdelivr.net/npm/google-translate-api-extended@2.3.1/index.min.js";
  //   document.body.appendChild(script);

    // window.googleTranslateElementInit= () => {

    // }

  //   new google.translate.TranslateElement(
  //     {
  //       pageLanguage: "en",
  //       includedLanguages: "en, es, fr, hi",
  //       layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
  //     },
  //     "google_translate_element"
  //   )
  // },[])

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 p-4 flex justify-between items-center backdrop-blur-md bg-white/30 transition-transform duration-300 ${
        isNavbarVisible ? "translate-y-0" : "-translate-y-full"
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
                className={`w-4 h-4 transition-transform ${
                  isServicesDropdownOpen ? "rotate-180" : ""
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
          {/* <Link to="/Chat-bot" className="nav-link">
            Chat bot
          </Link> */}
        </div>

        {/* Login Dropdown */}
        <div className="relative login-dropdown">
          <button
            onClick={() => setLoginDropdownOpen(!isLoginDropdownOpen)}
            className="nav-link flex items-center gap-1"
          >
            Login
            <svg
              className={`w-4 h-4 transition-transform ${
                isLoginDropdownOpen ? "rotate-180" : ""
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
              <Link
                to="/logistics-login"
                className="dropdown-item block px-4 py-2 text-gray-700 hover:bg-green-50"
              >
                Logistics Login
              </Link>
            </div>
          )}
        </div>

        <Link to="/signup" className="green-button">
          Signup
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
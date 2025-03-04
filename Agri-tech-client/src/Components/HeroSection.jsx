import React from "react";
import { FaLeaf, FaSearch, FaShoppingCart, FaTruck } from "react-icons/fa"; // Importing a leaf icon from react-icons

const HeroSection = () => {
  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/assets/Village1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Subtle Blur Overlay */}
      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>

      {/* Content Section */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-8 bg-white/10 backdrop-blur-xsm rounded-lg p-6">
        {/* Main Heading - Slides in from top */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-1000 ease-out translate-y-[-10px] opacity-0 animate-slide-in">
          <span className="text-black">
            Solving the Stubble Burning{" "}
            <span className="border-b-2 border-red-400 text-black">
              Problem
            </span>
          </span>
        </h1>

        {/* Subheading - Slides in from bottom */}
        <p className="text-lg md:text-xl mb-5 max-w-2xl mx-auto leading-relaxed transform transition-all duration-1000 ease-out translate-y-[10px] opacity-0 animate-slide-in delay-200">
          A sustainable and practical solution connecting farmers with buyers to
          efficiently manage crop residue and reduce pollution.
        </p>
      </div>


      {/* Services and Highlights Section */}
      <div className="relative z-10 w-11/12 max-w-5xl grid md:grid-cols-2 gap-8 mt-16">
        {/* Services Offered Card - Slides in from left */}
        <div className="bg-white/95 p-8 rounded-2xl shadow-2xl backdrop-blur-sm border border-white/20 hover:shadow-green-200/30  transform transition-all duration-1000 ease-out translate-x-[-50px] opacity-0 animate-slide-in delay-600">
          {/* Favicon-like icon next to the heading */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <FaLeaf className="text-3xl text-green-600" /> {/* Leaf icon */}
            <h2 className="text-2xl font-bold text-green-800">Our Services</h2>
          </div>
          <ul className="space-y-3 text-green-900">
            <li className="flex items-center space-x-3">
              <span className="text-green-500">
                <FaLeaf className="text-green-500" />
              </span>
              <span>Farmers list stubble for sale</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">
                <FaSearch className="text-green-500" />
              </span>
              <span>Buyers search & place orders</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">
                <FaShoppingCart className="text-green-500" />
              </span>
              <span>Order & transaction management</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-green-500">
                <FaTruck className="text-green-500" />
              </span>
              <span>Logistics & real-time tracking</span>
            </li>
          </ul>
        </div>

        {/* Impact Card - Slides in from right */}
        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-8 rounded-2xl shadow-2xl hover:shadow-yellow-200/30  transform transition-all duration-1000 ease-out translate-x-[50px] opacity-0 animate-slide-in delay-800">
          <h2 className="text-2xl font-bold mb-4 text-white">Our Impact</h2>
          <p className="text-lg text-white/90 mb-6">
            Helping reduce pollution & increase farmer earnings
          </p>
          <div className="grid grid-cols-2 gap-4 text-white">
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-4xl font-bold">322+</p>
              <p className="text-sm">Farms Connected</p>
            </div>
            <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm">
              <p className="text-4xl font-bold">291+</p>
              <p className="text-sm">Active Buyers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
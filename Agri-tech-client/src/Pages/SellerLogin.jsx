import React, { useState } from "react";
import { FaUser, FaLock, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const SellerLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-600 to-green-100">
      <div className="relative w-[70%] h-[70vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden">
        {/* Image Section */}
        <div className={`w-1/2 h-full transition-all duration-700 ease-in-out ${isRegister ? "translate-x-full" : "translate-x-0"} flex-shrink-0`}>
          <img
            src="/assets/farmer-1.jpg"
            alt="Farmer"
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Form Section */}
        <div className={`w-1/2 h-full flex flex-col bg-white transition-all duration-700 ease-in-out ${isRegister ? "-translate-x-full" : "translate-x-0"}`}>
          <div className="p-8 overflow-y-auto flex-1">
            <h2 className="text-4xl font-bold text-green-800 mb-2">
              {isRegister ? "Create Seller Account" : "Welcome Back!"}
            </h2>
            <p className="text-gray-600">
              {isRegister ? "Join our agricultural community" : "Sign in to manage your stubble sales"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 mt-4">
              {isRegister && (
                <>
                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FaUser className="mr-2 text-green-600" /> Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FaPhone className="mr-2 text-green-600" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-green-600" /> Farm Address
                    </label>
                    <textarea
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 h-32"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaEnvelope className="mr-2 text-green-600" /> Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 flex items-center">
                  <FaLock className="mr-2 text-green-600" /> Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  minLength="6"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500"
                />
              </div>

              <button type="submit" className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all">
                {isRegister ? "Register Now" : "Sign In"}
              </button>
            </form>
          </div>

          <p className="text-center text-gray-600 mb-4">
            {isRegister ? "Already have an account? " : "New seller? "}
            <button onClick={() => setIsRegister(!isRegister)} className="text-green-600 font-semibold hover:text-green-700">
              {isRegister ? "Sign In instead" : "Create account"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerLogin;
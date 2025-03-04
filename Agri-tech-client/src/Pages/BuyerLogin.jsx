import React, { useState } from "react";
import { FaUser, FaLock, FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const BuyerLogin = () => {
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
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center "
            style={{ backgroundImage: "url('/assets/buyerbg-2.webp')" }}
        >
            <div className="relative w-[70%] h-[70vh] bg-white rounded-2xl shadow-2xl flex overflow-hidden">
                {/* Image Section */}
                <div className={`w-1/2 h-full transition-all duration-700 ease-in-out ${isRegister ? "translate-x-full" : "translate-x-0"} flex-shrink-0`}>
                    <img
                        src="/assets/Buyer.webp"
                        alt="Buyer"
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                {/* Form Section */}
                <div className={`w-1/2 h-full flex flex-col bg-white transition-all duration-700 ease-in-out ${isRegister ? "-translate-x-full" : "translate-x-0"}`}>
                    <div className="p-8 overflow-y-auto flex-1">
                        <h2 className="text-4xl font-bold text-blue-800 mb-2">
                            {isRegister ? "Create Buyer Account" : "Welcome Back!"}
                        </h2>
                        <p className="text-gray-600">
                            {isRegister ? "Join our marketplace" : "Sign in to browse and buy"}
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
                            {isRegister && (
                                <>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <FaUser className="mr-2 text-blue-600" /> Full Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <FaPhone className="mr-2 text-blue-600" /> Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium text-gray-700 flex items-center">
                                            <FaMapMarkerAlt className="mr-2 text-blue-600" /> Location
                                        </label>
                                        <textarea
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
                                        />
                                    </div>
                                </>
                            )}

                            <div>
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaEnvelope className="mr-2 text-blue-600" /> Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium text-gray-700 flex items-center">
                                    <FaLock className="mr-2 text-blue-600" /> Password
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    minLength="6"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>

                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all">
                                {isRegister ? "Register Now" : "Sign In"}
                            </button>
                        </form>
                    </div>

                    <p className="text-center text-gray-600 mb-4">
                        {isRegister ? "Already have an account? " : "New buyer? "}
                        <button onClick={() => setIsRegister(!isRegister)} className="text-blue-600 font-semibold hover:text-blue-700">
                            {isRegister ? "Sign In instead" : "Create account"}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BuyerLogin;
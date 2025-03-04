import React, { useState } from 'react';
import { FaLeaf, FaTractor, FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from 'react-icons/fa';
import { TbPlant2 } from 'react-icons/tb';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your subscription logic here
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  return (
    <footer className="relative bg-gradient-to-b from-green-700 to-green-900 text-white pt-16">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 right-0 h-12 -translate-y-full bg-[url('/assets/wave.svg')] bg-cover opacity-50"></div>
      <TbPlant2 className="absolute top-8 right-12 text-6xl text-green-300/20 rotate-45" />
      <FaTractor className="absolute bottom-16 left-8 text-4xl text-yellow-400/30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-3 gap-12 pb-12 relative z-10">
          {/* Brand Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <FaLeaf className="w-8 h-8 text-yellow-400 animate-pulse" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-yellow-300 to-green-400 bg-clip-text text-transparent">
                ParaliBazar
              </h3>
            </div>
            <p className="text-sm text-green-100 leading-relaxed">
              Cultivating sustainable solutions through agricultural innovation. 
              Bridging farmers and industries for a greener tomorrow.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-100 hover:text-yellow-400 transition-colors">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-100 hover:text-yellow-400 transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-100 hover:text-yellow-400 transition-colors">
                <FaFacebook className="w-6 h-6" />
              </a>
              <a href="#" className="text-green-100 hover:text-yellow-400 transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400">Explore</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">About Us</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Our Impact</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Blog</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Careers</a></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-yellow-400">Support</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Contact</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">FAQs</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Terms</a></li>
                <li><a href="#" className="text-green-100 hover:text-yellow-300 transition-colors">Privacy</a></li>
              </ul>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-yellow-400 flex items-center">
              <TbPlant2 className="mr-2 w-5 h-5" />
              Grow With Us
            </h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for updates"
                  className="w-full px-4 py-3 bg-green-800/30 border border-green-300/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-green-100 placeholder-green-200"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-gradient-to-r from-yellow-400 to-green-500 px-4 py-1 rounded-md text-green-900 font-semibold hover:opacity-90 transition-opacity"
                >
                  Subscribe
                </button>
              </div>
              {isSubscribed && (
                <div className="text-green-200 text-sm animate-fade-in">
                  Thanks for subscribing! 🌱
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-green-300/20 pt-8 pb-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-green-200">©</span>
            <span className="font-semibold bg-gradient-to-r from-yellow-300 to-green-400 bg-clip-text text-transparent">
              algoholics
            </span>
          </div>
          <p className="text-sm text-green-200/80">
            Cultivating digital solutions for agricultural sustainability © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

// // Add to your CSS
// const styles = `
//   @keyframes fade-in {
//     0% { opacity: 0; transform: translateY(5px); }
//     100% { opacity: 1; transform: translateY(0); }
//   }
//   .animate-fade-in {
//     animation: fade-in 0.3s ease-out;
//   }
// `;

export default Footer;
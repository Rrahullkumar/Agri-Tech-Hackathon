import React, { useEffect } from "react";
import {
  FaSeedling,
  FaTruckLoading,
  FaMoneyBillWave,
  FaSearch,
  FaWallet,
  FaShieldAlt,
} from "react-icons/fa";

const HowItWorks = () => {
  useEffect(() => {
    const animateElements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up", "opacity-100");
          } else {
            entry.target.classList.remove("animate-fade-in-up", "opacity-100");
          }
        });
      },
      { threshold: 0.1 }
    );

    animateElements.forEach((el) => observer.observe(el));
    return () => animateElements.forEach((el) => observer.unobserve(el));
  }, []);

  const steps = [
    {
      icon: <FaSeedling className="text-3xl text-green-300" />,
      title: "1. List Your Stubble",
      description:
        "Create a free account and list your stubble with details about crop type, quantity, and location.",
      image: "/assets/listing.png",
    },
    {
      icon: <FaTruckLoading className="text-3xl text-blue-300" />,
      title: "2. Receive & Confirm Orders",
      description: "Review buyer offers and confirm orders. Prepare stubble for pickup.",
      image: "/assets/receive.jpg",
    },
    {
      icon: <FaMoneyBillWave className="text-3xl text-yellow-300" />,
      title: "3. Get Paid Securely",
      description:
        "Receive 70% upfront with balance after delivery. Transparent payment tracking.",
      image: "/assets/payment.jpg",
    },
    {
      icon: <FaSearch className="text-3xl text-purple-300" />,
      title: "4. Browse & Select",
      description: "Search listings with filters. Compare quality, prices, and locations.",
      image: "/assets/browse.jpg",
    },
    {
      icon: <FaWallet className="text-3xl text-orange-300" />,
      title: "5. Secure Booking",
      description: "8% advance payment to confirm order. Fully refundable if we cancel.",
      image: "/assets/stubble-2.webp",
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-300" />,
      title: "6. Safe Delivery",
      description: "We handle logistics. Pay balance on delivery. Quality guaranteed.",
      image: "/assets/agri-2.png",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-600 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-white mb-16 animate-on-scroll opacity-0">
          How It Works
          <FaSeedling className="inline-block ml-3 text-yellow-400" />
        </h2>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              image={step.image}
              reverse={index % 2 === 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const StepCard = ({ icon, title, description, image, reverse }) => (
  <div
    className={`animate-on-scroll opacity-0 flex flex-col md:flex-row items-center md:items-stretch rounded-xl shadow-lg border border-white/20 transition-all duration-300 overflow-hidden ${
      reverse ? "md:flex-row-reverse" : ""
    }`}
  >
    {/* Image Section (25% Width) */}
    <div
      className="w-full md:w-1/4 h-48 md:h-auto"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    ></div>

    {/* Content Section (75% Width) */}
    <div className="relative w-full md:w-3/4 p-6 bg-white/10">
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-md rounded-xl"></div>

      {/* Content */}
      <div className="relative flex items-start z-10">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-black/40 flex items-center justify-center">
            {icon}
          </div>
        </div>
        <div className="ml-4">
          <h4 className="text-lg font-semibold text-white">{title}</h4>
          <p className="text-gray-300 mt-2">{description}</p>
        </div>
      </div>
    </div>
  </div>
);

export default HowItWorks;

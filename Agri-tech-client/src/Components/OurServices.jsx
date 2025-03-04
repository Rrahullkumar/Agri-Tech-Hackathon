import React, { useEffect, useRef } from "react";
import {
  FaHandshake,
  FaSearchDollar,
  FaTruck,
  FaBarcode,
  FaLeaf,
  FaBookOpen,
} from "react-icons/fa";

const OurServices = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  const services = [
    {
      icon: <FaHandshake className="w-12 h-12 text-green-600" />,
      title: "Stubble Selling Platform",
      description:
        "Connect with verified buyers and sell your stubble quickly and efficiently. Our platform simplifies the process, ensuring fair prices and timely pickup.",
    },
    {
      icon: <FaSearchDollar className="w-12 h-12 text-yellow-500" />,
      title: "Stubble Buying Platform",
      description:
        "Find high-quality stubble from trusted sellers. Browse listings, compare prices, and purchase the stubble you need for your agricultural or industrial purposes.",
    },
    {
      icon: <FaTruck className="w-12 h-12 text-blue-500" />,
      title: "Transportation and Logistics",
      description:
        "We offer reliable transportation and logistics services to ensure the safe and efficient delivery of stubble from seller to buyer.",
    },
    {
      icon: <FaBarcode className="w-12 h-12 text-purple-500" />,
      title: "Stubble Processing and Baling",
      description:
        "We provide professional stubble processing and baling services to prepare stubble for efficient storage and transportation.",
    },
    {
      icon: <FaLeaf className="w-12 h-12 text-green-500" />,
      title: "Advisory and Consultation",
      description:
        "Our team of agricultural experts provides advisory and consultation services on stubble management, sustainable farming practices, and the benefits of stubble utilization.",
    },
    {
      icon: <FaBookOpen className="w-12 h-12 text-orange-500" />,
      title: "Information and Resources",
      description:
        "Access a wealth of information and resources on stubble management, including articles, guides, and FAQs.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
          } else {
            entry.target.classList.remove("fade-in"); // Remove to re-trigger animation
          }
        });
      },
      { threshold: 0.3 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => {
      cardRefs.current.forEach((card) => {
        if (card) observer.unobserve(card);
      });
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-50 to-white"
    >
      <div className="w-3/4 mx-auto p-8">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="service-card group bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer border border-green-100 opacity-0"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServices;

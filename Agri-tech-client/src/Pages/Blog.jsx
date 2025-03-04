import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiBookOpen } from 'react-icons/fi';

const blogs = [
  {
    id: 1,
    title: "From Waste to Wealth: The Hidden Potential of Crop Stubble",
    content: [
      "Agricultural stubble, often seen as a farming byproduct, holds immense potential for industrial applications. While stubble burning remains a critical environmental concern, innovative recycling methods are transforming this 'waste' into valuable resources.",
      "At the industrial level, crop residues can be converted into biochar through pyrolysis - a process that not only prevents harmful emissions but creates a carbon-rich soil enhancer. Paper mills are increasingly using rice stubble as raw material, reducing wood pulp dependency by up to 40%.",
      "The construction industry has found innovative uses for wheat stubble in producing eco-friendly particle boards. These sustainable alternatives to traditional wood-based products are revolutionizing green architecture."
    ],
    image: "assets/agri-1.png",
    date: "March 5, 2025"
  },
  {
    id: 2,
    title: "Stubble Burning Crisis: Solutions Through Technology",
    content: [
      "The annual stubble burning season in Northern India creates an environmental emergency, with air quality indices reaching hazardous levels. However, new technological interventions are offering sustainable solutions.",
      "Mobile apps connecting farmers with biomass plants have created new economic opportunities. These platforms allow direct stubble sales, generating additional income while preventing burning. Government initiatives now subsidize stubble balers and decomposers, accelerating adoption rates.",
      "Recent advancements in microbial decomposition can break down stubble in just 20 days, transforming it into nutrient-rich fertilizer. This biological solution promises to resolve the burning crisis while enhancing soil health."
    ],
    image: "assets/agri-2.png",
    date: "April 1, 2025"
  },
  {
    id: 3,
    title: "The Circular Economy of Agricultural Residues",
    content: [
      "Creating a circular economy around crop stubble is revolutionizing sustainable agriculture. This closed-loop system turns agricultural waste into valuable products through innovative processing methods.",
      "Bioenergy plants now generate 10MW of electricity from every 100,000 tons of stubble processed. This renewable energy source powers rural communities while reducing carbon footprints. The pharmaceutical industry extracts silica from rice husks for medicinal applications, creating new revenue streams.",
      "Farmers participating in stubble management programs report 15-20% increases in annual income through product diversification. This economic incentive drives widespread adoption of sustainable practices."
    ],
    image: "assets/logistics.webp",
    date: "April 18, 2025"
  }
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [direction, setDirection] = useState(1);

  const handleNext = () => {
    setDirection(1);
    setCurrentPage(prev => Math.min(prev + 1, blogs.length));
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const currentBlog = blogs[currentPage - 1];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-200 to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center mb-16"
        >
          <FiBookOpen className="w-12 h-12 text-green-600 mr-4" />
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-700 bg-clip-text text-transparent">
            Sustainable Stubble Insights
          </h1>
        </motion.div>

        <AnimatePresence mode='wait' custom={direction}>
          <motion.div
            key={currentPage}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 100 : -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
            transition={{ duration: 0.4 }}
            className="relative"
          >
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
              <div 
                className="h-64 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${currentBlog.image})` }}
              >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-white text-center"
                  >
                    {currentBlog.title}
                  </motion.h2>
                </div>
              </div>

              <div className="p-8 sm:p-12">
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  {currentBlog.content.map((para, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-8 flex items-center justify-between"
                >
                  <span className="text-green-600 font-medium">
                    {currentBlog.date}
                  </span>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handlePrev}
                      disabled={currentPage === 1}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiArrowLeft className="w-6 h-6 text-green-700" />
                    </button>
                    <span className="text-green-700 font-medium">
                      {currentPage} / {blogs.length}
                    </span>
                    <button
                      onClick={handleNext}
                      disabled={currentPage === blogs.length}
                      className="p-2 rounded-full bg-green-100 hover:bg-green-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FiArrowRight className="w-6 h-6 text-green-700" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 flex justify-center">
          <div className="h-1 bg-green-100 rounded-full w-64 overflow-hidden">
            <motion.div
              className="h-full bg-green-600"
              initial={{ width: 0 }}
              animate={{ width: `${(currentPage / blogs.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
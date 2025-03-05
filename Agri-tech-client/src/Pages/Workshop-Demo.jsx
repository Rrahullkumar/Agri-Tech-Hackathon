import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiPlayCircle } from 'react-icons/fi';

const videos = [
    {
        id: 1,
        title: "Entrepreneurial Opportunities with Stubble",
        src: "/assets/samplevideo-3.mp4",
        description: "Discover how farmers can start a business using agricultural stubble."
    },
    {
        id: 2,
        title: "Understanding Stubble Recycling",
        src: "/assets/samplevideo.mp4",
        description: "Learn the fundamentals of converting stubble waste into profitable resources."
    },
];

const WorkshopDemo = () => {
    const [currentPage, setCurrentPage] = useState(0);

    const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, videos.length - 1));
    const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 0));

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-200 to-white flex items-center justify-center px-6 pt-20">
            <div className="max-w-xs sm:max-w-sm w-full bg-white/70 backdrop-blur-lg rounded-3xl shadow-2xl p-6 sm:p-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-6"
                >
                    <h1 className="text-2xl sm:text-3xl font-bold text-green-700 flex items-center justify-center gap-2">
                        <FiPlayCircle className="text-green-600" /> Workshop Demo
                    </h1>
                    <p className="text-gray-600 mt-2">Explore innovative methods to utilize agricultural stubble.</p>
                </motion.div>
                
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.5 }}
                        className="relative"
                    >
                        <div className="w-full aspect-[9/16] rounded-lg overflow-hidden shadow-lg">
                            <video src={videos[currentPage].src} controls className="w-full h-full object-cover"></video>
                        </div>
                        <h2 className="mt-4 text-lg font-semibold text-green-800">{videos[currentPage].title}</h2>
                        <p className="text-gray-700 mt-2">{videos[currentPage].description}</p>
                    </motion.div>
                </AnimatePresence>

                <div className="mt-6 flex justify-between items-center">
                    <button
                        onClick={handlePrev}
                        disabled={currentPage === 0}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-full shadow-md disabled:opacity-50"
                    >
                        <FiArrowLeft className="text-green-700 text-xl" />
                    </button>
                    <span className="text-green-700 font-medium">{currentPage + 1} / {videos.length}</span>
                    <button
                        onClick={handleNext}
                        disabled={currentPage === videos.length - 1}
                        className="p-2 bg-green-100 hover:bg-green-200 rounded-full shadow-md disabled:opacity-50"
                    >
                        <FiArrowRight className="text-green-700 text-xl" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WorkshopDemo;
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const banners = [
    {
        id: 1,
        title: "Get the Best Value for Your Stubble!",
        description: "Use our AI-powered tool to predict the optimal price for your stubble and maximize your profit.",
        buttonText: "Predict Price Now",
        buttonLink: "https://stubble-price-prediction.streamlit.app/",
        bgImage: "url(https://images.unsplash.com/photo-1578329848253-02ad2083c202)",
    },
    {
        id: 2,
        title: "Smart Buyer Matching",
        description: "Our AI-powered system matches your stubble type with the most suitable industrial buyers.",
        buttonText: "Find Your Match",
        buttonLink: "https://best-buyer-predictor-paralibazar.streamlit.app/",
        bgImage: "url(https://img.freepik.com/free-vector/happy-female-farmer-working-farm-feed-population-flat-vector-illustration-cartoon-farm-with-automation-technology_74855-8400.jpg?semt=ais_hybrid&w=740)", // Replace with any suitable image
    },
];

const BannerWithPagination = () => {
    const [current, setCurrent] = useState(0);

    return (
        <div>
            <div className="text-center text-3xl font-bold text-green-900 mb-6">
                Know the Best Price for Your Stubble
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={banners[current].id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-r from-yellow-400 via-green-500 to-green-700 rounded-3xl shadow-xl p-8 mb-6 text-white overflow-hidden mx-4"
                >
                    <div
                        className="absolute inset-0 opacity-30 bg-cover bg-center rounded-3xl"
                        style={{ backgroundImage: banners[current].bgImage }}
                    ></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-extrabold text-center mb-4 drop-shadow-lg">
                            {banners[current].title}
                        </h2>
                        <p className="text-lg text-center mb-6 drop-shadow-md">
                            {banners[current].description}
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.location.href = banners[current].buttonLink}
                                className="bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-100 transition ease-in-out duration-300 hover:cursor-pointer"
                            >
                                {banners[current].buttonText}
                            </button>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Dot Pagination */}
            <div className="flex justify-center mb-10">
                {banners.map((_, index) => (
                    <div
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`w-4 h-4 mx-2 rounded-full cursor-pointer transition-all duration-300 ${
                            current === index ? "bg-green-700 scale-110" : "bg-green-300"
                        }`}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default BannerWithPagination;

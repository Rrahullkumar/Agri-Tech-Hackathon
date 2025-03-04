import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaShoppingCart, FaLeaf, FaStar } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

const BuyStubble = () => {
  const [selectedStubble, setSelectedStubble] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const stubbles = [
    {
      id: 1,
      title: "Premium Wheat Stubble",
      description: "High-quality wheat residue perfect for biofuel production",
      image: "assets/stubble.jpg",
      price: 1500,
      quantityAvailable: 120,
      rating: 4.8,
      seller: "GreenFarm Organics",
      organic: true
    },
    {
      id: 2,
      title: "Organic Rice Stubble",
      description: "Fresh rice residue ideal for paper manufacturing",
      image: "assets/stubble-2.webp",
      price: 1800,
      quantityAvailable: 85,
      rating: 4.5,
      seller: "EcoHarvest Ltd",
      organic: true
    },
    {
      id: 3,
      title: "Nutrient-Rich Corn Stubble",
      description: "Perfect for livestock feed and composting",
      image: "assets/stubble.jpg",
      price: 1350,
      quantityAvailable: 200,
      rating: 4.7,
      seller: "AgriGrowth Solutions"
    },
    {
      id: 4,
      title: "Barley Farming Residue",
      description: "Sustainable raw material for construction boards",
      image: "assets/stubble-3.jpg",
      price: 1650,
      quantityAvailable: 95,
      rating: 4.6,
      seller: "BioMaterial Corp"
    },
    {
      id: 5,
      title: "Oat Stubble Bulk Package",
      description: "Premium quality for animal bedding and feed",
      image: "assets/stubble-4.webp",
      price: 1420,
      quantityAvailable: 150,
      rating: 4.9,
      seller: "NaturalFarm Products",
      organic: true
    },
    {
      id: 6,
      title: "Sorghum Biofuel Package",
      description: "High-energy residue for ethanol production",
      image: "assets/stubble-2.webp",
      price: 1950,
      quantityAvailable: 75,
      rating: 4.4,
      seller: "EcoEnergy Solutions"
    },
  ];

  const addToCart = (stubble) => {
    // Implement cart functionality
    alert(`Added ${quantity} ton(s) of ${stubble.title} to cart!`);
    setSelectedStubble(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-bold text-center text-green-900 mb-12 flex items-center justify-center gap-4"
        >
          <FaLeaf className="text-emerald-600" />
          Sustainable Stubble Marketplace
          <FaLeaf className="text-emerald-600" />
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stubbles.map((stubble, index) => (
            <motion.div
              key={stubble.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={stubble.image}
                  alt={stubble.title}
                  className="w-full h-56 object-cover"
                />
                {stubble.organic && (
                  <div className="absolute top-4 right-4 bg-green-100 px-3 py-1 rounded-full flex items-center gap-2">
                    <FaLeaf className="text-green-600" />
                    <span className="text-green-800 text-sm font-medium">Organic</span>
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-xl font-bold text-green-900">{stubble.title}</h2>
                  <div className="flex items-center gap-1 text-amber-500">
                    <FaStar />
                    <span>{stubble.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">{stubble.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
                    <FaRupeeSign className="text-lg" />
                    {stubble.price.toLocaleString()}/ton
                  </div>
                  <span className="text-sm text-gray-500">
                    Available: {stubble.quantityAvailable} tons
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setSelectedStubble(stubble)}
                    className="flex-1 bg-emerald-100 text-emerald-800 py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-200 transition-colors"
                  >
                    <FiInfo />
                    Details
                  </button>
                  <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors">
                    <FaShoppingCart />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Product Details Modal */}
        <AnimatePresence>
          {selectedStubble && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setSelectedStubble(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 50 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedStubble.image}
                  alt={selectedStubble.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-green-900 mb-4">
                    {selectedStubble.title}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-600">Seller:</span>
                      <span className="text-green-700">{selectedStubble.seller}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-600">Price:</span>
                      <div className="flex items-center gap-2 text-xl text-green-700">
                        <FaRupeeSign />
                        {selectedStubble.price.toLocaleString()} per ton
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-600">Quantity:</span>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="px-3 py-1 rounded-lg bg-green-100 text-green-800"
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{quantity}</span>
                        <button 
                          onClick={() => setQuantity(quantity + 1)}
                          className="px-3 py-1 rounded-lg bg-green-100 text-green-800"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => addToCart(selectedStubble)}
                      className="w-full bg-green-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      <FaShoppingCart />
                      Add {quantity} ton(s) to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BuyStubble;
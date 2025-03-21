import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRupeeSign, FaShoppingCart, FaLeaf, FaStar } from 'react-icons/fa';
import { FiInfo } from 'react-icons/fi';

const BuyStubble = () => {
  const [selectedStubble, setSelectedStubble] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [stubbles, setStubbles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStubbles = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/listings');
        const data = await response.json();

        const getImageUrl = (imagePath) => {
          if (!imagePath) return '/default-stubble.jpg';

          // Extract just the filename from the absolute path
          const filename = imagePath.split('\\').pop().split('/').pop();
          return `http://localhost:5000/uploads/${filename}`;
        };

        const transformedData = data.map(listing => ({
          _id: listing._id,
          title: `${listing.cropType.charAt(0).toUpperCase() + listing.cropType.slice(1)} Stubble`,
          description: listing.description,
          image: listing.images[0] ? getImageUrl(listing.images[0]) : '/default-stubble.jpg',
          price: listing.price,
          quantityAvailable: listing.quantity,
          seller: listing.sellerName,
          location: listing.location,
          date: new Date(listing.date).toLocaleDateString(),
          // These fields can be added to your backend model if needed
          rating: 4.5 + Math.random() * 0.5, // Random rating for demo
          organic: Math.random() > 0.5 // Random organic flag for demo
        }));

        setStubbles(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching stubbles:', error);
        setLoading(false);
      }
    };

    fetchStubbles();
  }, []);

  const addToCart = async (stubble) => {
    try {
      const response = await fetch('http://localhost:5000/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          stubbleId: stubble._id,
          quantity,
          price: stubble.price
        })
      });

      if (!response.ok) throw new Error('Failed to add to cart');

      alert(`Added ${quantity} ton(s) of ${stubble.title} to cart!`);
      setSelectedStubble(null);
      setQuantity(1);
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 py-12 px-4 sm:px-6 lg:px-8 pt-20">
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

        {loading ? (
          <div className="text-center py-12">
            <p className="text-green-600 text-lg">Loading available stubbles...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stubbles.map((stubble, index) => (
              <motion.div
                key={stubble._id}
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
                    onError={(e) => {
                      console.error('Image failed to load:', e.target.src);
                      e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23aaa'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
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
                      <span>{stubble.rating.toFixed(1)}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">{stubble.description}</p>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-2xl font-bold text-green-700">
                      <FaRupeeSign className="text-lg" />
                      {stubble.price.toLocaleString()}/quintal
                    </div>
                    <span className="text-sm text-gray-500">
                      Available: {stubble.quantityAvailable} quintals
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
                    <button
                      onClick={() => addToCart(stubble)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-colors"
                    >
                      <FaShoppingCart />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
                  onError={(e) => {
                    console.error('Image failed to load:', e.target.src);
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23aaa'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
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
                      <span className="text-lg font-semibold text-gray-600">Location:</span>
                      <span className="text-green-700">{selectedStubble.location}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-gray-600">Price:</span>
                      <div className="flex items-center gap-2 text-xl text-green-700">
                        <FaRupeeSign />
                        {selectedStubble.price.toLocaleString()} per quintal
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
                      Add {quantity} quintal(s) to Cart
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
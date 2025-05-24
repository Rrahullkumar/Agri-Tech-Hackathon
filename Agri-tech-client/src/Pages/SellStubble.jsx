import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiInfo, FiTrash2 } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';
import BASE_URL from '../baseUrl';

const SellStubble = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [previewImages, setPreviewImages] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [listings, setListings] = useState([]);

    // Fetch existing listings on component mount
    useEffect(() => {
        const fetchListings = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/listings' || `${BASE_URL}/api/listings`);
                const data = await response.json();
                setListings(data);
            } catch (error) {
                console.error('Error fetching listings:', error);
            }
        };
        fetchListings();
    }, []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);

        // Limit to 5 images
        if (files.length + previewImages.length > 5) {
            alert('Maximum 5 photos allowed');
            return;
        }

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(prev => [...prev, ...previews]);
        setUploadedFiles(prev => [...prev, ...files]);
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append form data
            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
                console.log(key, value); // Log form data
            });

            // Append image files
            uploadedFiles.forEach(file => {
                formData.append('images', file);
                console.log('Image file:', file); // Log image files
            });

            const response = await fetch('http://localhost:5000/api/listings' || `${BASE_URL}//api/listings`, {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                console.error('Backend error:', errorData);
                throw new Error(errorData.message || 'Failed to create listing');
            }

            const newListing = await response.json();
            console.log('New listing:', newListing); // Log the response

            // Update state with new listing
            setListings(prev => [newListing, ...prev]);
            setPreviewImages([]);
            setUploadedFiles([]);
            reset();

        } catch (error) {
            console.error('Error submitting listing:', error);
            alert('Error submitting listing. Please try again.');
        }
    };

    // Add delete functionality
    const handleDelete = async (listingId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/listings/${listingId}` || `${BASE_URL}/api/listings/${listingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth token if required
                }
            });

            if (!response.ok) {
                const errorData = await response.json(); // Parse error response
                throw new Error(errorData.message || 'Failed to delete listing');
            }

            // Remove from local state
            setListings(prev => prev.filter(listing => listing._id !== listingId));
        } catch (error) {
            console.error('Error deleting listing:', error);
            alert('Error deleting listing. Please try again.');
        }
    };

    useEffect(() => {
        if (listings.length > 0) {
            console.log('Listing images:', listings.map(listing => listing.images));
            console.log('Sample image URL:', getImageUrl(listings[0].images[0]));
        }
    }, [listings]);

    // Update image URLs to include /uploads/ path
    const getImageUrl = (imagePath) => {
        if (!imagePath) return '/placeholder.jpg';

        // Extract just the filename from the absolute path
        const filename = imagePath.split('\\').pop().split('/').pop();
        return `http://localhost:5000/uploads/${filename}` || `${BASE_URL}/uploads/${filename}` ;
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 pt-20">

            <div>
                <div className="text-center text-3xl font-bold text-green-900 mb-6">
                    Know the Best Price for Your Stubble
                </div>

                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-gradient-to-r from-yellow-400 via-green-500 to-green-700 rounded-3xl shadow-xl p-8 mb-12 text-white overflow-hidden mx-4"
                >
                    <div
                        className="absolute inset-0 opacity-30 bg-cover bg-center rounded-3xl"
                        style={{
                            backgroundImage:
                                "url(https://images.unsplash.com/photo-1578329848253-02ad2083c202)",
                        }}
                    ></div>

                    <div className="relative z-10">
                        <h2 className="text-4xl font-extrabold text-center mb-4 drop-shadow-lg">
                            Get the Best Value for Your Stubble!
                        </h2>
                        <p className="text-lg text-center mb-6 drop-shadow-md">
                            Use our AI-powered tool to predict the optimal price for your stubble and maximize your profit.
                        </p>
                        <div className="flex justify-center">
                            <button
                                onClick={() => window.location.href = "https://stubble-price-prediction.streamlit.app/"}
                                className="bg-white text-green-700 font-semibold py-3 px-8 rounded-full shadow-md hover:bg-green-100 transition ease-in-out duration-300 hover:cursor-pointer"
                            >
                                Predict Price Now
                            </button>
                            {/* Add link integration here */}
                        </div>
                    </div>
                </motion.div>
            </div>


            <div className="max-w-7xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-center text-green-900 mb-12"
                >
                    Sell Your Stubble
                </motion.h1>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Listing Form */}
                    <motion.form
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-white rounded-2xl shadow-xl p-8"
                        variants={formVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="space-y-6">
                            {/* Crop Type Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Crop Type
                                </label>
                                <select
                                    {...register("cropType", { required: true })}
                                    className="w-full p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                >
                                    <option value="">Select Crop Type</option>
                                    <option value="wheat">Wheat</option>
                                    <option value="rice">Rice</option>
                                    <option value="corn">Corn</option>
                                    <option value="barley">Barley</option>
                                </select>
                                {errors.cropType && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Crop type is required
                                    </p>
                                )}
                            </div>

                            {/* Price Per Quintal Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Price Per Quintal (₹)
                                </label>
                                <div className="relative">
                                    <MdCurrencyRupee className="absolute left-3 top-4 text-gray-400" />
                                    <input
                                        type="number"
                                        {...register("price", { required: true, min: 1 })}
                                        className="w-full pl-10 p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                        placeholder="Enter price per quintal"
                                    />
                                </div>
                                {errors.price && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Valid price is required
                                    </p>
                                )}
                            </div>

                            {/* Available Quantity Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Available Quantity (Quintal)
                                </label>
                                <input
                                    type="number"
                                    {...register("quantity", { required: true, min: 1 })}
                                    className="w-full p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    placeholder="Enter available quantity"
                                />
                                {errors.quantity && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Valid quantity is required
                                    </p>
                                )}
                            </div>

                            {/* Description Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Description
                                </label>
                                <textarea
                                    {...register("description", { required: true, minLength: 20 })}
                                    className="w-full p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 h-32"
                                    placeholder="Add detailed description about the stubble (minimum 20 characters)"
                                />
                                {errors.description && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Description must be at least 20 characters
                                    </p>
                                )}
                            </div>

                            {/* Seller Name Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Seller Name
                                </label>
                                <input
                                    type="text"
                                    {...register("sellerName", { required: true })}
                                    className="w-full p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    placeholder="Enter your name"
                                />
                                {errors.sellerName && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Seller name is required
                                    </p>
                                )}
                            </div>

                            {/* Location Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    {...register("location", { required: true })}
                                    className="w-full p-3 rounded-lg border-2 border-green-200 focus:border-green-500 focus:ring-2 focus:ring-green-200"
                                    placeholder="Enter your location (City, State)"
                                />
                                {errors.location && (
                                    <p className="text-red-500 mt-1 flex items-center">
                                        <FiInfo className="mr-1" /> Location is required
                                    </p>
                                )}
                            </div>

                            {/* Upload Photos Field */}
                            <div>
                                <label className="block text-lg font-medium text-green-800 mb-2">
                                    Upload Photos
                                </label>
                                <label className="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-green-200 rounded-2xl cursor-pointer hover:border-green-400 transition-colors">
                                    <div className="text-center">
                                        <FiUploadCloud className="w-12 h-12 text-green-400 mb-2 mx-auto" />
                                        <p className="text-green-600">
                                            Drag & drop photos or click to upload
                                        </p>
                                        <p className="text-sm text-gray-500 mt-1">
                                            (Maximum 5 photos, PNG/JPG)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        multiple
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        className="hidden"
                                    />
                                </label>
                                <div className="flex flex-wrap gap-4 mt-4">
                                    {previewImages.map((img, index) => (
                                        <motion.div
                                            key={index}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="w-20 h-20 rounded-lg overflow-hidden shadow-md"
                                        >
                                            <img
                                                src={img}
                                                alt={`Preview ${index}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors"
                            >
                                List My Stubble
                            </motion.button>
                        </div>
                    </motion.form>

                    {/* Active Listings Preview */}
                    <div className="space-y-8">
                        <h2 className="text-3xl font-bold text-green-900 mb-6">
                            Your Active Listings
                        </h2>

                        <AnimatePresence>
                            {listings.map((listing) => (
                                <motion.div
                                    key={listing._id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-2xl shadow-lg p-6 relative"
                                >
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(listing._id)}
                                        className="absolute top-4 right-4 text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 className="w-6 h-6" />
                                    </button>

                                    <div className="flex gap-4">
                                        {listing.images[0] && (
                                            <img
                                                src={getImageUrl(listing.images[0])}
                                                alt="Stubble"
                                                className="w-32 h-32 rounded-lg object-cover"
                                                onError={(e) => {
                                                    console.error('Image failed to load:', e.target.src);
                                                    // Use a data URI for a simple placeholder
                                                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f0f0f0'/%3E%3Ctext x='50' y='50' font-family='Arial' font-size='12' text-anchor='middle' dominant-baseline='middle' fill='%23aaa'%3ENo Image%3C/text%3E%3C/svg%3E";
                                                }}
                                            />
                                        )}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-green-800 capitalize">
                                                {listing.cropType} Stubble
                                            </h3>
                                            <p className="text-gray-600 mt-2">{listing.description}</p>
                                            <div className="flex items-center mt-4 gap-6">
                                                <div>
                                                    <span className="text-green-600 font-bold text-xl">
                                                        ₹{listing.price}
                                                    </span>
                                                    <span className="text-gray-500 ml-1">/ quintal</span>
                                                </div>
                                                <div className="h-6 w-px bg-gray-200" />
                                                <div>
                                                    <span className="text-green-600 font-bold text-xl">
                                                        {listing.quantity}
                                                    </span>
                                                    <span className="text-gray-500 ml-1">quintals available</span>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-400 mt-2">
                                                Listed on: {new Date(listing.date).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {listings.length === 0 && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-12 bg-white rounded-2xl shadow-lg"
                            >
                                <p className="text-gray-500 text-lg">
                                    No active listings yet. Submit your first listing using the form!
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SellStubble;
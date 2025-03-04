import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { AnimatePresence } from 'framer-motion';
import { FiUploadCloud, FiInfo } from 'react-icons/fi';
import { MdCurrencyRupee } from 'react-icons/md';

const SellStubble = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [previewImages, setPreviewImages] = useState([]);
    const [listings, setListings] = useState([]);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previews]);
    };

    const onSubmit = (data) => {
        const newListing = {
            ...data,
            images: previewImages,
            id: Date.now(),
            date: new Date().toLocaleDateString()
        };
        setListings([...listings, newListing]);
        setPreviewImages([]);
    };

    const formVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8 pt-20">
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
                                    key={listing.id}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="bg-white rounded-2xl shadow-lg p-6"
                                >
                                    <div className="flex gap-4">
                                        {listing.images[0] && (
                                            <img
                                                src={listing.images[0]}
                                                alt="Stubble"
                                                className="w-32 h-32 rounded-lg object-cover"
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
                                                Listed on: {listing.date}
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
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { FaTruckMoving, FaRupeeSign, FaBoxOpen, FaMapMarkedAlt } from 'react-icons/fa';
import { FiRefreshCw, FiXCircle } from 'react-icons/fi';

const salesData = [
  { day: 'Mon', sales: 42000 },
  { day: 'Tue', sales: 68000 },
  { day: 'Wed', sales: 55000 },
  { day: 'Thu', sales: 89000 },
  { day: 'Fri', sales: 72000 },
  { day: 'Sat', sales: 95000 },
  { day: 'Sun', sales: 48000 },
];

const initialOrders = [
  {
    id: 1,
    from: 'Farmland, Punjab',
    to: 'Biomass Plant, Haryana',
    status: 'In Transit',
    progress: 60,
    quantity: '15 Tons',
    value: '₹67,500'
  },
  {
    id: 2,
    from: 'Rice Field, UP',
    to: 'Paper Mill, Maharashtra',
    status: 'Pending',
    progress: 20,
    quantity: '22 Tons',
    value: '₹99,000'
  },
  {
    id: 3,
    from: 'Wheat Farm, MP',
    to: 'Construction Co, Gujarat',
    status: 'Delivered',
    progress: 100,
    quantity: '18 Tons',
    value: '₹81,000'
  },
];

const Logistics = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleCancel = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  const updateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-green-900 mb-8 flex items-center gap-4"
        >
          <FaTruckMoving className="text-green-600" />
          Logistics Dashboard
        </motion.h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-green-100 rounded-xl">
                <FaBoxOpen className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-green-900">3</h3>
                <p className="text-gray-600">Active Orders</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <FaTruckMoving className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-blue-900">4</h3>
                <p className="text-gray-600">In Transit</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <FaRupeeSign className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-purple-900">₹1.4L</h3>
                <p className="text-gray-600">Total Revenue</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sales Chart */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg mb-12"
        >
          <h3 className="text-xl font-semibold text-green-900 mb-4">Weekly Sales Trend</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#16a34a" 
                  strokeWidth={2}
                  dot={{ fill: '#16a34a', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AnimatePresence>
            {orders.map((order) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-2xl shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-green-900">
                      Order #{order.id}
                    </h4>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'In Transit' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                  <button 
                    onClick={() => handleCancel(order.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FiXCircle className="w-6 h-6" />
                  </button>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <FaMapMarkedAlt />
                      <span className="font-medium">From:</span> {order.from}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                      <FaMapMarkedAlt />
                      <span className="font-medium">To:</span> {order.to}
                    </div>
                  </div>
                  <img 
                    src="assets/stubble.jpg" 
                    alt="Delivery" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div>
                    <p className="text-gray-600">{order.quantity}</p>
                    <p className="text-green-600 font-semibold">{order.value}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <select 
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="bg-white border rounded-lg px-3 py-1 text-sm"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Transit">In Transit</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                    <button className="p-2 hover:bg-gray-100 rounded-lg">
                      <FiRefreshCw className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Logistics; 
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./Components/HeroSection";
import Navbar from "./Components/NavBar";
import OurServices from "./Components/OurServices";
import HowItWorks from "./Components/HowItWorks";
import AboutUs from "./Components/AboutUs";
import Footer from "./Components/Footer";
import SellerLogin from "./Pages/SellerLogin";
import BuyerLogin from "./Pages/BuyerLogin";
import LogisticsLogin from "./Pages/LogisticsLogin";
import BuyStubble from "./Pages/BuyStubble";
import SellStubble from "./Pages/SellStubble";
import Blog from "./Pages/Blog";
import Logistics from "./Pages/Logistics";
import WorkshopDemo from "./Pages/Workshop-Demo";
import Chatbot from "./Pages/Chat-bot";  
import AIBot from "./Components/AIbot";
import "./i18.js";
import EditProfile from "./Pages/EditProfile.jsx";

const DummyPage = ({ title }) => (
  <div className="min-h-screen flex items-center justify-center text-3xl font-bold bg-green-50">
    {title} Page - Under Development
  </div>
);

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <OurServices />
              <HowItWorks />
              <AboutUs />
              <Footer />
            </>
          }
        />

        {/* Other Routes */}
        <Route path="/seller-login" element={<SellerLogin />} />
        <Route path="/buyer-login" element={<BuyerLogin />} />
        <Route path="/logistics-login" element={<LogisticsLogin />} />
        <Route path="/sell-stubble" element={<SellStubble />} />
        <Route path="/buy-stubble" element={<BuyStubble />} />
        <Route path="/logistics" element={<Logistics />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/workshop-demo" element={<WorkshopDemo />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        {/* <Route path="/Chat-bot" element={<Chatbot />} /> */}
        <Route path="/signup" element={<SellerLogin />} />
      </Routes>

      {/* Sticky ChatBot */}
      <AIBot />
      
    </Router>
  );
}

export default App;

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
        <Route path="/sell-stubble" element={<DummyPage title="Sell Stubble" />} />
        <Route path="/buy-stubble" element={<DummyPage title="Buy Stubble" />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/blog" element={<DummyPage title="Blog" />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/signup" element={<DummyPage title="Signup" />} />
      </Routes>
    </Router>
  );
}

export default App;
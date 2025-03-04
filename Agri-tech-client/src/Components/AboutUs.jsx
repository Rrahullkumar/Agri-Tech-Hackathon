import React, { useEffect } from 'react';
import { GiWheat, GiFactory, GiBiohazard } from 'react-icons/gi';
import { TbPlant2 } from 'react-icons/tb';

const AboutUs = () => {
  useEffect(() => {
    const elements = document.querySelectorAll('.animate-enter');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('opacity-100', 'translate-y-0');
      }, index * 200);
    });
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/agri-4.avif" 
          alt="Agricultural Fields"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-green-900/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-4/5 mx-auto py-20 mb-24">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
          {/* Animated Header */}
          <div className="animate-enter opacity-0 translate-y-8 transition-all duration-700 mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-yellow-300 to-green-400 bg-clip-text text-transparent">
                Growing Sustainability
              </span>
            </h1>
            <div className="flex items-center space-x-4">
              <GiWheat className="w-12 h-12 text-yellow-400 animate-pulse" />
              <h2 className="text-2xl md:text-3xl font-semibold text-white">
                Transforming Agricultural Waste into Wealth
              </h2>
            </div>
          </div>

          {/* Main Content */}
          <div className="animate-enter opacity-0 translate-y-8 transition-all duration-700 delay-200">
            <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8">
              At <span className="font-bold text-yellow-300">ParaliBazar</span>, we're revolutionizing 
              agricultural sustainability through technology. Our platform serves as the vital bridge between 
              <span className="text-green-300"> farmers</span> battling stubble burning and 
              <span className="text-amber-400"> industries</span> hungry for eco-friendly raw materials.
            </p>

            {/* Impact Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <ImpactCard 
                icon={<TbPlant2 className="w-8 h-8" />}
                title="Farmers First"
                description="Empowering agricultural communities with profitable alternatives to stubble burning"
                color="text-green-300"
              />
              <ImpactCard 
                icon={<GiFactory className="w-8 h-8" />}
                title="Industry Solutions"
                description="Sustainable raw materials for paper, packaging, and biofuel industries"
                color="text-yellow-300"
              />
              <ImpactCard 
                icon={<GiBiohazard className="w-8 h-8" />}
                title="Eco Revolution"
                description="Reducing air pollution while creating circular economic opportunities"
                color="text-amber-400"
              />
            </div>

            {/* Mission Statement */}
            <div className="bg-green-800/40 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
              <p className="text-xl text-white/90 italic font-light">
                "We're not just creating a marketplace - we're cultivating an ecosystem where every straw 
                becomes an opportunity for environmental transformation and economic growth."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ImpactCard = ({ icon, title, description, color }) => (
  <div className={`${color} bg-white/5 p-6 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300`}>
    <div className="mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-white/80 text-sm leading-relaxed">{description}</p>
  </div>
);

// Add these styles to your CSS
const styles = `
  .animate-enter {
    transition: opacity 0.7s ease-out, transform 0.7s ease-out;
  }
`;

export default AboutUs;
import React from 'react';
import { motion } from 'framer-motion';
import heroBackground from '../images/hero-background.jpg';

const Hero = () => {
  return (
    <section
      id="home"
      className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden pt-24 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#002366]/80 via-[#002366]/60 to-transparent z-10"></div>

      <div className="container mx-auto px-4 relative z-20">
        <div className="max-w-2xl">
          {/* Tag */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-[#FFD700] text-[#002366] px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-[#002366] rounded-full mr-2 animate-pulse"></span>
              Trusted Logistics Partner
            </div>
          </div>

          {/* Animated Hero Title */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-4xl sm:text-4xl md:text-6xl font-bold text-white mb-8 leading-tight"

            style={{ fontFamily: '"Dela Gothic One", cursive' }}
            key={Date.now()} // forces re-animation when page is reloaded or revisited
          >
            Quick, Affordable &{' '}
            <span className="text-[#FFD700] block mt-2">Reliable Shipping</span>
          </motion.h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg md:text-xl text-gray-200">

            Import & Export | Freight Forwarding | Courier Services
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;

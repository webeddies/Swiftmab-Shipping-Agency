import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import shippingImage from '../images/shipping-illustration.jpg'; // replace with your own image path
import { HashLink } from 'react-router-hash-link';

const WhyChooseUs = () => {
  const reasons = [
    "24/7 customer support with fast response time.",
    "Real-time shipment tracking with full transparency.",
    "Affordable pricing with no hidden fees.",
    "Documentation and customs compliance.",
    "Secure handling and insured logistics services.",
  ];



  return (
    <section id="about" className="py-24 bg-[#E5E5E5]">

      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* LEFT SIDE — Slide in from left */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
        >

          <h2
            className="text-4xl md:text-5xl font-bold text-[#002366] mb-6"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            About <span className="text-[#FFD700]">Swiftmab</span>
          </h2>

          <ul className="space-y-4 text-gray-700 text-lg leading-relaxed mb-6">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-start">
                <CheckCircle size={20} className="text-[#FFD700] mt-1 mr-3 flex-shrink-0" />
                <span>{reason}</span>
              </li>
            ))}
          </ul>

          <p className="text-lg text-gray-700 mb-8">
            Whether you’re a small business or a large enterprise, Swiftmab provides scalable logistics solutions
            designed around your needs. Reliability is not a promise. It’s our standard.
          </p>

          <HashLink
            smooth
            to="/about#top"
            className="inline-block bg-[#002366] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#FFD700] hover:text-[#002366] transition-all duration-300"
          >
            Read More About Us
          </HashLink>


        </motion.div>

        {/* RIGHT SIDE — Slide in from right */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: false, amount: 0.3 }}
          className="w-full h-full flex justify-center"
        >
          <img
            src={shippingImage}
            alt="Swiftmab shipping illustration"
            className="w-full max-w-md rounded-2xl shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

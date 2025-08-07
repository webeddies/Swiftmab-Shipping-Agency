import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { HashLink } from 'react-router-hash-link';
import { useLocation } from 'react-router-dom';

import aboutBanner from '../images/about-banner.jpg';
import logisticsImage from '../images/logistics-team.jpg';


const About = () => {
  const location = useLocation();

  return (
    <div className="pt-0">
      <div id="top" />



      {/* Banner Section */}
      <div className="relative h-52 md:h-72 lg:h-[20rem] w-full">


        <img
          src={aboutBanner}
          alt="Swiftmab Banner"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <motion.h1
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.16, 0.77, 0.47, 0.97],
              delay: 0.2
            }}
            className="text-[#FFD700] text-3xl md:text-5xl font-bold"
            style={{ fontFamily: '"Dela Gothic One", cursive' }}
          >
            About <span className="text-[#FFD700]">Swiftmab</span>
          </motion.h1>
        </div>

      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Our Story */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-4">Our Story</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            At <strong>Swiftmab</strong>, we pride ourselves on being a vibrant shipping company offering specialized logistics solutions tailored to each customer’s needs. From customs clearance to transportation, our full-service approach ensures your freight moves smoothly from start to finish.
          </p>
          <br />
          <p className="text-lg text-gray-700 leading-relaxed">
            Swiftmab was founded in the heart of Ghana out of a deep desire to provide fast, affordable, and reliable logistics services. What began as a small courier startup has evolved into a fully integrated shipping agency serving clients across Ghana and beyond.
          </p>
          <br />
          <p className="text-lg text-gray-700 leading-relaxed">
            After nearly five years of dedicated service, we take pride in seeing our valued clients making waves in the trade sector, contributing to economic growth across borders.
          </p>
        </motion.div>

        {/* Mission & Vision with image */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#002366] mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Our mission is simple: to make shipping stress-free. We offer a one-stop solution that makes every shipment safe and easy by combining state-of-the-art technology, skilled customs handling, and a committed customer support staff.
            </p>
            <br />
            <p className="text-lg text-gray-700 leading-relaxed">
              We simplify complex trade processes, i.e. managing all necessary paperwork, permits, and customs clearance for our clients. Swiftmab is always here to support your specific requirements with professionalism and care.            </p>

            <h3 className="mt-6 text-2xl font-semibold text-[#002366]">Our Core Values:</h3>
            <ul className="list-disc list-inside text-gray-700 text-lg mt-2 space-y-2">
              <li>Integrity in every shipment</li>
              <li>Transparency with clients</li>
              <li>Innovation in logistics operations</li>
              <li>Customer-first service</li>
              <li>Commitment to timely delivery</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: false, amount: 0.3 }}
          >
            <img
              src={logisticsImage}
              alt="Swiftmab logistics team"
              className="rounded-2xl shadow-lg object-cover w-full"
            />
          </motion.div>
        </div>
      </div>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false, amount: 0.3 }}
        className="px-4 md:px-8 mb-12"
      >
        {/* Outer "Border" Box */}
        <div className="border border-[#002366] rounded-xl bg-white p-2">

          {/* Inner Blue CTA Container */}
          <div className="bg-[#002366] text-white rounded-xl p-6 md:p-10 pt-8 pb-10 shadow-lg">
            <h3
              className="text-3xl md:text-4xl font-bold mb-4 text-center"
              style={{ fontFamily: '"Dela Gothic One", cursive' }}
            >
              Join the Swiftmab Family
            </h3>
            <p className="text-xl text-gray-300 mb-6 text-center">
              From local deliveries to international freight, we deliver to your satisfaction.
              Let Swiftmab be your trusted partner in logistics.
            </p>
            <div className="text-center">
              <HashLink
                smooth
                to="/#contact"
                className="inline-block bg-[#FFD700] text-[#002366] px-8 py-4 rounded-lg font-bold text-lg hover:bg-white transition-colors duration-300"
              >
                Get in Touch
              </HashLink>

            </div>
          </div>
        </div>
      </motion.div>




    </div>

  );
};

export default About;
